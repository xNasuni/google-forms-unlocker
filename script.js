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
