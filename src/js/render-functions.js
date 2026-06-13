import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import errorIcon from '../img/error.svg';
import infoIcon from '../img/info.svg';

const refs = {
  galleryElem: document.querySelector('.gallery'),
  loaderElem: document.querySelector('.loader'),
  loadMoreBtnElem: document.querySelector('.gallery-btn'),
};

const gallery = new SimpleLightbox('.gallery li a', {
  captionDelay: 250,
  captionsData: 'alt',
});

export const generateErrorToastMessage = message => {
  iziToast.show({
    class: 'toast error-toast',
    backgroundColor: '#ef4040',
    messageColor: '#fff',
    iconUrl: errorIcon,
    position: 'topRight',
    message,
  });
};

export const generateInfoToastMessage = message => {
  iziToast.show({
    class: 'toast info-toast',
    backgroundColor: '#09f',
    messageColor: '#fff',
    iconUrl: infoIcon,
    position: 'topRight',
    message,
  });
};

const getAltValue = tags => {
  const tag = tags.split(',')[0].trim();
  return tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase();
};

export const renderImageCard = ({
  webformatURL,
  largeImageURL,
  tags,
  likes,
  views,
  comments,
  downloads,
}) => `<li class="gallery-item">
            <a class="gallery-link" href="${largeImageURL}"
              ><img class="gallery-img" src="${webformatURL}" alt="${getAltValue(tags)}" width="360" height="200" />
            </a>
            <div class="gallery-description">
              <p class="gallery-description-item"><span class="gallery-description-title">Likes: </span>${likes}</span>
              <p class="gallery-description-item"><span class="gallery-description-title">Views: </span>${views}</p>
              <p class="gallery-description-item"><span class="gallery-description-title">Comments: </span>${comments}</p>
              <p class="gallery-description-item"><span class="gallery-description-title">Downloads: </span>${downloads}</p>
            </div> 
        </li>`;

export const createGallery = images => {
  const galleryMarkup = images.map(renderImageCard).join('');
  refs.galleryElem.insertAdjacentHTML('beforeend', galleryMarkup);
  gallery.refresh();
};

export const clearGallery = () => {
  refs.galleryElem.innerHTML = '';
};

export const showLoader = () => {
  refs.loaderElem.classList.remove('is-hidden');
};

export const hideLoader = () => {
  refs.loaderElem.classList.add('is-hidden');
};

export const showLoadMoreButton = () => {
  refs.loadMoreBtnElem.classList.remove('is-hidden');
};

export const hideLoadMoreButton = () => {
  refs.loadMoreBtnElem.classList.add('is-hidden');
};

export const scrollToNewImages = () => {
  // Get the card after it's rendered to the DOM
  const galleryCartElem = document.querySelector('.gallery-item');
  const cardSize = galleryCartElem.getBoundingClientRect();
  window.scrollBy({
    top: cardSize.height * 2,
    behavior: 'smooth',
  });
};
