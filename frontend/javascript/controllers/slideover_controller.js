import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  open(e) {
    var target = e.currentTarget.dataset.slideoverTarget;
    var element = document.querySelector(`[data-slideover-name="${target}"]`);
    element.classList.remove(CONSTANTS.HIDDEN);

    requestAnimationFrame(
      (() => {
        element.children[0].children[0].classList.add(CONSTANTS.OPACITY.O100);
        element.children[0].children[1].children[0].classList.add(CONSTANTS.TRANSLATE.X0);
        setTimeout(() => {
          element.children[0].children[0].classList.remove(CONSTANTS.OPACITY.O0);
          element.children[0].children[1].children[0].classList.remove(CONSTANTS.TRANSLATE.XFULL);
        }, 25);
      }),
    );
  }

  close(e) {
    var target = e.currentTarget.dataset.slideoverTarget;
    var element = document.querySelector(`[data-slideover-name="${target}"]`);
    element.children[0].children[0].classList.remove(CONSTANTS.OPACITY.O100);
    element.children[0].children[0].classList.add(CONSTANTS.OPACITY.O0);
    element.children[0].children[1].children[0].classList.remove(CONSTANTS.TRANSLATE.X0);
    element.children[0].children[1].children[0].classList.add(CONSTANTS.TRANSLATE.XFULL);

    requestAnimationFrame(
      (() => {
        setTimeout(() => {
          element.classList.add(CONSTANTS.HIDDEN);
        }, 550);
      }),
    );
  }
}
