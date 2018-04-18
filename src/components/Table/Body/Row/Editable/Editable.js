import React from "react";

const editable = props => {
	if(props.keyProp === 'id') {
		return <td>
        {props.val.editable ? props.val.editable : props.val}
      </td>;
	}
	if (props.val.hasOwnProperty("editable")) {
    return <td>
		<input
			onChange={props.changed}
			value={props.val.editable}
			onFocus={props.focused}
			onBlur={props.blurred}
			onKeyDown={props.keyDown}
			autoFocus="true"
			className="max-w"
			tabIndex="0" />
      </td>;
  }
	return <td onClick={(event) => props.clicked(event, props.keyProp)}>{props.val}</td>;
}

export default editable;
