import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import iconError from './img/octagon.svg';
import iconOh from './img/oh.svg';
import { getImg } from './js/pixabay-api.js';
import { createElement, clearGallery } from './js/render-functions.js';

export let value = '';
export let page = 1;

const form = document.querySelector('.form');
const input = document.querySelector('.input');
const buttonLoadMore = document.querySelector('.more-button');

form.addEventListener('submit', async event => {
  event.preventDefault();
  value = input.value.trim();

  if (!value) {
    clearGallery();
    hideLoadMoreButton();
    return;
  }
  input.value = '';
  page = 1;
  clearGallery();
  showLoader();
  try {
    const data = await getImg(value, page);
    let hits = data.hits;
    const totalHits = data.totalHits;

    if (hits.length === 0) {
      loaderHidden();
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        iconUrl: iconError,
        maxWidth: '432px',
        timeout: 3000,
      });
    } else {
      createElement(hits);
      const totalLi = document.querySelectorAll('.gallery-item').length;

      if (totalLi >= totalHits) {
        limitOff();
        hideLoadMoreButton();
      } else {
        showLoadMoreButton();
      }
      loaderHidden();
    }
  } catch (error) {
    loaderHidden();
    if (error.response) {
      iziToast.show({
        title: 'Server Error',
        titleColor: '#FFFFFF',
        message: error.response.data?.message || 'Server error occurred.',
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        iconUrl: iconError,
        maxWidth: '432px',
        timeout: 3000,
      });
    } else if (error.request) {
      iziToast.show({
        title: 'Network Error',
        titleColor: '#FFFFFF',
        message: 'Network error occurred. Please check your connection.',
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        iconUrl: iconError,
        maxWidth: '432px',
        timeout: 3000,
      });
    } else {
      iziToast.show({
        title: 'Error',
        titleColor: '#FFFFFF',
        message: error.message || 'An unexpected error occurred',
        messageColor: '#FFFFFF',
        position: 'topRight',
        color: '#ef4040',
        iconUrl: iconError,
        maxWidth: '432px',
        timeout: 3000,
      });
    }
  }
});

buttonLoadMore.addEventListener('click', async () => {
  page += 1;
  showLoader();

  const data = await getImg(value, page);
  let hits = data.hits;
  const totalHits = data.totalHits;

  createElement(hits);
  if (page > 1) {
    const galleryItem = document.querySelector('.gallery-item');
    const cardHeight = galleryItem.getBoundingClientRect().height;
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });
  }
  const totalLi = document.querySelectorAll('.gallery-item').length;

  if (totalLi >= totalHits) {
    limitOff();
    hideLoadMoreButton();
  } else {
    showLoadMoreButton();
  }
  loaderHidden();
});

function showLoadMoreButton() {
  buttonLoadMore.style.display = 'block';
}

function hideLoadMoreButton() {
  buttonLoadMore.style.display = 'none';
}

function loaderHidden() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('hidden');
  }
}

function showLoader() {
  const loader = document.querySelector('.loader');
  const gallery = document.querySelector('.gallery');
  const buttonLoadMore = document.querySelector('.more-button');

  if (page > 1) {
    if (gallery.children.length > 0) {
      loader.style.position = 'relative';
      loader.style.marginTop = '36px';
    }
  } else {
    loader.style.position = '';
    loader.style.marginTop = '';
  }
  if (buttonLoadMore) {
    buttonLoadMore.style.display = 'none';
  }
  loader.classList.remove('hidden');
}

function limitOff() {
  hideLoadMoreButton();
  iziToast.show({
    message: "We're sorry, but you've reached the end of search results.",
    messageColor: '#FFFFFF',
    position: 'topRight',
    color: '#FFA000',
    iconUrl: iconOh,
    timeout: 3000,
  });
}
