import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
// import ItemTypes from '../ItemTypes'
import {connect} from 'react-redux'
// import {addTool} from '../store'
import RaisedButton from 'material-ui/RaisedButton';
import Toggle from 'material-ui/Toggle';
import {showChoice} from '../reducers/ChoiceShow'
import {db} from '../../../firebase'
import Settings from 'material-ui/svg-icons/action/settings'

const styles = {
  toggle: {
    width: '25%',
  },
  btnOff: {
    backgroundColor: "white",
  },
  btnOn: {
    background: "radial-gradient(circle, rgb(204, 255, 212), rgb(152, 255, 167), rgb(117, 255, 138))"
  },
  label: {
    fontSize: "13px",
    paddingLeft: "5px",
    paddingRight: "5px"
  }
};

class ToolBtn extends Component {
  constructor(props){
    super(props)
    this.handleToggle = this.handleToggle.bind(this)
  }

  handleToggle(){
    if (this.props.name === "Choice Q"){
      this.props.showChoice(this.props.currentSlideId)
      db.ref(`/selectedTools/${this.props.currentSlideId}/Choice Q/QA`).once('value')
      .then(QAs=>{
        QAs.forEach(QA=>{
          db.ref(`/selectedTools/${this.props.currentSlideId}/Choice Q/QA/${QA.key}`).update({submission: {}})
        })
      })

    db.ref(`/studentDisplay/${this.props.currentSlideId}/Choice`).once('value')
      .then(data=>{
        let choice = data.val()
        if (choice['QA']) {
          db.ref(`/studentDisplay/${this.props.currentSlideId}/Choice`).update({QA: {}})
        }
      })

    } else if (this.props.name === "Repl") {
      if (this.props.activeUsers) {
        const activeUser = this.props.activeUsers[0]
        db.ref(`slides/${this.props.currentSlideId}/${activeUser}`).update({replCode: ""})
      }
      this.props.showReplDispatcher(this.props.currentSlideId)
    }
  }

  render() {
    const {onClick, choiceStatus, inputStatus, replStatus, name, showChoice, showReplDispatcher} = this.props
    let btnStyle

    if (choiceStatus || inputStatus || replStatus) {
      btnStyle = styles.btnOn
    } else {
      btnStyle = styles.btnOff
    }

    return (


        <div style={{
          margin: '10px', display: 'flex', alignItems: "center", justifyContent: 'space-between', padding: '10px',
          boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px',
          borderRadius: "4px"

        }}>
          <Toggle
            onToggle={this.handleToggle}
            style={styles.toggle}/>
          <div>
            {name === "Choice Q" ? "Multiple Choice" : "Replit Code Block"}
          </div>
          <Settings onClick={onClick}/>
        </div>




    )
  }
}

export default ToolBtn;
