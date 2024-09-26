import { Link } from 'react-router-dom'

function CountryList({countryData}) {
    return (
        <Link className="country-card" to={`/${countryData.name.common}`} state={countryData}>
            <img src={countryData?.flags?.svg} alt={`${countryData.name.common} Flag`} />
            <div className="card-text">
                <h3 className="card-title">{countryData.name.common}</h3>
                <p><b>Population: </b>{countryData.population.toLocaleString(
                'en-IN'
            )}</p>
                <p><b>Region: </b>{countryData.region}</p>
                <p><b>Capital: </b>{countryData.capital?.[0]}</p>
            </div>
        </Link>
    )
}

export default CountryList
