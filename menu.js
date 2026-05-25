(function() {
    var d = document;

    // [KROK 0] BEZPIECZEŃSTWO - INTELIGENTNE OSTRZEŻENIE (SECURITY GUARD)
    var sensitiveKeywords = ['bank', 'login', 'checkout', 'paypal', 'signin', 'sign-in', 'haslo', 'password', 'platnosci', 'payu', 'mojeid', 'secure'];
    var currentUrl = window.location.href.toLowerCase();
    var isSensitive = sensitiveKeywords.some(function(keyword) {
        return currentUrl.indexOf(keyword) !== -1;
    });

    if (isSensitive) {
        var proceed = confirm("🚨 OSTRZEŻENIE BEZPIECZEŃSTWA (DevKit PRO)\n\nWykryto, że próbujesz uruchomić skrypt na stronie zawierającej wrażliwe dane (logowanie, bankowość, płatności).\n\nUruchamianie zewnętrznych narzędzi (bookmarkletów) w takich miejscach niesie ryzyko przejęcia poufnych informacji. Jeśli ufasz temu skryptowi i wiesz co robisz, kliknij OK. W przeciwnym razie kliknij Anuluj.");
        if (!proceed) {
            console.warn("🔒 [PRO] Uruchomienie zablokowane ze względów bezpieczeństwa.");
            return; // Całkowite przerwanie działania skryptu
        }
    }

    console.log("--- Menu.js Wersja 7.0 (Security Guard + X-Ray Inspector + Auto-Resume) załadowana ---");

    // ==========================================
    // [MODUŁ] TRYB X-RAY (WIZUALNY EDYTOR)
    // ==========================================
    window.StartEdytorPro = function() {
        if (window.__proXRayActive) return;
        window.__proXRayActive = true;

        // Tworzenie nakładki przechwytującej kliknięcia/dotyk
        var overlay = d.createElement('div');
        overlay.id = 'pro-xray-overlay';
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999999;cursor:crosshair;background:transparent;touch-action:none;';
        d.body.appendChild(overlay);

        // Tworzenie podświetlenia (złoty kwadrat)
        var highlight = d.createElement('div');
        highlight.id = 'pro-xray-highlight';
        highlight.style.cssText = 'position:absolute;z-index:999998;pointer-events:none;background:rgba(255, 215, 0, 0.25);border:2px dashed #ffd700;border-radius:4px;transition:all 0.05s ease-out;display:none;backdrop-filter:contrast(1.2);';
        d.body.appendChild(highlight);

        var targetEl = null;

        function updateHighlight(clientX, clientY) {
            // Na ułamek sekundy wyłączamy nakładkę, by sprawdzić, co jest pod nią
            overlay.style.pointerEvents = 'none';
            var el = d.elementFromPoint(clientX, clientY);
            overlay.style.pointerEvents = 'auto';

            if (el && el !== highlight && el !== overlay && !el.closest('#pro-menu') && !el.closest('#__vconsole')) {
                targetEl = el;
                var rect = el.getBoundingClientRect();
                highlight.style.width = rect.width + 'px';
                highlight.style.height = rect.height + 'px';
                highlight.style.top = (rect.top + window.scrollY) + 'px';
                highlight.style.left = (rect.left + window.scrollX) + 'px';
                highlight.style.display = 'block';
            } else {
                targetEl = null;
                highlight.style.display = 'none';
            }
        }

        function handleMove(e) {
            var cx = e.touches ? e.touches[0].clientX : e.clientX;
            var cy = e.touches ? e.touches[0].clientY : e.clientY;
            updateHighlight(cx, cy);
        }

        function stopXRay() {
            window.__proXRayActive = false;
            overlay.remove();
            highlight.remove();
            d.removeEventListener('mousemove', handleMove);
            d.removeEventListener('touchmove', handleMove);
        }

        d.addEventListener('mousemove', handleMove);
        d.addEventListener('touchmove', handleMove, { passive: false });

        overlay.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            stopXRay();

            if (targetEl) {
                var currentVal = targetEl.tagName === 'INPUT' || targetEl.tagName === 'TEXTAREA' ? targetEl.value : targetEl.innerText;
                var newVal = prompt("⚡ Edytor PRO\n\nWprowadź nową zawartość dla tego elementu:", currentVal);
                
                if (newVal !== null) {
                    if (targetEl.tagName === 'INPUT' || targetEl.tagName === 'TEXTAREA') {
                        targetEl.value = newVal;
                    } else {
                        targetEl.innerText = newVal;
                    }
                    console.log("✅ [PRO] Zmodyfikowano element:", targetEl);
                }
            }
        });
        
        alert("🔍 Tryb X-Ray aktywny!\n\nPoruszaj palcem/myszką po ekranie, aby podświetlać elementy. Kliknij dowolny z nich, aby błyskawicznie podmienić jego tekst.");
    };
    // ==========================================


    // [KROK 1] PRZYWRACANIE STANU KODU PO ODŚWIEŻENIU
    var isSaveOnRefreshActive = localStorage.getItem('pro_save_on_refresh') === 'true';
    var savedHTML = localStorage.getItem('pro_persisted_html');

    if (isSaveOnRefreshActive && savedHTML) {
        d.body.innerHTML = savedHTML;
        console.log("🚀 [PRO] Stan struktury HTML został pomyślnie przywrócony!");
    }

    // Ukrycie domyślnego przycisku vConsole na stronie
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // FUNKCJA STYLIZUJĄCA vConsole
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
            .vc-tabbar .vc-tab.vc-actived, .vc-tabbar .vc-tab.vc-active { width: 100% !important; color: #ffd700 !important; border-bottom: 3px solid #ffd700 !important; background-color: transparent !important; text-shadow: 0 0 6px rgba(255, 215, 0, 0.6) !important; font-size: 14px !important; letter-spacing: 0.12em !important; text-transform: uppercase !important; display: flex !important; align-items: center !important; justify-content: center !important; margin: 0 !important; }
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

    // AUTOMATYCZNY ZAPIS KODU PRZED ZAMKNIĘCIEM STRONY
    window.addEventListener('beforeunload', function() {
        if (localStorage.getItem('pro_save_on_refresh') === 'true') {
            var clone = d.body.cloneNode(true);
            var menuEl = clone.querySelector('#pro-menu'); if (menuEl) menuEl.remove();
            var fabEl = clone.querySelector('#pro-fab'); if (fabEl) fabEl.remove();
            var vcEl = clone.querySelector('#__vconsole'); if (vcEl) vcEl.remove();
            var themeEl = clone.querySelector('#gannew-devkit-theme'); if (themeEl) themeEl.remove();
            // Usuwamy też resztki z X-Ray, gdyby zostały
            var xrayO = clone.querySelector('#pro-xray-overlay'); if (xrayO) xrayO.remove();
            var xrayH = clone.querySelector('#pro-xray-highlight'); if (xrayH) xrayH.remove();
            
            localStorage.setItem('pro_persisted_html', clone.innerHTML);
        }
    });

    function loadAndShowVConsole(tabName) {
        var triggerVConsole = function() {
            try {
                if (!window.vConsoleInstance) {
                    window.vConsoleInstance = new window.VConsole({ theme: 'dark' });
                }
                window.vConsoleInstance.show();
                if (typeof window.vConsoleInstance.showPlugin === 'function' && tabName) {
                    window.vConsoleInstance.showPlugin(tabName);
                } else if (typeof window.vConsoleInstance.showTab === 'function' && tabName) {
                    window.vConsoleInstance.showTab(tabName);
                }
                applyGannewTheme();
                setTimeout(applyGannewTheme, 50);
                setTimeout(applyGannewTheme, 250);
            } catch(e) {
                console.error("Błąd vConsole: ", e);
            }
        };

        if (window.VConsole) { triggerVConsole(); } 
        else {
            var s = d.createElement('script');
            s.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
            s.onload = triggerVConsole;
            d.head.appendChild(s);
        }
    }

    // TWORZENIE STRUKTURY MENU PRO
    var menu = d.getElementById('pro-menu');
    if (!menu) {
        var fab = d.createElement('div');
        fab.id = 'pro-fab';
        fab.innerText = 'PRO';
        // Proste style dla przycisku włączającego
        fab.style.cssText = 'position:fixed;bottom:20px;right:20px;background:#ffd700;color:#000;padding:12px 18px;border-radius:30px;font-weight:bold;z-index:999997;box-shadow:0 4px 15px rgba(255,215,0,0.4);cursor:pointer;';
        d.body.appendChild(fab);

        menu = d.createElement('div');
        menu.id = 'pro-menu';
        // Style dla samego menu
        menu.style.cssText = 'display:none;flex-direction:column;position:fixed;bottom:80px;right:20px;background:rgba(10,13,20,0.95);padding:15px;border-radius:15px;border:1px solid rgba(255,215,0,0.3);z-index:999997;box-shadow:0 10px 30px rgba(0,0,0,0.8);backdrop-filter:blur(10px);';
        menu.innerHTML = `
            <style>
                .pro-menu-btn { background:rgba(255,255,255,0.05);color:#fff;border:1px solid rgba(255,255,255,0.1);padding:10px 15px;margin-bottom:8px;border-radius:8px;cursor:pointer;font-weight:bold;transition:0.2s;text-align:center;width:100%; }
                .pro-menu-btn:hover { background:rgba(255,255,255,0.1); }
                .pro-menu-btn.accent { background:rgba(255,215,0,0.1);color:#ffd700;border:1px solid rgba(255,215,0,0.4); }
            </style>
            <button class="pro-menu-btn accent" id="btn-edytor">⚡ Edytuj Element</button>
            <button class="pro-menu-btn" id="btn-console">💻 Konsola</button>
            <button class="pro-menu-btn" id="btn-elements">🔍 Struktura (DOM)</button>
            <button class="pro-menu-btn" id="btn-network">🌐 Sieć (Network)</button>
            <button class="pro-menu-btn" id="btn-save-refresh">💾 Save on refresh (Experimental)</button>
            <button class="pro-menu-btn" id="btn-close-tools" style="color: #ef5350; border-color: rgba(239,83,80,0.3); margin-top: 5px; margin-bottom: 0;">❌ Zamknij Narzędzia</button>
        `;
        d.body.appendChild(menu);

        fab.onclick = function() {
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        };
    }

    // OBSŁUGA DYNAMICZNEGO WYGLĄDU PRZYCISKU "SAVE ON REFRESH"
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

    // LOGIKA PRZYCISKU Z POTWIERDZENIEM OK / ANULUJ
    btnSaveRefresh.onclick = function() {
        if (localStorage.getItem('pro_save_on_refresh') !== 'true') {
            var stan = confirm("⚠️ FUNKCJA EKSPERYMALNA\n\nCzy na pewno chcesz włączyć 'Save on refresh'? \n\nSkrypt spróbuje zamrozić i odtworzyć obecny stan kodu HTML po odświeżeniu strony. Może to kolidować z niektórymi zaawansowanymi skryptami na oryginalnej witrynie.");
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

    // ZAPISYWANIE OSTATNIEJ AKTYWNOŚCI I URUCHAMIANIE
    d.getElementById('btn-edytor').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'edytor'); if(window.StartEdytorPro) window.StartEdytorPro(); };
    d.getElementById('btn-console').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'console'); loadAndShowVConsole('default'); };
    d.getElementById('btn-elements').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'element'); loadAndShowVConsole('element'); };
    d.getElementById('btn-network').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'network'); loadAndShowVConsole('network'); };
    d.getElementById('btn-close-tools').onclick = function() { if(window.vConsoleInstance) window.vConsoleInstance.hide(); menu.style.display = 'none'; localStorage.removeItem('pro_last_active_tool'); };

    // SYSTEM INTELIGENTNEGO AUTOWZNAWIANIA SESJI
    if (isSaveOnRefreshActive) {
        var lastTool = localStorage.getItem('pro_last_active_tool');
        if (lastTool === 'edytor') {
            var checkEditor = setInterval(function() {
                if (typeof window.StartEdytorPro === 'function') {
                    clearInterval(checkEditor);
                    window.StartEdytorPro();
                }
            }, 50);
            setTimeout(function() { clearInterval(checkEditor); }, 3000);
        } else if (lastTool) {
            loadAndShowVConsole(lastTool === 'console' ? 'default' : lastTool);
        }
    }
})();
