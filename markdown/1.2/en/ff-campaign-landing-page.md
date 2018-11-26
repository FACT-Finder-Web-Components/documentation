## Adding a Landing Page
With the `ff-campaign-landing-page` you can display product campaigns on a custom display location (e.g. the start page of your website). All you need to do is add the `ff-campaign-landing-page` element to your page and set the attribute page-id to the value of the corresponding FACT-Finder campaign you configured.

```html
<ff-campaign-landing-page page-id="home"></ff-campaign-landing-page>
```

The element triggers the campaign but doesn't display anything. Depending on the configured campaign, you need to add a `ff-campaign-feedbacktext` to display the feedback text and/or a `ff-campaign-pushed-products` to display pushed products. For more information, see: [Campaign](http://web-components.fact-finder.de/documentation/ff-campaign) and [Pushed Products](http://web-components.fact-finder.de/documentation/ff-campaign-pushed-products).
