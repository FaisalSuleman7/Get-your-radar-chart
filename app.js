const skills = [
    { skill: "Effective Communication", description: "Quran and Sunnah emphasize clear, respectful communication (e.g., Surah Al-Isra: 53)." },
    { skill: "Financial Literacy", description: "Managing wealth responsibly is an obligation (e.g., avoiding debt and riba)." },
    { skill: "Time Management", description: "Time is an amanah (trust) from Allah; proper management allows for fulfilling obligations like Salah." },
    { skill: "Critical Thinking", description: "Islam encourages reflection and pondering over creation (Surah Al-Imran: 190-191)." },
    { skill: "Emotional Regulation", description: "The Prophet Muhammad (PBUH) taught self-control and patience." },
    { skill: "Conflict Resolution", description: "Resolving disputes justly is a key Islamic value (Surah Al-Hujurat: 9)." },
    { skill: "Basic First Aid", description: "Saving lives is one of the greatest deeds in Islam (Surah Al-Ma'idah: 32)." },
    { skill: "Self-Defense", description: "Islam permits self-defense to protect oneself and others from harm." },
    { skill: "Basic Cooking", description: "Preparing halal and healthy food is a responsibility." },
    { skill: "Digital Literacy", description: "In the modern age, using technology responsibly is essential for dawah and self-improvement." },
    { skill: "Networking", description: "Building a network of righteous companions aligns with the Quranic advice to keep good company." },
    { skill: "Gardening or Growing Plants", description: "The Prophet (PBUH) encouraged planting trees, saying, 'If a Muslim plants a tree, then whatever is eaten from it is charity for him...'" },
    { skill: "Household Repairs", description: "Participating in household work is Sunnah." },
    { skill: "Sewing or Basic Clothing Repairs", description: "The Prophet (PBUH) himself sewed his clothes." },
    { skill: "Driving or Navigating", description: "Enabling oneself to provide help to others or fulfill responsibilities." },
];

let currentSkillIndex = 0;
let skillScores = new Array(skills.length).fill(5); // Default score

function showSkill() {
    if (currentSkillIndex < skills.length) {
        const skill = skills[currentSkillIndex];
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <h3>${skill.skill}</h3>
            <p>${skill.description}</p>
            <input type="range" min="1" max="10" value="${skillScores[currentSkillIndex]}" class="slider" id="slider-${currentSkillIndex}" />
            <span id="score-${currentSkillIndex}">${skillScores[currentSkillIndex]}</span>
        `;
        document.getElementById('skills-list').appendChild(skillItem);
        document.getElementById(`slider-${currentSkillIndex}`).addEventListener('input', (e) => updateSkillScore(e, currentSkillIndex));
        currentSkillIndex++;
    } else {
        showRadarChart();
    }
}

function updateSkillScore(event, index) {
    skillScores[index] = parseInt(event.target.value);
    document.getElementById(`score-${index}`).textContent = skillScores[index];
    showRadarChart(); // Re-render the radar chart
}

function showRadarChart() {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    const radarData = {
        labels: skills.map(skill => skill.skill),
        datasets: [{
            label: 'Skills Proficiency',
            data: skillScores,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };
    
    if (window.radarChart) {
        window.radarChart.data = radarData;
        window.radarChart.update(); // Update the chart smoothly
    } else {
        window.radarChart = new Chart(ctx, {
            type: 'radar',
            data: radarData,
            options: {
                scale: {
                    ticks: {
                        beginAtZero: true,
                        max: 10
                    }
                }
            }
        });
    }
}

function downloadImage() {
    html2canvas(document.getElementById('radar-chart')).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'radar-chart.png';
        link.click();
    });
}

function downloadPDF() {
    const element = document.getElementById('radar-chart');
    html2pdf().from(element).save();
}

document.getElementById('download-btn').addEventListener('click', downloadImage);
document.getElementById('download-pdf-btn').addEventListener('click', downloadPDF);

showSkill();
