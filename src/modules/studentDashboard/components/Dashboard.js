import React from 'react';
import {AppBar, Paper,Toolbar,ToolbarTitle, ToolbarGroup} from 'material-ui';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import {lightBlue500,lightBlue200} from 'material-ui/styles/colors';
import StudentLesson from '../../studentLesson'
import LessonList from './LessonList'

const Dashboard = ({}) => (
	<div>
		<Toolbar style={{height: "40px", background: lightBlue500}}>
			<ToolbarGroup >
				<Link style={{textDecoration: 'none'}} to="/student"><h5 style={{width: "100px", color: lightBlue200}}>DASHBOARD</h5></Link>
				<Link style={{textDecoration: 'none'}} to="/student/lessons"><h5 style={{width: "100px",color: lightBlue200}}>LESSONS</h5></Link>
			</ToolbarGroup>
		</Toolbar>
		<div>
			<Route
				exact path={'/student'}
				component={LessonList}
			/>
			<Route
				path={'/student/lesson/:lessonId'}
				component={StudentLesson.containers.StudentLesson}
			/>
		</div>
	</div>
);

export default Dashboard;
