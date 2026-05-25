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
3. Copy the entire code block below and paste it directly into the **URL / Address** field of the bookmark:

```javascript
javascript:(function() {
    var d = document;
    console.log("--- Menu.js Wersja 6.4 (Full Session Auto-Resume) załadowana ---");

    var isSaveOnRefreshActive = localStorage.getItem('pro_save_on_refresh') === 'true';
    var savedHTML = localStorage.getItem('pro_persisted_html');

    if (isSaveOnRefreshActive && savedHTML) {
        d.body.innerHTML = savedHTML;
        console.log("🚀 [PRO] Stan struktury HTML został pomyślnie przywrócony!");
    }

    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;

        var targetRoot = vcDom.shadowRoot || vcDom;
        if (targetRoot.querySelector('#gannew-devkit-theme')) return; 

        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            .vc-main, .vc-content, .vc-panel, .vc-logbox { background-color: rgba(10, 13, 20, 0.82) !important; background: rgba(10, 13, 20, 0.82) !important; }
            .vc-main { border-radius: 20px 20px 0 0 !important; border-top: 3px solid #ffd700 !important; overflow: hidden !important; box-shadow: 0 -15px 40px rgba(0,0,0,0.85) !important; font-family: 'Segoe UI Variable Display', -apple-system, sans-serif !important; backdrop-filter: blur(14px) !important; -webkit-backdrop-filter: blur(14px) !important; }
            .vc-tabbar { background-color: rgba(17, 22, 34, 0.7) !important; border-bottom: 2px solid rgba(255, 215, 0, 0.3) !important; height: 44px !important; display: flex !important; align-items: center !important; padding: 0 !important; }
            .vc-tabbar .vc-tab:not(.vc-actived):not(.vc-active) { display: none !important; }
            .vc-tabbar .vc-tab.vc-actived, .vc-tabbar .vc-tab.vc-active { width: 100% !important; color: #ffd700 !important; border-bottom: 3px solid #ffd700 !important; background-color: transparent !important; text-shadow: 0 0 6px rgba(255, 215, 0, 0.6) !important; pointer-events: none !important; font-size: 14px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; display: flex !important; align-items: center !important; justify-content: center !important; margin: 0 !important; }
            .vc-tabbar .vc-tab::after, .vc-topbar .vc-tab::after { display: none !important; content: none !important; }
            .vc-content { padding-top: 20px !important; padding-left: 12px !important; padding-right: 12px !important; }
            .vc-panel[data-plugin="element"] *, .vc-html-tree *, div[class*="element-node"] { font-family: 'JetBrains Mono', 'Fira Code', monospace !important; font-size: 13px !important; line-height: 1.8 !important; }
            div[class*="element-node"], .vc-html-tree div { border-left: 1px dotted rgba(255, 215, 0, 0.15) !important; padding-left: 14px !important; margin-left: 6px !important; }
            .vc-panel .vc-html-tag, span[class*="tag"], span[class*="node-tag"] { color: #51afef !important; font-weight: bold !important; }
            .vc-panel .vc-html-attr-name, span[class*="attr-name"] { color: #e5c07b !important; font-weight: 500 !important; }
            .vc-panel .vc-html-attr-val, span[class*="attr-val"], span[class*="attr-value"] { color: #98c379 !important; }
            .vc-panel { color: #abb2bf !important; }
            .vc-toggle-btn, span[class*="toggle"], i[class*="arrow"] { color: #ffd700 !important; font-weight: 900 !important; }
            div[class*="element-node"]:hover { background-color: rgba(255, 215, 0, 0.04) !important; border-radius: 4px !important; }
            .vc-topbar { background-color: transparent !important; border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important; height: 38px !important; }
            .vc-topbar .vc-tab { color: #8b949e !important; font-weight: 600 !important; }
            .vc-topbar .vc-tab.vc-actived { color: #ffd700 !important; border-bottom: 2px solid #ffd700 !important; }
            .vc-logbox .vc-item { border-bottom: 1px solid rgba(255,255,255,0.02) !important; padding: 10px 14px !important; margin: 2px 6px !important; border-radius: 6px !important; }
            .vc-logbox .vc-item:nth-child(even) { background-color: rgba(255, 255, 255, 0.02) !important; }
            ::-webkit-scrollbar { width: 6px !important; height: 6px !important; }
            ::-webkit-scrollbar-track { background: transparent !important; }
            ::-webkit-scrollbar-thumb { background: #c5a037 !important; border-radius: 10px !important; }
            .vc-toolbar { background-color: rgba(17, 22, 34, 0.7) !important; border-top: 1px solid rgba(255, 255, 255, 0.08) !important; padding: 6px !important; }
            .vc-toolbar .vc-btn { background: rgba(22, 27, 38, 0.85) !important; color: #e5c07b !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; border-radius: 8px !important; margin: 0 4px !important; font-size: 13px !important; font-weight: 700 !important; }
            .vc-cmd { background-color: transparent !important; border-top: 1px solid rgba(255, 255, 255, 0.08) !important; padding: 8px !important; }
            .vc-cmd-input, .vc-search-input, input[class*="input"] { background-color: rgba(22, 27, 38, 0.85) !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; border-radius: 10px !important; color: #ffd700 !important; font-family: 'JetBrains Mono', monospace !important; padding: 8px 12px !important; }
            .vc-cmd-btn { background: #ffd700 !important; color: #0a0d14 !important; border-radius: 10px !important; font-weight: 800 !important; }
        `;
        targetRoot.appendChild(style);
    }

    window.addEventListener('beforeunload', function() {
        if (localStorage.getItem('pro_save_on_refresh') === 'true') {
            var clone = d.body.cloneNode(true);
            var menuEl = clone.querySelector('#pro-menu'); if (menuEl) menuEl.remove();
            var fabEl = clone.querySelector('#pro-fab'); if (fabEl) fabEl.remove();
            var vcEl = clone.querySelector('#__vconsole'); if (vcEl) vcEl.remove();
            var themeEl = clone.querySelector('#gannew-devkit-theme'); if (themeEl) themeEl.remove();
            localStorage.setItem('pro_persisted_html', clone.innerHTML);
        }
    });

    function loadAndShowVConsole(tabName) {
        var triggerVConsole = function() {
            try {
                if (!window.vConsoleInstance) { window.vConsoleInstance = new window.VConsole({ theme: 'dark' }); }
                window.vConsoleInstance.show();
                if (typeof window.vConsoleInstance.showPlugin === 'function' && tabName) { window.vConsoleInstance.showPlugin(tabName); } 
                else if (typeof window.vConsoleInstance.showTab === 'function' && tabName) { window.vConsoleInstance.showTab(tabName); }
                applyGannewTheme();
                setTimeout(applyGannewTheme, 50);
                setTimeout(applyGannewTheme, 250);
            } catch(e) { console.error("Błąd vConsole: ", e); }
        };
        if (window.VConsole) { triggerVConsole(); } 
        else {
            var s = d.createElement('script');
            s.src = '[https://unpkg.com/vconsole@latest/dist/vconsole.min.js](https://unpkg.com/vconsole@latest/dist/vconsole.min.js)';
            s.onload = triggerVConsole;
            d.head.appendChild(s);
        }
    }

    var menu = d.getElementById('pro-menu');
    if (!menu) {
        var fab = d.createElement('div');
        fab.id = 'pro-fab';
        fab.innerText = 'PRO';
        d.body.appendChild(fab);

        menu = d.createElement('div');
        menu.id = 'pro-menu';
        menu.innerHTML = `
            <button class="pro-menu-btn accent" id="btn-edytor">⚡ Edytuj Element</button>
            <button class="pro-menu-btn" id="btn-console">💻 Konsola</button>
            <button class="pro-menu-btn" id="btn-elements">🔍 Struktura (DOM)</button>
            <button class="pro-menu-btn" id="btn-network">🌐 Sieć (Network)</button>
            <button class="pro-menu-btn" id="btn-save-refresh">💾 Save on refresh (Experimental)</button>
            <button class="pro-menu-btn" id="btn-close-tools" style="color: #ef5350; margin-top: 5px;">❌ Zamknij Narzędzia</button>
        `;
        d.body.appendChild(menu);
        fab.onclick = function() { menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex'; };
    }

    var btnSaveRefresh = d.getElementById('btn-save-refresh');
    if (isSaveOnRefreshActive) {
        btnSaveRefresh.style.setProperty('background', 'rgba(76, 175, 80, 0.2)', 'important');
        btnSaveRefresh.style.setProperty('border', '1px solid #4caf50', 'important');
        btnSaveRefresh.style.setProperty('color', '#81c784', 'important');
        btnSaveRefresh.innerText = '💾 Save on refresh: [AKTYWNY]';
    } else {
        btnSaveRefresh.style.setProperty('background', 'rgba(255, 152, 0, 0.1)', 'important');
        btnSaveRefresh.style.setProperty('border', '1px solid rgba(255, 152, 0, 0.4)', 'important');
        btnSaveRefresh.style.setProperty('color', '#ffb74d', 'important');
    }

    btnSaveRefresh.onclick = function() {
        if (localStorage.getItem('pro_save_on_refresh') !== 'true') {
            var stan = confirm("⚠️ FUNKCJA EKSPERYMALNA\n\nCzy na pewno chcesz włączyć 'Save on refresh'? \n\nSkrypt spróbuje zamrozić i odtworzyć obecny stan kodu HTML po odświeżeniu strony.");
            if (stan) {
                localStorage.setItem('pro_save_on_refresh', 'true');
                var clone = d.body.cloneNode(true);
                var m = clone.querySelector('#pro-menu'); if(m) m.remove();
                var f = clone.querySelector('#pro-fab'); if(f) f.remove();
                var v = clone.querySelector('#__vconsole'); if(v) v.remove();
                localStorage.setItem('pro_persisted_html', clone.innerHTML);
                location.reload();
            }
        } else {
            localStorage.removeItem('pro_save_on_refresh');
            localStorage.removeItem('pro_persisted_html');
            localStorage.removeItem('pro_last_active_tool');
            alert("Funkcja została wyłączona. Przy następnym odświeżeniu strona powróci do swojego oryginalnego stanu.");
            location.reload();
        }
    };

    d.getElementById('btn-edytor').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'edytor'); if(window.StartEdytorPro) window.StartEdytorPro(); };
    d.getElementById('btn-console').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'console'); loadAndShowVConsole('default'); };
    d.getElementById('btn-elements').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'element'); loadAndShowVConsole('element'); };
    d.getElementById('btn-network').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'network'); loadAndShowVConsole('network'); };
    d.getElementById('btn-close-tools').onclick = function() { if(window.vConsoleInstance) window.vConsoleInstance.hide(); menu.style.display = 'none'; localStorage.removeItem('pro_last_active_tool'); };

    if (isSaveOnRefreshActive) {
        var lastTool = localStorage.getItem('pro_last_active_tool');
        if (lastTool === 'edytor') {
            var checkEditor = setInterval(function() {
                if (typeof window.StartEdytorPro === 'function') { clearInterval(checkEditor); window.StartEdytorPro(); }
            }, 50);
            setTimeout(function() { clearInterval(checkEditor); }, 3000);
        } else if (lastTool) { loadAndShowVConsole(lastTool === 'console' ? 'default' : lastTool); }
    }
})();
4. Save the bookmark.
## 🛠️ How to Use

1. Navigate to any website you want to inspect or modify.
2. Tap your browser's URL address bar and type `DevKit PRO` (or whatever you named the bookmark).
3. Tap the bookmark from the browser's suggestion list.
4. A floating **PRO** button will appear on your screen. Tap it to expand the developer menu.

### Note on "Save on Refresh" ⚠️
When you toggle the `💾 Save on refresh` feature, the script intercepts the `beforeunload` event, cleans the injected UI from the DOM, and saves the pure HTML structure to `localStorage`. Upon reloading, it injects the modified HTML back into the document. 

*To disable this and return to the original website structure, simply click the active green button again to clear the cache and reload the page.*

## 📄 License
MIT License. Feel free to fork, modify, and enhance your mobile debugging experience!
