# rpg-equipment-box



<!-- Auto Generated Below -->


## Properties

| Property     | Attribute     | Description | Type     | Default |
| ------------ | ------------- | ----------- | -------- | ------- |
| `numGeneric` | `num-generic` |             | `number` | `10`    |
| `numWeapons` | `num-weapons` |             | `number` | `3`     |


## Dependencies

### Used by

 - [my-app](../../../my-app)

### Depends on

- [rpg-equipment-generic](../generic)

### Graph
```mermaid
graph TD;
  rpg-equipment-box --> rpg-equipment-generic
  rpg-equipment-generic --> rpg-text-input
  my-app --> rpg-equipment-box
  style rpg-equipment-box fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
