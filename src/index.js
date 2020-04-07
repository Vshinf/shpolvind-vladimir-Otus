import { LitElement, html, css } from 'lit-element';
import '../components/my-tree.js';

class RootBlock extends LitElement {
    static get properties() {
        return { name: { type: String } };
    }

    static get styles() {
        return [
            css`
                .data {
                  color: green;
                }
            `
        ];
    }

    constructor() {
        super();
        this.datajson = '{"id": 1, "items": [{"id": 2, "items": [{ "id": 3 },{ "id": 4 }]},{"id": 5, "items": [{ "id": 6 }]},{"id": 7, "items": [{ "id": 8 },{ "id": 9 },{ "id": 10 },{ "id": 11 }]}]}';
        //this.datajson = '{"id": 1, "items": [{"id": 2, "items": [{ "id": 3 }] }]}';
    }

    render() {
        //console.log(this.datajson);
        return html`
            <my-tree dataj='${this.datajson}'></my-tree>
            <br><br>
            <div><b>Data:</b> <div class="data">${this.datajson}</div></div>
        `;
    }
}

customElements.define('root-block', RootBlock);