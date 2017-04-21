import { Block } from 'dwayne';
import styles from 'dwayne-styles';

Block.mixin('styles', Block.getMixin('d-style').wrap(
  styles({
    common: {
      green: {
        color: 'green'
      },
      caption: {
        textDecoration: 'uppercase'
      }
    }
  })
));

class MyBlock extends Block {
  static template = html`
    <div>
      <span styles="common.green, common.caption, caption">ABC</span>
    </div>
  `;
  static styles = {
    caption: {
      float: 'left',
      fontWeight: 'bold',
      display: js`args.visible ? 'inline' : 'none'`
    }
  };
}
