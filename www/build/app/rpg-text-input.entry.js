const h = window.App.h;

class RpgTextInput {
    constructor() {
        this.isEditable = true;
        this.showLock = true;
        this.styleType = 'inline';
        this.isLocked = false;
        this.inEditMode = false;
    }
    closeEditor() {
        if (this.inEditMode) {
            this.inEditMode = false;
        }
    }
    componentWillLoad() {
        this.text = this.startingText;
    }
    clickToEdit(event) {
        if (!this.isEditable || this.isLocked) {
            return;
        }
        if (event.target.tagName == 'INPUT') {
            return;
        }
        this.inEditMode = !this.inEditMode;
        // This is so the input will exist (could also do it in componentDidUpdate?)
        if (this.inEditMode) {
            setTimeout(() => {
                this.el.querySelector('input').focus();
            }, 0);
        }
    }
    textChanged(event) {
        this.text = event.target.value;
        const tEvent = new CustomEvent('rpg_text_changed', { detail: {
                newText: this.text
            } });
        this.el.dispatchEvent(tEvent);
    }
    render() {
        return (h("div", { class: this.styleType, onClick: (ev) => this.clickToEdit(ev) },
            h("label", { htmlFor: "rpgInput" }, this.label),
            this.inEditMode ?
                h("span", null,
                    h("input", { type: "text", id: "rpgInput", placeholder: this.placeholder, value: this.text, onChange: (ev) => this.textChanged(ev) }))
                :
                    h("span", { class: "text" }, this.text)));
    }
    static get is() { return "rpg-text-input"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "inEditMode": {
            "state": true
        },
        "isEditable": {
            "type": Boolean,
            "attr": "is-editable"
        },
        "isLocked": {
            "state": true
        },
        "label": {
            "type": String,
            "attr": "label"
        },
        "placeholder": {
            "type": String,
            "attr": "placeholder"
        },
        "showLock": {
            "type": Boolean,
            "attr": "show-lock"
        },
        "startingText": {
            "type": String,
            "attr": "starting-text"
        },
        "styleType": {
            "type": String,
            "attr": "style-type"
        },
        "text": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "keyup.escape",
            "method": "closeEditor"
        }, {
            "name": "keyup.enter",
            "method": "closeEditor"
        }, {
            "name": "closeEditor",
            "method": "closeEditor"
        }]; }
    static get style() { return "rpg-text-input {\n  display: block; }\n  rpg-text-input .inline label {\n    padding-right: 5px; }\n  rpg-text-input .inline .text {\n    border-bottom: 1px solid grey;\n    min-width: 100px;\n    display: inline-block; }\n  rpg-text-input .underneath label {\n    position: relative;\n    top: 22px;\n    font-size: .8em;\n    display: inline; }\n  rpg-text-input .underneath .text {\n    min-height: 20px;\n    display: block;\n    position: relative;\n    top: -15px;\n    margin: 0;\n    padding: 0;\n    border-bottom: 1px solid grey; }\n  rpg-text-input .underneath input {\n    display: block;\n    position: relative;\n    top: -15px;\n    margin: 0;\n    padding: 0;\n    width: 100%;\n    margin: 0; }\n  rpg-text-input label {\n    font-weight: bold; }"; }
}

export { RpgTextInput };
