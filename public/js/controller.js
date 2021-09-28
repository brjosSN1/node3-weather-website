 

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');
const messageThree = document.querySelector('#message-3');

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    const url = "/endpoint?address=" + location;

    messageOne.textContent = 'Loading.....please wait'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                messageOne.textContent = "Location: " + data.location 
                messageTwo.textContent = 'Current Temp is ' + data.temperature + ' deg. Outside feels like ...' + data.feels_like;
                messageThree.textContent = "Visibility approaching " + data.visibility + " miles"
            }
        })

    })

});

