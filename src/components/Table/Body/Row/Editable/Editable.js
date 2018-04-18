import React from "react";

/* import classes from '../../../Table.css'; */

const editable = props => {
	if(props.keyProp === 'id') {
		return <td>
        {props.val.editable ? props.val.editable : props.val}
      </td>;
	}
	if (props.val.hasOwnProperty("editable")) {
    return (
    <td /* className={classes.tdBorder} */>
		  <input
        onChange={props.changed}
        value={props.val.editable}
        onFocus={props.focused}
        onBlur={props.blurred}
        onKeyDown={props.keyDown}
        autoFocus="true"
        tabIndex="0" />
      </td>);
  }
	return (
    <td
      /* className={classes.tdBorder} */
      onClick={(event) => props.clicked(event, props.keyProp)}>
      {props.val}
    </td>
  );
}

export default editable;
