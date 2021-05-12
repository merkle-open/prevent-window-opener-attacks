# prevent-window-opener-attacks

[![NPM version][npm-image]][npm-url]
[![Size][size-image]][size-url]
[![License][license-image]][license-url]

This extreme tiny script will prevent the default behaviour of a click on an a-tag with `taget="_blank"`, open the link using `window.open` and ensure that `window.opener = null`.

## Examples

[Example without fix](https://merkle-open.github.io/prevent-window-opener-attacks/example/entry-without-fix.html)

[Example with fix](https://merkle-open.github.io/prevent-window-opener-attacks/example/entry-with-fix.html)

## Fix it with the rel attribute

You are able to set the `rel="noreferrer noopener"` attribute on an a-tag. This will also prevent to call `window.opener` on the location page. But this will only handle simple links.

```html
<a href="http://example.com" target="_blank" rel="noreferrer noopener"
  >Click me!</a
>
```

## Test your own site

Copy the following code in your dev-tools on your webpage and click on the generated link on the bottom of your page. If your page redirect after clicking the generated link, you will need this fix.

```js
(() => {
  let a = document.createElement('a');
  a.href =
    'https://merkle-open.github.io/prevent-window-opener-attacks/example/evil-page.html';
  a.target = '_blank';
  a.innerHTML = 'Click me!';
  document.body.appendChild(a);
})();
```

## Usage

### ES Modules

Fixes the attack vector on document ready automatically

```js
import('prevent-window-opener-attacks');
```

### CommonJS & AMDJS

Fixes the attack vector on document ready automatically

```js
require('prevent-window-opener-attacks');
```

### ES Modules - direct call

Allows to call the fix explicitely

```js
import { preventWindowOpenerAttacks } from 'prevent-window-opener-attacks/src/lib';
preventWindowOpenerAttacks();
```

### CommonJS - direct call

Allows to call the fix explicitely

```js
const {
  preventWindowOpenerAttacks,
} = require('prevent-window-opener-attacks/dist/lib.js');
preventWindowOpenerAttacks();
```

### AMD JS - direct call

Allows to call the fix explicitely

```js
require('prevent-window-opener-attacks/dist/lib.js', function ({
  preventWindowOpenerAttacks,
}) {
  preventWindowOpenerAttacks();
});
```

[npm-image]: https://badge.fury.io/js/prevent-window-opener-attacks.svg
[npm-url]: https://npmjs.org/package/prevent-window-opener-attacks
[license-image]: https://img.shields.io/badge/license-MIT-green.svg
[license-url]: https://opensource.org/licenses/MIT
[size-image]: https://img.badgesize.io/merkle-open/prevent-window-opener-attacks/master/dist/auto.min.js.svg?compression=gzip&label=gzip%20size
[size-url]: https://unpkg.com/prevent-window-opener-attacks/dist/auto.min.js
