This page provides various pipeline diagrams that visualize data flow and events as they occur during the lifecycle of a request.
You can see how the options you provide to a request influence the pipeline.

At various stations you will find references to relevant API and pipeline control parameters from e.g. _RequestOptions_.
If a reference's location in the API is unclear, go look it up in [Type Definitions](/api/5.x/type-definitions) or [API Overview](/api/5.x/core-overview).

> Study well
>
> Afford plenty of time to study these diagrams.
> They will give you a thorough understanding of how the Web Components library behaves given the many available options.
>
> This page is likely going to be your best companion during development.
> You might want to keep it open at all times.


## Legend

This is the legend of the elements that appear in the various pipeline diagrams.

![](/images/pipeline/pipeline-legend.jpg "Legend")


## Search

This diagram applies to requests from the `factfinder.request` namespace.
It is likely the one you will be using the most.

![](/images/pipeline/pipeline-search.jpg "Search-like requests")


## Suggest

This pipeline is invoked when an `ff-suggest-item` element of the [Suggest](/api/5.x/ff-suggest) component is clicked **before** it typically invokes either a _Search_ or a _Navigation_ request.

![](/images/pipeline/pipeline-suggest.jpg "Suggest")


## Tracking

The tracking pipeline is basically identical to the _Search_ pipeline except that it has no response pipeline other than success and fail handlers.
It applies to requests from the `factfinder.tracking` namespace.

![](/images/pipeline/pipeline-tracking.jpg "Tracking")
