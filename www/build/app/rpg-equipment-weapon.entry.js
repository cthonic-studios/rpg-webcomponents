const h = window.App.h;

class EquipmentWeapon {
    render() {
        return (h("div", { class: "equipment-line" },
            h("rpg-text-input", { "starting-text": this.name }),
            h("span", null, "Damage Die"),
            h("rpg-text-input", { class: "quantity", "starting-text": this.currentCount }),
            h("rpg-text-input", { class: "weight", "starting-text": this.currentWeight }),
            h("span", null,
                "(",
                this.currentWeight,
                ")")));
    }
    static get is() { return "rpg-equipment-weapon"; }
    static get style() { return ""; }
}

export { EquipmentWeapon as RpgEquipmentWeapon };
