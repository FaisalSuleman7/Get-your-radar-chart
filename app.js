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
let skillScores = Array(skills.length).fill(0);

function showSkill() {
    if (currentSkillIndex < skills.length) {
        const skill = skills[currentSkillIndex];
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <h3>Skill ${currentSkillIndex + 1}: ${skill.skill}</h3>
            <p>${skill.description}</p>
            <input type="range" id="slider-${currentSkillIndex}" min="1" max="10" value="5" class="slider">
            <span id="score-${currentSkillIndex}">5</span>
        `;
        document.getElementById('skills-list').appendChild(skillItem);

        const slider = document.getElementById(`slider-${currentSkillIndex}`);
        slider.addEventListener('input', () => {
            document.getElementById(`score-${currentSkillIndex}`).textContent = slider.value;
            skillScores[currentSkillIndex] = slider.value;
        });

        currentSkillIndex++;
    } else {
        showRadarChart();
        document.getElementById('generate-btn').style.display = 'block'; // Show generate button after all skills
        document.getElementById('next-btn').style.display = 'none'; // Hide next button after all skills
    }
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

    const radarChart = new Chart(ctx, {
        type: 'radar',
        data: radarData,
        options: {
            scale: {
                ticks: {
                    beginAtZero: true,
                    max: 10
                }
            }
        });
    });
}

function generatePDF() {
    const canvas = document.getElementById('radar-chart');
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF();
    doc.addImage(imgData, 'PNG', 10, 10, 180, 180); // Add chart as image to PDF
    doc.save('skills_chart.pdf');
}

function generateJPEG() {
    const canvas = document.getElementById('radar-chart');
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'skills_chart.jpg';
    link.click();
}

// Initially hide the generate button and save options
document.getElementById('generate-btn').style.display = 'none';
document.getElementById('save-options').style.display = 'none';

// Add the first skill when the page loads
showSkill();

// Add event listener to next button
document.getElementById('next-btn').addEventListener('click', showSkill);

// Add event listener to generate button
document.getElementById('generate-btn').addEventListener('click', function () {
    const saveOption = document.getElementById('save-format').value;
    if (saveOption === 'pdf') {
        generatePDF();
    } else if (saveOption === 'jpeg') {
        generateJPEG();
    }
});
