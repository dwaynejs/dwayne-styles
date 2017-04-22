import get from 'lodash/get';
import cloneDeep from 'lodash/cloneDeep';

const { hasOwnProperty } = {};
const SEPARATOR = /(?:,| ) */;

export default (commonStyles) => {
  commonStyles = commonStyles || {};

  return (StyleMixin) => {
    return class extends StyleMixin {
      static evaluate = false;

      constructor(opts) {
        super(opts);

        const {
          args,
          parentTemplate
        } = this;

        let stylesNames = [];

        if (args) {
          stylesNames = args;
        } else {
          const value = this.evaluate();

          if (typeof value === 'string') {
            stylesNames = value.split(SEPARATOR);
          }
        }

        this.args = undefined;
        this.__stylesNS__ = cloneDeep(parentTemplate.getConstructor().styles);
        this.__stylesNames__ = stylesNames;
        this.afterUpdate(true);
      }

      afterUpdate(firstTime) {
        const {
          parentTemplate,
          __stylesNS__,
          __stylesNames__,
          __prevStyles__
        } = this;
        const styles = __stylesNames__.reduce((styles, name) => {
          const nsStyles = get(__stylesNS__, name);

          if (firstTime) {
            iterate(nsStyles, (value, key, ns) => {
              ns[key] = parentTemplate.evaluate(value, (newValue) => {
                ns[key] = newValue;

                this.afterUpdate();
              }, this);
            });
          }

          return assign(assign(styles, get(commonStyles, name)), nsStyles);
        }, {});

        super.afterUpdate(styles, __prevStyles__);

        this.__prevStyles__ = styles;
      }
    };
  };
};

function assign(target, object) {
  iterate(object, (value, key) => {
    target[key] = value;
  });

  return target;
}

function iterate(object, callback) {
  for (const key in object) {
    if (object::hasOwnProperty(key)) {
      callback(object[key], key, object);
    }
  }
}
