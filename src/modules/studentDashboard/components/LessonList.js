import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Table,TableRow,TableHeader, TableBody,TableHeaderColumn,TableRowColumn, FloatingActionButton,Paper, TextField, RaisedButton} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete'
import AddLesson from 'material-ui/svg-icons/av/add-to-queue'
import moment from 'moment'





class LessonList extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		const {lessonList} = this.props
		return (
				<Table>
			    <TableHeader>
			      <TableRow>
			        <TableHeaderColumn>Lesson Title</TableHeaderColumn>
			        <TableHeaderColumn>Created</TableHeaderColumn>
			      </TableRow>
			    </TableHeader>
		    <TableBody >
					{lessonList.map(lesson =>(
						<TableRow style={{fontSize: '18px',fontWeight: 600}} key={lesson.created}>
			        <TableRowColumn>
								<Link to={`/student/lesson/${lesson.id}`}>
									{lesson.title}
								</Link>
							</TableRowColumn>
			        <TableRowColumn>{moment(lesson.created).format('llll')}</TableRowColumn>
			      </TableRow>
					))}
		    </TableBody>
		  </Table>
		);
	}

}

export default LessonList;
