## Adding a Landing Page

With the `ff-campaign-landing-page` element you can display product campaigns independently of search requests.
A common use case is the start page of your website.

```html
<ff-campaign-landing-page page-id="home"></ff-campaign-landing-page>
```

`ff-campaign-landing-page` triggers the FactFinder campaign that corresponds to the `page-id` attribute.

Note that the element itself **does not display anything**, nor does it take any child elements.
It is merely a trigger that you place on those pages you want to display a landing page campaign.

**Visualisation** of the triggered campaign is done through the elements `ff-campaign-feedbacktext` and `ff-campaign-pushed-products`.
In order to display landing page campaigns they must be given the `is-landing-page-campaign` attribute.

```html
<ff-campaign-landing-page page-id="page-id-according-to-FF-config"></ff-campaign-landing-page>

<ff-campaign-feedbacktext is-landing-page-campaign label="your-label">
    {{{text}}}
</ff-campaign-feedbacktext>

<ff-campaign-pushed-products is-landing-page-campaign>
    <ff-record-list subscribe="false">
        <ff-record>
            ...
        </ff-record>
    </ff-record-list>
</ff-campaign-pushed-products>
```

For more information see [Adding Feedback campaigns](/api/4.x/ff-campaign) and [Pushed Products](/api/4.x/ff-campaign-pushed-products).
