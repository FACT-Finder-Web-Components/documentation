## Overview
The `ff-carousel` is a wrapper element for records, which displays them in a carousel-like manner.
The ff-carousel organizes the records as slides. A Slide is comparable to a page in a searchResult, but normally
smaller - 3 to 5 records.

The Record Template needs to be assigned to the slot='items'.
```html
<ff-record-list>
    <ff-carousel>
        <ff-record slot="items">
            <div id="title" data-track>{{record.Title}}</div>
            <div><strong>{{record.Price}} €</strong></div>
        </ff-record>
    </ff-carousel>
</ff-record-list>
```

You can also use this wrapper in every other element which uses a Record list, such as:
* ff-recommendation
* ff-simlar-products

```html
<ff-recommendation unresolved>
    <div class="recommendationHeader">Recommendations</div>
    <ff-record-list>
        <ff-carousel>
            <ff-record slot="items">
                <div id="title" data-track>{{record.Title}}</div>
                <div><strong>{{record.Price}} €</strong></div>
            </ff-record>
        </ff-carousel>
    </ff-record-list>
</ff-recommendation>
``` 

## Actions

 To navigate through the ff-carousel you can bind a few actions onto elements.
 * `data-start`: jump to the first slide
 * `data-nect`: jump to the next slide (if possible)
 * `data-prev`: jump to the previous slide (if possible)
 * `data-end`: jump to the last slide
 
 ```html
 <ff-record-list>
     <ff-carousel>
         <button data-start>"start"</button>
         <button data-prev>"prev"</button>
         <button data-next>"next"</button>
         <button data-end>"end"</button>
         <ff-record slot="items">
             <div id="title" data-track>{{record.Title}}</div>
             <div><strong>{{record.Price}} €</strong></div>
         </ff-record>
     </ff-carousel>
 </ff-record-list>
 ```
 
## Attributes

### per-slide
The 'per-slide' attribute defines, how many records per slide should be visible. Tweak this in combination with your css style to not waste space and/or pack to much records inside a container. Default is 3.
```html
<ff-record-list>
    <ff-carousel per-slide="5">
        <ff-record slot="items">
            <div id="title" data-track>{{record.Title}}</div>
            <div><strong>{{record.Price}} €</strong></div>
        </ff-record>
    </ff-carousel>
</ff-record-list>
```

### infinite
The 'infinite' attribute defines how the action 'data-next' and 'data-prev' should behave (Default is 'true'). 
If set to `true` the actions will turnover to the fist/last slide.
Ex. When the ff-carousel is currently on the last slide then on a 'data-next' action the ff-carousel will jump to the first slide.

```html
<ff-record-list>
    <ff-carousel infinite="true">
        <ff-record slot="items">
            <div id="title" data-track>{{record.Title}}</div>
            <div><strong>{{record.Price}} €</strong></div>
        </ff-record>
    </ff-carousel>
</ff-record-list>
```

### auto and delay
The 'auto' attribute does an automatic animation of the slides (default is false). After a set 'delay' the ff-carousel will internally use a 'data-next' to jump to the next slide.
It stops on the last slide. If 'infinite' is `true`, it will turn over to the first slide.

```html
<ff-record-list>
    <ff-carousel auto="true" delay="5000">
        <ff-record slot="items">
            <div id="title" data-track>{{record.Title}}</div>
            <div><strong>{{record.Price}} €</strong></div>
        </ff-record>
    </ff-carousel>
</ff-record-list>
```

### show-bullets
The 'Bullets' are a container which allows for a direct selection of a slide, much like a paging. It is represented as
dots and can be styled with mix-ins. By default it is turned off.

```html
<ff-record-list>
    <ff-carousel show-bullets="true">
        <ff-record slot="items">
            <div id="title" data-track>{{record.Title}}</div>
            <div><strong>{{record.Price}} €</strong></div>
        </ff-record>
    </ff-carousel>
</ff-record-list>
```

## Mixins
* `--ff-carousel-plane`:The base container in which the records are placed.
* `--ff-carousel-container`: The outer container which acts as a view.
* `--ff-carousel-bullets`: Used to style the bullets.
* `--ff-carousel-bullet-button`: Style of the bullet buttons.
* `--ff-carousel-bullet-button-hover`: The hover effect on a button.
* `--ff-carousel-bullet-button-selected`: The selected bullet button.