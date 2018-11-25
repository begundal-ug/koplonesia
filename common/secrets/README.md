# Koplonesia secrets db

This package exports a collection of secrets that used throughout the repo, so other services only need to use this package instead of managing secrets themselves.

a secret should be defined as follows:

```js
<provider>: {
  client: <clientInstance>,
  auth: <raw client auth>,
}
```

## TODO

- separate secrets to an external file, so we don't expose them to public github.
