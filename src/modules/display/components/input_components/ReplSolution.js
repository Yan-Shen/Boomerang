import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/terminal';
import 'brace/theme/xcode';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'

import ItemTypes from '../../../../ItemTypes'
import replSolutionShare, {shareReplSolution} from '../../reducers/replSolutionShare'
import HelloEmbed from '../../../slideEdit/components/overlayComponents/runkit'

const boxSource = {
	beginDrag(props) {
		return {
      value: props.value,
      replSolutionShare: props.shareReplSolution
		}
	},

	endDrag(props, monitor) {

		const item = monitor.getItem()
		const dropResult = monitor.getDropResult()

		if (dropResult) {
      // let currentSlideId = props.currentSlideId
      console.log('props----------', props)
      props.shareReplSolution(props.currentSlideId, props.value)
      // eslint-disable-line no-alert
      // props.addTool(item.name, currentSlideId)
		}
	}
}

const collect = (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
})

const style = {
  regular: {
      borderStyle: "solid",
      borderRadius: "8px",
      borderWidth: "1px",
      borderColor: "black"
  },
  active: {
    borderStyle: "solid",
    borderRadius: "8px",
    borderWidth: "3px",
    borderColor: "red"
  }
}

class ReplSolution extends Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidUpdate(){
    if(this.props.overlay) {
      console.log('updated!!!!!!!!!!!!!!!!!!!!!!!!!!!')
      this.block.clientWidth="450px"
    }
  }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  handleChange(solution) {
    // this.setState({solution})
    if (this.props.overlay) {
      this.props.shareReplSolutionDispatcher(this.props.slideId, solution)
    } else if (this.props.userId) {
      this.props.addStudentCode(solution, this.props.slideId, this.props.userId)
    } else {
      this.props.onChange(solution)
    }
  }



  render(){
    const { isDragging, connectDragSource, QA, value, onChange, overlay, shareReplSolutionDispatcher, activeUser, userId, userType } = this.props
    let editorWidth, editorHeight, editorMode, editorFontSize, editorStyle

    if(activeUser && userId && (activeUser === userId) ) {
      editorStyle = style.active
    } else {
      editorStyle = style.regular
    }

    editorMode = "xcode"
    if(overlay) {
      editorWidth = "500px"
      editorHeight = "600px"
      editorFontSize = "1em"
    } else if (userType === "student"){
      editorWidth = "350px"
      editorHeight = "300px"
      editorFontSize = "0.8em"
    } else {
      editorWidth= "300px"
      editorHeight= "150px"
      editorFontSize = "0.5em"
    }


    return connectDragSource(
      <div style={{display: "flex"}}>
      {!this.props.overlay &&
        <AceEditor
        mode="javascript"
        theme={editorMode}
        width = {editorWidth}
        height = {editorHeight}
        value ={value}
        fontSize={editorFontSize}
        onChange={this.handleChange}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        style={editorStyle}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: false,
          showLineNumbers: true,
          tabSize: 2,
          }}
        name="UNIQUE_ID_OF_DIV"
        editorProps={{$blockScrolling: true}}
      />
      }

        {
          this.props.overlay &&
          <HelloEmbed value ={value} ref={block=>this.block=block}/>
        }

      </div>
    )
  }

}

export default DragSource(ItemTypes.BOX, boxSource, collect)(ReplSolution);


