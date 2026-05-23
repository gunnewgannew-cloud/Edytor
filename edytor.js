(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    s.onload = function() {
        
        // 1. Inicjalizacja Erudy z domyślnym Dark Mode
        eruda.init({
            defaults: { theme: 'dark' }
        });
        
        // 2. Maksymalnie ulepszony i wygładzony styl wizualny
        var css = `
            /* Cały górny pasek nawigacji - nowoczesny design */
            .eruda-dev-tools .eruda-nav-bar {
                background-color: #0f0f14 !important;
                background: #0f0f14 !important;
                border-bottom: 2px solid #1a1a24 !important;
                padding: 4px 0 !important;
            }

            /* Wszystkie zakładki - eleganckie zaokrąglenia i płynne przejście */
            .eruda-dev-tools .eruda-tab {
                background-color: transparent !important;
                background: transparent !important;
                color: #888e9b !important;
                font-family: sans-serif !important;
                font-size: 13px !important;
                font-weight: 500 !important;
                transition: all 0.2s ease-in-out !important;
                border-radius: 8px 8px 0 0 !important;
                margin: 0 2px !important;
                border: none !important;
            }

            /* Efekt po dotknięciu / najechaniu na nieaktywną zakładkę */
            .eruda-dev-tools .eruda-tab:active,
            .eruda-dev-tools .eruda-tab:hover {
                background-color: #1a1a24 !important;
                color: #fff !important;
            }

            /* Aktywna, obecnie wybrana zakładka (np. podświetlone Snippets) */
            .eruda-dev-tools .eruda-tab.eruda-active {
                background-color: #16161f !important;
                background: #16161f !important;
                color: #61afef !important;
                font-weight: bold !important;
                border-bottom: 3px solid #61afef !important;
            }

            /* Całkowite mroczne tło wewnątrz sekcji Snippets */
            .eruda-snippets,
            .eruda-snippets * {
                background-color: #111116 !important; 
                background: #111116 !important;
                border-color: #1e1e26 !important;
            }
            
            /* Niebieskie, czyste tytuły skryptów i strzałki wykonawcze */
            .eruda-snippets .eruda-title,
            .eruda-snippets .eruda-name,
            .eruda-snippets [class*="title"] {
                color: #61afef !important;
            }

            /* Wygładzone opisy pod skryptami */
            .eruda-snippets .eruda-desc,
            .eruda-snippets p {
                color: #abb2bf !important;
            }
            
            /* Stylowy, świecący okrągły przycisk Erudy */
            .eruda-entry-btn { 
                background: #61afef !important; 
                box-shadow: 0 0 12px rgba(97, 175, 239, 0.6) !important; 
            }
        `;
        var style = d.createElement('style');
        style.innerHTML = css;
        if (eruda._shadowRoot) eruda._shadowRoot.appendChild(style);

        // 3. Okno Edytora Pro
        var w = d.createElement('div');
        w.id = 'edytor-pro';
        w.style = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;display:none;flex-direction:column;border-radius:15px;box-shadow:0 0 25px rgba(0,0,0,0.8);transition: all 0.3s ease;';
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

        var area = d.getElementById('eAr');
        var search = d.getElementById('eSearch');

        // 4. Szukanie i autozapis
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

        // 5. Minimalizacja, zamykanie i zapis
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

        // 6. Mechanizm przeciągania
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

        // 7. Snippet "Edytor"
        eruda.get('snippets').add('Edytor', function() {
            var oldE = d.getElementById('e_l');
            if(oldE) oldE.removeAttribute('id');
            var e = null, b = d.createElement('div');
            b.style = 'position:fixed;pointer-events:none;border:2px dashed #61afef;box-shadow: 0 0 10px rgba(97,175,239,0.5);z-index:999998;';
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

        // 8. Kopia zapasowa
        var savedData = localStorage.getItem('edytor_draft');
        var savedTime = localStorage.getItem('edytor_time');
        if(savedData && savedTime && (new Date().getTime() - parseInt(savedTime) < 60000)) {
            area.value = savedData;
            w.style.display = 'flex';
        }
    };
    d.body.appendChild(s);
})();
