"use strict";

var React = require('react');

var _rce = React.createElement;
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
