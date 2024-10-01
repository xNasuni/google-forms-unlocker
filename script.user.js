// ==UserScript==
// @name        Google Forms Unlocker
// @namespace   https://github.com/xNasuni/google-forms-unlocker
// @description Unlocks Google Forms from being locked.
// @author      Mia @ github.com/xNasuni
// @match       *://docs.google.com/forms/*
// @grant       GM_addStyle
// @version     1.6
// @run-at		document-start
// @updateURL   https://github.com/xNasuni/google-forms-unlocker/raw/main/script.user.js
// @downloadURL https://github.com/xNasuni/google-forms-unlocker/raw/main/script.user.js
// @supportURL  https://github.com/xNasuni/google-forms-unlocker/issues
// ==/UserScript==

const kAssessmentAssistantExtensionId = "gndmhdcefbhlchkhipcnnbkcmicncehk"
const ERROR_USER_AGENT = "_useragenterror"
const ERROR_UNKNOWN = "_unknown"

var shouldSpoof = location.hash === "#gfu"

// support for browsers other than chrome.
unsafeWindow.chrome = unsafeWindow.chrome || {}
unsafeWindow.chrome.runtime = unsafeWindow.chrome.runtime || {}
unsafeWindow.chrome.runtime.sendMessage = unsafeWindow.chrome.runtime.sendMessage || function(){}

const oldSendMessage = unsafeWindow.chrome.runtime.sendMessage

if (GM_addStyle === undefined) {
	// https://stackoverflow.com/questions/23683439/gm-addstyle-equivalent-in-tampermonkey
	GM_addStyle = function (css) {
		const style = document.getElementById("GM_addStyleBy8626") || (function () {
			const style = document.createElement('style');
			style.type = 'text/css';
			style.id = "GM_addStyleBy8626";
			document.head.appendChild(style);
			return style;
		})();
		const sheet = style.sheet;
		sheet.insertRule(css, (sheet.rules || sheet.cssRules || []).length);
	}
}

function ButtonAction() {
	location.hash = "gfu"
	location.reload()
}

function MatchExtensionId(ExtensionId) {
	return ExtensionId === kAssessmentAssistantExtensionId
}

function GetGoogleForm() {
	const Containers = document.querySelectorAll("div.RGiwf")
	var Form

	for (const Container of Containers) {
		for (const Child of Container.childNodes) {
			if (Child.nodeName == "FORM") {
				Form = Child
			}
		}
	}

	return Form
}

function GetQuizHeader() {
	const QuizHeader = document.querySelector("div.mGzJpd")
	return QuizHeader
}

function PageIsErrored() {
	const QuizHeader = GetQuizHeader()
	if (QuizHeader === null) { return false }

	const ChildNodes = QuizHeader.childNodes
	if (ChildNodes[3].getAttribute("aria-live") === "assertive" && ChildNodes[4].getAttribute("aria-live") === "assertive") {
		return {title: ChildNodes[3].innerText, description: ChildNodes[4].innerText}
	}
	return false
}

function MatchErrorType(error) {
	if (error.title === "You can't access this quiz." && error.description === "Locked mode is on. Only respondents using managed Chromebooks can open this quiz. Learn more") {
		return ERROR_USER_AGENT
	}
	return ERROR_UNKNOWN
}

function MakeButton(Text, Callback, Color) {
	const Form = GetGoogleForm()
	if (Form === undefined) { return false }

	const ButtonHolder = Form.childNodes[2]

	const Button = document.createElement("div")
	Button.classList.value = "uArJ5e UQuaGc Y5sE8d TIHcue QvWxOd"
	Button.style.marginLeft = "10px"
	Button.style.backgroundColor = Color
	Button.setAttribute("role", "button")
	Button.setAttribute("tabindex", ButtonHolder.childNodes.length)
	Button.setAttribute("mia-gfu-state", "custom-button")
	ButtonHolder.appendChild(Button)

	const Glow = document.createElement("div")
	Glow.classList.value = "Fvio9d MbhUzd"
	Glow.style.top = '21px'
	Glow.style.left = '9px'
	Glow.style.width = '110px'
	Glow.style.height = '110px'
	Button.appendChild(Glow)

	const TextContainer = document.createElement("span")
	TextContainer.classList.value = "l4V7wb Fxmcue"
	Button.appendChild(TextContainer)

	const TextSpan = document.createElement("span")
	TextSpan.classList.value = "NPEfkd RveJvd snByac"
	TextSpan.innerText = Text
	TextContainer.appendChild(TextSpan)

	Button.addEventListener("click", Callback)

	return {destroy: function(){Button.remove()}}
}

async function IsOnChromebook() {
	return new Promise((resolve, _reject) => {
		oldSendMessage(kAssessmentAssistantExtensionId, {command: "isLocked"}, function(_response) {
			if (chrome.runtime.lastError) {
				resolve(false)
			}
			resolve(true)
		})
	})
}

async function Initialize() {
	GM_addStyle(`
.gfu-red {
    font-family: monospace;
    text-align: center;
    font-size: 11px;
    padding-top: 24px;
    color: red !important;
}
.EbMsme {
	transition: filter cubic-bezier(0.4, 0, 0.2, 1) 0.3s;
	filter: blur(8px) !important;
}
.EbMsme:hover {
	filter: blur(0px) !important;
}
`)

	const Errored = PageIsErrored()
	if (Errored !== false) {
		switch (MatchErrorType(Errored)) {
			case ERROR_USER_AGENT:
				const QuizHeader = GetQuizHeader()
				const Error = document.createElement("div")
				Error.classList.value = "gfu-red"
				QuizHeader.appendChild(Error)

				const ErrorSpan = document.createElement("span")
				ErrorSpan.innerText = "Google Forms Unlocker - In order to continue, you need a User Agent Spoofer. "
				Error.appendChild(ErrorSpan)

				const AnchorSpan = document.createElement("a")
				AnchorSpan.classList.value = "gfu-red"
				AnchorSpan.innerText = "Install one here."
				AnchorSpan.target = "_blank"
				AnchorSpan.rel = "noopener"
				AnchorSpan.href = "https://github.com/xNasuni/google-forms-unlocker/blob/main/README.md#spoofing-your-user-agent"
				ErrorSpan.appendChild(AnchorSpan)
				break
			default:
				alert(`Unhandled error type: ${JSON.stringify(Errored)}`)
		}
		return
	}

	const Form = GetGoogleForm()
	if (Form === undefined) { return false }

	const IsRealManagedChromebook = await IsOnChromebook()

	if (IsRealManagedChromebook === false) {
		const ButtonHolder = Form.childNodes[2]
		for (const Button of ButtonHolder.childNodes) {
			if (Button.getAttribute("mia-gfu-state") === "custom-button") { continue }
			Button.style.backgroundColor = "#ccc"
			Button.setAttribute("jsaction", "")
		}
	}
	MakeButton("Bypass", ButtonAction, "#ff90bf")
}

var fakeIsLocked = shouldSpoof
function InterceptCommand(Payload, Callback) {
	switch (Payload.command) {
		case "isLocked":
			Callback({locked: fakeIsLocked})
			return true
		case "lock":
			if (shouldSpoof) {
				return false
			}
			fakeIsLocked = false
			Callback({locked: fakeIsLocked})
			return true
		case "unlock":
			fakeIsLocked = false
			Callback({locked: fakeIsLocked})
			return true
	}

	return false
}

setInterval(() => {
    unsafeWindow.chrome.runtime.sendMessage = function() {
        const ExtensionId = (arguments)[0]
        const Payload = (arguments)[1]
        const Callback = (arguments)[2]

        if (MatchExtensionId(ExtensionId)) {
            const Intercepted = InterceptCommand(Payload, Callback)
            if (Intercepted) { return null }
        }
		console.warn("Not intercepting", ExtensionId, Payload, Callback)

        return oldSendMessage(ExtensionId, Payload, function() {
			if (chrome.runtime.lastError) {
				alert(`Google Forms Unlocker, please report this to the GitHub https://github.com/xNasuni/google-forms-unlocker/issues\nUnhandled error: ${JSON.stringify(chrome.runtime.lastError)}`)
				return
			}
			Callback.apply(this, arguments)
		})
    }
})

Object.defineProperty(document, 'hidden', {
	value: false,
	writable: false
})
Object.defineProperty(document, 'visibilityState', {
	value: "visible",
	writable: false
})
Object.defineProperty(document, 'webkitVisibilityState', {
	value: "visible",
	writable: false
})
Object.defineProperty(document, 'mozVisibilityState', {
	value: "visible",
	writable: false
})
Object.defineProperty(document, 'msVisibilityState', {
	value: "visible",
	writable: false
})
const BlacklistedEvents = ['mozvisibilitychange', 'webkitvisibilitychange', 'msvisibilitychange', 'visibilitychange']
const oldAddEventListener = unsafeWindow.document.addEventListener;
unsafeWindow.document.addEventListener = function() {
	const EventType = (arguments)[0]
	const Method = (arguments)[1]
	const Options = (arguments)[2]

	if (BlacklistedEvents.indexOf(EventType) !== -1) {
		console.log(`type ${EventType} blocked from being registered with`, Method)
		return
	}

	return oldAddEventListener.apply(this, arguments)
}

document.addEventListener("DOMContentLoaded", () => {
	Initialize()
})