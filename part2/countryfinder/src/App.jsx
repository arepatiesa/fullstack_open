import React, { useEffect, useState } from "react";
import Country from "./components/Country";
import List from "./components/List";
import Search from "./components/Search"
import Loading from "./components/Loading";
import countryService from "./services/countryService";

const App = () => {
  const [country, setCountry] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [info, setInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    countryService.getAll()
      .then((res) => {
        setCountries(res.data.map((arr) => arr.name.common));
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {

    if (filtered.length == 1) {
      countryService.getFiltered(filtered)
        .then((res) => {
          setInfo(res.data);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [filtered.length]);

  const filtering = (arr) => {
    return arr.toLowerCase().includes(country);
  };

  const filteredCountries = countries.filter((array) => filtering(array));
  

  const handleChange = (event) => {
    setCountry(event.target.value);
    setFiltered(filteredCountries);
  };

  const handleShow = (showedCountry) => {
    const showedCountries = [showedCountry]
    setFiltered(showedCountries)
  }

  return (
    <div>
      {loading == false ? (
        <Search handleChange={handleChange} value={country} />
      ) : null}
      {country != "" && filtered.length != 1 ? (
        <List countries={filtered} handleShow={handleShow}/>
      ) : null}
      {filtered.length == 1 && country != "" ? (
        <Country country={info} countryName={filtered[0]}/>
      ) : null}
      {loading == true ? <Loading /> : null}
    </div>
  );
};

export default App;
