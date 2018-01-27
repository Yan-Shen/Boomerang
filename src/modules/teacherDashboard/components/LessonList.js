import React from 'react';
import {Link} from 'react-router-dom';


const lessons = [
	"-L3nOPjk6NFSMcJGRn4p"
]
console.log(lessons)
const LessonList = ({}) => (
	<div>
		<div>Mock Lessons</div>
		{lessons.map(lesson => <Link key={lesson} to={`/teacher/lesson/${lesson}`}>{lesson}</Link>)}
	</div>


);

export default LessonList;
