"use strict";

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function loadApp() {
  import('react').then(function (React) {
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
  });
}

function loadApp2() {
  Promise.all([import('react'), import('react-dom')]).then(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        React = _ref2[0],
        ReactDom = _ref2[1];

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

    ReactDom.render(document.querySelector('#app'), _rce(SampleComponent, null));
  });
}
