(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    s.onload = function() {
        
        // 1. Inicjalizacja i wymuszenie motywu
        eruda.init({ defaults: { theme: 'dark' } });
        if (eruda.get('settings')) eruda.get('settings').set('theme', 'Dark');
        
        // 2. Pełny pakiet CSS - nasz futurystyczny design
        var css = `
            .eruda-dev-tools .eruda-nav-bar { background: #0d0d12 !important; border-bottom: 2px solid #1c1c28 !important; }
            .eruda-dev-tools .eruda-tab { background: transparent !important; color: #9097a5 !important; border-radius: 8px !important; margin: 0 4px !important; transition: all 0.2s; }
            .eruda-dev-tools .eruda-tab.eruda-active { background: #161622 !important; color: #61afef !important; box-shadow: 0 0 10px rgba(97, 175, 239, 0.4) !important; }
            .eruda-snippets, .eruda-snippets * { background-color: #111118 !important; border-color: #1e1e2d !important; }
            .eruda-snippets .eruda-list { display: grid !important; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important; gap: 16px !important; padding: 16px !important; }
            .eruda-snippets .eruda-item { background: #161622 !important; border-radius: 12px !important; padding: 20px !important; border: 1px solid #1e1e2d !important; transition: all 0.2s ease-in-out !important; }
            .eruda-snippets .eruda-title { color: #61afef !important; font-weight: 600 !important; }
            .eruda-entry-btn { background: #61afef !important; box-shadow: 0 0 14px rgba(97, 175, 239, 0.7) !important; }
        `;
        setTimeout(function() {
            var style = d.createElement('style');
            style.textContent = css;
            if (eruda._shadowRoot) eruda._shadowRoot.appendChild(style);
        }, 100);

        // 3. Okno Edytora Pro
        var w = d.createElement('div');
        w.id = 'edytor-pro';
        w.style.cssText = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;display:none;flex-direction:column;border-radius:15px;box-shadow:0 0 25px rgba(0,0,0,0.8);transition: all 0.3s ease;';
        w.innerHTML = `
            <div id="edytor-header" style="padding:12px;background:#1a1a22;cursor:move;border-radius:15px 15px 0 0;display:flex;justify-content:space-between;align-items:center;touch-action:none;border-bottom: 2px solid #61afef;">
                <b style="color:#61afef;font-family:sans-serif;">Edytor Pro</b>
                <div>
                    <input id="eSearch" type="text" placeholder="Szukaj..." style="width:60px;background:#333;color:#fff;border:none;border-radius:5px;padding:2px 5px;margin-right:5px;font-size:12px;">
                    <button id="eMi" style="background:#333;color:#fff;border:none;border-radius:5px;padding:5px 10px;">↕</button>
                    <button id="eCa" style="background:#ef5350;color:#fff;border:none;border-radius:5px;padding:5px 10px;">X</button>
                    <button id="eSa" style="background:#61afef;color:#fff;border:none;border-radius:5px;padding:5px 15px;font-weight:bold;">Zapisz</button>
                </div>
            </div>
            <textarea id="eAr" style="flex:1;background:#000;color:#98c379;border:none;padding:10px;font-family:monospace;outline:none;"></textarea>
        `;
        d.body.appendChild(w);

        var area = d.getElementById('eAr'), search = d.getElementById('eSearch');

        // 4. Logika Wyszukiwania
        search.oninput = function() {
            var val = search.value;
            if(!val) return;
            var pos = area.value.indexOf(val);
            if(pos > -1) { area.focus(); area.setSelectionRange(pos, pos + val.length); }
        };

        // 5. Autozapis
        area.addEventListener('input', function() {
            localStorage.setItem('edytor_draft', area.value);
            localStorage.setItem('edytor_time', new Date().getTime().toString());
        });

        // 6. Obsługa przycisków (Minimalizacja, Zamknięcie, Zapis)
        d.getElementById('eMi').onclick = function() {
            var isMin = w.style.height === '45px';
            w.style.height = isMin ? '75%' : '45px';
            area.style.display = isMin ? 'block' : 'none';
        };
        d.getElementById('eCa').onclick = function() { w.style.display = 'none'; };
        d.getElementById('eSa').onclick = function() {
            var target = d.getElementById('e_l');
            if (target) { target.outerHTML = area.value; target.removeAttribute('id'); }
            localStorage.removeItem('edytor_draft'); localStorage.removeItem('edytor_time');
            w.style.display = 'none';
        };

        // 7. Mechanizm przeciągania
        var isDragging = false, offsetX, offsetY;
        w.querySelector('#edytor-header').addEventListener('touchstart', function(e) {
            isDragging = true; 
            offsetX = e.touches[0].clientX - w.offsetLeft; 
            offsetY = e.touches[0].clientY - w.offsetTop;
        }, {passive: false});
        d.addEventListener('touchmove', function(e) {
            if (isDragging) { e.preventDefault(); w.style.left = (e.touches[0].clientX - offsetX) + 'px'; w.style.top = (e.touches[0].clientY - offsetY) + 'px'; }
        }, {passive: false});
        d.addEventListener('touchend', function() { isDragging = false; });

        // 8. Snippet Edytora
        eruda.get('snippets').add('Edytor', function() {
            var oldE = d.getElementById('e_l');
            if(oldE) oldE.removeAttribute('id');
            var e = null, b = d.createElement('div');
            b.style.cssText = 'position:fixed;pointer-events:none;border:2px dashed #61afef;box-shadow: 0 0 10px rgba(97,175,239,0.5);z-index:999998;';
            d.body.appendChild(b);
            
            var tm = function(x) {
                var m = x.touches[0], l = d.elementFromPoint(m.clientX, m.clientY);
                if (l && l !== b) { e = l; var r = l.getBoundingClientRect(); b.style.left=r.left+'px'; b.style.top=r.top+'px'; b.style.width=r.width+'px'; b.style.height=r.height+'px'; b.style.display='block'; }
            };
            var nd = function() {
                d.removeEventListener('touchmove', tm); d.removeEventListener('touchend', nd); b.remove();
                if(e) { e.id = 'e_l'; area.value = e.outerHTML; w.style.display = 'flex'; }
            };
            d.addEventListener('touchmove', tm); d.addEventListener('touchend', nd); eruda.hide();
        });

        // 9. Przywracanie sesji
        var savedData = localStorage.getItem('edytor_draft');
        var savedTime = localStorage.getItem('edytor_time');
        if(savedData && savedTime && (new Date().getTime() - parseInt(savedTime) < 60000)) {
            area.value = savedData;
            w.style.display = 'flex';
        }
    };
    d.body.appendChild(s);
})();
