//
import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import  fetchCountries  from './fetchCountries';

const DEBOUNCE_DELAY = 300;
//
const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');
//
input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));
//
function searchCountries(e){
    e.preventDefault();

    const searchValue = input.value;
    let spaceSearchValue = searchValue.trim();

    if (spaceSearchValue === '') {
        removeHTML()
        Notiflix.Notify.info('Пожалуйста, введите имя');
        return
    }

    fetchCountries(spaceSearchValue)
        .then(renderСountryCard)
        .catch(onFetchError)
}
//
function renderСountryCard (countries) {
    const size = Object.keys(countries).length;
    removeHTML();
    for (const country of countries) {
        const { flags, name, capital, population, languages } = country;

        const createElementSymbols =
            `<li class='country-item'> 
            <a class='country-flag' href='${flags.svg}'>
            <img src='${flags.svg}' alt='${name.official}' width='30'>
            </a>
            <h2 class='country-name'> ${name.official}</h2>
            </li>`;
        
        const createElementInfo =
            `<p class='country-capital'><b>capital: </b><i>${capital}</i></p>
            <p class='country-population'><b>population: </b><i>${population}</i></p>
            <p class='country-languages'><b>languages: </b><i>${Object.values(languages)}</i></p>`;

        if (size > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return
        }
        visualization(size, createElementSymbols, createElementInfo)
    }
}
//
function visualization(size, createElementSymbols, createElementInfo) {
    if (size <= 1) {
        countryList.insertAdjacentHTML('beforeend', createElementSymbols);
        countryInfo.insertAdjacentHTML('beforeend', createElementInfo);
    }
    else {
        countryList.insertAdjacentHTML('beforeend', createElementSymbols);
    }
}
//
function onFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}
//
function removeHTML () {
    countryList.innerHTML = '';
    countryInfo.innerHTML = '';
}