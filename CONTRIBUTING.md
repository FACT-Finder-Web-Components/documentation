## Ways to contribute

## 1 - Creating an issue

We welcome you to [create an issue](https://github.com/FACT-Finder-Web-Components/documentation/issues/new)
anytime for the following reasons:

**Feature request:**
The documentation is missing information about a certain feature or
the given explanation/description is confusing.

If this is the case you should provide a link to the relevant page and/or
describe the information you would expect to find.

**Error:**
You found an inconsistency or error in the content of the documentation.

In this case you should definitely provide a link to the page containing
the error as well as a link to or short description of the correct information
or ways of obtaining the correct information.

**Unexpected Behavior:**
The app itself is behaving in an unexpected manner.
Instances of this might be anything from a broken link to the app crashing
on your machine.

In this case make sure to _use our template_ for reporting possible bugs.

## 2 - Making changes

This is the preferred way of contributing since it reduces bureaucracy
and is therefore the fastest way of getting the change to go live so
other people can enjoy a better documentation.

Our documentation is `markdown` based. This means you don't have to be
able to code to make changes. You can even do it _in your browser_.

#### Which files to edit?

The directory `markdown/en/` contains all files that make up the content
of the documentation itself. These files get rendered into different
pages/tabs on the documentation page.

`markdown/en/*.md` - content of the _documentation_ tabs for the pages
that are listed in the side-bar at https://web-components.fact-finder.de/api/

`markdown/en/api/*.api.md` - same as the above but for the _API_ tabs.

`markdown/en/documentation/*.md`  - content of the pages at
https://web-components.fact-finder.de/documentation/

To find the filename you look at the URL.
E.g. `https://web-components.fact-finder.de/documentation/install-dist`
-> `markdown/en/documentation/install-dist.md`


#### Submitting your changes

You will need to:
- Create a _fork_
- Make your changes
- Create a pull request

If your changes are minor you can do all of the above within github by
clicking the pen icon in the top of a file on github. When you do that
a fork will be automatically created and when you're done you will be able
to create a pull request just as easily.

##### Pull Requests

A Pull request needs to reference the issue it is fixing using the
syntax: `fixes #issueNumber`. This way the issue will be closed when the
pull request is merged. If there is no issue describing the situation you
could either create one or just _describe_ your changes.

##### Describing your changes

_What_ did you change? Summarise the changes so the reviewer knows what
he is looking for.

E.g. "Fixed some typos"

If your changes are inconsequential to the function of the app itself
then a short description will suffice. However if you made technical
changes you should also elaborate on _why_ you made these changes so the
reviewer understands your rationale.

