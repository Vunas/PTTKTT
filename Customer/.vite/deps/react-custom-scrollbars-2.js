import {
  require_prop_types
} from "./chunk-FJ6XD5FS.js";
import {
  require_react
} from "./chunk-TXWKGKUG.js";
import {
  __commonJS
} from "./chunk-DC5AMYBS.js";

// node_modules/performance-now/lib/performance-now.js
var require_performance_now = __commonJS({
  "node_modules/performance-now/lib/performance-now.js"(exports, module) {
    (function() {
      var getNanoSeconds, hrtime, loadTime, moduleLoadTime, nodeLoadTime, upTime;
      if (typeof performance !== "undefined" && performance !== null && performance.now) {
        module.exports = function() {
          return performance.now();
        };
      } else if (typeof process !== "undefined" && process !== null && process.hrtime) {
        module.exports = function() {
          return (getNanoSeconds() - nodeLoadTime) / 1e6;
        };
        hrtime = process.hrtime;
        getNanoSeconds = function() {
          var hr;
          hr = hrtime();
          return hr[0] * 1e9 + hr[1];
        };
        moduleLoadTime = getNanoSeconds();
        upTime = process.uptime() * 1e9;
        nodeLoadTime = moduleLoadTime - upTime;
      } else if (Date.now) {
        module.exports = function() {
          return Date.now() - loadTime;
        };
        loadTime = Date.now();
      } else {
        module.exports = function() {
          return (/* @__PURE__ */ new Date()).getTime() - loadTime;
        };
        loadTime = (/* @__PURE__ */ new Date()).getTime();
      }
    }).call(exports);
  }
});

// node_modules/raf/index.js
var require_raf = __commonJS({
  "node_modules/raf/index.js"(exports, module) {
    var now = require_performance_now();
    var root = typeof window === "undefined" ? global : window;
    var vendors = ["moz", "webkit"];
    var suffix = "AnimationFrame";
    var raf = root["request" + suffix];
    var caf = root["cancel" + suffix] || root["cancelRequest" + suffix];
    for (i = 0; !raf && i < vendors.length; i++) {
      raf = root[vendors[i] + "Request" + suffix];
      caf = root[vendors[i] + "Cancel" + suffix] || root[vendors[i] + "CancelRequest" + suffix];
    }
    var i;
    if (!raf || !caf) {
      last = 0, id = 0, queue = [], frameDuration = 1e3 / 60;
      raf = function(callback) {
        if (queue.length === 0) {
          var _now = now(), next = Math.max(0, frameDuration - (_now - last));
          last = next + _now;
          setTimeout(function() {
            var cp = queue.slice(0);
            queue.length = 0;
            for (var i2 = 0; i2 < cp.length; i2++) {
              if (!cp[i2].cancelled) {
                try {
                  cp[i2].callback(last);
                } catch (e) {
                  setTimeout(function() {
                    throw e;
                  }, 0);
                }
              }
            }
          }, Math.round(next));
        }
        queue.push({
          handle: ++id,
          callback,
          cancelled: false
        });
        return id;
      };
      caf = function(handle) {
        for (var i2 = 0; i2 < queue.length; i2++) {
          if (queue[i2].handle === handle) {
            queue[i2].cancelled = true;
          }
        }
      };
    }
    var last;
    var id;
    var queue;
    var frameDuration;
    module.exports = function(fn) {
      return raf.call(root, fn);
    };
    module.exports.cancel = function() {
      caf.apply(root, arguments);
    };
    module.exports.polyfill = function(object) {
      if (!object) {
        object = root;
      }
      object.requestAnimationFrame = raf;
      object.cancelAnimationFrame = caf;
    };
  }
});

// node_modules/prefix-style/index.js
var require_prefix_style = __commonJS({
  "node_modules/prefix-style/index.js"(exports, module) {
    var div = null;
    var prefixes = ["Webkit", "Moz", "O", "ms"];
    module.exports = function prefixStyle(prop) {
      if (!div) {
        div = document.createElement("div");
      }
      var style = div.style;
      if (prop in style) {
        return prop;
      }
      var titleCase = prop.charAt(0).toUpperCase() + prop.slice(1);
      for (var i = prefixes.length; i >= 0; i--) {
        var name = prefixes[i] + titleCase;
        if (name in style) {
          return name;
        }
      }
      return false;
    };
  }
});

// node_modules/to-no-case/index.js
var require_to_no_case = __commonJS({
  "node_modules/to-no-case/index.js"(exports, module) {
    module.exports = toNoCase;
    var hasSpace = /\s/;
    var hasSeparator = /(_|-|\.|:)/;
    var hasCamel = /([a-z][A-Z]|[A-Z][a-z])/;
    function toNoCase(string) {
      if (hasSpace.test(string)) return string.toLowerCase();
      if (hasSeparator.test(string)) return (unseparate(string) || string).toLowerCase();
      if (hasCamel.test(string)) return uncamelize(string).toLowerCase();
      return string.toLowerCase();
    }
    var separatorSplitter = /[\W_]+(.|$)/g;
    function unseparate(string) {
      return string.replace(separatorSplitter, function(m, next) {
        return next ? " " + next : "";
      });
    }
    var camelSplitter = /(.)([A-Z]+)/g;
    function uncamelize(string) {
      return string.replace(camelSplitter, function(m, previous, uppers) {
        return previous + " " + uppers.toLowerCase().split("").join(" ");
      });
    }
  }
});

// node_modules/to-space-case/index.js
var require_to_space_case = __commonJS({
  "node_modules/to-space-case/index.js"(exports, module) {
    var clean = require_to_no_case();
    module.exports = toSpaceCase;
    function toSpaceCase(string) {
      return clean(string).replace(/[\W_]+(.|$)/g, function(matches, match) {
        return match ? " " + match : "";
      }).trim();
    }
  }
});

// node_modules/to-camel-case/index.js
var require_to_camel_case = __commonJS({
  "node_modules/to-camel-case/index.js"(exports, module) {
    var space = require_to_space_case();
    module.exports = toCamelCase;
    function toCamelCase(string) {
      return space(string).replace(/\s(\w)/g, function(matches, letter) {
        return letter.toUpperCase();
      });
    }
  }
});

// node_modules/add-px-to-style/index.js
var require_add_px_to_style = __commonJS({
  "node_modules/add-px-to-style/index.js"(exports, module) {
    var IS_UNITLESS = {
      animationIterationCount: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridRow: true,
      gridColumn: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      // SVG-related properties
      fillOpacity: true,
      stopOpacity: true,
      strokeDashoffset: true,
      strokeOpacity: true,
      strokeWidth: true
    };
    module.exports = function(name, value) {
      if (typeof value === "number" && !IS_UNITLESS[name]) {
        return value + "px";
      } else {
        return value;
      }
    };
  }
});

// node_modules/dom-css/index.js
var require_dom_css = __commonJS({
  "node_modules/dom-css/index.js"(exports, module) {
    var prefix = require_prefix_style();
    var toCamelCase = require_to_camel_case();
    var cache = { "float": "cssFloat" };
    var addPxToStyle = require_add_px_to_style();
    function style(element, property, value) {
      var camel = cache[property];
      if (typeof camel === "undefined") {
        camel = detect(property);
      }
      if (camel) {
        if (value === void 0) {
          return element.style[camel];
        }
        element.style[camel] = addPxToStyle(camel, value);
      }
    }
    function each(element, properties) {
      for (var k in properties) {
        if (properties.hasOwnProperty(k)) {
          style(element, k, properties[k]);
        }
      }
    }
    function detect(cssProp) {
      var camel = toCamelCase(cssProp);
      var result = prefix(camel);
      cache[camel] = cache[cssProp] = cache[result] = result;
      return result;
    }
    function set() {
      if (arguments.length === 2) {
        if (typeof arguments[1] === "string") {
          arguments[0].style.cssText = arguments[1];
        } else {
          each(arguments[0], arguments[1]);
        }
      } else {
        style(arguments[0], arguments[1], arguments[2]);
      }
    }
    module.exports = set;
    module.exports.set = set;
    module.exports.get = function(element, properties) {
      if (Array.isArray(properties)) {
        return properties.reduce(function(obj, prop) {
          obj[prop] = style(element, prop || "");
          return obj;
        }, {});
      } else {
        return style(element, properties || "");
      }
    };
  }
});

// node_modules/react-custom-scrollbars-2/lib/utils/isString.js
var require_isString = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/utils/isString.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = isString;
    function isString(maybe) {
      return typeof maybe === "string";
    }
  }
});

// node_modules/react-custom-scrollbars-2/lib/utils/getScrollbarWidth.js
var require_getScrollbarWidth = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/utils/getScrollbarWidth.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = getScrollbarWidth;
    var _domCss = require_dom_css();
    var _domCss2 = _interopRequireDefault(_domCss);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    var scrollbarWidth = false;
    function getScrollbarWidth() {
      var cacheEnabled = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : true;
      if (cacheEnabled && scrollbarWidth !== false) return scrollbarWidth;
      if (typeof document !== "undefined") {
        var div = document.createElement("div");
        (0, _domCss2["default"])(div, {
          width: 100,
          height: 100,
          position: "absolute",
          top: -9999,
          overflow: "scroll",
          MsOverflowStyle: "scrollbar"
        });
        document.body.appendChild(div);
        scrollbarWidth = div.offsetWidth - div.clientWidth;
        document.body.removeChild(div);
      } else {
        scrollbarWidth = 0;
      }
      return scrollbarWidth || 0;
    }
  }
});

// node_modules/react-custom-scrollbars-2/lib/utils/returnFalse.js
var require_returnFalse = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/utils/returnFalse.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = returnFalse;
    function returnFalse() {
      return false;
    }
  }
});

// node_modules/react-custom-scrollbars-2/lib/utils/getInnerWidth.js
var require_getInnerWidth = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/utils/getInnerWidth.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = getInnerWidth;
    function getInnerWidth(el) {
      var clientWidth = el.clientWidth;
      var _getComputedStyle = getComputedStyle(el), paddingLeft = _getComputedStyle.paddingLeft, paddingRight = _getComputedStyle.paddingRight;
      return clientWidth - parseFloat(paddingLeft) - parseFloat(paddingRight);
    }
  }
});

// node_modules/react-custom-scrollbars-2/lib/utils/getInnerHeight.js
var require_getInnerHeight = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/utils/getInnerHeight.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports["default"] = getInnerHeight;
    function getInnerHeight(el) {
      var clientHeight = el.clientHeight;
      var _getComputedStyle = getComputedStyle(el), paddingTop = _getComputedStyle.paddingTop, paddingBottom = _getComputedStyle.paddingBottom;
      return clientHeight - parseFloat(paddingTop) - parseFloat(paddingBottom);
    }
  }
});

// node_modules/react-custom-scrollbars-2/lib/Scrollbars/styles.js
var require_styles = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/Scrollbars/styles.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var containerStyleDefault = exports.containerStyleDefault = {
      position: "relative",
      overflow: "hidden",
      width: "100%",
      height: "100%"
    };
    var containerStyleAutoHeight = exports.containerStyleAutoHeight = {
      height: "auto"
    };
    var viewStyleDefault = exports.viewStyleDefault = {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      overflow: "scroll",
      WebkitOverflowScrolling: "touch"
    };
    var viewStyleAutoHeight = exports.viewStyleAutoHeight = {
      position: "relative",
      top: void 0,
      left: void 0,
      right: void 0,
      bottom: void 0
    };
    var viewStyleUniversalInitial = exports.viewStyleUniversalInitial = {
      overflow: "hidden",
      marginRight: 0,
      marginBottom: 0
    };
    var trackHorizontalStyleDefault = exports.trackHorizontalStyleDefault = {
      position: "absolute",
      height: 6
    };
    var trackVerticalStyleDefault = exports.trackVerticalStyleDefault = {
      position: "absolute",
      width: 6
    };
    var thumbHorizontalStyleDefault = exports.thumbHorizontalStyleDefault = {
      position: "relative",
      display: "block",
      height: "100%"
    };
    var thumbVerticalStyleDefault = exports.thumbVerticalStyleDefault = {
      position: "relative",
      display: "block",
      width: "100%"
    };
    var disableSelectStyle = exports.disableSelectStyle = {
      userSelect: "none"
    };
    var disableSelectStyleReset = exports.disableSelectStyleReset = {
      userSelect: ""
    };
  }
});

// node_modules/react-custom-scrollbars-2/lib/Scrollbars/defaultRenderElements.js
var require_defaultRenderElements = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/Scrollbars/defaultRenderElements.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    exports.renderViewDefault = renderViewDefault;
    exports.renderTrackHorizontalDefault = renderTrackHorizontalDefault;
    exports.renderTrackVerticalDefault = renderTrackVerticalDefault;
    exports.renderThumbHorizontalDefault = renderThumbHorizontalDefault;
    exports.renderThumbVerticalDefault = renderThumbVerticalDefault;
    var _react = require_react();
    var _react2 = _interopRequireDefault(_react);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    }
    function renderViewDefault(props) {
      return _react2["default"].createElement("div", props);
    }
    function renderTrackHorizontalDefault(_ref) {
      var style = _ref.style, props = _objectWithoutProperties(_ref, ["style"]);
      var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        left: 2,
        borderRadius: 3
      });
      return _react2["default"].createElement("div", _extends({ style: finalStyle }, props));
    }
    function renderTrackVerticalDefault(_ref2) {
      var style = _ref2.style, props = _objectWithoutProperties(_ref2, ["style"]);
      var finalStyle = _extends({}, style, {
        right: 2,
        bottom: 2,
        top: 2,
        borderRadius: 3
      });
      return _react2["default"].createElement("div", _extends({ style: finalStyle }, props));
    }
    function renderThumbHorizontalDefault(_ref3) {
      var style = _ref3.style, props = _objectWithoutProperties(_ref3, ["style"]);
      var finalStyle = _extends({}, style, {
        cursor: "pointer",
        borderRadius: "inherit",
        backgroundColor: "rgba(0,0,0,.2)"
      });
      return _react2["default"].createElement("div", _extends({ style: finalStyle }, props));
    }
    function renderThumbVerticalDefault(_ref4) {
      var style = _ref4.style, props = _objectWithoutProperties(_ref4, ["style"]);
      var finalStyle = _extends({}, style, {
        cursor: "pointer",
        borderRadius: "inherit",
        backgroundColor: "rgba(0,0,0,.2)"
      });
      return _react2["default"].createElement("div", _extends({ style: finalStyle }, props));
    }
  }
});

// node_modules/react-custom-scrollbars-2/lib/Scrollbars/index.js
var require_Scrollbars = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/Scrollbars/index.js"(exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    var _extends = Object.assign || function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
    var _createClass = /* @__PURE__ */ function() {
      function defineProperties(target, props) {
        for (var i = 0; i < props.length; i++) {
          var descriptor = props[i];
          descriptor.enumerable = descriptor.enumerable || false;
          descriptor.configurable = true;
          if ("value" in descriptor) descriptor.writable = true;
          Object.defineProperty(target, descriptor.key, descriptor);
        }
      }
      return function(Constructor, protoProps, staticProps) {
        if (protoProps) defineProperties(Constructor.prototype, protoProps);
        if (staticProps) defineProperties(Constructor, staticProps);
        return Constructor;
      };
    }();
    var _raf2 = require_raf();
    var _raf3 = _interopRequireDefault(_raf2);
    var _domCss = require_dom_css();
    var _domCss2 = _interopRequireDefault(_domCss);
    var _react = require_react();
    var _propTypes = require_prop_types();
    var _propTypes2 = _interopRequireDefault(_propTypes);
    var _isString = require_isString();
    var _isString2 = _interopRequireDefault(_isString);
    var _getScrollbarWidth = require_getScrollbarWidth();
    var _getScrollbarWidth2 = _interopRequireDefault(_getScrollbarWidth);
    var _returnFalse = require_returnFalse();
    var _returnFalse2 = _interopRequireDefault(_returnFalse);
    var _getInnerWidth = require_getInnerWidth();
    var _getInnerWidth2 = _interopRequireDefault(_getInnerWidth);
    var _getInnerHeight = require_getInnerHeight();
    var _getInnerHeight2 = _interopRequireDefault(_getInnerHeight);
    var _styles = require_styles();
    var _defaultRenderElements = require_defaultRenderElements();
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    function _objectWithoutProperties(obj, keys) {
      var target = {};
      for (var i in obj) {
        if (keys.indexOf(i) >= 0) continue;
        if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
        target[i] = obj[i];
      }
      return target;
    }
    function _classCallCheck(instance, Constructor) {
      if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }
    function _possibleConstructorReturn(self, call) {
      if (!self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }
      return call && (typeof call === "object" || typeof call === "function") ? call : self;
    }
    function _inherits(subClass, superClass) {
      if (typeof superClass !== "function" && superClass !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
      }
      subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });
      if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    var Scrollbars = function(_Component) {
      _inherits(Scrollbars2, _Component);
      function Scrollbars2(props) {
        var _ref;
        _classCallCheck(this, Scrollbars2);
        for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }
        var _this = _possibleConstructorReturn(this, (_ref = Scrollbars2.__proto__ || Object.getPrototypeOf(Scrollbars2)).call.apply(_ref, [this, props].concat(rest)));
        _this.getScrollLeft = _this.getScrollLeft.bind(_this);
        _this.getScrollTop = _this.getScrollTop.bind(_this);
        _this.getScrollWidth = _this.getScrollWidth.bind(_this);
        _this.getScrollHeight = _this.getScrollHeight.bind(_this);
        _this.getClientWidth = _this.getClientWidth.bind(_this);
        _this.getClientHeight = _this.getClientHeight.bind(_this);
        _this.getValues = _this.getValues.bind(_this);
        _this.getThumbHorizontalWidth = _this.getThumbHorizontalWidth.bind(_this);
        _this.getThumbVerticalHeight = _this.getThumbVerticalHeight.bind(_this);
        _this.getScrollLeftForOffset = _this.getScrollLeftForOffset.bind(_this);
        _this.getScrollTopForOffset = _this.getScrollTopForOffset.bind(_this);
        _this.scrollLeft = _this.scrollLeft.bind(_this);
        _this.scrollTop = _this.scrollTop.bind(_this);
        _this.scrollToLeft = _this.scrollToLeft.bind(_this);
        _this.scrollToTop = _this.scrollToTop.bind(_this);
        _this.scrollToRight = _this.scrollToRight.bind(_this);
        _this.scrollToBottom = _this.scrollToBottom.bind(_this);
        _this.handleTrackMouseEnter = _this.handleTrackMouseEnter.bind(_this);
        _this.handleTrackMouseLeave = _this.handleTrackMouseLeave.bind(_this);
        _this.handleHorizontalTrackMouseDown = _this.handleHorizontalTrackMouseDown.bind(_this);
        _this.handleVerticalTrackMouseDown = _this.handleVerticalTrackMouseDown.bind(_this);
        _this.handleHorizontalThumbMouseDown = _this.handleHorizontalThumbMouseDown.bind(_this);
        _this.handleVerticalThumbMouseDown = _this.handleVerticalThumbMouseDown.bind(_this);
        _this.handleWindowResize = _this.handleWindowResize.bind(_this);
        _this.handleScroll = _this.handleScroll.bind(_this);
        _this.handleDrag = _this.handleDrag.bind(_this);
        _this.handleDragEnd = _this.handleDragEnd.bind(_this);
        _this.state = {
          didMountUniversal: false
        };
        return _this;
      }
      _createClass(Scrollbars2, [{
        key: "componentDidMount",
        value: function componentDidMount() {
          this.addListeners();
          this.update();
          this.componentDidMountUniversal();
        }
      }, {
        key: "componentDidMountUniversal",
        value: function componentDidMountUniversal() {
          var universal = this.props.universal;
          if (!universal) return;
          this.setState({ didMountUniversal: true });
        }
      }, {
        key: "componentDidUpdate",
        value: function componentDidUpdate() {
          this.update();
        }
      }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
          this.removeListeners();
          (0, _raf2.cancel)(this.requestFrame);
          clearTimeout(this.hideTracksTimeout);
          clearInterval(this.detectScrollingInterval);
        }
      }, {
        key: "getScrollLeft",
        value: function getScrollLeft() {
          if (!this.view) return 0;
          return this.view.scrollLeft;
        }
      }, {
        key: "getScrollTop",
        value: function getScrollTop() {
          if (!this.view) return 0;
          return this.view.scrollTop;
        }
      }, {
        key: "getScrollWidth",
        value: function getScrollWidth() {
          if (!this.view) return 0;
          return this.view.scrollWidth;
        }
      }, {
        key: "getScrollHeight",
        value: function getScrollHeight() {
          if (!this.view) return 0;
          return this.view.scrollHeight;
        }
      }, {
        key: "getClientWidth",
        value: function getClientWidth() {
          if (!this.view) return 0;
          return this.view.clientWidth;
        }
      }, {
        key: "getClientHeight",
        value: function getClientHeight() {
          if (!this.view) return 0;
          return this.view.clientHeight;
        }
      }, {
        key: "getValues",
        value: function getValues() {
          var _ref2 = this.view || {}, _ref2$scrollLeft = _ref2.scrollLeft, scrollLeft = _ref2$scrollLeft === void 0 ? 0 : _ref2$scrollLeft, _ref2$scrollTop = _ref2.scrollTop, scrollTop = _ref2$scrollTop === void 0 ? 0 : _ref2$scrollTop, _ref2$scrollWidth = _ref2.scrollWidth, scrollWidth = _ref2$scrollWidth === void 0 ? 0 : _ref2$scrollWidth, _ref2$scrollHeight = _ref2.scrollHeight, scrollHeight = _ref2$scrollHeight === void 0 ? 0 : _ref2$scrollHeight, _ref2$clientWidth = _ref2.clientWidth, clientWidth = _ref2$clientWidth === void 0 ? 0 : _ref2$clientWidth, _ref2$clientHeight = _ref2.clientHeight, clientHeight = _ref2$clientHeight === void 0 ? 0 : _ref2$clientHeight;
          return {
            left: scrollLeft / (scrollWidth - clientWidth) || 0,
            top: scrollTop / (scrollHeight - clientHeight) || 0,
            scrollLeft,
            scrollTop,
            scrollWidth,
            scrollHeight,
            clientWidth,
            clientHeight
          };
        }
      }, {
        key: "getThumbHorizontalWidth",
        value: function getThumbHorizontalWidth() {
          var _props = this.props, thumbSize = _props.thumbSize, thumbMinSize = _props.thumbMinSize;
          var _view = this.view, scrollWidth = _view.scrollWidth, clientWidth = _view.clientWidth;
          var trackWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
          var width = Math.ceil(clientWidth / scrollWidth * trackWidth);
          if (trackWidth <= width) return 0;
          if (thumbSize) return thumbSize;
          return Math.max(width, thumbMinSize);
        }
      }, {
        key: "getThumbVerticalHeight",
        value: function getThumbVerticalHeight() {
          var _props2 = this.props, thumbSize = _props2.thumbSize, thumbMinSize = _props2.thumbMinSize;
          var _view2 = this.view, scrollHeight = _view2.scrollHeight, clientHeight = _view2.clientHeight;
          var trackHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
          var height = Math.ceil(clientHeight / scrollHeight * trackHeight);
          if (trackHeight <= height) return 0;
          if (thumbSize) return thumbSize;
          return Math.max(height, thumbMinSize);
        }
      }, {
        key: "getScrollLeftForOffset",
        value: function getScrollLeftForOffset(offset) {
          var _view3 = this.view, scrollWidth = _view3.scrollWidth, clientWidth = _view3.clientWidth;
          var trackWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
          var thumbWidth = this.getThumbHorizontalWidth();
          return offset / (trackWidth - thumbWidth) * (scrollWidth - clientWidth);
        }
      }, {
        key: "getScrollTopForOffset",
        value: function getScrollTopForOffset(offset) {
          var _view4 = this.view, scrollHeight = _view4.scrollHeight, clientHeight = _view4.clientHeight;
          var trackHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
          var thumbHeight = this.getThumbVerticalHeight();
          return offset / (trackHeight - thumbHeight) * (scrollHeight - clientHeight);
        }
      }, {
        key: "scrollLeft",
        value: function scrollLeft() {
          var left = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          if (!this.view) return;
          this.view.scrollLeft = left;
        }
      }, {
        key: "scrollTop",
        value: function scrollTop() {
          var top = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : 0;
          if (!this.view) return;
          this.view.scrollTop = top;
        }
      }, {
        key: "scrollToLeft",
        value: function scrollToLeft() {
          if (!this.view) return;
          this.view.scrollLeft = 0;
        }
      }, {
        key: "scrollToTop",
        value: function scrollToTop() {
          if (!this.view) return;
          this.view.scrollTop = 0;
        }
      }, {
        key: "scrollToRight",
        value: function scrollToRight() {
          if (!this.view) return;
          this.view.scrollLeft = this.view.scrollWidth;
        }
      }, {
        key: "scrollToBottom",
        value: function scrollToBottom() {
          if (!this.view) return;
          this.view.scrollTop = this.view.scrollHeight;
        }
      }, {
        key: "addListeners",
        value: function addListeners() {
          if (typeof document === "undefined" || !this.view) return;
          var view = this.view, trackHorizontal = this.trackHorizontal, trackVertical = this.trackVertical, thumbHorizontal = this.thumbHorizontal, thumbVertical = this.thumbVertical;
          view.addEventListener("scroll", this.handleScroll);
          if (!(0, _getScrollbarWidth2["default"])()) return;
          trackHorizontal.addEventListener("mouseenter", this.handleTrackMouseEnter);
          trackHorizontal.addEventListener("mouseleave", this.handleTrackMouseLeave);
          trackHorizontal.addEventListener("mousedown", this.handleHorizontalTrackMouseDown);
          trackVertical.addEventListener("mouseenter", this.handleTrackMouseEnter);
          trackVertical.addEventListener("mouseleave", this.handleTrackMouseLeave);
          trackVertical.addEventListener("mousedown", this.handleVerticalTrackMouseDown);
          thumbHorizontal.addEventListener("mousedown", this.handleHorizontalThumbMouseDown);
          thumbVertical.addEventListener("mousedown", this.handleVerticalThumbMouseDown);
          window.addEventListener("resize", this.handleWindowResize);
        }
      }, {
        key: "removeListeners",
        value: function removeListeners() {
          if (typeof document === "undefined" || !this.view) return;
          var view = this.view, trackHorizontal = this.trackHorizontal, trackVertical = this.trackVertical, thumbHorizontal = this.thumbHorizontal, thumbVertical = this.thumbVertical;
          view.removeEventListener("scroll", this.handleScroll);
          if (!(0, _getScrollbarWidth2["default"])()) return;
          trackHorizontal.removeEventListener("mouseenter", this.handleTrackMouseEnter);
          trackHorizontal.removeEventListener("mouseleave", this.handleTrackMouseLeave);
          trackHorizontal.removeEventListener("mousedown", this.handleHorizontalTrackMouseDown);
          trackVertical.removeEventListener("mouseenter", this.handleTrackMouseEnter);
          trackVertical.removeEventListener("mouseleave", this.handleTrackMouseLeave);
          trackVertical.removeEventListener("mousedown", this.handleVerticalTrackMouseDown);
          thumbHorizontal.removeEventListener("mousedown", this.handleHorizontalThumbMouseDown);
          thumbVertical.removeEventListener("mousedown", this.handleVerticalThumbMouseDown);
          window.removeEventListener("resize", this.handleWindowResize);
          this.teardownDragging();
        }
      }, {
        key: "handleScroll",
        value: function handleScroll(event) {
          var _this2 = this;
          var _props3 = this.props, onScroll = _props3.onScroll, onScrollFrame = _props3.onScrollFrame;
          if (onScroll) onScroll(event);
          this.update(function(values) {
            var scrollLeft = values.scrollLeft, scrollTop = values.scrollTop;
            _this2.viewScrollLeft = scrollLeft;
            _this2.viewScrollTop = scrollTop;
            if (onScrollFrame) onScrollFrame(values);
          });
          this.detectScrolling();
        }
      }, {
        key: "handleScrollStart",
        value: function handleScrollStart() {
          var onScrollStart = this.props.onScrollStart;
          if (onScrollStart) onScrollStart();
          this.handleScrollStartAutoHide();
        }
      }, {
        key: "handleScrollStartAutoHide",
        value: function handleScrollStartAutoHide() {
          var autoHide = this.props.autoHide;
          if (!autoHide) return;
          this.showTracks();
        }
      }, {
        key: "handleScrollStop",
        value: function handleScrollStop() {
          var onScrollStop = this.props.onScrollStop;
          if (onScrollStop) onScrollStop();
          this.handleScrollStopAutoHide();
        }
      }, {
        key: "handleScrollStopAutoHide",
        value: function handleScrollStopAutoHide() {
          var autoHide = this.props.autoHide;
          if (!autoHide) return;
          this.hideTracks();
        }
      }, {
        key: "handleWindowResize",
        value: function handleWindowResize() {
          (0, _getScrollbarWidth2["default"])(false);
          this.forceUpdate();
        }
      }, {
        key: "handleHorizontalTrackMouseDown",
        value: function handleHorizontalTrackMouseDown(event) {
          event.preventDefault();
          var target = event.target, clientX = event.clientX;
          var _target$getBoundingCl = target.getBoundingClientRect(), targetLeft = _target$getBoundingCl.left;
          var thumbWidth = this.getThumbHorizontalWidth();
          var offset = Math.abs(targetLeft - clientX) - thumbWidth / 2;
          this.view.scrollLeft = this.getScrollLeftForOffset(offset);
        }
      }, {
        key: "handleVerticalTrackMouseDown",
        value: function handleVerticalTrackMouseDown(event) {
          event.preventDefault();
          var target = event.target, clientY = event.clientY;
          var _target$getBoundingCl2 = target.getBoundingClientRect(), targetTop = _target$getBoundingCl2.top;
          var thumbHeight = this.getThumbVerticalHeight();
          var offset = Math.abs(targetTop - clientY) - thumbHeight / 2;
          this.view.scrollTop = this.getScrollTopForOffset(offset);
        }
      }, {
        key: "handleHorizontalThumbMouseDown",
        value: function handleHorizontalThumbMouseDown(event) {
          event.preventDefault();
          this.handleDragStart(event);
          var target = event.target, clientX = event.clientX;
          var offsetWidth = target.offsetWidth;
          var _target$getBoundingCl3 = target.getBoundingClientRect(), left = _target$getBoundingCl3.left;
          this.prevPageX = offsetWidth - (clientX - left);
        }
      }, {
        key: "handleVerticalThumbMouseDown",
        value: function handleVerticalThumbMouseDown(event) {
          event.preventDefault();
          this.handleDragStart(event);
          var target = event.target, clientY = event.clientY;
          var offsetHeight = target.offsetHeight;
          var _target$getBoundingCl4 = target.getBoundingClientRect(), top = _target$getBoundingCl4.top;
          this.prevPageY = offsetHeight - (clientY - top);
        }
      }, {
        key: "setupDragging",
        value: function setupDragging() {
          (0, _domCss2["default"])(document.body, _styles.disableSelectStyle);
          document.addEventListener("mousemove", this.handleDrag);
          document.addEventListener("mouseup", this.handleDragEnd);
          document.onselectstart = _returnFalse2["default"];
        }
      }, {
        key: "teardownDragging",
        value: function teardownDragging() {
          (0, _domCss2["default"])(document.body, _styles.disableSelectStyleReset);
          document.removeEventListener("mousemove", this.handleDrag);
          document.removeEventListener("mouseup", this.handleDragEnd);
          document.onselectstart = void 0;
        }
      }, {
        key: "handleDragStart",
        value: function handleDragStart(event) {
          this.dragging = true;
          event.stopImmediatePropagation();
          this.setupDragging();
        }
      }, {
        key: "handleDrag",
        value: function handleDrag(event) {
          if (this.prevPageX) {
            var clientX = event.clientX;
            var _trackHorizontal$getB = this.trackHorizontal.getBoundingClientRect(), trackLeft = _trackHorizontal$getB.left;
            var thumbWidth = this.getThumbHorizontalWidth();
            var clickPosition = thumbWidth - this.prevPageX;
            var offset = -trackLeft + clientX - clickPosition;
            this.view.scrollLeft = this.getScrollLeftForOffset(offset);
          }
          if (this.prevPageY) {
            var clientY = event.clientY;
            var _trackVertical$getBou = this.trackVertical.getBoundingClientRect(), trackTop = _trackVertical$getBou.top;
            var thumbHeight = this.getThumbVerticalHeight();
            var _clickPosition = thumbHeight - this.prevPageY;
            var _offset = -trackTop + clientY - _clickPosition;
            this.view.scrollTop = this.getScrollTopForOffset(_offset);
          }
          return false;
        }
      }, {
        key: "handleDragEnd",
        value: function handleDragEnd() {
          this.dragging = false;
          this.prevPageX = this.prevPageY = 0;
          this.teardownDragging();
          this.handleDragEndAutoHide();
        }
      }, {
        key: "handleDragEndAutoHide",
        value: function handleDragEndAutoHide() {
          var autoHide = this.props.autoHide;
          if (!autoHide) return;
          this.hideTracks();
        }
      }, {
        key: "handleTrackMouseEnter",
        value: function handleTrackMouseEnter() {
          this.trackMouseOver = true;
          this.handleTrackMouseEnterAutoHide();
        }
      }, {
        key: "handleTrackMouseEnterAutoHide",
        value: function handleTrackMouseEnterAutoHide() {
          var autoHide = this.props.autoHide;
          if (!autoHide) return;
          this.showTracks();
        }
      }, {
        key: "handleTrackMouseLeave",
        value: function handleTrackMouseLeave() {
          this.trackMouseOver = false;
          this.handleTrackMouseLeaveAutoHide();
        }
      }, {
        key: "handleTrackMouseLeaveAutoHide",
        value: function handleTrackMouseLeaveAutoHide() {
          var autoHide = this.props.autoHide;
          if (!autoHide) return;
          this.hideTracks();
        }
      }, {
        key: "showTracks",
        value: function showTracks() {
          clearTimeout(this.hideTracksTimeout);
          (0, _domCss2["default"])(this.trackHorizontal, { opacity: 1 });
          (0, _domCss2["default"])(this.trackVertical, { opacity: 1 });
        }
      }, {
        key: "hideTracks",
        value: function hideTracks() {
          var _this3 = this;
          if (this.dragging) return;
          if (this.scrolling) return;
          if (this.trackMouseOver) return;
          var autoHideTimeout = this.props.autoHideTimeout;
          clearTimeout(this.hideTracksTimeout);
          this.hideTracksTimeout = setTimeout(function() {
            (0, _domCss2["default"])(_this3.trackHorizontal, { opacity: 0 });
            (0, _domCss2["default"])(_this3.trackVertical, { opacity: 0 });
          }, autoHideTimeout);
        }
      }, {
        key: "detectScrolling",
        value: function detectScrolling() {
          var _this4 = this;
          if (this.scrolling) return;
          this.scrolling = true;
          this.handleScrollStart();
          this.detectScrollingInterval = setInterval(function() {
            if (_this4.lastViewScrollLeft === _this4.viewScrollLeft && _this4.lastViewScrollTop === _this4.viewScrollTop) {
              clearInterval(_this4.detectScrollingInterval);
              _this4.scrolling = false;
              _this4.handleScrollStop();
            }
            _this4.lastViewScrollLeft = _this4.viewScrollLeft;
            _this4.lastViewScrollTop = _this4.viewScrollTop;
          }, 100);
        }
      }, {
        key: "raf",
        value: function raf(callback) {
          var _this5 = this;
          if (this.requestFrame) _raf3["default"].cancel(this.requestFrame);
          this.requestFrame = (0, _raf3["default"])(function() {
            _this5.requestFrame = void 0;
            callback();
          });
        }
      }, {
        key: "update",
        value: function update(callback) {
          var _this6 = this;
          this.raf(function() {
            return _this6._update(callback);
          });
        }
      }, {
        key: "_update",
        value: function _update(callback) {
          var _props4 = this.props, onUpdate = _props4.onUpdate, hideTracksWhenNotNeeded = _props4.hideTracksWhenNotNeeded;
          var values = this.getValues();
          if ((0, _getScrollbarWidth2["default"])()) {
            var scrollLeft = values.scrollLeft, clientWidth = values.clientWidth, scrollWidth = values.scrollWidth;
            var trackHorizontalWidth = (0, _getInnerWidth2["default"])(this.trackHorizontal);
            var thumbHorizontalWidth = this.getThumbHorizontalWidth();
            var thumbHorizontalX = scrollLeft / (scrollWidth - clientWidth) * (trackHorizontalWidth - thumbHorizontalWidth);
            var thumbHorizontalStyle = {
              width: thumbHorizontalWidth,
              transform: "translateX(" + thumbHorizontalX + "px)"
            };
            var scrollTop = values.scrollTop, clientHeight = values.clientHeight, scrollHeight = values.scrollHeight;
            var trackVerticalHeight = (0, _getInnerHeight2["default"])(this.trackVertical);
            var thumbVerticalHeight = this.getThumbVerticalHeight();
            var thumbVerticalY = scrollTop / (scrollHeight - clientHeight) * (trackVerticalHeight - thumbVerticalHeight);
            var thumbVerticalStyle = {
              height: thumbVerticalHeight,
              transform: "translateY(" + thumbVerticalY + "px)"
            };
            if (hideTracksWhenNotNeeded) {
              var trackHorizontalStyle = {
                visibility: scrollWidth > clientWidth ? "visible" : "hidden"
              };
              var trackVerticalStyle = {
                visibility: scrollHeight > clientHeight ? "visible" : "hidden"
              };
              (0, _domCss2["default"])(this.trackHorizontal, trackHorizontalStyle);
              (0, _domCss2["default"])(this.trackVertical, trackVerticalStyle);
            }
            (0, _domCss2["default"])(this.thumbHorizontal, thumbHorizontalStyle);
            (0, _domCss2["default"])(this.thumbVertical, thumbVerticalStyle);
          }
          if (onUpdate) onUpdate(values);
          if (typeof callback !== "function") return;
          callback(values);
        }
      }, {
        key: "render",
        value: function render() {
          var _this7 = this;
          var scrollbarWidth = (0, _getScrollbarWidth2["default"])();
          var _props5 = this.props, onScroll = _props5.onScroll, onScrollFrame = _props5.onScrollFrame, onScrollStart = _props5.onScrollStart, onScrollStop = _props5.onScrollStop, onUpdate = _props5.onUpdate, renderView = _props5.renderView, renderTrackHorizontal = _props5.renderTrackHorizontal, renderTrackVertical = _props5.renderTrackVertical, renderThumbHorizontal = _props5.renderThumbHorizontal, renderThumbVertical = _props5.renderThumbVertical, tagName = _props5.tagName, hideTracksWhenNotNeeded = _props5.hideTracksWhenNotNeeded, autoHide = _props5.autoHide, autoHideTimeout = _props5.autoHideTimeout, autoHideDuration = _props5.autoHideDuration, thumbSize = _props5.thumbSize, thumbMinSize = _props5.thumbMinSize, universal = _props5.universal, autoHeight = _props5.autoHeight, autoHeightMin = _props5.autoHeightMin, autoHeightMax = _props5.autoHeightMax, style = _props5.style, children = _props5.children, props = _objectWithoutProperties(_props5, ["onScroll", "onScrollFrame", "onScrollStart", "onScrollStop", "onUpdate", "renderView", "renderTrackHorizontal", "renderTrackVertical", "renderThumbHorizontal", "renderThumbVertical", "tagName", "hideTracksWhenNotNeeded", "autoHide", "autoHideTimeout", "autoHideDuration", "thumbSize", "thumbMinSize", "universal", "autoHeight", "autoHeightMin", "autoHeightMax", "style", "children"]);
          var didMountUniversal = this.state.didMountUniversal;
          var containerStyle = _extends({}, _styles.containerStyleDefault, autoHeight && _extends({}, _styles.containerStyleAutoHeight, {
            minHeight: autoHeightMin,
            maxHeight: autoHeightMax
          }), style);
          var viewStyle = _extends({}, _styles.viewStyleDefault, {
            // Hide scrollbars by setting a negative margin
            marginRight: scrollbarWidth ? -scrollbarWidth : 0,
            marginBottom: scrollbarWidth ? -scrollbarWidth : 0
          }, autoHeight && _extends({}, _styles.viewStyleAutoHeight, {
            // Add scrollbarWidth to autoHeight in order to compensate negative margins
            minHeight: (0, _isString2["default"])(autoHeightMin) ? "calc(" + autoHeightMin + " + " + scrollbarWidth + "px)" : autoHeightMin + scrollbarWidth,
            maxHeight: (0, _isString2["default"])(autoHeightMax) ? "calc(" + autoHeightMax + " + " + scrollbarWidth + "px)" : autoHeightMax + scrollbarWidth
          }), autoHeight && universal && !didMountUniversal && {
            minHeight: autoHeightMin,
            maxHeight: autoHeightMax
          }, universal && !didMountUniversal && _styles.viewStyleUniversalInitial);
          var trackAutoHeightStyle = {
            transition: "opacity " + autoHideDuration + "ms",
            opacity: 0
          };
          var trackHorizontalStyle = _extends({}, _styles.trackHorizontalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
            display: "none"
          });
          var trackVerticalStyle = _extends({}, _styles.trackVerticalStyleDefault, autoHide && trackAutoHeightStyle, (!scrollbarWidth || universal && !didMountUniversal) && {
            display: "none"
          });
          return (0, _react.createElement)(tagName, _extends({}, props, { style: containerStyle, ref: function ref(_ref3) {
            _this7.container = _ref3;
          } }), [(0, _react.cloneElement)(renderView({ style: viewStyle }), { key: "view", ref: function ref(_ref4) {
            _this7.view = _ref4;
          } }, children), (0, _react.cloneElement)(renderTrackHorizontal({ style: trackHorizontalStyle }), { key: "trackHorizontal", ref: function ref(_ref5) {
            _this7.trackHorizontal = _ref5;
          } }, (0, _react.cloneElement)(renderThumbHorizontal({ style: _styles.thumbHorizontalStyleDefault }), { ref: function ref(_ref6) {
            _this7.thumbHorizontal = _ref6;
          } })), (0, _react.cloneElement)(renderTrackVertical({ style: trackVerticalStyle }), { key: "trackVertical", ref: function ref(_ref7) {
            _this7.trackVertical = _ref7;
          } }, (0, _react.cloneElement)(renderThumbVertical({ style: _styles.thumbVerticalStyleDefault }), { ref: function ref(_ref8) {
            _this7.thumbVertical = _ref8;
          } }))]);
        }
      }]);
      return Scrollbars2;
    }(_react.Component);
    exports["default"] = Scrollbars;
    Scrollbars.propTypes = {
      onScroll: _propTypes2["default"].func,
      onScrollFrame: _propTypes2["default"].func,
      onScrollStart: _propTypes2["default"].func,
      onScrollStop: _propTypes2["default"].func,
      onUpdate: _propTypes2["default"].func,
      renderView: _propTypes2["default"].func,
      renderTrackHorizontal: _propTypes2["default"].func,
      renderTrackVertical: _propTypes2["default"].func,
      renderThumbHorizontal: _propTypes2["default"].func,
      renderThumbVertical: _propTypes2["default"].func,
      tagName: _propTypes2["default"].string,
      thumbSize: _propTypes2["default"].number,
      thumbMinSize: _propTypes2["default"].number,
      hideTracksWhenNotNeeded: _propTypes2["default"].bool,
      autoHide: _propTypes2["default"].bool,
      autoHideTimeout: _propTypes2["default"].number,
      autoHideDuration: _propTypes2["default"].number,
      autoHeight: _propTypes2["default"].bool,
      autoHeightMin: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
      autoHeightMax: _propTypes2["default"].oneOfType([_propTypes2["default"].number, _propTypes2["default"].string]),
      universal: _propTypes2["default"].bool,
      style: _propTypes2["default"].object,
      children: _propTypes2["default"].node
    };
    Scrollbars.defaultProps = {
      renderView: _defaultRenderElements.renderViewDefault,
      renderTrackHorizontal: _defaultRenderElements.renderTrackHorizontalDefault,
      renderTrackVertical: _defaultRenderElements.renderTrackVerticalDefault,
      renderThumbHorizontal: _defaultRenderElements.renderThumbHorizontalDefault,
      renderThumbVertical: _defaultRenderElements.renderThumbVerticalDefault,
      tagName: "div",
      thumbMinSize: 30,
      hideTracksWhenNotNeeded: false,
      autoHide: false,
      autoHideTimeout: 1e3,
      autoHideDuration: 200,
      autoHeight: false,
      autoHeightMin: 0,
      autoHeightMax: 200,
      universal: false
    };
  }
});

// node_modules/react-custom-scrollbars-2/lib/index.js
var require_lib = __commonJS({
  "node_modules/react-custom-scrollbars-2/lib/index.js"(exports) {
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
    exports.Scrollbars = void 0;
    var _Scrollbars = require_Scrollbars();
    var _Scrollbars2 = _interopRequireDefault(_Scrollbars);
    function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : { "default": obj };
    }
    exports["default"] = _Scrollbars2["default"];
    exports.Scrollbars = _Scrollbars2["default"];
  }
});
export default require_lib();
//# sourceMappingURL=react-custom-scrollbars-2.js.map
