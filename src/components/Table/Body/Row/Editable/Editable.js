import React from "react";

const editable = props => {
	if(props.keyProp === 'id') {
		return <td>
        {props.val.editable ? props.val.editable : props.val}
      </td>;
	}
	if(props.val.editable) {
		return <td>
        <input className="max-w" onChange={props.changed} value={props.val.editable} autoFocus="true" onBlur={props.blurred} onKeyDown={props.keyDown} tabIndex="0" />
      </td>;
	}
	return <td onClick={(event) => props.clicked(event, props.keyProp)}>{props.val}</td>;
}

export default editable;
