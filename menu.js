(function() {
    var d = document;
    console.log("--- Menu.js Wersja 3.0 (Bezpieczne Window + Auto-CSS) załadowana ---");

    // DODATKOWA OPCJA: Wstrzyknięcie stylu ukrywającego zębatkę bezpośrednio w JS.
    // Działa natychmiast, bez czekania na zewnętrzny plik styles.css.
    var killGearStyle = d.createElement('style');
    killGearStyle.innerHTML = '.eruda-entry-btn, #eruda .eruda-entry-btn { display: none !important; opacity: 0 !important; visibility: hidden !important; width: 0 !important; height: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(killGearStyle);

    // Bezpieczna funkcja operująca wyłącznie na obiekcie window (brak ReferenceError)
    function loadAndShowEruda(tool) {
        var triggerEruda = function() {
            try {
                // Sprawdzamy bezpiecznie przez window, czy obiekt istnieje
                if (window.eruda) {
                    // Inicjalizujemy tylko raz, używając flagi zabezpieczającej
                    if (!window._erudaInitialized) {
                        window.eruda.init();
                        window._erudaInitialized = true;
                    }
                    // Wywołujemy żądane podnarzędzie bezpośrednio
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

    // Tworzenie struktury menu (jeśli nie istnieje)
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

    // Podpięcie zdarzeń pod przyciski z użyciem bezpiecznych odwołań window
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
