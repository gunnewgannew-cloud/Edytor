(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    s.onload = function() {
        
        // 1. Inicjalizacja Erudy z Dark Mode
        eruda.init({
            defaults: { theme: 'dark' }
        });
        
        // 2. Kompleksowy, futurystyczny styl wizualny z NOWYM MENU
        var css = `
            /* --- NOWE MENU ERUDY (Glassmorphism & Clean UI) --- */
            
            /* Pływający pasek nawigacji z efektem rozmytego szkła */
            .eruda-dev-tools .eruda-nav-bar {
                background: rgba(13, 13, 18, 0.85) !important;
                backdrop-filter: blur(12px) !important;
                -webkit-backdrop-filter: blur(12px) !important;
                border-bottom: 1px solid rgba(97, 175, 239, 0.15) !important;
                padding: 10px 6px !important;
                box-shadow: 0 4px 20px rgba(0, 0, 0, 0.6) !important;
                overflow-x: auto !important;
                scrollbar-width: none !important; /* Ukrycie scrollbara Firefox */
            }
            
            /* Ukrycie scrollbara Chrome/Safari dla czystego wyglądu */
            .eruda-dev-tools .eruda-nav-bar::-webkit-scrollbar {
                display: none !important;
            }

            /* Zakładki menu - nowoczesne przyciski */
            .eruda-dev-tools .eruda-tab {
                background: rgba(255, 255, 255, 0.03) !important;
                color: #8b94a5 !important;
                font-family: 'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif !important;
                font-size: 13px !important;
                font-weight: 500 !important;
                padding: 6px 14px !important;
                border-radius: 10px !important;
                margin: 0 5px !important;
                transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1) !important;
                border: 1px solid transparent !important;
                display: inline-flex !important;
                align-items: center !important;
                justify-content: center !important;
            }

            /* Efekt najechania/lekkiego dotyku na nieaktywną zakładkę */
            .eruda-dev-tools .eruda-tab:hover,
            .eruda-dev-tools .eruda-tab:active {
                background: rgba(97, 175, 239, 0.1) !important;
                color: #e2e8f0 !important;
                transform: translateY(-1px) !important;
            }

            /* Aktywna zakładka - potężny neonowy efekt 3D */
            .eruda-dev-tools .eruda-tab.eruda-active {
                background: rgba(97, 175, 239, 0.15) !important;
                color: #61afef !important;
                font-weight: 700 !important;
                border: 1px solid rgba(97, 175, 239, 0.3) !important;
                box-shadow: 0 0 15px rgba(97, 175, 239, 0.2) inset, 0 4px 10px rgba(0, 0, 0, 0.5) !important;
                transform: translateY(-2px) !important;
            }

            /* --- RESZTA STYLÓW (Snippets, Tła) --- */

            /* Tło główne całej Erudy (dopasowane do menu) */
            .eruda-dev-tools {
                background-color: #0a0a0f !important;
            }

            /* Całkowita zmiana układu wewnątrz Snippets - Siatka kafelków */
            .eruda-snippets .eruda-list {
                display: grid !important;
                grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
                gap: 16px !important;
                padding: 16px !important;
                background: #0a0a0f !important;
            }

            /* Każdy snippet jako interaktywny kafelek z efektem głębi */
            .eruda-snippets .eruda-item {
                background: #161622 !important;
                border-radius: 12px !important;
                padding: 20px !important;
                border: 1px solid #1e1e2d !important;
                transition: all 0.2s ease-in-out !important;
                cursor: pointer !important;
                display: flex !important;
                flex-direction: column !important;
                justify-content: space-between !important;
            }

            /* Podświetlenie kafelka po dotknięciu */
            .eruda-snippets .eruda-item:active {
                border-color: #61afef !important;
                box-shadow: 0 0 15px rgba(97, 175, 239, 0.3) !important;
                transform: translateY(-2px) !important;
            }

            /* Tytuły skryptów - neonowy błękit */
            .eruda-snippets .eruda-title {
                color: #61afef !important;
                font-size: 16px !important;
                font-weight: 600 !important;
                margin-bottom: 6px !important;
            }

            /* Strzałki wykonawcze z poświatą */
            .eruda-snippets [class*="icon"] {
                color: #61afef !important;
                font-size: 18px !important;
                margin-left: auto !important;
                opacity: 0.9 !important;
                transition: transform 0.2s !important;
                box-shadow: 0 0 5px rgba(97, 175, 239, 0.5) !important;
            }

            /* Efekt obrotu strzałki przy naciśnięciu */
            .eruda-snippets .eruda-item:active [class*="icon"] {
                transform: rotate(90deg) !important;
            }

            /* Wygładzone, jasnoszare opisy */
            .eruda-snippets .eruda-desc,
            .eruda-snippets p {
                color: #a0a8b9 !important;
                font-size: 13px !important;
                line-height: 1.4 !important;
                margin-top: 4px !important;
            }
            
            /* Stylowy, świecący przycisk startowy Erudy */
            .eruda-entry-btn { 
                background: #61afef !important; 
                box-shadow: 0 0 14px rgba(97, 175, 239, 0.7) !important; 
            }
        `;
        
        // BEZPIECZNE wstrzykiwanie stylów (eliminuje Script Error)
        var injectStyles = setInterval(function() {
            if (eruda._shadowRoot) {
                var style = d.createElement('style');
                style.innerHTML = css;
                eruda._shadowRoot.appendChild(style);
                clearInterval(injectStyles);
            }
        }, 100);

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

        // 6. Mechanizm przeciąganie
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
