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

let skillScores = Array(skills.length).fill(5);  // Default value of 5 for each skill
let chartGenerated = false;

// Function to display the skills with sliders
function showSkills() {
    const skillsListContainer = document.getElementById('skills-list');
    skillsListContainer.innerHTML = ''; // Clear the list before rendering

    skills.forEach((skill, index) => {
        const skillItem = document.createElement('div');
        skillItem.classList.add('skill-item');
        skillItem.innerHTML = `
            <h3>Skill ${index + 1}: ${skill.skill}</h3>
            <p>${skill.description}</p>
            <input type="range" id="slider-${index}" min="1" max="10" value="5" class="slider">
            <span id="score-${index}">5</span>
        `;
        skillsListContainer.appendChild(skillItem);

        const slider = document.getElementById(`slider-${index}`);
        slider.addEventListener('input', () => {
            document.getElementById(`score-${index}`).textContent = slider.value;
            skillScores[index] = slider.value;
            if (chartGenerated) {
                showRadarChart(); // Update the chart immediately when slider changes
            }
        });
    });

    // Generate the chart with default values once the skills are shown
    showRadarChart();
}

// Function to generate the radar chart
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
        window.radarChart.destroy();  // Destroy the previous chart before generating a new one
    }

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

    chartGenerated = true; // Mark chart as generated
    document.getElementById('save-options').style.display = 'block'; // Show save options after chart is generated
}

// Function to generate PDF
function generatePDF() {
    const canvas = document.getElementById('radar-chart');
    const imgData = canvas.toDataURL('image/png');

    const doc = new jsPDF();
    doc.addImage(imgData, 'PNG', 10, 10, 180, 180); // Add chart as image to PDF
    doc.save('skills_chart.pdf');
}

// Function to generate JPEG
function generateJPEG() {
    const canvas = document.getElementById('radar-chart');
    const imgData = canvas.toDataURL('image/jpeg', 1.0);

    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'skills_chart.jpg';
    link.click();
}

// Function to generate PNG
function generatePNG() {
    const canvas = document.getElementById('radar-chart');
    const imgData = canvas.toDataURL('image/png');

    const link = document.createElement('a');
    link.href = imgData;
    link.download = 'skills_chart.png';
    link.click();
}

// Event listeners for the save options
document.getElementById('save-btn').addEventListener('click', function () {
    const saveOption = document.getElementById('save-format').value;
    if (saveOption === 'pdf') {
        generatePDF();
    } else if (saveOption === 'jpeg') {
        generateJPEG();
    } else if (saveOption === 'png') {
        generatePNG();
    }
});

// Show skills and generate the initial chart
showSkills();
