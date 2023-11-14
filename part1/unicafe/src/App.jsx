import React from "react";
import { useState } from "react";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setAverage] = useState(0);

  const addGood = () =>
    setGood(good + 1, setTotal(total + 1), setAverage(score + 1));
  const addNeutral = () => setNeutral(neutral + 1, setTotal(total + 1));
  const addBad = () =>
    setBad(bad + 1, setTotal(total + 1), setAverage(score - 1));

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>

      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {score / total}</p>
      <p>positive {(100 * good) / total} %</p>
    </div>
  );
};

export default App;
