import React from "react";
import { useState } from "react";

const StatisticLine = (props) => {
  return (
    <tr>
      <td>{props.text}</td>
      <td>{props.value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  if (props.total == 0) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={props.good} />
          <StatisticLine text="neutral" value={props.neutral} />
          <StatisticLine text="bad" value={props.bad} />
          <StatisticLine text="total" value={props.total} />
          <StatisticLine text="average" value={props.score / props.total} />
          <StatisticLine
            text="good"
            value={(props.good * 100) / props.total + "%"}
          />
        </tbody>
      </table>
    </div>
  );
};

const Button = (props) => {
  return (
    <div>
      <button onClick={props.handleClick}>{props.text}</button>
    </div>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);
  const [score, setAverage] = useState(0);

  const addGood = () =>
    setGood(good + 1, setTotal(total + 1), setAverage(score + 1));
  const addNeutral = () =>
    setNeutral(neutral + 1, setTotal(total + 1), setAverage(score + 0));
  const addBad = () =>
    setBad(bad + 1, setTotal(total + 1), setAverage(score - 1));

  return (
    <div>
      <h1>give feedback</h1>
      <Button text={"good"} handleClick={addGood} />
      <Button text={"neutral"} handleClick={addNeutral} />
      <Button text={"bad"} handleClick={addBad} />

      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        total={total}
        score={score}
      />
    </div>
  );
};

export default App;
