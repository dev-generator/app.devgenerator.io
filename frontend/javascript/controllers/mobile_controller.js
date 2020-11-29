import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.MENU, CONSTANTS.TARGETS.OVERLAY, CONSTANTS.TARGETS.SIDEBAR];

  connect() {
    this.toggleClass = CONSTANTS.HIDDEN;
    this.visibleClass = this.data.get(CONSTANTS.VISIBLECLASS) || null;
    this.invisibleClass = this.data.get(CONSTANTS.INVISIBLECLASS) || null;
    this.activeClass = this.data.get(CONSTANTS.ACTIVECLASS) || null;
    this.enteringClass = this.data.get(CONSTANTS.ENTERINGCLASS) || null;
    this.enterTimeout = parseInt(this.data.get(CONSTANTS.ENTERTIMEOUT)) || 0;
    this.leavingClass = this.data.get(CONSTANTS.LEAVINGCLASS) || null;
    this.leaveTimeout = parseInt(this.data.get(CONSTANTS.LEAVINGTIMEOUT)) || 0;
  }

  toggle() {
    if (this.hidden) {
      this._show();
    } else {
      this._hide();
    }
  }

  _show() {
    this.menuTarget.classList.remove(this.toggleClass)

    requestAnimationFrame(
      (() => {
        this.overlayTarget.classList.add(CONSTANTS.OPACITY.O100);
        this.sidebarTarget.classList.add(CONSTANTS.TRANSLATE.X0);
        
        this.overlayTarget.classList.remove(CONSTANTS.OPACITY.O0);
        setTimeout(
          (() => {
            this.sidebarTarget.classList.remove(CONSTANTS.TRANSLATE.NEGXFULL);
          }).bind(this),
          50,
        )
      }).bind(this),
    )
  }

  _hide() {
    this.overlayTarget.classList.remove(CONSTANTS.OPACITY.O100);
    this.overlayTarget.classList.add(CONSTANTS.OPACITY.O0);
    this.sidebarTarget.classList.remove(CONSTANTS.TRANSLATE.X0);
    this.sidebarTarget.classList.add(CONSTANTS.TRANSLATE.NEGXFULL);
    setTimeout(
      (() => {
        this.menuTarget.classList.add(this.toggleClass)
      }).bind(this),
      250,
    )
  }

  hide(event) {
    if (this.element.contains(event.target) === false && !this.hidden) {
      this._hide();
    }
  }

  get hidden() {
    return this.menuTarget.classList.contains(this.toggleClass);
  }

  get activeTarget() {
    return this.data.has(CONSTANTS.ACTIVETARGET)
      ? document.querySelector(this.data.get(CONSTANTS.ACTIVETARGET))
      : this.element;
  }

  get _activeClassList() {
    return !this.activeClass ? [] : this.activeClass.split(CONSTANTS.BLANKSPACE);
  }

  get _visibleClassList() {
    return !this.visibleClass ? [] : this.visibleClass.split(CONSTANTS.BLANKSPACE);
  }

  get _invisibleClassList() {
    return !this.invisibleClass ? [] : this.invisibleClass.split(CONSTANTS.BLANKSPACE);
  }

  get _enteringClassList() {
    return !this.enteringClass ? [] : this.enteringClass.split(CONSTANTS.BLANKSPACE);
  }

  get _leavingClassList() {
    return !this.leavingClass ? [] : this.leavingClass.split(CONSTANTS.BLANKSPACE);
  }
}
