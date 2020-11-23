import {Controller} from 'stimulus';

export default class extends Controller {
  // Show the popover
  mouseOver(event) {
    var target = event.currentTarget.dataset.popoverTarget;
    document.querySelector(`[data-popover-name="${target}"]`).classList.remove('hidden');
  }
  // Hide the popover
  mouseOut(event) {
    var target = event.currentTarget.dataset.popoverTarget;
    document.querySelector(`[data-popover-name="${target}"]`).classList.add('hidden');
  }
}
