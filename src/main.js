import {
  generateErrorToastMessage,
  generateInfoToastMessage,
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
  scrollToNewImages,
} from './js/render-functions';
import { getImagesByQuery, PER_PAGE } from './js/pixabay-api';

const refs = {
  searchForm: document.querySelector('.form'),
  loadMoreBtnElem: document.querySelector('.gallery-btn'),
};

const errorMessages = {
  emptySearchQuery: 'Search query should not be empty!',
  noImagesFound:
    'Sorry, there are no images matching your search query. Please try again!',
  endOfResults: "We're sorry, but you've reached the end of search results.",
};

let page;
let totalPages;
let currentQuerry;

const onSearchSubmit = async event => {
  try {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements['search-text'].value.trim();

    if (!searchQuery) {
      generateErrorToastMessage(errorMessages.emptySearchQuery);
      return;
    }

    page = 1;
    totalPages = null;
    currentQuerry = searchQuery;
    hideLoadMoreButton();
    clearGallery();
    showLoader();

    const { hits, total } = await getImagesByQuery(currentQuerry, page);

    if (!hits.length) {
      generateErrorToastMessage(errorMessages.noImagesFound);
      return;
    }

    if (!totalPages) {
      totalPages = Math.ceil(total / PER_PAGE);
    }

    createGallery(hits);

    if (page < totalPages) {
      showLoadMoreButton();
      refs.loadMoreBtnElem.addEventListener('click', onLoadMoreBtnClick);
    } else {
      generateInfoToastMessage(errorMessages.endOfResults);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

const onLoadMoreBtnClick = async () => {
  try {
    showLoader();
    page += 1;

    const { hits } = await getImagesByQuery(currentQuerry, page);
    createGallery(hits);
    scrollToNewImages();

    if (page >= totalPages) {
      generateInfoToastMessage(errorMessages.endOfResults);
      hideLoadMoreButton();
      refs.loadMoreBtnElem.removeEventListener('click', onLoadMoreBtnClick);
    }
  } catch (error) {
    console.log(error);
  } finally {
    hideLoader();
  }
};

refs.searchForm.addEventListener('submit', onSearchSubmit);
