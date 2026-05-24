javascript:(function(){
    var d = document;
    var t = Date.now();
    var baseUrl = 'https://raw.githubusercontent.com/gunnewgannew-cloud/Edytor/main/';
    var cmt = "\n/* CacheBuster: " + t + " */";

    // Funkcja wstrzykująca skrypty JS prosto z GitHuba (omija blokady MIME i Cache)
    function loadScript(file) {
        fetch(baseUrl + file + '?t=' + t)
            .then(response => response.text())
            .then(text => {
                var s = d.createElement('script');
                s.textContent = text + cmt;
                d.body.appendChild(s);
            })
            .catch(err => console.error("Błąd ładowania " + file, err));
    }

    // Funkcja wstrzykująca plik CSS
    function loadStyle(file) {
        fetch(baseUrl + file + '?t=' + t)
            .then(response => response.text())
            .then(text => {
                var style = d.createElement('style');
                style.textContent = text + cmt;
                d.head.appendChild(style);
            })
            .catch(err => console.error("Błąd ładowania " + file, err));
    }

    console.log("🚀 Gannew DevKit: Uruchamianie loadera...");

    // 1. Ładowanie stylów CSS
    loadStyle('styles.css');

    // 2. Ładowanie modułów (vConsole zostanie załadowane automatycznie przez menu.js)
    loadScript('editor.js');
    loadScript('menu.js');
})();
