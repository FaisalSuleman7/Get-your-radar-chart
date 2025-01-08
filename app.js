const ctx = document.getElementById('radarChart').getContext('2d');

// Your skills and corresponding ratings
const skills = {
    "Electrical Engineering": 90,
    "Control Systems": 85,
    "Power Electronics": 80,
    "MATLAB": 90,
    "Python": 85,
    "Wind Energy": 75,
    "High Voltage Technology": 80,
    "Active Distribution Grids": 70
};

// Labels for the radar chart (the skill names)
const skillLabels = Object.keys(skills);
// Data for the radar chart (the skill levels)
const skillData = Object.values(skills);

const radarChart = new Chart(ctx, {
    type: 'radar',
    data: {
        labels: skillLabels, // Dynamic labels based on the skills
        datasets: [{
            label: 'Skill Level',
            data: skillData, // Dynamic data based on your skill levels
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
        }]
    },
    options: {
        scales: {
            r: {
                beginAtZero: true,
                ticks: {
                    stepSize: 10, // Adjust the step size if needed
                    max: 100 // Max skill level (scale from 0 to 100)
                }
            }
        }
    }
});
