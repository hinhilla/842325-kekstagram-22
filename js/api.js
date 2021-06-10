/* global _:readonly */
import { addCardOnPage, removeCardsFromPage } from './show.js';
import { getBigPictureInfo } from './show-full.js';
import { pageBody } from './upload-form.js';
import { mixNumbersFromTo, INITIAL_COUNT } from './util.js';
const URL = 'https://22.javascript.pages.academy/kekstagram/data'

fetch(URL)
  .then((response) => toJSON(response))
  .then((photos) => {
    addCardOnPage(photos);
    getBigPictureInfo(photos);

    const filtersBlock = document.querySelector('.img-filters');
    filtersBlock.classList.remove('img-filters--inactive');
    const filtersContainer = pageBody.querySelector('.img-filters');
    const filterDefault = filtersContainer.querySelector('#filter-default');
    const filterRandom = filtersContainer.querySelector('#filter-random');
    const filterDiscussed = filtersContainer.querySelector('#filter-discussed');
    const RANDOM_ARRAY_COUNT = 10;
    const RERENDER_DELAY = 500;

    const renderRandomPhotos = () => {
      const unicArray = mixNumbersFromTo(0, INITIAL_COUNT - 1, INITIAL_COUNT).slice(0, RANDOM_ARRAY_COUNT);
      const arrayRandom = unicArray.map((photoIndex) => photos[photoIndex]);
      console.log(arrayRandom);
      removeCardsFromPage();
      addCardOnPage(arrayRandom);
      getBigPictureInfo(arrayRandom);
    };
    filterRandom.addEventListener(('click'), (_.debounce(renderRandomPhotos, RERENDER_DELAY)));

    const renderDiscussedPhotos = () => {
      const arrayDiscussed = photos.slice();
      arrayDiscussed.sort(compareFunction).slice;
      console.log(arrayDiscussed);
      removeCardsFromPage();
      addCardOnPage(arrayDiscussed);
      getBigPictureInfo(arrayDiscussed);
    };
    filterDiscussed.addEventListener(('click'), (_.debounce(renderDiscussedPhotos, RERENDER_DELAY)));

    const renderDefaultPhotos = () => {
      removeCardsFromPage();
      addCardOnPage(photos);
      getBigPictureInfo(photos);
    };
    filterDefault.addEventListener(('click'), (_.debounce(renderDefaultPhotos, RERENDER_DELAY)));
  })
  .catch((error) => {
    console.log(error);
  });

const toJSON = (response) => {
  if (response.ok) {
    return response.json()
  } else {
    throw Error;
  }
}

const compareFunction = (photoA, photoB) => {
  return (photoB.comments.length) - (photoA.comments.length);
}
