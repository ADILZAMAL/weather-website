const form = document.querySelector('form');
const input = form.querySelector('input');
const btn = form.querySelector('.btn');
const p1 = document.querySelector('.message1');
const p2 = document.querySelector('.message2');

form.addEventListener('submit', (event) => {
     p1.textContent = 'Loading...'
     p2.textContent = 'please wait'
     event.preventDefault();
     console.log('testing')
     const location = input.value.trim();
     const url = `/weather?address=${location}`
     fetch(url).then(response => {
          response.json().then((data) => {
               if (data.error) {
                    p1.textContent = data.error; 
               }
               else {
                    p1.textContent = data.location;
                    p2.textContent = data.forCastData
               }
          })
     })

})


fetch(url).then((response) => {
    response.json().then((data)=> {
        if (data.error)
            console.log(data.error);
        else {
            console.log(data.location)
            console.log(data.forCastData)
        }
    })
}).catch(error => {
    console.log('hello')
    console.log(error)
})

