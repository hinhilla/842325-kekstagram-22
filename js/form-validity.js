
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
  onlyNumbersAndLetters: 'в хэштеге могут быть только буквы и числа',
  commentLength: 'комментарий слишком длинный',
  notUnic: 'хэштеги не могут повторяться'
};
const isNumberOrLetter = (simbol) => simbol.match(/[\w]/);
textHashtags.addEventListener('input', () => {
  const hashtagsArray = textHashtags.value.split(' ');
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
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
  const NumberOrLetter = getNumberOrLetterValue(hashtagsArray);
  const notUnicArray = !getUnicArray(hashtagsArray);
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
    case (notUnicArray):
      textHashtags.setCustomValidity(ERROR_MESSAGES.notUnic);
      textHashtags.classList.add(ERROR_CLASS);
      break;
    case (!NumberOrLetter):
      textHashtags.setCustomValidity(ERROR_MESSAGES.onlyNumbersAndLetters);
      textHashtags.classList.add(ERROR_CLASS);
      break;
    default:
      textHashtags.setCustomValidity('');
      textHashtags.classList.remove(ERROR_CLASS);
  }
  textHashtags.reportValidity();
});
const getUnicArray = (array) => {
  let lowerCaseArray = [];
  array.every((currentValue) => {
    lowerCaseArray.push(currentValue.toLowerCase());
    return true;
  })
  const unicArray = new Set(lowerCaseArray);
  if (unicArray.size === lowerCaseArray.length) {
    return true;
  } else {
    return false;
  }
}

const getNumberOrLetterValue = (array) => {
  return array.every((currentValue) => {
    let hashtag = currentValue.split('');
    return hashtag.every((currentValue, index) => {
      if ((index == 0) || (isNumberOrLetter(currentValue) !== null)) {
        return true;
      } else {
        return false;
      }
    });
  });
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
  } else {
    commentField.classList.remove(ERROR_CLASS);
    commentField.setCustomValidity('');
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
