import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.NAV];
  static classes = [
    CONSTANTS.CLASSES.ACTIVE, CONSTANTS.CLASSES.INACTIVE,
    CONSTANTS.CLASSES.ACTIVEICON, CONSTANTS.CLASSES.INACTIVEICON
  ];

  connect() {
    this.navTargets.forEach(nav => {
      if (nav.href == window.location.href) {
        this._active(nav);
      } else {
        this._inactive(nav);
      }
    });
  }

  _active(nav) {
    nav.classList.remove(...this.inactiveClass.split(CONSTANTS.BLANKSPACE));
    nav.classList.add(...this.activeClass.split(CONSTANTS.BLANKSPACE));
    if (nav.children[0].localName == CONSTANTS.DOM.SVG) {
      nav.children[0].classList.remove(...this.inactiveIconClass.split(CONSTANTS.BLANKSPACE));
      nav.children[0].classList.add(this.activeIconClass);
    }
  }

  _inactive(nav) {
    nav.classList.remove(...this.activeClass.split(CONSTANTS.BLANKSPACE));
    nav.classList.add(...this.inactiveClass.split(CONSTANTS.BLANKSPACE));
    if (nav.children[0].localName == CONSTANTS.DOM.SVG) {
      nav.children[0].classList.remove(this.activeIconClass);
      nav.children[0].classList.add(...this.inactiveIconClass.split(CONSTANTS.BLANKSPACE));
    }
  }
}
