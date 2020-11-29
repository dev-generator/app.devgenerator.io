import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  open(e) {
    var target = e.currentTarget.dataset.modalTarget;
    var element = document.querySelector(`[data-modal-name="${target}"]`);

    element.classList.remove(CONSTANTS.HIDDEN);
    element.children[0].children[0].classList.remove(CONSTANTS.EASE.IN, CONSTANTS.DURATION.D200, CONSTANTS.OPACITY.O0);
    element.children[0].children[0].classList.add(CONSTANTS.EASE.OUT, CONSTANTS.DURATION.D300, CONSTANTS.OPACITY.O100);

    element.children[0].children[2].classList.remove(
      CONSTANTS.EASE.IN, CONSTANTS.DURATION.D100, CONSTANTS.OPACITY.O0, CONSTANTS.TRANSLATE.Y4, CONSTANTS.TRANSLATE.SM.Y0, CONSTANTS.SCALE.SM.S95,
    );
    element.children[0].children[2].classList.add(
      CONSTANTS.EASE.OUT, CONSTANTS.DURATION.D300, CONSTANTS.OPACITY.O100, CONSTANTS.TRANSLATE.Y0, CONSTANTS.SCALE.SM.S100,
    );
  }

  close(e) {
    var target = e.currentTarget.dataset.modalTarget;
    var element = document.querySelector(`[data-modal-name="${target}"]`);

    element.classList.add(CONSTANTS.HIDDEN);
    element.children[0].children[0].classList.remove(CONSTANTS.EASE.OUT, CONSTANTS.DURATION.D300, CONSTANTS.OPACITY.O100);
    element.children[0].children[0].classList.add(CONSTANTS.EASE.IN, CONSTANTS.DURATION.D200, CONSTANTS.OPACITY.O0);

    element.children[0].children[2].classList.remove(
      CONSTANTS.EASE.OUT, CONSTANTS.DURATION.D300, CONSTANTS.OPACITY.O100, CONSTANTS.TRANSLATE.Y0, CONSTANTS.SCALE.SM.S100,
    );
    element.children[0].children[2].classList.add(
      CONSTANTS.EASE.IN, CONSTANTS.DURATION.D100, CONSTANTS.OPACITY.O0, CONSTANTS.TRANSLATE.Y4, CONSTANTS.TRANSLATE.SM.Y0, CONSTANTS.SCALE.SM.S95,
    );
  }
}
