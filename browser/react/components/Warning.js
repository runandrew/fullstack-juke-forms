import React from 'react';

const Warning = (props) => {
    return (
      <div className="alert alert-warning" style={{ "display": props.isDisabled ? "block" : "none"}}>{props.warning}</div>
    );
}

export default Warning;
