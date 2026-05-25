# 🚀 DevKit PRO (Mobile Web Debugger)

An ultimate, zero-install mobile web debugging tool that turns your smartphone browser into a powerhouse IDE. Designed specifically for mobile web developers who need to inspect, edit, and debug DOM/Network on the go without relying on USB debugging.

## ✨ Key Features

* 💎 **Pro Glassmorphism UI:** A beautiful, dark-themed, translucent interface inspired by modern desktop IDEs. Features custom scrollbars, glowing badges, and highly readable syntax highlighting for mobile screens.
* ⚡ **Live Element Editor:** Instantly edit text, HTML structure, and CSS of any DOM element directly from your phone.
* 💻 **Integrated Console & Network:** Built on top of `vConsole` but heavily visually tuned. Monitor API calls, check JavaScript errors, and browse the DOM tree with ease.
* 💾 **Time Machine (Save on Refresh):** *[Experimental]* Accidental pull-to-refresh? No problem. This feature takes a snapshot of your modified DOM and persists your exact changes across hard page reloads using local cache.
* 🔄 **Session Auto-Resume:** The tool remembers your workflow. If you refresh the page while inspecting the Network tab or editing an element, DevKit PRO will automatically launch and reopen exactly where you left off.

## 📦 Installation (Bookmarklet Method)

Since this is a lightweight script, you don't need to install any browser extensions. It works via a standard bookmarklet on Chrome/Safari/Firefox for iOS & Android.

1. Create a new bookmark in your mobile browser.
2. Edit the bookmark and name it something memorable (e.g., `DevKit PRO`).
3. Replace the URL with the minified version of the JavaScript code. **Make sure it starts with `javascript:`**.
4. Save the bookmark.

## 🛠️ How to Use

1. Navigate to any website you want to inspect or modify.
2. Tap your browser's URL address bar and type `DevKit PRO` (or whatever you named the bookmark).
3. Tap the bookmark from the suggestion list.
4. A floating **PRO** button will appear on your screen. Tap it to expand the developer menu.

### Note on "Save on Refresh" ⚠️
When you toggle the `💾 Save on refresh` feature, the script intercepts the `beforeunload` event, cleans the injected UI from the DOM, and saves the pure HTML structure to `localStorage`. Upon reloading, it injects the modified HTML back into the document. 

*To disable this and return to the original website structure, simply click the active green button again to clear the cache and reload the page.*

## 📄 License
MIT License. Feel free to fork, modify, and enhance your mobile debugging experience!

