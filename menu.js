(function() {
    var d = document;
    console.log("--- Menu.js Wersja PRO (Bez zębatki) załadowana ---");

    // Funkcja konfigurująca i otwierająca Erudę bez pokazywania zębatki
    function loadAndShowEruda(tool) {
        var triggerEruda = function() {
            try {
                // KLUCZOWE: Konfiguracja Erudy PRZED inicjalizacją
                // Ukrywamy domyślny przycisk wejściowy na stałe przez opcje Erudy
                if (window.eruda && !eruda._isInit) {
                    eruda.init({
                        defaults: {
                            displaySize: 50,
                            theme: 'Monokai',
                            themeActive: true
                        }
                    });
                    
                    // Schowanie zębatki generowanej przez skrypt Erudy
                    var entryBtn = d.querySelector('.eruda-entry-btn');
                    if (entryBtn) entryBtn.style.setProperty('display', 'none', 'important');
                }

                // Natychmiastowe wymuszenie otwarcia konkretnego narzędzia
                eruda.show(tool);
                
            } catch(e) {
                console.error("Błąd Erudy: ", e);
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

    // Podpinanie zdarzeń pod przyciski
    d.getElementById('btn-edytor').onclick = function() { 
        menu.style.display = 'none'; 
        if(window.StartEdytorPro) StartEdytorPro();
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
        if(window.eruda) eruda.hide(); 
        menu.style.display = 'none'; 
    };
})();
