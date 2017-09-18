## API Reference
## ff-carousel

### Properties

| Name | Description |
| ---- | ----------- |
|**infinite**&nbsp;(String) **Options**:&nbsp;true,&nbsp;false (default:true)| When `true` the slides will flip over on a data-next or data-prev action.|
|**auto**&nbsp;(String) **Options**:&nbsp;true,&nbsp;false (default:false)| When 'true' the slides will automatically flip to the next slide after a 'delay'|
|**delay**(Number) (default:2000)|This delay will be used when the 'auto' property is set to `true`. Value is uses as microseconds.|
|**per-slide** (Number) (default:3)|This defines how many records per slide will be visible.|
|**show-bullets**(String) **Options**:true,&nbsp;false (default:false)|Displays as many bullets under the ff-carousel as it has pages to switch between pages.|

# TODO (AP): change to table?
## Mixins
* `--ff-carousel-plane`:The base container in which the records are placed.
* `--ff-carousel-container`: The outer container which acts as a view.
* `--ff-carousel-bullets`: Used to style the bullets.
* `--ff-carousel-bullet-button`: Style of the bullet buttons.
* `--ff-carousel-bullet-button-hover`: The hover effect on a button.
* `--ff-carousel-bullet-button-selected`: The selected bullet button.