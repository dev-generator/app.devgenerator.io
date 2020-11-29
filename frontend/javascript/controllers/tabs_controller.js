import { Controller } from 'stimulus'

export default class extends Controller {
  static targets = ['tab', 'panel']

  connect() {
    this.activeTabClasses = (this.data.get('activeTab') || 'active').split(' ');
    this.inactiveTabClasses = (this.data.get('inactiveTab') || 'inactive').split(' ');
    this.activeTabIconClasses = (this.data.get('activeTabIcon') || 'active').split(' ');
    this.inactiveTabIconClasses = (this.data.get('inactiveTabIcon') || 'inactive').split(' ');
    if (this.anchor) {
      this.index = this.tabTargets.findIndex((tab) => tab.id === this.anchor)
    }
    this.showTab();
  }

  change(event) {
    event.preventDefault();

    if (event.currentTarget.dataset.index) {
      this.index = event.currentTarget.dataset.index;
    } else if (event.currentTarget.dataset.id) {
      this.index = this.tabTargets.findIndex((tab) => tab.id == event.currentTarget.dataset.id);
    } else {
      this.index = this.tabTargets.indexOf(event.currentTarget);
    }

    window.dispatchEvent(new CustomEvent('tsc:tab-change'));
  }

  showTab() {
    this.tabTargets.forEach((tab, index) => {
      const panel = this.panelTargets[index];

      if (index === this.index) {
        panel.classList.remove('hidden');
        tab.classList.remove(...this.inactiveTabClasses);
        tab.classList.add(...this.activeTabClasses);
        if (tab.children.length > 1 && tab.children[0].localName == 'svg') {
          tab.children[0].classList.remove(...this.inactiveTabIconClasses);
          tab.children[0].classList.add(...this.activeTabIconClasses);
        }

        if (tab.id) {
          event.preventDefault();
          location.hash = tab.id;
        }
      } else {
        panel.classList.add('hidden');
        tab.classList.remove(...this.activeTabClasses);
        tab.classList.add(...this.inactiveTabClasses);
        if (tab.children.length > 1 && tab.children[0].localName == 'svg') {
          tab.children[0].classList.remove(...this.activeTabIconClasses);
          tab.children[0].classList.add(...this.inactiveTabIconClasses);
        }
      }
    })
  }

  get index() {
    return parseInt(this.data.get('index') || 0);
  }

  set index(value) {
    this.data.set('index', (value >= 0 ? value : 0));
    this.showTab();
  }

  get anchor() {
    return (document.URL.split('#').length > 1) ? document.URL.split('#')[1] : null;
  }
}