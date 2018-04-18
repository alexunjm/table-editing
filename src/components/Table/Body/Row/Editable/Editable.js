import React from "react";

const editable = props => {
	if(props.val.editable) {
		return <td>
        <input onChange={props.changed} value={props.val.editable} autoFocus="true" onBlur={props.blurred} onKeyUp={props.keyDown} tabIndex="0" />
      </td>;
	}
	return <td onClick={(event) => props.clicked(event, props.keyProp)}>{props.val}</td>;
}

export default editable;
