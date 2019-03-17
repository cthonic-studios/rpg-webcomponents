const h = window.App.h;

class EditableNumber {
    constructor() {
        this.isEditable = false;
    }
    setValueEvent(event) {
        if (event.detail) {
            this.setValue(event.detail);
        }
    }
    closeEditor() {
        if (this.isEditable) {
            this.isEditable = false;
        }
    }
    componentWillLoad() {
        this.currentValue = this.startingValue;
    }
    svChange(newValue) {
        this.setValue(newValue, false);
    }
    setValue(val, emit = true) {
        this.currentValue = parseInt(val);
        if (emit) {
            this.valueChanged.emit(this.currentValue);
        }
    }
    clickToEdit(event) {
        if (event.target.tagName == 'INPUT') {
            return;
        }
        this.isEditable = !this.isEditable;
        // This is so the input will exist (could also do it in componentDidUpdate?)
        if (this.isEditable) {
            setTimeout(() => {
                this.el.querySelector('input').focus();
            }, 0);
        }
    }
    render() {
        return (h("div", { class: "editable-number-container", onClick: (event) => this.clickToEdit(event) }, !this.isEditable
            ? h("span", { id: "counterValue", class: "counter-value" }, this.currentValue)
            : h("input", { class: "enter-counter-value", value: this.currentValue, onChange: (event) => this.setValue(event.target.value) })));
    }
    static get is() { return "editable-number"; }
    static get properties() { return {
        "currentValue": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "isEditable": {
            "state": true
        },
        "startingValue": {
            "type": Number,
            "attr": "starting-value",
            "watchCallbacks": ["svChange"]
        }
    }; }
    static get events() { return [{
            "name": "valueChanged",
            "method": "valueChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "rpg_setvalue",
            "method": "setValueEvent"
        }, {
            "name": "keyup.escape",
            "method": "closeEditor"
        }, {
            "name": "keyup.enter",
            "method": "closeEditor"
        }, {
            "name": "closeEditor",
            "method": "closeEditor"
        }]; }
    static get style() { return "editable-number {\n  display: block; }\n  editable-number .enter-counter-value {\n    width: 30px;\n    font-size: 18px;\n    text-align: center;\n    padding: 0; }"; }
}

export { EditableNumber };
