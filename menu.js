(function() {
    var d = document;
    
    // Funkcja wczytująca Erudę, jeśli jej nie ma
    function loadEruda(callback) {
        if (window.eruda) {
            callback();
        } else {
            var script = d.createElement('script');
            script.src = 'https://cdn.jsdelivr.net/npm/eruda';
            script.onload = function() { eruda.init(); callback(); };
            d.head.appendChild(script);
        }
    }

    var fab = d.getElementById('pro-fab') || d.createElement('div');
    if (!fab.id) {
        fab.id = 'pro-fab';
        fab.innerText = 'PRO';
        d.body.appendChild(fab);
    }

    var menu = d.getElementById('pro-menu') || d.createElement('div');
    if (!menu.id) {
        menu.id = 'pro-menu';
        menu.innerHTML = `
            <button class="pro-menu-btn accent" id="btn-edytor">⚡ Edytuj Element</button>
            <button class="pro-menu-btn" id="btn-console">💻 Konsola</button>
            <button class="pro-menu-btn" id="btn-elements">🔍 Struktura (DOM)</button>
            <button class="pro-menu-btn" id="btn-network">🌐 Sieć (Network)</button>
            <button class="pro-menu-btn" id="btn-close-eruda" style="color: #ef5350;">❌ Zamknij Narzędzia</button>
        `;
        d.body.appendChild(menu);
    }

    fab.onclick = function() {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    };

    // Podpięcie z zabezpieczeniem przed brakiem Erudy
    d.getElementById('btn-edytor').onclick = function() { 
        menu.style.display = 'none'; 
        if(window.StartEdytorPro) StartEdytorPro(); 
    };

    d.getElementById('btn-console').onclick = function() { 
        menu.style.display = 'none'; 
        loadEruda(function() { eruda.show('console'); }); 
    };

    d.getElementById('btn-elements').onclick = function() { 
        menu.style.display = 'none'; 
        loadEruda(function() { eruda.show('elements'); }); 
    };

    d.getElementById('btn-network').onclick = function() { 
        menu.style.display = 'none'; 
        loadEruda(function() { eruda.show('network'); }); 
    };

    d.getElementById('btn-close-eruda').onclick = function() { 
        if(window.eruda) eruda.hide(); 
        menu.style.display = 'none'; 
    };
})();
