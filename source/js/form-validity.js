
import { pageBody } from './show-full.js';
import { MAX_COMMENT_LENGHT, ERROR_CLASS, ERROR_MESSAGES } from './contstants.js';

const formBlock = pageBody.querySelector('.img-upload__form');
const textHashtags = formBlock.querySelector('.text__hashtags');
const commentField = formBlock.querySelector('.text__description');

const isNumberOrLetter = (simbol) => simbol.match(/[\w]/);
textHashtags.addEventListener('input', () => {
  const hashtagsArray = textHashtags.value.split(' ');
  textHashtags.value = textHashtags.value.replace(/\s+/g, ' ');
  const firstSimbolInvalid = !hashtagsArray.every(isHashtag);
  const minLengthInvalid = hashtagsArray.some(isTooShort);
  const maxLengthInvalid = hashtagsArray.some(isTooLong);
  const maxNumberOfHashtags = hashtagsArray.length > 5;
  const NumberOrLetter = getNumberOrLetterValue(hashtagsArray);
  const notUnicArray = !getUnicArray(hashtagsArray);
  switch (true) {
    case (firstSimbolInvalid):
      showValidationMessage(textHashtags, ERROR_MESSAGES.start);
      break;
    case (minLengthInvalid):
      showValidationMessage(textHashtags, ERROR_MESSAGES.minLength);
      break;
    case (maxLengthInvalid):
      showValidationMessage(textHashtags, ERROR_MESSAGES.maxLength);
      break;
    case (maxNumberOfHashtags):
      showValidationMessage(textHashtags, ERROR_MESSAGES.maxNumberOfHashtags);
      break;
    case (notUnicArray):
      showValidationMessage(textHashtags, ERROR_MESSAGES.notUnic);
      break;
    case (!NumberOrLetter):
      showValidationMessage(textHashtags, ERROR_MESSAGES.onlyNumbersAndLetters);
      break;
    default:
      hideValidationMessage(textHashtags);
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
  return (unicArray.size === lowerCaseArray.length) ? true : false;
}
const isHashtag = (string) => {
  return ((string[0] === '#') || (string == ''));
}
const isTooShort = (string) => {
  return string.length === 1;
}
const isTooLong = (string) => {
  return string.length > 20;
}

const getNumberOrLetterValue = (array) => {
  return array.every((currentValue) => {
    let hashtag = currentValue.split('');
    return hashtag.every((currentValue, index) => {
      return ((index === 0) || (isNumberOrLetter(currentValue) !== null)) ? true : false;
    });
  });
}
const checkCommentLength = () => {
  (commentField.value.length >= MAX_COMMENT_LENGHT) ?
    showValidationMessage(commentField, ERROR_MESSAGES.commentLength) :
    hideValidationMessage(commentField);
}
commentField.addEventListener('input', (checkCommentLength));
const stopPropagationOnFocus = (field) => {
  field.addEventListener('focus', () => {
    return field.addEventListener('keydown', (evt) => {
      if (evt.keyCode === 27) {
        evt.stopPropagation();
        return;
      }
    });
  })
}



stopPropagationOnFocus(textHashtags);
stopPropagationOnFocus(commentField);

const showValidationMessage = (element, message) => {
  element.setCustomValidity(message);
  element.classList.add(ERROR_CLASS);
}
const hideValidationMessage = (element) => {
  element.setCustomValidity('');
  element.classList.remove(ERROR_CLASS)
}
