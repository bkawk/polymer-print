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
    this.print(this.html)
    .catch((err) => {
      this.error = err;
    })
  }
  print(htmlToPrint){
    return new Promise((resolve, reject) => {
      console.log(htmlToPrint)
      var printWindow=window.open('','','width=200,height=100');
      printWindow.document.write(htmlToPrint);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(function () { 
        printWindow.print(); 
      }, 500);
      printWindow.onfocus = function () { 
        setTimeout(function () { 
          printWindow.close(); 
        }, 500); 
      }
    })
  }
} window.customElements.define('polymer-print', PolymerPrint);
