const Axios = require('axios');
const corpsData = require('./data/in.json');
const jobData = require('./data/job_DATA.json');
const reviewData = require('./data/review_DATA.json');
const idData = require('./data/idset.json').data;

const debug = false;
const limit = false;
const dev = true;

// runmode corps|jobs|reviews
const mode = '';

let door1, door2, door3, route, toUse;

const host = dev ? '' : '';
const engLvl = ["High","Medium","Low","None","Unknown"];

switch (true) {
	case (mode == 'jobs'):
		toUse = jobData.map(x => x);
		door2 = true;
		door3 = true;
		route = '';
		break;
	case (mode == 'reviews'):
		toUse = reviewData.map(x => x);
		door2 = true;
		route = '';
		break;
	case (mode == 'corps'):
		toUse = corpsData.map(x => x);
		door1 = true;
		route = '';
		break;
	default:
}

const url = host + route;

toUse.forEach((el) => {
	if (door1) {
		el.requireEnglish = (Math.floor(Math.random() * 2)) ? true : false;
	}
	if (door2) {
		el.parentId = idData[(Math.floor(Math.random() * idData.length))];
	}
	if(door3){
		el.englishLevel = engLvl[(Math.floor(Math.random() * engLvl.length))];
 	}

	if (!debug) {
	Axios({
		method: 'post',
		url: url,
		data: el
	})
	.then((resp) => {
		console.log(resp);
	})
	.catch((err) => {
		console.log(err);
	})
	}	else {
		console.log(el)
	}
	if (limit) {
		return false;
	}
})
