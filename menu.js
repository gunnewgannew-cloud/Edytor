(function() {
    var d = document;

    // Funkcja czekająca na Erudę lub ładująca ją
    function loadAndShowEruda(tool) {
        if (window.eruda) {
            eruda.show(tool);
        } else {
            var s = d.createElement('script');
            s.src = 'https://cdn.jsdelivr.net/npm/eruda';
            s.onload = function() { 
                eruda.init(); 
                eruda.show(tool); 
            };
            d.head.appendChild(s);
        }
    }

    // Tworzenie menu (sprawdzenie czy już nie istnieje)
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

    // Podpięcie guzików w momencie kliknięcia (dynamiczne)
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
