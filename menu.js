(function() {
    var d = document;
    console.log("--- Menu.js Wersja 6.0 (Glass & Single-Tool Edition) załadowana ---");

    // Ukrycie domyślnego przycisku vConsole na stronie
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // FUNKCJA STYLIZUJĄCA
    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;

        var targetRoot = vcDom.shadowRoot || vcDom;
        if (targetRoot.querySelector('#gannew-devkit-theme')) return; 

        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            /* 20% Przezroczystości z efektem rozmycia tła (Glassmorphism) */
            .vc-main, .vc-content, .vc-panel, .vc-logbox {
                background-color: rgba(10, 13, 20, 0.85) !important;
                background: rgba(10, 13, 20, 0.85) !important;
            }

            /* Główny panel */
            .vc-main {
                border-radius: 20px 20px 0 0 !important;
                border-top: 1px solid #ffd700 !important; /* Cieńszy złoty pasek */
                overflow: hidden !important;
                box-shadow: 0 -15px 40px rgba(0,0,0,0.8) !important;
                font-family: 'Segoe UI Variable Display', -apple-system, sans-serif !important;
                backdrop-filter: blur(12px) !important; /* Rozmywa stronę pod konsolą! */
                -webkit-backdrop-filter: blur(12px) !important;
            }

            /* Górny pasek z zakładkami */
            .vc-tabbar {
                background-color: rgba(17, 22, 34, 0.6) !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important; /* Cieńszy, bardzo subtelny pasek */
                height: 42px !important;
                display: flex !important;
                align-items: center !important;
                padding: 0 !important;
            }

            /* UKRYWANIE NIEAKTYWNYCH ZAKŁADEK (Single Tool Mode) */
            .vc-tabbar .vc-tab:not(.vc-actived):not(.vc-active) {
                display: none !important;
            }

            /* Stylizowanie JEDYNEJ aktywnej zakładki jako Tytuł Okna */
            .vc-tabbar .vc-tab.vc-actived, 
            .vc-tabbar .vc-tab.vc-active {
                width: 100% !important; /* Rozciąga się na całą szerokość */
                color: #ffd700 !important;
                border-bottom: 2px solid #ffd700 !important;
                background-color: transparent !important;
                text-shadow: 0 0 5px rgba(255, 215, 0, 0.5) !important;
                pointer-events: none !important; /* Wyłącza możliwość klikania w zakładkę */
                font-size: 14px !important;
                letter-spacing: 0.1em !important;
                text-transform: uppercase !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin: 0 !important;
                border-radius: 0 !important;
            }

            /* Usunięcie starych kółek/pseudo-elementów */
            .vc-tabbar .vc-tab::after, .vc-topbar .vc-tab::after {
                display: none !important;
                content: none !important;
            }

            /* Pasek filtrów logów */
            .vc-topbar {
                background-color: transparent !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                height: 38px !important;
            }
            .vc-topbar .vc-tab {
                color: #8b949e !important;
                font-weight: 600 !important;
            }
            .vc-topbar .vc-tab.vc-actived {
                color: #ffd700 !important;
                border-bottom: 2px solid #ffd700 !important;
            }

            /* Wiersze logów */
            .vc-logbox .vc-item {
                border-bottom: 1px solid rgba(255,255,255,0.02) !important;
                padding: 10px 14px !important;
                margin: 2px 6px !important;
                border-radius: 6px !important;
            }
            .vc-logbox .vc-item:nth-child(even) {
                background-color: rgba(255, 255, 255, 0.02) !important;
            }
            .vc-logbox .vc-item:hover {
                background-color: rgba(255, 215, 0, 0.05) !important;
            }

            /* Customowe scrollbary */
            ::-webkit-scrollbar { width: 6px !important; height: 6px !important; }
            ::-webkit-scrollbar-track { background: transparent !important; }
            ::-webkit-scrollbar-thumb { background: #c5a037 !important; border-radius: 10px !important; }

            /* Dolny toolbar z przyciskami */
            .vc-toolbar {
                background-color: rgba(17, 22, 34, 0.6) !important;
                border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
                padding: 6px !important;
            }
            .vc-toolbar .vc-btn {
                background: rgba(22, 27, 38, 0.8) !important;
                color: #e5c07b !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 8px !important;
                margin: 0 4px !important;
                font-size: 13px !important;
                font-weight: 700 !important;
            }
            .vc-toolbar .vc-btn:active {
                background: rgba(0, 0, 0, 0.5) !important;
                border-color: #ffd700 !important;
            }

            /* Inputy z zaokrągleniami */
            .vc-cmd {
                background-color: transparent !important;
                border-top: 1px solid rgba(255, 255, 255, 0.05) !important;
                padding: 8px !important;
            }
            .vc-cmd-input, .vc-search-input, input[class*="input"] {
                background-color: rgba(22, 27, 38, 0.8) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 10px !important;
                color: #ffd700 !important;
                font-family: 'JetBrains Mono', monospace !important;
                padding: 8px 12px !important;
            }
            .vc-cmd-input:focus {
                border-color: #ffd700 !important;
                outline: none !important;
                background-color: rgba(0, 0, 0, 0.5) !important;
            }
            .vc-cmd-btn {
                background: #ffd700 !important;
                color: #0a0d14 !important;
                border-radius: 10px !important;
                font-weight: 800 !important;
            }

            /* Czcionka logów */
            .vc-logbox .vc-item, .vc-log, .vc-empty {
                font-family: 'JetBrains Mono', monospace !important;
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
                
                // Upewniamy się, że najpierw pokazujemy konsolę
                window.vConsoleInstance.show();
                
                // Potem przełączamy na wybraną zakładkę
                if (typeof window.vConsoleInstance.showPlugin === 'function' && tabName) {
                    window.vConsoleInstance.showPlugin(tabName);
                } else if (typeof window.vConsoleInstance.showTab === 'function' && tabName) {
                    window.vConsoleInstance.showTab(tabName);
                }

                // Wymuszamy styl, który teraz ukryje nieaktywne zakładki
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

    // Obsługa przycisków - Wymusza ukrycie menu PRO i wywołanie pojedynczej zakładki
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
