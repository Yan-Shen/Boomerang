import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';
import PropTypes from 'prop-types'
import { DragSource } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'
import replSolutionShare, {shareReplSolution} from '../../reducers/replSolutionShare'


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

class ReplSolution extends Component{
  constructor(props){
    super(props)
    this.handleChange = this.handleChange.bind(this)
  }

  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  handleChange(solution) {
    if (this.props.overlay) {
      this.props.shareReplSolutionDispatcher(this.props.slideId, solution)
    } else if (this.props.userId) {
      this.props.addStudentCode(solution, this.props.slideId, this.props.userId)
    } else {
      this.props.onChange()
    }
  }

  render(){
    const { isDragging, connectDragSource, QA, value, onChange, overlay, shareReplSolutionDispatcher } = this.props
    let editorWidth, editorHeight
    overlay ? editorWidth = "500px" : editorWidth= "350px"
    overlay ? editorHeight = "600px" : editorHeight= "350px"
    return connectDragSource(
      <div>
        <AceEditor
          mode="javascript"
          theme="xcode"
          width = {editorWidth}
          height = {editorHeight}
          value ={value}
          onChange={this.handleChange}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
          style={{borderStyle: "solid",
          borderRadius: "8px", borderWidth: "1px",
          borderColor: "black"}}
          setOptions={{
            enableBasicAutocompletion: true,
            enableLiveAutocompletion: true,
            enableSnippets: false,
            showLineNumbers: true,
            tabSize: 2,
            }}
          name="UNIQUE_ID_OF_DIV"
          editorProps={{$blockScrolling: true}}
        />,
      </div>
    )
  }

}

export default DragSource(ItemTypes.BOX, boxSource, collect)(ReplSolution);
