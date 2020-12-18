const initChartData = {

    title: {
        text: 'Some header'
    },

    subtitle: {
        text: 'Demo'
    },

    yAxis: {
        title: {
            text: 'Some data'
        }
    },

    xAxis: {
        accessibility: {
            rangeDescription: 'Year'
        }
    },

    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: 2010
        }
    },

    series: [{
        name: 'Data',
        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

};

const port = 3000;

const charts = {};
let chartId = 1;

const Chart = require(__dirname + '/src/Chart.js')
const express = require('express')
const app = express();
const http = require('http').createServer(app);
const socketio = require('socket.io')
const io = socketio(http);
const path = require('path');

app.use(express.static(path.resolve('public')));


app.get('/', (req, res) => {
    res.sendFile(path.resolve('public', 'index.html'));
});

io.on('connection', (socket) => {
    socket.on('addChart', () => {
        socket.emit('chartData', chartId++, initChartData);
        charts[chartId - 1] = new Chart(socketio(http, {path: `/chart_${chartId - 1}`, forceNew: true}),
            chartId - 1);
    })
    console.log('a user connected');
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});
