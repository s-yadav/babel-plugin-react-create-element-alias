"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _rce = _react2.default.createElement;


function SampleComponent(props) {
  var name = props.name;

  return _rce(
    "div",
    { className: "wrapper" },
    _rce(
      "span",
      { className: "name" },
      name
    )
  );
}
