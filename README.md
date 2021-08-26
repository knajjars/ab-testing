
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
* `Select a random` variant based on the weight (default to 50/50) `per test group`, either control or test
* `Assign the variant` for the session, so the variant is persisted on page reloads or redirects, although if the window is closed the session expires.
* `Display` the randomly selected variant

---


Now in the **HTML** we can use the `data attribute` on the elements to identify variants, it works as follows:

  

1. The `test` attribute is used to group the test-cases that you want to run A/B testing on. Every test group will run independantly from the others, set it by utilizing the `data-test` attribute.

```html

<p data-test="flat-design">Some text</p>
<p data-test="retro-design">Other text</p>

<button data-test="flat-design">Some button</button>
<button data-test="retro-design">Another button</button>

```

2. The type of variant is assigned with the data-variant attribute, available options are: `control` and `test`

```html

<p data-variant="control">Some text</p>
<p data-variant="test">Other text</p>

```

3. To register an event on a user action like `click` or `mouseover`. You simply need to add a data attribute and set the value to which action you want to track

```html

<button data-track="click">A button</button>
<p data-track="mourseover">Hover me!</p>

```
4. To understand what metric is being tracked you need to add the `data-metric` attribute to the element. This will also help collect more precise data by not tracking the same action more than once when performed in the same session.

```html
<a href="/signup" data-metric="signup">Sign up!</a>
<a href="/learn-more" data-metric="learn_more">Learn more!</a>
```
  
5. Lastly, you can set the weight of the control variant with `data-weight`, this is based on a scale from 0-100. It is a helpful attribute especially for those cases that you consider the test variant could be a bit risky to display for 50% of the visits. 
**Note:** the weight can only be applied to the control variant and the test variant will be remaining value to reach 100.

```html
<button data-variant="control" data-weight="60">A button</button>
```

### With all data attributes it may look something like this

  

\# index.html

```html

<button data-test="original-design" data-variant="control" data-weight="70" data-track="click" data-metric="about" class="control-button">
	Learn about us
<button>

  
<button data-test="original-design" data-variant="test" data-track="click" data-metric="about" class="test-button">
	Want to know more about us?
<button>

```

In the example above we are testing a button inside the `test case` original-design. For these buttons 70% of the visits will see the control variant because the `weight` was set to 70. Also it will `track click` events for the metric `about`.