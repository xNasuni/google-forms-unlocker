(async () => {
    if (window.LockedModeSpoof === true) {
        throw new Error("Don't re-execute this script! Please just refresh and execute again.");
    }

    if (window.location.host !== "docs.google.com") {
        var WantsToRunAnyway = confirm("This doesn't seem like the correct site (docs.google.com). Do you still want to run this script?")
    
        if (!WantsToRunAnyway) {
            return;
        }
    }

    function WaitForSelector(selector) { // source: https://stackoverflow.com/questions/5525071/how-to-wait-until-an-element-exists
        return new Promise(resolve => {
            if (document.querySelector(selector)) {
                return resolve(document.querySelector(selector));
            }
    
            const observer = new MutationObserver(mutations => {
                if (document.querySelector(selector)) {
                    observer.disconnect();
                    resolve(document.querySelector(selector));
                }
            });
    
            // If you get "parameter 1 is not of type 'Node'" error, see https://stackoverflow.com/a/77855838/492336
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    function AddButton(ButtonInfo, FormHolder) {
        for (var TextHolder of document.getElementsByClassName('NPEfkd RveJvd snByac')) {
            if (TextHolder.innerText === 'Continue') {
                TextHolder.innerText = 'Start quiz without spoofing'
            }
        }
        
        const ActiveHolder = document.createElement('div');
        ActiveHolder.style.setProperty('margin-left', "10px");
    
        const ButtonHolder = document.createElement('div');
    
        const ButtonElement = document.createElement('button');
        ButtonElement.setAttribute('class', "uArJ5e UQuaGc Y5sE8d TIHcue QvWxOd M9Bg4d j7nIZb");
        ButtonElement.setAttribute('role', "button");
        ButtonElement.setAttribute('tabindex', "0");
        ButtonElement.setAttribute('aria-describedby', "i1 i2");
        ButtonElement.style.setProperty('background-color', "#ff90bf");
    
        const ButtonFX = document.createElement('div');
        ButtonFX.setAttribute('class', "Fvio9d MbhUzd");
        ButtonFX.setAttribute('jsname', "ksKsZd");
    
        const ButtonColor = document.createElement('div');
        ButtonColor.setAttribute('class', "e19J0b CeoRYc");
    
        const ButtonTextHolder = document.createElement('span');
        ButtonTextHolder.setAttribute('class', "l4V7wb Fxmcue");
    
        const ButtonText = document.createElement('span');
        ButtonText.setAttribute('class', "NPEfkd RveJvd snByac");
        ButtonText.innerText = ButtonInfo.Text;
    
        FormHolder.appendChild(ActiveHolder);
        ActiveHolder.appendChild(ButtonHolder);
        ButtonHolder.appendChild(ButtonElement);
        ButtonElement.appendChild(ButtonFX);
        ButtonElement.appendChild(ButtonColor);
        ButtonElement.appendChild(ButtonTextHolder);
        ButtonTextHolder.appendChild(ButtonText);
        ButtonElement.addEventListener('click', ButtonInfo.Action);
    }

    if (window.spoofstage === 'user-agent') {
        alert(`There currently is no solution for the user-agent problem (if you are just looking to not be in locked mode in chromebook you should be good) but you should be able to use any extension on the chrome web store and extensions alike that change your User Agent. The necessary one is put in the github.`)
    }
    
    if (typeof chrome === "undefined" && window.spoofstage === 'chrome.runtime') { // Spoof Chrome Extension API
        function Inspect(_){
            return function(){
                // console.warn(_, arguments) <-- was used for debugging purposes during development
            }
        }
        
        window.chrome = Object();
    
        window.chrome.app = Object();
        window.chrome.app.InstallState = {"DISABLED": "disabled", "INSTALLED": "installed", "NOT_INSTALLED": "not_installed"}
        window.chrome.app.RunningState = {"CANNOT_RUN":"cannot_run","READY_TO_RUN":"ready_to_run","RUNNING":"running"}
        window.chrome.app.getDetails = Inspect('getDetails')
        window.chrome.app.getIsInstalled = Inspect('getIsInstalled')
        window.chrome.app.installState = Inspect('installState')
        window.chrome.app.isInstalled = false
        window.chrome.app.runningState = Inspect('runningState')
    
        window.chrome.csi = Inspect('csi')
        window.chrome.loadTimes = Inspect('loadTimes')
    
        window.chrome.runtime = Object();
    
        window.chrome.runtime.ContextType = {"BACKGROUND":"BACKGROUND","OFFSCREEN_DOCUMENT":"OFFSCREEN_DOCUMENT","POPUP":"POPUP","SIDE_PANEL":"SIDE_PANEL","TAB":"TAB"}
        window.chrome.runtime.OnInstalledReason = {"CHROME_UPDATE":"chrome_update","INSTALL":"install","SHARED_MODULE_UPDATE":"shared_module_update","UPDATE":"update"}
        window.chrome.runtime.OnRestartRequiredReason = {"APP_UPDATE":"app_update","OS_UPDATE":"os_update","PERIODIC":"periodic"}
        window.chrome.runtime.PlatformArch = {"ARM":"arm","ARM64":"arm64","MIPS":"mips","MIPS64":"mips64","X86_32":"x86-32","X86_64":"x86-64"}
        window.chrome.runtime.PlatformNaclArch = {"ARM":"arm","MIPS":"mips","MIPS64":"mips64","X86_32":"x86-32","X86_64":"x86-64"}
        window.chrome.runtime.PlatformOs = {"ANDROID":"android","CROS":"cros","FUCHSIA":"fuchsia","LINUX":"linux","MAC":"mac","OPENBSD":"openbsd","WIN":"win"}
        window.chrome.runtime.RequestUpdateCheckStatus = {"NO_UPDATE":"no_update","THROTTLED":"throttled","UPDATE_AVAILABLE":"update_available"}
        
        window.chrome.runtime.connect = Inspect('connect')
        window.chrome.runtime.id = undefined
        window.chrome.runtime.sendMessage = Inspect('sendMessage')
    }

    if (window.spoofstage === 'chrome.runtime') {
        const Buttons = [
            {
                Text: "Launch quiz with spoofing",
                Color: "#ff90bf",
                Action: function() {
                    alert('test')
                }
            }
        ]
        
        var FormHolder;
        
        for (var MainHolder of document.getElementsByClassName('RGiwf')) {
            if (MainHolder.parentNode.getAttribute('class') === MainHolder.getAttribute('class')) {
                FormHolder = MainHolder
            }
        }
        
        if (FormHolder === undefined) {
            throw new ReferenceError(`Can't find form holder ${FormHolder}, this might be due to Google Forms having the HTML classes changed so if this ever happens please report it to the Github over at https://github.com/xNasuni/google-forms-unlocker/issues.`)
        }
        
        FormHolder.style.setProperty("flex-direction", "row")
        
        for (Button of Buttons) {
            AddButton(Button, FormHolder)
        }
        
        const nothing = { IsReturning: false, ReturnData: null }
        var IsFakeLocked = false
        
        function HookFunc(FuncParent, FuncName, HookCallback) {
            (function (OriginalFunction) {
                FuncParent[FuncName] = function () {
                    var CustomReturn = HookCallback([OriginalFunction, arguments])
                    if (CustomReturn.IsReturning == true) {
                        arguments[2](CustomReturn.ReturnData) // return fake data with fake locked mode variable
                        return CustomReturn.ReturnData; // prevent communication with locker-ext
                    }
                    var ReturnValue = OriginalFunction.apply(this, arguments)
        
                    return ReturnValue;
                }
            }(FuncParent[FuncName]))
        }
        
        function HandleSMHook(HookData) {
            var ReturnData = nothing;
            const ExtId = HookData[1][0]
            if (ExtId != "gndmhdcefbhlchkhipcnnbkcmicncehk") { return nothing; }
        
            const ReqCmd = HookData[1][1]['command']
        
            switch (ReqCmd) {
                case 'lock':
                    IsFakeLocked = true
                    ReturnData.IsReturning = true
                    ReturnData.ReturnData = { locked: IsFakeLocked }
                    break;
                case 'isLocked':
                    ReturnData.IsReturning = true
                    ReturnData.ReturnData = { locked: IsFakeLocked }
                    break;
                case 'unlock':
                    IsFakeLocked = false
                    ReturnData.IsReturning = true
                    ReturnData.ReturnData = { locked: IsFakeLocked }
                    break;
            }
        
            return ReturnData;
        }
        
        HookFunc(chrome.runtime, 'sendMessage', HandleSMHook)
    }

    window.LockedModeSpoof = true
    
    var HeaderClass = 'kVkD5b'
    var FormClass = 'mGzJpd'
    
    var Header = await WaitForSelector(`.${HeaderClass}`)
    console.warn(Header)
    var Form = document.getElementsByClassName(FormClass)[0]
    
    if (Header === undefined) {
        console.warn(`Can't find header ${Header}, possibly due to pre-existing User-Agent Spoofer. Continuing action!`)
    } else {
        if (Form === undefined) {
            throw new ReferenceError(`Can't find form ${Form}, might be due to you running it on a page that wasn't 'docs.google.com'.`)
        }

        const HeaderText = Header.innerText;
        if (HeaderText.toLowerCase() === "you can't access this quiz.") { // user agent doesn't match chrome os
            AddButton({
                Text: "Continue anyway? (You need to have ChromeOS User-Agent)",
                Color: "#8cff9e",
                Action: function() {
                    var ScriptWindow = window.open(window.location.href)
                    ScriptWindow.spoofstage = 'user-agent'
                    ScriptWindow.eval.call(`fetch("https://raw.githubusercontent.com/xNasuni/google-forms-unlocker/main/script.js").then(s => s.text()).then(s => eval(s))`)
                }
            }, Form)
        }
        if (HeaderText.toLowerCase() === "there was an error opening this quiz.") { // user agent matches chrome os but chrome.runtime isn't spoofed
            AddButton({
                Text: "Continue anyway? (Spoofing & hooking chrome.runtime API)",
                Color: "#8cff9e",
                Action: function() {
                    var ScriptWindow = window.open(window.location.href)
                    ScriptWindow.spoofstage = 'chrome.runtime'
                    ScriptWindow.eval.call(`fetch("https://raw.githubusercontent.com/xNasuni/google-forms-unlocker/main/script.js").then(s => s.text()).then(s => eval(s))`)
                }
            }, Form)
        }
    }
})()
