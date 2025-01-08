const ctx = document.getElementById('myRadarChart').getContext('2d');

const data = {
    labels: ['HTML', 'CSS', 'JavaScript', 'React', 'Node.js'],
    datasets: [{
        label: 'Skill Level',
        data: [80, 75, 90, 85, 70],
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 1
    }]
};

const config = {
    type: 'radar',
    data: data,
    options: {
        scales: {
            r: {
                min: 0,
                max: 100
            }
        }
    }
};

const myRadarChart = new Chart(ctx, config);
