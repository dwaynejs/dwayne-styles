# dwayne-inject-local-constants

### Why?

The plugin is needed for declaring constant locals without
explicitly setting them in the constructor. It is especially
useful when you need some constants (like `moment`, `lodash`, custom
constants like `i18n`, etc) in multiple (if not even all) blocks and
writing `globals.moment` or `globals._` all the time is no pleasure
at all.

### Installation

```bash
$ npm install --save dwayne-inject-local-constants
```

### Usage

```html
<!-- User/index.html -->

<div class="user">
  <span class="name">
    {_.truncate(globals.user.name, { length: 15 })}
  </span>
  <span class="registration-date">
    {moment(globals.user.regDate).format('MMMM Do YYYY')}
  </span>
</div>
```

```js
// User/index.js

import { Block } from 'dwayne';
import _ from 'lodash';
import moment from 'moment';
import template from './index.html';
import injectConstants from 'dwayne-inject-local-constants';

class User extends Block {
  static template = template;
}

Block.block('User', User.wrap(
  injectConstants({
    _,
    moment
  })
));

// or if you need them in all blocks (which is more probable)

Block.beforeRegisterBlock((Block) => {
  return Block.wrap(
    injectConstants({
      _,
      moment
    })
  );
});
```

Note that the constants are declared after `Block#constructor`,
because they are constants and they are not needed in watching.
But you still can use them in the template or class methods
(`Block#afterConstruct` and later).
