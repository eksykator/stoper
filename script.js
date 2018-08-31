function pad0(value) {
	let result = value.toString();
	if (result.length < 2) {
		result = '0' + result;
	}
	return result;
}

class Stopwatch extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {
            running: false,
            times: {
				minutes: 0,
				seconds: 0,
				miliseconds: 0
			}
        };

        this.start = this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.reset = this.reset.bind(this);
        this.step = this.step.bind(this);
    }

	reset() {
		this.stop();
		this.setState({times: {minutes: 0, seconds: 0, miliseconds: 0}});
	}

	render() {
		return React.createElement('div', {},
				React.createElement('button', {id: "start", onClick: this.start}, 'start'),
				React.createElement('button', {id: "stop", onClick: this.stop}, 'stop'),
				React.createElement('button', {id: "reset", onClick: this.reset}, 'reset'),
				React.createElement('span', {}, this.format(this.state.times)));
	}

	start() {
	    if (!this.state.running) {
	    	this.setState({running: true});
	        this.watch = setInterval(() => this.step(), 10);
	    }
	}

	step() {
	    if (!this.state.running) return;
	    this.calculate();
	}

	calculate() {
		let newTimes = {
			minutes: this.state.times.minutes, 
			seconds: this.state.times.seconds, 
			miliseconds: this.state.times.miliseconds + 1
		};

	    if (this.state.times.miliseconds >= 100) {
	    	newTimes.seconds = newTimes.seconds + 1;
	    	newTimes.miliseconds = 0;
	    }
	    if (this.state.times.seconds >= 60) {
	    	newTimes.minutes = newTimes.minutes + 1;
	    	newTimes.seconds = 0;
	    }

	    this.setState({times: newTimes});
	}

	stop() {
	    this.setState({running: false});
	    clearInterval(this.watch);
	}

	format(times) {
		return `${pad0(times.minutes)}:${pad0(times.seconds)}:${pad0(Math.floor(times.miliseconds))}`;
	}
};

var element = React.createElement('div', {},
	React.createElement(Stopwatch));

ReactDOM.render(element, document.getElementById('app'));
