## Third party library

In this example, you can see how easy it is to extend the `ff-record` with a third party functionality. For example with jquery3D.

```html
<script src="jquery.hover3d.js"></script>
```

## Get all records

We add a 3D hover effect for each record by hooking onto the `dom-update` event on a `ff-record-list`
and iterate over each `ff-record` to apply the mouse over effect.

```html
<script>
    // Hover initializing. Will be called after the elements have been loaded.
    function applyHover() {
        // add an eventlistener to the ff-record-list event which is called everytime the html content was updated
        document.querySelector("ff-record-list").addEventListener("dom-updated", function (event) {
            // get the record list from the source attribute of the event callback.
            var ffRecordListElement = event.srcElement;
            // get the record data from the record list.
            var records = ffRecordListElement.querySelectorAll("ff-record");
            // iterating through all current visible records.
            for (var i = 0; i < records.length; i++) {
                var record = records[i];
                applyEffect(record);
            }
        });
    }
</script>
```

## Adding effects

Add the `mouseover` and `mouseout` effects to the record with the css selector via id.

```html
<script>
    function applyEffect(record) {
        if (record.style.display !== "none") {
            var id = record.children[0].id;

            // getting the rating and information element and hiding it.
            $(this).find('#' + id + '_rating').hide();
            $(this).find('#' + id + '_info').hide();

            var recordContainer = $("#" + id);

            recordContainer.hover3d({
                selector: '#' + id + "_record",
                shine: true,
                sensitivity: 8
            });

            recordContainer.on('mouseover', function () {
                // changed the z-index to make sure the current selected record is overlapping all other records.
                $(this).css({zIndex: "999"});
                $(this).find('.short-info').css({background: "#FFF"});
                $(this).find('.short-info').addClass('hover');

                // get the rating and information element and showing it.
                $(this).find('.rating').show();
                $(this).find('.info').show();
            }).on('mouseout', function () {
                //reset the z-index of the selected record.
                $(this).css({zIndex: "0"});
                // change the background color to none of the rating and the information box.
                $(this).find('.short-info').css({background: ""});
                $(this).find('.short-info').removeClass('hover');

                // get the rating and information element and hiding it.
                $(this).find('.rating').hide();
                $(this).find('.info').hide();

                // remove the background color of the mouseover shining box after the mouseout event.
                $(this).find('.shine').css({background: ""});
            });
        }
    }
</script>
```

## Preparing a record list

To let the css selector find the right container, we need to set the `id` attribute on them. This is
done with the <b>{{id}}</b> syntax. Where each `div` container gets the id from its record.

```html
<ff-record-list>
    <ff-record>
        <div id="{{id}}" class="content">
            <div class="short-info" id="{{id}}_record">
                <div id="{{id}}_rating" class="rating"><strong>Rating:</strong> {{record.Rating}}<br/></div>
                <img data-image>
                <div class="record">
                    <a href="https://www.bergfreunde.de/{{record.Deeplink}}" data-action="redirect">
                        {{record.Title}}
                    </a>
                    <div>Price: <strong>{{record.Price}} €</strong></div>
                </div>
                <div id="{{id}}_info" class="info"><strong>Description:</strong><br/>{{record.Description}}
                </div>
            </div>
        </div>
    </ff-record>
</ff-record-list>
```

## On page load

Finally trigger the `applyHover()` when the elements are loaded.

```html
<link rel="import" href="elements.html" onload="applyHover();">
```