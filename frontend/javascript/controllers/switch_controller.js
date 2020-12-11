import {Controller} from 'stimulus';
import {CONSTANTS} from '../constants';

export default class extends Controller {
  static targets = [
    CONSTANTS.TARGETS.TOGGLE, CONSTANTS.TARGETS.ONICON,
    CONSTANTS.TARGETS.OFFICON, CONSTANTS.TARGETS.CONTAINER
  ];
  static classes = [
    CONSTANTS.CLASSES.ONICON, CONSTANTS.CLASSES.OFFICON, CONSTANTS.CLASSES.ONTOGGLE, CONSTANTS.CLASSES.OFFTOGGLE,
    CONSTANTS.CLASSES.ENTERING, CONSTANTS.CLASSES.LEAVING, CONSTANTS.CLASSES.ONBACKGROUND, CONSTANTS.CLASSES.OFFBACKGROUND
  ];
  static values = { 
    enterTimeout: Number, leaveTimeout: Number,
    darkMode: Boolean, status: Boolean
  };

  connect() {
    if (this.darkModeValue) {
      if (localStorage.theme == CONSTANTS.DARK) {
        this._on();
      } else if (localStorage.theme == CONSTANTS.LIGHT) {
        this._off();
      }
    } else {
      this.toggle();
    }
  }

  toggle() {
    if (this.statusValue) {
      this._off();
    } else {
      this._on();
    }
  }

  _on() {
    this.containerTarget.classList.remove(this.offBackgroundClass);
    this.containerTarget.classList.add(this.onBackgroundClass);
    this.toggleTarget.classList.remove(this.offToggleClass);
    this.toggleTarget.classList.add(this.onToggleClass);
    this.statusValue = true;
    if (this.darkModeValue) {
      localStorage.theme = CONSTANTS.DARK;
      document.querySelector(CONSTANTS.DOM.HTML).classList.add(CONSTANTS.DARK);
    }

    this.leavingClass.split(CONSTANTS.BLANKSPACE).forEach(
      (klass => {
        this.onIconTarget.classList.remove(klass)
      }).bind(this),
    );

    this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(
      (klass => {
        this.onIconTarget.classList.add(klass)
      }).bind(this),
    );

    requestAnimationFrame(
      (() => {
        this.onIconTarget.classList.remove(this.offIconClass);
        this.offIconTarget.classList.remove(this.onIconClass);
        this.onIconTarget.classList.add(this.onIconClass);
        this.offIconTarget.classList.add(this.offIconClass);

        setTimeout(
          (() => {
            this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(klass => this.offIconTarget.classList.remove(klass));
          }).bind(this),
          this.enterTimeoutValue,
        )
      }).bind(this),
    );
  }

  _off() {
    this.containerTarget.classList.remove(this.onBackgroundClass);
    this.containerTarget.classList.add(this.offBackgroundClass);
    this.toggleTarget.classList.remove(this.onToggleClass);
    this.toggleTarget.classList.add(this.offToggleClass);
    this.statusValue = false;
    if (this.darkModeValue) {
      localStorage.theme = CONSTANTS.LIGHT;
      document.querySelector(CONSTANTS.DOM.HTML).classList.remove(CONSTANTS.DARK);
    }
    

    this.leavingClass.split(CONSTANTS.BLANKSPACE).forEach(
      (klass => {
        this.offIconTarget.classList.remove(klass)
      }).bind(this),
    );

    this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(
      (klass => {
        this.offIconTarget.classList.add(klass)
      }).bind(this),
    );

    requestAnimationFrame(
      (() => {
        this.onIconTarget.classList.remove(this.onIconClass);
        this.offIconTarget.classList.remove(this.offIconClass);
        this.onIconTarget.classList.add(this.offIconClass);
        this.offIconTarget.classList.add(this.onIconClass);

        setTimeout(
          (() => {
            this.enteringClass.split(CONSTANTS.BLANKSPACE).forEach(klass => this.onIconTarget.classList.remove(klass));
          }).bind(this),
          this.leaveTimeoutValue,
        )
      }).bind(this),
    );
  }
}