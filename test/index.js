import { initApp } from 'dwayne-test-utils';
import { deepStrictEqual } from 'assert';
import { Block } from 'dwayne';
import { Styles } from '../src';

let remove;

Styles.addCommonStyles({
  absolute: {
    position: 'absolute'
  },
  disabled: {
    color: 'rgb(187, 187, 187)',
    pointerEvents: 'none'
  },
  nested: {
    important: {
      color: 'rgb(255, 0, 0)',
      fontWeight: 'bold'
    },
    clickable: {
      cursor: 'pointer'
    }
  }
});

class App extends Block {
  static html = html`
    <div Styles="absolute nested.clickable"/>
    <div Styles="absolute, relative, disabled"/>
    <div Styles(nested.important,caption)/>
  `;
  static styles = {
    caption: {
      color: js`color`
    },
    relative: {
      position: 'relative'
    }
  };

  color = 'rgb(51, 51, 51)';
}

describe('it should test styles mixin', () => {
  before(remove = initApp(App));
  after(remove);

  it('should inject styles', () => {
    const children = $container.children();

    deepStrictEqual(children.elem(0).css(), {
      position: 'absolute',
      cursor: 'pointer'
    });
    deepStrictEqual(children.elem(1).css(), {
      position: 'relative',
      color: 'rgb(187, 187, 187)',
      pointerEvents: 'none'
    });
    deepStrictEqual(children.elem(2).css(), {
      color: 'rgb(51, 51, 51)',
      fontWeight: 'bold'
    });
  });
  it('should watch js expressions', () => {
    $app.color = 'rgb(0, 0, 255)';

    deepStrictEqual($container.children().elem(2).css(), {
      color: 'rgb(0, 0, 255)',
      fontWeight: 'bold'
    });
  });
  it('should skip undefined values', () => {
    $app.color = undefined;

    deepStrictEqual($container.children().elem(2).css(), {
      color: 'rgb(255, 0, 0)',
      fontWeight: 'bold'
    });
  });
  it('should take null values into account', () => {
    $app.color = null;

    deepStrictEqual($container.children().elem(2).css(), {
      fontWeight: 'bold'
    });
  });
});
