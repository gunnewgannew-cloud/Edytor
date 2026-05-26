(function() {
    var d = document;

    // =========================================================================
    // [ZMIANA - POMYSŁ NR 1] INICJALIZACJA SYSTEMU WYŁAPYWANIA BŁĘDÓW (ERROR BADGE)
    // =========================================================================
    if (!window.__devKitErrors) {
        window.__devKitErrors = {
            count: 0,
            logs: []
        };
    }

    function __updateDevKitBadge() {
        var badge = d.getElementById('devkit-error-badge');
        if (badge) {
            badge.innerText = window.__devKitErrors.count;
            badge.style.setProperty('display', window.__devKitErrors.count > 0 ? 'flex' : 'none', 'important');
        }
    }

    // Przechwytywanie standardowych błędów JS
    var originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
        window.__devKitErrors.count++;
        window.__devKitErrors.logs.push({
            type: 'JS_ERROR',
            message: message,
            file: source ? source.split('/').pop() : 'unknown',
            line: lineno + ':' + colno,
            time: new Date().toLocaleTimeString()
        });
        __updateDevKitBadge();
        if (typeof originalOnError === 'function') {
            return originalOnError(message, source, lineno, colno, error);
        }
        return false;
    };

    // Przechwytywanie asynchronicznych Promise Rejections (np. błędy API)
    window.addEventListener('unhandledrejection', function(event) {
        window.__devKitErrors.count++;
        window.__devKitErrors.logs.push({
            type: 'PROMISE_REJECTION',
            message: event.reason?.message || event.reason || 'Unhandled Promise Rejection',
            file: 'async_operation',
            line: 'N/A',
            time: new Date().toLocaleTimeString()
        });
        __updateDevKitBadge();
    });
    // =========================================================================

    // [KROK 0] BEZPIECZEŃSTWO - INTELIGENTNE OSTRZEŻENIE (SECURITY GUARD)
    var sensitiveKeywords = ['bank', 'login', 'checkout', 'paypal', 'signin', 'sign-in', 'haslo', 'password', 'platnosci', 'payu', 'mojeid', 'secure'];
    var currentUrl = window.location.href.toLowerCase();
    var isSensitive = sensitiveKeywords.some(function(keyword) {
        return currentUrl.indexOf(keyword) !== -1;
    });

    if (isSensitive) {
        var proceed = confirm("🚨 OSTRZEŻENIE BEZPIECZEŃSTWA (DevKit PRO)\n\nWykryto, że próbujesz uruchomić skrypt na stronie zawierającej wrażliwe dane (logowanie, bankowość, płatności).\n\nUruchamianie zewnętrznych narzędzi (bookmarkletów) w takich miejscach niesie ryzyko przejęcia poufnych informacji. Jeśli ufasz temu skryptowi i wiesz co rozpisz, kliknij OK. W przeciwnym razie kliknij Anuluj.");
        if (!proceed) {
            console.warn("🔒 [PRO] Uruchomienie zablokowane ze względów bezpieczeństwa.");
            return; 
        }
    }

    console.log("--- Menu.js Wersja 7.0 (Error Badge Enabled) załadowana ---");

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
        // [ZMIANA] DODANIE STYLE DLA FAB I BADGE ABY BYŁY ZINTEGROWANE
        var proStyles = d.createElement('style');
        proStyles.innerHTML = `
            #pro-fab { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background: #222; border: 2px solid #ffd700; color: #ffd700; font-family: sans-serif; font-size: 14px; font-weight: bold; display: flex; align-items: center; justify-content: center; z-index: 999999; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.4); }
            #devkit-error-badge { position: absolute; top: -5px; right: -5px; background: #ff3b30; color: white; font-family: sans-serif; font-size: 11px; font-weight: bold; min-width: 18px; height: 18px; padding: 2px; border-radius: 9px; display: none; align-items: center; justify-content: center; box-shadow: 0 2px 5px rgba(0,0,0,0.3); z-index: 1000000; }
        `;
        d.head.appendChild(proStyles);

        var fab = d.createElement('div');
        fab.id = 'pro-fab';
        fab.innerText = 'PRO';

        // [ZMIANA] WSTRZYKNIĘCIE BADGE DO ELEMENTU FAB
        var badge = d.createElement('div');
        badge.id = 'devkit-error-badge';
        badge.innerText = '0';
        fab.appendChild(badge);
        
        d.body.appendChild(fab);

        menu = d.createElement('div');
        menu.id = 'pro-menu';
        menu.innerHTML = `
            <button class="pro-menu-btn" id="btn-show-errors" style="background: rgba(255, 59, 48, 0.15) !important; border: 1px solid #ff3b30 !important; color: #ff8177 !important;">⚠️ Pokaż Błędy Strony</button>
            <button class="pro-menu-btn accent" id="btn-edytor">⚡ Edytuj Element</button>
            <button class="pro-menu-btn" id="btn-console">💻 Konsola</button>
            <button class="pro-menu-btn" id="btn-elements">🔍 Struktura (DOM)</button>
            <button class="pro-menu-btn" id="btn-network">🌐 Sieć (Network)</button>
            <button class="pro-menu-btn" id="btn-save-refresh">💾 Save on refresh (Experimental)</button>
            <button class="pro-menu-btn" id="btn-close-tools" style="color: #ef5350; margin-top: 5px;">❌ Zamknij Narzędzia</button>
        `;
        d.body.appendChild(menu);

        fab.onclick = function() {
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
            __updateDevKitBadge(); // Odśwież stan badge przy otwarciu menu
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

    // [ZMIANA] OBSŁUGA NOWEGO PRZYCISKU POKAZYWANIA BŁĘDÓW
    d.getElementById('btn-show-errors').onclick = function() {
        menu.style.display = 'none';
        if (window.__devKitErrors.logs.length === 0) {
            alert("Brak wykrytych błędów na stronie! 🎉");
            return;
        }
        var raport = "WYKRYTE BŁĘDY (" + window.__devKitErrors.count + "):\n\n";
        window.__devKitErrors.logs.forEach(function(log, index) {
            raport += "[" + (index + 1) + "] " + log.time + " | " + log.type + "\n";
            raport += "Wiadomość: " + log.message + "\n";
            raport += "Plik: " + log.file + " (Linia: " + log.line + ")\n";
            raport += "---------------------------\n";
        });
        
        var alertResult = confirm(raport + "\n\nCzy chcesz otworzyć pełną Konsolę vConsole dewelopera?");
        if (alertResult) {
            loadAndShowVConsole('default');
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

    // Odpalenie aktualizacji po załadowaniu skryptu (na wypadek wcześniejszych błędów)
    __updateDevKitBadge();
})();
