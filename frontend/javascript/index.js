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

const currentPath = window.location.href;
const elements = document.querySelectorAll('[name="navigation"]');

for (let i = 0; i < elements.length; i++) {
  if (elements[i].href == currentPath) {
    elements[i].classList.remove('text-gray-800', 'dark:text-gray-100', 'hover:text-white', 'hover:bg-purple-500');
    elements[i].classList.add('bg-purple-700', 'text-white');
    if (elements.[i].children[0].localName == 'svg') {
      elements.[i].children[0].classList.remove('text-gray-800', 'dark:text-gray-100', 'group-hover:text-gray-50');
      elements.[i].children[0].classList.add('text-white');
    }
    elements.[i].children
  } else {
    elements[i].classList.remove('bg-purple-700', 'text-white');
    elements[i].classList.add('text-gray-800', 'dark:text-gray-100', 'hover:text-white', 'hover:bg-purple-500');
    if (elements.[i].children[0].localName == 'svg') {
      elements.[i].children[0].classList.remove('text-white');
      elements.[i].children[0].classList.add('text-gray-800', 'dark:text-gray-100', 'group-hover:text-gray-50');
    }
  }
}
