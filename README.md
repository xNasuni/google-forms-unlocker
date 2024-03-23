# google-forms-unlocker
Tired of assignments in google forms having locked mode and not being able to do them on other computers? (or if you want to cheat which i do not condone at all.) Use this :)

### For use in personal computers, use this userscript:
# **[`INSTALL USERSCRIPT`](https://raw.githubusercontent.com/xNasuni/google-forms-unlocker/main/script.user.js)**
> You also need an extension or app that changes your User Agent, and changes it to something like this:
```yaml
Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36
```

### For use in chromebooks, you need access to console which may be blocked by School Policy.
#### If it is blocked, then you unfortunately can't use this.
```js
fetch("https://cdn.jsdelivr.net/gh/xNasuni/google-forms-unlocker@latest/script.user.js").then(s => s.text()).then(s => eval(s))
```
> Run the script above in a google form and you should see 2 buttons appear, press the one on the left if you want to do the quiz normally, and press the one on the right to do it without actually being in locked mode.

![image](https://github.com/xNasuni/google-forms-unlocker/assets/62818119/c2e23518-76e1-439b-bcee-c3ae570f24b3)

> If you see the error below, then just run the script below in a quiz on a chromebook, they disabled Eval and other things for Security Purposes.
![image](https://github.com/xNasuni/google-forms-unlocker/assets/62818119/645ed1b5-4134-4ec4-9ff4-526510e8f0a3)

## Instructions
> 1. Open developer console on a Google Form, and do not press Start quiz because that will put you in locked mode.
> 2. Paste the script and run it
> 3. It should open a new window, if not and some alert says that it stopped a popup from happening then you need to allow it.
> 4. If it does open a new window, you need to do 1 of 2 things, if it shows up as Start Quiz, then you need you close the tab (Ctrl + W), and re-run it until it actually opens it.
> 5. When it's opened, you're free to leave the tab and search for stuff or whatever you'd like, as I disabled the features for the website to tell when you leave the page.

#### !! IF YOU RUN THE SCRIPT AND YOU ARE IN THE QUIZ, DONT CLOSE THE TAB BECAUSE THEN TEACHERS WILL SEE THAT YOU OPENED IT TWICE WHEN YOU GO TO OPEN IT AGAIN. I'M LOOKING FOR A BYPASS FOR THIS BUT IN THE MEANTIME DON'T CLOSE THE QUIZ OR ELSE TEACHERS WILL GET SENT AN EMAIL AND THIS WILL SHOW UP ON YOUR SCORE !!
![image](https://github.com/xNasuni/google-forms-unlocker/assets/62818119/27ffb1ac-a3ef-4cfb-8306-c06d03d2b1a5)


```js
var Wnd = window.open(location.href, "_blank");

Wnd.addEventListener("load", () => {

    Wnd.document.originalAEL = Wnd.document.addEventListener;

    var IntervalId = -1;
    IntervalId = setInterval(() => {
        Wnd.Object.defineProperty(Wnd.document, 'hidden', {
            value: false,
            writable: false
        })
        Wnd.Object.defineProperty(Wnd.document, 'visibilityState', {
            value: "visible",
            writable: false
        })
        Wnd.Object.defineProperty(Wnd.document, 'webkitVisibilityState', {
            value: "visible",
            writable: false
        })
        Wnd.Object.defineProperty(Wnd.document, 'mozVisibilityState', {
            value: "visible",
            writable: false
        })
        Wnd.Object.defineProperty(Wnd.document, 'msVisibilityState', {
            value: "visible",
            writable: false
        })
        if (Wnd.document.originalAEL == undefined) {
            Wnd.document.originalAEL = Wnd.document.addEventListener;
        }
        Wnd.document.addEventListener = function(eventType, method, options) {
            Wnd.console.log(`type ${eventType} registered with`, method)
            if (eventType == 'mozvisibilitychange' || eventType == 'webkitvisibilitychange' || eventType == 'msvisibilitychange' || eventType == 'visibilitychange') {
                return;
            } else {
                return Wnd.document.originalAEL.apply(this, arguments)
            }
        }
    }, 100); // "anti" anti cheat incase anything gets added ig ill have to hide all these public vars
    Wnd.SpoofStage = "spoof.start"
    const nothing = { IsReturning: false, ReturnData: null }
    var IsFakeLocked = true // start locked, and it instantly goes into the quiz
    
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
    
    HookFunc(Wnd.chrome.runtime, 'sendMessage', HandleSMHook);
})
```
