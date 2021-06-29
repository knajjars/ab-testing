
## A/B Testing

  

JavaScript module that allows to run **A/B tests for HTML content.**

  

> It was designed with **simplicity** in mind

  

### How it works

The variants are analyzed when the HTML loads, one will be selected randomly and used for the user session (relies on [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage)), if the is a new session, a variant will be selected randomly again.
  

1. Import `mountAbTesting` from the `ab_testing` module and invoke it when the **JavaScript** loads.

```javascript

import { mountAbTesting } from  "ab_testing"

mountAbTesting()

```

### This will:
* `Register` a page view if it is a new session
* `Analyze` all variants in the document by selecting all elements with the data-variant attrbiute.
* It will `hide` them all
* Register all `track events` for the metrics configured (for example: signup click)
* `Select a random` variant, either control or test
* `Assign the variant` for the session, so the variant is persisted on page reloads or redirects, although if the window is closed the session expires.
* `Display` the randomly selected variant

---


Now in the **HTML** we can use the `data attribute` on the elements to identify variants, it works as follows:

  

1. The type of variant is assigned with the data-variant attribute, available options are: `control` and `test`

```html

<p data-variant="control">Some text</p>
<p data-variant="test">Other text</p>

```

2. To register an event on a user action like `click` or `mouseover`. You simply need to add a data attribute and set the value to which action you want to track

```html

<button data-track="click">A button</button>
<p data-track="mourseover">Hover me!</p>

```
  3. Lastly, to understand what metric is being tracked you need to add the `data-metric` attribute to the element. This will also help collect more precise data by not tracking the same action more than once when performed in the same session.

```html
<a href="/signup" data-metric="signup">Sign up!</a>
<a href="/learn-more" data-metric="learn_more">Learn more!</a>
```
  

### With all data attributes it may look something like this

  

\# index.html

```html

<button data-variant="control" data-track="click" data-metric="about" class="control-button">
	Learn about us
<button>

  
<button data-variant="test" data-track="click" data-metric="about" class="test-button">
	Want to know more about us?
<button>

```