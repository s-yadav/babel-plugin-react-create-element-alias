function loadApp() {
  import('react').then((React) => {
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
  Promise.all([import('react'), import('react-dom')]).then(([React, ReactDom]) => {
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
