import { useEffect, useState } from 'react'
import CountryList from './CountryList';
import VerticalShimmerCard from './VerticalShimmerCard';

function AllCountries() {
    const [allCountries, setAllCountries] = useState([]);
    const [search, setSearch] = useState("");
    const [selectSearch, setSelectSearch] = useState("");
    
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
                {Array.from({ length: 10 }).map((element, index) => <VerticalShimmerCard key={index} />)}
            </div>
        );
    }

    return (
        <main>
            <div className="search-filter-container">
                <div className="search-container">
                    <i className="fa-solid fa-magnifying-glass"></i>
                    <input type="text" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search for a country..." />
                </div>
                <select className="filter-by-region" onChange={(event) => setSelectSearch(event.target.value)}>
                    <option hidden>Filter by Region</option>
                    <option value="Africa">Africa</option>
                    <option value="Americas">Americas</option>
                    <option value="Asia">Asia</option>
                    <option value="Europe">Europe</option>
                    <option value="Oceania">Oceania</option>
                </select>
            </div>
            <div className="countries-container">
                {allCountries.filter((country) => {
                    const countryName = country.name.common.toLowerCase();
                    const countryRegion = country.region.toLowerCase();
                    const searchValue = search.toLowerCase();
                    const selectValue = selectSearch.toLowerCase();

                    if((countryName.includes(searchValue) || countryRegion.includes(searchValue)) && countryRegion.includes(selectValue))
                        return country;
                }).map((country) => <CountryList key={country.name.common} countryData={country} />)}
            </div>
        </main>
    )
}

export default AllCountries