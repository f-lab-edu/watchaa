# @movii/prettier-config

Shared Prettier configuration for Movii projects.

## Usage

Install the package:

```bash
pnpm add -D @movii/prettier-config
```

Reference it in your `package.json`:

```json
{
  "prettier": "@movii/prettier-config"
}
```

Or create a `.prettierrc.js` file:

```js
export { default } from '@movii/prettier-config';
```

## Configuration

This config includes:

- `printWidth`: 100
- `tabWidth`: 2
- `singleQuote`: true
- `trailingComma`: 'all'
- `semi`: true
