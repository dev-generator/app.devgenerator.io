import 'bridgetown-quick-search';
import {Application} from 'stimulus';
import {definitionsFromContext} from 'stimulus/webpack-helpers';

import '../styles/index.scss';

const application = Application.start();
const context = require.context('./controllers', true, /\.js$/);
application.load(definitionsFromContext(context));

const darkModeToggle = document.getElementById('toggle-dark-mode-btn');
// On page load or when changing themes, best to add inline in `head` to avoid FOUC
if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
  document.querySelector('html').classList.add('dark');
  localStorage.theme = 'dark';
  updateDarkModeToggle(localStorage.theme);
} else {
  document.querySelector('html').classList.remove('dark');
  localStorage.theme = 'light';
  updateDarkModeToggle(localStorage.theme);
}

function updateDarkModeToggle(theme) {
  if (theme == 'dark') {
    darkModeToggle.classList.add('bg-purple-700');
    darkModeToggle.children[1].classList.add('translate-x-7');
    darkModeToggle.children[1].children[0].classList.add('opacity-0');
    darkModeToggle.children[1].children[1].classList.add('opacity-100');
    darkModeToggle.dataset.switchOn = 'true';
  } else if (theme == 'light') {
    darkModeToggle.classList.add('bg-gray-200');
    darkModeToggle.children[1].classList.add('translate-x-0');
    darkModeToggle.children[1].children[0].classList.add('opacity-100');
    darkModeToggle.children[1].children[1].classList.add('opacity-0');
    darkModeToggle.dataset.switchOn = 'false';
  }
}
