const socket = io('http://localhost:3000');
charts = {};

document.getElementById("add-chart-btn").addEventListener('click', () => {
    socket.emit('addChart');
})

socket.on('chartData', (id, data) => {
    console.log('Got id', id)
    charts[id] = new Chart(io(`http://localhost:3000`, {path: `/chart_${id}`, forceNew: true}), id, data);
})