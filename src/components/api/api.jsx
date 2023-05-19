import { useState, useEffect } from 'react';

function Api() {
  const [universitiesByCountry, setUniversitiesByCountry] = useState({});
  const [searchParam, setSearchParam] = useState('');

  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const response = await fetch('http://universities.hipolabs.com/search');
        const universities = await response.json();
        const universitiesByCountry = {};

        universities.forEach((university) => {
          const { country } = university;

          if (!universitiesByCountry[country]) {
            universitiesByCountry[country] = [];
          }

          universitiesByCountry[country].push(university);
        });

        setUniversitiesByCountry(universitiesByCountry);
      } catch (error) {
        console.error('Error fetching universities:', error);
      }
    };

    fetchUniversities();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const searchInput = e.target.elements.searchInput.value;
    setSearchParam(searchInput);
  };

  const handleClear = () => {
    setSearchParam('');
  };

  const filteredUniversities = Object.fromEntries(
    Object.entries(universitiesByCountry).filter(([country]) =>
      country.toLowerCase().includes(searchParam.toLowerCase())
    )
  );

  return (
    <div>
      <h2>Universities Search Engine</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search for a country"
          name="searchInput"
        />
        <button type="submit">Search</button>
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      </form>
      {Object.entries(filteredUniversities).map(([country, universities]) => (
        <div key={country}>
          <h3>{country}</h3>
          <ul>
            {universities.map((university, index) => (
              <li className='university-items' key={index}>
                <h3>{university.name}</h3>
                    <p>{university.web_pages}</p>
                    <h4>{university.alpha_two_code}</h4>
                      <p>{university.domains}</p>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Api;
