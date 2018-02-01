import React from 'react';
import TextField from 'material-ui/TextField';
import brace from 'brace';
import AceEditor from 'react-ace';
import 'brace/mode/javascript';
import 'brace/theme/monokai';

function ReplSolution (props) {
  return (
    <div>
      {/* <TextField
      hintText="CODE SOLUTION"
      value ={props.value}
      onChange={props.onChange}
      multiLine={true}
      rows={3}
    /> */}
      <AceEditor
        mode="javascript"
        theme="monokai"
        width = "500px"
        height = "420px"
        value ={props.value}
        onChange={props.onChange}
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

export default ReplSolution;
