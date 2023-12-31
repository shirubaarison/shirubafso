const CountryView = ({ country }) => {
    const name = country.name.common
    const capital = country.capital[0]
    const area = country.area

    const flag = country.flags.png
    const flagStyles = {
    height: 300,
    width: 'auto'
    }

    const languages = Object.values(country.languages)    
    
    return (
    <div>
    <h1>{name}</h1>
    <p>capital {capital}</p>
    <p>area {area}</p>
    <h3>languages</h3>
    <ul>
        {languages.map(lang => 
        <li key={lang}>{lang}</li>
        )}
    </ul>
    <img style={flagStyles} src={flag}></img>
    </div> 
    )
}

const View = ({ countries, setCountries }) => {
    
    // Show button
    const showButton = name => {
        const coun = [countries.find(c => c.name.common === name)]
        
        setCountries(coun)
    }
    
    if (countries.length > 10) {
      return <div><p>too many matches bro</p></div>
    }
    else if (countries.length === 1) {
      return <CountryView country={countries[0]} />
    }
    return (
      <div>
        {countries.map(country => (
          <p key={country.name.common}>{country.name.common} <button onClick={() => showButton(country.name.common)}>show</button></p>
        ))}
      </div>
    );
  };

export default View