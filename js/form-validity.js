
import { pageBody } from './show-full.js';
import { randomArray } from './show.js';

const formBlock = pageBody.querySelector('.img-upload__form');
const textHashtags = formBlock.querySelector('.text__hashtags');
const commentField = formBlock.querySelector('.text__description');
const MAX_COMMENT_LENGHT = 140;
const ERROR_CLASS = 'error-validity';
const ERROR_MESSAGES = {
  start: 'хэштег должен начинаться с #',
  minLength: 'хэштег слишком короткий',
  maxLength: 'хэштег слишком длинный',
  maxNumberOfHashtags: 'хэштегов может быть не больше пяти',
  unic: 'хештеги не могут повторяться',
  onlyNumbersAndLetters: 'в хэштеге могут быть только буквы и числа',
  commentLength: 'комментарий слишком длинный'
};


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

  const firstSimbolInvalid = !hashtagsArray.every(isHashtag);
  const minLengthInvalid = hashtagsArray.some(isTooShort);
  const maxLengthInvalid = hashtagsArray.some(isTooLong);
  const maxNumberOfHashtags = hashtagsArray.length > 5;
  const isNumberOrLetter = (simbol) => simbol.match(/[a-z0-9A-Zа-яА-Я]/);
  let lowerCaseArray = [];

  switch (true) {
    case (firstSimbolInvalid):
      textHashtags.setCustomValidity(ERROR_MESSAGES.start);
      textHashtags.classList.add(ERROR_CLASS);
      break;
    case (minLengthInvalid):
      textHashtags.setCustomValidity(ERROR_MESSAGES.minLength);
      textHashtags.classList.add(ERROR_CLASS);
      break;
    case (maxLengthInvalid):
      textHashtags.setCustomValidity(ERROR_MESSAGES.maxLength);
      textHashtags.classList.add(ERROR_CLASS);
      break;
    case (maxNumberOfHashtags):
      textHashtags.setCustomValidity(ERROR_MESSAGES.maxNumberOfHashtags);
      textHashtags.classList.add(ERROR_CLASS);
      break;
    default:
      hashtagsArray.every((elementArray) => {
        let abc = elementArray.toLowerCase();
        lowerCaseArray.push(abc);
        let hashtag = abc.split('');
        if (isArrayElementUnic(lowerCaseArray) == false) {
          textHashtags.setCustomValidity(ERROR_MESSAGES.unic);
          textHashtags.classList.add(ERROR_CLASS);
        } else {
          textHashtags.setCustomValidity('');
          textHashtags.classList.remove(ERROR_CLASS);
        }
        return hashtag.every((element, index) => {
          if ((index !== 0) && (isNumberOrLetter(element) == null)) {
            textHashtags.setCustomValidity(ERROR_MESSAGES.onlyNumbersAndLetters);
            textHashtags.classList.add(ERROR_CLASS);
            return false;
          } else {
            textHashtags.setCustomValidity('');
            textHashtags.classList.remove(ERROR_CLASS);
            return true;
          }
        });
      });
  }
  textHashtags.reportValidity();
});
const isArrayElementUnic = (array) => {
  for (let i = 0; i < array.length - 1; i++) {
    for (let j = i + 1; j < array.length; j++) {
      if (array[i] === array[j]) {
        return false;
      }
    }
  }
}


textHashtags.addEventListener('focus', () => {
  return textHashtags.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 27) {
      evt.stopPropagation();
      return;
    }
  });
})

commentField.addEventListener('input', () => {
  if (commentField.value.length >= MAX_COMMENT_LENGHT) {
    commentField.classList.add(ERROR_CLASS);
    commentField.setCustomValidity(ERROR_MESSAGES.commentLength);

  }
})
commentField.addEventListener('focus', () => {
  return commentField.addEventListener('keydown', (evt) => {
    if (evt.keyCode == 27) {
      evt.stopPropagation();
      return;
    }
  });
})
