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
let skillsScores = new Array(skills.length).fill(5); // default score to 5 for each skill

// Display the current skill and description with slider
function showSkill() {
    if (currentSkillIndex < skills.length) {
        const skill = skills[currentSkillIndex];
        document.getElementById('skill-name').innerText = skill.skill;
        document.getElementById('skill-description').innerText = skill.description;
        const slider = document.getElementById('skill-slider');
        slider.value = skillsScores[currentSkillIndex];  // Set slider to the current score
        document.getElementById('slider-value').innerText = skillsScores[currentSkillIndex]; // Show the score next to slider

        // Show the next button
        document.getElementById('next-btn').style.display = 'inline';
    } else {
        document.getElementById('skill-container').style.display = 'none';
        document.getElementById('radar-chart-container').style.display = 'block';
        generateRadarChart(); // Show the radar chart once all skills are rated
    }
}

// Handle slider change
document.getElementById('skill-slider').addEventListener('input', (event) => {
    const sliderValue = event.target.value;
    document.getElementById('slider-value').innerText = sliderValue;
    skillsScores[currentSkillIndex] = sliderValue; // Update the score for the current skill
});

// Handle Next button click
document.getElementById('next-btn').addEventListener('click', () => {
    currentSkillIndex++;
    showSkill();
});

// Generate the radar chart based on the user scores
function generateRadarChart() {
    const ctx = document.getElementById('radar-chart').getContext('2d');
    const radarData = {
        labels: skills.map(skill => skill.skill),
        datasets: [{
            label: 'Skills Proficiency',
            data: skillsScores,
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
        }
    });

    // Show download buttons after chart is generated
    document.getElementById('download-btn').style.display = 'inline';
    document.getElementById('download-pdf-btn').style.display = 'inline';
}

// Save as PNG
document.getElementById('download-btn').addEventListener('click', () => {
    const canvas = document.getElementById('radar-chart');
    const imageUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'skills-radar-chart.png';
    link.click();
});

// Save as PDF
document.getElementById('download-pdf-btn').addEventListener('click', () => {
    const canvas = document.getElementById('radar-chart');
    const imgData = canvas.toDataURL('image/png');
    const doc = new jsPDF();
    doc.addImage(imgData, 'PNG', 10, 10);
    doc.save('skills-radar-chart.pdf');
});

showSkill(); // Initial call to show the first skill
