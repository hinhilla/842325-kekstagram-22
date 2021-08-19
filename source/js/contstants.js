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
const HIDDEN_STATE = 'hidden';
const OPEN_MODAL_STATE = 'modal-open';

export { MAX_COMMENT_LENGHT, ERROR_CLASS, ERROR_MESSAGES, HIDDEN_STATE, OPEN_MODAL_STATE };
