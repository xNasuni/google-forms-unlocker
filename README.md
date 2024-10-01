###### tags: google forms locked mode bypass, google forms unlocked, google forms unlocker, google forms lockpicker, google forms locked mode without chromebook

# Google Forms Unlocker [1.7]
>### Created by [Mia](https://github.com/xNasuni/)<br>Made with ❤

> [!IMPORTANT]<br>This repository contains scripts & methods that bypass google forms locked mode with ease, if you have any trouble you can use the discussions section to ask for help.


# Available Methods
> #### [Personal Computer](#personal-computer-windows-macbook-etc) (**with** extensions)<br> [Managed/School Chromebook](#managed-chromebook-blocked-extensions) (no extensions)<br> [Chromebook](#chromebook-personal) (**with** extensions)


> [!CAUTION]<br>I can't stop you from misusing this, but I do not condone cheating or using this to pass a test, quiz, exam, and etc. It is wrong and you should think twice before stooping to this level. I created this strictly for educational purposes.

<br><br>
## Managed Chromebook (blocked extensions)
> [!WARNING]
> You need to to use developer tools on your School Chromebook which can be disabled by your administrator. In order to see if they're disabled or not, go to any website like [example.com](https://example.com) and press `Ctrl` + `Shift` + `I`, if nothing happens you can try right clicking on the page and see if the `Inspect` action is disabled/grayed out, if it is grayed out then you can't use this method, and most likely can't use anything in this repository. For more information see [understanding the developer tools](#understanding-the-developer-tools)

> [!NOTE]
> #### What You Need:
> * a functioning brain with atleast 10 braincells
### 1 — Paste the script in the developer console while in the form
> You need to paste [this script](https://github.com/xNasuni/google-forms-unlocker/tree/main/script.js) into the developer tools console on a quiz page where you should see the "Start quiz" button. Don't press "Start quiz" because this will put you into locked mode.
### 2 - Executing the script
> After you're done pasting it into the console, you need to press `Enter`, and as soon as a new tab opens, you need to press `Shift + Tab` to move back to the tab you were just in, forcing the opened tab to delay script execution, just enough for our script to run first.<br>

If you did the steps correctly, you should have a tab with the quiz opened, like normal, but inside of the quiz like if it wasn't locked. You can do whatever you want from here. After you are done with the quiz you can just submit it like normal. If you don't see the quiz, close the tab that was opened and redo this step.


<br><br><br>

## Chromebook (personal)
> [!NOTE]
> #### What You Need:
> * [**User Script Manager**](#using-a-user-script-manager)

### 1 — Installing the User Script on your Chromebook
> In order to actually install the User Script, you need a User Script Manager, which you can pick and install any from the curated list I made [here](#using-a-user-script-manager). After you have installed one of those extensions, you should be able to click on the link below and it should prompt you to install the user script.<br>
> ## [`INSTALL USERSCRIPT`](https://raw.githubusercontent.com/xNasuni/google-forms-unlocker/main/script.user.js)
Now that you have the user script installed, you can go to any google form and if it has locked mode turned on, you can do the form without actually going into locked mode which usually removes your ability to use Google or look at other tabs.

<br><br>

## Personal Computer (windows, macbook, etc...)
> [!NOTE]
> #### What You Need:
> * [**User Agent Spoofer**](#spoofing-your-user-agent)
> * [**User Script Manager**](#using-a-user-script-manager)

### 1 — Setting up the User Agent Changer
> Because you aren't on an actual Chromebook, you need to convince the website that you are on one. The way you can do this is by using a User Agent Changer, and setting it to something like this:
> ```
> Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36
> ```
> When you visit websites with this User Agent, they will see that you are on a Chromebook because of the ChromeOS platform tagging, like **`CrOS`**.

After you have your user agent set to something like that, you can continue on to [section #2](#2--installing-the-user-script-on-your-computer).
<br>
### 2 — Installing the User Script on your Computer

> In order to actually install the User Script, you need a User Script Manager, which you can pick and install any from the curated list I made [here](#using-a-user-script-manager). After you have installed one of those extensions, you should be able to click on the link below and it should prompt you to install the user script.<br>
> ## [`INSTALL USERSCRIPT`](https://raw.githubusercontent.com/xNasuni/google-forms-unlocker/main/script.user.js)
Now that you have the user script installed, you can go to any google form and if it has locked mode turned on, you can do the quiz without even being on a Chromebook.
> [!IMPORTANT]
> After you are finished with the form, you should revert your user agent back to the default one. If you don't, it will cause issues for you going to other websites in the future.

<br><br><br>
# Definitions
### Using a User Script Manager
> [!IMPORTANT]
> Userscript managers are extensions that make it easier to run code without having to actually use the developer console. You can install scripts that are code that get injected on websites, this is useful because it makes it easier for you, because all you have to do is install the user-script that I made and have the code run to force unlock the locked quiz. **If you are on a Chromebook and installing extensions is blocked, you can use the developer console as a workaround.**

- [TamperMonkey](https://chromewebstore.google.com/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo) (+11,000,000 users)
- [OrangeMonkey](https://chromewebstore.google.com/detail/orangemonkey-pro/ggdmdoodcfamjggeigifpjfnnjfbland) **— Personal Choice** (+2,000,000 users)
- [ViolentMonkey](https://chromewebstore.google.com/detail/violentmonkey/jinjaccalgkegednnccohejagnlnfdag) (+1,000,000 users)
---
### Spoofing Your User Agent
> [!IMPORTANT]
> In order to do a locked quiz on a device other than a Managed Chromebook, you need to make the website think that you are on a Chromebook, the way it knows if you are on a Chromebook is the User Agent related to your browser. Using a User Agent Spoofer/Changer/Switcher Extension tricks websites into thinking you are on a different device than you actually are. **If you are on a Chromebook you do not need to do this.**

- [**User Agent Switcher for Chrome**](https://chromewebstore.google.com/detail/user-agent-switcher-for-c/djflhoibgkdhkhhcedjiklpkjnoahfmg) (+1,000,000 users)
- [**User Agent Switcher and Manager**](https://chromewebstore.google.com/detail/user-agent-switcher-and-m/bhchdcejhohfmigjafbampogmaanbfkg) **— Personal Choice** (+300,000 users)
- [**User Agent Switcher**](https://chromewebstore.google.com/detail/user-agent-switcher/kchfmpdcejfkipopnolndinkeoipnoia) (+100,000 users)
---
### Understanding the Developer Tools
> [!IMPORTANT]
> Chrome's Developer Tools, otherwise known as **'Inspect Element'**, are very powerful additions to the browser that can do a lot of things, including run code on whatever website you are on. If you are on a school chromebook and can't install extensions, you might be able to use Developer Tools as a workaround.
> 
> In order to see if you can use developer tools, you can go to any website like [example.com](https://example.com) and right click on the empty space, and a context menu should pop up.
> 
> If you can select and click on the **'Inspect'** option and a whole menu appears on the right side of the screen, you can use this method on your Chromebook, however, if you can't open it OR the button is grayed out, you can't run code.

![picture showing the context menu that appears when you right click to open the context menu for page inspection](https://github.com/user-attachments/assets/3b056b5b-7ea0-4ce5-8b86-8ac03fc49371)


:3