
// const getRandomNumber = (firstNumber, lastNumber) => {
//   if ((firstNumber < 0) || (lastNumber < 0) || (lastNumber <= firstNumber)) {
//     throw 'Неверные данные';
//   } else {
//     return Math.floor(Math.random() * (lastNumber - firstNumber + 1)) + firstNumber;
//   }
// };

// const INITIAL_COUNT = 25;
// const generateArayWithInfo = (length, cb) => new Array(length).fill().map(cb);
// const getRandomElement = (array) => array[getRandomNumber(0, array.length - 1)];
// const getRandomId = () => Math.floor(Math.random() * Math.floor(Math.random() * Date.now()));
// const generateUnicNumbers = (from = 1, to = INITIAL_COUNT, n = to) => [...Array(to - from + 1).keys()].map(i => i + from).reduce((arr, el) => (arr.splice(Math.random() * (arr.length + 1), 0, el), arr), []).slice(0, n);



// const isAllowedString = (string, maxLength) => (string.length <= maxLength) ? true : false;
// isAllowedString('hihi', 10);
const openModal = (element, body, hidden, open) => {
  element.classList.remove(hidden);
  body.classList.add(open);
}
const closeModal = (element, body, hidden, open) => {
  element.classList.add(hidden);
  body.classList.remove(open);
}


// export { getRandomNumber };
// export { generateArayWithInfo };
// export { getRandomElement };
// export { getRandomId };
// export { generateUnicNumbers };
export { openModal, closeModal };
// export { closeModal };
