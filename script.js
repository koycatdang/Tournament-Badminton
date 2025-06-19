// Dữ liệu toàn cục với hình ảnh đẹp
let allPlayers = [
    { id: 1, name: "Hạnh", gender: "nữ", skill: 2, selected: false, image: "https://images.unsplash.com/photo-1494790108755-2616b612b1e5?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { id: 2, name: "Hân", gender: "nữ", skill: 2, selected: false, image: "https://images.unsplash.com/photo-1488716820095-cbe80883c496?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { id: 3, name: "Trang", gender: "nữ", skill: 3, selected: false, image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { id: 4, name: "Như", gender: "nữ", skill: 1, selected: false, image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { id: 5, name: "Ny", gender: "nữ", skill: 3, selected: false, image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { id: 6, name: "Thanh", gender: "nữ", skill: 3, selected: false, image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    { id: 7, name: "Hằng", gender: "nữ", skill: 2, selected: false, image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
    { id: 8, name: "Duyên", gender: "nữ", skill: 1, selected: false, image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
    { id: 9, name: "Hoài", gender: "nam", skill: 2, selected: false, image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { id: 10, name: "Tuấn", gender: "nam", skill: 2, selected: false, image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { id: 11, name: "Cương", gender: "nam", skill: 3, selected: false, image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&h=400&fit=crop&crop=face", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }
];
let selectedPlayers = [];
let teams = [];
let matches = [];
let tournamentFormat = 'round-robin'; // 'round-robin' hoặc 'knockout'
let bracketRounds = [];
let currentStep = 1;

// Danh sách tên đội 1 chữ cái và thông tin team
const teamData = [
    { name: "A", fullName: "Alpha", logo: "🔥", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "B", fullName: "Bravo", logo: "🐉", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "C", fullName: "Charlie", logo: "⚡", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "D", fullName: "Delta", logo: "❄️", image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" },
    { name: "E", fullName: "Echo", logo: "🌙", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)" },
    { name: "F", fullName: "Foxtrot", logo: "⚔️", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)" },
    { name: "G", fullName: "Golf", logo: "🐍", image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)" },
    { name: "H", fullName: "Hotel", logo: "👻", image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)" },
    { name: "I", fullName: "India", logo: "🐅", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
    { name: "J", fullName: "Juliet", logo: "😈", image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
    { name: "K", fullName: "Kilo", logo: "🌪️", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
    { name: "L", fullName: "Lima", logo: "👹", image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=600&h=400&fit=crop", gradient: "linear-gradient(135deg, #fa709a 0%, #fee140 100%)" }
];

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    showStep(1);
    updateSelectedPlayers(); // Cập nhật danh sách người chọn được chọn
    displayPlayerCards();
    updateSelectedCount();
    updateFormatDescription();
    updateTournamentLayout();
});

// Hiển thị bước
function showStep(step) {
    // Ẩn tất cả các bước
    document.querySelectorAll('.step').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Hiển thị bước được chọn
    document.getElementById(`step${step}`).classList.add('active');
    document.querySelectorAll('.nav-btn')[step - 1].classList.add('active');
    
    currentStep = step;
    
    // Cập nhật trạng thái nút
    updateNavigationButtons();
}

// Cập nhật nút điều hướng
function updateNavigationButtons() {
    const nextToStep2 = document.getElementById('nextToStep2');
    const nextToStep3 = document.getElementById('nextToStep3');
    
    if (nextToStep2) {
        nextToStep2.disabled = selectedPlayers.length < 4;
    }
    
    if (nextToStep3) {
        nextToStep3.disabled = teams.length === 0;
    }
}

// Hiển thị danh sách thẻ bài người chơi kiểu game
function displayPlayerCards() {
    const container = document.getElementById('playersList');
    
    container.innerHTML = allPlayers.map(player => `
        <div class="game-card ${player.selected ? 'selected' : ''}" onclick="togglePlayer(${player.id})">
            <div class="card-background" style="background: ${player.gradient}"></div>
            
            <div class="card-image">
                <img src="${player.image}" alt="${player.name}" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDMwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNjY3ZWVhIi8+Cjx0ZXh0IHg9IjE1MCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI2MCI+8J+Rqy08L3RleHQ+Cjwvc3ZnPgo='">
                ${player.selected ? '<div class="selected-overlay"><i class="fas fa-check-circle"></i></div>' : ''}
            </div>
            
            <div class="card-content">
                <div class="card-header">
                    <div class="player-name-display">${player.name}</div>
                    <div class="gender-icon">
                        <i class="fas fa-${player.gender === 'nam' ? 'mars' : 'venus'}"></i>
                    </div>
                </div>
                
                <div class="skill-section">
                    <div class="skill-stars">
                        ${Array.from({length: 3}, (_, i) => 
                            `<i class="fas fa-star ${i < player.skill ? 'filled' : ''}"></i>`
                        ).join('')}
                    </div>
                    <div class="skill-controls-game">
                        <button class="skill-btn-game minus" onclick="changePlayerSkill(${player.id}, -1, event)">−</button>
                        <span class="skill-number">${player.skill}</span>
                        <button class="skill-btn-game plus" onclick="changePlayerSkill(${player.id}, 1, event)">+</button>
                    </div>
                </div>
                
                <div class="card-footer">
                    <div class="skill-label-game">${getSkillTextShort(player.skill)}</div>
                </div>
            </div>
            
            <div class="card-border ${player.selected ? 'selected-border' : ''}"></div>
            <div class="shine-effect"></div>
        </div>
    `).join('');
}

// Chọn/bỏ chọn người chơi
function togglePlayer(playerId) {
    const player = allPlayers.find(p => p.id === playerId);
    if (player) {
        player.selected = !player.selected;
        updateSelectedPlayers();
        displayPlayerCards();
        updateSelectedCount();
        updateNavigationButtons();
    }
}

// Cập nhật danh sách người chọi được chọn
function updateSelectedPlayers() {
    selectedPlayers = allPlayers.filter(p => p.selected);
}

// Thay đổi kỹ năng người chơi
function changePlayerSkill(playerId, delta, event) {
    event.stopPropagation(); // Ngăn trigger togglePlayer
    
    const player = allPlayers.find(p => p.id === playerId);
    if (player) {
        let newSkill = player.skill + delta;
        if (newSkill < 1) newSkill = 1;
        if (newSkill > 3) newSkill = 3;
        
        player.skill = newSkill;
        displayPlayerCards();
    }
}

// Cập nhật số lượng người chọi được chọn
function updateSelectedCount() {
    document.getElementById('playerCount').textContent = selectedPlayers.length;
}

// Thêm người chơi mới
function addNewPlayer() {
    const nameInput = document.getElementById('newPlayerName');
    const genderSelect = document.getElementById('newPlayerGender');
    const skillSelect = document.getElementById('newPlayerSkill');
    
    const name = nameInput.value.trim();
    const gender = genderSelect.value;
    const skill = parseInt(skillSelect.value);
    
    if (!name || !gender || !skill) {
        alert('Vui lòng nhập đầy đủ thông tin!');
        return;
    }
    
    // Kiểm tra trùng tên
    if (allPlayers.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        alert('Tên vận động viên đã tồn tại!');
        return;
    }
    
    // Thêm người chơi mới
    const newPlayer = {
        id: Date.now(),
        name: name,
        gender: gender,
        skill: skill,
        selected: false,
        avatar: gender === 'nam' ? '👨' : '👩'
    };
    
    allPlayers.push(newPlayer);
    
    // Reset form
    nameInput.value = '';
    genderSelect.value = '';
    skillSelect.value = '';
    
    // Cập nhật hiển thị
    displayPlayerCards();
    closeAddPlayerModal();
}

// Mở modal thêm người chơi
function openAddPlayerModal() {
    document.getElementById('addPlayerModal').style.display = 'block';
}

// Đóng modal thêm người chơi
function closeAddPlayerModal() {
    document.getElementById('addPlayerModal').style.display = 'none';
}

// Lấy text kỹ năng
function getSkillText(skill) {
    const texts = {
        1: 'Mới tập (vừa cầm vợt)',
        2: 'Khá khá (đánh được cơ bản)', 
        3: 'Cao thủ (đánh hay lắm)'
    };
    return texts[skill] || '';
}

// Lấy icon kỹ năng
function getSkillIcon(skill) {
    const icons = {
        1: '🐣',
        2: '🏃',
        3: '🔥'
    };
    return icons[skill] || '';
}

// Lấy text kỹ năng ngắn
function getSkillTextShort(skill) {
    const texts = {
        1: 'Mới tập',
        2: 'Khá khá',
        3: 'Cao thủ'
    };
    return texts[skill] || '';
}

// Xử lý phím Enter trong input
document.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        const target = e.target;
        if (target.id === 'playerName' || target.id === 'playerSkill') {
            addPlayer();
        }
    }
});

// Tạo đội
function createTeams() {
    if (selectedPlayers.length < 4) {
        alert('Cần ít nhất 4 vận động viên để tạo đội!');
        return;
    }
    
    if (selectedPlayers.length % 2 !== 0) {
        alert('Số vận động viên phải là số chẵn để tạo đội!');
        return;
    }
    
    // Hiển thị hiệu ứng loading
    showTeamCreationAnimation();
}

// Hiệu ứng tạo đội
function showTeamCreationAnimation() {
    const container = document.getElementById('teamsDisplay');
    const createBtn = document.querySelector('.create-teams-btn');
    
    // Disable nút tạo đội
    createBtn.disabled = true;
    createBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang tạo đội...';
    
    // Hiệu ứng loading
    container.innerHTML = `
        <div class="team-creation-loading">
            <div class="loading-spinner">
                <div class="spinner"></div>
            </div>
            <h3>🎲 Đang tạo đội cân bằng...</h3>
            <p>Thuật toán AI đang phân tích và sắp xếp...</p>
            <div class="loading-steps">
                <div class="loading-step active">⚡ Phân tích kỹ năng</div>
                <div class="loading-step">🔄 Cân bằng đội hình</div>
                <div class="loading-step">🎯 Gán tên & logo</div>
                <div class="loading-step">✨ Hoàn thành</div>
            </div>
        </div>
    `;
    
    // Animate qua các bước
    let currentStepIndex = 0;
    const steps = document.querySelectorAll('.loading-step');
    
    const stepInterval = setInterval(() => {
        if (currentStepIndex < steps.length - 1) {
            steps[currentStepIndex].classList.remove('active');
            steps[currentStepIndex].classList.add('completed');
            currentStepIndex++;
            steps[currentStepIndex].classList.add('active');
        } else {
            clearInterval(stepInterval);
            
            // Sau khi hoàn thành animation, tạo đội thật
            setTimeout(() => {
                actuallyCreateTeams();
            }, 500);
        }
    }, 800);
}

// Tạo đội thực sự
function actuallyCreateTeams() {
    // Tạo đội cân bằng bằng thuật toán tối ưu
    teams = createBalancedTeams([...selectedPlayers]);
    
    // Gán thông tin team ngẫu nhiên cho các đội
    const shuffledTeamData = [...teamData].sort(() => Math.random() - 0.5);
    teams.forEach((team, index) => {
        const teamInfo = shuffledTeamData[index];
        team.name = teamInfo.name;
        team.fullName = teamInfo.fullName;
        team.logo = teamInfo.logo;
        team.image = teamInfo.image;
        team.gradient = teamInfo.gradient;
    });
    
    // Hiển thị đội với animation
    displayTeamsWithAnimation();
    updateNavigationButtons();
    
    // Enable lại nút tạo đội
    const createBtn = document.querySelector('.create-teams-btn');
    createBtn.disabled = false;
    createBtn.innerHTML = '<i class="fas fa-random"></i> Tạo đội ngẫu nhiên';
}

// Thuật toán tạo đội cân bằng
function createBalancedTeams(playerList) {
    const numTeams = playerList.length / 2;
    const totalSkill = playerList.reduce((sum, p) => sum + p.skill, 0);
    const targetSkillPerTeam = totalSkill / numTeams;
    
    // Khởi tạo các đội
    const teams = [];
    for (let i = 0; i < numTeams; i++) {
        teams.push({
            id: i + 1,
            name: '',
            logo: '',
            members: [],
            totalSkill: 0,
            points: 0,
            wins: 0,
            losses: 0,
            matchesPlayed: 0
        });
    }
    
    // Sắp xếp vận động viên theo kỹ năng giảm dần
    const sortedPlayers = [...playerList].sort((a, b) => b.skill - a.skill);
    
    // Thuật toán phân chia cân bằng
    for (const player of sortedPlayers) {
        // Tìm đội có tổng kỹ năng thấp nhất
        const teamWithLowestSkill = teams.reduce((minTeam, currentTeam) => 
            currentTeam.totalSkill < minTeam.totalSkill ? currentTeam : minTeam
        );
        
        // Thêm vận động viên vào đội đó
        teamWithLowestSkill.members.push(player);
        teamWithLowestSkill.totalSkill += player.skill;
    }
    
    // Tối ưu hóa thêm bằng cách hoán đổi vận động viên giữa các đội
    optimizeTeamBalance(teams);
    
    return teams;
}

// Tối ưu hóa cân bằng đội bằng cách hoán đổi
function optimizeTeamBalance(teams) {
    const maxIterations = 100;
    let improved = true;
    let iteration = 0;
    
    while (improved && iteration < maxIterations) {
        improved = false;
        iteration++;
        
        // Thử hoán đổi vận động viên giữa các đội
        for (let i = 0; i < teams.length; i++) {
            for (let j = i + 1; j < teams.length; j++) {
                const team1 = teams[i];
                const team2 = teams[j];
                
                // Thử hoán đổi từng cặp vận động viên
                for (let p1 = 0; p1 < team1.members.length; p1++) {
                    for (let p2 = 0; p2 < team2.members.length; p2++) {
                        const player1 = team1.members[p1];
                        const player2 = team2.members[p2];
                        
                        // Tính độ chênh lệch hiện tại
                        const currentDiff = Math.abs(team1.totalSkill - team2.totalSkill);
                        
                        // Tính độ chênh lệch sau khi hoán đổi
                        const newTeam1Skill = team1.totalSkill - player1.skill + player2.skill;
                        const newTeam2Skill = team2.totalSkill - player2.skill + player1.skill;
                        const newDiff = Math.abs(newTeam1Skill - newTeam2Skill);
                        
                        // Nếu hoán đổi làm cân bằng hơn thì thực hiện
                        if (newDiff < currentDiff) {
                            // Hoán đổi vận động viên
                            team1.members[p1] = player2;
                            team2.members[p2] = player1;
                            team1.totalSkill = newTeam1Skill;
                            team2.totalSkill = newTeam2Skill;
                            improved = true;
                        }
                    }
                }
            }
        }
    }
}

// Hiển thị đội
function displayTeams() {
    const container = document.getElementById('teamsDisplay');
    
    if (teams.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có đội nào được tạo</p>';
        return;
    }
    
    container.innerHTML = teams.map(team => `
        <div class="team-card">
            <div class="team-logo">${team.logo}</div>
            <div class="team-name">${team.name}</div>
            <ul class="team-members">
                ${team.members.map(member => `
                    <li>${member.name} ${getSkillIcon(member.skill)}</li>
                `).join('')}
            </ul>
            <div class="team-total-skill">
                Tổng kỹ năng: ${team.totalSkill}
            </div>
        </div>
    `).join('');
}

// Hiển thị đội với animation kiểu esports
function displayTeamsWithAnimation() {
    const container = document.getElementById('teamsDisplay');
    
    if (teams.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có đội nào được tạo</p>';
        return;
    }
    
    // Tạo HTML cho các đội theo kiểu esports team
    const teamsHTML = teams.map((team, index) => `
        <div class="esports-team-card team-animate" style="animation-delay: ${index * 0.3}s">
            <div class="team-background" style="background: ${team.gradient}"></div>
            <div class="team-image-section">
                <img src="${team.image}" alt="Team ${team.name}" class="team-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAwIiBoZWlnaHQ9IjQwMCIgdmlld0JveD0iMCAwIDYwMCA0MDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI2MDAiIGhlaWdodD0iNDAwIiBmaWxsPSIjNjY3ZWVhIi8+Cjx0ZXh0IHg9IjMwMCIgeT0iMjAwIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSJ3aGl0ZSIgZm9udC1zaXplPSI4MCI+8J+UqTwvdGV4dD4KPC9zdmc+Cg=='">
                <div class="team-overlay"></div>
            </div>
            
            <div class="team-content">
                <div class="team-header">
                    <div class="team-logo-big">${team.logo}</div>
                    <div class="team-info">
                        <h2 class="team-name-display">Team ${team.fullName}</h2>
                    </div>
                </div>
                
                <div class="team-members-row">
                    ${team.members.map(member => `
                        <div class="member-inline">
                            <div class="member-avatar-small">
                                <img src="${member.image}" alt="${member.name}" 
                                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxjaXJjbGUgY3g9IjUwIiBjeT0iNTAiIHI9IjUwIiBmaWxsPSIjNjY3ZWVhIi8+Cjx0ZXh0IHg9IjUwIiB5PSI2MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0id2hpdGUiIGZvbnQtc2l6ZT0iNDAiPvCfkaPwn5yqPC90ZXh0Pgo8L3N2Zz4K'">
                            </div>
                            <div class="member-info-inline">
                                <div class="member-name-inline">${member.name}</div>
                                <div class="member-skill-inline">
                                    ${Array.from({length: 3}, (_, i) => 
                                        `<i class="fas fa-star ${i < member.skill ? 'filled' : ''}"></i>`
                                    ).join('')}
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
                
                <div class="team-stats">
                    <div class="stat-item">
                        <span class="stat-label">Team Power</span>
                        <span class="stat-value">${team.totalSkill}</span>
                    </div>
                </div>
            </div>
            
            <div class="team-glow"></div>
        </div>
    `).join('');
    
    container.innerHTML = teamsHTML;
    
    // Thêm class animation sau một chút để trigger animation
    setTimeout(() => {
        document.querySelectorAll('.team-animate').forEach(card => {
            card.classList.add('team-reveal');
        });
    }, 100);
}

// Chuyển đổi thể thức tournament
function switchTournamentFormat(format) {
    // Nếu đã có lịch đấu và chuyển thể thức khác, hỏi xác nhận
    if (matches.length > 0 && tournamentFormat !== format) {
        if (!confirm('Chuyển thể thức sẽ xóa lịch đấu hiện tại. Bạn có chắc chắn?')) {
            return;
        }
        // Reset lịch đấu
        matches = [];
        bracketRounds = [];
        resetTeamStats();
    }
    
    tournamentFormat = format;
    
    // Cập nhật UI tabs
    document.querySelectorAll('.format-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    document.querySelector(`[data-format="${format}"]`).classList.add('active');
    
    // Cập nhật mô tả và layout
    updateFormatDescription();
    updateTournamentLayout();
    
    // Cập nhật hiển thị
    displayMatches();
    updateStandings();
    displayBracket();
}

// Cập nhật mô tả thể thức
function updateFormatDescription() {
    const description = document.getElementById('formatDescription');
    if (tournamentFormat === 'round-robin') {
        description.textContent = 'Thi đấu vòng tròn - mỗi đội đấu với tất cả các đội khác';
    } else {
        description.textContent = 'Loại trực tiếp - đội thua bị loại, đội thắng tiến lên vòng tiếp theo';
    }
}

// Cập nhật layout tournament
function updateTournamentLayout() {
    const layout = document.getElementById('tournamentLayout');
    const matchesSection = document.getElementById('matchesSection');
    const standingsSection = document.getElementById('standingsSection');
    const bracketSection = document.getElementById('bracketSection');
    
    if (tournamentFormat === 'round-robin') {
        layout.classList.remove('bracket-mode');
        matchesSection.style.display = 'block';
        standingsSection.style.display = 'block';
        bracketSection.style.display = 'none';
    } else {
        layout.classList.add('bracket-mode');
        matchesSection.style.display = 'none';
        standingsSection.style.display = 'none';
        bracketSection.style.display = 'block';
    }
}

// Reset stats của các đội
function resetTeamStats() {
    teams.forEach(team => {
        team.points = 0;
        team.wins = 0;
        team.losses = 0;
        team.matchesPlayed = 0;
    });
}

// Tạo lịch thi đấu theo thể thức
function generateMatches() {
    if (teams.length < 2) {
        alert('Cần ít nhất 2 đội để tạo lịch thi đấu!');
        return;
    }
    
    // Reset stats trước khi tạo lịch mới
    resetTeamStats();
    
    if (tournamentFormat === 'round-robin') {
        generateRoundRobinMatches();
    } else {
        generateKnockoutBracket();
    }
    
    displayMatches();
    updateStandings();
    displayBracket();
}

// Tạo lịch thi đấu vòng tròn
function generateRoundRobinMatches() {
    matches = [];
    let matchId = 1;
    
    // Thi đấu vòng tròn (mỗi đội đấu với tất cả đội khác)
    for (let i = 0; i < teams.length; i++) {
        for (let j = i + 1; j < teams.length; j++) {
            matches.push({
                id: matchId++,
                team1: teams[i],
                team2: teams[j],
                score1: null,
                score2: null,
                completed: false
            });
        }
    }
    
    // Xáo trộn thứ tự trận đấu
    matches.sort(() => Math.random() - 0.5);
}

// Tạo bracket loại trực tiếp
function generateKnockoutBracket() {
    // Kiểm tra số đội có phải lũy thừa của 2 không
    const teamCount = teams.length;
    const isPowerOfTwo = (teamCount & (teamCount - 1)) === 0;
    
    if (!isPowerOfTwo) {
        alert(`Thể thức loại trực tiếp cần số đội là lũy thừa của 2 (2, 4, 8, 16...). Hiện tại có ${teamCount} đội.`);
        return;
    }
    
    matches = [];
    bracketRounds = [];
    let matchId = 1;
    
    // Xáo trộn đội trước khi tạo bracket
    const shuffledTeams = [...teams].sort(() => Math.random() - 0.5);
    
    // Tạo vòng đầu tiên
    const firstRound = [];
    for (let i = 0; i < shuffledTeams.length; i += 2) {
        const match = {
            id: matchId++,
            team1: shuffledTeams[i],
            team2: shuffledTeams[i + 1],
            score1: null,
            score2: null,
            completed: false,
            round: 1,
            matchInRound: Math.floor(i / 2) + 1
        };
        firstRound.push(match);
        matches.push(match);
    }
    
    bracketRounds.push({
        round: 1,
        title: getRoundTitle(1, Math.log2(teamCount)),
        matches: firstRound
    });
    
    // Tạo các vòng tiếp theo (placeholder)
    let currentTeamCount = teamCount / 2;
    let round = 2;
    
    while (currentTeamCount >= 1) {
        const roundMatches = [];
        for (let i = 0; i < currentTeamCount; i++) {
            const match = {
                id: matchId++,
                team1: null, // Sẽ được cập nhật khi vòng trước hoàn thành
                team2: null,
                score1: null,
                score2: null,
                completed: false,
                round: round,
                matchInRound: i + 1
            };
            roundMatches.push(match);
            matches.push(match);
        }
        
        bracketRounds.push({
            round: round,
            title: getRoundTitle(round, Math.log2(teamCount)),
            matches: roundMatches
        });
        
        currentTeamCount /= 2;
        round++;
    }
}

// Lấy tên vòng đấu
function getRoundTitle(currentRound, totalRounds) {
    const roundsFromEnd = totalRounds - currentRound + 1;
    
    if (roundsFromEnd === 1) return 'Chung kết';
    if (roundsFromEnd === 2) return 'Bán kết';
    if (roundsFromEnd === 3) return 'Tứ kết';
    if (roundsFromEnd === 4) return 'Vòng 1/8';
    
    return `Vòng ${currentRound}`;
}

// Hiển thị lịch thi đấu với layout chuyên nghiệp
function displayMatches() {
    const container = document.getElementById('matchesList');
    
    if (matches.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có lịch thi đấu</p>';
        return;
    }
    
    // Chỉ hiển thị matches có đủ team1 và team2 (cho round-robin hoặc matches sẵn sàng trong knockout)
    const displayableMatches = matches.filter(match => match.team1 && match.team2);
    
    if (displayableMatches.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có trận đấu nào sẵn sàng</p>';
        return;
    }
    
    container.innerHTML = displayableMatches.map(match => `
        <div class="pro-match-card ${match.completed ? 'completed' : 'upcoming'}">
            <div class="match-header">
                <div class="match-status">
                    ${match.completed ? 
                        '<span class="status-badge completed"><i class="fas fa-check"></i> Hoàn thành</span>' : 
                        '<span class="status-badge upcoming"><i class="fas fa-clock"></i> Sắp diễn ra</span>'
                    }
                </div>
                ${match.completed ? 
                    `<div class="match-result">
                        <span class="final-score">${match.score1} - ${match.score2}</span>
                    </div>` : ''
                }
            </div>
            
            <div class="teams-vs-container">
                <div class="team-side team-left ${match.completed && match.score1 > match.score2 ? 'winner' : ''}">
                    <div class="team-info-compact">
                        <div class="team-logo-vs">${match.team1.logo}</div>
                        <div class="team-details">
                            <div class="team-name-vs">Team ${match.team1.fullName}</div>
                            <div class="team-members-vs">
                                ${match.team1.members.map(member => `
                                    <div class="member-avatar-vs">
                                        <img src="${member.image}" alt="${member.name}" title="${member.name}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                    ${match.completed ? `<div class="team-score ${match.score1 > match.score2 ? 'winner-score' : ''}">${match.score1}</div>` : ''}
                </div>
                
                <div class="vs-divider">
                    <span class="vs-text">VS</span>
                </div>
                
                <div class="team-side team-right ${match.completed && match.score2 > match.score1 ? 'winner' : ''}">
                    ${match.completed ? `<div class="team-score ${match.score2 > match.score1 ? 'winner-score' : ''}">${match.score2}</div>` : ''}
                    <div class="team-info-compact">
                        <div class="team-details">
                            <div class="team-name-vs">Team ${match.team2.fullName}</div>
                            <div class="team-members-vs">
                                ${match.team2.members.map(member => `
                                    <div class="member-avatar-vs">
                                        <img src="${member.image}" alt="${member.name}" title="${member.name}">
                                    </div>
                                `).join('')}
                            </div>
                        </div>
                        <div class="team-logo-vs">${match.team2.logo}</div>
                    </div>
                </div>
            </div>
            
            ${!match.completed ? `
                <div class="match-actions-pro">
                    <button class="enter-score-btn-pro" onclick="openScoreModal(${match.id})">
                        <i class="fas fa-gamepad"></i> Nhập kết quả
                    </button>
                </div>
            ` : ''}
        </div>
    `).join('');
}

// Mở modal nhập điểm
function openScoreModal(matchId) {
    const match = matches.find(m => m.id === matchId);
    if (!match || !match.team1 || !match.team2) return;
    
    const modal = document.getElementById('scoreModal');
    const content = document.getElementById('scoreInputContent');
    
    content.innerHTML = `
        <div class="modal-header-custom">
            <div class="match-title">
                <span class="team-logo-modal">${match.team1.logo}</span>
                <span class="team-name-modal">Team ${match.team1.fullName}</span>
                <span class="vs-modal">VS</span>
                <span class="team-name-modal">Team ${match.team2.fullName}</span>
                <span class="team-logo-modal">${match.team2.logo}</span>
            </div>
        </div>
        
        <div class="score-format-selector">
            <div class="format-label">Thể thức thi đấu:</div>
            <div class="format-options">
                <button class="format-option active" data-format="11" onclick="selectScoreFormat(11)">
                    <i class="fas fa-clock"></i> 11 điểm
                </button>
                <button class="format-option" data-format="21" onclick="selectScoreFormat(21)">
                    <i class="fas fa-trophy"></i> 21 điểm
                </button>
            </div>
        </div>
        
        <div class="teams-score-container">
            <div class="team-score-section">
                <div class="team-header-score">
                    <span class="team-logo-score">${match.team1.logo}</span>
                    <span class="team-name-score">Team ${match.team1.fullName} (${match.team1.members.map(m => m.name).join(', ')})</span>
                </div>
                <div class="score-control-pro">
                    <button type="button" class="score-btn-pro minus" onclick="changeScore('score1', -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <div class="score-display-pro">
                        <input type="number" id="score1" min="0" max="11" value="0" readonly>
                    </div>
                    <button type="button" class="score-btn-pro plus" onclick="changeScore('score1', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
            
            <div class="vs-divider-score">
                <span class="vs-text-score">VS</span>
            </div>
            
            <div class="team-score-section">
                <div class="team-header-score">
                    <span class="team-logo-score">${match.team2.logo}</span>
                    <span class="team-name-score">Team ${match.team2.fullName} (${match.team2.members.map(m => m.name).join(', ')})</span>
                </div>
                <div class="score-control-pro">
                    <button type="button" class="score-btn-pro minus" onclick="changeScore('score2', -1)">
                        <i class="fas fa-minus"></i>
                    </button>
                    <div class="score-display-pro">
                        <input type="number" id="score2" min="0" max="11" value="0" readonly>
                    </div>
                    <button type="button" class="score-btn-pro plus" onclick="changeScore('score2', 1)">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        </div>
        
        <div class="score-rules-info">
            <div class="rules-title">
                <i class="fas fa-info-circle"></i> Luật thi đấu
            </div>
            <div class="rules-content" id="rulesContent">
                Đội nào đạt 11 điểm trước thắng. Nếu hòa 10-10, đội nào ghi 2 điểm liên tiếp trước thắng. Nếu hòa 19-19, đội ghi điểm thứ 20 thắng.
            </div>
        </div>
        
        <div class="score-validation-message" id="scoreValidation" style="display: none;"></div>
        
        <button class="submit-score-btn-pro" onclick="submitScore(${matchId})">
            <i class="fas fa-check-circle"></i> Xác nhận kết quả
        </button>
    `;
    
    modal.style.display = 'block';
    
    // Khởi tạo format mặc định
    window.currentScoreFormat = 11;
    updateScoreRules();
}

// Đóng modal
function closeScoreModal() {
    document.getElementById('scoreModal').style.display = 'none';
}

// Chọn format điểm số
function selectScoreFormat(format) {
    window.currentScoreFormat = format;
    
    // Update UI
    document.querySelectorAll('.format-option').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-format="${format}"]`).classList.add('active');
    
    // Update max values
    const score1 = document.getElementById('score1');
    const score2 = document.getElementById('score2');
    score1.max = format + 10; // Cho phép overtime
    score2.max = format + 10;
    
    // Reset scores if they exceed new limit
    if (parseInt(score1.value) > format + 10) score1.value = 0;
    if (parseInt(score2.value) > format + 10) score2.value = 0;
    
    updateScoreRules();
    validateScore();
}

// Update luật thi đấu
function updateScoreRules() {
    const rulesContent = document.getElementById('rulesContent');
    if (!rulesContent) return;
    
    if (window.currentScoreFormat === 11) {
        rulesContent.innerHTML = `
            Đội nào đạt <strong>11 điểm</strong> trước thắng. Nếu hòa <strong>10-10</strong>, đội nào ghi <strong>2 điểm liên tiếp</strong> trước thắng. 
            Nếu hòa <strong>19-19</strong>, đội ghi điểm thứ <strong>20</strong> thắng.
        `;
    } else {
        rulesContent.innerHTML = `
            Đội nào đạt <strong>21 điểm</strong> trước thắng. Nếu hòa <strong>20-20</strong>, đội nào ghi <strong>2 điểm liên tiếp</strong> trước thắng. 
            Nếu hòa <strong>29-29</strong>, đội ghi điểm thứ <strong>30</strong> thắng.
        `;
    }
}

// Thay đổi điểm số
function changeScore(inputId, delta) {
    const input = document.getElementById(inputId);
    const maxScore = window.currentScoreFormat || 11;
    let currentValue = parseInt(input.value) || 0;
    let newValue = currentValue + delta;
    
    // Giới hạn từ 0 đến max + 10 (để xử lý overtime)
    if (newValue < 0) newValue = 0;
    if (newValue > maxScore + 10) newValue = maxScore + 10;
    
    input.value = newValue;
    
    // Hiệu ứng khi thay đổi
    input.style.transform = 'scale(1.1)';
    setTimeout(() => {
        input.style.transform = 'scale(1)';
    }, 150);
    
    validateScore();
}

// Validate điểm số theo luật cầu lông
function validateScore() {
    const score1 = parseInt(document.getElementById('score1').value) || 0;
    const score2 = parseInt(document.getElementById('score2').value) || 0;
    const maxScore = window.currentScoreFormat || 11;
    const validation = document.getElementById('scoreValidation');
    
    if (!validation) return true;
    
    // Kiểm tra điều kiện thắng
    const result = checkValidWin(score1, score2, maxScore);
    
    if (score1 === 0 && score2 === 0) {
        validation.style.display = 'none';
        return true;
    }
    
    if (!result.valid) {
        validation.innerHTML = `<i class="fas fa-exclamation-triangle"></i> ${result.message}`;
        validation.style.display = 'block';
        validation.className = 'score-validation-message error';
        return false;
    } else if (result.winner) {
        validation.innerHTML = `<i class="fas fa-trophy"></i> ${result.message}`;
        validation.style.display = 'block';
        validation.className = 'score-validation-message success';
        return true;
    } else {
        validation.style.display = 'none';
        return true;
    }
}

// Kiểm tra điều kiện thắng theo luật cầu lông
function checkValidWin(score1, score2, maxScore) {
    const diff = Math.abs(score1 - score2);
    const higher = Math.max(score1, score2);
    const lower = Math.min(score1, score2);
    
    // Trường hợp bình thường: đạt điểm tối thiểu và cách biệt >= 2
    if (higher >= maxScore && diff >= 2) {
        const winner = score1 > score2 ? 'Team 1' : 'Team 2';
        return {
            valid: true,
            winner: true,
            message: `${winner} thắng ${higher}-${lower}`
        };
    }
    
    // Trường hợp deuce: hòa ở điểm cao (maxScore-1, maxScore-1)
    if (score1 === maxScore - 1 && score2 === maxScore - 1) {
        return {
            valid: true,
            winner: false,
            message: `Deuce ${maxScore-1}-${maxScore-1}! Cần thắng cách biệt 2 điểm`
        };
    }
    
    // Trường hợp overtime: sau deuce, cần cách biệt 2 điểm
    if (higher >= maxScore && lower >= maxScore - 1) {
        if (diff >= 2) {
            const winner = score1 > score2 ? 'Team 1' : 'Team 2';
            return {
                valid: true,
                winner: true,
                message: `${winner} thắng ${higher}-${lower} (Overtime)`
            };
        } else if (diff === 1) {
            return {
                valid: true,
                winner: false,
                message: `${higher}-${lower} - Cần thắng cách biệt 2 điểm`
            };
        }
    }
    
    // Trường hợp giới hạn tối đa: 30 điểm (21+9) hoặc 20 điểm (11+9)
    const maxLimit = maxScore + 9;
    if (higher >= maxLimit) {
        const winner = score1 > score2 ? 'Team 1' : 'Team 2';
        return {
            valid: true,
            winner: true,
            message: `${winner} thắng ${higher}-${lower} (Điểm tối đa)`
        };
    }
    
    // Trường hợp chưa kết thúc
    if (higher < maxScore || (higher >= maxScore && diff < 2 && higher < maxLimit)) {
        return {
            valid: true,
            winner: false,
            message: ''
        };
    }
    
    // Trường hợp không hợp lệ
    return {
        valid: false,
        winner: false,
        message: 'Điểm số không hợp lệ theo luật cầu lông'
    };
}

// Xử lý click bên ngoài modal
window.onclick = function(event) {
    const modal = document.getElementById('scoreModal');
    if (event.target === modal) {
        closeScoreModal();
    }
}

// Hiển thị bracket tournament
function displayBracket() {
    const container = document.getElementById('bracketContainer');
    
    if (tournamentFormat !== 'knockout' || bracketRounds.length === 0) {
        container.innerHTML = '';
        return;
    }
    
    // Thêm header cho bracket
    const bracketSection = container.parentElement;
    let header = bracketSection.querySelector('.bracket-header');
    if (!header) {
        header = document.createElement('div');
        header.className = 'bracket-header';
        header.innerHTML = `
            <div class="bracket-title">Tournament</div>
            <div class="bracket-subtitle">Bracket</div>
        `;
        bracketSection.insertBefore(header, container);
    }
    
    container.innerHTML = bracketRounds.map((round, roundIndex) => `
        <div class="bracket-round">
            <div class="bracket-round-title">${round.title}</div>
            ${round.matches.map(match => `
                <div class="bracket-match ${match.completed ? 'completed' : 'upcoming'}">
                    <div class="bracket-teams">
                        ${match.team1 ? `
                            <div class="bracket-team ${match.completed ? (match.score1 > match.score2 ? 'winner' : 'loser') : ''}">
                                <div class="bracket-team-info">
                                    <span class="bracket-team-logo">${match.team1.logo}</span>
                                    <div>
                                        <div class="bracket-team-name">Team ${match.team1.fullName}</div>
                                        <div class="bracket-team-members">(${match.team1.members.map(m => m.name).join(', ')})</div>
                                    </div>
                                </div>
                                ${match.completed ? `<span class="bracket-team-score">${match.score1}</span>` : ''}
                            </div>
                        ` : `
                            <div class="bracket-team">
                                <div class="bracket-team-info">
                                    <span class="bracket-team-name" style="color: #999; font-style: italic;">Chờ kết quả</span>
                                </div>
                            </div>
                        `}
                        
                        ${match.team2 ? `
                            <div class="bracket-team ${match.completed ? (match.score2 > match.score1 ? 'winner' : 'loser') : ''}">
                                <div class="bracket-team-info">
                                    <span class="bracket-team-logo">${match.team2.logo}</span>
                                    <div>
                                        <div class="bracket-team-name">Team ${match.team2.fullName}</div>
                                        <div class="bracket-team-members">(${match.team2.members.map(m => m.name).join(', ')})</div>
                                    </div>
                                </div>
                                ${match.completed ? `<span class="bracket-team-score">${match.score2}</span>` : ''}
                            </div>
                        ` : `
                            <div class="bracket-team">
                                <div class="bracket-team-info">
                                    <span class="bracket-team-name" style="color: #999; font-style: italic;">Chờ kết quả</span>
                                </div>
                            </div>
                        `}
                    </div>
                    
                    ${match.team1 && match.team2 && !match.completed ? `
                        <div class="bracket-actions">
                            <button class="bracket-enter-score" onclick="openScoreModal(${match.id})">
                                <i class="fas fa-gamepad"></i> Nhập kết quả
                            </button>
                        </div>
                    ` : ''}
                </div>
            `).join('')}
        </div>
    `).join('');
    
    // Thêm trophy cho chung kết
    if (bracketRounds.length > 0) {
        const finalRound = bracketRounds[bracketRounds.length - 1];
        const finalMatch = finalRound.matches[0];
        if (finalMatch && finalMatch.completed) {
            const finalContainer = container.querySelector('.bracket-round:last-child');
            if (finalContainer && !finalContainer.querySelector('.trophy-container')) {
                const trophyDiv = document.createElement('div');
                trophyDiv.className = 'trophy-container';
                trophyDiv.innerHTML = `
                    <div class="trophy-icon">
                        <i class="fas fa-trophy"></i>
                    </div>
                `;
                finalContainer.appendChild(trophyDiv);
            }
        }
    }
}

// Cập nhật bracket sau khi có kết quả
function updateBracketProgression(completedMatch) {
    if (tournamentFormat !== 'knockout') return;
    
    const winner = completedMatch.score1 > completedMatch.score2 ? completedMatch.team1 : completedMatch.team2;
    const currentRound = completedMatch.round;
    const nextRound = currentRound + 1;
    
    // Tìm vòng tiếp theo
    const nextRoundData = bracketRounds.find(r => r.round === nextRound);
    if (!nextRoundData) return; // Đã là chung kết
    
    // Tính toán vị trí trong vòng tiếp theo
    const nextMatchIndex = Math.floor((completedMatch.matchInRound - 1) / 2);
    const nextMatch = nextRoundData.matches[nextMatchIndex];
    
    if (!nextMatch) return;
    
    // Xác định đội thắng vào team1 hay team2 của trận tiếp theo
    const isFirstTeam = (completedMatch.matchInRound - 1) % 2 === 0;
    
    if (isFirstTeam) {
        nextMatch.team1 = winner;
    } else {
        nextMatch.team2 = winner;
    }
    
    // Cập nhật lại matches array
    const matchInArray = matches.find(m => m.id === nextMatch.id);
    if (matchInArray) {
        if (isFirstTeam) {
            matchInArray.team1 = winner;
        } else {
            matchInArray.team2 = winner;
        }
    }
}

// Ghi nhận kết quả
function submitScore(matchId) {
    const score1 = parseInt(document.getElementById('score1').value) || 0;
    const score2 = parseInt(document.getElementById('score2').value) || 0;
    const maxScore = window.currentScoreFormat || 11;
    
    if (isNaN(score1) || isNaN(score2)) {
        alert('Vui lòng nhập điểm số hợp lệ!');
        return;
    }
    
    // Kiểm tra validation theo luật cầu lông
    const result = checkValidWin(score1, score2, maxScore);
    
    if (!result.valid) {
        alert(result.message);
        return;
    }
    
    if (!result.winner) {
        alert('Trận đấu chưa kết thúc! Vui lòng nhập điểm số để có đội thắng.');
        return;
    }
    
    if (score1 === score2) {
        alert('Không thể có trận hòa trong cầu lông!');
        return;
    }
    
    // Cập nhật kết quả trận đấu
    const match = matches.find(m => m.id === matchId);
    match.score1 = score1;
    match.score2 = score2;
    match.completed = true;
    
    if (tournamentFormat === 'round-robin') {
        // Cập nhật điểm cho thể thức vòng tròn
        if (score1 > score2) {
            // Đội 1 thắng
            match.team1.points += 2;
            match.team1.wins += 1;
            match.team2.points += 1;
            match.team2.losses += 1;
        } else {
            // Đội 2 thắng
            match.team2.points += 2;
            match.team2.wins += 1;
            match.team1.points += 1;
            match.team1.losses += 1;
        }
        
        match.team1.matchesPlayed += 1;
        match.team2.matchesPlayed += 1;
    } else {
        // Xử lý thể thức loại trực tiếp
        updateBracketProgression(match);
    }
    
    closeScoreModal();
    displayMatches();
    updateStandings();
    displayBracket();
    
    // Check if tournament is completed
    checkTournamentCompletion();
}

// Cập nhật bảng xếp hạng
function updateStandings() {
    const container = document.getElementById('standingsTable');
    
    if (teams.length === 0 || tournamentFormat !== 'round-robin') {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có dữ liệu xếp hạng</p>';
        return;
    }
    
    // Sắp xếp đội theo điểm số (cao -> thấp), sau đó theo số trận thắng
    const sortedTeams = [...teams].sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        return b.wins - a.wins;
    });
    
    container.innerHTML = `
        <table class="standings-table">
            <thead>
                <tr>
                    <th>Hạng</th>
                    <th>Đội</th>
                    <th>Điểm</th>
                    <th>Thắng</th>
                    <th>Thua</th>
                    <th>Đã đấu</th>
                </tr>
            </thead>
            <tbody>
                ${sortedTeams.map((team, index) => `
                    <tr class="rank-${index + 1 <= 3 ? index + 1 : ''}">
                        <td style="font-weight: 600;">${index + 1}</td>
                        <td class="team-cell">
                            <div class="team-info-table">
                                <div class="team-header-table">
                                    <span class="team-logo-table">${team.logo}</span>
                                    <strong class="team-name-table">Team ${team.fullName}</strong>
                                </div>
                                <div class="team-members-table">
                                    ${team.members.map(member => `
                                        <div class="member-avatar-table" title="${member.name}">
                                            <img src="${member.image}" alt="${member.name}">
                                        </div>
                                    `).join('')}
                                </div>
                            </div>
                        </td>
                        <td style="font-weight: 600; color: #4CAF50;">${team.points}</td>
                        <td>${team.wins}</td>
                        <td>${team.losses}</td>
                        <td>${team.matchesPlayed}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// Reset giải đấu
function resetTournament() {
    if (confirm('Bạn có chắc chắn muốn tạo giải đấu mới? Tất cả dữ liệu hiện tại sẽ bị xóa.')) {
        // Reset trạng thái chọn của tất cả người chơi
        allPlayers.forEach(player => player.selected = false);
        selectedPlayers = [];
        teams = [];
        matches = [];
        bracketRounds = [];
        tournamentFormat = 'round-robin';
        
        // Reset UI tabs
        document.querySelectorAll('.format-tab').forEach(tab => {
            tab.classList.remove('active');
        });
        document.querySelector('[data-format="round-robin"]').classList.add('active');
        
        // Hide tournament summary
        document.getElementById('tournamentSummary').style.display = 'none';
        
        displayPlayerCards();
        updateSelectedCount();
        displayTeams();
        displayMatches();
        updateStandings();
        displayBracket();
        updateFormatDescription();
        updateTournamentLayout();
        updateNavigationButtons();
        
        showStep(1);
    }
}

// Check if tournament is completed
function checkTournamentCompletion() {
    let isCompleted = false;
    
    if (tournamentFormat === 'round-robin') {
        // Round robin is completed when all matches are finished
        isCompleted = matches.length > 0 && matches.every(match => match.completed);
    } else {
        // Knockout is completed when there's a champion
        isCompleted = matches.length > 0 && getKnockoutChampion() !== null;
    }
    
    if (isCompleted) {
        showTournamentSummaryButton();
    }
    
    return isCompleted;
}

// Show tournament summary button
function showTournamentSummaryButton() {
    document.getElementById('tournamentSummary').style.display = 'block';
}

// Get knockout champion
function getKnockoutChampion() {
    const finalMatch = matches.find(match => 
        match.round === 'Chung kết' && match.completed
    );
    
    if (finalMatch) {
        if (finalMatch.score1 > finalMatch.score2) {
            return finalMatch.team1;
        } else if (finalMatch.score2 > finalMatch.score1) {
            return finalMatch.team2;
        }
    }
    
    return null;
}

// Calculate standings for round robin
function calculateStandings() {
    if (tournamentFormat !== 'round-robin') return null;
    
    return [...teams].sort((a, b) => {
        if (b.points !== a.points) {
            return b.points - a.points;
        }
        return b.wins - a.wins;
    });
}

// Save tournament results and show summary
function showTournamentSummary() {
    // Prepare tournament data
    const tournamentData = {
        date: new Date().toISOString(),
        format: tournamentFormat,
        teams: teams,
        matches: matches,
        standings: calculateStandings(),
        champion: tournamentFormat === 'knockout' ? getKnockoutChampion() : null
    };
    
    // Save to localStorage
    localStorage.setItem('tournamentResults', JSON.stringify(tournamentData));
    
    // Open results page
    window.open('results.html', '_blank');
}
