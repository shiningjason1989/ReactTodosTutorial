import React from 'react';
import Input from './Input';

const ESCAPE_KEY = 27;

export default class TodoItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = { editable: false };
  }

  componentDidUpdate(prevProps, prevState) {
    if (!prevState.editable && this.state.editable) {
      const node = React.findDOMNode(this.refs.editField);
      node.focus();
      node.setSelectionRange(node.value.length, node.value.length);
    }
  }

  toggleEditable() {
    this.setState({
      editable: !this.state.editable
    });
  }

  render() {
    const { content, completed, onToggle, onDelete } = this.props;

    if (this.state.editable) {
      return (
        <Input
          ref="editField"
          style={styles.editField}
          defaultValue={content}
          onSubmitEditing={(content) => {
            this.toggleEditable();
          }}
          onBlur={() => {
            this.toggleEditable();
          }}
          onKeyDown={(evt) => {
            if (evt.keyCode) {
              event.preventDefault();
              this.toggleEditable();
            }
          }} />
      );
    }

    return (
      <div style={styles.container}>
        <input
          type="checkbox"
          style={styles.checkbox}
          checked={completed}
          onChange={onToggle} />
        <label
          style={Object.assign({}, styles.content, completed && styles.completed)}
          onDoubleClick={this.toggleEditable.bind(this)}>
          {content}
        </label>
        <button
          style={styles.deleteBtn}
          onClick={onDelete}>X</button>
      </div>
    );
  }
}

TodoItem.propTypes = {
  content: React.PropTypes.string.isRequired,
  completed: React.PropTypes.bool.isRequired,
  onToggle: React.PropTypes.func.isRequired,
  onDelete: React.PropTypes.func.isRequired
};

const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 4,
    fontSize: 21
  },
  checkbox: {
    marginRight: 16,
    marginLeft: 16
  },
  content: {
    flex: 1,
    color: 'rgba(0,0,0,0.87)'
  },
  completed: {
    fontStyle: 'italic',
    fontWeight: 'lighter',
    color: 'rgba(0,0,0,0.54)',
    textDecoration: 'line-through'
  },
  deleteBtn: {
    border: 0,
    background: 'transparent',
    marginRight: 16,
    marginLeft: 16,
    paddingRight: 8,
    paddingLeft: 8,
    color: '#ff4081'
  },
  editField: {
    width: '100%'
  }
};