const apiKey = "c9ea3a9ed181760d48475ff59c0c5a8d";

async function getTime() {
    let button = document.getElementById("finder");

    // Add rotation effect
    button.classList.add("rotating");

    setTimeout(() => {
        button.classList.remove("rotating");
    }, 3000);

    const location = document.getElementById("location").value;
    const answer = document.getElementById("response");

    if (!location) {
        answer.innerHTML = "Please enter a valid location.";
        return;
    }

    try {
        // Fetch latitude and longitude
        const geoResponse = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=${apiKey}`);
        const geoData = await geoResponse.json();

        if (!geoData.length) {
            answer.innerHTML = "Location not found. Try again.";
            return;
        }

        const latitude = geoData[0].lat;
        const longitude = geoData[0].lon;
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);

        // Fetch time
        const timeResponse = await fetch(`https://timeapi.io/api/Time/current/coordinate?latitude=${latitude}&longitude=${longitude}`);
        const timeData = await timeResponse.json();

        // Display time details
        answer.innerHTML = `
            <strong>Currently:</strong> ${timeData.time} in ${location} (24-hr format)<br>
            <strong>Date:</strong> ${timeData.date} (MM/DD/YYYY)<br>
            <strong>Day:</strong> ${timeData.dayOfWeek}
        `;

        console.log(timeData.time);
        
    } catch (error) {
        console.error("Error fetching data:", error);
        answer.innerHTML = "Something went wrong! Please try again.";
    }
}
