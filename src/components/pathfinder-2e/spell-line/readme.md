# rpg-spell-line



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute    | Description | Type       | Default                                              |
| ------------ | ------------ | ----------- | ---------- | ---------------------------------------------------- |
| `components` | --           |             | `string[]` | `[     'verbal',     'somatic',     'material',   ]` |
| `spellName`  | `spell-name` |             | `string`   | `undefined`                                          |


## Events

| Event          | Description | Type               |
| -------------- | ----------- | ------------------ |
| `didCastSpell` |             | `CustomEvent<any>` |


## Methods

### `castSpell() => Promise<any>`



#### Returns

Type: `Promise<any>`




## Dependencies

### Used by

 - [my-app](../../my-app)

### Graph
```mermaid
graph TD;
  my-app --> rpg-spell-line
  style rpg-spell-line fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
