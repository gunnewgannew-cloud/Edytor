(function() {
    var d = document;
    console.log("--- Menu.js Wersja 6.2 (IDE Architecture Update) załadowana ---");

    // Ukrycie domyślnego przycisku vConsole na stronie
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // FUNKCJA STYLIZUJĄCA - Włamuje się do Shadow DOM i rewolucjonizuje podgląd kodu
    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;

        var targetRoot = vcDom.shadowRoot || vcDom;
        if (targetRoot.querySelector('#gannew-devkit-theme')) return; 

        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            /* 20% Przezroczystości + Blur (Glassmorphism) */
            .vc-main, .vc-content, .vc-panel, .vc-logbox {
                background-color: rgba(10, 13, 20, 0.82) !important;
                background: rgba(10, 13, 20, 0.82) !important;
            }

            /* Główny panel z solidną ramką górną */
            .vc-main {
                border-radius: 20px 20px 0 0 !important;
                border-top: 3px solid #ffd700 !important;
                overflow: hidden !important;
                box-shadow: 0 -15px 40px rgba(0,0,0,0.85) !important;
                font-family: 'Segoe UI Variable Display', -apple-system, sans-serif !important;
                backdrop-filter: blur(14px) !important;
                -webkit-backdrop-filter: blur(14px) !important;
            }

            /* Górny pasek menu */
            .vc-tabbar {
                background-color: rgba(17, 22, 34, 0.7) !important;
                border-bottom: 2px solid rgba(255, 215, 0, 0.3) !important;
                height: 44px !important;
                display: flex !important;
                align-items: center !important;
                padding: 0 !important;
            }

            /* Single Tool Mode - izolacja wybranej zakładki */
            .vc-tabbar .vc-tab:not(.vc-actived):not(.vc-active) {
                display: none !important;
            }

            /* Aktywna zakładka jako elegancki nagłówek okna */
            .vc-tabbar .vc-tab.vc-actived, 
            .vc-tabbar .vc-tab.vc-active {
                width: 100% !important;
                color: #ffd700 !important;
                border-bottom: 3px solid #ffd700 !important;
                background-color: transparent !important;
                text-shadow: 0 0 6px rgba(255, 215, 0, 0.6) !important;
                pointer-events: none !important;
                font-size: 14px !important;
                letter-spacing: 0.12em !important;
                text-transform: uppercase !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                margin: 0 !important;
            }

            .vc-tabbar .vc-tab::after, .vc-topbar .vc-tab::after {
                display: none !important;
                content: none !important;
            }

            /* ODSTARCZENIE I ODDECH DLA STRUKTURY KODU (Separacja od nagłówka) */
            .vc-content {
                padding-top: 20px !important; /* Komfortowy odstęp od góry */
                padding-left: 12px !important;
                padding-right: 12px !important;
            }

            /* PERFEKCYJNE DRZEWO DOM (ZAKŁADKA ELEMENT) - DESIGN KLASY PRO IDE */
            .vc-panel[data-plugin="element"] *, 
            .vc-html-tree *, 
            div[class*="element-node"] {
                font-family: 'JetBrains Mono', 'Fira Code', monospace !important;
                font-size: 13px !important;
                line-height: 1.8 !important; /* Znacznie większa interlinia – napisy przestają być zbite */
            }

            /* Linie pionowe ułatwiające czytanie struktury zagnieżdżeń */
            div[class*="element-node"], 
            .vc-html-tree div {
                border-left: 1px dotted rgba(255, 215, 0, 0.15) !important; /* Delikatne złote linie pomocnicze */
                padding-left: 14px !important;
                margin-left: 6px !important;
            }

            /* Wyraziste, nasycone kolorowanie składni HTML */
            .vc-panel .vc-html-tag, 
            span[class*="tag"], 
            span[class*="node-tag"] {
                color: #51afef !important; /* Profesjonalny, jasny błękit dla tagów (<html, body, div) */
                font-weight: bold !important;
            }

            .vc-panel .vc-html-attr-name, 
            span[class*="attr-name"] {
                color: #e5c07b !important; /* Prestiżowe złoto dla nazw atrybutów (class, id, style) */
                font-weight: 500 !important;
            }

            .vc-panel .vc-html-attr-val, 
            span[class*="attr-val"], 
            span[class*="attr-value"] {
                color: #98c379 !important; /* Wyrazista, neonowa zieleń dla wartości w cudzysłowach */
            }

            /* Kolor tekstu ukrytego wewnątrz elementów oraz znaków interpunkcyjnych kodu (=, ", <, >) */
            .vc-panel {
                color: #abb2bf !important; /* Stonowany szary dla tekstu i klamer kodu, by nie raził w oczy */
            }

            /* Wygląd strzałek rozwijania elementów */
            .vc-toggle-btn, 
            span[class*="toggle"], 
            i[class*="arrow"] {
                color: #ffd700 !important;
                font-weight: 900 !important;
                margin-right: 4px !important;
            }

            /* Delikatne podświetlenie linijki kodu po najechaniu */
            div[class*="element-node"]:hover {
                background-color: rgba(255, 215, 0, 0.04) !important;
                border-radius: 4px !important;
            }

            /* Pasek filtrów pod menu (dla konsoli) */
            .vc-topbar {
                background-color: transparent !important;
                border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
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

            /* Wiersze logów w konsoli */
            .vc-logbox .vc-item {
                border-bottom: 1px solid rgba(255,255,255,0.02) !important;
                padding: 10px 14px !important;
                margin: 2px 6px !important;
                border-radius: 6px !important;
            }
            .vc-logbox .vc-item:nth-child(even) {
                background-color: rgba(255, 255, 255, 0.02) !important;
            }

            /* Customowe luksusowe scrollbary */
            ::-webkit-scrollbar { width: 6px !important; height: 6px !important; }
            ::-webkit-scrollbar-track { background: transparent !important; }
            ::-webkit-scrollbar-thumb { background: #c5a037 !important; border-radius: 10px !important; }

            /* Dolny toolbar z akcjami */
            .vc-toolbar {
                background-color: rgba(17, 22, 34, 0.7) !important;
                border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
                padding: 6px !important;
            }
            .vc-toolbar .vc-btn {
                background: rgba(22, 27, 38, 0.85) !important;
                color: #e5c07b !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 8px !important;
                margin: 0 4px !important;
                font-size: 13px !important;
                font-weight: 700 !important;
            }
            .vc-toolbar .vc-btn:active {
                background: rgba(0, 0, 0, 0.6) !important;
                border-color: #ffd700 !important;
            }

            /* Style dla pól wpisywania komend */
            .vc-cmd {
                background-color: transparent !important;
                border-top: 1px solid rgba(255, 255, 255, 0.08) !important;
                padding: 8px !important;
            }
            .vc-cmd-input, .vc-search-input, input[class*="input"] {
                background-color: rgba(22, 27, 38, 0.85) !important;
                border: 1px solid rgba(255, 255, 255, 0.1) !important;
                border-radius: 10px !important;
                color: #ffd700 !important;
                font-family: 'JetBrains Mono', monospace !important;
                padding: 8px 12px !important;
            }
            .vc-cmd-input:focus {
                border-color: #ffd700 !important;
                outline: none !important;
                background-color: rgba(0, 0, 0, 0.6) !important;
            }
            .vc-cmd-btn {
                background: #ffd700 !important;
                color: #0a0d14 !important;
                border-radius: 10px !important;
                font-weight: 800 !important;
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
