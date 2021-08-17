---
title: "A simple algorithm for pattern matching exhaustiveness checking"
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

## Our language

Our example language will have 3 datatypes: booleans, integers, and user defined data types.

- Booleans are either `true` or `false`.
- Integers are any whole number (positive, negative, and zero).
- User defined data types are algebraic data types.

A refresher on algebraic data types (AKA enums in Rust, tagged/discriminated unions in C++, the `data` keyword in Haskell, the `type` keyword in OCaml): algebraic data types describe a set of values that are one out of a set of possible bundles of types. For instance say we wanted a type to express all the transactions we could have with a database, we might state it as follows:

A transaction is one of

- a **create** request, which has an _identifier_ and some _data_
- a **read** request, which has an _identifier_
- an **update** request, which has an _identifier_ and some _data_
- a **delete** request, which has an _identifier_

Assuming the identifiers are `String`s and the data are `Object`s. Then we might write the `Transaction` type as

```ocaml
type Transaction = {
  Create(String, Object),
  Read(String),
  Update(String, Object),
  Delete(String),
}
```
