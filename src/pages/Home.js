import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Home() {
  const [city, setCity] = useState("Hà Nội"); // display name
  const [cityQuery, setCityQuery] = useState("hanoi"); // API query
  const [weather, setWeather] = useState({
    temp: 0,
    humidity: 0,
    wind: 0,
    status: "",
    icon: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function fetchWeather() {
      try {
        setError("");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?q=${cityQuery}&appid=09a71427c59d38d6a34f89b47d75975c&units=metric`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Fetch weather failed");
        const data = await res.json();
        // Chỉ cập nhật city nếu API trả về name để tránh phụ thuộc vào city
        if (data?.name) {
          setCity(data.name);
        }
        setWeather((prev) => ({
          ...prev,
          temp: Math.round(data?.main?.temp ?? 0),
          humidity: Math.round(data?.main?.humidity ?? 0),
          wind: Math.round(data?.wind?.speed ?? 0),
          status: data?.weather?.[0]?.description || "",
          icon: data?.weather?.[0]?.icon || "",
        }));
      } catch (e) {
        if (e.name !== "AbortError") {
          setError("Không thể tải dữ liệu thời tiết");
        }
      }
    }
    fetchWeather();
    return () => controller.abort();
  }, [cityQuery]);

  const cities = [
    { label: "Hồ Chí Minh", value: "saigon" },
    { label: "Hà Nội", value: "hanoi" },
    { label: "New York", value: "new york" },
    { label: "Alaska", value: "Alaska" },
    { label: "London", value: "London" },
    { label: "Paris", value: "Paris" },
    { label: "Tokyo", value: "Tokyo" },
    { label: "Sydney", value: "Sydney" },
    { label: "Moscow", value: "Moscow" },
    { label: "Berlin", value: "Berlin" },
    { label: "Rome", value: "Rome" },
  ];

  const changeCity = (c) => {
    // Chỉ đổi query để fetch; tên hiển thị sẽ cập nhật sau khi API trả về
    setCityQuery(c.value);
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Thời tiết tại {city}</h1>
      <img
        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
        alt="weather icon"
      />
      <p>Nhiệt độ: {weather.temp}°C</p>
      <p>Độ ẩm: {weather.humidity}%</p>
      <p>Tốc độ gió: {weather.wind} m/s</p>
      <p>
        Trạng thái:{" "}
        {weather.status.charAt(0).toUpperCase() + weather.status.slice(1)}
      </p>

      {cities.map((c) => (
        <Button
          key={c.value}
          variant="primary"
          type="button"
          onClick={() => changeCity(c)}
        >
          {c.label}
        </Button>
      ))}
    </div>
  );
}
export default Home;
