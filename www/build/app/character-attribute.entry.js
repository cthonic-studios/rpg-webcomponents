const h = window.App.h;

class CharacterAttribute {
    constructor() {
        this.showBonus = true;
        this.styleType = 'vertical';
        this.isEditable = false;
        this.bonus = 0;
    }
    attrValueChanged(newValue) {
        this.setValue(parseInt(newValue));
    }
    setValueFromEvent(event) {
        if (event.detail) {
            this.setValue(event.detail);
        }
    }
    clearBonus() {
        this.setBonus(0);
    }
    attributeDamageOrBonus(event) {
        let newBonus;
        if (event.type === 'attributeBonus') {
            newBonus = this.bonus + event.detail;
        }
        else {
            newBonus = this.bonus - event.detail;
        }
        this.setBonus(newBonus);
    }
    setBonus(value) {
        this.bonus = value;
        if (this.bonus > 0) {
            this.el.classList.add('is-boosted');
        }
        else {
            this.el.classList.remove('is-boosted');
        }
        if (this.bonus < 0) {
            this.el.classList.add('is-penalized');
        }
        else {
            this.el.classList.remove('is-penalized');
        }
        this.setValue(this.currentAttrValue + this.bonus);
    }
    valueChanged(event) {
        let newVal = event.detail;
        if (this.currentAttrValue != newVal) {
            if (this.attributeCap && newVal > this.attributeCap) {
                newVal = this.attributeCap;
                return this.setValue(newVal);
            }
            this.currentAttrValue = newVal;
            this.bonus = this.calculateBonus();
        }
    }
    componentWillLoad() {
        this.styleClass = `character-attribute-${this.styleType}`;
        this.currentAttrValue = this.attributeValue;
        this.bonus = this.calculateBonus();
    }
    calculateBonus() {
        if (this.bonusCalculation) {
            return this.bonusCalculation(this.currentAttrValue);
        }
        return Math.floor(this.currentAttrValue / 2) - 5;
    }
    setValue(value) {
        this.currentAttrValue = value;
        this.bonus = this.calculateBonus();
        let event = new CustomEvent('rpg_setvalue', { detail: this.currentAttrValue });
        this.el.querySelector('editable-number').dispatchEvent(event);
    }
    /**
     * @todo MOVE THIS TO ITS OWN HELPER CLASS???
     * @param event
     */
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
        return (h("div", { class: "character-attribute-container " + this.styleClass },
            h("div", { class: "attribute-name" }, this.name),
            h("editable-number", { startingValue: this.currentAttrValue }),
            this.showBonus ?
                h("div", { class: "attribute-bonus-container" }, this.bonus)
                :
                    ""));
    }
    static get is() { return "character-attribute"; }
    static get properties() { return {
        "attributeCap": {
            "type": Number,
            "attr": "attribute-cap"
        },
        "attributeValue": {
            "type": Number,
            "attr": "attribute-value",
            "watchCallbacks": ["attrValueChanged"]
        },
        "bonus": {
            "state": true
        },
        "bonusCalculation": {
            "type": "Any",
            "attr": "bonus-calculation"
        },
        "currentAttrValue": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "isEditable": {
            "state": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "showBonus": {
            "type": Boolean,
            "attr": "show-bonus"
        },
        "styleType": {
            "type": String,
            "attr": "style-type"
        }
    }; }
    static get listeners() { return [{
            "name": "rpg_setvalue",
            "method": "setValueFromEvent"
        }, {
            "name": "clearBonus",
            "method": "clearBonus"
        }, {
            "name": "attributeDamage",
            "method": "attributeDamageOrBonus"
        }, {
            "name": "attributeBonus",
            "method": "attributeDamageOrBonus"
        }, {
            "name": "valueChanged",
            "method": "valueChanged"
        }]; }
    static get style() { return "character-attribute.is-penalized {\n  color: red; }\n\ncharacter-attribute.is-boosted {\n  color: green; }\n\ncharacter-attribute .character-attribute-container.character-attribute-vertical {\n  width: 80px;\n  text-align: center; }\n  character-attribute .character-attribute-container.character-attribute-vertical .attribute-name {\n    font-weight: bold;\n    font-size: .8em; }\n  character-attribute .character-attribute-container.character-attribute-vertical editable-number {\n    border: 1px solid black;\n    padding: 15px 0 15px;\n    font-size: 1.2em;\n    font-weight: bold; }\n  character-attribute .character-attribute-container.character-attribute-vertical .attribute-bonus-container {\n    border-radius: 50%;\n    border: 1px solid black;\n    width: 50%;\n    margin: auto;\n    top: -5px;\n    position: relative;\n    background: white; }"; }
}

class CharacterSkill {
    constructor() {
        this.proficiencyBonus = 2;
        this.ranks = 0;
        this.bonus = 0;
        this.attributeBonus = 0;
        this.currentBonus = 0;
    }
    componentWillLoad() {
        this.isProficient = this.proficient;
    }
    componentDidLoad() {
        this.renderProficiency();
        this.recalculateCurrentBonus();
    }
    setRanks(event) {
        this.ranks = event.detail;
        this.recalculateCurrentBonus();
    }
    setAttributeBonus(event) {
        this.attributeBonus = event.detail;
        this.recalculateCurrentBonus();
    }
    setBonus(event) {
        this.bonus = event.detail;
        this.recalculateCurrentBonus();
    }
    toggleProficient() {
        this.isProficient = !this.isProficient;
        console.log(this.isProficient);
        this.renderProficiency();
        this.recalculateCurrentBonus();
    }
    recalculateCurrentBonus() {
        let bonus = this.bonus + this.attributeBonus + this.ranks;
        if (this.proficient) {
            bonus += this.proficiencyBonus;
        }
        this.currentBonus = bonus;
    }
    renderProficiency() {
        let span = this.el.querySelector('#isProficient');
        if (!span) {
            return;
        }
        if (this.isProficient) {
            span.classList.add('proficient');
        }
        else {
            span.classList.remove('proficient');
        }
    }
    render() {
        return (h("div", null,
            h("div", { class: "is-proficient" },
                h("span", { id: "isProficient", onClick: () => this.toggleProficient() })),
            h("div", { class: "current-bonus" }, this.currentBonus),
            h("div", { class: "name" }, this.name)));
    }
    static get is() { return "character-skill"; }
    static get properties() { return {
        "attributeBonus": {
            "type": Number,
            "attr": "attribute-bonus"
        },
        "bonus": {
            "type": Number,
            "attr": "bonus"
        },
        "currentBonus": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "isProficient": {
            "state": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "proficiencyBonus": {
            "type": Number,
            "attr": "proficiency-bonus"
        },
        "proficient": {
            "type": Boolean,
            "attr": "proficient"
        },
        "ranks": {
            "type": Number,
            "attr": "ranks"
        }
    }; }
    static get listeners() { return [{
            "name": "setRanks",
            "method": "setRanks"
        }, {
            "name": "setAttributeBonus",
            "method": "setAttributeBonus"
        }, {
            "name": "setBonus",
            "method": "setBonus"
        }]; }
    static get style() { return "character-skill > div {\n  border: 1px solid black;\n  padding: 5px;\n  display: -ms-flexbox;\n  display: flex;\n  min-width: 150px;\n  width: 150px;\n  border-collapse: collapse; }\n\ncharacter-skill div > div {\n  margin: auto; }\n\ncharacter-skill .is-proficient {\n  -ms-flex: .2;\n  flex: .2; }\n\ncharacter-skill .current-bonus {\n  -ms-flex: .5;\n  flex: .5; }\n\ncharacter-skill .name {\n  -ms-flex: 1;\n  flex: 1;\n  text-align: left; }\n\ncharacter-skill #isProficient.proficient::before {\n  content: 'x'; }\n\ncharacter-skill #isProficient {\n  display: inline-block;\n  height: 20px;\n  width: 10px;\n  border: 1px black dashed; }"; }
}

/**
 * @todo: The dot display could probably be its own sub-component.
 */
class DeathSavingThrow {
    constructor() {
        this.maxSuccesses = 3;
        this.maxFailures = 3;
        this.numSuccesses = 0;
        this.numFailures = 0;
    }
    clearCounts() {
        this.numSuccesses = 0;
        this.numFailures = 0;
    }
    counterMap(num, tickedNum) {
        let mapArr = new Array(num).fill(false);
        return mapArr.map((_, i) => {
            if (i < tickedNum) {
                return true;
            }
            return false;
        });
    }
    decrement(which) {
        if (which === 'success') {
            this.numSuccesses -= 1;
        }
        else {
            this.numFailures -= 1;
        }
        this.checkForImpossibleNumbers();
    }
    increment(which) {
        if (which === 'success') {
            this.numSuccesses += 1;
        }
        else {
            this.numFailures += 1;
        }
        this.checkForImpossibleNumbers();
    }
    checkForImpossibleNumbers() {
        if (this.numSuccesses < 0) {
            this.numSuccesses = 0;
        }
        if (this.numFailures < 0) {
            this.numFailures = 0;
        }
        if (this.numSuccesses > this.maxSuccesses) {
            this.numSuccesses = this.maxSuccesses;
        }
        if (this.numFailures > this.maxFailures) {
            this.numFailures = this.maxFailures;
        }
    }
    render() {
        return (h("div", { class: "death-saving-throw-container" },
            h("div", { class: "counter-container success-counter" },
                h("div", { class: "counter-name" }, "Successes"),
                h("div", { class: "counter-trackers" },
                    h("div", { class: "minus-button" },
                        h("button", { onClick: () => this.decrement('success') }, "-")),
                    this.counterMap(this.maxSuccesses, this.numSuccesses).map((v) => {
                        if (v) {
                            return (h("span", { class: "filled" }));
                        }
                        return (h("span", { class: "unfilled" }));
                    }),
                    h("div", { class: "plus-button" },
                        h("button", { onClick: _ => this.increment('success') }, "+")))),
            h("div", { class: "counter-container failure-counter" },
                h("div", { class: "counter-name" }, "Failures"),
                h("div", { class: "counter-trackers" },
                    h("div", { class: "minus-button" },
                        h("button", { onClick: () => this.decrement('failure') }, "-")),
                    this.counterMap(this.maxFailures, this.numFailures).map((v) => {
                        if (v) {
                            return (h("span", { class: "filled" }));
                        }
                        return (h("span", { class: "unfilled" }));
                    }),
                    h("div", { class: "plus-button" },
                        h("button", { onClick: _ => this.increment('failure') }, "+")))),
            h("h2", null, "Death Saves")));
    }
    static get is() { return "death-saving-throw"; }
    static get properties() { return {
        "clearCounts": {
            "method": true
        },
        "maxFailures": {
            "type": Number,
            "attr": "max-failures"
        },
        "maxSuccesses": {
            "type": Number,
            "attr": "max-successes"
        },
        "numFailures": {
            "state": true
        },
        "numSuccesses": {
            "state": true
        }
    }; }
    static get style() { return "death-saving-throw {\n  text-align: left; }\n  death-saving-throw .counter-container {\n    display: -ms-flexbox;\n    display: flex; }\n  death-saving-throw .counter-container > div {\n    -ms-flex: 1;\n    flex: 1; }\n  death-saving-throw button {\n    background-color: #ccc;\n    -webkit-box-shadow: 0px 1px #333;\n    box-shadow: 0px 1px #333;\n    border: 0;\n    border-radius: 30px;\n    min-width: 20px;\n    outline: none; }\n  death-saving-throw button:active {\n    background-color: #555; }\n  death-saving-throw .counter-trackers div {\n    display: inline-block;\n    margin-left: 5px;\n    margin-right: 5px; }\n  death-saving-throw span.filled, death-saving-throw span.unfilled {\n    display: inline-block;\n    border: 1px solid black;\n    border-radius: 50%;\n    width: 10px;\n    height: 10px;\n    margin: auto; }\n  death-saving-throw span.filled {\n    background-color: black; }\n  death-saving-throw h2 {\n    text-align: center;\n    font-size: 1em;\n    padding: 0;\n    margin: 0; }"; }
}

class MyApp {
    resetCounter(id) {
        document.getElementById(id).dispatchEvent(new CustomEvent('rpg_resetvalue'));
    }
    counterSetDemo() {
        //document.getElementById('hpTracker').dispatchEvent(new CustomEvent('rpg_setvalue', {detail: 100}))
        let track = document.querySelector('#hpTracker');
        console.log(track);
        track.maximum = "100";
    }
    addBonusToStrength() {
        document.querySelector('#strength').dispatchEvent(new CustomEvent('attributeBonus', { detail: 2 }));
    }
    gimmeGold() {
        let wallet = document.querySelector('#wallet');
        wallet.setCurrencyValue('GP', 200);
    }
    render() {
        return (h("div", null,
            h("header", null,
                h("h1", null, "RPG Components Example")),
            h("main", null,
                h("div", { class: "intro" },
                    h("div", { class: "intro-container" },
                        h("rpg-text-input", { label: "Name", "starting-text": "cthos", placeholder: "name", "style-type": "underneath" })),
                    h("div", { class: "intro-container" },
                        h("rpg-text-input", { label: "Class & Level", "style-type": "underneath" }),
                        h("rpg-text-input", { label: "Background", "style-type": "underneath" }),
                        h("rpg-text-input", { label: "Player Name", "style-type": "underneath" }),
                        h("rpg-text-input", { label: "Race", "style-type": "underneath" }),
                        h("rpg-text-input", { label: "Alignment", "style-type": "underneath" }),
                        h("rpg-text-input", { label: "Experience Points", "style-type": "underneath" }))),
                h("div", { class: "attributes" },
                    h("character-attribute", { id: "strength", name: "Strength", "attribute-value": 10 }),
                    h("character-attribute", { name: "Dexterity", "attribute-value": 18 }),
                    h("character-attribute", { name: "Constitution", "attribute-value": 8 }),
                    h("character-attribute", { name: "Intelligence", "attribute-value": 12 }),
                    h("character-attribute", { name: "Wisdom", "attribute-value": 10 }),
                    h("character-attribute", { name: "Charisma", "attribute-value": 16 })),
                h("div", { class: "point-example" },
                    h("div", { class: "pointtrack" },
                        h("point-tracker", { id: "manaTracker", title: "MP", maximum: 30 }),
                        h("point-tracker", { id: "ac", title: "AC", maximum: 14, "show-incrementors": false })),
                    h("div", { class: "hit-point-box" },
                        h("rpg-text-input", { label: "Hit Point Maximum", "style-type": "inline" }),
                        h("point-tracker", { id: "hpTracker", maximum: 10 })),
                    h("div", { class: "skill-list" },
                        h("character-skill", { name: "Acrobatics", proficient: true }),
                        h("character-skill", { name: "Animal Handling", proficient: true }),
                        h("character-skill", { name: "Arcana", proficient: true }),
                        h("character-skill", { name: "Athletics", proficient: true }),
                        h("character-skill", { name: "Deception", proficient: true }),
                        h("character-skill", { name: "Knowledge (History)", proficient: true })),
                    h("div", { class: "wallet" },
                        h("rpg-wallet", { id: "wallet", currencies: ['GP', 'SP', 'CP'], currencyValues: [100, 57, 99] })),
                    h("div", { class: "death-saving-throw" },
                        h("death-saving-throw", null))),
                h("div", { class: "equipment-container" },
                    h("rpg-equipment-box", null)),
                h("div", { class: "utility-container" },
                    h("button", { type: "button", onClick: () => this.resetCounter('hpTracker') }, "Reset HP Count"),
                    h("button", { type: "button", onClick: () => this.resetCounter('manaTracker') }, "Reset MP Count"),
                    h("button", { type: "button", onClick: () => this.counterSetDemo() }, "Set HP to 100"),
                    h("button", { type: "button", onClick: () => this.addBonusToStrength() }, "+2 to STR"),
                    h("button", { type: "button", onClick: () => this.gimmeGold() }, "Gain Gold")))));
    }
    static get is() { return "my-app"; }
    static get style() { return "my-app header {\n  background: #5851ff;\n  color: white;\n  height: 56px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26);\n  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.26); }\n\nmy-app main .intro {\n  width: 100%;\n  margin-bottom: 12px;\n  margin-left: 10px;\n  display: -ms-flexbox;\n  display: flex; }\n  my-app main .intro rpg-text-input {\n    width: 200px;\n    margin-right: 10px; }\n  my-app main .intro .intro-container:nth-child(1) {\n    width: 400px; }\n    my-app main .intro .intro-container:nth-child(1) rpg-text-input {\n      margin: auto;\n      padding-right: 10px;\n      width: 100%; }\n  my-app main .intro .intro-container {\n    width: 600px;\n    display: -ms-flexbox;\n    display: flex;\n    -ms-flex-wrap: wrap;\n    flex-wrap: wrap; }\n\nmy-app main > div {\n  float: left; }\n\nmy-app main .hit-point-box {\n  margin: auto;\n  text-align: left;\n  min-height: 100px;\n  width: 220px;\n  border: 1px solid black;\n  border-radius: 5px;\n  padding: 10px; }\n  my-app main .hit-point-box label {\n    font-size: .7em; }\n\nmy-app h1 {\n  font-size: 1.4rem;\n  font-weight: 500;\n  color: #fff;\n  padding: 0 12px; }\n\nmy-app .point-example {\n  width: 500px;\n  margin: auto;\n  text-align: center; }\n\nmy-app .attributes {\n  margin-left: 10px;\n  width: 10%; }\n\nmy-app .pointtrack {\n  margin: auto;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 250px;\n  display: -ms-flexbox;\n  display: flex;\n  -ms-flex-pack: center;\n  justify-content: center; }\n  my-app .pointtrack point-tracker {\n    -ms-flex: 1;\n    flex: 1; }\n\nmy-app .death-saving-throw {\n  width: 201px;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  padding: 5px 15px 5px 15px;\n  border: 1px solid black;\n  border-radius: 1em; }"; }
}

class PointTracker {
    constructor() {
        this.minimum = 0;
        this.showIncrementors = true;
        this.isEditable = false;
    }
    resetCounter() {
        this.currentValue = this.maximum;
        this.setValue(this.currentValue);
    }
    /**
     *
     * @todo - This Might be better as a prop that can be externally altered
     * Or maybe as both? Not sure.
     * @param event
     */
    setValueFromEvent(event) {
        if (event.detail) {
            this.setValue(event.detail);
        }
    }
    closeEditor() {
        if (this.isEditable) {
            this.isEditable = false;
        }
    }
    valueChanged(event) {
        if (this.currentValue != event.detail) {
            this.currentValue = event.detail;
        }
    }
    setMaximum(value) {
        this.maximum = parseInt(value);
        this.setValue(this.maximum);
    }
    componentWillLoad() {
        this.currentValue = this.maximum;
    }
    setValue(val) {
        let event = new CustomEvent('rpg_setvalue', { detail: val });
        this.el.querySelector('editable-number').dispatchEvent(event);
    }
    decrement() {
        this.currentValue -= 1;
        if (this.currentValue <= this.minimum) {
            this.currentValue = this.minimum;
        }
        this.setValue(this.currentValue);
    }
    increment() {
        this.currentValue += 1;
        if (this.currentValue >= this.maximum) {
            this.currentValue = this.maximum;
        }
        this.setValue(this.currentValue);
    }
    render() {
        return (h("div", { class: "container" },
            h("h2", null, this.title),
            h("editable-number", { startingValue: this.currentValue }),
            this.showIncrementors ?
                h("div", { class: "button-container" },
                    h("button", { class: "button-left", onClick: () => this.decrement() }, "-"),
                    h("button", { class: "button-right", onClick: () => this.increment() }, "+"))
                :
                    ""));
    }
    static get is() { return "point-tracker"; }
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
        "maximum": {
            "type": Number,
            "attr": "maximum",
            "watchCallbacks": ["setMaximum"]
        },
        "minimum": {
            "type": Number,
            "attr": "minimum"
        },
        "showIncrementors": {
            "type": Boolean,
            "attr": "show-incrementors"
        },
        "title": {
            "type": String,
            "attr": "title"
        }
    }; }
    static get listeners() { return [{
            "name": "rpg_resetvalue",
            "method": "resetCounter"
        }, {
            "name": "rpg_setvalue",
            "method": "setValueFromEvent"
        }, {
            "name": "keyup.escape",
            "method": "closeEditor"
        }, {
            "name": "keyup.enter",
            "method": "closeEditor"
        }, {
            "name": "valueChanged",
            "method": "valueChanged"
        }]; }
    static get style() { return "point-tracker {\n  text-align: center; }\n  point-tracker h2 {\n    margin: 0;\n    margin-bottom: 4px; }\n  point-tracker div.container {\n    width: 82px;\n    margin: auto; }\n  point-tracker editable-number {\n    padding: 20px;\n    font-size: 20px;\n    font-weight: black;\n    border: 1px solid black;\n    width: 40px;\n    margin-bottom: 5px;\n    border-radius: 20%; }\n  point-tracker button {\n    font-size: 18px;\n    font-weight: bold;\n    padding: 5px 10px 5px 10px;\n    background-image: radial-gradient(circle at center, #ddd 50%, #ccc 100%);\n    width: 48%;\n    -webkit-box-shadow: 0px 1px #333;\n    box-shadow: 0px 1px #333;\n    border: 0;\n    border-radius: 15%; }\n  point-tracker .button-container {\n    margin: auto;\n    position: relative;\n    overflow: auto;\n    height: 40px; }\n  point-tracker .button-left {\n    position: absolute;\n    left: 0; }\n  point-tracker .button-right {\n    position: absolute;\n    right: 0; }"; }
}

class Wallet {
    constructor() {
        /**
         * This is maintained in 2 values to preserve the order.
         */
        this.currencies = [
            'GP',
            'SP',
            'PP',
            'EP',
            'CP',
        ];
        this.currencyValues = [
            0,
            0,
            0,
            0,
            0
        ];
    }
    setCurrencyValue(nameOrIndex, value) {
        let pos;
        if (Number.isInteger(nameOrIndex)) {
            pos = nameOrIndex;
        }
        else {
            pos = this.currencies.indexOf(nameOrIndex);
        }
        if (pos < 0) {
            return;
        }
        this.currentCurrencyValues = this.currentCurrencyValues.map((v, idx) => {
            if (idx === pos) {
                return value;
            }
            ;
            return v;
        });
    }
    valueChanged(ev) {
        let targetEl = ev.target;
        let index = targetEl.getAttribute('data-index');
        this.setCurrencyValue(parseInt(index), ev.detail);
        console.log(this.currentCurrencyValues);
    }
    componentWillLoad() {
        this.currentCurrencyValues = this.currencyValues;
    }
    render() {
        return (h("div", { class: "wallet-container" }, this.currencies.map((currency, index) => h("div", { class: "currency" },
            h("span", { class: "currency-name" }, currency),
            h("span", { class: "currency-value" },
                h("editable-number", { "data-index": index, "starting-value": this.currentCurrencyValues[index] }))))));
    }
    static get is() { return "rpg-wallet"; }
    static get properties() { return {
        "currencies": {
            "type": "Any",
            "attr": "currencies"
        },
        "currencyValues": {
            "type": "Any",
            "attr": "currency-values"
        },
        "currentCurrencyValues": {
            "state": true
        },
        "setCurrencyValue": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "valueChanged",
            "method": "valueChanged"
        }]; }
    static get style() { return "rpg-wallet .wallet-container {\n  display: table;\n  border-spacing: 5px; }\n  rpg-wallet .wallet-container .currency {\n    display: table-row; }\n    rpg-wallet .wallet-container .currency span {\n      display: table-cell;\n      border: 1px solid black;\n      padding: 5px; }\n  rpg-wallet .wallet-container .currency-value {\n    text-align: right; }\n  rpg-wallet .wallet-container editable-number .counter-value {\n    border: 0; }"; }
}

export { CharacterAttribute, CharacterSkill, DeathSavingThrow, MyApp, PointTracker, Wallet as RpgWallet };
