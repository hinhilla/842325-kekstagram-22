import './show.js';
import { foo } from './show.js';
import { getBigPictureInfo } from './show-full.js';
import './show-full.js'
// import './upload-form.js'
// import './scale.js'
// import './form-validity.js'


fetch('https://22.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {

    foo(photos);
    getBigPictureInfo(photos);
    console.log(photos);
  });


