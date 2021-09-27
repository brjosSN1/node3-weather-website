 

const weatherform = document.querySelector('form');
const search = document.querySelector('input');
const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherform.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const location = search.value;
    const url = "http://localhost:3000/weather?address=" + location;

    messageOne.textContent = 'Loading.....please wait'
    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.log(data.error);
            }
            else {
                messageOne.textContent = data.location;
                messageTwo.textContent = 'Current Temp is ' + data.temperature + ' deg. Outside feels like ...' + data.feels_like;
            }
        })

    })

});

