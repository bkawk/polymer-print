import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `polymer-print`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PolymerPrint extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <template is="dom-if" if="{{debug}}">
        <h2>[[error]]</h2>
      </template>
    `;
  }
  static get properties() {
    return {
      error: {
        type: String,
        notify: true,
        reflectToAttribute: true,
      },
      debug: {
        type: Boolean,
        value: false,
      },
      html: {
        type: String,
        observer: '_print'
      },
    };
  }

  _print(){
    var printWindow=window.open('','','width=200,height=100');
    printWindow.document.write(this.html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  }
} window.customElements.define('polymer-print', PolymerPrint);
