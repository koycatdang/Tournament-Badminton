// Tournament Results Management
class TournamentResults {
    constructor() {
        this.tournamentData = null;
        this.init();
    }

    init() {
        // Load tournament data from localStorage
        this.loadTournamentData();
        if (this.tournamentData) {
            this.displayResults();
        } else {
            this.showNoDataMessage();
        }
    }

    loadTournamentData() {
        const data = localStorage.getItem('tournamentResults');
        if (data) {
            this.tournamentData = JSON.parse(data);
        }
    }

    showNoDataMessage() {
        document.querySelector('.container').innerHTML = `
            <header>
                <h1><i class="fas fa-exclamation-triangle"></i> Không Có Dữ Liệu</h1>
                <p>Chưa có giải đấu nào được hoàn thành</p>
            </header>
            <div class="no-data-message">
                <div class="no-data-card">
                    <i class="fas fa-clipboard-list"></i>
                    <h3>Chưa có kết quả giải đấu</h3>
                    <p>Vui lòng hoàn thành một giải đấu trước khi xem kết quả</p>
                    <button class="nav-btn" onclick="window.location.href='index.html'">
                        <i class="fas fa-arrow-left"></i> Về trang chính
                    </button>
                </div>
            </div>
        `;
    }

    displayResults() {
        this.displayTournamentInfo();
        this.displayChampions();
        this.displayFinalStandings();
        this.displayMatchHistory();
        this.displayStatistics();
        this.displayCharts();
        this.displayPlayerPerformance();
    }

    displayTournamentInfo() {
        const data = this.tournamentData;
        document.getElementById('tournamentTitle').textContent = 
            `Giải Cầu Lông ${data.format === 'roundRobin' ? 'Vòng Tròn' : 'Loại Trực Tiếp'}`;
        document.getElementById('tournamentDate').textContent = 
            `📅 ${new Date(data.date).toLocaleDateString('vi-VN')}`;
        document.getElementById('tournamentFormat').textContent = 
            `🏆 ${data.format === 'roundRobin' ? 'Vòng Tròn' : 'Loại Trực Tiếp'}`;
        document.getElementById('tournamentTeams').textContent = 
            `👥 ${data.teams.length} đội tham gia`;
    }

    displayChampions() {
        const champion = this.getChampion();
        const teamworkWinner = this.getTeamworkWinner();
        const mvp = this.getMVP();
        const highScorer = this.getHighScorer();

        // Champion Team
        if (champion) {
            document.getElementById('championTeam').innerHTML = `
                <div class="champion-info">
                    <div class="champion-details">
                        <h4>Team ${champion.fullName}</h4>
                        <div class="champion-members-centered">
                            ${champion.members.length >= 1 ? `
                                <div class="champion-member">
                                    <img src="${champion.members[0].image || champion.members[0].avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjQwIj7wn5Go8J+MqjwvdGV4dD48L3N2Zz4K'}" alt="${champion.members[0].name}">
                                    <span>${champion.members[0].name}</span>
                                </div>
                            ` : ''}
                            <div class="champion-logo-center">${champion.logo}</div>
                            ${champion.members.length >= 2 ? `
                                <div class="champion-member">
                                    <img src="${champion.members[1].image || champion.members[1].avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjQwIj7wn5Go8J+MqjwvdGV4dD48L3N2Zz4K'}" alt="${champion.members[1].name}">
                                    <span>${champion.members[1].name}</span>
                                </div>
                            ` : ''}
                        </div>
                        <div class="champion-stats">
                            <span class="stat">🏆 ${champion.wins || 0} thắng</span>
                            <span class="stat">⚡ ${champion.totalPoints || 0} điểm</span>
                        </div>
                    </div>
                </div>
            `;
        } else {
            document.getElementById('championTeam').innerHTML = `
                <div class="champion-info">
                    <div class="champion-details">
                        <h4>Chưa có vô địch</h4>
                        <div class="champion-members-centered">
                            <div class="champion-logo-center">🏆</div>
                        </div>
                        <div class="champion-stats">
                            <span class="stat">Cần hoàn thành ít nhất 1 trận đấu</span>
                        </div>
                    </div>
                </div>
            `;
        }

        // Awards
        if (teamworkWinner) {
            document.getElementById('teamworkAward').innerHTML = `
                <div class="award-team">
                    <span class="award-logo">${teamworkWinner.logo}</span>
                    <span class="award-name">Team ${teamworkWinner.fullName}</span>
                    <small>Điểm teamwork: ${Math.round(teamworkWinner.teamworkScore)}</small>
                </div>
            `;
        } else {
            document.getElementById('teamworkAward').innerHTML = `
                <div class="award-team">
                    <span class="award-name">Chưa có dữ liệu</span>
                    <small>Cần hoàn thành ít nhất 1 trận đấu</small>
                </div>
            `;
        }

        if (mvp) {
            document.getElementById('mvpAward').innerHTML = `
                <div class="award-player">
                    <img src="${mvp.image || mvp.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjQwIj7wn5Go8J+MqjwvdGV4dD48L3N2Zz4K'}" alt="${mvp.name}">
                    <span class="award-name">${mvp.name}</span>
                    <small>${mvp.totalPoints} điểm tổng</small>
                </div>
            `;
        } else {
            document.getElementById('mvpAward').innerHTML = `
                <div class="award-player">
                    <span class="award-name">Chưa có dữ liệu</span>
                    <small>Cần hoàn thành ít nhất 1 trận đấu</small>
                </div>
            `;
        }

        if (highScorer) {
            document.getElementById('highScoreAward').innerHTML = `
                <div class="award-match">
                    <span class="award-score">${highScorer.score}</span>
                    <small>Trận ${highScorer.match}</small>
                </div>
            `;
        } else {
            document.getElementById('highScoreAward').innerHTML = `
                <div class="award-match">
                    <span class="award-score">0-0</span>
                    <small>Chưa có trận đấu nào hoàn thành</small>
                </div>
            `;
        }
    }

    displayFinalStandings() {
        const standings = this.getFinalStandings();
        const container = document.getElementById('finalStandings');
        
        container.innerHTML = `
            <table class="standings-table-results">
                <thead>
                    <tr>
                        <th>Hạng</th>
                        <th>Đội</th>
                        <th>Trận</th>
                        <th>Thắng</th>
                        <th>Thua</th>
                        <th>Điểm</th>
                    </tr>
                </thead>
                <tbody>
                    ${standings.map((team, index) => `
                        <tr class="rank-${index + 1}">
                            <td class="rank-cell">
                                ${this.getRankIcon(index + 1)} ${index + 1}
                            </td>
                            <td class="team-cell-results">
                                <div class="team-info-results">
                                    <span class="team-logo-results">${team.logo}</span>
                                    <div class="team-details-results">
                                        <div class="team-name-results">Team ${team.fullName}</div>
                                                                <div class="team-members-results">
                            ${team.members.map(member => `
                                <img src="${member.image || member.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjQwIj7wn5Go8J+MqjwvdGV4dD48L3N2Zz4K'}" alt="${member.name}" title="${member.name}">
                            `).join('')}
                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>${team.played || team.matchesPlayed || 0}</td>
                            <td class="wins">${team.wins || 0}</td>
                            <td class="losses">${team.losses || 0}</td>
                            <td class="points">${team.points || 0}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
    }

    displayMatchHistory() {
        const matches = this.tournamentData.matches || [];
        const container = document.getElementById('matchHistory');
        
        container.innerHTML = `
            <div class="match-history-list">
                ${matches.map((match, index) => {
                    // Calculate winner based on scores
                    let winner = null;
                    let winnerTeam = null;
                    if (match.completed && match.score1 !== null && match.score2 !== null) {
                        if (match.score1 > match.score2) {
                            winner = match.team1?.fullName || match.team1?.name;
                            winnerTeam = match.team1;
                        } else if (match.score2 > match.score1) {
                            winner = match.team2?.fullName || match.team2?.name;
                            winnerTeam = match.team2;
                        }
                    }
                    
                    return `
                        <div class="history-match-card ${match.completed ? 'completed' : 'incomplete'}">
                            <div class="match-number">Trận ${index + 1}</div>
                            <div class="match-teams-history">
                                <div class="team-history ${winnerTeam === match.team1 ? 'winner' : ''}">
                                    <span class="team-logo-history">${match.team1?.logo}</span>
                                    <span class="team-name-history">Team ${match.team1?.fullName || match.team1?.name}</span>
                                    <span class="team-score-history">${match.score1 || 0}</span>
                                </div>
                                <div class="vs-history">VS</div>
                                <div class="team-history ${winnerTeam === match.team2 ? 'winner' : ''}">
                                    <span class="team-score-history">${match.score2 || 0}</span>
                                    <span class="team-name-history">Team ${match.team2?.fullName || match.team2?.name}</span>
                                    <span class="team-logo-history">${match.team2?.logo}</span>
                                </div>
                            </div>
                            ${match.completed ? `
                                <div class="match-result">
                                    <i class="fas fa-trophy"></i>
                                    ${winner ? `Thắng: Team ${winner}` : 'Kết quả hòa'}
                                </div>
                                <div class="match-duration">
                                    <i class="fas fa-clock"></i>
                                    ${match.duration || 25} phút
                                </div>
                            ` : '<div class="match-incomplete">Chưa hoàn thành</div>'}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    displayStatistics() {
        const stats = this.calculateStatistics();
        
        document.getElementById('totalMatches').textContent = stats.totalMatches;
        document.getElementById('totalPoints').textContent = stats.totalPoints;
        document.getElementById('avgMatchDuration').textContent = stats.avgDuration;
        
        // Display fastest match with details
        if (typeof stats.fastestMatch === 'object' && stats.fastestMatch !== null) {
            document.getElementById('fastestMatch').innerHTML = `
                <div class="match-detail">
                    <div class="match-time">${stats.fastestMatch.duration}</div>
                    <div class="match-teams">${stats.fastestMatch.teams}</div>
                    <div class="match-score">${stats.fastestMatch.score}</div>
                </div>
            `;
        } else {
            document.getElementById('fastestMatch').textContent = stats.fastestMatch;
        }
        
        // Display longest match with details
        if (typeof stats.longestMatch === 'object' && stats.longestMatch !== null) {
            document.getElementById('longestMatch').innerHTML = `
                <div class="match-detail">
                    <div class="match-time">${stats.longestMatch.duration}</div>
                    <div class="match-teams">${stats.longestMatch.teams}</div>
                    <div class="match-score">${stats.longestMatch.score}</div>
                </div>
            `;
        } else {
            document.getElementById('longestMatch').textContent = stats.longestMatch;
        }
        
        document.getElementById('closestMatch').textContent = stats.closestMatch;
    }

    displayCharts() {
        const matches = this.tournamentData.matches || [];
        const completedMatches = matches.filter(m => m.completed);
        
        // If no completed matches, show message
        if (completedMatches.length === 0) {
            document.querySelector('.charts-analysis-section').innerHTML = `
                <h3><i class="fas fa-chart-pie"></i> Phân Tích Biểu Đồ</h3>
                <div class="no-chart-data">
                    <p>Chưa có dữ liệu trận đấu để tạo biểu đồ</p>
                </div>
            `;
            return;
        }

        this.createWinsLossesChart();
        this.createScoreDistributionChart();
        this.createTeamComparisonChart();
        this.createMatchDurationChart();
    }

    createWinsLossesChart() {
        const standings = this.getFinalStandings();
        const ctx = document.getElementById('winsLossesChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: standings.map(team => team.fullName || team.name),
                datasets: [{
                    label: 'Thắng',
                    data: standings.map(team => team.wins || 0),
                    backgroundColor: '#4CAF50',
                    borderColor: '#388E3C',
                    borderWidth: 1
                }, {
                    label: 'Thua',
                    data: standings.map(team => team.losses || 0),
                    backgroundColor: '#F44336',
                    borderColor: '#D32F2F',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    title: {
                        display: false
                    },
                    legend: {
                        position: 'top'
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    createScoreDistributionChart() {
        const matches = this.tournamentData.matches || [];
        const completedMatches = matches.filter(m => m.completed);
        
        // Calculate score ranges
        const scoreRanges = {
            '0-10': 0,
            '11-15': 0,
            '16-20': 0,
            '21-25': 0,
            '25+': 0
        };
        
        completedMatches.forEach(match => {
            [match.score1 || 0, match.score2 || 0].forEach(score => {
                if (score <= 10) scoreRanges['0-10']++;
                else if (score <= 15) scoreRanges['11-15']++;
                else if (score <= 20) scoreRanges['16-20']++;
                else if (score <= 25) scoreRanges['21-25']++;
                else scoreRanges['25+']++;
            });
        });

        const ctx = document.getElementById('scoreDistributionChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: Object.keys(scoreRanges),
                datasets: [{
                    data: Object.values(scoreRanges),
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#4BC0C0',
                        '#9966FF'
                    ],
                    borderWidth: 2,
                    borderColor: '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                }
            }
        });
    }

    createTeamComparisonChart() {
        const standings = this.getFinalStandings();
        const ctx = document.getElementById('teamComparisonChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Thắng', 'Điểm Số', 'Teamwork', 'Trận Đấu'],
                datasets: standings.slice(0, 4).map((team, index) => {
                    const teamworkScore = this.calculateRealTeamworkScore(team);
                    return {
                        label: team.fullName || team.name,
                        data: [
                            team.wins || 0,
                            (team.totalPoints || 0) / 10, // Scale down for better visualization
                            teamworkScore / 10, // Scale down
                            team.played || team.matchesPlayed || 0
                        ],
                        borderColor: ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0'][index],
                        backgroundColor: ['#4CAF5033', '#2196F333', '#FF980033', '#9C27B033'][index],
                        borderWidth: 2
                    };
                })
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true
                    }
                }
            }
        });
    }

    createMatchDurationChart() {
        const matches = this.tournamentData.matches || [];
        const completedMatches = matches.filter(m => m.completed);
        
        const ctx = document.getElementById('matchDurationChart').getContext('2d');
        
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: completedMatches.map((_, index) => `Trận ${index + 1}`),
                datasets: [{
                    label: 'Thời Gian (phút)',
                    data: completedMatches.map(match => match.duration || 25),
                    borderColor: '#4CAF50',
                    backgroundColor: '#4CAF5033',
                    tension: 0.4,
                    borderWidth: 3,
                    pointRadius: 5,
                    pointBackgroundColor: '#4CAF50'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Thời gian (phút)'
                        }
                    },
                    x: {
                        title: {
                            display: true,
                            text: 'Trận đấu'
                        }
                    }
                }
            }
        });
    }

    displayPlayerPerformance() {
        const playerStats = this.calculatePlayerStats();
        const container = document.getElementById('playerStats');
        
        container.innerHTML = `
            <div class="player-stats-grid">
                ${playerStats.map(player => `
                    <div class="player-stat-card">
                        <div class="player-avatar-stats">
                            <img src="${player.image || player.avatar || 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgdmlld0JveD0iMCAwIDEwMCAxMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNTAiIGN5PSI1MCIgcj0iNTAiIGZpbGw9IiM2NjdlZWEiLz48dGV4dCB4PSI1MCIgeT0iNjAiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGZpbGw9IndoaXRlIiBmb250LXNpemU9IjQwIj7wn5Go8J+MqjwvdGV4dD48L3N2Zz4K'}" alt="${player.name}">
                        </div>
                        <div class="player-info-stats">
                            <h4>${player.name}</h4>
                            <div class="player-team-stats">Team ${player.teamFullName}</div>
                        </div>
                        <div class="player-numbers">
                            <div class="stat-item-player">
                                <span class="stat-value-player">${player.matches}</span>
                                <span class="stat-label-player">Trận đấu</span>
                            </div>
                            <div class="stat-item-player">
                                <span class="stat-value-player">${player.wins}</span>
                                <span class="stat-label-player">Thắng</span>
                            </div>
                            <div class="stat-item-player">
                                <span class="stat-value-player">${player.totalPoints}</span>
                                <span class="stat-label-player">Tổng điểm</span>
                            </div>
                            <div class="stat-item-player">
                                <span class="stat-value-player">${player.mvpCount || 0}</span>
                                <span class="stat-label-player">MVP trận</span>
                            </div>
                            <div class="stat-item-player">
                                <span class="stat-value-player">${player.avgPoints}</span>
                                <span class="stat-label-player">TB/trận</span>
                            </div>
                            ${player.mvpCount > 0 ? `
                                <div class="stat-item-player mvp-bonus">
                                    <span class="stat-value-player">+${player.mvpBonus || 0}</span>
                                    <span class="stat-label-player">Bonus MVP</span>
                                </div>
                            ` : ''}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Helper methods
    getChampion() {
        // Check if tournament is actually completed
        const matches = this.tournamentData.matches || [];
        const hasCompletedMatches = matches.some(m => m.completed);
        
        if (!hasCompletedMatches) {
            return null; // No champion if no matches completed
        }
        
        if (this.tournamentData.format === 'knockout') {
            return this.tournamentData.champion;
        } else {
            const standings = this.getFinalStandings();
            // Only return champion if they have actually played matches
            const champion = standings[0];
            if (champion && (champion.wins > 0 || champion.losses > 0)) {
                return champion;
            }
            return null;
        }
    }

    getTeamworkWinner() {
        const teams = this.tournamentData.teams || [];
        if (teams.length === 0) return null;
        
        // Check if any matches have been played
        const matches = this.tournamentData.matches || [];
        const hasCompletedMatches = matches.some(m => m.completed);
        
        if (!hasCompletedMatches) {
            // If no matches completed, pick team with best skill balance
            return teams.reduce((best, team) => {
                const teamworkScore = this.calculateTeamworkScore(team);
                if (!best || teamworkScore > best.teamworkScore) {
                    return { ...team, teamworkScore };
                }
                return best;
            }, null);
        }
        
        // If matches completed, calculate teamwork based on performance
        return teams.reduce((best, team) => {
            const teamworkScore = this.calculateRealTeamworkScore(team);
            if (!best || teamworkScore > best.teamworkScore) {
                return { ...team, teamworkScore };
            }
            return best;
        }, null);
    }

    getMVP() {
        const matches = this.tournamentData.matches || [];
        const hasCompletedMatches = matches.some(m => m.completed);
        
        if (!hasCompletedMatches) {
            return null; // No MVP if no matches completed
        }
        
        const allPlayers = [];
        this.tournamentData.teams.forEach(team => {
            team.members.forEach(member => {
                const stats = this.getPlayerStats(member.name);
                allPlayers.push({
                    ...member,
                    ...stats
                });
            });
        });
        
        return allPlayers.reduce((mvp, player) => {
            if (!mvp || player.totalPoints > mvp.totalPoints) {
                return player;
            }
            return mvp;
        }, null);
    }

    getHighScorer() {
        const matches = this.tournamentData.matches || [];
        const completedMatches = matches.filter(m => m.completed);
        
        if (completedMatches.length === 0) {
            return null; // No high score if no matches completed
        }
        
        let highestScore = 0;
        let highestMatch = null;
        
        completedMatches.forEach((match, index) => {
            const score1 = match.score1 || 0;
            const score2 = match.score2 || 0;
            const maxScore = Math.max(score1, score2);
            
            if (maxScore > highestScore) {
                highestScore = maxScore;
                highestMatch = {
                    score: `${score1}-${score2}`,
                    match: `Team ${match.team1?.fullName || match.team1?.name} vs Team ${match.team2?.fullName || match.team2?.name}`
                };
            }
        });
        
        return highestMatch;
    }

    getFinalStandings() {
        if (this.tournamentData.format === 'knockout') {
            // For knockout, create standings based on elimination rounds
            return this.createKnockoutStandings();
        } else {
            // For round robin, calculate standings with matches played
            const standings = this.tournamentData.standings || [];
            const matches = this.tournamentData.matches || [];
            
                         // Add played matches count for each team
             return standings.map(team => {
                 const teamMatches = matches.filter(m => 
                     m.completed && (
                         m.team1?.name === team.name || m.team2?.name === team.name
                     )
                 );
                 
                 return {
                     ...team,
                     played: teamMatches.length,
                     matchesPlayed: team.matchesPlayed || teamMatches.length
                 };
             });
        }
    }

    createKnockoutStandings() {
        const teams = this.tournamentData.teams || [];
        const matches = this.tournamentData.matches || [];
        
        return teams.map(team => {
            // Find all matches involving this team
            const teamMatches = matches.filter(m => 
                (m.team1?.name === team.name || m.team2?.name === team.name) && m.completed
            );
            
            const wins = teamMatches.filter(m => m.winner === team.name).length;
            const losses = teamMatches.filter(m => 
                m.winner && m.winner !== team.name
            ).length;
            
            const totalPoints = teamMatches.reduce((sum, match) => {
                if (match.team1?.name === team.name) {
                    return sum + (match.score1 || 0);
                } else if (match.team2?.name === team.name) {
                    return sum + (match.score2 || 0);
                }
                return sum;
            }, 0);
            
            return {
                ...team,
                played: teamMatches.length, // Count only completed matches
                matchesPlayed: team.matchesPlayed || teamMatches.length,
                wins,
                losses,
                points: wins * 2 + losses,
                totalPoints
            };
        }).sort((a, b) => {
            if (b.wins !== a.wins) return b.wins - a.wins;
            return b.totalPoints - a.totalPoints;
        });
    }

    calculateTeamworkScore(team) {
        // Calculate teamwork based on skill balance and performance
        const skillSum = team.members.reduce((sum, member) => sum + member.skill, 0);
        const avgSkill = skillSum / team.members.length;
        const skillVariance = team.members.reduce((sum, member) => 
            sum + Math.pow(member.skill - avgSkill, 2), 0) / team.members.length;
        
        // Lower variance = better teamwork
        return Math.max(0, 100 - skillVariance * 20);
    }

    calculateRealTeamworkScore(team) {
        // Calculate teamwork based on actual match performance
        const matches = this.tournamentData.matches || [];
        const teamMatches = matches.filter(m => 
            m.completed && (
                (m.team1?.name === team.name) || 
                (m.team2?.name === team.name)
            )
        );
        
        if (teamMatches.length === 0) {
            return this.calculateTeamworkScore(team);
        }
        
        // Calculate consistency in performance
        const scores = teamMatches.map(match => {
            if (match.team1?.name === team.name) {
                return match.score1 || 0;
            }
            return match.score2 || 0;
        });
        
        const avgScore = scores.reduce((sum, score) => sum + score, 0) / scores.length;
        const variance = scores.reduce((sum, score) => 
            sum + Math.pow(score - avgScore, 2), 0) / scores.length;
        
        // Lower variance = better teamwork (more consistent)
        const consistencyScore = Math.max(0, 100 - variance);
        const skillBalanceScore = this.calculateTeamworkScore(team);
        
        // Combine both factors
        return (consistencyScore * 0.6 + skillBalanceScore * 0.4);
    }

    getPlayerStats(playerName) {
        const matches = this.tournamentData.matches || [];
        let totalPoints = 0;
        let wins = 0;
        let matchCount = 0;
        let mvpCount = 0;
        
        matches.forEach(match => {
            if (match.completed) {
                const isInTeam1 = match.team1?.members.some(m => m.name === playerName);
                const isInTeam2 = match.team2?.members.some(m => m.name === playerName);
                
                if (isInTeam1 || isInTeam2) {
                    matchCount++;
                    
                    if (isInTeam1) {
                        totalPoints += match.score1 || 0;
                        if (match.winner === match.team1?.name) wins++;
                    } else {
                        totalPoints += match.score2 || 0;
                        if (match.winner === match.team2?.name) wins++;
                    }
                    
                    // Kiểm tra nếu người chơi được chọn làm MVP trận này
                    if (match.mvp && match.mvp.name === playerName) {
                        mvpCount++;
                        totalPoints += 10; // Cộng thêm 10 điểm cho MVP
                    }
                }
            }
        });
        
        return {
            matches: matchCount,
            wins,
            totalPoints,
            mvpCount,
            mvpBonus: mvpCount * 10,
            avgPoints: matchCount > 0 ? Math.round(totalPoints / matchCount * 10) / 10 : 0
        };
    }

    calculatePlayerStats() {
        const allPlayers = [];
        
        this.tournamentData.teams.forEach(team => {
            team.members.forEach(member => {
                const stats = this.getPlayerStats(member.name);
                allPlayers.push({
                    ...member,
                    teamName: team.name,
                    teamFullName: team.fullName,
                    ...stats
                });
            });
        });
        
        return allPlayers.sort((a, b) => b.totalPoints - a.totalPoints);
    }

    calculateStatistics() {
        const matches = this.tournamentData.matches || [];
        const completedMatches = matches.filter(m => m.completed);
        
        // If no completed matches, return zeros
        if (completedMatches.length === 0) {
            return {
                totalMatches: 0,
                totalPoints: 0,
                avgDuration: '0 phút',
                fastestMatch: '0 phút',
                longestMatch: '0 phút',
                closestMatch: '0-0'
            };
        }
        
        const totalPoints = completedMatches.reduce((sum, match) => 
            sum + (match.score1 || 0) + (match.score2 || 0), 0);
        
        // Calculate average duration from actual match data
        const durations = completedMatches.map(match => match.duration || 25);
        const totalDuration = durations.reduce((sum, duration) => sum + duration, 0);
        const avgDuration = Math.round(totalDuration / completedMatches.length);
        
        // Find fastest and longest matches with match details
        let fastestMatch = null;
        let longestMatch = null;
        let minDuration = Infinity;
        let maxDuration = -1;
        
        completedMatches.forEach(match => {
            const duration = match.duration || 25;
            
            if (duration < minDuration) {
                minDuration = duration;
                fastestMatch = match;
            }
            
            if (duration > maxDuration) {
                maxDuration = duration;
                longestMatch = match;
            }
        });
        
        let closestMatch = '0-0';
        let minDifference = Infinity;
        
        completedMatches.forEach(match => {
            const diff = Math.abs((match.score1 || 0) - (match.score2 || 0));
            if (diff < minDifference) {
                minDifference = diff;
                closestMatch = `${match.score1 || 0}-${match.score2 || 0}`;
            }
        });
        
        return {
            totalMatches: completedMatches.length,
            totalPoints,
            avgDuration: `${avgDuration} phút`,
            fastestMatch: fastestMatch ? {
                duration: `${minDuration} phút`,
                teams: `${fastestMatch.team1?.fullName || fastestMatch.team1?.name} vs ${fastestMatch.team2?.fullName || fastestMatch.team2?.name}`,
                score: `${fastestMatch.score1 || 0}-${fastestMatch.score2 || 0}`
            } : '0 phút',
            longestMatch: longestMatch ? {
                duration: `${maxDuration} phút`,
                teams: `${longestMatch.team1?.fullName || longestMatch.team1?.name} vs ${longestMatch.team2?.fullName || longestMatch.team2?.name}`,
                score: `${longestMatch.score1 || 0}-${longestMatch.score2 || 0}`
            } : '0 phút',
            closestMatch
        };
    }

    getRankIcon(rank) {
        switch(rank) {
            case 1: return '🥇';
            case 2: return '🥈';
            case 3: return '🥉';
            default: return '🏅';
        }
    }
}

// Export functionality
// Hàm export tổng quát
function showLoadingOverlay(message) {
    const overlay = document.createElement('div');
    overlay.className = 'export-loading';
    overlay.innerHTML = `
        <div class="spinner"></div>
        <h3>Đang xử lý...</h3>
        <p>${message}</p>
    `;
    document.body.appendChild(overlay);
    return overlay;
}

function hideLoadingOverlay(overlay) {
    if (overlay && overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
    }
}

// Hàm thay thế hình ảnh bằng placeholder để tránh CORS
function replaceImagesWithPlaceholders() {
    const images = document.querySelectorAll('img');
    const originalSources = [];
    
    images.forEach((img, index) => {
        originalSources[index] = img.src;
        
        // Tạo canvas để vẽ placeholder
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // Lấy kích thước của img
        const rect = img.getBoundingClientRect();
        canvas.width = rect.width || 100;
        canvas.height = rect.height || 100;
        
        // Vẽ background
        ctx.fillStyle = '#e0e0e0';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Vẽ viền
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 2;
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        
        // Vẽ icon người
        ctx.fillStyle = '#888';
        ctx.font = `${Math.min(canvas.width, canvas.height) * 0.4}px Arial`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('👤', canvas.width / 2, canvas.height / 2);
        
        // Thay thế src
        img.src = canvas.toDataURL();
    });
    
    return originalSources;
}

// Hàm khôi phục hình ảnh gốc
function restoreOriginalImages(originalSources) {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
        if (originalSources[index]) {
            img.src = originalSources[index];
        }
    });
}

// Export sang PDF
async function exportToPDF() {
    const overlay = showLoadingOverlay('Đang tạo file PDF từ trang kết quả...');
    
    try {
        // Ẩn navigation buttons và thay thế hình ảnh
        const navigation = document.querySelector('.results-navigation');
        navigation.style.display = 'none';
        
        // Thay thế hình ảnh bằng placeholder để tránh CORS
        const originalSources = replaceImagesWithPlaceholders();
        
        // Đợi một chút để DOM cập nhật
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Chụp toàn bộ container
        const container = document.querySelector('.container');
        const canvas = await html2canvas(container, {
            scale: 2, // Độ phân giải cao hơn
            useCORS: false, // Tắt CORS vì đã dùng placeholder
            allowTaint: true,
            backgroundColor: '#f8f9fa',
            logging: false,
            letterRendering: true
        });
        
        // Khôi phục hình ảnh gốc và hiện lại navigation
        restoreOriginalImages(originalSources);
        navigation.style.display = 'flex';
        
        // Tạo PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF('p', 'mm', 'a4');
        
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width in mm
        const pageHeight = 295; // A4 height in mm
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        let heightLeft = imgHeight;
        let position = 0;
        
        // Thêm trang đầu tiên
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
        
        // Thêm các trang tiếp theo nếu nội dung dài
        while (heightLeft >= 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
            heightLeft -= pageHeight;
        }
        
        // Tạo tên file với thời gian
        const now = new Date();
        const dateStr = now.toLocaleDateString('vi-VN').replace(/\//g, '-');
        const timeStr = now.toLocaleTimeString('vi-VN', { hour12: false }).replace(/:/g, '-');
        const fileName = `Ket-Qua-Giai-Dau-${dateStr}_${timeStr}.pdf`;
        
        // Tải xuống
        pdf.save(fileName);
        
        hideLoadingOverlay(overlay);
        
        // Thông báo thành công
        setTimeout(() => {
            alert('✅ Đã tải xuống PDF thành công!');
        }, 500);
        
    } catch (error) {
        hideLoadingOverlay(overlay);
        console.error('Lỗi khi tạo PDF:', error);
        alert('❌ Có lỗi xảy ra khi tạo PDF. Vui lòng thử lại!');
        
        // Hiện lại navigation nếu có lỗi
        const navigation = document.querySelector('.results-navigation');
        navigation.style.display = 'flex';
        
        // Thử khôi phục hình ảnh nếu có lỗi
        try {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src.startsWith('data:image')) {
                    // Nếu là placeholder, thử tải lại
                    img.src = img.getAttribute('alt') || '';
                }
            });
        } catch (restoreError) {
            console.log('Không thể khôi phục hình ảnh:', restoreError);
        }
    }
}

// Export sang hình ảnh
async function exportToImage() {
    const overlay = showLoadingOverlay('Đang tạo hình ảnh từ trang kết quả...');
    
    try {
        // Ẩn navigation buttons và thay thế hình ảnh
        const navigation = document.querySelector('.results-navigation');
        navigation.style.display = 'none';
        
        // Thay thế hình ảnh bằng placeholder để tránh CORS
        const originalSources = replaceImagesWithPlaceholders();
        
        // Đợi một chút để DOM cập nhật
        await new Promise(resolve => setTimeout(resolve, 100));
        
        // Chụp toàn bộ container
        const container = document.querySelector('.container');
        const canvas = await html2canvas(container, {
            scale: 3, // Độ phân giải rất cao cho hình ảnh
            useCORS: false, // Tắt CORS vì đã dùng placeholder
            allowTaint: true,
            backgroundColor: '#f8f9fa',
            logging: false,
            letterRendering: true
        });
        
        // Khôi phục hình ảnh gốc và hiện lại navigation
        restoreOriginalImages(originalSources);
        navigation.style.display = 'flex';
        
        // Tạo link download
        const link = document.createElement('a');
        link.download = `Ket-Qua-Giai-Dau-${new Date().toLocaleDateString('vi-VN').replace(/\//g, '-')}.png`;
        link.href = canvas.toDataURL('image/png', 1.0); // Chất lượng cao nhất
        
        // Trigger download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        hideLoadingOverlay(overlay);
        
        // Thông báo thành công
        setTimeout(() => {
            alert('✅ Đã tải xuống hình ảnh thành công!');
        }, 500);
        
    } catch (error) {
        hideLoadingOverlay(overlay);
        console.error('Lỗi khi tạo hình ảnh:', error);
        alert('❌ Có lỗi xảy ra khi tạo hình ảnh. Vui lòng thử lại!');
        
        // Hiện lại navigation nếu có lỗi
        const navigation = document.querySelector('.results-navigation');
        navigation.style.display = 'flex';
        
        // Thử khôi phục hình ảnh nếu có lỗi
        try {
            const images = document.querySelectorAll('img');
            images.forEach(img => {
                if (img.src.startsWith('data:image')) {
                    // Nếu là placeholder, thử tải lại
                    img.src = img.getAttribute('alt') || '';
                }
            });
        } catch (restoreError) {
            console.log('Không thể khôi phục hình ảnh:', restoreError);
        }
    }
}

// Hàm cũ để tương thích
function exportResults() {
    exportToPDF();
}

// Clear tournament data
function clearTournamentData() {
    if (confirm('Bạn có chắc chắn muốn xóa tất cả dữ liệu giải đấu? Hành động này không thể hoàn tác.')) {
        localStorage.removeItem('tournamentResults');
        alert('✅ Đã xóa dữ liệu thành công!');
        location.reload();
    }
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new TournamentResults();
}); 