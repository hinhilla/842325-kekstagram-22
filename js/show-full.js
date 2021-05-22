
import { pictures as currentPictures } from './show.js';
// import { randomArray as randomPhotoList } from './show.js';
import { closeModal, openModal } from './util.js';
import { HIDDEN_STATE, OPEN_MODAL_STATE } from './contstants.js';




const pageBody = document.body;
const bigPictureBlock = pageBody.querySelector('.big-picture');
const bigPictureWrapper = bigPictureBlock.querySelector('.big-picture__img');
const bigPicture = bigPictureWrapper.querySelector('img');
const bigPictureCloseButton = bigPictureBlock.querySelector('.big-picture__cancel');
const bigPictureLike = bigPictureBlock.querySelector('.likes-count');
const bigPictureCommentsCount = bigPictureBlock.querySelector('.comments-count');
const bigPictureCommentsList = bigPictureBlock.querySelector('.social__comments');
const bigPictureCommentsItem = bigPictureCommentsList.querySelector('li');
const bigPictureDescription = bigPictureBlock.querySelector('.social__caption');
const commentCount = bigPictureBlock.querySelector('.social__comment-count');
const newPicturesButton = bigPictureBlock.querySelector('.comments-loader');
const listFragment = document.createDocumentFragment();


const getBigPictureInfo = (array) => {
  const currentPicturesList = currentPictures.querySelectorAll('.picture');
  currentPicturesList.forEach((currentPicture, index) => {
    currentPicture.addEventListener('click', () => {


      openModal(bigPictureBlock, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);


      commentCount.classList.add(HIDDEN_STATE);
      newPicturesButton.classList.add(HIDDEN_STATE);

      const currentImg = currentPicture.querySelector('.picture__img');
      const currentLike = currentPicture.querySelector('.picture__likes');
      const currentCommentsCount = currentPicture.querySelector('.picture__comments');

      bigPicture.alt = currentImg.alt;
      bigPicture.src = currentImg.src;
      bigPictureLike.textContent = currentLike.textContent;
      bigPictureCommentsCount.textContent = currentCommentsCount.textContent;
      bigPictureDescription.textContent = array[index].description;

      getAllComments(index);
    });
  })

  const getAllComments = (currentElement) => {
    const commentsList = array[currentElement].comments;
    bigPictureCommentsList.innerHTML = '';
    commentsList.forEach((element) => {
      const currentComment = bigPictureCommentsItem.cloneNode(true);
      const currentCommentImg = currentComment.querySelector('.social__picture');
      const currentCommentText = currentComment.querySelector('.social__text');
      // const commentMessage = element.message.join(' ');
      const commentMessage = element.message;

      currentCommentImg.src = element.avatar;
      currentCommentImg.alt = element.name;
      currentCommentText.textContent = commentMessage;

      listFragment.appendChild(currentComment);
    });
    bigPictureCommentsList.appendChild(listFragment);
  }
}

bigPictureCloseButton.addEventListener('click', () => {
  closeModal(bigPictureBlock, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);
});
document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    closeModal(bigPictureBlock, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);
  }
})



export { HIDDEN_STATE };
export { pageBody };
export { OPEN_MODAL_STATE };
export { getBigPictureInfo };

