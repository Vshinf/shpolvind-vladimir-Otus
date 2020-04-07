import { LitElement, html, css } from "lit-element";

class MyLeaf extends LitElement {
    static get properties() {
        return { id_leaf: { type: Number } };
    }
    constructor() {
        super();
    }
    static get styles() {
        return css `
            .my_leaf {
            }
        `;
    }
    render() {
        return html `
        <div class="my_leaf">
              id ${this.id_leaf}
        </div>
        `;
    }
}
customElements.define('my-leaf', MyLeaf);