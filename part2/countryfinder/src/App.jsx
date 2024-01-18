import React, { useEffect, useState } from "react";
import axios from "axios";
import Country from "./components/Country";
import List from "./components/List";
import Search from "./components/Search"
import Loading from "./components/Loading";

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const isFalse = false;

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => {
        setCountries(res.data.map((arr) => arr.name.common));
      })
      .finally(() => {
        setLoading(isFalse);
      });
  }, []);

  useEffect(() => {

    if (filtered.length == 1) {
      axios
        .get(
          `https://studies.cs.helsinki.fi/restcountries/api/name/${filtered[0]}`
        )
        .then((res) => {
          setInfo(res.data);
        })
        .finally(() => {
          setLoading(isFalse);
        });
    }
  }, [filtered.length]);

  const filtering = (array) => {
    return array.toLowerCase().includes(country);
  };

  const filteredCountries = countries.filter((array) => filtering(array));

  const handleChange = (event) => {
    setCountry(event.target.value);
    setFiltered(filteredCountries);
  };

  return (
    <div>
      {loading == false ? (
        <Search handleChange={handleChange} value={country} />
      ) : null}
      {country != "" && filtered.length != 1 ? (
        <List countries={filtered} />
      ) : null}
      {filtered.length == 1 && country != "" ? (
        <Country country={info} countryName={filtered[0]} />
      ) : null}
      {loading == true ? <Loading /> : null}
    </div>
  );
};

export default App;
