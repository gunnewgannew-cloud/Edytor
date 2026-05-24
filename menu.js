(function() {
    var d = document;
    console.log("--- Menu.js Wersja 4.0 (Shadow DOM Ninja) załadowana ---");

    function loadAndShowEruda(tool) {
        var triggerEruda = function() {
            try {
                if (window.eruda) {
                    if (!window._erudaInitialized) {
                        window.eruda.init();
                        window._erudaInitialized = true;
                        
                        // 1. ATAK NA SHADOW DOM: Wstrzykujemy CSS bezpośrednio do zamkniętego kodu Erudy
                        var erudaHost = d.getElementById('eruda');
                        if (erudaHost && erudaHost.shadowRoot) {
                            var style = d.createElement('style');
                            style.innerHTML = '.eruda-entry-btn { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
                            erudaHost.shadowRoot.appendChild(style);
                        }

                        // 2. BACKUP: Wyrzucamy zębatkę w kosmos (poza widoczny ekran)
                        if (typeof window.eruda.position === 'function') {
                            window.eruda.position({x: -9999, y: -9999});
                        }
                    }
                    
                    // Bezpośrednie wywołanie narzędzia
                    window.eruda.show(tool);
                }
            } catch(e) {
                console.error("Błąd podczas otwierania Erudy: ", e);
            }
        };

        if (window.eruda) {
            triggerEruda();
        } else {
            var s = d.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/eruda';
            s.onload = triggerEruda;
            d.head.appendChild(s);
        }
    }

    // Tworzenie menu (jeśli nie istnieje)
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
            <button class="pro-menu-btn" id="btn-close-eruda" style="color: #ef5350;">❌ Zamknij Narzędzia</button>
        `;
        d.body.appendChild(menu);

        fab.onclick = function() {
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        };
    }

    // Podpięcie zdarzeń
    d.getElementById('btn-edytor').onclick = function() { 
        menu.style.display = 'none'; 
        if(window.StartEdytorPro) window.StartEdytorPro();
    };

    d.getElementById('btn-console').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowEruda('console'); 
    };

    d.getElementById('btn-elements').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowEruda('elements'); 
    };

    d.getElementById('btn-network').onclick = function() { 
        menu.style.display = 'none'; 
        loadAndShowEruda('network'); 
    };

    d.getElementById('btn-close-eruda').onclick = function() { 
        if(window.eruda) window.eruda.hide(); 
        menu.style.display = 'none'; 
    };
})();
