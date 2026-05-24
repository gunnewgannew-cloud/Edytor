Edytor PRO
A professional, modular developer overlay for mobile and desktop browsers. Built on top of the Eruda engine, featuring a custom, modern UI and efficient module loading.
Quick Installation
Copy the code block below:
javascript:(function(){var d=document,v='?t='+Date.now();function l(s,c){var t=d.createElement('script');t.src=s;if(c)t.onload=c;d.body.appendChild(t);}var k=d.createElement('link');k.rel='stylesheet';k.href='https://cdn.jsdelivr.net/gh/gunnewgannew-cloud/Edytor@main/styles.css'+v;d.head.appendChild(k);l('https://cdn.jsdelivr.net/npm/eruda',function(){var e=d.createElement('div');d.body.appendChild(e);eruda.init({container:e,defaults:{theme:'dark'}});if(e.shadowRoot){var s=d.createElement('style');s.innerHTML='.eruda-entry-btn{display:none!important;width:0!important;height:0!important;opacity:0!important;}';e.shadowRoot.appendChild(s);}l('https://cdn.jsdelivr.net/gh/gunnewgannew-cloud/Edytor@main/editor.js'+v,function(){l('https://cdn.jsdelivr.net/gh/gunnewgannew-cloud/Edytor@main/menu.js'+v);});});})();
Go to your browser settings and add a new bookmark.
Set the name to Launch PRO.
Paste the copied code into the URL field (ensure it starts with javascript:).
Save the bookmark.
How to use
When you are on any website and want to launch the tools:
Click on your browser's address bar.
Start typing Launch PRO.
Select the bookmark from the list – the menu will load automatically!
Project Structure
styles.css - Modern Glassmorphism UI and system-level suppression of the default Eruda button.
editor.js - Custom DOM inspection and element editing logic.
menu.js - Floating PRO menu and module orchestration.
Key Features
Live DOM Editing: Edit any website's HTML on the go.
Cache-Busting: Every update on GitHub is instantly reflected via our CDN (jsDelivr).
Stealth Mode: The default interface is blocked via Shadow DOM manipulation.
