// Dữ liệu toàn cục
let players = [];
let teams = [];
let matches = [];
let currentStep = 1;

// Danh sách tên đội và logo ngẫu nhiên (cool ngầu)
const teamData = [
    { name: "Dark Phoenix", logo: "🔥" },
    { name: "Shadow Dragons", logo: "🐉" },
    { name: "Thunder Wolves", logo: "⚡" },
    { name: "Ice Storm", logo: "❄️" },
    { name: "Blood Moon", logo: "🌙" },
    { name: "Steel Titans", logo: "⚔️" },
    { name: "Venom Strike", logo: "🐍" },
    { name: "Ghost Riders", logo: "👻" },
    { name: "Savage Beasts", logo: "🐅" },
    { name: "Death Angels", logo: "😈" },
    { name: "Storm Breakers", logo: "🌪️" },
    { name: "Fire Demons", logo: "👹" },
    { name: "Black Panthers", logo: "🐆" },
    { name: "Night Hawks", logo: "🦅" },
    { name: "Wild Hunters", logo: "🏹" },
    { name: "Iron Fist", logo: "👊" },
    { name: "Skull Crushers", logo: "💀" },
    { name: "Cyber Ninjas", logo: "🥷" },
    { name: "Laser Sharks", logo: "🦈" },
    { name: "Atomic Bombers", logo: "💣" },
    { name: "Toxic Vipers", logo: "🐍" },
    { name: "War Machine", logo: "🤖" },
    { name: "Lightning Strike", logo: "⚡" },
    { name: "Crimson Blade", logo: "🗡️" }
];

// Khởi tạo
document.addEventListener('DOMContentLoaded', function() {
    showStep(1);
    updatePlayerCount();
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
        nextToStep2.disabled = players.length < 4;
    }
    
    if (nextToStep3) {
        nextToStep3.disabled = teams.length === 0;
    }
}

// Thêm vận động viên
function addPlayer() {
    const nameInput = document.getElementById('playerName');
    const skillSelect = document.getElementById('playerSkill');
    
    const name = nameInput.value.trim();
    const skill = parseInt(skillSelect.value);
    
    if (!name || !skill) {
        alert('Vui lòng nhập đầy đủ tên và trình độ!');
        return;
    }
    
    // Kiểm tra trùng tên
    if (players.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        alert('Tên vận động viên đã tồn tại!');
        return;
    }
    
    // Thêm vận động viên
    players.push({
        id: Date.now(),
        name: name,
        skill: skill
    });
    
    // Reset form
    nameInput.value = '';
    skillSelect.value = '';
    
    // Cập nhật hiển thị
    updatePlayersList();
    updatePlayerCount();
    updateNavigationButtons();
}

// Cập nhật danh sách vận động viên
function updatePlayersList() {
    const container = document.getElementById('playersList');
    
    if (players.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có vận động viên nào</p>';
        return;
    }
    
    container.innerHTML = players.map(player => `
        <div class="player-card">
            <div class="player-info">
                <div class="player-name">${player.name}</div>
                <div class="player-skill skill-${player.skill}">
                    ${getSkillIcon(player.skill)} ${getSkillText(player.skill)}
                </div>
            </div>
            <button class="remove-btn" onclick="removePlayer(${player.id})">
                <i class="fas fa-trash"></i>
            </button>
        </div>
    `).join('');
}

// Xóa vận động viên
function removePlayer(id) {
    players = players.filter(p => p.id !== id);
    updatePlayersList();
    updatePlayerCount();
    updateNavigationButtons();
}

// Cập nhật số lượng vận động viên
function updatePlayerCount() {
    document.getElementById('playerCount').textContent = players.length;
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
    if (players.length < 4) {
        alert('Cần ít nhất 4 vận động viên để tạo đội!');
        return;
    }
    
    if (players.length % 2 !== 0) {
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
    teams = createBalancedTeams([...players]);
    
    // Gán tên và logo ngẫu nhiên cho các đội
    const shuffledTeamData = [...teamData].sort(() => Math.random() - 0.5);
    teams.forEach((team, index) => {
        team.name = shuffledTeamData[index].name;
        team.logo = shuffledTeamData[index].logo;
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

// Hiển thị đội với animation
function displayTeamsWithAnimation() {
    const container = document.getElementById('teamsDisplay');
    
    if (teams.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có đội nào được tạo</p>';
        return;
    }
    
    // Tạo HTML cho các đội
    const teamsHTML = teams.map((team, index) => `
        <div class="team-card team-animate" style="animation-delay: ${index * 0.3}s">
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
    
    container.innerHTML = teamsHTML;
    
    // Thêm class animation sau một chút để trigger animation
    setTimeout(() => {
        document.querySelectorAll('.team-animate').forEach(card => {
            card.classList.add('team-reveal');
        });
    }, 100);
}

// Tạo lịch thi đấu
function generateMatches() {
    if (teams.length < 2) {
        alert('Cần ít nhất 2 đội để tạo lịch thi đấu!');
        return;
    }
    
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
    
    displayMatches();
    updateStandings();
}

// Hiển thị lịch thi đấu
function displayMatches() {
    const container = document.getElementById('matchesList');
    
    if (matches.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; padding: 20px;">Chưa có lịch thi đấu</p>';
        return;
    }
    
    container.innerHTML = matches.map(match => `
        <div class="match-card">
            <div class="match-teams">
                <span><strong>${match.team1.logo} ${match.team1.name}</strong></span>
                <span class="vs">VS</span>
                <span><strong>${match.team2.logo} ${match.team2.name}</strong></span>
            </div>
            
            ${match.completed ? `
                <div class="match-score">
                    <div class="score-display">${match.score1} - ${match.score2}</div>
                    <div style="margin-top: 10px; color: #4CAF50; font-weight: 600;">
                        Đã hoàn thành
                    </div>
                </div>
            ` : `
                <div class="match-actions">
                    <button class="enter-score-btn" onclick="openScoreModal(${match.id})">
                        <i class="fas fa-edit"></i> Nhập điểm
                    </button>
                </div>
            `}
        </div>
    `).join('');
}

// Mở modal nhập điểm
function openScoreModal(matchId) {
    const match = matches.find(m => m.id === matchId);
    if (!match) return;
    
    const modal = document.getElementById('scoreModal');
    const content = document.getElementById('scoreInputContent');
    
    content.innerHTML = `
        <div style="text-align: center; margin-bottom: 20px;">
            <h4>${match.team1.logo} ${match.team1.name} vs ${match.team2.logo} ${match.team2.name}</h4>
        </div>
        
        <div class="score-input-section">
            <h4>${match.team1.logo} ${match.team1.name}</h4>
            <div class="score-inputs">
                <div class="score-control">
                    <button type="button" class="score-btn minus" onclick="changeScore('score1', -1)">−</button>
                    <input type="number" id="score1" min="0" max="11" value="0" readonly>
                    <button type="button" class="score-btn plus" onclick="changeScore('score1', 1)">+</button>
                </div>
                <span>điểm</span>
            </div>
        </div>
        
        <div class="score-input-section">
            <h4>${match.team2.logo} ${match.team2.name}</h4>
            <div class="score-inputs">
                <div class="score-control">
                    <button type="button" class="score-btn minus" onclick="changeScore('score2', -1)">−</button>
                    <input type="number" id="score2" min="0" max="11" value="0" readonly>
                    <button type="button" class="score-btn plus" onclick="changeScore('score2', 1)">+</button>
                </div>
                <span>điểm</span>
            </div>
        </div>
        
        <button class="submit-score-btn" onclick="submitScore(${matchId})">
            <i class="fas fa-check"></i> Xác nhận kết quả
        </button>
    `;
    
    modal.style.display = 'block';
    
    // Focus vào input đầu tiên
    setTimeout(() => {
        document.getElementById('score1').focus();
    }, 100);
}

// Đóng modal
function closeScoreModal() {
    document.getElementById('scoreModal').style.display = 'none';
}

// Thay đổi điểm số
function changeScore(inputId, delta) {
    const input = document.getElementById(inputId);
    let currentValue = parseInt(input.value) || 0;
    let newValue = currentValue + delta;
    
    // Giới hạn từ 0 đến 11
    if (newValue < 0) newValue = 0;
    if (newValue > 11) newValue = 11;
    
    input.value = newValue;
    
    // Hiệu ứng khi thay đổi
    input.style.transform = 'scale(1.1)';
    setTimeout(() => {
        input.style.transform = 'scale(1)';
    }, 150);
}

// Xử lý click bên ngoài modal
window.onclick = function(event) {
    const modal = document.getElementById('scoreModal');
    if (event.target === modal) {
        closeScoreModal();
    }
}

// Ghi nhận kết quả
function submitScore(matchId) {
    const score1 = parseInt(document.getElementById('score1').value);
    const score2 = parseInt(document.getElementById('score2').value);
    
    if (isNaN(score1) || isNaN(score2)) {
        alert('Vui lòng nhập điểm số hợp lệ!');
        return;
    }
    
    if (score1 < 0 || score1 > 11 || score2 < 0 || score2 > 11) {
        alert('Điểm số phải từ 0 đến 11!');
        return;
    }
    
    if (score1 === score2) {
        alert('Không thể có trận hòa! Vui lòng nhập điểm khác nhau.');
        return;
    }
    
    // Cập nhật kết quả trận đấu
    const match = matches.find(m => m.id === matchId);
    match.score1 = score1;
    match.score2 = score2;
    match.completed = true;
    
    // Cập nhật điểm cho các đội
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
    
    closeScoreModal();
    displayMatches();
    updateStandings();
}

// Cập nhật bảng xếp hạng
function updateStandings() {
    const container = document.getElementById('standingsTable');
    
    if (teams.length === 0) {
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
                        <td>
                            <span style="font-size: 1.2rem;">${team.logo}</span>
                            <strong>${team.name}</strong>
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
        players = [];
        teams = [];
        matches = [];
        
        updatePlayersList();
        updatePlayerCount();
        displayTeams();
        displayMatches();
        updateStandings();
        updateNavigationButtons();
        
        showStep(1);
    }
}
