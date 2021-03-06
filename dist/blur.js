'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var stackBlurImage = require('../lib/StackBlur.js');

var ReactBlur = function (_React$PureComponent) {
  _inherits(ReactBlur, _React$PureComponent);

  function ReactBlur() {
    _classCallCheck(this, ReactBlur);

    var _this = _possibleConstructorReturn(this, (ReactBlur.__proto__ || Object.getPrototypeOf(ReactBlur)).call(this));

    _this.resize = _this.resize.bind(_this);
    return _this;
  }

  _createClass(ReactBlur, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.loadImage();
      window.addEventListener('resize', this.resize);
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      if (!this.img) {
        this.loadImage(this.props);
      } else if (!this.isCurrentImgSrc(this.props.img)) {
        this.img.src = this.props.img;
        this.setDimensions();
      } else {
        // if some other prop changed reblur
        stackBlurImage(this.img, this.canvas, this.getCurrentBlur(), this.width, this.height);
      }
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
    }
  }, {
    key: 'getCurrentBlur',
    value: function getCurrentBlur() {
      return this.props.blurRadius;
    }
  }, {
    key: 'setDimensions',
    value: function setDimensions() {
      this.height = this.container.offsetHeight;
      this.width = this.container.offsetWidth;
      this.canvas.height = this.height;
      this.canvas.width = this.width;
    }
  }, {
    key: 'isCurrentImgSrc',
    value: function isCurrentImgSrc(newSrc) {
      // Handle relative paths
      if (this.img) {
        var newImg = new Image();
        newImg.src = newSrc;
        // if absolute SRC is the same
        return newImg.src === this.img.src;
      }

      return false;
    }
  }, {
    key: 'loadImage',
    value: function loadImage() {
      var _this2 = this;

      if (this.isCurrentImgSrc(this.props.img)) {
        stackBlurImage(this.img, this.canvas, this.props.blurRadius, this.width, this.height);
        return;
      }

      this.img = new Image();
      this.img.crossOrigin = 'Anonymous';

      this.img.onload = function (event) {
        stackBlurImage(_this2.img, _this2.canvas, _this2.getCurrentBlur(), _this2.width, _this2.height);
        _this2.props.onLoadFunction(event);
      };

      this.img.onerror = function (event) {
        // Remove the onerror listener.
        // Preventing recursive calls caused by setting this.img.src to a falsey value
        _this2.img.onerror = undefined;

        _this2.img.src = '';
        _this2.props.onLoadFunction(event);
      };
      this.img.src = this.props.img;

      this.setDimensions();
    }
  }, {
    key: 'resize',
    value: function resize() {
      var _this3 = this;

      var now = new Date().getTime();
      var deferTimer = void 0;
      var threshhold = this.props.resizeInterval;

      if (this.last && now < this.last + threshhold) {
        clearTimeout(deferTimer);
        deferTimer = setTimeout(function () {
          _this3.last = now;
          _this3.doResize();
        }, threshhold);
      } else {
        this.last = now;
        this.doResize();
      }
    }
  }, {
    key: 'doResize',
    value: function doResize() {
      this.setDimensions();

      stackBlurImage(this.img, this.canvas, this.getCurrentBlur(), this.width, this.height);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          blurRadius = _props.blurRadius,
          children = _props.children,
          className = _props.className,
          enableStyles = _props.enableStyles,
          img = _props.img,
          onLoadFunction = _props.onLoadFunction,
          resizeInterval = _props.resizeInterval,
          other = _objectWithoutProperties(_props, ['blurRadius', 'children', 'className', 'enableStyles', 'img', 'onLoadFunction', 'resizeInterval']);

      var classes = 'react-blur';
      if (className) {
        classes += ' ' + className;
      }

      var containerStyle = enableStyles ? {
        position: 'relative'
      } : {};
      var canvasStyle = enableStyles ? {
        position: 'absolute',
        top: 0,
        left: 0
      } : {};

      return _react2.default.createElement(
        'div',
        _extends({
          className: classes,
          ref: function ref(_ref2) {
            _this4.container = _ref2;
          },
          style: containerStyle
        }, other),
        _react2.default.createElement('canvas', {
          className: 'react-blur-canvas',
          ref: function ref(_ref) {
            _this4.canvas = _ref;
          },
          style: canvasStyle
        }),
        children
      );
    }
  }]);

  return ReactBlur;
}(_react2.default.PureComponent);

ReactBlur.propTypes = {
  blurRadius: _propTypes2.default.number,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  enableStyles: _propTypes2.default.bool,
  img: _propTypes2.default.string.isRequired,
  onLoadFunction: _propTypes2.default.func,
  resizeInterval: _propTypes2.default.number
};
ReactBlur.defaultProps = {
  blurRadius: 0,
  children: null,
  className: '',
  enableStyles: false,
  onLoadFunction: function onLoadFunction() {},
  resizeInterval: 128
};
exports.default = ReactBlur;
