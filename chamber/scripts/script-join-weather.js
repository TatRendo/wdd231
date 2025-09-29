const apiKey = "f5bd30ce56a0b1b3b8d47b40dba45077";
const lat = 4.711;
const lon = -74.072;

async function getWeather() {
  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric&lang=es`
    );

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();

    if (!data.main || !data.weather) {
      throw new Error("Datos incompletos en la respuesta");
    }

    document.querySelector("#temp").textContent = data.main.temp.toFixed(1);
    document.querySelector("#desc").textContent = data.weather[0].description;

    const forecast = document.querySelector("#forecast");
    forecast.innerHTML = `
      <li>Humedad: ${data.main.humidity}%</li>
      <li>Amanecer: ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</li>
      <li>Atardecer: ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</li>
    `;
  } catch (error) {
    console.error("Error al obtener el clima:", error);
    document.querySelector("#forecast").innerHTML = "<li>No se pudo cargar el pronóstico.</li>";
  }
}

getWeather();
setInterval(getWeather, 3600000); // Actualiza cada hora
