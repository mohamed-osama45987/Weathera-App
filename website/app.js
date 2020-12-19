// definning some variables for multiple usage.
const portUrl = 'http://127.0.0.1:9000/';
const zip = document.querySelector('#zip');
const apiKey = '&appid=40ac09d1a34f5f6456491192ce77f781&units=imperial';

const userFellings = document.querySelector('#feelings');
const date = document.querySelector('#date');
const temp = document.getElementById('temp');
const content = document.getElementById('content');

//adding event listner to the generate button.
document.querySelector('#generate').addEventListener('click', begin);

//the main function
function begin() {
	if (zip.value === '') {
		alert('Please Enter A Valid Zip Code');
		return;
	}
	let data = {
		zipCode: zip.value,
		user: userFellings.value,
		date: new Date()
	};

	//get data function to get data from api and use postToServer function.
	getData(data.zipCode)
		.then((apiResponse) => {
			if (apiResponse.cod != 200) {
				console.log(apiResponse.message);
			} else {
				// assigning the temp key to the data object.
				data.temp = apiResponse.list[0].main.temp;

				//posting the data
				postToServer(data);
			}
		})
		.catch(() => {
			console.log(`something went wrong error code ${apiResponse.cod}`);
		});
}

// fetching data from api
async function getData(code) {
	return await (await fetch(`http://api.openweathermap.org/data/2.5/forecast?zip=${code}${apiKey}`)).json();
}

//Remember that the server must be running in order to post to it or to get data from it.

//post to the server.
async function postToServer(data) {
	//making a request to the post route.
	let response = await fetch(`${portUrl}data`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data)
	});

	//deal with every condition possible.
	if (response.ok) {
		response.json().then((data) => {
			if (response.ok) {
				changeLayout();
			} else {
				console.log(response.status);
			}
		});
	} else {
		console.log(`Failed to post the data to the server ${response.status}`);
	}
}

// retriving the data form the server to change the layout

async function changeLayout() {
	let response = await fetch(`${portUrl}getAllData`);

	if (response.ok) {
		response.json().then((data) => {
			date.innerHTML = `Date is: ${data.date}`;
			temp.innerHTML = `The Temprature is: ${data.temperature}`;
			content.innerHTML = `I am Feeling: ${data.userResponse}`;
		});
	} else {
		console.log(`Failed to get the data Error is ${response.status}`);
	}
}
