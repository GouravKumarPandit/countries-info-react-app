import React, { useEffect, useState } from 'react'
import './country.css'
import { Link, useParams } from 'react-router-dom';

function Country() {
    const [countryData, setCountryData] = useState({});
    const {country} = useParams('country');

    useEffect(() => {
        fetch(`https://restcountries.com/v3.1/name/${country}?fullText=true`)
            .then((result) => result.json())
            .then(([data]) => {
                setCountryData({
                    flag: data.flags.svg,
                    country_name: data.name.common,
                    native_name: Object.values(data.name.nativeName)[0].common,
                    population: data.population.toLocaleString('en-IN'),
                    region: data.region,
                    sub_region: data.subregion,
                    capital_name: data.capital?.[0],
                    top_level_domain: data.tld.join(', '),
                    currencies: Object.values(data.currencies).map((currency) => currency.name).join(', '),
                    languages: Object.values(data.languages).join(', '),
                    border_boundries: []
                });
                
                if(!data.borders){
                    data.borders = [];
                }

                Promise.all(
                    data.borders.map((border) => {
                        return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                            .then((result) => result.json())
                            .then(([borderData]) => borderData.name.common )
                    })
                ).then((allBorder) => {
                    return setCountryData((previousState) => ({...previousState, border_boundries: allBorder}));
                })
            })
            .catch((error) => console.log(error))

    }, []);

    return (
        <div className="country-details-container">
            <div className="country-details">
                <img src={countryData.flag} alt={`${countryData.country_name} Flag`} />
                <div className="details-text-container">
                    <h1>{countryData.country_name}</h1>
                    <div className="details-text">
                        <p><b>Native Name: </b><span className="native-name">{countryData.native_name}</span></p>
                        <p><b>Population: </b><span className="population">{countryData.population}</span></p>
                        <p><b>Region: </b><span className="region">{countryData.region}</span></p>
                        <p><b>Sub Region: </b><span className="sub-region">{countryData.sub_region}</span></p>
                        <p><b>Capital: </b><span className="capital">{countryData.capital_name}</span></p>
                        <p>
                            <b>Top Level Domain: </b><span className="top-level-domain">{countryData.top_level_domain}</span>
                        </p>
                        <p><b>Currencies: </b><span className="currencies">{countryData.currencies}</span></p>
                        <p><b>Languages: </b><span className="languages">{countryData.languages}</span></p>
                    </div>
                    {
                        countryData.border_boundries && 
                        <div className="border-countries">
                            <b>Border Countries:  
                                {countryData.border_boundries.map((border) => <Link className='border-link' to={`/${border}`} key={border}>{border}</Link> )} 
                            </b>
                        &nbsp;
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Country