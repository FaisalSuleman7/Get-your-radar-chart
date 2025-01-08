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

function showSkill() {
    if (currentSkillIndex < skills.length) {
        const skill = skills[currentSkillIndex];
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <h3>Skill ${currentSkillIndex + 1}: ${skill.skill}</h3>
            <p>${skill.description}</p>
            <input type="range" min="1" max="10" value="5" class="slider" id="slider-${currentSkillIndex}">
        `;
        document.getElementById('skills-list').appendChild(skillItem);
        currentSkillIndex++;
    } else {
        document.getElementById('generate-chart-button').style.display = 'block';
    }
}

function generateSpiderChart() {
    const scores = [];
    for (let i = 0; i < skills.length; i++) {
        const slider = document.getElementById(`slider-${i}`);
        scores.push(slider.value);
    }

    const ctx = document.getElementById('radar-chart').getContext('2d');
    const radarData = {
        labels: skills.map(skill => skill.skill),
        datasets: [{
            label: 'Skills Proficiency',
            data: scores, // User-selected scores
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgba(255, 99, 132, 1)',
            borderWidth: 1
        }]
    };

    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: radarData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 10,
                    stepSize: 1
                },
                angleLines: {
                    color: 'rgba(255, 99, 132, 0.2)'
                }
            },
            elements: {
                line: {
                    tension: 0.3
                }
            }
        }
    });

    // Show the spider chart
    document.getElementById('radar-chart-container').style.display = 'block';
    document.getElementById('generate-chart-button').style.display = 'none';
    document.getElementById('save-options-container').style.display = 'block';
}

function saveChart() {
    const saveOption = document.getElementById('save-option').value;
    const canvas = document.getElementById('radar-chart');

    if (saveOption === 'pdf') {
        // Use jsPDF to save as PDF
        const doc = new jsPDF();
        doc.addImage(canvas.toDataURL('image/png'), 'PNG', 10, 10, 180, 180);
        doc.save('skills-radar-chart.pdf');
    } else {
        const link = document.createElement('a');
        link.href = canvas.toDataURL(`image/${saveOption}`);
        link.download = `skills-radar-chart.${saveOption}`;
        link.click();
    }
}

showSkill();
setInterval(showSkill, 3000); // Show each skill every 3 seconds
