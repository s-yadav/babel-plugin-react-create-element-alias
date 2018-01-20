function loadApp() {
  require(['react', 'react-dom'], (React, ReactDom) => {
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
