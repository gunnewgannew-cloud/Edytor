(function() {
    var d = document;
    var w = d.createElement('div');
    w.id = 'edytor-pro';
    
    // ZMIANA: Dodano 'will-change: transform' dla pełnej płynności na GPU
    w.style.cssText = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;display:none;flex-direction:column;border-radius:15px;box-shadow:0 0 25px rgba(0,0,0,0.8);transition:none !important;animation:none !important;will-change:transform;';
    w.innerHTML = `
        <div id="edytor-header" style="padding:12px;background:#1a1a22;cursor:move;border-radius:15px 15px 0 0;display:flex;justify-content:space-between;align-items:center;border-bottom: 2px solid #61afef;transition:none !important;touch-action:none;">
            <b style="color:#61afef;font-family:sans-serif;user-select:none;-webkit-user-select:none;">Gannew DevKit</b>
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
        var val = search.value; if(!val) return;
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
        w.style.display = 'none';
    };

    // --- NOWE, ULTRA-PŁYNNE PRZECIĄGANIA (TRANSFORM + rAF) ---
    var isDragging = false;
    var startX = 0, startY = 0;
    var currentX = 0, currentY = 0;
    var dragX = 0, dragY = 0;
    var header = w.querySelector('#edytor-header');
    var ticking = false;

    function updatePosition() {
        w.style.transform = 'translate3d(' + (currentX + dragX) + 'px, ' + (currentY + dragY) + 'px, 0)';
        ticking = false;
    }

    function moveDrag(clientX, clientY) {
        if (!isDragging) return;
        dragX = clientX - startX;
        dragY = clientY - startY;
        
        if (!ticking) {
            requestAnimationFrame(updatePosition);
            ticking = true;
        }
    }

    header.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, {passive: false});

    d.addEventListener('touchmove', function(e) {
        if (isDragging) { 
            e.preventDefault(); 
            moveDrag(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, {passive: false});

    var endDrag = function() { 
        if (isDragging) {
            isDragging = false; 
            currentX += dragX;
            currentY += dragY;
            dragX = 0;
            dragY = 0;
        }
    };

    d.addEventListener('touchend', endDrag);

    header.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    d.addEventListener('mousemove', function(e) {
        moveDrag(e.clientX, e.clientY);
    });

    d.addEventListener('mouseup', endDrag);
    // ----------------------------------------------------

    window.StartEdytorPro = function() {
        if(window.eruda) eruda.hide();
        var oldE = d.getElementById('e_l'); if(oldE) oldE.removeAttribute('id');
        var e = null, b = d.createElement('div');
        b.style.cssText = 'position:fixed;pointer-events:none;border:2px dashed #e5c07b;box-shadow: 0 0 15px rgba(229,192,123,0.6);z-index:999998;';
        d.body.appendChild(b);
        
        // ZOPTYMALIZOWANE PRÓBKOWANIE ELEMENTÓW
        var tmTicking = false;
        var tm = function(x) {
            var clientX = x.touches[0].clientX;
            var clientY = x.touches[0].clientY;
            
            if (!tmTicking) {
                tmTicking = true;
                requestAnimationFrame(function() {
                    var l = d.elementFromPoint(clientX, clientY);
                    var pm = d.getElementById('pro-menu');
                    if (l && l !== b && !w.contains(l) && (!pm || !pm.contains(l)) && l.id !== 'pro-fab') { 
                        e = l; 
                        var r = l.getBoundingClientRect(); 
                        b.style.left = r.left + 'px'; 
                        b.style.top = r.top + 'px'; 
                        b.style.width = r.width + 'px'; 
                        b.style.height = r.height + 'px'; 
                        b.style.display = 'block'; 
                    }
                    tmTicking = false;
                });
            }
        };
        var nd = function() {
            d.removeEventListener('touchmove', tm); d.removeEventListener('touchend', nd); b.remove();
            if(e) { e.id = 'e_l'; area.value = e.outerHTML; w.style.display = 'flex'; }
        };
        d.addEventListener('touchmove', tm, {passive: false}); d.addEventListener('touchend', nd);
    };
})();
