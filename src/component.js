import { LitElement, html, css, unsafeCSS } from 'lit-element';
import style from './component.css';

class Component extends LitElement {
  static get properties() {
    return {
      greeting: { type: String },
      items: { type: Array }
    };
  }

  constructor() {
    super();

    this.greeting = 'Hello mundo';
    this.items = [
      {
        name: 'hola'
      },
      {
        name: 'mundo'
      }
    ];
  }

  _onButtonClick() {
    this.items = this.items.concat({
      name: `item ${this.items.length + 1}`
    });
  }

  static get styles() {
    return css`
      ${unsafeCSS(style)}
    `;
  }

  render() {
    return html`
      <p>${this.greeting}</p>
      <button @click=${this._onButtonClick}>Addasfaasasfdfdfasdsdf item</button>
      <ul>
        ${this.items.map(
          (item) => html`
            <li>${item.name}</li>
          `
        )}
      </ul>
    `;
  }
}

window.customElements.define('my-component', Component);
