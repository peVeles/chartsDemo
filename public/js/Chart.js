class Chart {
    constructor (socket, id, data) {
        this.socket = socket;
        this.id = id;

        addChartBlock(id);
        this.chart = Highcharts.chart(`chart_${id}`, data);

        this.listen();
    }

    addPoints(points) {
        for(let point of points) {
            this.chart.series[0].addPoint(point, true, 1);
        }
    }

    listen() {
        this.socket.on('addPoints', (points) => {
            console.log('In add points')
            this.addPoints(points);
        })
    }
}