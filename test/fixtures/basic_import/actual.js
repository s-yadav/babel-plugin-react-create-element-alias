import React from 'react';

function SampleComponent(props) {
  const {name} = props;
  return (
    <div className="wrapper">
      <span className="name">{name}</span>
    </div>
  )
}
