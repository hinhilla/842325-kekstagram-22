
import { pageBody } from './show-full.js';

const formBlock = pageBody.querySelector('.img-upload__form');
const textHashtags = formBlock.querySelector('.text__hashtags');
// const textDescription = formBlock.querySelector('.text__description');

textHashtags.addEventListener('input', () => {
  const hashtagsArray = textHashtags.value.split(' ');


  const isHashtag = (string) => {
    return ((string[0] === '#') || (string == ''));
  }
  const isTooShort = (string) => {
    return string.length === 1;
  }
  const isTooLong = (string) => {
    return string.length > 20;
  }

  if (!hashtagsArray.every(isHashtag)) {
    textHashtags.setCustomValidity('хэштег должен начинаться с #');
    textHashtags.classList.add('error-validity');
  } else if (hashtagsArray.some(isTooShort)) {
    textHashtags.setCustomValidity('введите хотя бы один символ');
    textHashtags.classList.add('error-validity');
  } else if (hashtagsArray.some(isTooLong)) {
    textHashtags.setCustomValidity('хэштег слишком длинный');
    textHashtags.classList.add('error-validity');
  } else if (hashtagsArray.length > 5) {
    textHashtags.setCustomValidity('хэштегов может быть не больше пяти');
    textHashtags.classList.add('error-validity');
  } else {
    const isNumberOrLetter = (simbol) => simbol.match(/[a-z0-9A-Zа-яА-Я]/);
    hashtagsArray.every((elementArray) => {
      let hashtag = elementArray.split('');
      return hashtag.every((element, index) => {
        if ((index !== 0) && (isNumberOrLetter(element) == null)) {
          textHashtags.setCustomValidity('в хэштеге могут быть только буквы и числа');
          textHashtags.classList.add('error-validity');

          return false;
        } else {
          textHashtags.setCustomValidity('');
          textHashtags.classList.remove('error-validity');
          return true;
        }
      });
    });

  }
  textHashtags.reportValidity();

});
// const array = ["a", "b", "a", "a"];
// array.every((currentElementArray, currentIndex) => {
//   console.log(currentElementArray);
//   console.log(array[currentIndex + 1]);
//   return console.log(currentElementArray !== array[currentIndex + 1]);
// })
