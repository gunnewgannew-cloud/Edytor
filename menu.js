(function() {
    var d = document;
    
    var fab = d.createElement('div');
    fab.id = 'pro-fab';
    fab.innerText = 'PRO';
    d.body.appendChild(fab);

    var menu = d.createElement('div');
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

    // Podpięcie funkcji
    d.getElementById('btn-edytor').onclick = function() { menu.style.display = 'none'; if(window.StartEdytorPro) StartEdytorPro(); };
    d.getElementById('btn-console').onclick = function() { eruda.show('console'); menu.style.display = 'none'; };
    d.getElementById('btn-elements').onclick = function() { eruda.show('elements'); menu.style.display = 'none'; };
    d.getElementById('btn-network').onclick = function() { eruda.show('network'); menu.style.display = 'none'; };
    d.getElementById('btn-close-eruda').onclick = function() { eruda.hide(); menu.style.display = 'none'; };
})();
