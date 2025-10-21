import type { NextRequest } from "next/server"

export const runtime = "edge"

// Helper function to get font family
function getFontFamily(font: string): string {
  switch (font) {
    case "serif":
      return "ui-serif, Georgia, Cambria, 'Times New Roman', Times, serif"
    case "mono":
      return "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace"
    default:
      return "ui-sans-serif, -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, 'Apple Color Emoji', Arial, sans-serif, 'Segoe UI Emoji', 'Segoe UI Symbol'"
  }
}

// Helper function to get padding value
function getPaddingValue(padding: string): string {
  switch (padding) {
    case "small":
      return "12px"
    case "large":
      return "32px"
    default:
      return "20px"
  }
}

// Generate Clock Widget HTML
function generateClockWidget(params: URLSearchParams): string {
  const timezone = params.get("tz") || "America/New_York"
  const clockType = params.get("clockType") || "12h"
  const showSeconds = params.get("seconds") === "true"
  const bgColor = params.get("bg") || "#ffffff"
  const textColor = params.get("color") || "#37352F"
  const fontFamily = getFontFamily(params.get("font") || "sans")
  const padding = getPaddingValue(params.get("padding") || "medium")

  if (clockType === "analog") {
    // Analog clock with SVG
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${fontFamily};
      background: ${bgColor};
      color: ${textColor};
      padding: ${padding};
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .clock-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 12px;
    }
    .analog-clock {
      width: 200px;
      height: 200px;
      position: relative;
    }
    .clock-face {
      width: 100%;
      height: 100%;
      border: 2px solid ${textColor};
      border-radius: 50%;
      position: relative;
    }
    .hand {
      position: absolute;
      bottom: 50%;
      left: 50%;
      transform-origin: bottom center;
      background: ${textColor};
      border-radius: 10px;
    }
    .hour-hand {
      width: 4px;
      height: 50px;
      margin-left: -2px;
    }
    .minute-hand {
      width: 3px;
      height: 70px;
      margin-left: -1.5px;
    }
    .second-hand {
      width: 2px;
      height: 80px;
      margin-left: -1px;
      background: ${textColor}80;
    }
    .center-dot {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 12px;
      height: 12px;
      background: ${textColor};
      border-radius: 50%;
      transform: translate(-50%, -50%);
    }
    .digital-time {
      font-size: 18px;
      font-weight: 500;
      opacity: 0.8;
    }
  </style>
</head>
<body>
  <div class="clock-container">
    <div class="analog-clock">
      <div class="clock-face">
        <div class="hand hour-hand" id="hour"></div>
        <div class="hand minute-hand" id="minute"></div>
        ${showSeconds ? '<div class="hand second-hand" id="second"></div>' : ""}
        <div class="center-dot"></div>
      </div>
    </div>
    <div class="digital-time" id="time"></div>
  </div>
  <script>
    function updateClock() {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "${timezone}" }));
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      
      const hourDeg = (hours % 12) * 30 + minutes * 0.5;
      const minuteDeg = minutes * 6;
      const secondDeg = seconds * 6;
      
      document.getElementById('hour').style.transform = 'rotate(' + hourDeg + 'deg)';
      document.getElementById('minute').style.transform = 'rotate(' + minuteDeg + 'deg)';
      ${showSeconds ? "document.getElementById('second').style.transform = 'rotate(' + secondDeg + 'deg)';" : ""}
      
      const timeStr = now.toLocaleTimeString("en-US", { 
        hour: '2-digit', 
        minute: '2-digit',
        ${showSeconds ? "second: '2-digit'," : ""}
        hour12: ${clockType === "12h"}
      });
      document.getElementById('time').textContent = timeStr;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
  </script>
</body>
</html>
    `
  } else {
    // Digital clock
    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${fontFamily};
      background: ${bgColor};
      color: ${textColor};
      padding: ${padding};
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .clock {
      font-size: 48px;
      font-weight: 600;
      letter-spacing: 0.02em;
      text-align: center;
    }
    .date {
      font-size: 16px;
      font-weight: 400;
      opacity: 0.7;
      margin-top: 8px;
    }
  </style>
</head>
<body>
  <div>
    <div class="clock" id="clock"></div>
    <div class="date" id="date"></div>
  </div>
  <script>
    function updateClock() {
      const now = new Date(new Date().toLocaleString("en-US", { timeZone: "${timezone}" }));
      
      const timeStr = now.toLocaleTimeString("en-US", { 
        hour: '2-digit', 
        minute: '2-digit',
        ${showSeconds ? "second: '2-digit'," : ""}
        hour12: ${clockType === "12h"}
      });
      
      const dateStr = now.toLocaleDateString("en-US", {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: "${timezone}"
      });
      
      document.getElementById('clock').textContent = timeStr;
      document.getElementById('date').textContent = dateStr;
    }
    
    updateClock();
    setInterval(updateClock, 1000);
  </script>
</body>
</html>
    `
  }
}

// Generate Weather Widget HTML
function generateWeatherWidget(params: URLSearchParams): string {
  const city = params.get("city") || "New York"
  const units = params.get("units") || "celsius"
  const forecast = params.get("forecast") || "today"
  const bgColor = params.get("bg") || "#ffffff"
  const textColor = params.get("color") || "#37352F"
  const fontFamily = getFontFamily(params.get("font") || "sans")
  const padding = getPaddingValue(params.get("padding") || "medium")

  const unitSymbol = units === "celsius" ? "°C" : "°F"

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${fontFamily};
      background: ${bgColor};
      color: ${textColor};
      padding: ${padding};
      min-height: 100vh;
    }
    .weather-container {
      max-width: 400px;
    }
    .city-name {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 16px;
    }
    .current-weather {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 20px;
    }
    .temp {
      font-size: 56px;
      font-weight: 700;
      line-height: 1;
    }
    .condition {
      font-size: 18px;
      opacity: 0.8;
    }
    .forecast-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-top: 20px;
    }
    .forecast-day {
      text-align: center;
      padding: 12px;
      border: 1px solid ${textColor}20;
      border-radius: 8px;
    }
    .day-name {
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 8px;
    }
    .day-temp {
      font-size: 20px;
      font-weight: 600;
    }
    .loading {
      font-size: 16px;
      opacity: 0.6;
    }
    .error {
      color: #ef4444;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="weather-container">
    <div class="city-name">${city}</div>
    <div id="weather-content" class="loading">Loading weather data...</div>
  </div>
  <script>
    // Note: In production, you would fetch from OpenWeatherMap API
    // For now, showing demo data structure
    async function fetchWeather() {
      try {
        // TODO: Replace with actual API call
        // const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
        // const response = await fetch(\`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units === "celsius" ? "metric" : "imperial"}&appid=\${apiKey}\`);
        // const data = await response.json();
        
        // Demo data for now
        const demoData = {
          temp: ${units === "celsius" ? "22" : "72"},
          condition: "Partly Cloudy",
          forecast: [
            { day: "Today", temp: ${units === "celsius" ? "22" : "72"} },
            { day: "Tomorrow", temp: ${units === "celsius" ? "24" : "75"} },
            { day: "Wed", temp: ${units === "celsius" ? "20" : "68"} }
          ]
        };
        
        let html = \`
          <div class="current-weather">
            <div class="temp">\${demoData.temp}${unitSymbol}</div>
            <div class="condition">\${demoData.condition}</div>
          </div>
        \`;
        
        if ("${forecast}" === "3day") {
          html += '<div class="forecast-grid">';
          demoData.forecast.forEach(day => {
            html += \`
              <div class="forecast-day">
                <div class="day-name">\${day.day}</div>
                <div class="day-temp">\${day.temp}${unitSymbol}</div>
              </div>
            \`;
          });
          html += '</div>';
        }
        
        document.getElementById('weather-content').innerHTML = html;
      } catch (error) {
        document.getElementById('weather-content').innerHTML = '<div class="error">Unable to load weather data</div>';
      }
    }
    
    fetchWeather();
    // Refresh every 30 minutes
    setInterval(fetchWeather, 1800000);
  </script>
</body>
</html>
  `
}

// Generate Countdown Widget HTML
function generateCountdownWidget(params: URLSearchParams): string {
  const eventName = params.get("event") || "Event"
  const eventDate = params.get("date") || new Date(Date.now() + 86400000).toISOString().split("T")[0]
  const bgColor = params.get("bg") || "#ffffff"
  const textColor = params.get("color") || "#37352F"
  const fontFamily = getFontFamily(params.get("font") || "sans")
  const padding = getPaddingValue(params.get("padding") || "medium")

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: ${fontFamily};
      background: ${bgColor};
      color: ${textColor};
      padding: ${padding};
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
    }
    .countdown-container {
      text-align: center;
      max-width: 500px;
    }
    .event-name {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 24px;
    }
    .countdown-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      margin-bottom: 16px;
    }
    .countdown-item {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .countdown-value {
      font-size: 48px;
      font-weight: 700;
      line-height: 1;
    }
    .countdown-label {
      font-size: 14px;
      opacity: 0.7;
      margin-top: 8px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
    .event-date {
      font-size: 16px;
      opacity: 0.6;
      margin-top: 12px;
    }
  </style>
</head>
<body>
  <div class="countdown-container">
    <div class="event-name">${eventName}</div>
    <div class="countdown-grid">
      <div class="countdown-item">
        <div class="countdown-value" id="days">0</div>
        <div class="countdown-label">Days</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value" id="hours">0</div>
        <div class="countdown-label">Hours</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value" id="minutes">0</div>
        <div class="countdown-label">Minutes</div>
      </div>
      <div class="countdown-item">
        <div class="countdown-value" id="seconds">0</div>
        <div class="countdown-label">Seconds</div>
      </div>
    </div>
    <div class="event-date" id="event-date"></div>
  </div>
  <script>
    const targetDate = new Date("${eventDate}T00:00:00").getTime();
    
    function updateCountdown() {
      const now = new Date().getTime();
      const distance = targetDate - now;
      
      if (distance < 0) {
        document.querySelector('.countdown-container').innerHTML = '<div class="event-name">Event has passed!</div>';
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      document.getElementById('days').textContent = days;
      document.getElementById('hours').textContent = hours;
      document.getElementById('minutes').textContent = minutes;
      document.getElementById('seconds').textContent = seconds;
    }
    
    const eventDateObj = new Date("${eventDate}");
    document.getElementById('event-date').textContent = eventDateObj.toLocaleDateString("en-US", {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
  </script>
</body>
</html>
  `
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const widgetType = searchParams.get("type")

    // Validate widget type
    if (!widgetType || !["clock", "weather", "countdown"].includes(widgetType)) {
      return new Response("Invalid widget type. Use: clock, weather, or countdown", {
        status: 400,
        headers: { "Content-Type": "text/plain" },
      })
    }

    let html = ""

    // Generate appropriate widget HTML
    switch (widgetType) {
      case "clock":
        html = generateClockWidget(searchParams)
        break
      case "weather":
        html = generateWeatherWidget(searchParams)
        break
      case "countdown":
        html = generateCountdownWidget(searchParams)
        break
    }

    // Return HTML with appropriate headers for embedding
    return new Response(html, {
      status: 200,
      headers: {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, max-age=60, s-maxage=60",
        "X-Frame-Options": "ALLOWALL",
        "Access-Control-Allow-Origin": "*",
      },
    })
  } catch (error) {
    console.error("[v0] Error generating widget:", error)
    return new Response("Error generating widget", {
      status: 500,
      headers: { "Content-Type": "text/plain" },
    })
  }
}
