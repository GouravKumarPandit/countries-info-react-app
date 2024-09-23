import React, { useEffect, useState } from 'react'
import CountryList from './CountryList';
import SimmerCard from './SimmerCard';

function AllCountries() {
    const [allCountries, setAllCountries] = useState([]);
    
    useEffect(() => {
        fetch('https://restcountries.com/v3.1/all')
            .then((result) => result.json())
            .then((data) => {
                setAllCountries(data)
            })
    }, [])


    if(allCountries.length == 0){
        return (
            <div className="shimmer-parent-container">
                {Array.from({ length: 10 }).map((element, index) => <SimmerCard key={index} />)}
            </div>
        );
    }

    return (
        <>
            <main>
                <div className="search-filter-container">
                    <div className="search-container">
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input type="text" placeholder="Search for a country..." />
                    </div>
                    <select className="filter-by-region">
                        <option hidden>Filter by Region</option>
                        <option value="Africa">Africa</option>
                        <option value="America">America</option>
                        <option value="Asia">Asia</option>
                        <option value="Europe">Europe</option>
                        <option value="Oceania">Oceania</option>
                    </select>
                </div>
                <div className="countries-container">
                    {allCountries.map((country) => <CountryList key={country.name.common} countryData={country} />)}
                </div>
            </main>
        </>
    )
}

export default AllCountries