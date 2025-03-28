import React, { useState, useEffect } from "react";
import { fetchNumbers } from "./ApiService";
import "./styles.css";

const WINDOW_SIZE = 10;

const AverageCalculator = () => {
  const [prevState, setPrevState] = useState([]);
  const [currentState, setCurrentState] = useState([]);
  const [apiResponse, setApiResponse] = useState([]);
  const [average, setAverage] = useState(0);

  const fetchData = async () => {
    const types = ["prime", "fibonacci", "even", "random"];
    const type = types[Math.floor(Math.random() * types.length)];

    const newNumbers = await fetchNumbers(type);
    setApiResponse(newNumbers);

    if (newNumbers.length > 0) {
      setPrevState([...currentState]);
      const newWindowState = [...currentState, ...newNumbers].slice(-WINDOW_SIZE);
      setCurrentState(newWindowState);

      const sum = newWindowState.reduce((acc, num) => acc + num, 0);
      const avg = newWindowState.length ? (sum / newWindowState.length).toFixed(2) : 0;
      setAverage(avg);
    }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Average Calculator</h1>
      <div className="card mb-3">
        <div className="card-header">Previous Window State:</div>
        <div className="card-body">{prevState.length ? prevState.join(", ") : "No data"}</div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Current Window State:</div>
        <div className="card-body">{currentState.length ? currentState.join(", ") : "No data"}</div>
      </div>

      <div className="card mb-3">
        <div className="card-header">API Response:</div>
        <div className="card-body">{apiResponse.length ? apiResponse.join(", ") : "No data"}</div>
      </div>

      <div className="card mb-3">
        <div className="card-header">Average:</div>
        <div className="card-body">{average || "Calculating..."}</div>
      </div>

      <button className="btn btn-primary" onClick={fetchData}>
        Fetch New Data
      </button>
    </div>
  );
};

export default AverageCalculator;
