
//Setup
var soundToggle = true;
var timerToggle = 'stop' //start or pause
var count = 0;
var task = 'session' //session or brake
var timerId;
var timeObj;

//Get some elements
brakeMin = document.getElementById('brakeTime');
sessionMin = document.getElementById('sessionTime');
startPauseBtn = document.getElementById('startPause');
restartBtn = document.getElementById('restart');
soundBtn = document.getElementById('soundMute');
countdown = document.getElementById('countdown');
taskDisplay = document.getElementById('task');
sound = document.getElementById('sound');

//Control
function countMe(){
	console.log(count + ' seconds');
	updateDisplay();
	count++;
}

function startCount(){
	startPauseBtn.innerHTML = '<i class="material-icons">stop</i>';
	timerToggle = 'start';
	timerId = setInterval(countMe, 1000);

}

function pauseCount(){
	startPauseBtn.innerHTML = '<i class="material-icons">play_arrow</i>';
	timerToggle = 'stop';
	clearInterval(timerId);

}

function restartCount(){
	count = 0;
	updateDisplay();
}

function updateDisplay(){
	if (task === 'session') {
		taskDisplay.innerHTML = 'Session';
		getTime(parseInt(sessionMin.value, 10));
		countdown.innerHTML = timeObj.hours() + 'h ' + timeObj.minutes() + 'm ' + timeObj.seconds() + 's';
	} else if (task === 'brake') {
		taskDisplay.innerHTML = 'Brake';
		getTime(parseInt(brakeMin.value, 10));
		countdown.innerHTML = timeObj.hours() + 'h ' + timeObj.minutes() + 'm ' + timeObj.seconds() + 's';
	}
}

function alarm(){
	if (soundToggle){
		sound.play();
	}
	if (task === 'session'){
		task = 'brake'
	} else if (task === 'brake'){
		task = 'session'
	}
	restartCount();
}

function getTime(timerMax){
	var a = moment.duration(timerMax, 'm');
	var b = moment.duration(count,'s');
	timeObj = a.subtract(b);
	if (timeObj.asSeconds() < 0){
		alarm();
		return timeObj;
	}else{
		return timeObj;
	}
}

//Click listeners
startPauseBtn.addEventListener('click', function(){
	if(timerToggle === 'stop'){
		startCount();
	} else if (timerToggle === 'start') {
		pauseCount();
	}
})

soundBtn.addEventListener('click', function(){
	if (soundToggle){
		soundBtn.innerHTML = '<i class="material-icons">volume_off</i>'
		soundToggle = false;
	} else {
		soundBtn.innerHTML = '<i class="material-icons">volume_up</i>'
		soundToggle = true
	}
})

restartBtn.addEventListener('click', restartCount);
