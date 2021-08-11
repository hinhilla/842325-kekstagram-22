import { pageBody, HIDDEN_STATE, OPEN_MODAL_STATE } from './show-full.js';
import { openModal, closeModal } from './util.js';

const newImageControl = pageBody.querySelector('#upload-file');
const editImageForm = pageBody.querySelector('.img-upload__overlay');
const closeEditForm = editImageForm.querySelector('#upload-cancel');
const editImageButtonSmaller = editImageForm.querySelector('.scale__control--smaller');
const editImageButtonBigger = editImageForm.querySelector('.scale__control--bigger');
const editImageValue = editImageForm.querySelector('.scale__control--value');
const previewImage = editImageForm.querySelector('.img-upload__preview img');
const radioListBlock = pageBody.querySelector('.effects__list');
const uploadForm = pageBody.querySelector('.img-upload__input');
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

newImageControl.addEventListener('input', () => {
  openModal(editImageForm, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);
});


closeEditForm.addEventListener('click', () => {
  closeModal(editImageForm, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);
  newImageControl.value = '';
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode !== 27) {
    return;
  }
  closeModal(editImageForm, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);
  newImageControl.value = '';
});

const changeNumberToValueOnClick = (changeNumberTo, min, max, button) => {
  button.addEventListener('click', () => {
    const totalValue = parseInt(editImageValue.value) + changeNumberTo;
    if ((totalValue <= max) && (totalValue >= min)) {
      editImageValue.value = `${totalValue}%`;
      previewImage.style.transform = `scale(${parseInt(editImageValue.value) / max})`;
    }
  })
};

changeNumberToValueOnClick(-25, 25, 100, editImageButtonSmaller);
changeNumberToValueOnClick(25, 25, 100, editImageButtonBigger);


export { radioListBlock, pageBody, previewImage };


uploadForm.addEventListener('change', () => {
  const file = uploadForm.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((element) => {
    return fileName.endsWith(element)
  });
  if (matches) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      previewImage.src = reader.result;
    })
    reader.readAsDataURL(file);

  }

});
// previewImage
