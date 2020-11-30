import {Controller} from 'stimulus';

export default class extends Controller {
  static targets = ['tbody', 'template'];

  add() {
    this.tbodyTarget.appendChild(this.templateTarget.content.cloneNode(true));
  }

  minus() {
    var msg = confirm('Are you sure you want to remove?');
    if(msg) {
      this.tbodyTarget.removeChild(this.tbodyTarget.children[this.tbodyTarget.children.length - 1]);
    }
  }
}
