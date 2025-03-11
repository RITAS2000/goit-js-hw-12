import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { showImg } from './pixabay-api';
import { value } from '../main';
import iconOh from '../img/oh.svg';

export let page = 1;

export function createElement(hits, page) {
  const gallery = document.querySelector('.gallery');
  if (page === 1) {
    gallery.innerHTML = '';
  }

  const galleryElements = hits.map(hit => {
    const createLi = document.createElement('li');
    createLi.classList.add('gallery-item');
    const createLink = document.createElement('a');
    createLink.classList.add('gallery-link');
    createLink.href = hit.largeImageURL;
    createLink.addEventListener('click', event => event.preventDefault());
    const createImg = document.createElement('img');
    createImg.classList.add('gallery-image');
    createImg.src = hit.webformatURL;
    createImg.alt = hit.tags;

    const createUlText = document.createElement('ul');
    createUlText.classList.add('text-ul');

    const createLiText1 = document.createElement('li');
    createLiText1.classList.add('text-li');
    createLiText1.classList.add('likes');
    const createH31 = document.createElement('h3');
    createH31.classList.add('title');
    createH31.textContent = 'Likes';
    const createP1 = document.createElement('p');
    createP1.classList.add('text');
    createP1.textContent = hit.likes;

    createLiText1.append(createH31, createP1);

    const createLiText2 = document.createElement('li');
    createLiText2.classList.add('text-li');
    createLiText2.classList.add('views');
    const createH32 = document.createElement('h3');
    createH32.classList.add('title');
    createH32.textContent = 'Views';
    const createP2 = document.createElement('p');
    createP2.classList.add('text');
    createP2.textContent = hit.views;

    createLiText2.append(createH32, createP2);

    const createLiText3 = document.createElement('li');
    createLiText3.classList.add('text-li');
    createLiText3.classList.add('comments');
    const createH33 = document.createElement('h3');
    createH33.classList.add('title');
    createH33.textContent = 'Comments';
    const createP3 = document.createElement('p');
    createP3.classList.add('text');
    createP3.textContent = hit.comments;

    createLiText3.append(createH33, createP3);

    const createLiText4 = document.createElement('li');
    createLiText4.classList.add('text-li');
    createLiText4.classList.add('downloads');
    const createH34 = document.createElement('h3');
    createH34.classList.add('title');
    createH34.textContent = 'Downloads';
    const createP4 = document.createElement('p');
    createP4.classList.add('text');
    createP4.textContent = hit.downloads;

    createLiText4.append(createH34, createP4);

    createUlText.append(
      createLiText1,
      createLiText2,
      createLiText3,
      createLiText4
    );

    createLink.append(createImg);
    createLi.append(createLink, createUlText);

    return createLi;
  });
  gallery.append(...galleryElements);

  if (!window.lightbox) {
    window.lightbox = new SimpleLightbox('.gallery a', {
      captionsData: 'alt',
      captionDelay: 250,
    });
  } else {
    window.lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function showLoadMoreButton() {
  let buttonLoadMore = document.querySelector('.more-button');
  buttonLoadMore.style.display = 'block';
  if (!buttonLoadMore.dataset.listener) {
    buttonLoadMore.addEventListener('click', () => {
      page += 1;
      showImg(value, page);
    });

    buttonLoadMore.dataset.listener = 'true';
  }
}

export function hideLoadMoreButton() {
  const buttonLoadMore = document.querySelector('.more-button');
  if (buttonLoadMore) {
    buttonLoadMore.style.display = 'none';
  }
}

hideLoadMoreButton();
export function loaderHidden() {
  const loader = document.querySelector('.loader');
  if (loader) {
    loader.classList.add('hidden');
  }
}

export function showLoader() {
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

export function limitOff() {
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

export function resetPage() {
  page = 1;
}
