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
                    <div class="champion-logo">${champion.logo}</div>
                    <div class="champion-details">
                        <h4>${champion.name}</h4>
                        <div class="champion-members">
                            ${champion.members.map(member => `
                                <div class="champion-member">
                                    <img src="${member.avatar}" alt="${member.name}">
                                    <span>${member.name}</span>
                                </div>
                            `).join('')}
                        </div>
                        <div class="champion-stats">
                            <span class="stat">🏆 ${champion.wins || 0} thắng</span>
                            <span class="stat">⚡ ${champion.totalPoints || 0} điểm</span>
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
                    <span class="award-name">${teamworkWinner.name}</span>
                    <small>Điểm teamwork: ${Math.round(teamworkWinner.teamworkScore)}</small>
                </div>
            `;
        }

        if (mvp) {
            document.getElementById('mvpAward').innerHTML = `
                <div class="award-player">
                    <img src="${mvp.avatar}" alt="${mvp.name}">
                    <span class="award-name">${mvp.name}</span>
                    <small>${mvp.totalPoints} điểm tổng</small>
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
                                        <div class="team-name-results">${team.name}</div>
                                        <div class="team-members-results">
                                            ${team.members.map(member => `
                                                <img src="${member.avatar}" alt="${member.name}" title="${member.name}">
                                            `).join('')}
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>${team.played || 0}</td>
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
                ${matches.map((match, index) => `
                    <div class="history-match-card ${match.completed ? 'completed' : 'incomplete'}">
                        <div class="match-number">Trận ${index + 1}</div>
                        <div class="match-teams-history">
                            <div class="team-history ${match.winner === match.team1?.name ? 'winner' : ''}">
                                <span class="team-logo-history">${match.team1?.logo}</span>
                                <span class="team-name-history">${match.team1?.name}</span>
                                <span class="team-score-history">${match.score1 || 0}</span>
                            </div>
                            <div class="vs-history">VS</div>
                            <div class="team-history ${match.winner === match.team2?.name ? 'winner' : ''}">
                                <span class="team-score-history">${match.score2 || 0}</span>
                                <span class="team-name-history">${match.team2?.name}</span>
                                <span class="team-logo-history">${match.team2?.logo}</span>
                            </div>
                        </div>
                        ${match.completed ? `
                            <div class="match-result">
                                <i class="fas fa-trophy"></i>
                                Thắng: ${match.winner}
                            </div>
                        ` : '<div class="match-incomplete">Chưa hoàn thành</div>'}
                    </div>
                `).join('')}
            </div>
        `;
    }

    displayStatistics() {
        const stats = this.calculateStatistics();
        
        document.getElementById('totalMatches').textContent = stats.totalMatches;
        document.getElementById('totalPoints').textContent = stats.totalPoints;
        document.getElementById('avgMatchDuration').textContent = stats.avgDuration;
        document.getElementById('closestMatch').textContent = stats.closestMatch;
    }

    displayPlayerPerformance() {
        const playerStats = this.calculatePlayerStats();
        const container = document.getElementById('playerStats');
        
        container.innerHTML = `
            <div class="player-stats-grid">
                ${playerStats.map(player => `
                    <div class="player-stat-card">
                        <div class="player-avatar-stats">
                            <img src="${player.avatar}" alt="${player.name}">
                        </div>
                        <div class="player-info-stats">
                            <h4>${player.name}</h4>
                            <div class="player-team-stats">${player.teamName}</div>
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
                                <span class="stat-value-player">${player.avgPoints}</span>
                                <span class="stat-label-player">TB/trận</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    // Helper methods
    getChampion() {
        if (this.tournamentData.format === 'knockout') {
            return this.tournamentData.champion;
        } else {
            const standings = this.getFinalStandings();
            return standings[0];
        }
    }

    getTeamworkWinner() {
        const teams = this.tournamentData.teams || [];
        return teams.reduce((best, team) => {
            const teamworkScore = this.calculateTeamworkScore(team);
            if (!best || teamworkScore > best.teamworkScore) {
                return { ...team, teamworkScore };
            }
            return best;
        }, null);
    }

    getMVP() {
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
        let highestScore = 0;
        let highestMatch = null;
        
        matches.forEach((match, index) => {
            const score1 = match.score1 || 0;
            const score2 = match.score2 || 0;
            const maxScore = Math.max(score1, score2);
            
            if (maxScore > highestScore) {
                highestScore = maxScore;
                highestMatch = {
                    score: `${score1}-${score2}`,
                    match: `${match.team1?.name} vs ${match.team2?.name}`
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
            // For round robin, use existing standings
            return this.tournamentData.standings || [];
        }
    }

    createKnockoutStandings() {
        const teams = this.tournamentData.teams || [];
        const matches = this.tournamentData.matches || [];
        
        return teams.map(team => {
            const teamMatches = matches.filter(m => 
                m.team1?.name === team.name || m.team2?.name === team.name
            );
            
            const wins = teamMatches.filter(m => m.winner === team.name).length;
            const losses = teamMatches.filter(m => 
                m.completed && m.winner !== team.name
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
                played: teamMatches.filter(m => m.completed).length,
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

    getPlayerStats(playerName) {
        const matches = this.tournamentData.matches || [];
        let totalPoints = 0;
        let wins = 0;
        let matchCount = 0;
        
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
                }
            }
        });
        
        return {
            matches: matchCount,
            wins,
            totalPoints,
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
                    ...stats
                });
            });
        });
        
        return allPlayers.sort((a, b) => b.totalPoints - a.totalPoints);
    }

    calculateStatistics() {
        const matches = this.tournamentData.matches || [];
        const completedMatches = matches.filter(m => m.completed);
        
        const totalPoints = completedMatches.reduce((sum, match) => 
            sum + (match.score1 || 0) + (match.score2 || 0), 0);
        
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
            avgDuration: '25 phút', // Placeholder
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
function exportResults() {
    const tournamentData = JSON.parse(localStorage.getItem('tournamentResults') || '{}');
    
    // Create a simple text export
    let exportText = `=== KẾT QUẢ GIẢI ĐẤU CẦU LÔNG ===\n`;
    exportText += `Ngày: ${new Date(tournamentData.date).toLocaleDateString('vi-VN')}\n`;
    exportText += `Thể thức: ${tournamentData.format === 'roundRobin' ? 'Vòng Tròn' : 'Loại Trực Tiếp'}\n`;
    exportText += `Số đội: ${tournamentData.teams?.length || 0}\n\n`;
    
    // Add champion
    const results = new TournamentResults();
    const champion = results.getChampion();
    if (champion) {
        exportText += `🏆 ĐỘI VÔ ĐỊCH: ${champion.name}\n`;
        exportText += `Thành viên: ${champion.members.map(m => m.name).join(', ')}\n\n`;
    }
    
    // Download as text file
    const blob = new Blob([exportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ket-qua-giai-dau-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    new TournamentResults();
}); 