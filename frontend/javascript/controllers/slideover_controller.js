import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.CONTAINER, CONSTANTS.TARGETS.BACKGROUND, CONSTANTS.TARGETS.VIEW];
  static classes = [
    CONSTANTS.CLASSES.HIDE, CONSTANTS.CLASSES.TOBACKGROUND, CONSTANTS.CLASSES.FROMBACKGROUND,
    CONSTANTS.CLASSES.TOVIEW, CONSTANTS.CLASSES.FROMVIEW,
  ];
  static values = {allowClose: Boolean};

  disconnect() {
    this.close();
  }

  open() {
    this.containerTarget.classList.remove(this.hideClass);

    requestAnimationFrame(
      (() => {
        this.backgroundTarget.classList.add(this.toBackgroundClass);
        this.viewTarget.classList.add(this.toViewClass);
        setTimeout(() => {
          this.backgroundTarget.classList.remove(this.fromBackgroundClass);
          this.viewTarget.classList.remove(this.fromViewClass);
        }, 25);
      }),
    );
  }

  close() {
    this.backgroundTarget.classList.remove(this.toBackgroundClass);
    this.backgroundTarget.classList.add(this.fromBackgroundClass);
    this.viewTarget.classList.remove(this.toViewClass);
    this.viewTarget.classList.add(this.fromViewClass);

    requestAnimationFrame(
      (() => {
        setTimeout(() => {
          this.containerTarget.classList.add(this.hideClass);
        }, 550);
      }),
    );
  }

  closeBackground(e) {
    if (this.allowCloseValue && e.target === this.backgroundTarget) {
      this.close();
    }
  }

  closeWithKeyboard(e) {
    if (e.keyCode === 27 && !this.containerTarget.classList.contains(this.hideClass)) {
      this.close();
    }
  }
}
