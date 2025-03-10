require('dotenv').config({ path: 'stash.env' });

const apiKey = process.env.API_KEY;
async function getTime(){
    let button = document.getElementById("finder");
    
    // Add rotation effect
    button.classList.add("rotating");

    setTimeout(() => {
        button.classList.remove("rotating");
    }, 3000);

    const location = document.getElementById("location").value;
    const answer = document.getElementById("response");
    
    try{
        const jgah =  await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${Api_Key}`);
        const place =  await jgah.json();
        const x = place[0]["lat"];
        const y = place[0]["lon"];
        console.log("lattitude and longitude are ");
        const time =  await fetch(`https://timeapi.io/api/time/current/coordinate?latitude=${x}&longitude=${y}`);
        const final =  await time.json();
        const samay = final["time"]; 
       answer.innerHTML= ` Currently its : ${samay} in ${location} (24 hr clock)
       with Date : ${final["date"]} (MM/DD/YYYY) Day : ${final["dayOfWeek"]} `;
       
       console.log(samay)
    
    }catch(error){
        answer.innerHTML("Somethoing went wrong! Try Again")
    }
   
}

    

