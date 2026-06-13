# Pixabay Gallery

A small Vite-powered image search application using the Pixabay API.

## Features

- Search for photos by keyword
- Display results in a responsive gallery
- Open large images in a SimpleLightbox modal
- Show a loading indicator while data is fetched
- Notify the user when no results are found

## Technologies

- Vite
- Axios
- SimpleLightbox
- iziToast
- CSS loader for the loading indicator

## Usage

1. Install dependencies:
   ```bash
   npm install
   ```
2. Run the development server:
   ```bash
   npm run dev
   ```
3. Open the local URL shown in the terminal.

## Project structure

- `src/js/pixabay-api.js` — contains `getImagesByQuery(query)` for API requests
- `src/js/render-functions.js` — contains gallery rendering, loader control, and
  SimpleLightbox refresh logic
- `src/main.js` — contains main app logic and form handling

## Notes

- Search requests include `key`, `q`, `image_type=photo`,
  `orientation=horizontal`, and `safesearch=true`
- The gallery is cleared before each new search
- Notifications are shown with iziToast when no matching images are found
