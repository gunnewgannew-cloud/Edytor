(function() {
    var d = document;

    // =========================================================================
    // 🔐 GŁÓWNY ZAMEK: THE GATEWAY TO PRO
    // =========================================================================
    window.devkit = {
        enablePro: function() {
            console.log("%c[ SYSTEM ] Verifying privileges...", "color: #ffaa66; font-weight: bold;");
            setTimeout(function() {
                console.log("%c[ OK ] Access Level: ROOT", "color: #66ffaa; font-weight: bold;");
                console.log("%c[ SYSTEM ] Unlocking utility payloads...", "color: #aaccff; font-weight: bold;");
                
                var shortcuts = d.getElementById('pro-dynamic-shortcuts');
                var settingsBtn = d.getElementById('btn-go-settings');
                
                if (shortcuts) shortcuts.style.display = 'flex';
                if (settingsBtn) settingsBtn.style.display = 'block';
                
                sessionStorage.setItem('devkit_pro_unlocked', 'true');
                alert("🔓 ACCESS GRANTED: System eksperymentalny został odblokowany.");
            }, 800);
            return "Waking up the beast...";
        }
    };

    // DEFINITION OF THE POWERFUL TEN (Enterprise English Edition)
    var proFeatures = [
        { id: 'adkiller', name: '💥 Ad-Killer (Survival Mode)', key: 'pro_mod_adkiller', color: '#ffaa66' },
        { id: 'fps', name: '📊 FPS & Performance HUD', key: 'pro_mod_fps', color: '#66ffaa' },
        { id: 'video', name: '🎬 Video Accelerator', key: 'pro_mod_video', color: '#ffee66' },
        { id: 'qr', name: '🔮 QR Code Transfer', key: 'pro_mod_qr', color: '#ff66cc' },
        { id: 'unblur', name: '🔓 Un-Blur PRO', key: 'pro_mod_unblur', color: '#aaccff' },
        { id: 'linkspy', name: '🕵️ Link Spy / Detective', key: 'pro_mod_linkspy', color: '#cc99ff' },
        { id: 'antipopup', name: '🚫 Anti-PopUp EXTREME', key: 'pro_mod_antipopup', color: '#ff6666' },
        { id: 'darkmode', name: '🌙 Force Dark Mode PRO', key: 'pro_mod_darkmode', color: '#bbbbbb' },
        { id: 'antirick', name: '🛡️ Anti Rick-Roll Shield', key: 'pro_mod_antirick', color: '#ff3333' },
        { id: 'archive', name: '⏳ Archive Enforcer (Time Machine)', key: 'pro_mod_archive', color: '#ffd700' }
    ];

    // =========================================================================
    // [ERROR SYSTEM] INITIALIZATION & MONITORING
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

    // SECURITY GUARD
    var sensitiveKeywords = ['bank', 'login', 'checkout', 'paypal', 'signin', 'sign-in', 'haslo', 'password', 'platnosci', 'payu', 'mojeid', 'secure'];
    var currentUrl = window.location.href.toLowerCase();
    var isSensitive = sensitiveKeywords.some(function(keyword) {
        return currentUrl.indexOf(keyword) !== -1;
    });

    if (isSensitive) {
        var proceed = confirm("🚨 SECURITY WARNING (DevKit PRO)\n\nSensitive context keywords detected on this page. Are you sure you want to run the script?");
        if (!proceed) { console.warn("🔒 Script execution aborted by user."); return; }
    }

    console.log("--- Menu.js Version 9.1 (Core Isolated Edition) Loaded ---");

    // PERSISTENCE STATE RESTORE
    var isSaveOnRefreshActive = localStorage.getItem('pro_save_on_refresh') === 'true';
    var savedHTML = localStorage.getItem('pro_persisted_html');
    if (isSaveOnRefreshActive && savedHTML) {
        d.body.innerHTML = savedHTML;
    }

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
            var fpsHud = clone.querySelector('#pro-fps-hud'); if (fpsHud) fpsHud.remove();
            var qrModal = clone.querySelector('#pro-qr-modal'); if (qrModal) qrModal.remove();
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

    // MENU DOM STRUCTURE & STYLES
    var menu = d.getElementById('pro-menu');
    if (!menu) {
        var proStyles = d.createElement('style');
        proStyles.innerHTML = `
            #pro-fab { position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px; border-radius: 50%; background: linear-gradient(135deg, #7abcff, #c39eff) !important; border: none !important; color: #ffffff !important; font-size: 19px !important; font-weight: 900 !important; display: flex; align-items: center; justify-content: center; z-index: 999999; cursor: pointer; box-shadow: 0 4px 15px rgba(0,0,0,0.3); user-select: none; }
            #devkit-error-badge { position: absolute; top: -2px; right: -2px; background: #ff3b30 !important; color: #ffffff !important; font-size: 11px; font-weight: bold; min-width: 18px; height: 18px; padding: 2px; border-radius: 50%; display: none; align-items: center; justify-content: center; z-index: 1000000; }
            #menu-console-error-badge { background: #ff3b30 !important; color: #ffffff !important; font-size: 11px !important; font-weight: bold !important; min-width: 18px !important; height: 18px !important; padding: 0 6px !important; border-radius: 9px !important; display: none; align-items: center; justify-content: center; }
            
            #pro-menu { max-height: 80vh !important; overflow-y: auto !important; display: none; flex-direction: column; }
            .pro-menu-view-container { width: 100%; display: flex; flex-direction: column; }
            
            .pro-settings-row { display: flex !important; align-items: center !important; justify-content: space-between !important; padding: 12px 14px !important; background: rgba(255,255,255,0.03) !important; margin: 6px 0 !important; border-radius: 10px !important; border: 1px solid rgba(255,255,255,0.05) !important; }
            .pro-settings-label { color: #e0e0e0 !important; font-size: 13px !important; font-family: sans-serif !important; font-weight: 500 !important; margin-right: 15px !important; line-height: 1.2 !important; }
            
            .pro-toggle-switch { position: relative; display: inline-block; width: 44px !important; height: 24px !important; flex-shrink: 0 !important; }
            .pro-toggle-switch input { opacity: 0; width: 0; height: 0; }
            .pro-slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: rgba(255,255,255,0.1); transition: .3s; border-radius: 24px; border: 1px solid rgba(255,255,255,0.2); }
            .pro-slider:before { position: absolute; content: ""; height: 18px !important; width: 18px !important; left: 2px; bottom: 2px; background-color: #888; transition: .3s; border-radius: 50%; }
            .pro-toggle-switch input:checked + .pro-slider { background-color: rgba(122,188,255,0.2); border-color: #7abcff; }
            .pro-toggle-switch input:checked + .pro-slider:before { transform: translateX(20px) !important; background-color: #7abcff; box-shadow: 0 0 8px rgba(122,188,255,0.6); }

            .pro-menu-section-title { font-size: 11px !important; color: #ffd700 !important; margin: 10px 6px 4px 6px !important; font-weight: bold !important; opacity: 0.8 !important; letter-spacing: 1px !important; text-transform: uppercase !important; border-bottom: 1px solid rgba(255,215,0,0.15) !important; padding-bottom: 2px !important; font-family: sans-serif !important; }
            
            #pro-fps-hud { position: fixed; top: 10px; left: 10px; background: rgba(0,0,0,0.7); color: #66ffaa; padding: 4px 10px; border-radius: 8px; font-family: monospace; font-size: 12px; font-weight: bold; z-index: 999998; border: 1px solid rgba(102,255,170,0.3); backdrop-filter: blur(5px); pointer-events: none; user-select: none; box-shadow: 0 2px 10px rgba(0,0,0,0.5); }
        `;
        d.head.appendChild(proStyles);

        var fab = d.createElement('div');
        fab.id = 'pro-fab'; fab.innerText = 'PRO';
        var badge = d.createElement('div'); badge.id = 'devkit-error-badge'; badge.innerText = '0';
        fab.appendChild(badge); d.body.appendChild(fab);

        menu = d.createElement('div');
        menu.id = 'pro-menu';
        
        menu.innerHTML = `
            <div id="pro-view-main" class="pro-menu-view-container">
                <div class="pro-menu-section-title">🛠️ Core Dev Tools</div>
                <button class="pro-menu-btn accent" id="btn-edytor">⚡ Edit Element</button>
                <button class="pro-menu-btn" id="btn-console" style="display: flex !important; justify-content: space-between !important; align-items: center !important; text-align: left;">
                    <span>💻 Console</span>
                    <span id="menu-console-error-badge">0</span>
                </button>
                <button class="pro-menu-btn" id="btn-elements">🔍 DOM Structure</button>
                <button class="pro-menu-btn" id="btn-network">🌐 Network</button>
                <button class="pro-menu-btn" id="btn-save-refresh">💾 Save on refresh</button>
                
                <div id="pro-dynamic-shortcuts" class="pro-menu-view-container" style="display: none;"></div>
                
                <button class="pro-menu-btn" id="btn-go-settings" style="display: none; background: rgba(255,255,255,0.07) !important; color: #ffd700 !important; font-weight: bold !important; margin-top: 10px;">⚙️ DevKit Settings</button>
                <button class="pro-menu-btn" id="btn-close-tools" style="color: #ef5350; margin-top: 5px;">❌ Close Tools</button>
            </div>

            <div id="pro-view-settings" class="pro-menu-view-container" style="display: none;">
                <div class="pro-menu-section-title" style="color: #7abcff !important; border-color: rgba(122,188,255,0.2) !important;">⚙️ PRO Config Panel</div>
                <div id="pro-settings-list" style="margin-bottom: 10px;"></div>
                <button class="pro-menu-btn accent" id="btn-back-to-main" style="background: linear-gradient(135deg, #7abcff, #c39eff) !important; color: white !important;">🔙 Back to Menu</button>
            </div>
        `;
        d.body.appendChild(menu);

        fab.onclick = function() {
            var isVisible = menu.style.display === 'flex';
            menu.style.display = isVisible ? 'none' : 'flex';
            if (!isVisible) {
                d.getElementById('pro-view-main').style.display = 'flex';
                d.getElementById('pro-view-settings').style.display = 'none';
                __updateDevKitBadge();
            }
        };

        // --- INICJALIZACJA STANU UKRYCIA ---
        if (sessionStorage.getItem('devkit_pro_unlocked') === 'true') {
            d.getElementById('pro-dynamic-shortcuts').style.display = 'flex';
            d.getElementById('btn-go-settings').style.display = 'block';
        }
    }

    var settingsListContainer = d.getElementById('pro-settings-list');
    var shortcutsContainer = d.getElementById('pro-dynamic-shortcuts');

    function renderDynamicMenu() {
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
                    title.innerText = '🚀 Pinned PRO Features';
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
                    if (feat.id === 'adkiller') runAdKillerLogic(true);
                    if (feat.id === 'unblur') runUnBlurLogic();
                    if (feat.id === 'video') runVideoAcceleratorLogic();
                    if (feat.id === 'qr') runQrTransferLogic();
                    if (feat.id === 'linkspy') runLinkSpyLogic();
                    if (feat.id === 'antipopup') runAntiPopUpLogic();
                    if (feat.id === 'darkmode') runDarkModeLogic(true);
                    if (feat.id === 'antirick') runAntiRickRollLogic(true);
                    if (feat.id === 'archive') runArchiveLogic();
                    if (feat.id === 'fps') {
                        runFpsHudLogic(false); 
                        setTimeout(function(){ runFpsHudLogic(true); }, 50); 
                    }
                };
                shortcutsContainer.appendChild(btn);
            }
        });
    }

    proFeatures.forEach(function(feat) {
        var row = d.createElement('div');
        row.className = 'pro-settings-row';
        
        var label = d.createElement('span');
        label.className = 'pro-settings-label';
        label.innerText = feat.name;
        
        var switchLabel = d.createElement('label');
        switchLabel.className = 'pro-toggle-switch';
        
        var checkbox = d.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = localStorage.getItem(feat.key) === 'true';
        
        var slider = d.createElement('span');
        slider.className = 'pro-slider';
        
        checkbox.onchange = function() {
            localStorage.setItem(feat.key, checkbox.checked ? 'true' : 'false');
            renderDynamicMenu(); 
            
            if (feat.id === 'adkiller' && checkbox.checked) runAdKillerLogic(false);
            if (feat.id === 'fps') runFpsHudLogic(checkbox.checked);
            if (feat.id === 'antirick' && checkbox.checked) runAntiRickRollLogic(false);
            if (feat.id === 'darkmode') {
                var styleExists = d.getElementById('pro-darkmode-css');
                if ((checkbox.checked && !styleExists) || (!checkbox.checked && styleExists)) {
                    runDarkModeLogic(false);
                }
            }
        };

        switchLabel.appendChild(checkbox);
        switchLabel.appendChild(slider);
        
        row.appendChild(label);
        row.appendChild(switchLabel);
        settingsListContainer.appendChild(row);
    });

    d.getElementById('btn-go-settings').onclick = function() {
        d.getElementById('pro-view-main').style.display = 'none';
        d.getElementById('pro-view-settings').style.display = 'flex';
    };

    d.getElementById('btn-back-to-main').onclick = function() {
        d.getElementById('pro-view-settings').style.display = 'none';
        d.getElementById('pro-view-main').style.display = 'flex';
    };

    // =========================================================================
    // FEATURE LOGICS
    // =========================================================================
    
    // --- 1. AD-KILLER ---
    var adSelectors = [
        'div[class*="cookie"]', 'div[id*="cookie"]', 'div[class*="consent"]', 'div[id*="consent"]',
        'div[class*="modal"]', 'div[id*="modal"]', 'div[class*="popup"]', 'div[id*="popup"]',
        'iframe[src*="googleads"]', 'div[class*="banner"]', '.cmp-root', '#cmp-wrapper',
        'div[id*="google_ads"]', 'div[class*="adsbygoogle"]', 'amp-embed[type="ads"]',
        'div[class*="-ad-"]', 'div[class$="-ad"]', 'div[class^="ad-"]'
    ];

    function runAdKillerLogic(isManual) {
        if (!d.getElementById('pro-adkiller-static-shield')) {
            var shield = d.createElement('style');
            shield.id = 'pro-adkiller-static-shield';
            shield.textContent = adSelectors.join(', ') + ' { display: none !important; visibility: hidden !important; opacity: 0 !important; pointer-events: none !important; }';
            d.head.appendChild(shield);
        }

        var removed = 0;
        adSelectors.forEach(function(sel) {
            try {
                d.querySelectorAll(sel).forEach(function(node) {
                    if (node !== menu && node !== d.getElementById('pro-fab') && !node.contains(menu)) { node.remove(); removed++; }
                });
            } catch(e){}
        });

        d.body.style.setProperty('overflow', 'auto', 'important');
        d.documentElement.style.setProperty('overflow', 'auto', 'important');
        if (d.body.classList.contains('modal-open')) d.body.classList.remove('modal-open');

        if (!window.__adKillerObserver) {
            window.__adKillerObserver = new MutationObserver(function() {
                adSelectors.forEach(function(sel) {
                    try { d.querySelectorAll(sel).forEach(function(node) {
                        if (node !== menu && node !== d.getElementById('pro-fab') && !node.contains(menu)) node.remove(); 
                    });} catch(e){}
                });
                if (d.body.style.overflow === 'hidden') d.body.style.setProperty('overflow', 'auto', 'important');
            });
            window.__adKillerObserver.observe(d.documentElement, { childList: true, subtree: true });
        }

        if (isManual) alert("💥 Ad-Killer (Survival):\nCSS Shield deployed. Physically removed " + removed + " garbage elements. Real-time background guard is active!");
    }

    // --- 2. FPS & PERFORMANCE HUD ---
    var fpsFrameCount = 0;
    var fpsLastTime = performance.now();
    var fpsReqId = null;

    function runFpsHudLogic(turnOn) {
        var existingHud = d.getElementById('pro-fps-hud');
        if (!turnOn) {
            if (existingHud) existingHud.remove();
            if (fpsReqId) cancelAnimationFrame(fpsReqId);
            return;
        }
        if (existingHud) return; 

        var hud = d.createElement('div');
        hud.id = 'pro-fps-hud';
        hud.innerText = 'FPS: -- | RAM: -- MB';
        d.body.appendChild(hud);

        fpsFrameCount = 0;
        fpsLastTime = performance.now();

        function updateFPS() {
            var now = performance.now();
            fpsFrameCount++;
            if (now - fpsLastTime >= 1000) {
                var fps = Math.round((fpsFrameCount * 1000) / (now - fpsLastTime));
                var memStr = '';
                if (performance.memory) {
                    var memUsage = Math.round(performance.memory.usedJSHeapSize / 1048576);
                    memStr = ' | RAM: ' + memUsage + 'MB';
                }
                hud.innerText = 'FPS: ' + fps + memStr;
                
                if (fps >= 50) { hud.style.color = '#66ffaa'; hud.style.borderColor = 'rgba(102,255,170,0.3)'; }
                else if (fps >= 30) { hud.style.color = '#ffee66'; hud.style.borderColor = 'rgba(255,238,102,0.3)'; }
                else { hud.style.color = '#ff6666'; hud.style.borderColor = 'rgba(255,102,102,0.3)'; }

                fpsFrameCount = 0;
                fpsLastTime = now;
            }
            fpsReqId = requestAnimationFrame(updateFPS);
        }
        fpsReqId = requestAnimationFrame(updateFPS);
    }

    // --- 3. VIDEO ACCELERATOR ---
    function runVideoAcceleratorLogic() {
        var videos = d.querySelectorAll('video');
        if (videos.length === 0) {
            alert("🎬 Video Accelerator:\nNo HTML5 <video> tags detected on this page.");
            return;
        }
        
        var speedPrompt = prompt("🎬 Found " + videos.length + " video elements.\n\nEnter playback speed multiplier:\n(e.g., 2 for 200%, 16 to instantly blast through ads)", "2");
        if (!speedPrompt) return; 
        
        var speed = parseFloat(speedPrompt.replace(',', '.'));
        if (isNaN(speed) || speed <= 0) {
            alert("❌ Error: Invalid speed value provided (try 1.5, 2, 4).");
            return;
        }
        
        var applied = 0;
        videos.forEach(function(v) {
            try { v.playbackRate = speed; v.controls = true; applied++; } catch(e) {}
        });
        
        alert("🚀 Mission accomplished!\nAccelerated " + applied + " videos to " + speed + "x and forced native playback controls.");
    }

    // --- 4. QR CODE TRANSFER ---
    function runQrTransferLogic() {
        if (d.getElementById('pro-qr-modal')) return;
        var currentUrl = encodeURIComponent(window.location.href);
        var qrApiUrl = 'https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=' + currentUrl;
        var overlay = d.createElement('div');
        overlay.id = 'pro-qr-modal';
        overlay.style.cssText = 'position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: rgba(0, 0, 0, 0.85); backdrop-filter: blur(8px); z-index: 9999999; display: flex; flex-direction: column; align-items: center; justify-content: center; font-family: sans-serif;';
        var img = d.createElement('img'); img.src = qrApiUrl; img.style.cssText = 'width: 250px; height: 250px; border-radius: 12px; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.6); border: 3px solid #ff66cc; background: white; padding: 10px;';
        var closeBtn = d.createElement('button'); closeBtn.innerText = '❌ Close'; closeBtn.style.cssText = 'margin-top: 35px; padding: 12px 28px; background: rgba(255, 102, 102, 0.15); color: #ff6666; border: 1px solid #ff6666; border-radius: 25px; cursor: pointer; font-weight: bold; font-size: 15px; transition: 0.2s;';
        var closeFunc = function() { overlay.remove(); };
        closeBtn.onclick = closeFunc; overlay.onclick = function(e) { if (e.target === overlay) closeFunc(); };
        overlay.appendChild(img); overlay.appendChild(closeBtn); d.body.appendChild(overlay);
    }

    // --- 5. UN-BLUR ---
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
        alert("🔓 Un-Blur PRO: Successfully bypassed CSS blurring filters in " + unblurred + " elements.");
    }

    // --- 6. LINK SPY ---
    function runLinkSpyLogic() {
        var links = d.querySelectorAll('a');
        var highlighted = 0;
        var host = window.location.hostname;

        if (!d.getElementById('pro-linkspy-css')) {
            var st = d.createElement('style'); st.id = 'pro-linkspy-css';
            st.textContent = `.pro-spy-badge { display: none !important; } a:hover > .pro-spy-badge, a:active > .pro-spy-badge { display: inline-block !important; }`;
            d.head.appendChild(st);
        }

        links.forEach(function(link) {
            if (link.hasAttribute('data-spy-active') || link === menu || menu.contains(link)) return;
            var href = link.href || 'No URL';
            var isExternal = href.indexOf(host) === -1 && href.startsWith('http');
            link.setAttribute('data-spy-active', 'true');
            link.style.setProperty('outline', isExternal ? '2px dashed #cc99ff' : '2px dashed #7abcff', 'important');
            link.style.setProperty('background', isExternal ? 'rgba(204, 153, 255, 0.1)' : 'rgba(122, 188, 255, 0.1)', 'important');
            var badge = d.createElement('span'); badge.className = 'pro-spy-badge'; badge.innerText = isExternal ? ' 🔗 EXT: ' + href : ' 🏠 INT: ' + href;
            badge.style.cssText = 'font-size: 10px !important; color: ' + (isExternal ? '#cc99ff' : '#7abcff') + ' !important; background: rgba(10,13,20,0.9) !important; padding: 2px 4px !important; border-radius: 4px !important; border: 1px solid ' + (isExternal ? 'rgba(204,153,255,0.4)' : 'rgba(122,188,255,0.4)') + ' !important; font-family: monospace !important; margin-left: 6px !important; word-break: break-all !important; pointer-events: none !important; user-select: text !important; z-index: 9999 !important;';
            link.appendChild(badge); highlighted++;
        });
        alert("🕵️ Link Spy:\nX-Ray complete! Intercepted " + highlighted + " links. Detailed hover tooltips injected.");
    }

    // --- 7. ANTI-POPUP EXTREME ---
    function runAntiPopUpLogic() {
        if (window.__antiPopUpActive) { alert("🚫 Anti-PopUp EXTREME engine is already active in the background!"); return; }
        window.__antiPopUpActive = true; window.__blockedCount = 0;
        var originalOpen = window.open;
        window.open = function() {
            window.__blockedCount++;
            console.warn("🚫 [Anti-PopUp EXTREME] Blocked script window opening attempt #" + window.__blockedCount);
            return null; 
        };
        function pacifyLinks() {
            var maliciousLinks = d.querySelectorAll('a[target="_blank"]');
            maliciousLinks.forEach(function(a) { a.removeAttribute('target'); a.style.setProperty('border-bottom', '2px dotted #ff6666', 'important'); });
        }
        pacifyLinks();
        var popupObserver = new MutationObserver(function() { pacifyLinks(); });
        popupObserver.observe(d.documentElement, { childList: true, subtree: true });
        alert("🚫 Anti-PopUp EXTREME: ACTIVE!\n\n1. Programmatic window.open triggers neutralized.\n2. New-tab forcing links downgraded to same-tab navigation (marked with red dotted indicator).");
    }

    // --- 8. FORCE DARK MODE ---
    function runDarkModeLogic(isManual) {
        var existingStyle = d.getElementById('pro-darkmode-css');
        if (existingStyle) {
            existingStyle.remove();
            if (window.__darkModeObserver) { window.__darkModeObserver.disconnect(); window.__darkModeObserver = null; }
            d.querySelectorAll('[data-dark-original-bg]').forEach(function(el) { el.style.backgroundColor = el.getAttribute('data-dark-original-bg'); el.removeAttribute('data-dark-original-bg'); });
            d.querySelectorAll('[data-dark-original-color]').forEach(function(el) { el.style.color = el.getAttribute('data-dark-original-color'); el.removeAttribute('data-dark-original-color'); });
            if (isManual) alert("🌙 Force Dark Mode PRO: Disabled. Restored native stylesheets.");
            return;
        }
        var style = d.createElement('style'); style.id = 'pro-darkmode-css';
        style.textContent = `
            html { color-scheme: dark !important; }
            html, body { background-color: #121212 !important; color: #e0e0e0 !important; }
            input, textarea, select { background-color: #2a2a2a !important; color: #fff !important; border: 1px solid #555 !important; }
            #pro-menu, #pro-fab, #pro-fps-hud, #pro-qr-modal, #__vconsole { color-scheme: dark !important; }
        `;
        d.head.appendChild(style);

        function processNodes(target) {
            var nodes = target.querySelectorAll ? target.querySelectorAll('*') : [];
            nodes.forEach(function(el) {
                if (el === menu || menu.contains(el) || el.id === 'pro-fab' || el.id === 'pro-fps-hud' || el.id === 'pro-qr-modal' || el.closest('#__vconsole')) return;
                if (el.hasAttribute('data-dark-original-bg')) return; 
                var bg = window.getComputedStyle(el).backgroundColor;
                if (bg && bg !== 'transparent' && bg !== 'rgba(0, 0, 0, 0)') {
                    var matches = bg.match(/\d+/g);
                    if (matches && matches.length >= 3) {
                        var r = parseInt(matches[0]), g = parseInt(matches[1]), b = parseInt(matches[2]);
                        if ((r + g + b) / 3 > 190) {
                            el.setAttribute('data-dark-original-bg', el.style.backgroundColor || '');
                            el.style.setProperty('background-color', '#1e1e1e', 'important');
                            el.setAttribute('data-dark-original-color', el.style.color || '');
                            el.style.setProperty('color', '#f0f0f0', 'important');
                        }
                    }
                }
            });
        }
        processNodes(d.documentElement);
        window.__darkModeObserver = new MutationObserver(function(mutations) {
            mutations.forEach(function(mut) { mut.addedNodes.forEach(function(node) { if (node.nodeType === 1) processNodes(node); }); });
        });
        window.__darkModeObserver.observe(d.documentElement, { childList: true, subtree: true });
        if (isManual) alert("🌙 Force Dark Mode PRO: Active.\n\nSmart DOM analysis engine executed. High-contrast blinding components inverted to comfortable dark-graphite color palette.");
    }

    // --- 9. ANTI RICK-ROLL SHIELD ---
    function runAntiRickRollLogic(isManual) {
        if (window.__antiRickRollActive) { if (isManual) alert("🛡️ Anti-Rick-Roll Passive Shield is fully operational!"); return; }
        window.__antiRickRollActive = true;
        var rickRollIds = ['dQw4w9WgXcQ', 'iik25wqIuFo', 'oHg5SJYRHA0', 'rickastley']; 
        var currentUrl = window.location.href;
        var isRickRoll = rickRollIds.some(function(id) { return currentUrl.indexOf(id) !== -1; });
        if (isRickRoll) {
            d.querySelectorAll('video, audio').forEach(function(media) { media.pause(); });
            alert("🚨 CRITICAL THREAT MITIGATION (DevKit PRO) 🚨\n\nRick-Roll payload vector detected!\nTerminated media playback execution thread immediately. Your dignity has been secured. Evacuate this URL!");
        }
        d.addEventListener('click', function(e) {
            var target = e.target.closest('a'); if (!target || !target.href) return;
            var isTrap = rickRollIds.some(function(id) { return target.href.indexOf(id) !== -1; });
            if (isTrap) {
                e.preventDefault(); e.stopPropagation();
                alert("🚨 SECURITY PROTOCOL BREACH (DevKit PRO) 🚨\n\nMalicious link payload intercepted. Someone tried to Rick-Roll you.\n\nBlocked hostile hidden redirect to:\n" + target.href + "\n\nTarget threat neutralized. You are safe.");
                target.style.setProperty('border', '3px solid red', 'important');
                target.style.setProperty('background', 'rgba(255, 0, 0, 0.2)', 'important');
                target.innerText = "💥 NEUTRALIZED TRAP (RICK-ROLL) 💥";
            }
        }, true);
        if (isManual) alert("🛡️ Anti-Rick-Roll Shield engaged!\n\nAll outbound links are now being audited. Cyber-trolling defense matrix is operational.");
    }

    // --- 10. ARCHIVE ENFORCER (TIME MACHINE) ---
    function runArchiveLogic() {
        var activeUrl = window.location.href;
        if (activeUrl.startsWith('about:') || activeUrl.startsWith('chrome:')) {
            alert("⏳ Time Machine:\nCannot look up system tabs or void cards in the digital archives.");
            return;
        }
        
        var archiveUrl = 'https://web.archive.org/web/' + activeUrl;
        console.log("⏳ [Time Machine] Dispatching payload window to Wayback Machine for: " + activeUrl);
        window.open(archiveUrl, '_blank');
    }

    // SAVE ON REFRESH CONTROLLER
    var btnSaveRefresh = d.getElementById('btn-save-refresh');
    if (isSaveOnRefreshActive) {
        btnSaveRefresh.style.setProperty('background', 'rgba(76, 175, 80, 0.2)', 'important');
        btnSaveRefresh.style.setProperty('border', '1px solid #4caf50', 'important');
        btnSaveRefresh.style.setProperty('color', '#81c784', 'important');
        btnSaveRefresh.innerText = '💾 Save on refresh: [ON]';
    } else {
        btnSaveRefresh.style.setProperty('background', 'rgba(255, 152, 0, 0.1)', 'important');
        btnSaveRefresh.style.setProperty('border', '1px solid rgba(255, 152, 0, 0.4)', 'important');
        btnSaveRefresh.style.setProperty('color', '#ffb74d', 'important');
    }

    btnSaveRefresh.onclick = function() {
        if (localStorage.getItem('pro_save_on_refresh') !== 'true') {
            if (confirm("Activate 'Save on refresh'? This will freeze the HTML DOM structure across reload cycles.")) {
                localStorage.setItem('pro_save_on_refresh', 'true');
                var clone = d.body.cloneNode(true);
                var m = clone.querySelector('#pro-menu'); if(m) m.remove();
                var f = clone.querySelector('#pro-fab'); if(f) f.remove();
                localStorage.setItem('pro_persisted_html', clone.innerHTML);
                location.reload();
            }
        } else {
            localStorage.removeItem('pro_save_on_refresh');
            localStorage.removeItem('pro_persisted_html');
            location.reload();
        }
    };

    // CORE ACTION ROUTERS
    d.getElementById('btn-edytor').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'edytor'); if(window.StartEdytorPro) window.StartEdytorPro(); };
    d.getElementById('btn-console').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'console'); loadAndShowVConsole('default'); };
    d.getElementById('btn-elements').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'element'); loadAndShowVConsole('element'); };
    d.getElementById('btn-network').onclick = function() { menu.style.display = 'none'; localStorage.setItem('pro_last_active_tool', 'network'); loadAndShowVConsole('network'); };
    d.getElementById('btn-close-tools').onclick = function() { if(window.vConsoleInstance) window.vConsoleInstance.hide(); menu.style.display = 'none'; localStorage.removeItem('pro_last_active_tool'); };

    if (isSaveOnRefreshActive) {
        var lastTool = localStorage.getItem('pro_last_active_tool');
        if (lastTool === 'edytor') setTimeout(function(){ if(window.StartEdytorPro) window.StartEdytorPro(); }, 200);
        else if (lastTool) loadAndShowVConsole(lastTool === 'console' ? 'default' : lastTool);
    }
    
    // =========================================================================
    // BACKGROUND DAEMONS INITIALIZATION
    // =========================================================================
    if (localStorage.getItem('pro_mod_adkiller') === 'true') runAdKillerLogic(false); 
    if (localStorage.getItem('pro_mod_fps') === 'true') runFpsHudLogic(true); 
    if (localStorage.getItem('pro_mod_darkmode') === 'true') runDarkModeLogic(false); 
    if (localStorage.getItem('pro_mod_antirick') === 'true') runAntiRickRollLogic(false); 

    renderDynamicMenu();
    __updateDevKitBadge();
})();
