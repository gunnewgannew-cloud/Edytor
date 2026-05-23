(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    s.onload = function() {
        eruda.init();
        
        // 1. STYLIZACJA ERUDY (Ciemna, spójna z Edytorem)
        var style = d.createElement('style');
        style.innerHTML = `
            .eruda-dev-tools { background: #1a1a22 !important; color: #eee !important; border-radius: 15px 15px 0 0 !important; overflow: hidden; } 
            .eruda-nav-bar { background: #111 !important; color: #fff !important; }
            .eruda-entry-btn { background: #61afef !important; color: #fff !important; box-shadow: 0 0 10px rgba(97, 175, 239, 0.5) !important; border-radius: 50% !important; }
        `;
        if (eruda._shadowRoot) eruda._shadowRoot.appendChild(style);

        // 2. TWORZENIE OKNA EDYTORA (Z nowymi kolorami i animacjami)
        var w = d.createElement('div');
        w.id = 'edytor-pro';
        w.style = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;display:none;flex-direction:column;border-radius:15px;box-shadow:0 0 25px rgba(0,0,0,0.8);transition: all 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55), height 0.3s ease; transform: scale(0.9); opacity: 0;';
        
        w.innerHTML = `
            <div id="edytor-header" style="padding:12px;background:#1a1a22;cursor:move;border-radius:15px 15px 0 0;display:flex;justify-content:space-between;align-items:center;touch-action:none;border-bottom: 2px solid #61afef;">
                <b style="color:#61afef;font-family:sans-serif;font-size:16px;text-shadow: 0 0 5px rgba(97,175,239,0.7);">Edytor Pro V2</b>
                <div style="display:flex;align-items:center;">
                    <input id="eSearch" type="text" placeholder="Szukaj..." style="width:80px;background:#333;color:#fff;border:none;border-radius:20px;padding:4px 10px;margin-right:8px;font-size:12px;transition: width 0.3s ease;">
                    <button id="eMi" style="background:#333;color:#fff;border:none;border-radius:50%;width:30px;height:30px;margin-right:5px;font-size:16px;transition: background 0.2s;">↕</button>
                    <button id="eCa" style="background:#ef5350;color:#fff;border:none;border-radius:50%;width:30px;height:30px;margin-right:5px;font-size:16px;transition: transform 0.2s;">X</button>
                    <button id="eSa" style="background:#61afef;color:#fff;border:none;border-radius:20px;padding:6px 18px;font-weight:bold;transition: background 0.2s, box-shadow 0.2s;">Zapisz</button>
                </div>
            </div>
            <textarea id="eAr" style="flex:1;background:#000;color:#98c379;border:none;padding:15px;font-family:'Courier New', monospace;font-size:14px;line-height:1.5;outline:none;border-radius:0 0 15px 15px;"></textarea>
        `;
        d.body.appendChild(w);

        var area = d.getElementById('eAr');
        var search = d.getElementById('eSearch');

        // Funkcje sterowania oknem (Animacje wejścia/wyjścia)
        var showEditor = function() {
            w.style.display = 'flex';
            setTimeout(function() { w.style.transform = 'scale(1)'; w.style.opacity = '1'; }, 10);
        };
        var hideEditor = function() {
            w.style.transform = 'scale(0.9)'; w.style.opacity = '0';
            setTimeout(function() { w.style.display = 'none'; }, 400);
        };

        // ... [Reszta logiki wyszukiwania i autozapisu bez zmian...]
        search.oninput = function() {
            var val = search.value;
            if(!val) return;
            var pos = area.value.indexOf(val);
            if(pos > -1) { area.focus(); area.setSelectionRange(pos, pos + val.length); }
        };
        area.addEventListener('input', function() {
            localStorage.setItem('edytor_draft', area.value);
            localStorage.setItem('edytor_time', new Date().getTime().toString());
        });

        // Interakcje i efekty hover/click
        d.getElementById('eMi').onclick = function() {
            var isMin = w.style.height === '50px';
            w.style.height = isMin ? '75%' : '50px';
            area.style.display = isMin ? 'block' : 'none';
        };
        d.getElementById('eSa').onclick = function() {
            var target = d.getElementById('e_l');
            if (target) { target.outerHTML = area.value; target.removeAttribute('id'); }
            localStorage.removeItem('edytor_draft'); localStorage.removeItem('edytor_time');
            hideEditor();
        };
        d.getElementById('eCa').onclick = function() { hideEditor(); };

        // Dodanie hover dla przycisku Zapisz
        var saveBtn = d.getElementById('eSa');
        saveBtn.onmouseover = function() { saveBtn.style.background = '#4fa3e0'; saveBtn.style.boxShadow = '0 0 10px rgba(97, 175, 239, 0.6)'; };
        saveBtn.onmouseout = function() { saveBtn.style.background = '#61afef'; saveBtn.style.boxShadow = 'none'; };

        // ... [Przeciąganie i Integracja z Erudą z showEditor/hideEditor...]
        var isDragging = false, offsetX, offsetY;
        w.querySelector('#edytor-header').addEventListener('touchstart', function(e) { isDragging = true; offsetX = e.touches[0].clientX - w.offsetLeft; offsetY = e.touches[0].clientY - w.offsetTop; }, {passive: false});
        d.addEventListener('touchmove', function(e) { if (isDragging) { e.preventDefault(); w.style.left = (e.touches[0].clientX - offsetX) + 'px'; w.style.top = (e.touches[0].clientY - offsetY) + 'px'; } }, {passive: false});
        d.addEventListener('touchend', function() { isDragging = false; });

        eruda.get('snippets').add('Edytor', function() {
            var oldE = d.getElementById('e_l');
            if(oldE) oldE.removeAttribute('id');
            var e = null, b = d.createElement('div');
            b.style = 'position:fixed;pointer-events:none;border:3px dashed #61afef;z-index:999998;border-radius:10px;animation: pulse 1.5s infinite;';
            d.body.appendChild(b);
            
            // Dodanie animacji pulse
            var sPulse = d.createElement('style'); sPulse.innerHTML = '@keyframes pulse { 0% { box-shadow: 0 0 0 0 rgba(97, 175, 239, 0.7); } 70% { box-shadow: 0 0 0 10px rgba(97, 175, 239, 0); } 100% { box-shadow: 0 0 0 0 rgba(97, 175, 239, 0); } }'; d.head.appendChild(sPulse);

            var tm = function(x) { var m = x.touches[0], l = d.elementFromPoint(m.clientX, m.clientY); if (l && l !== b) { e = l; var r = l.getBoundingClientRect(); b.style.left=r.left+'px'; b.style.top=r.top+'px'; b.style.width=r.width+'px'; b.style.height=r.height+'px'; b.style.display='block'; } };
            var nd = function() { d.removeEventListener('touchmove', tm); d.removeEventListener('touchend', nd); b.remove(); if(e) { e.id = 'e_l'; area.value = e.outerHTML; showEditor(); } };
            d.addEventListener('touchmove', tm); d.addEventListener('touchend', nd); eruda.hide();
        });

        // Przywracanie z animacją
        var savedData = localStorage.getItem('edytor_draft');
        var savedTime = localStorage.getItem('edytor_time');
        if(savedData && savedTime && (new Date().getTime() - parseInt(savedTime) < 60000)) { area.value = savedData; showEditor(); }
    };
    d.body.appendChild(s);
})();
