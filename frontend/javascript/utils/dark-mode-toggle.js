import {CONSTANTS} from '../constants';

export default class DarkModeToggle {
  constructor(id) {
    this.toggle = document.getElementById(id);
    this.html = document.querySelector(CONSTANTS.DOM.HTML);
    if (localStorage.theme === CONSTANTS.DARK || (!(CONSTANTS.THEME in localStorage) && window.matchMedia(CONSTANTS.PREFERSCHEME).matches)) {
      this.html.classList.add(CONSTANTS.DARK);
      localStorage.theme = CONSTANTS.DARK;
      this.themeToggle(localStorage.theme);
    } else {
      this.html.classList.remove(CONSTANTS.DARK);
      localStorage.theme = CONSTANTS.LIGHT;
      this.themeToggle(localStorage.theme);
    }
  }

  themeToggle(theme) {
    if (theme == CONSTANTS.DARK) {
      this.toggle.classList.add(CONSTANTS.BG.PURPLE700);
      this.toggle.children[1].classList.add(CONSTANTS.TRANSLATE.X7);
      this.toggle.children[1].children[0].classList.add(CONSTANTS.OPACITY.O0);
      this.toggle.children[1].children[1].classList.add(CONSTANTS.OPACITY.O100);
      this.toggle.dataset.switchOn = CONSTANTS.TRUE;
    } else if (theme == CONSTANTS.LIGHT) {
      this.toggle.classList.add(CONSTANTS.BG.GRAY200);
      this.toggle.children[1].classList.add(CONSTANTS.TRANSLATE.X0);
      this.toggle.children[1].children[0].classList.add(CONSTANTS.OPACITY.O100);
      this.toggle.children[1].children[1].classList.add(CONSTANTS.OPACITY.O0);
      this.toggle.dataset.switchOn = CONSTANTS.FALSE;
    }
  }
}
