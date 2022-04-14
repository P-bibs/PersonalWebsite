---
title: "A simple algorithm for checking exhaustiveness in pattern matching"
excerpt: ""
coverImage: "/blog/exhaustiveness/thumbnail.png"
date: "2021-08-12T05:35:07.322Z"
author:
  name: Paul Biberstein
  picture: "/portrait.jpg"
ogImage:
  url: "/blog/exhaustiveness/thumbnail.png"
released: true
---

Suppose you're working on developing a new language and decide that pattern matching should be one of the core features. Even if you don't invest much time into static checkers for your language, you'll likely want to add exhaustiveness checking to your pattern matching construct to help your users avoid silly mistakes like the following:

```rust
match my_bool {
    true => do_something()
    // Uh-oh, forgot false!
}
```

Static guarantees like exhaustiveness checks are one of the top reasons to use statically-typed languages. However, as type systems grow complicated it's not immediately apparent how to perform these exhaustiveness checks. I ran into this issue when implementing exhaustiveness checks for [Skiff](https://github.com/P-bibs/skiff), and couldn't find any easy to understand resources online. The rest of this post documents the algorithm I decided on in a (hopefully) easy to follow manner. I'll detail the algorithm by showing how you would implement it in a hypothetical language.

## Our language

Our example language will have 3 datatypes: booleans, integers, and user-defined data types.

- Booleans are either `true` or `false`.
- Integers are any whole number (positive, negative, and zero).
- User-defined data types are algebraic data types.

A refresher on algebraic data types (AKA enums in Rust, tagged/discriminated unions in C++, the `data` keyword in Haskell, the `type` keyword in OCaml): algebraic data types describe a set of values that are one out of a set of possible bundles of data. For instance say we wanted a type to express all the transactions we could have with a database, we might state it as follows:

A transaction is one of

- a **create** request, which has an _identifier_ and some _data_
- a **read** request, which has an _identifier_
- an **update** request, which has an _identifier_ and some _data_
- a **delete** request, which has an _identifier_

Assuming the identifiers are `String`s and the data are `Object`s. Then we might write the `Transaction` type as

```ocaml
type Transaction =
  | Create(String, Object)
  | Read(String)
  | Update(String, Object)
  | Delete(String)
```

## What do the patterns look like?

Our patterns can match each of our language's types, or be an identifier that matches all values. Here are some examples:

```rust
match my_int {
  1 => print("Got 1"),
  2 => print("Got 2"),
  10 => print("Got 10"),
  n => print("Got " + n.toString())
}
```

```rust
match my_boolean {
  true => ...,
  false => ...
}
```

```rust
match my_transaction {
  Create("users", data) => print("Creating a user requires authentication"),
  Create(name, data) => createRecord(name, data),
  _ => print("Not a `Create` request")
}
```

## The algorithm

Now let's dive into the algorithm. We'll use Typescript as an implementation language, but you can find a Rust implementation in the Skiff repo. We'll start by laying out the scaffolding for an `isExhaustive` function. The function takes the type of the value we're matching against and a list of patterns. We're going to implement different logic based on what our `targetType` is, so we set up a big `if...else` statement. Here's the initial code:

Types:

```ts
type Type = "integer" | "boolean" | "user_type";
type Pattern =
  | { kind: "integer"; value: number }
  | { kind: "boolean"; value: boolean }
  | { kind: "user_type"; subPatterns: Pattern[] }
  | { kind: "identifier" };
```

Function:

```ts
function isExhaustive(targetType: Type, patterns: Pattern[]) {
  if (target_type == "boolean") {
    ...
  } else if (target_type === "integer") {
    ...
  } else if (target_type === "user_type") {
    ...
  }
}
```

We start with a key realization: since identifiers act as wildcards and match any value, if any of the patterns in the match arms are identifiers then the match is exhaustive. This lets us add the following before the conditional:

```ts
function isExhaustive(targetType: Type, patterns: Pattern[]) {
  // If any pattern is an identifer, the match is exhaustive
  if (patterns.some(pattern => pattern.kind === "identifier")) {
    return true;
  }
  ...
}
```

### Easy cases: integers and booleans

Let's get the easy part of exhaustiveness checking first: booleans and numbers. Booleans are easy: the only way for the match to be exhaustive is if we have patterns that match both `true` and `false`.

```ts
  ...
  if (target_type == "boolean") {
    return (
      patterns.some(pattern => pattern.kind === "boolean" && pattern.value === true) &&
      patterns.some(pattern => pattern.kind === "boolean" && pattern.value === false)
    )
  }
  ...
```

Now for the `integer` case. Just like booleans, the match is only exhaustive if a pattern exists for every integer. However, since our language has no limit on integer size, this will never be the case. Therefore, the only case in which an integer match is exhaustive is if one of the patterns is an identifier. Since we catch that in the initial check, if we make it to `target_type == "integer"` then the match must be non-exhaustive.

```ts
  ...
  if (target_type === "integer") {
    return false;
  }
  ...
```

### More complicated: user types

TODO:

```ts
  ...
  if (target_type === "user_type") {
    for (const variant in user_types[target_type.variant]) {
      const variant_patterns = patterns.filter(pattern => pattern.kind === "user_type" && pattern.variant === variant.name);
      for (const variantItem in variant.items) {

      }
    }
  }
  ...
```

## Going further

Beyond just returning a boolean yes/no answer to the question "is this pattern match exhaustive?", you may want to give the user extra information. Some examples include

- dead patterns that will never be matched
- in the case when the match isn't exhaustive, a counterexample value that doesn't match any of the patterns
