import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.MENU, CONSTANTS.TARGETS.OVERLAY, CONSTANTS.TARGETS.SIDEBAR];
  static classes = [
    CONSTANTS.CLASSES.HIDE, CONSTANTS.CLASSES.OVERLAYENTER, CONSTANTS.CLASSES.OVERLAYLEAVE,
    CONSTANTS.CLASSES.SIDEBARENTER, CONSTANTS.CLASSES.SIDEBARLEAVE
  ];
  static values = { entering: Number, leaving: Number};

  toggle() {
    if (this.hidden) {
      this._show();
    } else {
      this._hide();
    }
  }

  _show() {
    this.menuTarget.classList.remove(this.hideClass)

    requestAnimationFrame(
      (() => {
        this.overlayTarget.classList.add(this.overlayEnteringClass);
        this.sidebarTarget.classList.add(this.sidebarEnteringClass);
        
        this.overlayTarget.classList.remove(this.overlayLeavingClass);
        setTimeout(
          (() => {
            this.sidebarTarget.classList.remove(this.sidebarLeavingClass);
          }).bind(this),
          this.enteringValue,
        )
      }).bind(this),
    )
  }

  _hide() {
    this.overlayTarget.classList.remove(this.overlayEnteringClass);
    this.overlayTarget.classList.add(this.overlayLeavingClass);
    this.sidebarTarget.classList.remove(this.sidebarEnteringClass);
    this.sidebarTarget.classList.add(this.sidebarLeavingClass);
    setTimeout(
      (() => {
        this.menuTarget.classList.add(this.hideClass)
      }).bind(this),
      this.leavingValue,
    )
  }

  closeWithKeyboard(e) {
    if (e.keyCode === 27 && !this.menuTarget.classList.contains(this.hideClass)) {
      this._hide();
    }
  }

  closeBackground() {
    this._hide();
  }

  hide(event) {
    if (this.element.contains(event.target) === false && !this.hidden) {
      this._hide();
    }
  }

  get hidden() {
    return this.menuTarget.classList.contains(this.hideClass);
  }
}
