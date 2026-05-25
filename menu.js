(function() {
    var d = document;
    console.log("--- Menu.js Wersja 5.8 (Elite Detail Edition) załadowana ---");

    // Ukrycie domyślnego przycisku vConsole na stronie
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // FUNKCJA STYLIZUJĄCA - Włamuje się do Shadow DOM vConsole i aplikuje detale Ultra-PRO
    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;

        var targetRoot = vcDom.shadowRoot || vcDom;
        if (targetRoot.querySelector('#gannew-devkit-theme')) return; 

        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            /* Cały panel (Cyberpunkowa ramka, gradientowe tło 3D) */
            .vc-main {
                background: linear-gradient(145deg, #11151d, #070a0e) !important;
                border-radius: 24px 24px 0 0 !important;
                border-top: 2px solid #ffd700 !important; /* Ekskluzywne złote zwieńczenie panelu */
                overflow: hidden !important;
                box-shadow: 0 -15px 50px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.05) !important;
                font-family: 'Segoe UI Variable Display', -apple-system, sans-serif !important;
            }

            /* Górny główny pasek (Matowy grafit premium) */
            .vc-tabbar {
                background-color: #161b22 !important;
                border-bottom: 1px solid #21262d !important;
                height: 48px !important;
                display: flex !important;
                align-items: center !important;
            }

            /* Przyciski zakładek (Większy kontrast i płynne przejścia) */
            .vc-tabbar .vc-tab, .vc-topbar .vc-tab {
                color: #8b949e !important;
                font-weight: 700 !important;
                letter-spacing: 0.03em !important;
                transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1) !important;
                text-shadow: 0 1px 2px rgba(0,0,0,0.8) !important;
            }
            .vc-tabbar .vc-tab {
                border-right: 1px solid #21262d !important;
                height: 100% !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            /* Aktywna zakładka (Neonowa złota łuna i luksusowy akcent) */
            .vc-tabbar .vc-tab.vc-actived, 
            .vc-tabbar .vc-tab.vc-active,
            .vc-topbar .vc-tab.vc-actived,
            .vc-topbar .vc-tab.vc-active {
                color: #ffffff !important;
                background: linear-gradient(180deg, rgba(255,215,0,0.02), rgba(255,215,0,0.07)) !important;
                box-shadow: inset 0 -4px 10px rgba(255,215,0,0.05) !important;
                text-shadow: 0 0 8px rgba(255, 215, 0, 0.6) !important;
            }
            .vc-tabbar .vc-tab.vc-actived::after,
            .vc-tabbar .vc-tab.vc-active::after,
            .vc-topbar .vc-tab.vc-actived::after,
            .vc-topbar .vc-tab.vc-active::after {
                content: '' !important;
                position: absolute !important;
                bottom: 0 !important;
                left: 10% !important;
                width: 80% !important;
                height: 3px !important;
                background: linear-gradient(90deg, #c5a037, #ffd700, #e5c07b) !important;
                border-radius: 3px 3px 0 0 !important;
                box-shadow: 0 -2px 10px rgba(255, 215, 0, 0.8) !important;
            }

            /* Pasek filtrów logów */
            .vc-topbar {
                background-color: #090d13 !important;
                border-bottom: 1px solid #161b22 !important;
                height: 38px !important;
            }

            /* Główna strefa robocza */
            .vc-content, .vc-panel {
                background: transparent !important;
            }

            /* Przeprojektowane, naprzemienne wiersze logów (Zebra) dla czytelności */
            .vc-logbox .vc-item {
                border-bottom: 1px solid rgba(255,255,255,0.01) !important;
                padding: 8px 12px !important;
                transition: background 0.1s ease !important;
            }
            .vc-logbox .vc-item:nth-child(even) {
                background-color: rgba(255, 255, 255, 0.01) !important;
            }
            .vc-logbox .vc-item:hover {
                background-color: rgba(255, 215, 0, 0.03) !important;
            }

            /* Tekst informacyjny o pustej konsoli (Design Terminala) */
            .vc-empty {
                color: #484f58 !important;
                font-family: 'JetBrains Mono', monospace !important;
                font-size: 13px !important;
                text-transform: uppercase !important;
                letter-spacing: 0.15em !important;
                margin-top: 120px !important;
                text-shadow: 0 1px 1px rgba(0,0,0,0.5) !important;
            }
            .vc-empty::before {
                content: '🤖 SYSTEM READY \\A\\A' !important;
                white-space: pre !important;
                color: #c5a037 !important;
                font-weight: bold !important;
            }

            /* CUSTOMOWE ZŁOTE SCROLLBARY - Koniec z nudą systemową */
            ::-webkit-scrollbar {
                width: 6px !important;
                height: 6px !important;
            }
            ::-webkit-scrollbar-track {
                background: #070a0e !important;
            }
            ::-webkit-scrollbar-thumb {
                background: linear-gradient(180deg, #c5a037, #ffd700) !important;
                border-radius: 10px !important;
            }
            ::-webkit-scrollbar-thumb:hover {
                background: #ffffff !important;
            }

            /* Dolny panel narzędziowy z przyciskami akcji */
            .vc-toolbar {
                background-color: #161b22 !important;
                border-top: 1px solid #21262d !important;
                padding: 6px 4px !important;
            }
            .vc-toolbar .vc-btn {
                background: linear-gradient(180deg, #21262d, #161b22) !important;
                color: #e5c07b !important;
                border: 1px solid #30363d !important;
                border-radius: 8px !important;
                margin: 0 3px !important;
                font-size: 13px !important;
                font-weight: 700 !important;
                text-shadow: 0 1px 2px rgba(0,0,0,0.6) !important;
                box-shadow: inset 0 1px 0 rgba(255,255,255,0.05), 0 2px 4px rgba(0,0,0,0.3) !important;
            }
            .vc-toolbar .vc-btn:hover {
                border-color: #ffd700 !important;
                color: #ffffff !important;
                background: linear-gradient(180deg, #2d333b, #1f242c) !important;
                box-shadow: 0 0 8px rgba(255, 215, 0, 0.2) !important;
            }

            /* Input do wpisywania komend JS */
            .vc-cmd {
                background-color: #070a0e !important;
                border-top: 1px solid #21262d !important;
                padding: 8px !important;
            }
            .vc-cmd-input, .vc-search-input, input[class*="input"] {
                background-color: #161b22 !important;
                border: 1px solid #30363d !important;
                border-radius: 8px !important;
                color: #ffd700 !important;
                font-family: 'JetBrains Mono', monospace !important;
                padding: 8px 12px !important;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.5) !important;
            }
            .vc-cmd-input:focus {
                border-color: #ffd700 !important;
                box-shadow: inset 0 2px 4px rgba(0,0,0,0.5), 0 0 10px rgba(255, 215, 0, 0.2) !important;
                outline: none !important;
            }
            .vc-cmd-btn {
                background: linear-gradient(135deg, #c5a037, #ffd700) !important;
                color: #070a0e !important;
                border-radius: 8px !important;
                font-weight: 800 !important;
                box-shadow: 0 2px 6px rgba(255,215,0,0.3) !important;
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

    // Menu kontrolne PRO
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

    // Obsługa zdarzeń przycisków
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
