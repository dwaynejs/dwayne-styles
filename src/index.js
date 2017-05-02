const { hasOwnProperty } = {};
const SEPARATOR = /[,| ] */;

export default (commonStyles) => {
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
        this.__stylesNS__ = cloneDeep(Object.getPrototypeOf(parentTemplate).constructor.styles);
        this.__stylesCommon__ = cloneDeep(commonStyles);
        this.__stylesNames__ = stylesNames;
        this.afterUpdate(true);
      }

      afterUpdate(firstTime) {
        const {
          __stylesNS__,
          __stylesCommon__,
          __stylesNames__,
          __prevStyles__
        } = this;
        const styles = __stylesNames__.reduce((styles, name) => {
          const commStyles = get(__stylesCommon__, name);
          const nsStyles = get(__stylesNS__, name);

          if (firstTime) {
            this.watchJSExpressions(commStyles);
            this.watchJSExpressions(nsStyles);
          }

          return assign(
            styles,
            filterUndefined(commStyles),
            filterUndefined(nsStyles)
          );
        }, {});

        super.afterUpdate(styles, __prevStyles__);

        this.__prevStyles__ = styles;
      }

      watchJSExpressions(ns) {
        const { parentTemplate } = this;

        iterate(ns, (value, key) => {
          ns[key] = parentTemplate.evaluate(value, (newValue) => {
            ns[key] = newValue;

            this.afterUpdate();
          });
        });
      }
    };
  };
};

function assign(target) {
  for (let i = 1, length = arguments.length; i < length; i++) {
    iterate(arguments[i], (value, key) => {
      target[key] = value;
    });
  }

  return target;
}

function iterate(object, callback) {
  for (const key in object) {
    if (object::hasOwnProperty(key)) {
      callback(object[key], key, object);
    }
  }
}

function get(object, path) {
  const keys = path.split('.');

  for (let i = 0, length = keys.length; i < length; i++) {
    object = object[keys[i]];

    if (!object) {
      return;
    }
  }

  return object;
}

function filterUndefined(object) {
  const filtered = {};

  iterate(object, (value, key) => {
    if (typeof value !== 'undefined') {
      filtered[key] = value;
    }
  });

  return filtered;
}

function cloneDeep(object) {
  const type = typeof object;

  if (type !== 'object' || object === null) {
    return object;
  }

  const clone = {};

  iterate(object, (value, key) => {
    clone[key] = cloneDeep(value);
  });

  return clone;
}
