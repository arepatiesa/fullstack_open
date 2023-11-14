import React from "react";
import { useState } from "react";

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>total {props.total}</p>
      <p>average {props.score / props.total}</p>
      <p>positive {100 * props.good / props.total }</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setAverage] = useState(0);

  const addGood = () =>
    setGood(good + 1, setTotal(total + 1), setAverage(score + 1));
  const addNeutral = () => setNeutral(neutral + 1, setTotal(total + 1), setAverage(score + 0));
  const addBad = () =>
    setBad(bad + 1, setTotal(total + 1), setAverage(score - 1));

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={addGood}>good</button>
      <button onClick={addNeutral}>neutral</button>
      <button onClick={addBad}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} score={score}/>
    </div>
  );
};

export default App;
