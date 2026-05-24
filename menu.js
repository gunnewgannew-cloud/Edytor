(function() {
    var d = document;
    console.log("--- Menu.js Wersja 2.0 (Pancerna) załadowana ---");

    // Kuloodporna funkcja ładująca Erudę
    function loadAndShowEruda(tool) {
        var triggerEruda = function() {
            try {
                // Inicjalizujemy Erudę tylko raz
                eruda.init(); 
                
                // Opóźnienie 50ms - ratuje sytuację, gdy Eruda nie nadąża z budowaniem okna
                setTimeout(function() {
                    eruda.show(tool);
                }, 50);
            } catch(e) {
                alert("Błąd podczas uruchamiania Erudy: " + e.message);
            }
        };

        if (window.eruda) {
            triggerEruda();
        } else {
            var s = d.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/eruda';
            
            s.onload = triggerEruda;
            
            s.onerror = function() { 
                alert("UWAGA: Przeglądarka zablokowała pobranie Erudy (np. przez zabezpieczenia strony CSP)."); 
            };
            d.head.appendChild(s);
        }
    }

    // Tworzenie menu
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

    // Podpinanie przycisków
    setTimeout(function() {
        var btnConsole = d.getElementById('btn-console');
        if(!btnConsole) return; // Zabezpieczenie przed podwójnym wykonaniem

        d.getElementById('btn-edytor').onclick = function() { 
            menu.style.display = 'none'; 
            if(window.StartEdytorPro) StartEdytorPro(); else alert("Edytor.js nie został załadowany!");
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
    }, 100);
})();
