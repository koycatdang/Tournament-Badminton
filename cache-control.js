/**
 * Fair Match Cache Control System
 * Hệ thống quản lý cache và tự động cập nhật
 */

(function(window) {
    'use strict';

    const CacheControl = {
        // Cấu hình
        config: {
            checkInterval: 30000, // 30 giây
            dataCheckInterval: 5000, // 5 giây cho data
            storageKeys: {
                lastUpdate: 'fair_match_last_update',
                dataCheck: 'fair_match_data_check',
                version: 'fair_match_version'
            }
        },

        // Khởi tạo hệ thống
        init: function() {
            this.addVersionToAssets();
            this.setupAutoCheck();
            this.addManualControls();
            this.logInit();
        },

        // Thêm version timestamp vào CSS/JS
        addVersionToAssets: function() {
            const timestamp = Date.now();
            
            // CSS files
            this.updateAssetVersions('link[rel="stylesheet"]', 'href', timestamp, ['style.css']);
            
            // Lưu timestamp
            localStorage.setItem(this.config.storageKeys.lastUpdate, timestamp.toString());
        },

        // Cập nhật version cho assets
        updateAssetVersions: function(selector, attribute, timestamp, includeFiles) {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                const url = element[attribute];
                
                // Chỉ cập nhật files local, không động vào CDN
                const shouldUpdate = includeFiles.some(file => 
                    url.includes(file) && !url.includes('cdnjs') && !url.includes('cdn.')
                );
                
                if (shouldUpdate && !url.includes('?v=')) {
                    element[attribute] = url.split('?')[0] + '?v=' + timestamp;
                }
            });
        },

        // Reload toàn bộ assets
        reloadAssets: function() {
            const timestamp = Date.now();
            console.log('🔄 Đang reload assets với timestamp:', timestamp);
            
            // Reload CSS
            const cssLinks = document.querySelectorAll('link[rel="stylesheet"]');
            cssLinks.forEach(link => {
                if (link.href.includes('style.css') && !link.href.includes('cdnjs')) {
                    const newLink = document.createElement('link');
                    newLink.rel = 'stylesheet';
                    newLink.href = 'style.css?v=' + timestamp;
                    
                    // Đợi CSS load xong rồi thay thế
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

        // Xóa cache trình duyệt
        clearCache: function() {
            if ('caches' in window) {
                caches.keys().then(names => {
                    return Promise.all(
                        names.map(name => caches.delete(name))
                    );
                }).then(() => {
                    console.log('🗑️ Browser cache cleared');
                });
            }
            
            // Xóa localStorage cũ
            Object.values(this.config.storageKeys).forEach(key => {
                localStorage.removeItem(key);
            });
        },

        // Kiểm tra cập nhật assets
        checkAssetUpdates: function() {
            const lastUpdate = localStorage.getItem(this.config.storageKeys.lastUpdate);
            const currentTime = Date.now();
            
            // Nếu quá 2 phút, reload assets
            if (lastUpdate && (currentTime - parseInt(lastUpdate)) > 120000) {
                console.log('⏰ Assets đã cũ, đang reload...');
                this.reloadAssets();
            }
        },

        // Kiểm tra thay đổi dữ liệu tournament
        checkDataUpdates: function() {
            const tournamentData = localStorage.getItem('tournamentData');
            if (!tournamentData) return;
            
            const dataHash = this.simpleHash(tournamentData);
            const lastDataCheck = localStorage.getItem(this.config.storageKeys.dataCheck);
            
            if (lastDataCheck && lastDataCheck !== dataHash) {
                console.log('📊 Dữ liệu tournament thay đổi, đang reload trang...');
                
                // Delay reload một chút để tránh loop
                setTimeout(() => {
                    location.reload();
                }, 1000);
            }
            
            localStorage.setItem(this.config.storageKeys.dataCheck, dataHash);
        },

        // Hash đơn giản cho data
        simpleHash: function(str) {
            let hash = 0;
            for (let i = 0; i < str.length; i++) {
                const char = str.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash = hash & hash; // Convert to 32-bit integer
            }
            return hash.toString();
        },

        // Thiết lập auto check
        setupAutoCheck: function() {
            // Check assets
            setInterval(() => {
                this.checkAssetUpdates();
            }, this.config.checkInterval);
            
            // Check data (chỉ cho results page)
            if (window.location.pathname.includes('results.html')) {
                setInterval(() => {
                    this.checkDataUpdates();
                }, this.config.dataCheckInterval);
            }
        },

        // Thêm các function thủ công
        addManualControls: function() {
            window.forceRefreshAssets = this.reloadAssets.bind(this);
            window.clearAppCache = this.clearCache.bind(this);
            window.checkForUpdates = this.checkAssetUpdates.bind(this);
            
            // Thêm keyboard shortcut Ctrl+Shift+R để force refresh
            document.addEventListener('keydown', (e) => {
                if (e.ctrlKey && e.shiftKey && e.key === 'R') {
                    e.preventDefault();
                    console.log('🔄 Force refresh triggered by keyboard');
                    this.reloadAssets();
                }
            });
        },

        // Log khởi tạo
        logInit: function() {
            console.log('✅ Fair Match Cache Control initialized');
            console.log('🔧 Manual commands available:');
            console.log('   - window.forceRefreshAssets() - Force reload CSS/JS');
            console.log('   - window.clearAppCache() - Clear browser cache');
            console.log('   - window.checkForUpdates() - Check for updates now');
            console.log('   - Ctrl+Shift+R - Force refresh assets');
        }
    };

    // Auto-initialize khi DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            CacheControl.init();
        });
    } else {
        CacheControl.init();
    }

    // Expose to global scope
    window.FairMatchCacheControl = CacheControl;

})(window); 