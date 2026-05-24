(function() {
    var d = document;
    var w = d.createElement('div');
    w.id = 'edytor-pro';
    // Blokujemy transition bezpośrednio w stylach elementu oraz optymalizujemy pod GPU (will-change)
    w.style.cssText = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;display:none;flex-direction:column;border-radius:15px;box-shadow:0 0 25px rgba(0,0,0,0.8);will-change:transform;transition:none !important;animation:none !important;';
    w.innerHTML = `
        <div id="edytor-header" style="padding:12px;background:#1a1a22;cursor:move;border-radius:15px 15px 0 0;display:flex;justify-content:space-between;align-items:center;border-bottom: 2px solid #61afef;touch-action:none;transition:none !important;-webkit-user-select:none;user-select:none;">
            <b style="color:#61afef;font-family:sans-serif;">Gannew DevKit</b>
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

    // --- IDEALNIE PŁYNNY SILNIK RUCHU (DELTA-TRANSFORM) ---
    // Zero przeskakiwania, zero opóźnień, pełna synchronizacja z palcem
    var isDragging = false;
    var startX = 0, startY = 0;
    var translateX = 0, translateY = 0;
    var currentTranslateX = 0, currentTranslateY = 0;
    var header = w.querySelector('#edytor-header');

    // Obsługa dotyku (Mobile)
    header.addEventListener('touchstart', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
    }, {passive: false});

    d.addEventListener('touchmove', function(e) {
        if (!isDragging) return;
        if (e.cancelable) e.preventDefault(); // Całkowicie blokuje przewijanie strony w tle

        currentTranslateX = e.touches[0].clientX - startX;
        currentTranslateY = e.touches[0].clientY - startY;

        var totalX = translateX + currentTranslateX;
        var totalY = translateY + currentTranslateY;

        // Przesunięcie bezpośrednio za pomocą GPU (natychmiastowa reakcja piksel w piksel)
        w.style.transform = 'translate3d(' + totalX + 'px, ' + totalY + 'px, 0)';
    }, {passive: false});

    d.addEventListener('touchend', function() {
        if (isDragging) {
            isDragging = false;
            translateX += currentTranslateX;
            translateY += currentTranslateY;
            currentTranslateX = 0;
            currentTranslateY = 0;
        }
    });

    // Obsługa myszki (PC)
    header.addEventListener('mousedown', function(e) {
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') return;
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
    });

    d.addEventListener('mousemove', function(e) {
        if (!isDragging) return;
        currentTranslateX = e.clientX - startX;
        currentTranslateY = e.clientY - startY;

        var totalX = translateX + currentTranslateX;
        var totalY = translateY + currentTranslateY;

        w.style.transform = 'translate3d(' + totalX + 'px, ' + totalY + 'px, 0)';
    });

    d.addEventListener('mouseup', function() {
        if (isDragging) {
            isDragging = false;
            translateX += currentTranslateX;
            translateY += currentTranslateY;
            currentTranslateX = 0;
            currentTranslateY = 0;
        }
    });
    // ------------------------------------------------------

    window.StartEdytorPro = function() {
        // ZMIANA: Zamiana Erudy na vConsole (ukrywa konsolę, jeśli jest otwarta podczas włączania edytora)
        if(window.vConsoleInstance) window.vConsoleInstance.hide();
        
        var oldE = d.getElementById('e_l'); if(oldE) oldE.removeAttribute('id');
        var e = null, b = d.createElement('div');
        b.style.cssText = 'position:fixed;pointer-events:none;border:2px dashed #e5c07b;box-shadow: 0 0 15px rgba(229,192,123,0.6);z-index:999998;';
        d.body.appendChild(b);
        
        var tm = function(x) {
            var m = x.touches[0], l = d.elementFromPoint(m.clientX, m.clientY);
            if (l && l !== b && !w.contains(l) && !d.getElementById('pro-menu').contains(l) && l.id !== 'pro-fab') { 
                e = l; var r = l.getBoundingClientRect(); b.style.left=r.left+'px'; b.style.top=r.top+'px'; b.style.width=r.width+'px'; b.style.height=r.height+'px'; b.style.display='block'; 
            }
        };
        var nd = function() {
            d.removeEventListener('touchmove', tm); d.removeEventListener('touchend', nd); b.remove();
            if(e) { e.id = 'e_l'; area.value = e.outerHTML; w.style.display = 'flex'; }
        };
        d.addEventListener('touchmove', tm, {passive: false}); d.addEventListener('touchend', nd);
    };
})();
        
