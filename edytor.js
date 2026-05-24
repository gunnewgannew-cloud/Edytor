(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    
    s.onload = function() {
        // 1. Inicjalizacja silnika (Eruda) w tle
        eruda.init({ defaults: { theme: 'dark' } });
        
        // Ukrywamy oryginalny przycisk Erudy (zębatkę)
        var hideEruda = d.createElement('style');
        hideEruda.innerHTML = `.eruda-entry-btn { display: none !important; }`;
        d.body.appendChild(hideEruda);

        // 2. CSS dla naszego autorskiego Menu i przycisku
        var customCss = d.createElement('style');
        customCss.innerHTML = `
            /* Pływający przycisk główny */
            #pro-fab {
                position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px;
                background: linear-gradient(135deg, #61afef, #c678dd);
                border-radius: 25px; color: white; font-weight: bold; font-family: sans-serif;
                display: flex; justify-content: center; align-items: center;
                box-shadow: 0 4px 15px rgba(0,0,0,0.5); z-index: 2147483646; cursor: pointer;
                transition: transform 0.2s ease;
            }
            #pro-fab:active { transform: scale(0.9); }

            /* Nasz Panel Sterowania */
            #pro-menu {
                position: fixed; bottom: 80px; right: 20px; width: 200px;
                background: rgba(22, 22, 34, 0.9); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px);
                border: 1px solid rgba(97, 175, 239, 0.3); border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.8); z-index: 2147483646;
                display: none; flex-direction: column; padding: 10px; overflow: hidden;
                font-family: 'SF Pro Display', sans-serif;
            }

            /* Przyciski w panelu */
            .pro-menu-btn {
                background: transparent; color: #a0a8b9; border: none; padding: 12px;
                text-align: left; font-size: 14px; font-weight: 500; border-radius: 8px;
                margin-bottom: 5px; cursor: pointer; transition: all 0.2s ease;
            }
            .pro-menu-btn:hover, .pro-menu-btn:active { background: rgba(97, 175, 239, 0.2); color: #61afef; }
            .pro-menu-btn.accent { color: #e5c07b; font-weight: bold; border-bottom: 1px solid rgba(229, 192, 123, 0.2); margin-bottom: 10px; }
        `;
        d.body.appendChild(customCss);

        // 3. Budowa interfejsu Panelu i Przycisku
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

        // Logika otwierania/zamykania naszego panelu
        fab.onclick = function() {
            menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
        };

        // 4. Podpięcie przycisków menu do Erudy
        d.getElementById('btn-console').onclick = function() { eruda.show('console'); menu.style.display = 'none'; };
        d.getElementById('btn-elements').onclick = function() { eruda.show('elements'); menu.style.display = 'none'; };
        d.getElementById('btn-network').onclick = function() { eruda.show('network'); menu.style.display = 'none'; };
        d.getElementById('btn-close-eruda').onclick = function() { eruda.hide(); menu.style.display = 'none'; };

        // 5. Kod Edytora Pro (Ten sam, potężny silnik co wcześniej)
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

        var area = d.getElementById('eAr');
        var search = d.getElementById('eSearch');

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

        // Mechanizm przeciągania okna Edytora
        var isDragging = false, offsetX, offsetY;
        w.querySelector('#edytor-header').addEventListener('touchstart', function(e) {
            isDragging = true; offsetX = e.touches[0].clientX - w.offsetLeft; offsetY = e.touches[0].clientY - w.offsetTop;
        }, {passive: false});
        d.addEventListener('touchmove', function(e) {
            if (isDragging) { e.preventDefault(); w.style.left = (e.touches[0].clientX - offsetX) + 'px'; w.style.top = (e.touches[0].clientY - offsetY) + 'px'; }
        }, {passive: false});
        d.addEventListener('touchend', function() { isDragging = false; });

        // 6. Odpalanie Edytora z naszego własnego panelu (zamiast ze Snippets Erudy)
        d.getElementById('btn-edytor').onclick = function() {
            menu.style.display = 'none'; // Chowamy menu
            eruda.hide(); // Upewniamy się, że konsola Erudy nie zasłania ekranu

            var oldE = d.getElementById('e_l');
            if(oldE) oldE.removeAttribute('id');
            var e = null, b = d.createElement('div');
            b.style.cssText = 'position:fixed;pointer-events:none;border:2px dashed #e5c07b;box-shadow: 0 0 15px rgba(229,192,123,0.6);z-index:999998;';
            d.body.appendChild(b);
            
            var tm = function(x) {
                var m = x.touches[0], l = d.elementFromPoint(m.clientX, m.clientY);
                // Ignoruj nasze własne okna i przyciski podczas skanowania palcem
                if (l && l !== b && !w.contains(l) && !menu.contains(l) && l !== fab) { 
                    e = l; 
                    var r = l.getBoundingClientRect(); 
                    b.style.left=r.left+'px'; b.style.top=r.top+'px'; b.style.width=r.width+'px'; b.style.height=r.height+'px'; b.style.display='block'; 
                }
            };
            
            var nd = function() {
                d.removeEventListener('touchmove', tm); d.removeEventListener('touchend', nd); b.remove();
                if(e) { e.id = 'e_l'; area.value = e.outerHTML; w.style.display = 'flex'; }
            };
            
            d.addEventListener('touchmove', tm); d.addEventListener('touchend', nd);
        };

        // Przywracanie draftu
        var savedData = localStorage.getItem('edytor_draft');
        var savedTime = localStorage.getItem('edytor_time');
        if(savedData && savedTime && (new Date().getTime() - parseInt(savedTime) < 60000)) {
            area.value = savedData;
            w.style.display = 'flex';
        }
    };
    d.body.appendChild(s);
})();
