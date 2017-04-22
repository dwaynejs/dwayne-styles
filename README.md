# dwayne-styles

### Why?

The plugin is needed for setting styles in a more convenient way
than using `d-style` mixin.

### Installation

```bash
$ npm install --save dwayne-styles
```

### Usage

```html
<!-- User/index.html -->

<!-- provide usual string in the value -->
<div class="user" styles="visible">
  <span class="name" styles="common.bigCaption, user.name">
    {globals.user.name}
  </span>
  <!-- you may also provide args instead of value -->
  <span class="birthday" styles(common.date,user.birthday)>
    {globals.user.birthday}
  </span>
</div>
```

```js
// User/index.js

import { Block } from 'dwayne';
import template from './index.html';

class User extends Block {
  static template = template;
  static styles = {
    user: {
      name: {
        fontWeight: 'bold',
        fontStyle: 'italic'
      },
      birthday: {
        textTransform: 'uppercase'
      }
    },
    visible: {
      display: js`args.visible ? null : 'none'`
    }
  };
}

Block.block('User', User);
```

```js
// app/index.js

import { Block } from 'dwayne';
import styles from 'dwayne-styles';

// you need to provide d-style mixin or any other
// d-style'ish mixin to wrap
Block.mixin('styles', Block.getMixin('d-style').wrap(
  styles({
    common: {
      bigCaption: {
        fontSize: '20px'
      },
      date: {
        textTransform: 'uppercase'
      }
    }
  })
));
```

### API

You may use the mixin in two ways: providing a string as a value
which contains styles separated by a comma, spaces or both OR
providing mixin args. Note that the value is not watched.

Example:

```html
<div styles="styles1, prefix1.prefix2.styles2, prefix.styles"/>
<div styles="styles1  prefix1.prefix2.styles2  prefix.styles"/>
<div styles(styles1,prefix1.prefix2.styles2,prefix.styles)/>
```

Each style may be a common style (provided in the parameter for
`styles` wrapper constructor) or a style which is set in a static
`styles` property in the block class (which uses the `styles`
mixin). Each style is a path to a styles object. All styles from
the mixin are then merged from left to right and applied to the
element.

Note that you can use `js` expressions as values (you may use
[dwayne babel preset](https://www.npmjs.com/package/babel-preset-dwayne)
or set a pure function which excepts the block as the only parameter).
They are watched and each time the result is changed the styles
are applied again.
