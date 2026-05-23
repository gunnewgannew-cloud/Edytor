(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    s.onload = function() {
        eruda.init();

        // Styl dla ciemnego motywu (filtr invert + hue-rotate)
        var st = d.createElement('style');
        st.innerHTML = '.eruda-dev-tools { filter: invert(0.9) hue-rotate(180deg) !important; } .eruda-dev-tools .eruda-nav-bar .eruda-active { border-bottom: 2px solid #9e5010 !important; }';
        eruda._shadowRoot.appendChild(st);

        eruda.get('snippets').add('Edytor', function() {
            var e = null, b = d.createElement('div');
            b.style = 'position:fixed;pointer-events:none;border:2px dashed #f52;z-index:999998;display:none;';
            d.body.appendChild(b);

            var tm = function(x) {
                var m = x.touches[0], l = d.elementFromPoint(m.clientX, m.clientY);
                if (l && l !== b) {
                    e = l;
                    var r = l.getBoundingClientRect();
                    b.style.left = r.left + 'px';
                    b.style.top = r.top + 'px';
                    b.style.width = r.width + 'px';
                    b.style.height = r.height + 'px';
                    b.style.display = 'block';
                }
            };

            var nd = function() {
                if (!e) return;
                d.removeEventListener('touchmove', tm);
                d.removeEventListener('touchend', nd);
                b.remove();
                e.id = 'e_l';
                d.getElementById('eAr').value = e.outerHTML;
                w.style.display = 'flex';
            };

            d.addEventListener('touchmove', tm);
            d.addEventListener('touchend', nd);
            eruda.hide();
        });

        // Tworzenie Edytora Pro
        var w = d.createElement('div');
        w.id = 'edytor-pro';
        w.style = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:999999;border:1px solid #333;border-radius:15px;display:none;flex-direction:column;box-shadow:0 10px 30px rgba(0,0,0,0.5);filter: none !important;';
        
        w.innerHTML = `
            <div id="edytor-header" style="padding:10px;background:#1a1a22;border-bottom:1px solid #333;display:flex;justify-content:space-between;align-items:center;border-radius:15px 15px 0 0;touch-action:none;">
                <b style="color:#61afef;font-family:sans-serif;">Edytor Pro</b>
                <div>
                    <button id="ePh" style="background:#61afef22;border:none;color:#61afef;padding:5px 10px;margin-right:5px;border-radius:5px;">📸</button>
                    <button id="eCa" style="background:#333;border:none;color:#fff;padding:5px 10px;margin-right:5px;border-radius:5px;">X</button>
                    <button id="eSa" style="background:#61afef;border:none;padding:5px 15px;color:#fff;border-radius:5px;font-weight:bold;">Zapisz</button>
                </div>
            </div>
            <textarea id="eAr" style="flex:1;background:#000;color:#98c379;border:none;padding:10px;font-family:monospace;font-size:14px;outline:none;resize:none;"></textarea>
        `;
        d.body.appendChild(w);

        // --- FUNKCJA PRZECIĄGANIA ---
        var header = w.querySelector('#edytor-header');
        var isDragging = false, offsetX, offsetY;

        header.addEventListener('touchstart', function(e) {
            isDragging = true;
            var touch = e.touches[0];
            offsetX = touch.clientX - w.offsetLeft;
            offsetY = touch.clientY - w.offsetTop;
        });

        d.addEventListener('touchmove', function(e) {
            if (isDragging) {
                var touch = e.touches[0];
                w.style.left = (touch.clientX - offsetX) + 'px';
                w.style.top = (touch.clientY - offsetY) + 'px';
            }
        });

        d.addEventListener('touchend', function() { isDragging = false; });

        // Przyciski
        d.getElementById('eCa').onclick = function() { w.style.display = 'none'; eruda.show(); };
        d.getElementById('ePh').onclick = function() { 
            w.style.display = 'none'; 
            if (e) e.style.display = 'none'; 
            setTimeout(function() { if (e) e.style.display = 'block'; }, 10000); 
        };
        d.getElementById('eSa').onclick = function() { 
            var c = d.getElementById('eAr').value, l = d.getElementById('e_l'); 
            if (l) l.outerHTML = c; 
            w.style.display = 'none'; 
            eruda.show(); 
        };
    };
    d.body.appendChild(s);
})();
