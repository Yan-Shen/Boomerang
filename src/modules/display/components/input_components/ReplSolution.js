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
      props.shareReplSolution(props.value)
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
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  }

  render(){
    const { isDragging, connectDragSource, QA, value, onChange } = this.props
    return connectDragSource(
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          width = "300px"
          height = "420px"
          value ={value}
          onChange={onChange}
          showPrintMargin={true}
          showGutter={true}
          highlightActiveLine={true}
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
