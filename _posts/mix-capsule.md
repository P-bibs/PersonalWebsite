---
title: "Mix Capsule: auto-generated time capsule playlists of your top songs each month on Spotify"
excerpt: 'When I started college, I got the advice from a good friend to make CDs of all the songs I listened to each semester so I could listen to them years down the line and be transported back. It was a great idea (after I decided to exchange "CDs" for "playlists"), but I had a hard time remembering to keep track of songs as my tastes changed, and I quickly started finding holes in my self-recorded music history. To solve that problem, I created Mix Capsule.'
coverImage: "/blog/mix-capsule/OptimizedMixCapsuleGif.gif"
date: "2020-08-18T05:35:07.322Z"
author:
  name: Paul Biberstein
  picture: "/portrait.jpg"
ogImage:
  url: "/blog/mix-capsule/OptimizedMixCapsuleGif.gif"
---

[See the website](https://mixcapsule.paulbiberstein.me/)

_This is my first dev.to post, please help me out by leaving feedback in the comments!_

I just finished the first version of a website idea I've had for a while. Rather than explain too much, I'll quote from the website itself:

> When I started college, I got the advice from a good friend to make CDs of all the songs I listened to each semester so I could listen to them years down the line and be transported back. It was a great idea (after I decided to exchange "CDs" for "playlists"), but I had a hard time remembering to keep track of songs as my tastes changed, and I quickly started finding holes in my self-recorded music history. To solve that problem, I created Mix Capsule.

> Once you log in with Spotify, **Mix Capsule will deposit a playlist in your library every month containing your most listened to songs for that month**. Now, whenever you want to kick back and listen to music that reminds you of the past, flip through your Mix Capsule playlists and see what you were listening to 1 month, 6 months, or even a year ago.

Mix Capsule is the first full-stack application I've built start to finish, and in this post, I'm going to walk through the development process and touch on some of the technologies used and decisions I made.

![Alt Text](https://paulbiberstein.me/screens/MixCapsuleScreen1.png)

<figcaption>The Mix Capsule landing page.</figcaption>

## Table of Contents

- [Planning: establishing a minimum viable product (MVP)](#planning-establishing-a-minimum-viable-product-mvp)
- [The meat and potatoes: React and Django](#the-meat-and-potatoes-react-and-django)
- [First-party vs third party log-in](#first-party-vs-third-party-log-in)
- [The newest programming holy war: semantic CSS vs. utility-first CSS](#the-newest-programming-holy-war-semantic-css-vs-utility-first-css)
- [Interacting with users: live-chat](#interacting-with-users-live-chat)
- [See the code](#see-the-code)
- [Testing the product](#testing-the-product)

# Planning: establishing a minimum viable product (MVP)

To prevent my todo list from ballooning with pipe-dream features, I made sure to set aside time early-on to establish a vision of what a complete product would look like. This included

- Ability to **create an account** and log in
- Ability to **authenticate with Spotify**
- Ability to **customize some basic settings** (eg: number of songs in playlist)
- Automatic **playlist creation run every month** for every user
- Ability to **manually trigger playlist creation**.

Defining my minimum viable product allowed me to reach today, where I can have the wonderful closure of saying "I'm done" while still knowing I can go back and add more features if I so desire.

# The meat and potatoes: React and Django

Unless you plan on reinventing the wheel, the first decision to make when starting a new full-stack project is a frontend and backend framework. Knowing that I wanted to use this project as a learning opportunity, while still not starting from scratch knowledge-wise, I went with a familiar tool for the frontend and an unfamiliar tool for the backend.

- The frontend uses **React**, the ubiquitous javascript framework by Facebook. For CSS, I used **Tailwind** CSS, a utility-first CSS framework (more on that later).
- The backend uses **Django**, a battle-tested python web framework. Atop Django sits **Django Rest Framework**, which allowed me to replace Django's server-side rendered forms (similar to PHP) with API views that the React app queried.

![Logo Cloud](https://dev-to-uploads.s3.amazonaws.com/i/myvn4izwwcvn6mr1ilph.png)

<figcaption>Do popular frameworks have cool logos or does having a cool logo make you a popular framework? Hmm...</figcaption>

# First-party vs third party log-in

A common pattern on modern websites is logging in with a third-party service that the user likely already has an account with rather than having the user create a new username and password for your website. This has benefits for the user and the developer:

- The user doesn't have to remember a new set of credentials.
- The developer doesn't have to worry about rigorous password security like salting and hashing.
- The user doesn't have to have trust in the developer's security practices.

Most modern third-party login services (eg: Google, Facebook, Github) work in approximately the following way:

1.  User presses a button on your site which redirects the to third party site
1.  The user is shown a list of permissions they are granting to your service and asked to confirm or deny
1.  If they confirm, they are redirected back to your website with a special code
1.  The code is a cryptographically secure (ie: encrypted with the third-party's private key) guarantee of the user's identity, which you can then send to your backend to initiate a login session for that user

For further reference, see [OAuth2.0](https://oauth.net/2/)

For Mix Capsule, I knew I didn't want to force users to have to trust me with their passwords, so I opted for third-party log in with Google, the service I assumed the most users would have access to.

![Third party log in buttons](https://dev-to-uploads.s3.amazonaws.com/i/cze9y4lw9grdpuc4x0c6.png)

<figcaption>Common stylings for third-party log in buttons. I ended up ditching Google and using Spotify alone.</figcaption>

In my mind, this created a clean separation: I could authenticate the user with Google to establish their identity and then use that to access relevant details in the database, like their Spotify authentication key and their Mix Capsule configuration options. However, I quickly found that this made little sense: why have the user log in with Spotify and then also authenticate with Google? In the end, I ditched the Google login and opted for Spotify only.

This was one of the better choices I made, as it allowed me to delete a large portion of the codebase on the frontend and backend. This was a boon for eliminating bugs and lowering maintenance times because, as any programmer eventually finds out, [no code is the best code](http://www.skrenta.com/2007/05/code_is_our_enemy.html).

![Command line interface for Mix Capsule](https://dev-to-uploads.s3.amazonaws.com/i/vcby3dcd9md4ebyc3vy7.png)

<figcaption>Before there was a web interface to authenticate with, Mix Capsule was a simple bash script I wrote (but I could never remember to run it monthly).</figcaption>

# The newest programming holy war: semantic CSS vs. utility-first CSS

Vi vs. Emacs, tabs vs. spaces, OOP vs. functional programming—some debates are as old as programming itself and show no sign of stopping anytime soon. In recent years, a new one has emerged: semantic CSS vs. utility-first CSS. There have already been some [great writeups](https://frontstuff.io/in-defense-of-utility-first-css) on [the topic](https://css-tricks.com/growing-popularity-atomic-css/) so I'll just give an overview.

**Semantic CSS** is the canonical way to write CSS. You write your markup in HTML using the correct tags and with descriptive class names, then you open up a `.css` file and give styles to those class names. This way, you get separation of concerns between content and styling (as famously demonstrated by [CSS Zen Garden](http://www.csszengarden.com/)) and can compose class names and reuse them to avoid duplicate styles.

However, this often breaks down in practice. For one, style sheets tend to grow so big that searching through them to find a pre-existing class name that suits your needs ends up being slower than making a new class name with duplicated styles. Second, it's easy to be lazy when coming up with class names (after all, naming things is one of only [two hard things in programming](https://martinfowler.com/bliki/TwoHardThings.html)) and write class names which don't generalize well and remove the separation of concerns.

Enter **Utility-first CSS**. Rather than keep up a facade of "separation of concerns," we dive right in and use single-function class names directly on elements. You can see an example below.

![Example Tailwind styling](https://dev-to-uploads.s3.amazonaws.com/i/acb2o6yt5g2bshpqa5ot.png)

<figcaption>An example of utility-first CSS. We compose many single-function classes. `w-full`=full width, `h-24`=height 24, `mx-12`=margin across 12, `mt-4`=margin top 4, `p-12`=padding 12, etc.</figcaption>

Development is significantly sped up because you don't have to reference external style sheets and come up with class names, and designs are standardized since you're limited to a designated set of spacings and palettes.

I found both the quality and consistency of my styles increased substantially once I began using Tailwind. Their pre-defined styles helped illuminate gaps in my knowledge of CSS. There were certain utilities I reached for that I was accustomed to using that weren't exposed as class names. Upon further inspection, I realized the way I was used to doing things was wrong and there was a simpler, proper way that **was** exposed as a Tailwind class.

Beyond that, the un-opinionated nature of Tailwind gives it an advantage over frameworks like [Bootstrap](https://getbootstrap.com/) which force generic stylings for important components like buttons. By composing Tailwind styles to make your own buttons that match your site's branding, you can take your design to the next level.

![Home page transition](https://dev-to-uploads.s3.amazonaws.com/i/cnlxdk4tltd8irxn6etw.png)

<figcaption>The transition from an early version of the home page using vanilla CSS to the first draft using Tailwind,</figcaption>

# Interacting with users: live-chat

Like many technically minded folk, I often make the blunder of thinking entirely about the technical side of a project and entirely forgetting the most important part: the user. The best thing you can do to remedy this is make sure you're connected to your users for feedback. While peering over the shoulder of everyone who uses your website might be one way to do this, it doesn't exactly scale. That's why for Mix Capsule, I added live chat with [Drift](https://www.drift.com/)

![Live chat with Drift](https://dev-to-uploads.s3.amazonaws.com/i/5zwgxgotwlx5s9ojcng4.png)

<figcaption>Live chat lets you get feedback from your users in real-time (hopefully that's a good thing).</figcaption>

When used properly, live chat lets you have conversations with users of your site who have problems or feedback. Since I didn't want to have to be available 24/7, I sent my live chat up with an away response that gathers user responses. This at least lets me gather feedback and respond to it in the aggregate if I receive the same feedback many times.

# See the code

The Mix Capsule repository was initially private since I didn't have a good way to store my API keys, but ever since I moved to `.env` files it is fully open-source!

[Github repository](https://github.com/P-bibs/MixCapsule)

# Testing the product

My most recent Mix Capsule is [here](https://open.spotify.com/playlist/1CzyDE8KHKqUIYyCNoQJkx?si=Irlh3pNDS5Sm6gRm5cQ1cg). Once you generate your [first Mix Capsule playlist](https://mixcapsule.paulbiberstein.me), feel free to share them in the comments!
