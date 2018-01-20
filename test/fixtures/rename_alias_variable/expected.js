'use strict';

var React = require('react');

var _rce = React.createElement;
var _rce2 = 'something';
var obj = { _rce: 2 };

function SampleComponent(props) {
  var name = props.name;

  var _rce3 = 'something else';
  return _rce(
    'div',
    { className: 'wrapper' },
    _rce(
      'span',
      { className: 'name' },
      name
    )
  );
  console.log(_rce3);
}
console.log(_rce2);
console.log(obj._rce);
