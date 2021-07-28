
import { pictures as currentPictures } from './show.js';
import { closeModal, openModal } from './util.js';
import { HIDDEN_STATE, OPEN_MODAL_STATE } from './contstants.js';
// import { use } from 'browser-sync';




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
const socialCommentsLoader = bigPictureBlock.querySelector('.comments-loader');
const listFragment = document.createDocumentFragment();
const GROUP_OF_COMMENTS_TO_SHOW = 5;



const getBigPictureInfo = (array) => {
  const currentPicturesList = currentPictures.querySelectorAll('.picture');
  currentPicturesList.forEach((currentPicture, index) => {
    currentPicture.addEventListener('click', () => {


      openModal(bigPictureBlock, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);




      const currentImg = currentPicture.querySelector('.picture__img');
      const currentLike = currentPicture.querySelector('.picture__likes');
      const currentCommentsCount = currentPicture.querySelector('.picture__comments');

      bigPicture.alt = currentImg.alt;
      bigPicture.src = currentImg.src;
      bigPictureLike.textContent = currentLike.textContent;
      bigPictureCommentsCount.textContent = currentCommentsCount.textContent;
      bigPictureDescription.textContent = array[index].description;
      bigPictureCommentsList.innerHTML = '';


      let commentsCount = array[index].comments.length;
      let showedCommentsCount = 0;
      let leftToShowCommentsCount = commentsCount;
      if (commentsCount > GROUP_OF_COMMENTS_TO_SHOW) {
        showSomeComments(index, showedCommentsCount, GROUP_OF_COMMENTS_TO_SHOW);
        showedCommentsCount += GROUP_OF_COMMENTS_TO_SHOW;
        leftToShowCommentsCount -= GROUP_OF_COMMENTS_TO_SHOW;
        socialCommentsLoader.classList.remove(HIDDEN_STATE);
      }
      else {
        showSomeComments(index, showedCommentsCount, commentsCount);
        socialCommentsLoader.classList.add(HIDDEN_STATE);
        commentCount.classList.add(HIDDEN_STATE);
      }
      const showSomeCommentsByClick = () => {
        commentCount.classList.add(HIDDEN_STATE);
        if (leftToShowCommentsCount > GROUP_OF_COMMENTS_TO_SHOW) {
          showSomeComments(index, showedCommentsCount, showedCommentsCount + GROUP_OF_COMMENTS_TO_SHOW);
          showedCommentsCount += GROUP_OF_COMMENTS_TO_SHOW;
          leftToShowCommentsCount -= GROUP_OF_COMMENTS_TO_SHOW;
        } else {
          showSomeComments(index, showedCommentsCount, commentsCount);
          socialCommentsLoader.classList.add(HIDDEN_STATE);
        }

      }
      socialCommentsLoader.addEventListener('click', showSomeCommentsByClick);
      bigPictureCloseButton.addEventListener('click', () => {
        closeModal(bigPictureBlock, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);
        socialCommentsLoader.removeEventListener('click', showSomeCommentsByClick);
        commentCount.classList.remove(HIDDEN_STATE);
      });
      document.addEventListener('keydown', (evt) => {
        if (evt.code === 'Escape') {
          closeModal(bigPictureBlock, pageBody, HIDDEN_STATE, OPEN_MODAL_STATE);
          socialCommentsLoader.removeEventListener('click', showSomeCommentsByClick);
          commentCount.classList.remove(HIDDEN_STATE);
        }
      })






    });
  });







  // const showAllComments = (currentElement) => {
  //   const commentsList = array[currentElement].comments;
  //   bigPictureCommentsList.innerHTML = '';
  //   commentsList.forEach((element) => {
  //     const currentComment = getOneComment(element);
  //     listFragment.appendChild(currentComment);
  //   });
  //   showSomeComments(listFragment);
  // }

  const showSomeComments = (indexOfCurrentPhoto, indexOfFirstComment, indexOfLastComment) => {
    const commentsList = array[indexOfCurrentPhoto].comments;

    // bigPictureCommentsList.innerHTML = '';


    commentsList.slice(indexOfFirstComment, indexOfLastComment).forEach((_, index, array) => {
      // console.log(index);
      // console.log(array);
      const currentComment = getOneComment(array, index);
      // console.log(currentComment);
      listFragment.appendChild(currentComment);
      // console.log(listFragment);
    });
    bigPictureCommentsList.appendChild(listFragment);
  }


  const getOneComment = (arrayOfComments, indexOfComment) => {
    const comment = bigPictureCommentsItem.cloneNode(true);
    const commentImg = comment.querySelector('.social__picture');
    const commentText = comment.querySelector('.social__text');
    const commentMessage = arrayOfComments[indexOfComment].message;

    commentImg.src = arrayOfComments[indexOfComment].avatar;
    commentImg.alt = arrayOfComments[indexOfComment].name;
    // console.log(comment);
    commentText.textContent = commentMessage;
    return comment;
  }
}







export { HIDDEN_STATE };
export { pageBody };
export { OPEN_MODAL_STATE };
export { getBigPictureInfo };

