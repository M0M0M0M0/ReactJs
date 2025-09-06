import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";

function Forecast() {
  const [city, setCity] = useState("Hà Nội");
  const [cityQuery, setCityQuery] = useState("hanoi");
  const [items, setItems] = useState([]);
  const [error, setError] = useState("");
  const [isDark, setIsDark] = useState(false);

  const themeClasses = {
    page: isDark ? "bg-dark text-light" : "bg-light text-dark",
    band: isDark ? "bg-secondary" : "bg-body-secondary",
    card: isDark
      ? "bg-dark border-secondary text-light"
      : "bg-white border text-dark",
    muted: isDark ? "text-secondary" : "text-muted",
    btnMode: isDark ? "light" : "dark",
  };

  useEffect(() => {
    const controller = new AbortController();
    async function fetchForecast() {
      try {
        setError("");
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?q=${cityQuery}&appid=09a71427c59d38d6a34f89b47d75975c&units=metric`,
          { signal: controller.signal }
        );
        if (!res.ok) throw new Error("Fetch forecast failed");
        const data = await res.json();
        if (data?.city?.name) setCity(data.city.name);
        setItems(Array.isArray(data?.list) ? data.list : []);
      } catch (e) {
        if (e.name !== "AbortError") {
          setError("Không thể tải dữ liệu dự báo");
        }
      }
    }
    fetchForecast();
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

  if (error) {
    return <p className="text-danger">{error}</p>;
  }

  return (
    <div
      className={`${themeClasses.page}`}
      style={{ minHeight: "100vh", padding: "0 16px 16px" }}
    >
      {/* Dark mode toggle */}
      <div
        className="position-fixed"
        style={{ top: 12, right: 12, zIndex: 10 }}
      >
        <Button
          variant={themeClasses.btnMode}
          onClick={() => setIsDark((v) => !v)}
        >
          {isDark ? "Light" : "Dark"} mode
        </Button>
      </div>

      {/* Full-width band for title + city buttons */}
      <div
        className={`container-fluid ${themeClasses.band}`}
        style={{
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          width: "100vw",
          padding: "16px 20px",
          marginBottom: 0,
        }}
      >
        <div className="container">
          <h1 className="mt-0">Dự báo 5 ngày (3h/bản tin) - {city}</h1>
          <div className="d-flex gap-2 flex-wrap">
            {cities.map((c) => (
              <Button
                variant="primary"
                type="button"
                key={c.value}
                value={c.value}
                onClick={(e) => setCityQuery(e.currentTarget.value)}
              >
                {c.label}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Full-width background band for the forecast grid */}
      <div
        className={`container-fluid ${themeClasses.band}`}
        style={{
          position: "relative",
          left: "50%",
          right: "50%",
          marginLeft: "-50vw",
          marginRight: "-50vw",
          width: "100vw",
          padding: "16px 20px",
        }}
      >
        <div className="container">
          <div className="row g-3">
            {items.map((it) => {
              const time = it.dt_txt || "";
              const icon = it.weather?.[0]?.icon || "";
              const desc = it.weather?.[0]?.description || "";
              const temp = Math.round(it.main?.temp ?? 0);
              const humidity = Math.round(it.main?.humidity ?? 0);
              const wind = Math.round(it.wind?.speed ?? 0);
              return (
                <div
                  key={it.dt + icon}
                  className="col-6 col-sm-4 col-md-3 col-lg-2"
                >
                  <div className={`card ${themeClasses.card} shadow-sm h-100`}>
                    <div className={`card-body p-2`}>
                      <div className={`small ${themeClasses.muted}`}>
                        {time}
                      </div>
                      <img
                        src={`https://openweathermap.org/img/wn/${icon}.png`}
                        alt="icon"
                      />
                      <div className="fw-semibold">{temp}°C</div>
                      <div className="text-capitalize">{desc}</div>
                      <div>Độ ẩm: {humidity}%</div>
                      <div>Gió: {wind} m/s</div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forecast;
