import {CONSTANTS} from '../constants';
import Toggle from './toggle';

export default class DarkModeToggle {
  constructor(id) {
    this.switch = new Toggle(id, CONSTANTS.TRANSLATE.X7);
    this.html = document.querySelector(CONSTANTS.DOM.HTML);
    if (localStorage.theme === CONSTANTS.DARK || (!(CONSTANTS.THEME in localStorage) && window.matchMedia(CONSTANTS.PREFERSCHEME).matches)) {
      this.html.classList.add(CONSTANTS.DARK);
      localStorage.theme = CONSTANTS.DARK;
      this.switch.turnOn();
    } else {
      this.html.classList.remove(CONSTANTS.DARK);
      localStorage.theme = CONSTANTS.LIGHT;
      this.switch.turnOff();
    }
  }
}
