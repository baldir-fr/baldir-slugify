# Slugify

An lib and cli to slugify a string.

## As CLI

### Usage

```sh
deno main.js "Somê text with Letters' and spaces?"
```

Will output

```
some-text-with-letters-and-spaces
```

### Compile to self-contained executable

```sh
deno compile main.js
```

## As library

Install pakage from JSR.

```sh
# Deno
deno add jsr:@baldir/slugify
# Npm
npx jsr add @baldir/slugify
# Bun
bunx jsr add @baldir/slugify
```
