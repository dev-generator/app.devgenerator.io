import {Controller} from 'stimulus';

export default class extends Controller {
  static targets = ['menu', 'overlay', 'sidebar'];

  connect() {
    this.toggleClass = 'hidden';
    this.visibleClass = this.data.get('visibleClass') || null;
    this.invisibleClass = this.data.get('invisibleClass') || null;
    this.activeClass = this.data.get('activeClass') || null;
    this.enteringClass = this.data.get('enteringClass') || null;
    this.enterTimeout = parseInt(this.data.get('enterTimeout')) || 0;
    this.leavingClass = this.data.get('leavingClass') || null;
    this.leaveTimeout = parseInt(this.data.get('leaveTimeout')) || 0;
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
        this.overlayTarget.classList.add('opacity-100');
        this.sidebarTarget.classList.add('translate-x-0');
        
        this.overlayTarget.classList.remove('opacity-0');
        setTimeout(
          (() => {
            this.sidebarTarget.classList.remove('-translate-x-full');
          }).bind(this),
          50,
        )
      }).bind(this),
    )
  }

  _hide() {
    this.overlayTarget.classList.remove('opacity-100');
    this.overlayTarget.classList.add('opacity-0');
    this.sidebarTarget.classList.remove('translate-x-0');
    this.sidebarTarget.classList.add('-translate-x-full');
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
    return this.data.has('activeTarget')
      ? document.querySelector(this.data.get('activeTarget'))
      : this.element;
  }

  get _activeClassList() {
    return !this.activeClass ? [] : this.activeClass.split(' ');
  }

  get _visibleClassList() {
    return !this.visibleClass ? [] : this.visibleClass.split(' ');
  }

  get _invisibleClassList() {
    return !this.invisibleClass ? [] : this.invisibleClass.split(' ');
  }

  get _enteringClassList() {
    return !this.enteringClass ? [] : this.enteringClass.split(' ');
  }

  get _leavingClassList() {
    return !this.leavingClass ? [] : this.leavingClass.split(' ');
  }
}
