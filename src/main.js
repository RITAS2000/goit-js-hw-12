import { showImg } from './js/pixabay-api.js';
import {
  clearGallery,
  resetPage,
  hideLoadMoreButton,
} from './js/render-functions.js';

export let value = '';

const form = document.querySelector('.form');
const input = document.querySelector('.input');

form.addEventListener('submit', event => {
  event.preventDefault();
  value = input.value.trim();
  hideLoadMoreButton();

  if (!value) {
    clearGallery();
    return;
  }
  input.value = '';
  resetPage();

  clearGallery();
  showImg(value);
});
