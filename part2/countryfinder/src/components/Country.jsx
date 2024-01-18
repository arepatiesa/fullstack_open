import React from "react";
import Loading from "./Loading";

const Country = ({ country, countryName }) => {
  if (country != null && country.name.common == countryName) {
    return (
      <div>
        <h1>{country.name.common}</h1>

        <div>capital {country.capital}</div>
        <div>area {country.area}</div>

        <ul>
          {Object.values(country.languages).map((val) => (
            <li key={val}>{val}</li>
          ))}
        </ul>

        <img
          src={country.flags.png}
          alt={country.flags.alt}
          style={{ width: 150 }}
        />
      </div>
    );
  } else {
    return <Loading />;
  }
};

export default Country;
