(function() {
    var d = document;
    var w = d.createElement('div');
    w.id = 'edytor-pro';
    // Usunięto 'transition: all 0.3s ease', bo mogło gryźć się z płynnym przesuwaniem palcem. 
    // Dodano will-change dla lepszej optymalizacji GPU.
    w.style.cssText = 'position:fixed;top:10%;left:5%;width:90%;height:75%;background:#111;z-index:2147483647;display:none;flex-direction:column;border-radius:15px;box-shadow:0 0 25px rgba(0,0,0,0.8);will-change:transform;';
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

    // --- Płynne przeciąganie (GPU + requestAnimationFrame) ---
    var dragHandle = w.querySelector('#edytor-header');
    var isDragging = false;
    var currentX = 0, currentY = 0, initialX = 0, initialY = 0;
    var xOffset = 0, yOffset = 0;

    function dragStart(e) {
        if (e.type === "touchstart") {
            initialX = e.touches[0].clientX - xOffset;
            initialY = e.touches[0].clientY - yOffset;
        } else {
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;
        }
        isDragging = true;
    }

    function dragEnd() {
        initialX = currentX;
        initialY = currentY;
        isDragging = false;
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault(); // Blokuje scrollowanie strony w tle
            if (e.type === "touchmove") {
                currentX = e.touches[0].clientX - initialX;
                currentY = e.touches[0].clientY - initialY;
            } else {
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
            }
            xOffset = currentX;
            yOffset = currentY;

            requestAnimationFrame(function() {
                w.style.transform = "translate3d(" + currentX + "px, " + currentY + "px, 0)";
            });
        }
    }

    // Eventy dotykowe
    dragHandle.addEventListener("touchstart", dragStart, { passive: false });
    d.addEventListener("touchmove", drag, { passive: false });
    d.addEventListener("touchend", dragEnd, false);
    
    // Eventy myszki (Desktop)
    dragHandle.addEventListener("mousedown", dragStart, false);
    d.addEventListener("mousemove", drag, false);
    d.addEventListener("mouseup", dragEnd, false);
    // ---------------------------------------------------------

    // Globalna funkcja startująca Edytor
    window.StartEdytorPro = function() {
        if(window.eruda) eruda.hide();
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
