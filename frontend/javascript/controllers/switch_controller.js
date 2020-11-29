import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [CONSTANTS.TARGETS.TOGGLE, CONSTANTS.TARGETS.ONICON, CONSTANTS.TARGETS.OFFICON];

  connect() {
    this.visibleClass = this.data.get(CONSTANTS.VISIBLECLASS) || null;
    this.invisibleClass = this.data.get(CONSTANTS.INVISIBLECLASS) || null;
    this.activeClass = this.data.get(CONSTANTS.ACTIVECLASS) || null;
    this.enteringClass = this.data.get(CONSTANTS.ENTERINGCLASS) || null;
    this.enterTimeout = parseInt(this.data.get(CONSTANTS.ENTERTIMEOUT)) || 0;
    this.leavingClass = this.data.get(CONSTANTS.LEAVINGCLASS) || null;
    this.leaveTimeout = parseInt(this.data.get(CONSTANTS.LEAVINGTIMEOUT)) || 0;
    this.darkMode = this.data.get(CONSTANTS.DARKMODE) || CONSTANTS.FALSE;
    if (this.darkMode != CONSTANTS.TRUE) {
      this.toggle();
    }
  }

  toggle() {
    if (this.active == CONSTANTS.TRUE) {
      this._off();
    } else {
      this._on();
    }
  }

  _on() {
    this.toggleTarget.parentNode.classList.remove(CONSTANTS.BG.GRAY200);
    this.toggleTarget.parentNode.classList.add(CONSTANTS.BG.PURPLE700);
    this.toggleTarget.classList.remove(CONSTANTS.TRANSLATE.X0);
    this.toggleTarget.classList.add(this.activeClass);
    this.data.set(CONSTANTS.ON, CONSTANTS.TRUE);
    if (this.darkMode == CONSTANTS.TRUE) {
      localStorage.theme  = CONSTANTS.DARK;
      document.querySelector(CONSTANTS.DOM.HTML).classList.add(CONSTANTS.DARK);
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
    this.toggleTarget.parentNode.classList.remove(CONSTANTS.BG.PURPLE700);
    this.toggleTarget.parentNode.classList.add(CONSTANTS.BG.GRAY200);
    this.toggleTarget.classList.remove(this.activeClass);
    this.toggleTarget.classList.add(CONSTANTS.TRANSLATE.X0);
    this.data.set(CONSTANTS.ON, CONSTANTS.FALSE);
    if (this.darkMode == CONSTANTS.TRUE) {
      localStorage.theme = CONSTANTS.LIGHT;
      document.querySelector(CONSTANTS.DOM.HTML).classList.remove(CONSTANTS.DARK);
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
    return this.data.get(CONSTANTS.ON);
  }

  get _onClassList() {
    return !this.onClass ? [] : this.onClass.split(CONSTANTS.BLANKSPACE);
  }

  get _offClassList() {
    return !this.offClass ? [] : this.offClass.split(CONSTANTS.BLANKSPACE);
  }

  get _visibleClassList() {
    return !this.visibleClass ? [] : this.visibleClass.split(CONSTANTS.BLANKSPACE);
  }

  get _invisibleClassList() {
    return !this.invisibleClass ? [] : this.invisibleClass.split(CONSTANTS.BLANKSPACE);
  }

  get _enteringClassList() {
    return !this.enteringClass ? [] : this.enteringClass.split(CONSTANTS.BLANKSPACE);
  }

  get _leavingClassList() {
    return !this.leavingClass ? [] : this.leavingClass.split(CONSTANTS.BLANKSPACE);
  }
}