# rpg-text-input



<!-- Auto Generated Below -->


## Properties

| Property       | Attribute       | Description | Type      | Default     |
| -------------- | --------------- | ----------- | --------- | ----------- |
| `isEditable`   | `is-editable`   |             | `boolean` | `true`      |
| `label`        | `label`         |             | `string`  | `undefined` |
| `placeholder`  | `placeholder`   |             | `string`  | `undefined` |
| `showLock`     | `show-lock`     |             | `boolean` | `true`      |
| `startingText` | `starting-text` |             | `string`  | `undefined` |
| `styleType`    | `style-type`    |             | `string`  | `'inline'`  |


## Events

| Event            | Description | Type               |
| ---------------- | ----------- | ------------------ |
| `editorSelected` |             | `CustomEvent<any>` |


## Methods

### `closeEditor() => Promise<void>`



#### Returns

Type: `Promise<void>`



### `openEditor() => Promise<void>`



#### Returns

Type: `Promise<void>`




## Dependencies

### Used by

 - [my-app](../../my-app)
 - [rpg-equipment-generic](../../character-sheet/equipment/generic)
 - [rpg-equipment-weapon](../../character-sheet/equipment/weapon)

### Graph
```mermaid
graph TD;
  my-app --> rpg-text-input
  rpg-equipment-generic --> rpg-text-input
  rpg-equipment-weapon --> rpg-text-input
  style rpg-text-input fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
