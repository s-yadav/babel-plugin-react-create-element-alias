const React = require('react');

const _rce = 'something';
const obj = {_rce: 2};

function SampleComponent(props) {
  const {name} = props;
  const _rce = 'something else';
  return (
    <div className="wrapper">
      <span className="name">{name}</span>
    </div>
  )
  console.log(_rce);
}
console.log(_rce);
console.log(obj._rce);
