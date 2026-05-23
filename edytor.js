(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    s.onload = function() {
        eruda.init();
        // Stylizacja
        var st = d.createElement('style');
        st.innerHTML = '.eruda-dev-tools { filter: invert(0.9) hue-rotate(180deg) !important; } .eruda-dev-tools .eruda-nav-bar .eruda-active { border-bottom: 2px solid #9e5010 !important; }';
        eruda._shadowRoot.appendChild(st);

        // Snippet otwierający Edytor Pro
        eruda.get('snippets').add('Edytor', function() {
            var w = d.getElementById('edytor-pro');
            if(w) w.style.display = 'flex';
            eruda.hide();
        });

        // Tworzenie okna
        var oldW = d.getElementById('edytor-pro');
        if (oldW) oldW.remove();

        var w = d.createElement('div');
        w.id = 'edytor-pro';
        w.style = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;border:1px solid #333;border-radius:15px;display:none;flex-direction:column;box-shadow:0 10px 30px rgba(0,0,0,0.5);transition: height 0.3s ease;';
        
        w.innerHTML = `
            <div id="edytor-header" style="padding:10px;background:#1a1a22;border-bottom:1px solid #333;display:flex;justify-content:space-between;align-items:center;border-radius:15px 15px 0 0;touch-action:none;cursor:move;">
                <b style="color:#61afef;font-family:sans-serif;">Edytor Pro</b>
                <div>
                    <button id="eMi" style="background:#333;border:none;color:#fff;padding:5px 10px;margin-right:5px;border-radius:5px;">↕</button>
                    <button id="eCa" style="background:#333;border:none;color:#fff;padding:5px 10px;margin-right:5px;border-radius:5px;">X</button>
                    <button id="eSa" style="background:#61afef;border:none;padding:5px 15px;color:#fff;border-radius:5px;font-weight:bold;">Zapisz</button>
                </div>
            </div>
            <textarea id="eAr" style="flex:1;background:#000;color:#98c379;border:none;padding:10px;font-family:monospace;font-size:14px;outline:none;resize:none;"></textarea>
        `;
        d.body.appendChild(w);

        var area = d.getElementById('eAr');

        // --- MECHANIZM AUTOSAVE ---
        // 1. Przy starcie: wczytaj to co było wcześniej
        var saved = localStorage.getItem('edytor_draft');
        if(saved) area.value = saved;

        // 2. W trakcie pisania: zapisuj co 500ms (dla wydajności)
        area.addEventListener('input', function() {
            localStorage.setItem('edytor_draft', area.value);
        });

        // Minimalizacja
        var isMinimized = false;
        d.getElementById('eMi').onclick = function() {
            w.style.height = isMinimized ? '75%' : '45px';
            area.style.display = isMinimized ? 'block' : 'none';
            isMinimized = !isMinimized;
        };

        // Przeciąganie
        var header = w.querySelector('#edytor-header');
        var isDragging = false, offsetX, offsetY;
        header.addEventListener('touchstart', function(e) {
            isDragging = true;
            offsetX = e.touches[0].clientX - w.offsetLeft;
            offsetY = e.touches[0].clientY - w.offsetTop;
        }, {passive: false});
        d.addEventListener('touchmove', function(e) {
            if (isDragging) {
                e.preventDefault();
                w.style.left = (e.touches[0].clientX - offsetX) + 'px';
                w.style.top = (e.touches[0].clientY - offsetY) + 'px';
            }
        }, {passive: false});
        d.addEventListener('touchend', function() { isDragging = false; });

        // Przyciski akcji
        d.getElementById('eCa').onclick = function() { w.style.display = 'none'; eruda.show(); };
        d.getElementById('eSa').onclick = function() { 
            localStorage.removeItem('edytor_draft'); // Czyścimy po sukcesie
            w.style.display = 'none'; 
            eruda.show(); 
        };
    };
    d.body.appendChild(s);
})();
