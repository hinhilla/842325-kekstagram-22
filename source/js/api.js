

import { processingData } from './processing-data.js'

const URL = 'https://23.javascript.pages.academy/kekstagram/data'

const toJSON = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    throw Error;
  }
}

const getData = (url) => {
  fetch(url)
    .then((response) => toJSON(response))
    .then((data) => {
      processingData(data)
    })
    .catch((error) => {
      console.log(error);
    });
};

getData(URL);


