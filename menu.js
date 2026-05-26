(function() {
    var d = document;

    // DEFINICJA NASZEJ WIELKIEJ DZIESIĄTKI (FUNKCJE DO ZARZĄDZANIA W SETTINGS)
    var proFeatures = [
        { id: 'adkiller', name: '💥 Ad-Killer (Tryb Przetrwania)', key: 'pro_mod_adkiller', color: '#ffaa66' },
        { id: 'fps', name: '📊 FPS & Performance HUD', key: 'pro_mod_fps', color: '#66ffaa' },
        { id: 'video', name: '🎬 Akcelerator Wideo', key: 'pro_mod_video', color: '#ffee66' },
        { id: 'qr', name: '🔮 Transfer QR', key: 'pro_mod_qr', color: '#ff66cc' },
        { id: 'unblur', name: '🔓 Un-Blur PRO', key: 'pro_mod_unblur', color: '#aaccff' },
        { id: 'linkspy', name: '🕵️ Link Spy / Detektyw', key: 'pro_mod_linkspy', color: '#cc99ff' },
        { id: 'antipopup', name: '🚫 Anti-PopUp EXTREME', key: 'pro_mod_antipopup', color: '#ff6666' },
        { id: 'darkmode', name: '🌙 Wymuszacz Dark Mode', key: 'pro_mod_darkmode', color: '#bbbbbb' }
    ];

    // =========================================================================
    // INIEKCJA STYLI CSS (NA SAMYMKU POCZĄTKU, ŻEBY NIC ICH NIE ZABLOKOWAŁO)
    // =========================================================================
    if (!d.getElementById('pro-core-styles')) {
        var proStyles = d.createElement('style');
        proStyles.id = 'pro-core-styles';
        proStyles.innerHTML = `
            #pro-fab { position: fixed !important; bottom: 20px !important; right: 20px !important; width: 60px !important; height: 60px !important; border-radius: 50% !important; background: linear-gradient(135deg, #7abcff, #c39eff) !important; border: none !important; color: #ffffff !important; font-size: 19px !important; font-weight: 900 !important; display: flex !important; align-items: center !important; justify-content: center !important; z-index: 9999999 !important; cursor: pointer !important; box-shadow: 0 4px 15px rgba(0,0,0,0.3) !important; user-select: none !important; }
            #devkit-error-badge { position: absolute !important; top: -2px !important; right: -2px !important; background: #ff3b30 !important; color: #ffffff !important; font-size: 11px !important; font-weight: bold !important; min-width: 18px !important; height: 18px !important; padding: 2px !important; border-radius: 50% !important; display: none !important; align-items: center !important; justify-content: center !important; z-index: 10000000 !important; }
            #menu-console-error-badge { background: #ff3b30 !important; color: #ffffff !important; font-size: 11px !important; font-weight: bold !important; min-width: 18px !important; height: 18px !important; padding: 0 6px !important; border-radius: 9px !important; display: none; align-items: center !important; justify-content: center !important; }
            
            #pro-menu { position: fixed !important; bottom: 90px !important; right: 20px !important; width: 280px !important; max-height: 70vh !important; overflow-y: auto !important; background: rgba(30, 30, 40, 0.96) !important; border: 1px solid rgba(255,255,255,0.1) !important; border-radius: 12px !important; box-shadow: 0 10px 30px rgba(0,0,0,0.5) !important; padding: 12px !important; z-index: 9999999 !important; display: none; flex-direction: column; box-sizing: border-box !important; backdrop-filter: blur(10px) !important; }
            .pro-menu-view-container { width: 100% !important; display: flex !important; flex-direction: column !important; }
            
            .pro-menu-btn { width: 100% !important; background: rgba(255,255,255,0.05) !important; border: 1px solid rgba(255,255,255,0.1) !important; color: #ffffff !important; padding: 10px !important; margin: 4px 0 !important; border-radius: 8px !important; cursor: pointer !important; font-size: 13px !important; font-weight: 500 !important; text-align: left !important; transition: all 0.2s !important; box-sizing: border-box !important; }
            .pro-menu-btn:hover { background: rgba(255,255,255,0.12) !important; }
            .pro-menu-btn.accent { background: linear-gradient(135deg, #7abcff, #c39eff) !important; border: none !important; color: #ffffff !important; font-weight: bold !important; }
            
            .pro-settings-row { display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 10px 12px !important; background: rgba(255,255,255,0.03) !important; margin: 4px 0 !important; border-radius: 8px !important; border: 1px solid rgba(255,255,255,0.05) !important; }
            .pro-settings-label { color: #e0e0e0 !important; font-size: 13px !important; font-family: sans-serif !important; font-weight: 500 !important; }
            .pro-settings-checkbox { width: 18px !important; height: 18px !important; cursor: pointer !important; accent-color: #7abcff !important; margin: 0 !important; padding: 0 !important; }
            .pro-menu-section-title { font-size: 11px !important; color: #ffd700 !important; margin: 10px 6px 4px 6px !important; font-weight: bold !important; opacity: 0.8 !important; letter-spacing: 1px !important; text-transform: uppercase !important; border-bottom: 1px solid rgba(255,215,0,0.15) !important; padding-bottom: 2px !important; font-family: sans-serif !important; }
        `;
        d.head.appendChild(proStyles);
    }

    // =========================================================================
    // [SYSTEM BŁĘDÓW] INICJALIZACJA I NASŁUCHIWANIE
    // =========================================================================
    if (!window.__devKitErrors) {
        window.__devKitErrors = { count: 0, logs: [] };
    }

    function __updateDevKitBadge() {
        var count = window.__devKitErrors.count;
        var badge = d.getElementById('devkit-error-badge');
        if (badge) {
            badge.innerText = count;
            badge.style.setProperty('display', count > 0 ? 'flex' : 'none', 'important');
        }
        var menuBadge = d.getElementById('menu-console-error-badge');
        if (menuBadge) {
            menuBadge.innerText = count;
            menuBadge.style.setProperty('display', count > 0 ? 'inline-flex' : 'none', 'important');
        }
    }

    var originalOnError = window.onerror;
    window.onerror = function(message, source, lineno, colno, error) {
        window.__devKitErrors.count++;
        window.__devKitErrors.logs.push({
            type: 'JS_ERROR', message: message, file: source ? source.split('/').pop() : 'unknown', line: lineno + ':' + colno, time: new Date().toLocaleTimeString()
        });
        __updateDevKitBadge();
        if (typeof originalOnError === 'function') return originalOnError(message, source, lineno, colno, error);
        return false;
    };

    window.addEventListener('unhandledrejection', function(event) {
        window.__devKitErrors.count++;
        window.__devKitErrors.logs.push({
            type: 'PROMISE_REJECTION', message: event.reason?.message || event.reason || 'Unhandled Promise Rejection', file: 'async', line: 'N/A', time: new Date().toLocaleTimeString()
        });
        __updateDevKitBadge();
    });
    // =========================================================================

    // BEZPIECZEŃSTWO - WYCZYSZCZONE SŁOWA KLUCZOWE
    var sensitiveKeywords = ['bank', 'paypal', 'platnosci', 'payu', 'mojeid'];
    var currentUrl = window.location.href.toLowerCase();
    var isSensitive = sensitiveKeywords.some(function(keyword) {
        return currentUrl.indexOf(keyword) !== -1;
    });

    if (isSensitive) {
        var proceed = confirm("🚨 OSTRZEŻENIE BEZPIECZEŃSTWA (DevKit PRO)\n\nWykryto stronę płatności. Czy na pewno chcesz uruchomić skrypt?");
        if (!proceed) { console.warn("🔒 Uruchomienie zablokowane."); return; }
    }

    console.log("--- Menu.js Wersja 7.3 (Syntactical Error Fix) załadowana ---");

    // PRZYWRACANIE STANU KODU PO ODŚWIEŻENIU
    var isSaveOnRefreshActive = localStorage.getItem('pro_save_on_refresh') === 'true';
    var savedHTML = localStorage.getItem('pro_persisted_html');
    if (isSaveOnRefreshActive && savedHTML) {
        d.body.innerHTML = savedHTML;
    }

    // Ukrycie domyślnego przycisku vConsole
    var vcStyle = d.createElement('style');
    vcStyle.innerHTML = '#__vconsole .vc-switch { display: none !important; opacity: 0 !important; pointer-events: none !important; }';
    d.head.appendChild(vcStyle);

    function applyGannewTheme() {
        var vcDom = d.getElementById('__vconsole');
        if (!vcDom) return;
        var targetRoot = vcDom.shadowRoot || vcDom;
        if (targetRoot.querySelector('#gannew-devkit-theme')) return; 
        var style = d.createElement('style');
        style.id = 'gannew-devkit-theme';
        style.textContent = `
            .vc-main, .vc-content, .vc-panel, .vc-logbox { background-color: rgba(10, 13, 20, 0.82) !important; }
            .vc-main { border-radius: 20px 20px 0 0 !important; border-top: 3px solid #ffd700 !important; font-family: sans-serif !important; backdrop-filter: blur(14px) !important; }
            .vc-tabbar { background-color: rgba(17, 22, 34, 0.7) !important; border-bottom: 2px solid rgba(255, 215, 0, 0.3) !important; height: 44px !important; }
            .vc-tabbar .vc-tab:not(.vc-actived):not(.vc-active) { display: none !important; }
            .vc-tabbar .vc-tab.vc-actived, .vc-tabbar .vc-tab.vc-active { width: 100% !important; color: #ffd700 !important; text-transform: uppercase !important; display: flex !important; align-items: center; justify-content: center; }
            .vc-logbox .vc-item { border-bottom: 1px solid rgba(255,255,255,0.02) !important; padding: 10px 14px !important; }
        `;
        targetRoot.appendChild(style);
    }

    window.addEventListener('beforeunload', function() {
        if (localStorage.getItem('pro_save_on_refresh') === 'true') {
            var clone = d.body.cloneNode(true);
            var menuEl = clone.querySelector('#pro-menu'); if (menuEl) menuEl.remove();
            var fabEl = clone.querySelector('#pro-fab'); if (fabEl) fabEl.remove();
            var vcEl = clone.querySelector('#__vconsole'); if (vcEl) vcEl.remove();
            localStorage.setItem('pro_persisted_html', clone.innerHTML);
        }
    });

    function loadAndShowVConsole(tabName) {
        var triggerVConsole = function() {
            try {
                if (!window.vConsoleInstance) window.vConsoleInstance = new window.VConsole({ theme: 'dark' });
                window.vConsoleInstance.show();
                if (tabName) {
                    if (typeof window.vConsoleInstance.showPlugin === 'function') window.vConsoleInstance.showPlugin(tabName);
                    else if (typeof window.vConsoleInstance.showTab === 'function') window.vConsoleInstance.showTab(tabName);
                }
                applyGannewTheme();
            } catch(e){}
        };
        if (window.VConsole) triggerVConsole(); 
        else {
            var s = d.createElement('script'); s.src = 'https://unpkg.com/vconsole@latest/dist/vconsole.min.js'; s.onload = triggerVConsole; d.head.appendChild(s);
        }
    }

    // TWORZENIE STRUKTURY MENU I FAB (JEŚLI NIE ISTNIEJĄ)
    var menu = d.getElementById('pro-menu');
    var fab = d.getElementById('pro-fab');

    if (!menu) {
        fab = d.createElement('div');
        fab.id = 'pro-fab'; fab.innerText = 'PRO';
        var badge = d.createElement('div'); badge.id = 'devkit-error-badge'; badge.innerText = '0';
        fab.appendChild(badge); d.body.appendChild(fab);

        menu = d.createElement('div');
        menu.id = 'pro-menu';
        
        menu.innerHTML = `
            <div id="pro-view-main" class="pro-menu-view-container">
                <div class="pro-menu-section-title">🛠️ Core Dev Tools</div>
                <button class="pro-menu-btn accent" id="btn-edytor">⚡ Edytuj Element</button>
                <button class="pro-menu-btn" id="btn-console" style="display: flex !important; justify-content: space-between !important; align-items: center !important; text-align: left;">
                    <span>💻 Konsola</span>
                    <span id="menu-console-error-badge">0</span>
                </button>
                <button class="pro-menu-btn" id="btn-elements">🔍 Struktura (DOM)</button>
                <button class="pro-menu-btn" id="btn-network">🌐 Sieć (Network)</button>
                <button class="pro-menu-btn" id="btn-save-refresh">💾 Save on refresh</button>
                
                <div id="pro-dynamic-shortcuts" class="pro-menu-view-container"></div>
                
                <button class="pro-menu-btn" id="btn-go-settings" style="background: rgba(255,255,255,0.07) !important; color: #ffd700 !important; font-weight: bold !important; margin-top: 10px;">⚙️ Ustawienia DevKit</button>
                <button class="pro-menu-btn" id="btn-close-tools" style="color: #ef5350; margin-top: 5px;">❌ Zamknij Narzędzia</button>
            </div>

            <div id="pro-view-settings" class="pro-menu-view-container" style="display: none;">
                <div class="pro-menu-section-title" style="color: #7abcff !important; border-color: rgba(122,188,255,0.2) !important;">⚙️ Panel Konfiguracji PRO</div>
                <div id="pro-settings-list" style="margin-bottom: 10px;"></div>
                <button class="pro-menu-btn accent" id="btn-back-to-main" style="background: linear-gradient(135deg, #7abcff, #c39eff) !important; color: white !important;">🔙 Wróć do Menu</button>
            </div>
        `;
        d.body.appendChild(menu);

        fab.onclick = function() {
            var isVisible = menu.style.display === 'flex';
            if (isVisible) {
                menu.style.display = 'none';
            } else {
                menu.style.display = 'flex';
                switchView('main');
                __updateDevKitBadge();
            }
        };
    }

    // CENTRALNA FUNKCJA DO KONTROLI WIDOKÓW
    function switchView(viewName) {
        var viewMain = d.getElementById('pro-view-main');
        var viewSettings = d.getElementById('pro-view-settings');
        
        if (viewName === 'main') {
            if (viewMain) viewMain.style.setProperty('display', 'flex', 'important');
            if (viewSettings) viewSettings.style.setProperty('display', 'none', 'important');
        } else if (viewName === 'settings') {
            if (viewMain) viewMain.style.setProperty('display', 'none', 'important');
            if (viewSettings) viewSettings.style.setProperty('display', 'flex', 'important');
        }
    }

    // GENEROWANIE WIDŻETÓW W USTAWIENIACH I CHECKBOXÓW
    var settingsListContainer = d.getElementById('pro-settings-list');
    var shortcutsContainer = d.getElementById('pro-dynamic-shortcuts');

    function renderDynamicMenu() {
        if (!shortcutsContainer) return;
        shortcutsContainer.innerHTML = ''; 
        var hasDynamicItems = false;

        proFeatures.forEach(function(feat) {
            var isActive = localStorage.getItem(feat.key) === 'true';
            
            if (isActive) {
                if (!hasDynamicItems) {
                    var title = d.createElement('div');
                    title.className = 'pro-menu-section-title';
                    title.style.color = '#7abcff';
                    title.style.borderColor = 'rgba(122,188,255,0.15)';
                    title.innerText = '🚀 Przypięte Funkcje PRO';
                    shortcutsContainer.appendChild(title);
                    hasDynamicItems = true;
                }

                var btn = d.createElement('button');
                btn.className = 'pro-menu-btn';
                btn.id = 'btn-run-' + feat.id;
                btn.style.setProperty('color', feat.color, 'important');
                btn.innerText = feat.name;
                
                btn.onclick = function() {
                    menu.style.display = 'none';
                    if (feat.id === 'adkiller') runAdKillerLogic();
                    if (feat.id === 'unblur') runUnBlurLogic();
                    if (['fps', 'video', 'qr', 'linkspy', 'antipopup', 'darkmode'].indexOf(feat.id) !== -1) {
                        alert("Wybrano: " + feat.name + "\n\nKonfiguracja mechaniki tego modułu nastąpi w kolejnych krokach projektowych.");
                    }
                };
                shortcutsContainer.appendChild(btn);
            }
        });
    }

    // Budowanie listy opcji w widoku ustawień
    if (settingsListContainer && settingsListContainer.children.length === 0) {
        proFeatures.forEach(function(feat) {
            var row = d.createElement('div');
            row.className = 'pro-settings-row';
            
            var label = d.createElement('span');
            label.className = 'pro-settings-label';
            label.innerText = feat.name;
            
            var checkbox = d.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.className = 'pro-settings-checkbox';
            checkbox.checked = localStorage.getItem(feat.key) === 'true';
            
            checkbox.onchange = function() {
                localStorage.setItem(feat.key, checkbox.checked ? 'true' : 'false');
                renderDynamicMenu(); 
            };

            row.appendChild(label);
            row.appendChild(checkbox);
            settingsListContainer.appendChild(row);
        });
    }

    // PODPIĘCIE ELEMENTÓW NAWIGACYJNYCH POD CENTRALNY SWITCHER
    var btnGoSettings = d.getElementById('btn-go-settings');
    if (btnGoSettings) {
        btnGoSettings.onclick = function() {
            switchView('settings');
        };
    }

    var btnBackToMain = d.getElementById('btn-back-to-main');
    if (btnBackToMain) {
        btnBackToMain.onclick = function() {
            switchView('main');
        };
    }

    // =========================================================================
    // LOGIKI PROCEDURALNE (AD-KILLER I UNBLUR)
    // =========================================================================
    function runAdKillerLogic() {
        var selectors = ['div[class*="cookie"]', 'div[id*="cookie"]', 'div[class*="consent"]', 'div[id*="consent"]', 'div[class*="modal"]', 'div[id*="modal"]', 'div[class*="popup"]', 'div[id*="popup"]', 'iframe[src*="googleads"]', 'div[class*="banner"]', '.cmp-root', '#cmp-wrapper'];
        var removed = 0;
        selectors.forEach(function(sel) {
            try {
                d.querySelectorAll(sel).forEach(function(node) {
                    if (node !== menu && node !== d.getElementById('pro-fab') && !node.contains(menu)) { node.remove(); removed++; }
                });
            } catch(e){}
        });
        d.body.style.setProperty('overflow', 'auto', 'important');
        d.documentElement.style.setProperty('overflow', 'auto', 'important');
        alert("💥 Ad-Killer: Oczyszczono stronę z " + removed + " elementów blokujących.");
    }

    function runUnBlurLogic() {
        var unblurred = 0;
        d.querySelectorAll('*').forEach(function(el) {
            if (el === menu || el === d.getElementById('pro-fab')) return;
            var s = window.getComputedStyle(el);
            if (s.filter.indexOf('blur') !== -1 || s.webkitFilter.indexOf('blur') !== -1) {
                el.style.setProperty('filter', 'none', 'important');
                el.style.setProperty('-webkit-filter', 'none', 'important');
                unblurred++;
            }
            if (s.userSelect === 'none' || s.pointerEvents === 'none') {
                el.style.setProperty('user-select', 'text', 'important');
                el.style.setProperty('pointer-events', 'auto', 'important');
            }
        });
        alert("🔓 Un-Blur PRO: Odblokowano tekst w " + unblurred + " miejscach.");
    }

    // OBSŁUGA RATUNKU "SAVE ON REFRESH"
    var btnSaveRefresh = d.getElementById('btn-save-refresh');
    if (btnSaveRefresh) {
        if (isSa
