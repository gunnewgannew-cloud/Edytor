javascript:(function(){
    var d = document;
    
    // Funkcja do płynnego ładowania skryptów jeden po drugim
    function loadScript(src, callback) {
        var s = d.createElement('script');
        s.src = src;
        if(callback) s.onload = callback;
        d.body.appendChild(s);
    }

    // 1. Wstrzyknięcie Twoich stylów CSS (Wygląd)
    var link = d.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://raw.githubusercontent.com/gunnewgannew-cloud/Edytor/refs/heads/main/styles.css';
    d.head.appendChild(link);

    // 2. Ładowanie silnika Erudy
    loadScript('//cdn.jsdelivr.net/npm/eruda', function() {
        eruda.init({ defaults: { theme: 'dark' } });
        
        // 3. Ładowanie Edytora Pro
        loadScript('https://raw.githubusercontent.com/gunnewgannew-cloud/Edytor/refs/heads/main/editor.js', function() {
            
            // 4. Ładowanie Menu PRO na samym końcu
            loadScript('https://raw.githubusercontent.com/gunnewgannew-cloud/Edytor/refs/heads/main/menu.js');
            
        });
    });
})();
