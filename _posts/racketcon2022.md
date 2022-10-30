---
title: "RacketCon"
excerpt: 'I attended RacketCon 2022 at Brown University from October 29th to 30th. Here are my notes from the talks!'
coverImage: "/blog/racketcon2022/cover.png"
date: "2022-10-30T05:35:07.322Z"
author:
  name: Paul Biberstein
  picture: "/portrait.jpg"
ogImage:
  url: "/blog/racketcon2022/cover.png"
released: true
---
I attended [RacketCon 2022](https://con.racket-lang.org/) at Brown University from October 29th to 30th. Here are my notes from the talks!

## The final tier is Shed: Inside the Wizard Engine’s fast in-place interpreter for WebAssembly

**Ben Titzer** (CMU)

_Ben Titzer co-founded the WebAssembly project and was a leader of the team at Google in charge of implementing WASM in V8._

While WASM was being designed, optimizing for interpreters was specifically ignored, since it was assumed that all browser implementations would use compilation. It turned out interpreters were needed anyway for a variety of reasons:

- Debugging
- Instrumentation
- Faster startup time
- Lower memory footprint
  - Most compilers at least duplicate the code thats downloaded, if not triple or quadruple it (via optimizations/translations).
  - You can't delete the originally downloaded code because you need it for debugging.
  - Memory footprint is especially important on mobile

Certain WASM design decisions are particularly hard for interpreters, for example, explicit control flow in bytecode:

```
(loop $my_loop
  ...
  br $my_loop
  ...
)
```

The `br` instruction (which is short for `break`) causes execution to break out of the current loop. However, there is no offset or label that says how far ahead the end of the loop is, it's assumed that the code will be running in a compiler that can easily figure this out with a first pass and compile to a representation with explicit jumps. In the worst case, an interpreter has to linearly scan through many bytecode instructions it doesn't need to execute just to find the end of the block, which thoroughly degrades performance.

The trick to get around this is what this talk is all about. The solution is a _side table_, which encodes information about every instruction in the program that affects control flow. For each of these instructions, a table entry is added that indicates how far ahead to jump. For example:

| instruction address | instruction type | jump distance |
| ------------------- | ---------------- | ------------- |
| +56                 | `if`             | 22            |
| +75                 | `br`             | 20            |

There's a few optimizations we can make. First, tracking the instruction type is unnecessary. Second, we don't need to track the instruction addresses, since they are in the order the program will execute.

There's one problem: once we take a jump, how do we know which table entry is next. To fix this, we keep another table column that says how many side-table entries to skip over when we take a jump.

| jump distance | side-table skip ahead |
| ------------- | --------------------- |
| 22            | 2                     |
| 20            | 1                     |

### Implementation Notes

To test this, Ben initially implemented a WASM interpreter in [Virgil](https://github.com/titzer/virgil). Unfortunately, this was prohibitively slow since Virgil doesn't take advantage of all possible optimizations (for example, it's hard to have un-boxed values). To get around this, he reimplemented in x86_64 (!!!)

This enabled a few tricks. First, webassembly values are up to 16 bytes. Since we need to add extra room for value tags, we round up to 32 bytes. This sounds like a lot but is ok. The stack is now a series of 32 byte values, either references or integers/floats. These values are unboxed (not stored on the heap via indirection) which speeds things up.

Why do we need value tags? We never need to tell the difference between a float and an integer: WASM instructions are type-specific so well-formed code will have no type errors. It's references that are the problem: we need to know which values are references to objects (e.g. from JavaScript) so we can play nice with the garbage collector for those objects. If we can settle for conservative garbage collection, we can get rid of the tag and get a 5% performance gain.

For dispatching on bytecode instructions, we use a very old technique called _threaded dispatch_.

Even after all this, speeds don't beat wasm3 (another interpreter), but memory overhead is less

In fact, memory overhead is less than every other WASM runtime. We basically just execute the code we download in-place, except for the side-table which is ~30% overhead.

For more, [see the paper](https://arxiv.org/abs/2205.01183)

## Metaprograms and Proofs: Macros in Lean 4

**Sebastian Ulrick** (KIT)

Lean 4 now has macros! In fact, much of the syntax of Lean is a macro. The user can write macros with a range of tools (which have a tradeoff between simplicity and power) to add their own syntax. At the base level, macros are elaboration on a core language that all code is converted to (s-expressions!).

People have done some crazy stuff with this:

- [Lean4 maze](https://github.com/dwrensha/lean4-maze) for encoding ascii-art mazes in source code
- HTML in Lean source code.
- A documentation generator for Lean code built in Lean.

While Lean's macro system draws inspiration from Racket (and Rust), it is noticeably different. While Racket emphasizes minimalism (even after adding macros), Lean attempts to give you control to make whatever syntax you want, with the goal being that Mathematicians can make syntax they feel comfortable writing their proofs in.

## Shallow and Optional Types

**Ben Greenman** (Brown)

`racket/typed` has two new languages: shallow and optional!

For clarity, we will refer to `racket/typed` as `deep` to contrast with the new languages.

The type system is entirely the same before, the only differences are what happens at the boundaries of typed code (when interacting with untyped code). When `deep` interacts with untype code, it checks the types of values fully. For example, a `List<Number>` is checked to be a list and then every element is checked to be a number, which can take a long time. The new lang `shallow` fixes this by only checking types shallowly, and then adding further checks on access. For example, `List<Number>` is only checked to be a `List` of something at first, but when the first element is accessed we check to make sure it's a number.

The other new lang, `optional`, performs static type checking as well as full dynamic checks during runtime, with the tradeoff that then no function-argument typechecks need to occur.

The original language, `deep`, has the advantage of giving you blame on where type violations occur because it can trace values back through the call stack.

One of the hardest parts was getting the languages to be able to call into each other in harmony, and you can [read the PLDI paper about it](https://dl.acm.org/doi/abs/10.1145/3519939.3523430).

One optimization we can make in `shallow` is that certain functions don't require checks. For example, getting the `rest` of a `List<Number>` does not require checks if we have already checked that the value is at least of type `List`.

This could bring big performance gains to existing libraries, for instance [racket math](https://github.com/racket/math/issues/75).

## Resyntax: A Macro-Powered Refactoring Tool

**Jack Firth** (Google)

Many languages have great linters (like `clippy` in Rust) that help beginners code better. Unfortunately, Racket doesn't!

Making a tool like this is hard in Racket because macros can make code that looks benign harmful and vice versa.

The new tool, ReSyntax, is a macro-aware linter that helps you write better Racket code, for instance by suggesting the following change

```
(if (number? x) #t #f)
```

```
(number? x)
```

The user can write rewrite rules (using macros) that specify a pattern to match and then suggest a rewrite (also offering an explanation for why the rewrite is better). Some other example rules given help remind users about deprecated functions or new functions that might simplify code.

This is available as a Github action! It is also potentially being added to the Typed Racket and Scribble repositories.

## What Can Beginners Learn from Video Games?

**Marco Morazan** (Seton Hall)

HtDP is great, but there are some rough edges:

- hard transition to non-prescriptive uses of the design recipe (for example, generative recursion).
- too fast/dense for some students

New books _Animated Problem Solving_ and _Animated Program Design_ are for semesters 1 and 2 of an intro CS class.

Marco went through a brief overview of the books and some changes from HtDP:
- spreads material out more than HtDP
- second semester covers complicated things like recursion, distributed programming and property based testing
- teach them about interfaces by giving them a template that has matches against different symbols (like let-over-lambda) then have them fill it out

Hardest part about teaching this is mutation, which is next year's talk.

## Design Recipe Guided Synthesis with Bingus

**Hazel Levine** (Indiana)

HtDP is a "book that exists"
"we use it in cs211, which people take and usually like"

A reminder about the steps of the Design Recipe:
1. data definition
2. signature, purpose
3. unit tests/examples
4. template
5. function definition
6. tests

Bingus is a program synthesizer that takes 1-3 as input and produces 4-6 as output. It draws inspiration from the [Myth program synthesizer](https://www.cis.upenn.edu/~stevez/papers/OZ15.pdf). However, there are some key differences that make Bingus new (non-inductive data, constants, function signatures, and many primitives).

Hazel is still trying to figure out applications:
- as an autograder?: delete part of student code and see if it can be resynethsized
- maybe determining inconsistent unit tests?

Right now, it can synthesize basic list and tree functions like `length`, `depth`, `product`, etc. **Good example test cases are important if you want the output program to be correct.**


## VISr: Visual and Interactive Syntax

**Leif Anderson** (Northeastern)

* Writing code like red black trees is hard because you cant embed example images in your program.
* Wisual languages are good, but look at [blueprintsfromhell.com](https://blueprintsfromhell.tumblr.com/)
* DrRacket can embed images in code, but then you can't use other editors

To solve these problems, Leif made _elIDE_, an IDE that uses visual and interactive syntax to aid programming.

Inside elIDE, you can write special macros that are much like normal Racket macros; they have a pattern that they match to trigger the macro, and an output piece of syntax that gets produced. However, they also have state associated with them and HTML code that says how to display them. This means that code in your editor can be buttons or LaTeX or red-black trees.

These macros degrade gracefully when not in elIDE, so if you view them in a normal editor they are fairly readable and editable

Check out
* [visr.pl](https://visr.pl/) for demo
* [blog.visr.pl](https://blog.visr.pl/) for blog

## Forge: Building a Pedagogic Solver Tool in Racket

**Tim Nelson** (Brown)

Alloy is a constraints based, model-checking language that lets you model systems and assert properties about them. It's relatively automated: users write properties and predicates.It's not a theorem prover.

There are two problems with Alloy:
1. Alloy has a visualizer, but its good if you aren't visualizing a system that corresponds closely with a directed graph
2. Many concepts map pretty cloesly to object-oriented programming, but not quite. For example, relational join looks a lot like field access on an object.

Forge was created to fix these problems. The syntax looks very similar to Alloy, but it's implemented as a Racket #lang and it solves the two problems above:
1. Users can write alternate visualizers for their systems in Javascript.
2. There is a Forge Beginner Student Language that makes everything look a lot like OO and eliminates scary error messages that talk about relations. This lets the professor control when students have the realization that everything is just a relation.

## Stacker: A runnable notional machine for an HtDP-like language

**Kuang-Chen Lu** (Brown)

Stacker is a visualized abstract machine for SMoL (the standard model of languages). It lets students visualize the execution of a program and see environment frames, mutation, closures, and more. If students want to step through the execution of their program, they just slightly modify the `#lang` line and when they hit run the stacker window appears.

Used in PL class at Brown with 2 kinds of assignments:
* given an image of the stacker, say what value the program will evaluate to
* given an image of the stacker, write the program that would produce that configuration

## Examplar: Making Hay from Wheat

**Siddhartha Prasad** (Brown)

Common problem: students read a problem spec, think they understand the problem, go to implement it, and then fail the tests NOT becaues their code is wrong but because they solved the wrong problem. How can we check their understanding before they start coding?

Solution: have a set of known good implementations and let students write tests and run them against the implementations. If the student's understanding is wrong, presumably the tests will fail.

Not so fast: alternatively, maybe the tests don't fail because the student's tests don't exercise very many corner cases of the problem. The above solution lets us check the validity of their tests, but how can we check the thoroughness?

Second solution: have a set of known **bad** implementations and run student tests against them. The student tests should fail on these bad implementations. We let the student know how many bad implementations they have caught so they get a sense of how thorough their tests are (how many misconceptions they have avoided).

Next problem: these bad implementations are best if they represent common misconceptions, but how do we know what the common misconceptions are?

Next solution: there are two possibilities—we could either ask professors to come up with common misconceptions or look at past tests submitted by students. They did both and found that the professors were very bad at predicting the misconceptions, so crowdsourcing data is far superior. Now that we know which misconceptions students have, if their tests fail the good implementations and pass a specific bad implementation, we can warn them that they might be having that specific misconception and remind them of the problem specification.

