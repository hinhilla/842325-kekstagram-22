// import { getRandomNumber } from './util.js';
// import { generateArayWithInfo } from './util.js';
// import { getRandomElement } from './util.js';
// import { getRandomId } from './util.js';
// import { generateUnicNumbers } from './util.js';

// const COMMENTS = [
//   'Всё отлично!',
//   'В целом всё неплохо.',
//   'Но не всё.',
//   'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
//   'В конце концов это просто непрофессионально.',
//   'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
//   'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
//   'Лица у людей на фотке перекошены, как будто их избивают.',
//   'Как можно было поймать такой неудачный момент?!',
// ];
// const PEOPLE = ['Николай', 'Вадим', 'Александр', 'Игорь', 'Алексей', 'Валерия'];
// const DESCRIPTIONS = ['Ночь.', 'Улица.', 'Фонарь.', 'Аптека.'];
// const INITIAL_COUNT = 25;

// const getRandomComment = () => {
//   return {
//     id: getRandomId(),
//     avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
//     message: generateArayWithInfo(getRandomNumber(1, 2), () => getRandomElement(COMMENTS)),
//     name: getRandomElement(PEOPLE),
//   };
// };

// const getRandomDescriptionPhoto = (k, generateUnicId = generateUnicNumbers(), generateUnicUrl = generateUnicNumbers()) => {
//   return {
//     id: generateUnicId[k],
//     url: `photos/${generateUnicUrl[k]}.jpg`,
//     description: getRandomElement(DESCRIPTIONS),
//     likes: getRandomNumber(15, 200),
//     comments: generateArayWithInfo(getRandomNumber(6, 10), (() => getRandomComment())),
//   };
// };



// const descriptionPhotoList = generateArayWithInfo(INITIAL_COUNT, (_, k) => getRandomDescriptionPhoto(k));

// export { descriptionPhotoList };
