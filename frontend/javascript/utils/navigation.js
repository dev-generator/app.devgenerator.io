import {CONSTANTS} from '../constants';

export default class Navigation {
  constructor(name) {
    this.currentPath = window.location.href;
    this.elements = document.querySelectorAll(name);

    for (let i = 0; i < this.elements.length; i++) {
      if (this.elements[i].href == this.currentPath) {
        this.elements[i].classList.remove(CONSTANTS.TEXT.GRAY800, CONSTANTS.TEXT.DARK.GRAY100, CONSTANTS.TEXT.HOVER.WHITE, CONSTANTS.BG.HOVER.PURPLE500);
        this.elements[i].classList.add(CONSTANTS.BG.PURPLE700, CONSTANTS.TEXT.WHITE);
        if (this.elements[i].children[0].localName == CONSTANTS.DOM.SVG) {
          this.elements[i].children[0].classList.remove(CONSTANTS.TEXT.GRAY800, CONSTANTS.TEXT.DARK.GRAY100, CONSTANTS.TEXT.GROUPHOVER.GRAY50);
          this.elements[i].children[0].classList.add(CONSTANTS.TEXT.WHITE);
        }
      } else {
        this.elements[i].classList.remove(CONSTANTS.BG.PURPLE700, CONSTANTS.TEXT.WHITE);
        this.elements[i].classList.add(CONSTANTS.TEXT.GRAY800, CONSTANTS.TEXT.DARK.GRAY100, CONSTANTS.TEXT.HOVER.WHITE, CONSTANTS.BG.HOVER.PURPLE500);
        if (this.elements[i].children[0].localName == CONSTANTS.DOM.SVG) {
          this.elements[i].children[0].classList.remove(CONSTANTS.TEXT.WHITE);
          this.elements[i].children[0].classList.add(CONSTANTS.TEXT.GRAY800, CONSTANTS.TEXT.DARK.GRAY100, CONSTANTS.TEXT.GROUPHOVER.GRAY50);
        }
      }
    }
  }
}
