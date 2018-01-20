function loadApp() {
  require.ensure(['react'], (require) => {
    const React = require('react');
    function SampleComponent(props) {
      const {name} = props;
      return (
        <div className="wrapper">
          <span className="name">{name}</span>
        </div>
      )
    }
  })
}


function loadApp2() {
  require.ensure(['lib'], (require) => {
    const {React, ReactDom} = require('lib');

    function SampleComponent(props) {
      const {name} = props;
      return (
        <div className="wrapper">
          <span className="name">{name}</span>
        </div>
      )
    }

    ReactDom.render(document.querySelector('#app'), <SampleComponent />);
  })
}
