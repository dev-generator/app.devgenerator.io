import {Controller} from 'stimulus';

export default class extends Controller {
  open(e) {
    var target = e.currentTarget.dataset.modalTarget;
    var element = document.querySelector(`[data-modal-name="${target}"]`);

    element.classList.remove('hidden');
    element.children[0].children[0].classList.remove('ease-in', 'duration-200', 'opacity-0');
    element.children[0].children[0].classList.add('ease-out', 'duration-300', 'opacity-100');

    element.children[0].children[2].classList.remove('ease-in', 'duration-100', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
    element.children[0].children[2].classList.add('ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100');
  }

  close(e) {
    var target = e.currentTarget.dataset.modalTarget;
    var element = document.querySelector(`[data-modal-name="${target}"]`);

    element.classList.add('hidden');
    element.children[0].children[0].classList.remove('ease-out', 'duration-300', 'opacity-100');
    element.children[0].children[0].classList.add('ease-in', 'duration-200', 'opacity-0');

    element.children[0].children[2].classList.remove('ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100');
    element.children[0].children[2].classList.add('ease-in', 'duration-100', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
  }
}
