import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.CONTAINER, CONSTANTS.TARGETS.BACKGROUND, CONSTANTS.TARGETS.VIEW];
  static classes = [
    CONSTANTS.CLASSES.HIDE, CONSTANTS.CLASSES.ENTERING, CONSTANTS.CLASSES.LEAVING,
    CONSTANTS.CLASSES.TOBACKGROUND, CONSTANTS.CLASSES.FROMBACKGROUND, CONSTANTS.CLASSES.TOVIEW,
    CONSTANTS.CLASSES.FROMVIEW
  ];
  static values = { allowClose: Boolean };

  disconnect() {
    this.close();
  }

  open(e) {
    e.target.blur();
    this.lockScroll();
    this.containerTarget.classList.remove(this.hideClass);

    requestAnimationFrame(
      (() => {
        this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.backgroundTarget.classList.add(cls));
        this.backgroundTarget.classList.add(this.toBackgroundClass);
        this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.add(cls));
        this.toViewClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.add(cls));
        setTimeout(() => {
          this.leavingClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.backgroundTarget.classList.remove(cls));
          this.backgroundTarget.classList.remove(this.fromBackgroundClass);
          this.leavingClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.remove(cls));
          this.toViewClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.remove(cls));
        }, 250);
      }),
    );
  }

  close() {
    this.unlockScroll();

    requestAnimationFrame(
      (() => {
        this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.backgroundTarget.classList.remove(cls));
        this.backgroundTarget.classList.remove(this.toBackgroundClass);
        this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.remove(cls));
        this.toViewClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.remove(cls));
        this.leavingClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.backgroundTarget.classList.add(cls));
        this.backgroundTarget.classList.add(this.fromBackgroundClass);
        this.leavingClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.add(cls));
        this.toViewClass.split(CONSTANTS.BLANKSPACE).forEach(cls => this.viewTarget.classList.add(cls));
        setTimeout(() => {
          this.containerTarget.classList.add(this.hideClass);
        }, 100);
      }),
    );
  }

  closeBackground(e) {
    if (this.allowCloseValue && e.target === this.backgroundTarget.children[0]) {
      this.close();
    }
  }

  closeWithKeyboard(e) {
    if (e.keyCode === 27 && !this.containerTarget.classList.contains(this.hideClass)) {
      this.close();
    }
  }

  lockScroll() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.paddingRight = `${scrollbarWidth}px`;

    this.saveScrollPosition();

    document.body.classList.add(CONSTANTS.POSITION.FIXED, CONSTANTS.INSET.X0, CONSTANTS.OVERFLOW.HIDDEN);
    document.body.style.top = `-${this.scrollPosition}px`;
  }

  unlockScroll() {
    document.body.style.paddingRight = null;
    document.body.classList.remove(CONSTANTS.POSITION.FIXED, CONSTANTS.INSET.X0, CONSTANTS.OVERFLOW.HIDDEN);

    this.restoreScrollPosition();

    document.body.style.top = null;
  }

  saveScrollPosition() {
    this.scrollPosition = window.pageYOffset || document.body.scrollTop;
  }

  restoreScrollPosition() {
    document.documentElement.scrollTop = this.scrollPosition;
  }
}
