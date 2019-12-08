# my-app



<!-- Auto Generated Below -->


## Dependencies

### Depends on

- [rpg-text-input](../common/text-input)
- [character-attribute](../character-sheet/character-attribute)
- [point-tracker](../character-sheet/point-tracker)
- [character-skill](../character-sheet/character-skill)
- [rpg-wallet](../character-sheet/wallet)
- [death-saving-throw](../5e/death-saving-throw)
- [rpg-spell-line](../pathfinder-2e/spell-line)
- [rpg-equipment-box](../character-sheet/equipment/box)

### Graph
```mermaid
graph TD;
  my-app --> rpg-text-input
  my-app --> character-attribute
  my-app --> point-tracker
  my-app --> character-skill
  my-app --> rpg-wallet
  my-app --> death-saving-throw
  my-app --> rpg-spell-line
  my-app --> rpg-equipment-box
  character-attribute --> editable-number
  point-tracker --> editable-number
  rpg-wallet --> editable-number
  rpg-equipment-box --> rpg-equipment-generic
  rpg-equipment-generic --> rpg-text-input
  style my-app fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
