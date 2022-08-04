import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

input.addEventListener('input', debounce(searchCountries, DEBOUNCE_DELAY));

const searchCountries = (event => {
    event.preventDefault();

    const url = fetchCountries();
    
    fetch(url)
        .then((response) => response.json())
    
        .catch((error) => {
            console.log("error", error);
          });

})

