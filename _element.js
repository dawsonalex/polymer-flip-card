import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `code-hints-card`
 * A card component based on the code-it notes by Dan Harding &lt;https://dev.to/danielharding&gt;
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CodeHintsCard extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'code-hints-card',
      },
    };
  }
}

window.customElements.define('code-hints-card', CodeHintsCard);
