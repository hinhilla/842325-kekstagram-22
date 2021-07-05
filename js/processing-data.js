/* global _:readonly */
import { addCardOnPage, removeCardsFromPage } from './show.js';
import { getBigPictureInfo } from './show-full.js';
import { pageBody } from './upload-form.js';
import { mixNumbersFromTo, INITIAL_COUNT } from './util.js';

const processingData = (data) => {
  addCardOnPage(data);
  getBigPictureInfo(data);
  console.log(data);

  const filtersBlock = document.querySelector('.img-filters');
  filtersBlock.classList.remove('img-filters--inactive');

  const filtersContainer = pageBody.querySelector('.img-filters');
  const filterDefault = filtersContainer.querySelector('#filter-default');
  const filterRandom = filtersContainer.querySelector('#filter-random');
  const filterDiscussed = filtersContainer.querySelector('#filter-discussed');
  const RANDOM_ARRAY_COUNT = 10;
  const RERENDER_DELAY = 500;

  // const socialCommentsLoader = pageBody.querySelector('.comments-loader');
  // // socialCommentsLoader.classList.add('hidden');


  const renderRandomPhotos = () => {
    const unicArray = mixNumbersFromTo(0, INITIAL_COUNT - 1, INITIAL_COUNT).slice(0, RANDOM_ARRAY_COUNT);
    const arrayRandom = unicArray.map((photoIndex) => data[photoIndex]);
    console.log(arrayRandom);
    removeCardsFromPage();
    addCardOnPage(arrayRandom);
    getBigPictureInfo(arrayRandom);
  };

  filterRandom.addEventListener(('click'), (_.debounce(renderRandomPhotos, RERENDER_DELAY)));

  const renderDiscussedPhotos = () => {
    const arrayDiscussed = [...data].sort((array1, array2) => (array2.comments.length) - (array1.comments.length));
    console.log(arrayDiscussed);
    removeCardsFromPage();
    addCardOnPage(arrayDiscussed);
    getBigPictureInfo(arrayDiscussed);




  };
  filterDiscussed.addEventListener(('click'), (_.debounce(renderDiscussedPhotos, RERENDER_DELAY)));

  const renderDefaultPhotos = () => {
    removeCardsFromPage();
    addCardOnPage(data);
    getBigPictureInfo(data);
  };
  filterDefault.addEventListener(('click'), (_.debounce(renderDefaultPhotos, RERENDER_DELAY)));



};


export { processingData }
