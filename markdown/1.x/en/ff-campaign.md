## Adding Feedback campaigns

Feedback campaigns can be displayed using `ff-campaign-feedbacktext` elements. There may be multiple elements and they can be placed anywhere in the document.

Through the `label` attribute you define which campaigns can be displayed by the element. The attribute's value must match one of the campaigns' **labels** that are defined in FactFinder. If multiple campaigns are configured to target the same **label**, the `ff-campaign-feedbacktext` element with the corresponding `label` will serve as the outlet to all these campaigns.

Remember that a campaign's trigger condition must still be satisfied before it can be displayed by `ff-campaign-feedbacktext`. If multiple campaigns targeting the same **label** are triggered simultaneously, the campaign appearing last in the FactFinder response will be displayed.

The only necessary data binding is `{{text}}`.

**NOTE**: If you are using **HTML feedbacktexts**, you need to use the **{{{triple mustache syntax}}}**.

```html
<ff-campaign-feedbacktext label="above products">
    {{text}}
    <!--or mixed content-->
    <!--<div>{{text}}</div>-->
</ff-campaign-feedbacktext>
```

## Adding Advisor campaigns
To integrate Advisor campaigns properly, you need to use the `ff-campaign-advisor`, `ff-campaign-advisor-question` and `ff-campaign-advisor-answer` elements.

The `ff-campaign-advisor-question` is copied for each question configured in FactFinder. It is inserted at its current position on element load.
Annotate any HTML-Element inside the question with the `[data-question]` attribute to use it for data binding purposes.

The `ff-campaign-advisor-answer` is copied for each answer which is configured in FactFinder. It is inserted at its current position on element load. In the following example the answers are always inserted at firstChild position

You can use the `[name]` attribute to use the `ff-campaign-advisor-answer` element as a template for a campaign with that name.

You can use the `[not]` attribute to use the `ff-campaign-advisor-answer` element NOT as a template for a campaign with that name.

**NOTE**: In order for advisor campaigns to work correctly, `ff-communication` parameters `use-browser-history` and `use-url-parameter` can't be set to false.

```html
<ff-campaign-advisor name="Advisor Schuhe">
    <ff-campaign-advisor-question>
        <span><h1 data-question>{{text}}</h1></span>
        <div class="shoes-answers-box">
            <ff-campaign-advisor-answer>
                <div class="shoes-answers">
                    {{text}}
                </div>
            </ff-campaign-advisor-answer>
        </div>
    </ff-campaign-advisor-question>
</ff-campaign-advisor>
```

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
