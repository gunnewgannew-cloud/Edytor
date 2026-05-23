(function() {
    var d = document;
    var s = d.createElement('script');
    s.src = '//cdn.jsdelivr.net/npm/eruda';
    s.onload = function() {
        eruda.init();
        var st = d.createElement('style');
        st.innerHTML = '.eruda-dev-tools { filter: invert(0.9) hue-rotate(180deg) !important; }';
        eruda._shadowRoot.appendChild(st);

        eruda.get('snippets').add('Edytor', function() {
            var oldE = d.getElementById('e_l');
            if(oldE) oldE.removeAttribute('id');
            var e = null, b = d.createElement('div');
            b.style = 'position:fixed;pointer-events:none;border:2px dashed #f52;z-index:999998;';
            d.body.appendChild(b);
            var tm = function(x) {
                var m = x.touches[0], l = d.elementFromPoint(m.clientX, m.clientY);
                if (l && l !== b) { e = l; var r = l.getBoundingClientRect(); b.style.left=r.left+'px'; b.style.top=r.top+'px'; b.style.width=r.width+'px'; b.style.height=r.height+'px'; b.style.display='block'; }
            };
            var nd = function() {
                d.removeEventListener('touchmove', tm); d.removeEventListener('touchend', nd); b.remove();
                if(e) { e.id = 'e_l'; d.getElementById('eAr').value = e.outerHTML; d.getElementById('edytor-pro').style.display = 'flex'; }
            };
            d.addEventListener('touchmove', tm); d.addEventListener('touchend', nd); eruda.hide();
        });

        var oldW = d.getElementById('edytor-pro');
        if (oldW) oldW.remove();

        var w = d.createElement('div');
        w.id = 'edytor-pro';
        w.style = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;display:none;flex-direction:column;border-radius:15px;box-shadow:0 0 20px #000;transition: height 0.3s ease;';
        w.innerHTML = `
            <div id="edytor-header" style="padding:10px;background:#1a1a22;cursor:move;border-radius:15px 15px 0 0;display:flex;justify-content:space-between;align-items:center;touch-action:none;">
                <b style="color:#61afef;font-family:sans-serif;">Edytor Pro</b>
                <div>
                    <button id="eMi" style="background:#333;color:#fff;border:none;border-radius:5px;padding:5px 10px;">↕</button>
                    <button id="eCa" style="background:#333;color:#fff;border:none;border-radius:5px;padding:5px 10px;">X</button>
                    <button id="eSa" style="background:#61afef;border:none;border-radius:5px;padding:5px 15px;font-weight:bold;">Zapisz</button>
                </div>
            </div>
            <textarea id="eAr" style="flex:1;background:#000;color:#98c379;border:none;padding:10px;font-family:monospace;"></textarea>
        `;
        d.body.appendChild(w);

        var area = d.getElementById('eAr'), headerText = w.querySelector('b');
        
        // Autozapis
        var saved = localStorage.getItem('edytor_draft');
        if(saved) area.value = saved;
        area.addEventListener('input', function() {
            localStorage.setItem('edytor_draft', area.value);
            var o = headerText.innerText; headerText.innerText = "Zapisywanie...";
            setTimeout(function() { headerText.innerText = o; }, 1000);
        });

        // Minimalizacja
        var isMinimized = false;
        d.getElementById('eMi').onclick = function() {
            w.style.height = isMinimized ? '75%' : '45px';
            area.style.display = isMinimized ? 'block' : 'none';
            isMinimized = !isMinimized;
        };

        // Przeciąganie
        var isDragging = false, offsetX, offsetY;
        w.querySelector('#edytor-header').addEventListener('touchstart', function(e) {
            isDragging = true; offsetX = e.touches[0].clientX - w.offsetLeft; offsetY = e.touches[0].clientY - w.offsetTop;
        }, {passive: false});
        d.addEventListener('touchmove', function(e) {
            if (isDragging) { e.preventDefault(); w.style.left = (e.touches[0].clientX - offsetX) + 'px'; w.style.top = (e.touches[0].clientY - offsetY) + 'px'; }
        }, {passive: false});
        d.addEventListener('touchend', function() { isDragging = false; });

        // Zapis i Wyjście
        d.getElementById('eSa').onclick = function() {
            var target = d.getElementById('e_l');
            if (target) { target.outerHTML = area.value; target.removeAttribute('id'); }
            localStorage.removeItem('edytor_draft');
            w.style.display = 'none'; eruda.show();
        };
        d.getElementById('eCa').onclick = function() { w.style.display = 'none'; eruda.show(); };
    };
    d.body.appendChild(s);
})();
