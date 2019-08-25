# rpg-equipment-generic



<!-- Auto Generated Below -->


## Properties

| Property        | Attribute        | Description | Type     | Default     |
| --------------- | ---------------- | ----------- | -------- | ----------- |
| `name`          | `name`           |             | `string` | `''`        |
| `size`          | `size`           |             | `string` | `undefined` |
| `startingCount` | `starting-count` |             | `number` | `0`         |
| `weight`        | `weight`         |             | `number` | `0`         |


## Methods

### `useItem() => Promise<boolean>`



#### Returns

Type: `Promise<boolean>`




## Dependencies

### Used by

 - [rpg-equipment-box](../box)

### Depends on

- [rpg-text-input](../../../common/text-input)

### Graph
```mermaid
graph TD;
  rpg-equipment-generic --> rpg-text-input
  rpg-equipment-box --> rpg-equipment-generic
  style rpg-equipment-generic fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
