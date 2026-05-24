(function() {
    var d = document;
    console.log("--- Menu.js Wersja 5.0 (Silnik vConsole) załadowana ---");

    // Natychmiastowe ukrycie zielonego przycisku vConsole
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    // Funkcja ładująca vConsole zamiast Erudy
    function loadAndShowVConsole(tabName) {
        var triggerVConsole = function() {
            try {
                if (!window.vConsoleInstance) {
                    // Inicjalizacja vConsole (domyślnie generuje ukryty przez nas przycisk)
                    window.vConsoleInstance = new window.VConsole();
                }
                
                // Otwarcie głównego panelu
                window.vConsoleInstance.show();
                
                // Opcjonalne przełączenie zakładki (jeśli API vConsole na to pozwala w danej wersji)
                if (typeof window.vConsoleInstance.showTab === 'function' && tabName) {
                    window.vConsoleInstance.showTab(tabName);
                }
            } catch(e) {
                console.error("Błąd podczas uruchamiania vConsole: ", e);
            }
        };

        // Sprawdzamy czy klasa VConsole już istnieje w pamięci
        if (window.VConsole) {
            triggerVConsole();
        } else {
            var s = d.createElement('script');
            // Ładujemy vConsole z niezawodnego CDN
            s.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js';
            s.onload = triggerVConsole;
            d.head.appendChild(s);
        }
    }

    // Tworzenie Twojego menu PRO
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

    // Podpięcie przycisków pod vConsole
    d.getElementById('btn-edytor').onclick = function() { 
        menu.style.display = 'none'; 
        if(window.StartEdytorPro) window.StartEdytorPro();
    };

    d.getElementById('btn-console').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowVConsole('default'); // 'default' to przeważnie konsola
    };

    d.getElementById('btn-elements').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowVConsole('element'); // Struktura DOM
    };

    d.getElementById('btn-network').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowVConsole('network'); // Sieć
    };

    d.getElementById('btn-close-tools').onclick = function() { 
        if(window.vConsoleInstance) window.vConsoleInstance.hide(); 
        menu.style.display = 'none'; 
    };
})();
