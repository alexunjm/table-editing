import React from 'react';

import _ from "../../../customjs/custom";

import bClasses from '../ui.css';

const classes = {
  primary: bClasses.btnPrimary
}

const button = (props) => {
    const bClassNames = _(props.type).map(type => classes[type]).join(' ');
    return <button className={bClassNames} onClick={props.clicked} >{props.children}</button>;
};

export default button;
