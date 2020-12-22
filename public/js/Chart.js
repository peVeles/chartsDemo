class Chart {
    constructor (socket, id, data) {
        this.socket = socket;
        this.id = id;
        this.maxPoints = 105;

        addChartBlock(id);
        this.chart = Highcharts.chart(`chart_${id}`, data);

        this.listen();
    }

    addPoints(points) {
        for(let point of points) {
            const shift = this.chart.series[0].data.length > this.maxPoints;
            this.chart.series[0].addPoint(point, true, shift, false);
        }
    }

    listen() {
        this.socket.on('addPoints', (points) => {
            console.log('In add points')
            this.addPoints(points);
        })
    }
}
