
export function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,flags,population,languages`; 
    
    return fetch(url)
        .then((response) => response.json());
}