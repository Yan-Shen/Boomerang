import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {Table,TableRow,TableHeader, TableBody,TableHeaderColumn,TableRowColumn, FloatingActionButton,Paper, TextField, RaisedButton} from 'material-ui';
import Delete from 'material-ui/svg-icons/action/delete'
import AddLesson from 'material-ui/svg-icons/av/add-to-queue'
import moment from 'moment'





class LessonList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			lessonTitle: "",
			lessonBox: false
		}
		this.handleSubmit = this.handleSubmit.bind(this)
	}
	handleSubmit(){
		if (this.state.lessonTitle){
			this.setState({lessonTitle: "", lessonBox: false})
			this.props.createLesson(this.state.lessonTitle)
		}

	}
	render() {
		const {lessonList,deleteLesson} =this.props
		return (
			<div style={{position: "relative"}}>
				<div style={{display: "flex"}}>
					<FloatingActionButton style={{marginLeft: "15px",marginTop: "15px" }} onClick={()=>this.setState({lessonBox: !this.state.lessonBox})}>
			      <AddLesson />
			    </FloatingActionButton>
					{this.state.lessonBox && (
						<Paper style={{zIndex: 500,background: "white",position: "absolute", left: '15px', top: "75px"}}>
							<div style={{display: "flex", flexDirection: 'column', margin: "15px"}}>
								<TextField
									style={{marginTop: "-10px"}}
									value={this.state.lessonTitle}
									onChange={(e,val)=> this.setState({lessonTitle: val})}
			      			floatingLabelText="Lesson Name"
			    			/>
								<RaisedButton onClick={this.handleSubmit} label="Create" primary={true} style={{marginTop: "10px"}} />
							</div>
						</Paper>
					)}
				</div>

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
			        <TableRowColumn>
								<Link to={`/teacher/lesson/${lesson.id}`}>
									{lesson.title}
								</Link>
							</TableRowColumn>
			        <TableRowColumn>{moment(lesson.created).format('llll')}</TableRowColumn>
			        <TableRowColumn>
								<Delete onClick={()=>deleteLesson(lesson.id)}/>
							</TableRowColumn>
			      </TableRow>
					))}
		    </TableBody>
		  </Table>
			</div>
		);
	}

}

export default LessonList;
