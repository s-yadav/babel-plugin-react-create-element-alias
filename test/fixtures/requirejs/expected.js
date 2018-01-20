'use strict';

function loadApp() {
  require(['react', 'react-dom'], function (React, ReactDom) {
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
