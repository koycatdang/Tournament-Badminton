/**
 * Fair Match Cache Control System - GitHub Pages Compatible
 * Hệ thống quản lý cache đơn giản cho GitHub Pages
 */

(function(window) {
    'use strict';

    // Kiểm tra xem có phải GitHub Pages không
    const isGitHubPages = window.location.hostname.includes('github.io');
    
    const CacheControl = {
        // Cấu hình đơn giản cho GitHub Pages
        config: {
            enableCacheControl: !isGitHubPages, // Tắt cache control trên GitHub Pages
            storageKeys: {
                lastUpdate: 'fair_match_last_update',
                dataCheck: 'fair_match_data_check'
            }
        },

        // Khởi tạo hệ thống
        init: function() {
            if (!this.config.enableCacheControl) {
                console.log('📱 GitHub Pages detected - Cache control disabled');
                this.addBasicControls();
                return;
            }
            
            this.addVersionToAssets();
            this.setupAutoCheck();
            this.addManualControls();
            this.logInit();
        },

        // Thêm version timestamp vào CSS (chỉ local)
        addVersionToAssets: function() {
            if (!this.config.enableCacheControl) return;
            
            const timestamp = Date.now();
            const cssLinks = document.querySelectorAll('link[rel="stylesheet"][href*="style.css"]');
            
            cssLinks.forEach(link => {
                if (!link.href.includes('?v=') && !link.href.includes('cdnjs')) {
                    link.href = link.href.split('?')[0] + '?v=' + timestamp;
                }
            });
            
            localStorage.setItem(this.config.storageKeys.lastUpdate, timestamp.toString());
        },

        // Reload assets (chỉ local)
        reloadAssets: function() {
            if (!this.config.enableCacheControl) {
                console.log('🔄 GitHub Pages - Using simple refresh');
                window.location.reload();
                return;
            }
            
            const timestamp = Date.now();
            console.log('🔄 Reloading assets với timestamp:', timestamp);
            
            const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
            cssLinks.forEach(link => {
                if (link.href.includes('style.css') && !link.href.includes('cdnjs')) {
                    const newLink = document.createElement('link');
                    newLink.rel = 'stylesheet';
                    newLink.href = 'style.css?v=' + timestamp;
                    
                    newLink.onload = function() {
                        if (link.parentNode) {
                            link.parentNode.removeChild(link);
                        }
                    };
                    
                    document.head.appendChild(newLink);
                }
            });
            
            localStorage.setItem(this.config.storageKeys.lastUpdate, timestamp.toString());
        },

        // Xóa cache
        clearCache: function() {
            try {
                if ('caches' in window) {
                    caches.keys().then(names => {
                        return Promise.all(names.map(name => caches.delete(name)));
                    }).then(() => {
                        console.log('🗑️ Browser cache cleared');
                    });
                }
                
                // Xóa localStorage
                Object.values(this.config.storageKeys).forEach(key => {
                    localStorage.removeItem(key);
                });
                
                if (isGitHubPages) {
                    // Force reload trên GitHub Pages
                    window.location.reload(true);
                }
            } catch (error) {
                console.log('⚠️ Cache clear error (safe to ignore):', error.message);
            }
        },

        // Kiểm tra thay đổi dữ liệu
        checkDataUpdates: function() {
            const tournamentData = localStorage.getItem('tournamentData');
            if (!tournamentData) return;
            
            const dataHash = this.simpleHash(tournamentData);
            const lastDataCheck = localStorage.getItem(this.config.storageKeys.dataCheck);
            
            if (lastDataCheck && lastDataCheck !== dataHash) {
                console.log('📊 Tournament data changed, reloading...');
                setTimeout(() => {
                    window.location.reload();
                }, 1000);
            }
            
            localStorage.setItem(this.config.storageKeys.dataCheck, dataHash);
        },

        // Hash đơn giản
        simpleHash: function(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash;
            }
            return hash.toString();
        },

        // Thiết lập auto check (chỉ local)
        setupAutoCheck: function() {
            if (!this.config.enableCacheControl) return;
            
            // Check data cho results page
            if (window.location.pathname.includes('results.html')) {
                setInterval(() => {
                    this.checkDataUpdates();
                }, 5000);
            }
        },

        // Thêm controls cơ bản cho GitHub Pages
        addBasicControls: function() {
            window.forceRefreshAssets = function() {
                console.log('🔄 GitHub Pages - Force refresh');
                window.location.reload(true);
            };
            
            window.clearAppCache = this.clearCache.bind(this);
            
            window.checkForUpdates = function() {
                console.log('📱 GitHub Pages - Manual check not needed');
            };
        },

        // Thêm manual controls (full version)
        addManualControls: function() {
            window.forceRefreshAssets = this.reloadAssets.bind(this);
            window.clearAppCache = this.clearCache.bind(this);
            window.checkForUpdates = function() {
                console.log('🔍 Manual check triggered');
            };
            
            // Keyboard shortcut
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                    e.preventDefault();
                    console.log('⌨️ Keyboard refresh triggered');
                    this.reloadAssets();
                }
            });
        },

        // Log khởi tạo
        logInit: function() {
            console.log('✅ Fair Match Cache Control initialized');
            if (isGitHubPages) {
                console.log('📱 Running on GitHub Pages - Simplified mode');
            } else {
                console.log('💻 Running locally - Full cache control');
            }
            console.log('🔧 Available commands:');
            console.log('   - window.forceRefreshAssets() - Refresh assets');
            console.log('   - window.clearAppCache() - Clear cache');
            console.log('   - window.checkForUpdates() - Check updates');
        }
    };

    // Auto-initialize
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            CacheControl.init();
        });
    } else {
        CacheControl.init();
    }

    // Export
    window.FairMatchCacheControl = CacheControl;

})(window); 