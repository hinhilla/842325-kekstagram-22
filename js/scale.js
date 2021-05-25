import { radioListBlock, pageBody, previewImage } from './upload-form.js';

const sliderElement = pageBody.querySelector('.effect-level__slider');
const sliderValue = pageBody.querySelector('.effect-level__value');
const filters = {
  'none': { filter: 'none', minValue: 0, maxValue: 1, step: 1 },
  'chrome': { filter: 'grayscale', minValue: 0, maxValue: 1, step: 0.1 },
  'sepia': { filter: 'sepia', minValue: 0, maxValue: 1, step: 0.1 },
  'marvin': { filter: 'marvin', minValue: 0, maxValue: 100, step: 1 },
  'phobos': { filter: 'phobos', minValue: 0, maxValue: 3, step: 0.1 },
  'heat': { filter: 'heat', minValue: 1, maxValue: 3, step: 0.1 },
}

window.noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 80,
  step: 1,
  connect: 'lower',

  format: {
    to: function (value) {
      if (Number.isInteger(value)) { return value.toFixed(0); }
      return value.toFixed(1);
    },
    from: function (value) { return parseFloat(value); },
  },
});

sliderElement.classList.add('hidden');

radioListBlock.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    previewImage.className = '';
    if (evt.target.value !== 'none') {
      sliderElement.classList.remove('hidden');
      previewImage.classList.add(`effects__preview--${evt.target.value}`);
    } else {
      sliderElement.classList.add('hidden');
    }
  }

});


sliderElement.noUiSlider.on('update', (values, handle) => {
  sliderValue.value = values[handle];
});

const setEffectLevel = (selectedEffect) => {
  switch (selectedEffect) {
    case 'chrome':
      previewImage.style.filter = `grayscale(${sliderValue.value})`;
      break;
    case 'sepia':
      previewImage.style.filter = `sepia(${sliderValue.value})`;
      break;
    case 'marvin':
      previewImage.style.filter = `invert(${sliderValue.value}%)`;
      break;
    case 'phobos':
      previewImage.style.filter = `blur(${sliderValue.value}px)`;
      break;
    case 'heat':
      previewImage.style.filter = `brightness(${sliderValue.value})`;
      break;
    case 'none':
      previewImage.style.filter = 'none';
      break;
  }
}

const setEffect = (evt) => {
  previewImage.classList = '';
  previewImage.classList.add(`effects__preview--${evt.target.value}`);

  if (evt.target.value !== 'none') {
    sliderElement.classList.remove('hidden');
    previewImage.classList.add(`effects__preview--${evt.target.value}`);
  } else {
    sliderElement.classList.add('hidden');
  }

  const filter = filters[evt.target.value];

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filter.minValue,
      max: filter.maxValue,
    },
    start: filter.maxValue,
    step: filter.step,
  });

  sliderElement.noUiSlider.on('update', () => setEffectLevel(evt.target.value));
}
sliderElement.noUiSlider.on('update', (values, handle) => sliderValue.value = values[handle]);

radioListBlock.addEventListener('change', setEffect);
