

export const Country = ({ country }) => {
    return (
        <section>
            <h2>
                {country.name.common} 
            </h2>
            <p>
                Capital: {country.capital}
            </p>
            <p>
                Area: {country.area} km2
            </p>
            <h3>Languages</h3>
            <ul>
                {Object.values(country.languages).map((language, i) => 
                    <li key={i}>{language}</li>
                )}
            </ul>
            <br />
            <img src={country.flags.png} alt={country.flags.alt} />
        </section>
    )
}