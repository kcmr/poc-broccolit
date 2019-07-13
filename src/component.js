import { LitElement, html, css, unsafeCSS } from 'lit-element';
import style from './component.css';

class Component extends LitElement {
  static get properties() {
    return {
      greeting: { type: String }
    };
  }

  constructor() {
    super();

    this.greeting = 'Hello world';
  }

  static get styles() {
    return css`${unsafeCSS(style)}`;
  }

  render() {
    return html`
      <p>${this.greeting}</p>
    `;
  }
}

window.customElements.define('my-component', Component);
