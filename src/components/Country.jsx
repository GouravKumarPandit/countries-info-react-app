import { useEffect, useState } from 'react'
import './Country.css'
import { Link, useLocation, useParams } from 'react-router-dom';
import HorizontalShimmerCard from './HorizontalShimmerCard';

function Country() {
    const location = useLocation();
    const singleCountryData = location.state;
    let countryDataObj = {};
    if(singleCountryData){
        countryDataObj = {
            flag: singleCountryData?.flags.svg,
            country_name: singleCountryData?.name.common,
            native_name: Object.values(singleCountryData?.name.nativeName)[0].common,
            population: singleCountryData?.population.toLocaleString('en-IN'),
            region: singleCountryData?.region,
            sub_region: singleCountryData?.subregion,
            capital_name: singleCountryData?.capital?.[0],
            top_level_domain: singleCountryData?.tld.join(', '),
            currencies: Object.values(singleCountryData?.currencies).map((currency) => currency.name).join(', '),
            languages: Object.values(singleCountryData?.languages).join(', '),
            border_boundries: singleCountryData.borders ? singleCountryData.borders : []
        }
    }
    const [countryData, setCountryData] = useState(countryDataObj);
    const {country} = useParams('country');

    useEffect(() => {
        if(!singleCountryData){
            // console.log("Indside If Fetch....")
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
        } else{
            // console.log("Inside Else Promise....")
            countryData && Promise.all(
                countryData.border_boundries.map((border) => {
                    return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                        .then((result) => result.json())
                        .then(([borderData]) => borderData.name.common )
                })
            ).then((allBorder) => {
                return setCountryData((previousState) => ({...previousState, border_boundries: allBorder}));
            })
        }
    }, [location]);

    if(Object.values(countryData).length == 0){
        return <HorizontalShimmerCard />
    } else{
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
                                <b>Border Countries:  </b>
                                {countryData.border_boundries.map((border) => <Link key={border} to={`/${border}`}>{border}</Link>)}
                            </div>
                        }
                    </div>
                </div>
            </div> 
        )
    }
}

export default Country