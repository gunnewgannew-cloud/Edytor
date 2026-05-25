(function() {
    var d = document;
    console.log("--- Menu.js Wersja 5.9 (Solid Gold & Rounded) załadowana ---");

    // Ukrycie domyślnego przycisku vConsole na stronie
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // FUNKCJA STYLIZUJĄCA - Włamuje się do Shadow DOM vConsole
    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;

        var targetRoot = vcDom.shadowRoot || vcDom;
        if (targetRoot.querySelector('#gannew-devkit-theme')) return; 

        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            /* Całkowicie lite, nieprzezroczyste tło główne (Zero prześwitów) */
            .vc-main, .vc-content, .vc-panel, .vc-logbox {
                background-color: #0a0d14 !important;
                background: #0a0d14 !important;
                opacity: 1 !important;
            }

            /* Zaokrąglony główny panel */
            .vc-main {
                border-radius: 20px 20px 0 0 !important;
                border-top: 2px solid #ffd700 !important;
                overflow: hidden !important;
                box-shadow: 0 -15px 40px rgba(0,0,0,0.9) !important;
                font-family: 'Segoe UI Variable Display', -apple-system, sans-serif !important;
            }

            /* Górny główny pasek */
            .vc-tabbar {
                background-color: #111622 !important;
                border-bottom: 1px solid #21262d !important;
                height: 46px !important;
                display: flex !important;
                align-items: center !important;
                padding: 0 5px !important;
            }

            /* Stylizowanie zakładek z cornerami */
            .vc-tabbar .vc-tab, .vc-topbar .vc-tab {
                color: #8b949e !important;
                font-weight: 700 !important;
                letter-spacing: 0.02em !important;
                transition: all 0.2s ease !important;
                text-shadow: 0 1px 2px rgba(0,0,0,0.8) !important;
                border: none !important;
            }
            .vc-tabbar .vc-tab {
                border-radius: 8px 8px 0 0 !important; /* Cornery dla głównych zakładek */
                margin: 0 3px !important;
                height: 36px !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            /* Wyraziste, klasyczne złote podkreślenie aktywnej zakładki */
            .vc-tabbar .vc-tab.vc-actived, 
            .vc-tabbar .vc-tab.vc-active,
            .vc-topbar .vc-tab.vc-actived,
            .vc-topbar .vc-tab.vc-active {
                color: #ffd700 !important;
                border-bottom: 3px solid #ffd700 !important; /* Powrót do czystego podkreślenia */
                background-color: #161b26 !important;
                text-shadow: 0 0 5px rgba(255, 215, 0, 0.5) !important;
            }

            /* Wyłączenie starych pseudo-elementów linii, żeby się nie dublowały */
            .vc-tabbar .vc-tab::after, .vc-topbar .vc-tab::after {
                display: none !important;
                content: none !important;
            }

            /* Pasek filtrów logów */
            .vc-topbar {
                background-color: #0a0d14 !important;
                border-bottom: 1px solid #161b22 !important;
                height: 38px !important;
            }

            /* Zaokrąglone i odseparowane wiersze logów (Zebra) */
            .vc-logbox .vc-item {
                border-bottom: 1px solid rgba(255,255,255,0.01) !important;
                padding: 10px 14px !important;
                margin: 2px 6px !important;
                border-radius: 6px !important; /* Delikatne cornery na logach */
            }
            .vc-logbox .vc-item:nth-child(even) {
                background-color: rgba(255, 255, 255, 0.01) !important;
            }
            .vc-logbox .vc-item:hover {
                background-color: rgba(255, 215, 0, 0.02) !important;
            }

            /* Customowe luksusowe scrollbary */
            ::-webkit-scrollbar {
                width: 6px !important;
                height: 6px !important;
            }
            ::-webkit-scrollbar-track {
                background: #0a0d14 !important;
            }
            ::-webkit-scrollbar-thumb {
                background: #c5a037 !important;
                border-radius: 10px !important;
            }

            /* Dolny toolbar z cornery przyciskami */
            .vc-toolbar {
                background-color: #111622 !important;
                border-top: 1px solid #21262d !important;
                padding: 6px !important;
            }
            .vc-toolbar .vc-btn {
                background: #161b26 !important;
                color: #e5c07b !important;
                border: 1px solid #30363d !important;
                border-radius: 8px !important; /* Wyraźne cornery dla dolnych przycisków */
                margin: 0 4px !important;
                font-size: 13px !important;
                font-weight: 700 !important;
                box-shadow: 0 2px 4px rgba(0,0,0,0.3) !important;
            }
            .vc-toolbar .vc-btn:active {
                background: #0a0d14 !important;
                border-color: #ffd700 !important;
            }

            /* Inputy z ładnymi zaokrągleniami krawędzi */
            .vc-cmd {
                background-color: #0a0d14 !important;
                border-top: 1px solid #21262d !important;
                padding: 8px !important;
            }
            .vc-cmd-input, .vc-search-input, input[class*="input"] {
                background-color: #111622 !important;
                border: 1px solid #30363d !important;
                border-radius: 10px !important; /* Wyraźne zaokrąglenie pól wpisywania */
                color: #ffd700 !important;
                font-family: 'JetBrains Mono', monospace !important;
                padding: 8px 12px !important;
            }
            .vc-cmd-input:focus {
                border-color: #ffd700 !important;
                outline: none !important;
            }
            .vc-cmd-btn {
                background: #ffd700 !important;
                color: #0a0d14 !important;
                border-radius: 10px !important; /* Cornery dla przycisku OK */
                font-weight: 800 !important;
            }

            /* Czcionka kodu logów */
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
