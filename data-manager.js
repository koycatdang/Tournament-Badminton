// Data Manager for Player Statistics
class PlayerDataManager {
    constructor() {
        this.players = [];
        this.editingId = null;
        this.init();
    }

    init() {
        this.loadData();
        this.bindEvents();
        this.updateDisplay();
        this.calculateAverage();
    }

    bindEvents() {
        // Form submission
        document.getElementById('playerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.savePlayer();
        });

        // Auto calculate average points
        const totalPointsInput = document.getElementById('totalPoints');
        const matchesPlayedInput = document.getElementById('matchesPlayed');
        
        [totalPointsInput, matchesPlayedInput].forEach(input => {
            input.addEventListener('input', () => this.calculateAverage());
        });

        // Cancel edit
        document.getElementById('cancelEdit').addEventListener('click', () => {
            this.cancelEdit();
        });
    }

    calculateAverage() {
        const totalPoints = parseFloat(document.getElementById('totalPoints').value) || 0;
        const matchesPlayed = parseFloat(document.getElementById('matchesPlayed').value) || 0;
        
        const average = matchesPlayed > 0 ? (totalPoints / matchesPlayed).toFixed(1) : 0;
        document.getElementById('avgPoints').value = average;
    }

    savePlayer() {
        const playerData = {
            id: this.editingId || Date.now(),
            name: document.getElementById('playerName').value.trim(),
            team: document.getElementById('playerTeam').value,
            image: document.getElementById('playerImage').value.trim() || this.getDefaultImage(),
            matchesPlayed: parseInt(document.getElementById('matchesPlayed').value) || 0,
            matchesWon: parseInt(document.getElementById('matchesWon').value) || 0,
            totalPoints: parseInt(document.getElementById('totalPoints').value) || 0,
            avgPoints: parseFloat(document.getElementById('avgPoints').value) || 0
        };

        // Validation
        if (!playerData.name) {
            alert('Vui lòng nhập tên vận động viên!');
            return;
        }

        if (!playerData.team) {
            alert('Vui lòng chọn đội!');
            return;
        }

        if (playerData.matchesWon > playerData.matchesPlayed) {
            alert('Số trận thắng không thể lớn hơn số trận đã đấu!');
            return;
        }

        if (this.editingId) {
            // Update existing player
            const index = this.players.findIndex(p => p.id === this.editingId);
            if (index !== -1) {
                this.players[index] = playerData;
            }
        } else {
            // Add new player
            // Check for duplicate name
            if (this.players.some(p => p.name.toLowerCase() === playerData.name.toLowerCase())) {
                alert('Tên vận động viên đã tồn tại!');
                return;
            }
            this.players.push(playerData);
        }

        this.saveData();
        this.updateDisplay();
        this.resetForm();
        
        // Show success message
        this.showMessage(this.editingId ? 'Đã cập nhật thông tin vận động viên!' : 'Đã thêm vận động viên mới!', 'success');
    }

    editPlayer(id) {
        const player = this.players.find(p => p.id === id);
        if (!player) return;

        // Fill form with player data
        document.getElementById('editingId').value = id;
        document.getElementById('playerName').value = player.name;
        document.getElementById('playerTeam').value = player.team;
        document.getElementById('playerImage').value = player.image;
        document.getElementById('matchesPlayed').value = player.matchesPlayed;
        document.getElementById('matchesWon').value = player.matchesWon;
        document.getElementById('totalPoints').value = player.totalPoints;
        document.getElementById('avgPoints').value = player.avgPoints;

        // Update UI
        this.editingId = id;
        document.getElementById('formTitle').textContent = 'Chỉnh Sửa Vận Động Viên';
        document.getElementById('submitText').textContent = 'Cập nhật';
        document.getElementById('cancelEdit').style.display = 'block';

        // Highlight editing item
        document.querySelectorAll('.player-item').forEach(item => {
            item.classList.remove('editing');
        });
        document.querySelector(`[data-player-id="${id}"]`)?.classList.add('editing');

        // Scroll to form
        document.querySelector('.input-section').scrollIntoView({ behavior: 'smooth' });
    }

    deletePlayer(id) {
        const player = this.players.find(p => p.id === id);
        if (!player) return;

        if (confirm(`Bạn có chắc chắn muốn xóa vận động viên "${player.name}"?`)) {
            this.players = this.players.filter(p => p.id !== id);
            this.saveData();
            this.updateDisplay();
            this.showMessage('Đã xóa vận động viên!', 'success');
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.resetForm();
        document.getElementById('formTitle').textContent = 'Thêm Vận Động Viên';
        document.getElementById('submitText').textContent = 'Thêm vận động viên';
        document.getElementById('cancelEdit').style.display = 'none';
        
        // Remove editing highlight
        document.querySelectorAll('.player-item').forEach(item => {
            item.classList.remove('editing');
        });
    }

    resetForm() {
        document.getElementById('playerForm').reset();
        document.getElementById('editingId').value = '';
        document.getElementById('avgPoints').value = '0';
    }

    updateDisplay() {
        const container = document.getElementById('playerList');
        const countElement = document.getElementById('playerCount');
        
        countElement.textContent = this.players.length;

        if (this.players.length === 0) {
            container.innerHTML = `
                <div class="empty-state">
                    <i class="fas fa-user-slash"></i>
                    <h4>Chưa có vận động viên nào</h4>
                    <p>Hãy thêm vận động viên đầu tiên bằng form bên trái</p>
                </div>
            `;
            return;
        }

        // Sort players by total points (descending)
        const sortedPlayers = [...this.players].sort((a, b) => b.totalPoints - a.totalPoints);

        container.innerHTML = sortedPlayers.map(player => this.renderPlayerCard(player)).join('');
    }

    renderPlayerCard(player) {
        const winRate = player.matchesPlayed > 0 ? Math.round((player.matchesWon / player.matchesPlayed) * 100) : 0;
        
        return `
            <div class="player-item" data-player-id="${player.id}">
                <div class="player-actions">
                    <button class="btn-icon btn-edit" onclick="playerManager.editPlayer(${player.id})" title="Chỉnh sửa">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn-icon btn-delete" onclick="playerManager.deletePlayer(${player.id})" title="Xóa">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
                
                <div class="player-header">
                    <img src="${player.image}" alt="${player.name}" class="player-avatar" 
                         onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM0Q0FGNTAIC8+PHRleHQgeD0iNTAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0MCI+8J+RqjwvdGV4dD48L3N2Zz4K'">
                    <div class="player-info">
                        <h4>${player.name}</h4>
                        <div class="player-team">${player.team}</div>
                    </div>
                </div>
                
                <div class="player-stats">
                    <div class="stat-item">
                        <span class="stat-value">${player.matchesPlayed}</span>
                        <div class="stat-label">Trận đấu</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${player.matchesWon}</span>
                        <div class="stat-label">Thắng</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${player.totalPoints}</span>
                        <div class="stat-label">Tổng điểm</div>
                    </div>
                    <div class="stat-item">
                        <span class="stat-value">${player.avgPoints}</span>
                        <div class="stat-label">TB/Trận</div>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 10px; color: #666; font-size: 0.9rem;">
                    Tỷ lệ thắng: ${winRate}% 
                    ${player.matchesPlayed > 0 ? `(${player.matchesWon}/${player.matchesPlayed})` : ''}
                </div>
            </div>
        `;
    }

    getDefaultImage() {
        return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM0Q0FGNTAIC8+PHRleHQgeD0iNTAiIHk9IjYwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI0MCI+8J+RqjwvdGV4dD48L3N2Zz4K';
    }

    saveData() {
        localStorage.setItem('playerStatsData', JSON.stringify(this.players));
    }

    loadData() {
        const data = localStorage.getItem('playerStatsData');
        if (data) {
            try {
                this.players = JSON.parse(data);
            } catch (e) {
                console.error('Error loading data:', e);
                this.players = [];
            }
        }
    }

    showMessage(message, type = 'info') {
        // Create toast notification
        const toast = document.createElement('div');
        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            font-weight: 600;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        toast.textContent = message;
        
        document.body.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            toast.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(toast);
            }, 300);
        }, 3000);
    }
}

// Global functions for data management
function exportData() {
    const data = JSON.stringify(playerManager.players, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `player-stats-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    playerManager.showMessage('Đã xuất dữ liệu thành công!', 'success');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                
                if (!Array.isArray(data)) {
                    throw new Error('Dữ liệu không hợp lệ');
                }
                
                // Validate data structure
                const isValid = data.every(player => 
                    player.name && player.team && 
                    typeof player.matchesPlayed === 'number' &&
                    typeof player.matchesWon === 'number' &&
                    typeof player.totalPoints === 'number'
                );
                
                if (!isValid) {
                    throw new Error('Cấu trúc dữ liệu không hợp lệ');
                }
                
                if (confirm(`Bạn có muốn thay thế dữ liệu hiện tại bằng ${data.length} vận động viên từ file?`)) {
                    playerManager.players = data.map(player => ({
                        ...player,
                        id: player.id || Date.now() + Math.random()
                    }));
                    playerManager.saveData();
                    playerManager.updateDisplay();
                    playerManager.showMessage('Đã nhập dữ liệu thành công!', 'success');
                }
                
            } catch (error) {
                alert('Lỗi đọc file: ' + error.message);
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

function clearAllData() {
    if (confirm('Bạn có chắc chắn muốn xóa TẤT CẢ dữ liệu? Thao tác này không thể hoàn tác!')) {
        if (confirm('Xác nhận lần cuối: XÓA TẤT CẢ dữ liệu vận động viên?')) {
            playerManager.players = [];
            playerManager.saveData();
            playerManager.updateDisplay();
            playerManager.cancelEdit();
            playerManager.showMessage('Đã xóa tất cả dữ liệu!', 'success');
        }
    }
}

// Initialize the data manager when page loads
let playerManager;
document.addEventListener('DOMContentLoaded', () => {
    playerManager = new PlayerDataManager();
}); 