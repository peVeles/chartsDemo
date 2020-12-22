class Chart {
    constructor(socket, id) {
        this.socket = socket;
        this.id = id;

        this.listen();
    }

    demoUpdate() {
        console.log('In demo update');
        let year = 2018;
        let data = 300000;
        setInterval( () => {
            data = Math.ceil(1.1 * data);
            if( data > 10000000) {data = 300000;}
            this.socket.emit('addPoints', [[++year, data]])
        }, 200)
    }

    listen() {
        this.demoUpdate();
    }
}

module.exports = Chart
