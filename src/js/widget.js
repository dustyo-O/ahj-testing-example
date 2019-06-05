import { isValidInn } from './validators';

export default class InnOgrnFormWidget {
  constructor(parentEl) {
    this.parentEl = parentEl;
  }

  static get markup() {
    return `
    <form data-widget="innogrn-form-widget">
      <div class="form-control">
          <label for="innorgn-input">Введите ИНН/ОГРН</label>
          <input id="innorgn-input" data-id="innogrn-input" type="text">
      </div>
      <button data-id="innogrn-submit">Далее</button>
    </form>
    `;
  }

  static get inputSelector() {
    return '[data-id=innogrn-input]';
  }

  static get submitSelector() {
    return '[data-id=innogrn-submit]';
  }

  bindToDOM() {
    this.parentEl.innerHTML = this.constructor.markup;
    const submit = this.parentEl.querySelector(this.constructor.submitSelector);
    submit.addEventListener('click', evt => this.onSubmit(evt));
    this.inputEl = this.parentEl.querySelector(this.constructor.inputSelector);
  }

  onSubmit(evt) {
    // add event listeners here
    evt.preventDefault();
    if (isValidInn(this.inputEl.value)) {
      this.inputEl.classList.add('valid');
      this.inputEl.classList.remove('invalid');
    } else {
      this.inputEl.classList.add('invalid');
      this.inputEl.classList.remove('valid');
    }
  }
}
