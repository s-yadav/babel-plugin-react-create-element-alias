'use strict';

function loadApp() {
  require.ensure(['react'], function (require) {
    var React = require('react');
    var _rce = React.createElement;
    function SampleComponent(props) {
      var name = props.name;

      return _rce(
        'div',
        { className: 'wrapper' },
        _rce(
          'span',
          { className: 'name' },
          name
        )
      );
    }
  });
}

function loadApp2() {
  require.ensure(['lib'], function (require) {
    var _require = require('lib'),
        React = _require.React,
        ReactDom = _require.ReactDom;

    var _rce = React.createElement;


    function SampleComponent(props) {
      var name = props.name;

      return _rce(
        'div',
        { className: 'wrapper' },
        _rce(
          'span',
          { className: 'name' },
          name
        )
      );
    }

    ReactDom.render(document.querySelector('#app'), _rce(SampleComponent, null));
  });
}
