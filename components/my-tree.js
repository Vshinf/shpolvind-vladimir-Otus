import { LitElement, html, css } from "lit-element";
import '../components/my-leaf';

class MyTree extends LitElement {
    static get properties() {
        return { dataj: { type: String } };
    }
    static get styles() {
        return [
            css`
                .bl_leaf{
                    padding-left: 40px;
                }
                .bl_tree{
                }
            `
        ];
    }
    constructor() {
        super();
    }
    render() {
        this.json = JSON.parse(this.dataj);
        //console.log("JSON: ", this.json);
        if(this.json.items){
            return html `
                <div class="tree">
                    My tree<div class="bl_tree"><my-leaf id_leaf=${this.json.id}></my-leaf></div>
                    
                    <div class="bl_leaf">
                        ${this.json.items.map((item) => html`
                            <my-tree dataj=${JSON.stringify(item)}></my-tree>
                        `)}
                    </div>
                </div>
            `;
        }else{
            return html `
                <div class="bl_leaf">
                    My leaf <my-leaf id_leaf=${this.json.id}></my-leaf>
                </div>
            `;
        }
    }
}

customElements.define('my-tree', MyTree);