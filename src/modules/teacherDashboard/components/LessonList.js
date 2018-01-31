import React from 'react';
import {Link} from 'react-router-dom';
import {Table,TableRow,TableHeader, TableBody,TableHeaderColumn,TableRowColumn} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete'


const LessonList = ({lessonList,deleteLesson}) => (
	<div>
		<Table>
    <TableHeader>
      <TableRow>
        <TableHeaderColumn>Lesson Title</TableHeaderColumn>
        <TableHeaderColumn>Created</TableHeaderColumn>
        <TableHeaderColumn>Remove</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody>
			{lessonList.map(lesson =>(
				<TableRow key={lesson.created}>
	        <TableRowColumn>{lesson.title}</TableRowColumn>
	        <TableRowColumn>{lesson.created}</TableRowColumn>
	        <TableRowColumn>
						<Delete onClick={()=>deleteLesson(lesson.id)}/>
					</TableRowColumn>
	      </TableRow>
			))}


    </TableBody>
  </Table>
	</div>


);

export default LessonList;
