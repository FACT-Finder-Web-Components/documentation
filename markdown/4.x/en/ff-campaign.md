## Adding Feedback campaigns

Feedback campaigns can be displayed using `ff-campaign-feedbacktext` elements. There may be multiple elements and they can be placed anywhere in the document.

Through the `label` attribute you define which campaigns can be displayed by the element. The attribute's value must match one of the campaigns' **labels** that are defined in FactFinder. If multiple campaigns are configured to target the same **label**, the `ff-campaign-feedbacktext` element with the corresponding `label` will serve as the outlet to all these campaigns.

Remember that a campaign's trigger condition must still be satisfied before it can be displayed by `ff-campaign-feedbacktext`. If multiple campaigns targeting the same **label** are triggered simultaneously, the campaign appearing last in the FactFinder response will be displayed.

The only necessary data binding is `{{text}}`.

> Note
>
> If you are using **HTML feedbacktexts**, you need to use the **{{{triple mustache syntax}}}**.

```html
<ff-campaign-feedbacktext label="above products">
    {{text}}
    <!--or mixed content-->
    <!--<div>{{text}}</div>-->
</ff-campaign-feedbacktext>
```


## Adding Advisor campaigns

To integrate advisor campaigns you need the following elements:

- `ff-campaign-advisor`
- `ff-campaign-advisor-question`
- `ff-campaign-advisor-answer`

Whenever there is an active advisor campaign in the search result, the `ff-campaign-advisor` element will display it.

```html
<ff-campaign-advisor></ff-campaign-advisor>
```

`ff-campaign-advisor` is the outer element that contains `ff-campaign-advisor-question`
and `ff-campaign-advisor-answer`.
It offers two optional attributes `name` and `not` to limit which campaigns the element shall display.

With `name` you can restrict the element to display only one particular advisor campaign.
The attribute's value corresponds to a campaign name that you configure in your FactFinder UI.

```html
<ff-campaign-advisor name="your-advisor-campaign-name">
    ...
</ff-campaign-advisor>
```

The `not` attribute takes a comma-separated list of campaign names that shall be ignored.

```html
<ff-campaign-advisor not="ignored-campaign-1,ignored-campaign-2">
    ...
</ff-campaign-advisor>
```

`ff-campaign-advisor-question` is used as a template for each **question** configured in FactFinder.
It is rendered at the position you define it in the HTML.

To enable **data binding** to the underlying `question` object from the FactFinder response, you must place a `data-question` attribute (without a value) on a child element of `ff-campaign-advisor-question`.

```html
<ff-campaign-advisor>
    <ff-campaign-advisor-question>
        <h2 data-question>{{{text}}}</h2>
        ...
    </ff-campaign-advisor-question>
</ff-campaign-advisor>
```

If the `text` of your question contains HTML, use **triple curly braces**.
Double curly braces render the contained text verbatim without interpreting it as HTML.

`ff-campaign-advisor-answer` is used as a template for each **answer** in the applied advisor campaign.
It must be nested inside `ff-campaign-advisor-question` where it is rendered at the position it is defined in the HTML.

Unlike `ff-campaign-advisor-question`, it does not require further attributes and **data binding** to the underlying `answer` object is available inside the entire `ff-campaign-advisor-answer` element.

```html
<ff-campaign-advisor>
    <ff-campaign-advisor-question>
        <h2 data-question>{{{text}}}</h2>
        <div class="answers-box">
            <ff-campaign-advisor-answer>
                <div class="answer">
                    {{{text}}}
                </div>
            </ff-campaign-advisor-answer>
        </div>
    </ff-campaign-advisor-question>
</ff-campaign-advisor>
```

Again, use **triple curly braces** for data binding if your answer `text` contains HTML.

> Attention
>
> In order for advisor campaigns to work correctly, `ff-communication` parameters `use-browser-history` and `use-url-parameters` must not be set to false.


## Adding Redirect campaigns
The `ff-campaign-redirect` element redirects the browser to a destination specified in a redirect campaign. If the latest request to FactFinder triggered a redirect campaign, all further processing of the response will be suspended and the redirect will happen immediately.

To ensure it is executed before any other elements, `ff-campaign-redirect` should be placed directly after the opening `<body>` tag.

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        ...
    </head>
    <body>
        <ff-campaign-redirect relative-to-origin></ff-campaign-redirect>
        ...
    </body>
</html>
```

Internally the element uses `document.location.replace`.

There is one optional attribute available: `relative-to-origin`. It takes no value. If it is present on the element, relative destination URLs without a leading slash (e.g. `relative/page`) will be set relative to the origin of the current page. Absolute URLs and URLs with a leading `/` are unaffected by the attribute.

Assuming the URL of the current page is `https://www.your.shop/section/sub-section`:

| campaign destination       | w/ relative-to-origin               | w/o relative-to-origin                      |
|----------------------------|-------------------------------------|---------------------------------------------|
| relative/page              | https://www.your.shop/relative/page | https://www.your.shop/section/relative/page |
| /relative/page             | https://www.your.shop/relative/page | https://www.your.shop/relative/page         |
| https://www.fact-finder.de | https://www.fact-finder.de          | https://www.fact-finder.de                  |
