(function() {
    var d = document;
    console.log("--- Menu.js Wersja 5.5 (Shadow DOM Style Injection) załadowana ---");

    // Ukrycie domyślnego przycisku vConsole na stronie
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // FUNKCJA STYLIZUJĄCA - Włamuje się do Shadow DOM vConsole i nadpisuje absolutnie wszystko
    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;

        // Szukamy kontenera stylów w Shadow DOM (lub normalnym DOM jako fallback)
        var targetRoot = vcDom.shadowRoot || vcDom;
        if (targetRoot.getElementById('gannew-devkit-theme')) return; // Styl już istnieje

        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            /* Cały panel (Cyberpunkowy, zaokrąglony kształt) */
            .vc-main {
                background-color: #111116 !important;
                border-radius: 20px 20px 0 0 !important;
                overflow: hidden !important;
                box-shadow: 0 -10px 30px rgba(0,0,0,0.5) !important;
                font-family: 'SF Pro Display', -apple-system, sans-serif !important;
            }

            /* Górny główny pasek (Log, System, Network...) */
            .vc-tabbar {
                background-color: #1a1a22 !important;
                border-bottom: 2px solid #21252b !important;
                height: 45px !important;
            }

            /* Przyciski zakładek */
            .vc-tabbar .vc-tab {
                color: #a0a8b9 !important;
                border-right: 1px solid rgba(255,255,255,0.03) !important;
                font-weight: 500 !important;
                transition: all 0.2s ease !important;
            }

            /* Aktywna zakładka główna (Efektowny Neonowy Gradient z przycisku PRO) */
            .vc-tabbar .vc-tab.vc-actived, 
            .vc-tabbar .vc-tab.vc-active {
                color: #ffffff !important;
                background: rgba(97, 175, 239, 0.08) !important;
                position: relative !important;
                font-weight: bold !important;
            }
            .vc-tabbar .vc-tab.vc-actived::after,
            .vc-tabbar .vc-tab.vc-active::after {
                content: '' !important;
                position: absolute !important;
                bottom: 0 !important;
                left: 15% !important;
                width: 70% !important;
                height: 3px !important;
                background: linear-gradient(90deg, #61afef, #c678dd) !important;
                border-radius: 3px 3px 0 0 !important;
            }

            /* Podpasek filtrów (All, Log, Info, Warn, Error) */
            .vc-topbar {
                background-color: #13131a !important;
                border-bottom: 1px solid #1a1a22 !important;
            }
            .vc-topbar .vc-tab {
                color: #7d8595 !important;
                font-size: 13px !important;
            }
            .vc-topbar .vc-tab.vc-actived,
            .vc-topbar .vc-tab.vc-active {
                color: #e5c07b !important; /* Złoty akcent PRO dla filtrów logów */
                border-bottom: 2px solid #e5c07b !important;
                background: none !important;
            }

            /* Główna strefa logów i paneli */
            .vc-content, .vc-panel {
                background-color: #111116 !important;
            }

            /* Tekst "Empty" (Stylowy, wygaszony design) */
            .vc-empty {
                color: #4b5263 !important;
                font-style: italic !important;
                font-family: monospace !important;
                font-size: 15px !important;
            }

            /* Dolny pasek akcji (Clear, Top, Bottom, Hide) */
            .vc-toolbar {
                background-color: #1a1a22 !important;
                border-top: 1px solid #21252b !important;
            }
            .vc-toolbar .vc-btn {
                background: transparent !important;
                color: #a0a8b9 !important;
                border-right: 1px solid rgba(255,255,255,0.05) !important;
                font-size: 14px !important;
            }
            .vc-toolbar .vc-btn:active {
                background: rgba(198, 120, 221, 0.15) !important;
                color: #c678dd !important;
            }

            /* Wiersze wpisywania komend i filtrów na dole */
            .vc-cmd {
                background-color: #111116 !important;
                border-top: 1px solid #21252b !important;
                padding: 5px !important;
            }
            .vc-cmd-input, .vc-search-input, input[class*="input"] {
                background-color: #1a1a22 !important;
                border: 1px solid rgba(97, 175, 239, 0.2) !important;
                border-radius: 8px !important;
                color: #98c379 !important; /* Zielony hakerski tekst wpisywania */
                font-family: monospace !important;
                padding: 6px 10px !important;
            }
            .vc-cmd-btn {
                background-color: #61afef !important;
                color: #111116 !important;
                border-radius: 8px !important;
                font-weight: bold !important;
            }

            /* Same logi w konsoli - rasowy czysty Monospace */
            .vc-logbox .vc-item, .vc-log {
                font-family: monospace !important;
                border-bottom: 1px solid rgba(255,255,255,0.02) !important;
                color: #abb2bf !important;
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

                // Wymuszamy aplikację stylu natychmiast oraz po krótkiej chwili na załadowanie DOMu vConsole
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
