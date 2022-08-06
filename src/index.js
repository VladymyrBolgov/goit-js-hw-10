import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

const searchCountries = (event) => {
    event.preventDefault();

    const searchValue = input.value;
    let spaceSearchValue = searchValue.trim();

    if (spaceSearchValue === '') {
        removeHTML()
        Notiflix.Notify.info('Пожалуйста, введите имя');
        return
    }

    fetchCountries(spaceSearchValue)
        .then(renderOpenСountry)
        .catch(ifFetchError)
}
input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

function renderOpenСountry (countries) {
    const size = Object.keys(countries).length;
    removeHTML();
    for (const country of countries) {
        const { flags, name, capital, population, languages } = country;

        const createElementSymbols =
            ``


        const createElementInfo =
            ``

        if (size > 10) {
            Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            return
        }
        visualization(size, createElementSymbols, createElementInfo)
    }
}

function visualization(size, createElementSymbols, createElementInfo) {
    if (size <= 1) {
        countryList.insertAdjacentHTML('beforeend', createElementSymbols);
        countryInfo.insertAdjacentHTML('beforeend', createElementInfo);
    }
    else {
        countryList.insertAdjacentHTML('beforeend', createElementSymbols);
    }
}

function ifFetchError(error) {
    Notiflix.Notify.failure('Oops, there is no country with that name');
}

