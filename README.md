# google-forms-unlocker
Tired of assignments in google forms having locked mode and not being able to do them on other computers? (or if you want to cheat which i do not condone at all.) Use this :)

### For use in personal computers, use this userscript:
# **[`INSTALL USERSCRIPT`](https://raw.githubusercontent.com/xNasuni/google-forms-unlocker/main/script.userscript.js)**
> You also need an extension or app that changes your User Agent, and changes it to something like this:
```yaml
Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36
```

### For use in chromebooks, you need access to console which may be blocked by School Policy.
#### If it is blocked, then you unfortunately can't use this.
```js
fetch("https://cdn.jsdelivr.net/gh/xNasuni/google-forms-unlocker@latest/script.userscript.js").then(s => s.text()).then(s => eval(s))
```
> Run the script above in a google form and you should see 2 buttons appear, press the one on the left if you want to do the quiz normally, and press the one on the right to do it without actually being in locked mode.

![image](https://github.com/xNasuni/google-forms-unlocker/assets/62818119/c2e23518-76e1-439b-bcee-c3ae570f24b3)
