---
title: "What is React?"
excerpt: ""
coverImage: "/blog/reading-urls/url-diagram.png"
date: "2021-05-24T05:35:07.322Z"
author:
  name: Paul Biberstein
  picture: "/portrait.jpg"
ogImage:
  url: "/blog/reading-urls/url-diagram.png"
released: false
---

As a would-be web developer, you're often told to start your journey by learning Javascript. After making some basic websites, you might want to take on a more ambitious project. After scouring forums, blog posts, and your friend's Github, you determine that you _have_ to use React. There's only one problem:

What exactly **is** React?

## React solves a problem you've already had

Suppose you've made a really cool card layout like this one:

<p class="codepen" data-height="535" data-theme-id="light" data-default-tab="html,result" data-user="p-bibs" data-slug-hash="OJpyGNy" style="height: 535px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="WhatIsReact_1">
  <span>See the Pen <a href="https://codepen.io/p-bibs/pen/OJpyGNy">
  WhatIsReact_1</a> by Paul Biberstein (<a href="https://codepen.io/p-bibs">@p-bibs</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

You're proud of your design genius, but your software engineering senses are tingling: why not package this card up into a reusable piece of code so you can make cards with whatever content you want?

We can take advantage of Javascript to make a function that takes in a card title and body and adds it to the HTML document.

<p class="codepen" data-height="498" data-theme-id="light" data-default-tab="js,result" data-user="p-bibs" data-slug-hash="poejBpp" style="height: 498px; box-sizing: border-box; display: flex; align-items: center; justify-content: center; border: 2px solid; margin: 1em 0; padding: 1em;" data-pen-title="WhatIsReact_2">
  <span>See the Pen <a href="https://codepen.io/p-bibs/pen/poejBpp">
  WhatIsReact_2</a> by Paul Biberstein (<a href="https://codepen.io/p-bibs">@p-bibs</a>)
  on <a href="https://codepen.io">CodePen</a>.</span>
</p>
<script async src="https://cpwebassets.codepen.io/assets/embed/ei.js"></script>

However, you'll quickly find that this doesn't scale well. This is mostly to do with the fact that making HTML in Javascript leaves much to be desired. This may lead you to thinking the following: why can't I just write Javscript that has little bits of HTML in it. For instance, we could change the Javascript in the previous example to be:

```jsx
function makeCard(title, content) {
  return (
    <div class="card">
      <h2 class="card-title">title</h2>
      <div class="card-content">content</div>
    </div>
  );
}

for (let i = 0; i < 4; i++) {
  document.body.appendChild(
    makeCard("Card " + i, "This is the content of card number " + i + "!")
  );
}
```

Well, it turns out HTML in Javascript isn't quite enough. We also need Javascript in HTML so we can include the `title` and `content` arguments in the HTML for the card. Maybe we introduce a special convention for including javascript values in our HTML. For instance, we could surround the Javascript values in {curly braces}.

```jsx
function makeCard(title, content) {
  return (
    <div class="card">
      <h2 class="card-title">{title}</h2>
      <div class="card-content">{content}</div>
    </div>
  );
}

for (let i = 0; i < 4; i++) {
  document.body.appendChild(
    makeCard("Card " + i, "This is the content of card number " + i + "!")
  );
}
```
