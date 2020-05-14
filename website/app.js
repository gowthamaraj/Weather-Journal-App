/* Global Variables */
// http://api.openweathermap.org/data/2.5/weather?zip=94712,us&appid=49b9b809e566d9d0cb35f31930cdff2e
const key = '&appid=49b9b809e566d9d0cb35f31930cdff2e&units=imperial';
const baseUrl = 'http://api.openweathermap.org/data/2.5/weather?zip='

const generate = document.querySelector('#generate');
const zip = document.querySelector('#zip');
const feel = document.querySelector('#feelings');
const date = document.querySelector('#date'); 
const temp = document.querySelector('#temp');
const content = document.querySelector('#content'); 
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

const getData = async (baseUrl,zipcode ='642126,in',key)=>{
    const url = `${baseUrl}${zipcode}${key}`;
    const response = await fetch(url);
    const responseData = await response.json();
    return responseData;
};
const postData = async(data)=>{
    const newData ={
        temperature: data.main.temp,
        date: newDate,
        user_response: feel.value.trim()
    };
    const response = await fetch("http://localhost:8000/post", {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newData),       
    });
    return newData;   
};
const updateUI = async () =>{
    const response = await fetch('http://localhost:8000/get');
    const responseData = await response.json();
    date.innerHTML = `<span class="entry-item">Date: </span>${responseData.date}`;
    content.innerHTML = `<span class="entry-item">You feel: </span>${responseData.user_response}`
    temp.innerHTML = `<span class="entry-item">Temperature: </span>${responseData.temperature}&deg;F`;
    return responseData;
}
const clickHandler = async (e)=>{
    getData(baseUrl,zip.value,key).then((data)=>{
        return postData(data);
    }).then(data =>{
        return updateUI();
    }).catch(err => {
        console.log(err);
    });
}

//event listener
generate.addEventListener('click',clickHandler);