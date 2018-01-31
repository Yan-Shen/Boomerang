import React from 'react';
import {AppBar, Paper,Toolbar,ToolbarTitle, ToolbarGroup} from 'material-ui';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import {teal500,teal200} from 'material-ui/styles/colors';

import SlideEdit from '../../slideEdit/containers/SlideEdit'
import LessonList from '../components/LessonList'

const Dashboard = ({createLesson,deleteLesson,lessonList}) => (
	<div>
		<Toolbar style={{height: "40px", background: teal500}}>
			<ToolbarGroup >
				<Link style={{textDecoration: 'none'}} to="/teacher"><h5 style={{width: "100px", color: teal200}}>DASHBOARD</h5></Link>
				<Link style={{textDecoration: 'none'}} to="/teacher/lessons"><h5 style={{width: "100px",color: teal200}}>LESSONS</h5></Link>
			</ToolbarGroup>
		</Toolbar>
		<div>
			<Route
				exact path={'/teacher'}
				render={()=><LessonList createLesson={createLesson} lessonList={lessonList} deleteLesson={deleteLesson}/>}
			/>
			<Route
				path={'/teacher/lesson/:lessonId'}
				component={SlideEdit}
			/>
		</div>
	</div>
);

export default Dashboard;
