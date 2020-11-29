import {Controller} from 'stimulus';

export default class extends Controller {
  static targets = ['toggle', 'onIcon', 'offIcon'];

  connect() {
    this.visibleClass = this.data.get('visibleClass') || null;
    this.invisibleClass = this.data.get('invisibleClass') || null;
    this.activeClass = this.data.get('activeClass') || null;
    this.enteringClass = this.data.get('enteringClass') || null;
    this.enterTimeout = parseInt(this.data.get('enterTimeout')) || 0;
    this.leavingClass = this.data.get('leavingClass') || null;
    this.leaveTimeout = parseInt(this.data.get('leaveTimeout')) || 0;
    this.darkMode = this.data.get('darkMode') || 'false';
    if (this.darkMode != 'true') {
      this.toggle();
    }
  }

  toggle() {
    if (this.active == 'true') {
      this._off();
    } else {
      this._on();
    }
  }

  _on() {
    this.toggleTarget.parentNode.classList.remove('bg-gray-200');
    this.toggleTarget.parentNode.classList.add('bg-purple-700');
    this.toggleTarget.classList.remove('translate-x-0');
    this.toggleTarget.classList.add(this.activeClass);
    this.data.set('on', 'true');
    if (this.darkMode == 'true') {
      localStorage.theme  = 'dark';
      document.querySelector('html').classList.add('dark');
    }

    this._leavingClassList.forEach(
      (klass => {
        this.onIconTarget.classList.remove(klass)
      }).bind(this),
    );

    this._enteringClassList.forEach(
      (klass => {
        this.onIconTarget.classList.add(klass)
      }).bind(this),
    );

    requestAnimationFrame(
      (() => {
        this._invisibleClassList.forEach(klass => this.onIconTarget.classList.remove(klass));
        this._visibleClassList.forEach(klass => this.offIconTarget.classList.remove(klass));
        this._visibleClassList.forEach(klass => this.onIconTarget.classList.add(klass));
        this._invisibleClassList.forEach(klass => this.offIconTarget.classList.add(klass));

        setTimeout(
          (() => {
            this._enteringClassList.forEach(klass => this.offIconTarget.classList.remove(klass));
          }).bind(this),
          this.enterTimeout,
        )
      }).bind(this),
    );
  }

  _off() {
    this.toggleTarget.parentNode.classList.remove('bg-purple-700');
    this.toggleTarget.parentNode.classList.add('bg-gray-200');
    this.toggleTarget.classList.remove(this.activeClass);
    this.toggleTarget.classList.add('translate-x-0');
    this.data.set('on', 'false');
    if (this.darkMode == 'true') {
      localStorage.theme = 'light';
      document.querySelector('html').classList.remove('dark');
    }
    

    this._leavingClassList.forEach(
      (klass => {
        this.offIconTarget.classList.remove(klass)
      }).bind(this),
    );

    this._enteringClassList.forEach(
      (klass => {
        this.offIconTarget.classList.add(klass)
      }).bind(this),
    );

    requestAnimationFrame(
      (() => {
        this._visibleClassList.forEach(klass => this.onIconTarget.classList.remove(klass));
        this._invisibleClassList.forEach(klass => this.offIconTarget.classList.remove(klass));
        this._invisibleClassList.forEach(klass => this.onIconTarget.classList.add(klass));
        this._visibleClassList.forEach(klass => this.offIconTarget.classList.add(klass));

        setTimeout(
          (() => {
            this._enteringClassList.forEach(klass => this.onIconTarget.classList.remove(klass));
          }).bind(this),
          this.enterTimeout,
        )
      }).bind(this),
    );
  }

  get active() {
    return this.data.get('on');
  }

  get _onClassList() {
    return !this.onClass ? [] : this.onClass.split(' ');
  }

  get _offClassList() {
    return !this.offClass ? [] : this.offClass.split(' ');
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