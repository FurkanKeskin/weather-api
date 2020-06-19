import React, { useState, useEffect } from "react";
import Axios from "axios";
import _, { isSet, isString } from "lodash";
import moment from "moment";

const App = () => {
  const [state, setState] = useState({});
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // useEffect(() => {
  //   fetchData()
  // }, []);

  const fetchData = async () => {
    setError("");
    setLoading(true);
    const key = "ee9e5b95670e41e81159eb788e881e83";

    try {
      const res = await Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);
      setState(res.data);
      setLoading(false);
    } catch (err) {
      setError(err.response.data.message);
      setLoading(false);
    }
    
  };

  const showData = () => {
    if (error) {
      return <p className={"danger"}>{error}</p>;
    }
    if (loading) {
      return <p>Loading</p>;
    }
    if (_.isEmpty(state)) {
      return <p>Enter a city</p>;
    }

    return (
      <>
        <p>
          The temperature in {state.name} is currently {state.main.temp}&#8451; but feels more
          like {state.main.feels_like}&#8451;
        </p>
        <p>
          Currently the weather would best be described as {state.weather[0].description}
        </p>
        <p>With highs of {state.main.temp_max}&#8451;</p>
        <p>And lows of {state.main.temp_min}&#8451;</p>
        <p>
          The sun will set at {moment.unix(state.sys.sunset).format("h:mm:ss a")}
        </p>
        <p>
          And will rise at {moment.unix(state.sys.sunrise).format("h:mm:ss a")}
        </p>
      </>
    );
  };
  return (
    <div className="cont">
      <h1 className={"title"}>Weather API</h1>

      {/* &#8451; */}
      <div>{showData()}</div>

      <div className={"divider"} />
      <p>Enter city name</p>
      <input
        onChange={(event) => setCity(event.target.value)}
        className={"input"}
      />
      <button onClick={fetchData} className={"button"}>
        Get Weather
      </button>
    </div>
  );
};

export default App;
