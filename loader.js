javascript:(function(){
    var d = document;
    
    // Funkcja pobierająca skrypty
    function loadScript(src, callback) {
        var s = d.createElement('script');
        s.src = src;
        if(callback) s.onload = callback;
        d.body.appendChild(s);
    }

    // 1. Ładowanie CSS (Wygląd panelu)
    var link = d.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://raw.githubusercontent.com/gunnewgannew-cloud/Edytor/refs/heads/main/styles.css';
    d.head.appendChild(link);

    // 2. Start silnika Erudy
    loadScript('//cdn.jsdelivr.net/npm/eruda', function() {
        eruda.init({ defaults: { theme: 'dark' } });
        
        // 3. Ładowanie modułu Edytora
        loadScript('https://raw.githubusercontent.com/gunnewgannew-cloud/Edytor/refs/heads/main/editor.js', function() {
            
            // 4. Ładowanie modułu Menu
            loadScript('https://raw.githubusercontent.com/gunnewgannew-cloud/Edytor/refs/heads/main/menu.js');
            
        });
    });
})();
