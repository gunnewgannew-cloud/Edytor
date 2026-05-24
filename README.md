# 🚀 Edytor PRO

A custom, 100% modular developer overlay for mobile and desktop browsers. The project is built on top of the powerful [Eruda](https://github.com/liriliri/eruda) engine, but features its own modern interface (Glassmorphism) and dedicated tools.

## ✨ Key Features
* **Custom DOM Editor:** Scan elements on the page with your finger and edit their HTML code on the fly.
* **Developer Tools:** Full access to the Console, Elements structure, and Network tab.
* **Modern UI:** A floating main action button and a semi-transparent, fluid menu built with CSS.
* **Cloud Updates (Cache-Busting):** The project uses the `jsDelivr` CDN and dynamic timestamps. Every code change on GitHub is instantly visible upon the next bookmarklet click!
* **Shadow DOM Hack:** The default Eruda interface is completely disabled and blocked at the source.

---

## 🛠️ Project Structure (Modules)
The project is divided into 3 independent files for easier code management:
1.  `styles.css` – Manages the appearance, colors, menu layout, and completely hides the default Eruda gear icon.
2.  `editor.js` – Contains all the logic for the custom editor window and the on-screen element scanner.
3.  `menu.js` – Generates the "PRO" floating button, handles clicks, and connects all the tools together.

---

## 📱 How to use it? (Installation)

The tool is installed as a **Bookmarklet** in your browser.

1. Copy the loader code below:

\`\`\`javascript
javascript:(function(){var d=document,v='?t='+Date.now();function l(s,c){var t=d.createElement('script');t.src=s;if(c)t.onload=c;d.body.appendChild(t);}var k=d.createElement('link');k.rel='stylesheet';k.href='https://cdn.jsdelivr.net/gh/gunnewgannew-cloud/Edytor@main/styles.css'+v;d.head.appendChild(k);l('https://cdn.jsdelivr.net/npm/eruda',function(){var e=d.createElement('div');d.body.appendChild(e);eruda.init({container:e,defaults:{theme:'dark'}});if(e.shadowRoot){var s=d.createElement('style');s.innerHTML='.eruda-entry-btn{display:none!important;width:0!important;height:0!important;opacity:0!important;}';e.shadowRoot.appendChild(s);}l('https://cdn.jsdelivr.net/gh/gunnewgannew-cloud/Edytor@main/editor.js'+v,function(){l('https://cdn.jsdelivr.net/gh/gunnewgannew-cloud/Edytor@main/menu.js'+v);});});})();
\`\`\`

2. Add any webpage to your browser's bookmarks (e.g., on your phone).
3. Edit that newly created bookmark.
4. Change the name to something easy to type, e.g., `🚀 Launch PRO`.
5. In the **URL** field, delete everything and paste the copied code (make sure it starts with the word `javascript:`).
6. Save.

### 🎯 Launching
When you are on any website and want to launch the tools:
* Click on the browser's address bar.
* Start typing the name of the bookmark (e.g., `🚀 Launch`).
* Click the suggested bookmark from the search results. You're all set!
* 
