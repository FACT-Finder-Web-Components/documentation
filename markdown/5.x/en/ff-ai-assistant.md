> **Beta:** This component is currently in beta. Its features, behavior, and configuration may change.


## Overview

The AI Shopping Assistant turns product discovery into a natural conversation. It supports text interaction, product suggestions, and guided follow-up prompts while handling API communication and tracking behind the scenes.

The Assistant supports one conversation at a time. Starting a new conversation replaces the current one. The conversation is stored in the browser, allowing shoppers to continue where they left off after page reloads or navigation.

**Use it with or without other Web Components.** The Assistant is part of the FactFinder Web Components library. Existing Web Components integrations can add it alongside other components, while integrations that use only the Assistant do not require any other Web Components.


## Before you start

If you already use FactFinder Web Components, most of the setup will be familiar. The Assistant adds two new elements and some component-specific configuration.

If you intend to use only the Assistant, review the core library setup first:

- [Install the library](#) (Manual installation)
- [Include Web Components in your page](#)
- Basic configuration (partially relevant when using only the Assistant): [https://web-components.fact-finder.de/api/5.x/core-configuration](https://web-components.fact-finder.de/api/5.x/core-configuration)


## HTML setup

```html
<head>
    <style>
        [unresolved] {
            display: none;
        }
    </style>
</head>

<body>
    <ff-ai-assistant unresolved></ff-ai-assistant>

    <ff-ai-assistant-launcher class="custom-floating" unresolved></ff-ai-assistant-launcher>
</body>
```

Add the `unresolved` attribute to every Assistant element and define the corresponding style rule in the document `head`. This ensures the rule is available before the elements render and keeps components hidden during initialization.

`ff-ai-assistant` provides the complete chat interface. Use exactly one instance per page. Its internal HTML structure is managed by the component and cannot be customized directly; use CSS to adapt its appearance.

`ff-ai-assistant-launcher` renders a button that opens the chat window. You can add any number of launchers and place them wherever an entry point is needed—for example, as a floating button or inside a suggestion popup.

In this example, the `custom-floating` class positions the launcher in a corner of the viewport. CSS customization is covered later.


## JavaScript configuration

```javascript
document.addEventListener(`ffCoreReady`, ({ factfinder, init }) => {
    init({
        // Include `ff` only when using other FactFinder Web Components.
        ff: {
            url: `https://your-instance.fact-finder.com/fact-finder`,
            channel: `your-channel`,
            apiKey: `your.apiKey`,
        },
        ffParams: {
            // Provide the shop's user ID when available.
            userId: `<USER-ID-PROVIDED-BY-YOUR-SHOP>`,
        },
        appConfig: {
            // Configure the locale and currency used for prices in product suggestions.
            locale: `en-GB`,
            formatOptions: {
                style: `currency`,
                currency: `GBP`,
            },
        },
    });

    // Use the AI Assistant-specific URL, channel, and API key.
    // These values differ from those in `ff`.
    factfinder.components.aiAssistant.config({
        url: `https://your-assistant-instance.ai`,
        channel: `your-assistant-channel`,
        apiKey: `your-assistant-apiKey`,
    });
});
```


## `ff-ai-assistant`

The `ff-ai-assistant` component provides the text-based interaction between the shopper and the Assistant. In addition to conversational responses, it can render product suggestions and predefined follow-up prompts. These prompts appear as selectable buttons, allowing shoppers to clarify or refine their request without typing a full response.

A built-in **Start new chat** button lets shoppers replace the current conversation and begin a new one.

If an error occurs during a conversation, the component displays an error message in the chat. If the error is irrecoverable—for example, because the session has expired—the component stops accepting further input. The shopper must start a new chat to continue.


### Language configuration

The `lang-de` attribute controls the language of the Assistant interface. It is a boolean attribute: omit it for English, or add it to `ff-ai-assistant` to use the German interface.

```html
<ff-ai-assistant lang-de unresolved></ff-ai-assistant>
```

The attribute affects only the interface, not the language of the conversation. It should match the Assistant’s back-end language setting.

> **Beta:** This language configuration is likely to change for the production release.


### Visibility state

The `opened` attribute is read-only: the component adds it while the Assistant is visible and removes it when the Assistant is closed.

The attribute does not control visibility by itself. Add a CSS rule that hides the element when `opened` is absent:

```css
ff-ai-assistant {
    visibility: hidden;
}
ff-ai-assistant[opened] {
    visibility: visible;
}
```

For a quick start, use the complete example stylesheet at the end of this guide. It includes the required visibility rules, can be copied as-is, and provides a starting point for adapting the Assistant to your storefront.


## `ff-ai-assistant-launcher`

The `ff-ai-assistant-launcher` supports two modes. You can add any number of launchers, and each launcher can use either mode. In both modes, a launcher opens the chat window and either starts a new conversation or resumes an existing one.

Launcher components have no built-in language configuration, and the `lang-de` attribute on `ff-ai-assistant` does not affect them. To localize launcher text, define custom HTML templates in the desired language.


### Standalone

Standalone is the default and requires no component configuration. This mode is intended for a floating button, which automatically disappears while the chat window is open. The example stylesheet includes positioning rules for `.custom-floating`. The class is only a styling hook—you can rename it or omit it entirely when using your own styles.

```html
<ff-ai-assistant-launcher class="custom-floating" unresolved></ff-ai-assistant-launcher>
```


### Search box integration

To connect a launcher to a search box, set its `for` attribute to the `id` of the target text box.

- **Prompt handling:** The current search term becomes the first prompt in a new conversation or the next prompt in an ongoing conversation.
- **Placement:** A launcher with a `for` attribute is treated as integrated rather than floating and remains visible while the chat window is open.

```html
<input id="product-search" type="search">

<ff-ai-assistant-launcher for="product-search" unresolved></ff-ai-assistant-launcher>
```


### Custom template

You can define a custom HTML template for a launcher. The markup can be structured freely; the only requirement is that it contains a `button` element. Leave the `ff-ai-assistant-launcher` element empty to use the default template.

To include the default icon, use the optional `{{{icon}}}` data binding. Keep all three opening and closing braces; the binding renders an SVG icon.

The examples below reproduce the default templates for both launcher modes: the first applies when `for` is absent, and the second when `for` is present.

```html
<ff-ai-assistant-launcher unresolved>
    <button>{{{icon}}}AI Assistant</button>
</ff-ai-assistant-launcher>

<ff-ai-assistant-launcher for="search-box" unresolved>
    <button>{{{icon}}}Open in Assistant</button>
</ff-ai-assistant-launcher>
```


## Example stylesheet

Use the stylesheet below for a quick start. It includes the Assistant’s visibility rules and styling for a floating launcher, and can be adapted to match your storefront. Keep the `[unresolved]` rule from the basic setup in the document `head` so it is available before the components initialize.

```css
ff-ai-assistant,
ff-ai-assistant-launcher {
    --default-font-family: sans-serif;

    --font-size: 16px;
    --font-weight-normal: 400;
    --font-weight-medium: 500;
    --font-weight-semibold: 600;
    --leading-relaxed: 1.625;
    --leading-snug: 1.375;
    --text-base: 1rem;
    --text-sm: .875rem;
    --text-sm--line-height: calc(1.25 / .875);
    --text-xs: .75rem;
    --text-xs--line-height: calc(1 / .75);

    --color-assistant-background: #fff;
    --color-background: #f5f3ee;
    --color-border: #1a1a181a;
    --color-white: #fff;
    --color-foreground: #1a1a18;
    --color-muted-foreground: #888880;
    --color-secondary: #eceae4;

    --shadow: 0 10px 15px -3px #0000001a, 0 4px 6px -4px #0000001a;

    --assistant-width: 372px;
    --radius: .5rem;
    --spacing: .25rem;
    --scrollbar-width: thin;

    --default-transition-duration: .15s;
    --slide-in-duration: 400ms;
}

ff-ai-assistant,
ff-ai-assistant-launcher {
    font-family: var(--default-font-family);
    font-size: var(--font-size);
}
ff-ai-assistant button,
ff-ai-assistant-launcher button {
    font: inherit;
    color: inherit;
    cursor: pointer;
}
ff-ai-assistant input,
ff-ai-assistant-launcher input {
    font: inherit;
    color: inherit;
}

ff-ai-assistant-launcher {
    background-color: var(--color-foreground);
    border-radius: var(--radius);
    color: var(--color-background);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--text-sm--line-height);
    z-index: 999;
}
ff-ai-assistant-launcher[for] {
    display: inline-block;
}
/* Add .custom-floating to ff-ai-assistant-launcher to position it as a floating button. The component does not add this class automatically. */
ff-ai-assistant-launcher.custom-floating {
    bottom: calc(var(--spacing) * 6);
    box-shadow: var(--shadow);
    position: fixed;
    right: calc(var(--spacing) * 6);
}
ff-ai-assistant-launcher button {
    align-items: center;
    background: none;
    border: none;
    display: flex;
    gap: calc(var(--spacing) * 2);
    justify-content: center;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 4);
}

ff-ai-assistant,
ff-ai-assistant * {
    border: 0 solid;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}
ff-ai-assistant {
    background-color: var(--color-assistant-background);
    border-left: 1px solid var(--color-border);
    color: var(--color-foreground);
    display: flex;
    flex-direction: column;
    height: 100vh;
    padding: 0 calc(var(--spacing) * 2);
    position: fixed;
    right: 0;
    top: 0;
    transform: translateX(100%);
    transition: transform var(--slide-in-duration) ease, visibility var(--slide-in-duration) allow-discrete;
    visibility: hidden;
    width: var(--assistant-width);
    z-index: 9999;
}
ff-ai-assistant[opened] {
    transform: translateX(0);
    visibility: visible;
}
@starting-style {
    ff-ai-assistant[opened] {
        transform: translateX(100%);
    }
}
ff-ai-assistant button {
    background-color: transparent;
    cursor: pointer;
    font-size: var(--text-base);
    font-weight: var(--font-weight-medium);
    line-height: 1.5;
}
ff-ai-assistant .ffw-assistant-header {
    align-items: center;
    border-bottom: 1px solid var(--color-border);
    display: flex;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-semibold);
    justify-content: space-between;
    padding: calc(var(--spacing) * 3.5) calc(var(--spacing) * 4);
}
ff-ai-assistant .ffw-assistant-header .ffw-assistant-title-container {
    align-items: center;
    display: flex;
    gap: calc(var(--spacing) * 2.5);
}
ff-ai-assistant .ffw-assistant-header .ffw-assistant-icon {
    align-items: center;
    background-color: var(--color-foreground);
    border-radius: 9999px;
    display: flex;
    height: calc(var(--spacing) * 7);
    justify-content: center;
    width: calc(var(--spacing) * 7);
}
ff-ai-assistant .ffw-assistant-header button.ffw-assistant-close {
    border-radius: .25rem;
    color: var(--color-muted-foreground);
    line-height: .5;
    padding: calc(var(--spacing) * 1.5);
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-header button.ffw-assistant-close:hover {
    background-color: var(--color-secondary);
    color: var(--color-foreground);
    transition-duration: var(--default-transition-duration);
}

ff-ai-assistant .ffw-assistant-body {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    overflow-y: auto;
    padding: calc(var(--spacing) * 4);
    scrollbar-width: var(--scrollbar-width);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-text {
    align-self: flex-start;
    border-radius: calc(var(--radius) + 4px);
    font-size: var(--text-sm);
    line-height: var(--leading-relaxed);
    margin-bottom: calc(var(--spacing) * 3);
    max-width: 88%;
    padding: calc(var(--spacing) * 2.5) calc(var(--spacing) * 3.5);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-text.ffw-assistant-from-user {
    align-self: flex-end;
    background-color: var(--color-foreground);
    border-bottom-right-radius: calc(var(--radius) - 4px);
    color: var(--color-background);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-text.ffw-assistant-from-assistant {
    background-color: var(--color-secondary);
    border-bottom-left-radius: calc(var(--radius) - 4px);
}

ff-ai-assistant .ffw-assistant-body .ffw-assistant-loader {
    display: flex;
    gap: calc(var(--spacing) * 1.5);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-loader .ffw-assistant-bouncy-dot {
    background-color: var(--color-muted-foreground);
    width: calc(var(--spacing) * 1.5);
    height: calc(var(--spacing) * 1.5);
    animation: ff-assistant-dotbounce 1.2s ease-in-out infinite;
    border-radius: 100%;
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-loader .ffw-assistant-bouncy-dot:nth-child(2) {
    animation-delay: .2s;
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-loader .ffw-assistant-bouncy-dot:nth-child(3) {
    animation-delay: .4s;
}
@keyframes ff-assistant-dotbounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-5px); }
}

ff-ai-assistant .ffw-assistant-body .ffw-assistant-product {
    font-size: var(--text-xs);
    margin-bottom: calc(var(--spacing) * 3);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product a {
    align-items: center;
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: calc(var(--radius) + 4px);
    color: inherit;
    display: flex;
    gap: calc(var(--spacing) * 3);
    padding: calc(var(--spacing) * 2.5);
    text-decoration: none;
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product a:hover {
    background-color: color-mix(in oklab, var(--color-secondary) 40%, transparent);
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product img {
    background-color: var(--color-white);
    border-radius: var(--radius);
    height: calc(var(--spacing) * 12);
    object-fit: contain;
    vertical-align: middle;
    width: calc(var(--spacing) * 12);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product .ffw-assistant-product-info {
    overflow-x: hidden;
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product .ffw-assistant-brand {
    color: var(--color-muted-foreground);
    font-size: 10px;
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product .ffw-assistant-title {
    font-weight: var(--font-weight-medium);
    line-height: var(--leading-snug);
    overflow-x: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product .ffw-assistant-price {
    font-weight: var(--font-weight-semibold);
    line-height: var(--text-xs--line-height);
    margin-top: calc(var(--spacing) * .5);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-product .ffw-assistant-summary {
    color: var(--color-muted-foreground);
    line-height: var(--leading-relaxed);
    margin-top: var(--spacing);
    padding-inline: var(--spacing);
}

ff-ai-assistant .ffw-assistant-body .ffw-assistant-clarification-block {
    display: flex;
    flex-wrap: wrap;
    gap: calc(var(--spacing) * 1.5);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-clarification-block button {
    background-color: var(--color-background);
    border: 1px solid var(--color-border);
    border-radius: 9999px;
    font-size: var(--text-xs);
    font-weight: var(--font-weight-medium);
    line-height: var(--text-xs--line-height);
    padding: calc(var(--spacing) * 1.5) calc(var(--spacing) * 3);
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-body .ffw-assistant-clarification-block button:hover {
    border-color: color-mix(in oklab, var(--color-foreground) 40%, transparent);
    transition-duration: var(--default-transition-duration);
}

ff-ai-assistant .ffw-assistant-body > :last-child {
    margin-bottom: calc(var(--spacing) * 6);
}

ff-ai-assistant .ffw-assistant-footer {
    align-items: center;
    border-top: 1px solid var(--color-border);
    display: flex;
    flex-direction: column;
    gap: calc(var(--spacing) * 2);
    padding: calc(var(--spacing) * 3);
}
ff-ai-assistant .ffw-assistant-footer form {
    width: 100%;
}
ff-ai-assistant .ffw-assistant-footer fieldset {
    align-items: center;
    display: flex;
    gap: calc(var(--spacing) * 2);
}
ff-ai-assistant .ffw-assistant-footer form input {
    background-color: var(--color-secondary);
    border: 1px solid transparent;
    border-radius: var(--radius);
    flex-grow: 1;
    font-size: var(--text-sm);
    font-weight: var(--font-weight-normal);
    line-height: var(--text-sm--line-height);
    outline-style: none;
    padding: calc(var(--spacing) * 2) calc(var(--spacing) * 3);
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-footer form input:focus {
    border-color: color-mix(in oklab, var(--color-foreground) 30%, transparent);
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-footer form button {
    background-color: var(--color-foreground);
    border-radius: var(--radius);
    color: var(--color-background);
    line-height: .5;
    padding: calc(var(--spacing) * 2);
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-footer form button:not(:disabled):hover {
    background-color: color-mix(in oklab, var(--color-foreground) 80%, transparent);
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-footer form button:disabled {
    cursor: default;
    opacity: .3;
}
ff-ai-assistant .ffw-assistant-footer .ffw-assistant-restart {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--text-xs--line-height);
    margin-top: calc(var(--spacing) * 2);
    padding: var(--spacing);
    text-align: center;
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-footer .ffw-assistant-restart:hover {
    color: var(--color-foreground);
    transition-duration: var(--default-transition-duration);
}

ff-ai-assistant .ffw-assistant-error {
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    font-style: italic;
    margin: calc(var(--spacing) * 6) 0;
    text-align: center;
}
ff-ai-assistant .ffw-assistant-error-restart {
    background-color: var(--color-foreground);
    border-radius: var(--radius);
    color: var(--color-background);
    font-size: var(--text-sm);
    font-weight: var(--font-weight-medium);
    line-height: var(--text-sm--line-height);
    padding: calc(var(--spacing) * 2.5) 0;
    transition-duration: var(--default-transition-duration);
}
ff-ai-assistant .ffw-assistant-error-restart:hover {
    background-color: color-mix(in oklab, var(--color-foreground) 85%, transparent);
    transition-duration: var(--default-transition-duration);
}
```
