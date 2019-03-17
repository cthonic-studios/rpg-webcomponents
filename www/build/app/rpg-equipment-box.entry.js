const h = window.App.h;

class EquipmentBox {
    constructor() {
        this.numGeneric = 10;
        this.numWeapons = 3;
        this.totalWeight = 0;
    }
    render() {
        let genericLines = [];
        let weaponLines = [];
        for (let i = 0; i < this.numWeapons; i++) {
            weaponLines.push('');
        }
        for (let i = 0; i < this.numGeneric; i++) {
            genericLines.push(h("rpg-equipment-generic", null));
        }
        return (h("div", { class: 'equipment-box' },
            weaponLines.map(el => el),
            genericLines.map(el => el)));
    }
    static get is() { return "rpg-equipment-box"; }
    static get properties() { return {
        "el": {
            "elementRef": true
        },
        "numGeneric": {
            "type": Number,
            "attr": "num-generic"
        },
        "numWeapons": {
            "type": Number,
            "attr": "num-weapons"
        },
        "totalWeight": {
            "state": true
        }
    }; }
    static get style() { return ""; }
}

class EquipmentGeneric {
    constructor() {
        this.name = '';
        this.startingCount = 0;
        this.weight = 0;
        this.currentWeight = 0;
    }
    useItem() {
        this.currentCount = this.currentCount - 1;
        if (this.currentCount < 0) {
            this.currentCount = 0;
            return false;
        }
        this.eventUsed();
        return true;
    }
    componentWillLoad() {
        this.currentCount = this.startingCount;
        this.itemWeight = this.weight;
    }
    componentDidLoad() {
        this.el.querySelector('.weight')
            .addEventListener('rpg_text_changed', (ev) => this.playerChangedWeight(ev));
        this.el.querySelector('.quantity')
            .addEventListener('rpg_text_changed', (ev) => this.playerChangedQuantity(ev));
    }
    recalculateWeight() {
        this.currentWeight = this.currentCount * this.itemWeight;
        console.log(this.currentWeight);
        this.eventWeightChanged();
    }
    playerChangedWeight(event) {
        this.itemWeight = parseInt(event.detail.newText);
        this.recalculateWeight();
    }
    playerChangedQuantity(event) {
        this.currentCount = parseInt(event.detail.newText);
        this.recalculateWeight();
    }
    eventUsed() {
        const eUsed = new CustomEvent('rpg_item_used', {
            detail: {
                name: this.name,
                remainingCount: this.currentCount,
            }
        });
        this.el.dispatchEvent(eUsed);
    }
    /**
     * Fires an event with the item's new calculated weight.
     */
    eventWeightChanged() {
        const weight = new CustomEvent('rpg_item_weight_changed', {
            detail: {
                name: this.name,
                newWeight: this.currentWeight
            }
        });
        this.el.dispatchEvent(weight);
    }
    render() {
        return (h("div", { class: "equipment-line" },
            h("rpg-text-input", { "starting-text": this.name }),
            h("rpg-text-input", { class: "quantity", "starting-text": this.currentCount }),
            h("rpg-text-input", { class: "weight", "starting-text": this.currentWeight }),
            h("span", null,
                "(",
                this.currentWeight,
                ")")));
    }
    static get is() { return "rpg-equipment-generic"; }
    static get properties() { return {
        "currentCount": {
            "state": true
        },
        "currentWeight": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "itemWeight": {
            "state": true
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "startingCount": {
            "type": Number,
            "attr": "starting-count"
        },
        "useItem": {
            "method": true
        },
        "weight": {
            "type": Number,
            "attr": "weight"
        }
    }; }
    static get style() { return "rpg-equipment-generic .equipment-line {\n  width: 100%;\n  display: -ms-flexbox;\n  display: flex; }\n  rpg-equipment-generic .equipment-line rpg-text-input {\n    -ms-flex: 1;\n    flex: 1; }"; }
}

export { EquipmentBox as RpgEquipmentBox, EquipmentGeneric as RpgEquipmentGeneric };
