# dwayne-styles

### Why?

The plugin is needed for setting styles in a more convenient way
than using `Style` mixin.

### Installation

```bash
$ npm install --save dwayne-styles
```

### Usage

```html
<script>
  import Styles from 'dwayne-styles';
</script>
<!-- User/index.html -->

<!-- provide usual string in the value -->
<div class="user" Styles="visible">
  <span class="name" Styles="common.bigCaption, user.name">
    {globals.user.name}
  </span>
  <!-- you may also provide args instead of value -->
  <span class="birthday" Styles(common.date,user.birthday)>
    {globals.user.birthday}
  </span>
</div>
```

```js
// User/index.js

import { Block } from 'dwayne';
import html from './index.html';

class User extends Block {
  static html = html;
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
      display: js`args.visible ? undefined : 'none'`
    }
  };
}

export default User;
```

```js
// app/plugins.js

import Styles from 'dwayne-styles';

// you can add default values to the mixin
Styles.addCommonStyles({
  common: {
    bigCaption: {
      fontSize: '20px'
    },
    date: {
      textTransform: 'uppercase'
    }
  }
});
```

### API

You may use the mixin in two ways: providing a string as a value
which contains styles separated by a comma, spaces or both OR
providing mixin args. Note that the value is not watched.

Example:

```html
<div Styles="styles1, prefix1.prefix2.styles2, prefix.styles"/>
<div Styles="styles1  prefix1.prefix2.styles2  prefix.styles"/>
<div Styles(styles1,prefix1.prefix2.styles2,prefix.styles)/>
```

Each style may be a common style (set by `Styles.addCommonStyles`)
or a style which is set in a static `styles` property in the block
class (which uses the `styles` mixin). Each style is a path to a
styles object. All styles from the mixin are then merged from left
to right and applied to the element. If the style value is
undefined it's skipped.

Note that you can use `js` expressions as values (you may use
[dwayne babel preset](https://www.npmjs.com/package/babel-preset-dwayne)
or set a pure function which excepts the block as the only parameter).
They are watched and each time the result is changed the styles
are applied again.

##### Styles.addCommonStyles(commonStyles)

Deep merges the previous common styles with the new ones.
