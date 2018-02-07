import React from 'react';
import {AppBar, Paper,Toolbar,ToolbarTitle, ToolbarGroup} from 'material-ui';
import {BrowserRouter as Router, Route,Link} from 'react-router-dom';
import {teal500,teal200} from 'material-ui/styles/colors';
import Face from 'material-ui/svg-icons/action/face'
import SlideEdit from '../../slideEdit/containers/SlideEdit'
import LessonList from '../components/LessonList'
import Experiment from '../../experiment/Experiment'

const Dashboard = ({createLesson,deleteLesson,lessonList,changePanel,panel}) => (
	<div>
		<Toolbar style={{height: "40px", background: teal500}}>
			<ToolbarGroup >
				<Link style={{textDecoration: 'none'}} to="/teacher"><h5 style={{width: "100px", color: teal200}}>DASHBOARD</h5></Link>
				<Link style={{textDecoration: 'none'}} to="/teacher/lessons"><h5 style={{width: "100px",color: teal200}}>LESSONS</h5></Link>
				<Link style={{textDecoration: 'none'}} to="/teacher/experiment"><h5 style={{width: "100px",color: teal200}}>EXPERIMENT</h5></Link>
			</ToolbarGroup>
			<Face onClick={changePanel} style={{height: "30px",width: "30px",  color: panel ? 'white' : teal200}}/>
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
			<Route
				path={'/teacher/experiment'}
				component={Experiment}
			/>
		</div>
	</div>
);

export default Dashboard;
