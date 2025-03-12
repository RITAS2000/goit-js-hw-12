import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

const gallery = document.querySelector('.gallery');

export function createElement(hits) {
  const galleryElements = hits
    .map(hit => {
      return `
      <li class="gallery-item">
        <a href="${hit.largeImageURL}" class="gallery-link">
          <img src="${hit.webformatURL}" alt="${hit.tags}" class="gallery-image">
        </a>
        <ul class="text-ul">
          <li class="text-li likes">
            <h3 class="title">Likes</h3>
            <p class="text">${hit.likes}</p>
          </li>
          <li class="text-li views">
            <h3 class="title">Views</h3>
            <p class="text">${hit.views}</p>
          </li>
          <li class="text-li comments">
            <h3 class="title">Comments</h3>
            <p class="text">${hit.comments}</p>
          </li>
          <li class="text-li downloads">
            <h3 class="title">Downloads</h3>
            <p class="text">${hit.downloads}</p>
          </li>
        </ul>
      </li>`;
    })
    .join('');
  gallery.insertAdjacentHTML('beforeend', galleryElements);
  lightbox.refresh();
}

export function clearGallery() {
  gallery.innerHTML = '';
}
