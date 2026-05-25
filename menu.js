(function() {
    var d = document;
    console.log("--- Menu.js Wersja 5.7 (Mega PRO Gold Edition) załadowana ---");

    // Ukrycie domyślnego przycisku vConsole na stronie
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // FUNKCJA STYLIZUJĄCA - Włamuje się do Shadow DOM vConsole i nadpisuje styl na "Mega PRO"
    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;

        // Szukamy kontenera stylów w Shadow DOM (lub normalnym DOM jako fallback)
        var targetRoot = vcDom.shadowRoot || vcDom;
        
        // Unikamy duplikacji stylów
        if (targetRoot.querySelector('#gannew-devkit-theme')) return; 

        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            /* Cały panel (Głęboka czerń, zaokrąglony kształt) */
            .vc-main {
                background-color: #0d1117 !important;
                border-radius: 20px 20px 0 0 !important;
                overflow: hidden !important;
                box-shadow: 0 -10px 40px rgba(0,0,0,0.8) !important;
                font-family: 'Segoe UI Variable Display', -apple-system, sans-serif !important;
            }

            /* Górny główny pasek */
            .vc-tabbar {
                background-color: #161b22 !important;
                border-bottom: 1px solid #30363d !important;
                height: 45px !important;
            }

            /* Przyciski zakładek */
            .vc-tabbar .vc-tab, .vc-topbar .vc-tab {
                color: #8b949e !important;
                font-weight: 600 !important;
                transition: all 0.2s ease !important;
                text-shadow: 0 1px rgba(0,0,0,0.5) !important;
            }
            .vc-tabbar .vc-tab {
                border-right: 1px solid #30363d !important;
            }

            /* Aktywna zakładka (Ekskluzywny Czysto Złoty Gradient) */
            .vc-tabbar .vc-tab.vc-actived, 
            .vc-tabbar .vc-tab.vc-active,
            .vc-topbar .vc-tab.vc-actived,
            .vc-topbar .vc-tab.vc-active {
                color: #ffd700 !important;
                position: relative !important;
                background: rgba(255, 215, 0, 0.05) !important;
                text-shadow: 0 0 10px rgba(255, 215, 0, 0.4) !important;
            }
            .vc-tabbar .vc-tab.vc-actived::after,
            .vc-tabbar .vc-tab.vc-active::after,
            .vc-topbar .vc-tab.vc-actived::after,
            .vc-topbar .vc-tab.vc-active::after {
                content: '' !important;
                position: absolute !important;
                bottom: 0 !important;
                left: 15% !important;
                width: 70% !important;
                height: 2px !important;
                background: linear-gradient(90deg, #c5a037, #ffd700, #c5a037) !important;
                border-radius: 2px 2px 0 0 !important;
                box-shadow: 0 0 5px rgba(255, 215, 0, 0.5) !important;
            }

            /* Podpasek filtrów */
            .vc-topbar {
                background-color: #0d1117 !important;
                border-bottom: 1px solid #161b22 !important;
            }

            /* Główna strefa logów i paneli */
            .vc-content, .vc-panel {
                background-color: #0d1117 !important;
            }

            /* Tekst "Empty" (Stylowy, wygaszony design) */
            .vc-empty {
                color: #8b949e !important;
                font-family: 'JetBrains Mono', monospace !important;
                font-size: 14px !important;
                text-transform: uppercase !important;
                letter-spacing: 0.1em !important;
                margin-top: 80px !important;
            }

            /* Dolny pasek akcji (Clear, Top, Bottom, Hide) */
            .vc-toolbar {
                background-color: #161b22 !important;
                border-top: 1px solid #30363d !important;
                padding: 4px !important;
            }
            .vc-toolbar .vc-btn {
                background: linear-gradient(180deg, #1f242e, #13171e) !important;
                color: #ffd700 !important;
                border: 1px solid #30363d !important;
                border-radius: 6px !important;
                margin: 0 2px !important;
                font-size: 13px !important;
                font-weight: 600 !important;
                text-shadow: 0 1px rgba(0,0,0,0.5) !important;
                box-shadow: inset 0 1px rgba(255,255,255,0.05), 0 1px 1px rgba(0,0,0,0.1) !important;
            }
            .vc-toolbar .vc-btn:hover {
                border-color: #c5a037 !important;
                background: linear-gradient(180deg, #2a2f3b, #191e28) !important;
                box-shadow: inset 0 1px rgba(255,255,255,0.05), 0 0 5px rgba(255, 215, 0, 0.2) !important;
            }
            .vc-toolbar .vc-btn:active {
                background: #161b22 !important;
                border-color: #c5a037 !important;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.4) !important;
            }

            /* Wiersze wpisywania komend i filtrów na dole */
            .vc-cmd {
                background-color: #0d1117 !important;
                border-top: 1px solid #30363d !important;
                padding: 6px !important;
            }
            .vc-cmd-input, .vc-search-input, input[class*="input"] {
                background-color: #161b22 !important;
                border: 1px solid #30363d !important;
                border-radius: 6px !important;
                color: #c9d1d9 !important;
                font-family: 'JetBrains Mono', monospace !important;
                padding: 6px 10px !important;
            }
            .vc-cmd-input:focus, .vc-search-input:focus, input[class*="input"]:focus {
                border-color: #ffd700 !important;
                box-shadow: 0 0 5px rgba(255, 215, 0, 0.3) !important;
                outline: none !important;
            }
            .vc-cmd-btn {
                background: linear-gradient(180deg, #c5a037, #ffd700) !important;
                color: #0d1117 !important;
                border: none !important;
                border-radius: 6px !important;
                font-weight: bold !important;
                text-shadow: none !important;
            }

            /* Same logi w konsoli */
            .vc-logbox .vc-item, .vc-log {
                font-family: 'JetBrains Mono', monospace !important;
                border-bottom: 1px solid rgba(255,255,255,0.02) !important;
                color: #c9d1d9 !important;
                font-size: 13px !important;
            }
        `;
        targetRoot.appendChild(style);
    }

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

                // Bezpieczne wymuszenie stylów
                applyGannewTheme();
                setTimeout(applyGannewTheme, 50);
                setTimeout(applyGannewTheme, 250);
            } catch(e) {
                console.error("Błąd podczas uruchamiania vConsole: ", e);
            }
        };

        if (window.VConsole) {
            triggerVConsole();
        } else {
            var s = d.createElement('script');
            s.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
            s.onload = triggerVConsole;
            d.head.appendChild(s);
        }
    }

    // Tworzenie struktury menu PRO
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
            <button class="pro-menu-btn" id="btn-close-tools" style="color: #ef5350;">❌ Zamknij Narzędzia</button>
        `;
        d.body.appendChild(menu);

        fab.onclick = function() {
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        };
    }

    // Obsługa przycisków
    d.getElementById('btn-edytor').onclick = function() { 
        menu.style.display = 'none'; 
        if(window.StartEdytorPro) window.StartEdytorPro();
    };

    d.getElementById('btn-console').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowVConsole('default');
    };

    d.getElementById('btn-elements').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowVConsole('element');
    };

    d.getElementById('btn-network').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowVConsole('network');
    };

    d.getElementById('btn-close-tools').onclick = function() { 
        if(window.vConsoleInstance) window.vConsoleInstance.hide(); 
        menu.style.display = 'none'; 
    };
})();
