import {
  generateErrorToastMessage,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';
import { getImagesByQuery } from './js/pixabay-api';

const refs = {
  searchForm: document.querySelector('.form'),
};

const errorMessages = {
  emptySearchQuery: 'Search query should not be empty!',
  noImagesFound:
    'Sorry, there are no images matching your search query. Please try again!',
};

const onSearchSubmit = event => {
  event.preventDefault();
  const form = event.currentTarget;
  const searchQuery = form.elements['search-text'].value.trim();

  if (!searchQuery) {
    generateErrorToastMessage(errorMessages.emptySearchQuery);
    return;
  }

  clearGallery();
  showLoader();

  getImagesByQuery(searchQuery)
    .then(({ data: { hits } }) => {
      if (!hits.length) {
        generateErrorToastMessage(errorMessages.noImagesFound);
        return;
      }

      createGallery(hits);
    })
    .catch(error => console.log(error))
    .finally(() => hideLoader());
};

refs.searchForm.addEventListener('submit', onSearchSubmit);
