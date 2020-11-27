import {Controller} from 'stimulus';

export default class extends Controller {
  open(e) {
    var target = e.currentTarget.dataset.slideoverTarget;
    var element = document.querySelector(`[data-slideover-name="${target}"]`);
    element.classList.remove('hidden');

    requestAnimationFrame(
      (() => {
        element.children[0].children[0].classList.add('opacity-100');
        element.children[0].children[1].children[0].classList.add('translate-x-0');
        setTimeout(() => {
          element.children[0].children[0].classList.remove('opacity-0');
          element.children[0].children[1].children[0].classList.remove('translate-x-full');
        }, 25);
      }),
    );
  }

  close(e) {
    var target = e.currentTarget.dataset.slideoverTarget;
    var element = document.querySelector(`[data-slideover-name="${target}"]`);
    element.children[0].children[0].classList.remove('opacity-100');
    element.children[0].children[0].classList.add('opacity-0');
    element.children[0].children[1].children[0].classList.remove('translate-x-0');
    element.children[0].children[1].children[0].classList.add('translate-x-full');

    requestAnimationFrame(
      (() => {
        setTimeout(() => {
          element.classList.add('hidden');
        }, 550);
      }),
    );
  }
}
