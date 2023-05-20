{% extends "_includes/homepage.njk" %}

{% block about_me %}
I'm an incoming computer science Ph.D student at the University of Pennsylvania. My primary interests include programming languages, computer graphics, and computer architecture, and how we can combine the three to build new programming systems that enable users to write high-performance software.
{% endblock %}

{% block past %}
Before starting my Ph.D, I was an undergraduate at Brown University where I worked with professors Shriram Krishnamurthi and Daniel Ritchie. TAing was also an important part of my time at Brown: I TAed classes including programming languages, intro systems, and computer graphics.

I've also spent two summers as a software engineer:
* I worked on networking at [Jump Trading](https://www.jumptrading.com/), a quantitative trading firm in Chicago
* I helped build a tool for music information retrieval at [MedRhythms](https://medrhythms.com/), a digital therapeutics startup based in Portland, Maine.
{% endblock %}

{% block projects %}

{% endblock %}

{% block research %}
While at Brown, I was involved in a variety of research efforts:
* As part of the [Brown Visual Computing Lab](https://visual.cs.brown.edu/), I worked under professor [Daniel Ritchie](https://dritchie.github.io/) on finding novel methods for deep-learning based 3D  shape synthesis. Our specific focus was using transformer architectures to synthesize new shapes that combined components of input shapes, such as wheels of cars or wings of airplanes.
* Working with [Shriram Krishnamurthi](https://cs.brown.edu/~sk/) and two other undergraduates, I developed extensions to the [CODAP data analysis platform](https://codap.concord.org/) that added support for higher-order-functions and relational operations like join. These extensions allowed the [Bootstrap Data Science](https://www.bootstrapworld.org/materials/data-science/) curriculum to be taught in middle and high schools without dedicated computing faculty.
{% endblock %}
