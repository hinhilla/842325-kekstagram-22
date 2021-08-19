
import { addCardOnPage } from './show.js';
import { getBigPictureInfo } from './show-full.js';

const URL = 'https://22.javascript.pages.academy/kekstagram/data'

fetch(URL)
  .then((response) => {
    return toJSON(response)
  })
  .then((photos) => {
    addCardOnPage(photos);
    getBigPictureInfo(photos);
    console.log(photos);
  })
  .catch(() => {
    console.log('ошибка загрузки данных');
  })

const toJSON = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    throw Error;
  }
}
