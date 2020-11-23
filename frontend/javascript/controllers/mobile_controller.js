import {Controller} from 'stimulus';

export default class extends Controller {
  static targets = ['menu'];

  connect() {
    this.toggleClass = this.data.get('class') || 'hidden';
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
    this._enteringClassList.forEach(
      (klass => {
        this.menuTarget.classList.add(klass)
      }).bind(this),
    )

    requestAnimationFrame(
      (() => {
        this._visibleClassList.forEach(klass => {
          this.menuTarget.classList.add(klass)
        })
        this._activeClassList.forEach(klass => {
          this.activeTarget.classList.add(klass)
        })
        this._invisibleClassList.forEach(klass => this.menuTarget.classList.remove(klass))
        setTimeout(
          (() => {
            this._enteringClassList.forEach(klass => this.menuTarget.classList.remove(klass))
          }).bind(this),
          this.enterTimeout,
        )
      }).bind(this),
    )
  }

  _hide() {
    this._invisibleClassList.forEach(klass => this.menuTarget.classList.add(klass))
    this._visibleClassList.forEach(klass => this.menuTarget.classList.remove(klass))
    this._activeClassList.forEach(klass => this.activeTarget.classList.remove(klass))
    this._leavingClassList.forEach(klass => this.menuTarget.classList.add(klass))
    setTimeout(
      (() => {
        this.menuTarget.classList.add(this.toggleClass)
        this._leavingClassList.forEach(klass => this.menuTarget.classList.remove(klass))
      }).bind(this),
      this.leaveTimeout,
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
