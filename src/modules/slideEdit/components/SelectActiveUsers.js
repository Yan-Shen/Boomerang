import React, { Component } from 'react';
import {Avatar, Table, TableRow, TableHeader, TableBody, TableHeaderColumn, TableRowColumn, Checkbox} from 'material-ui';
import Person from 'material-ui/svg-icons/social/person';

const UserRow = ({user,toggle}) => (
	<div style={{backgroundColor: 'white', display: 'flex', alignItems: 'center'}}>
		{console.log(user)}
		<Checkbox onCheck={(e, val)=>{toggle(user.id,val)}} style={{width: '60px'}} />
		<Avatar style={{margin: '10px'}} icon={<Person />} color={'#6bada7'} backgroundColor={'#eee'} size={30} />
		<div style={{fontWeight: '600', marginLeft: '10px'}}>{user.name}</div>
	</div>
);

class SelectActiveUsers extends Component {
	constructor(props) {
		super(props);
		this.handleToggle = this.handleToggle.bind(this)
	}
	handleToggle(key, val){
		console.log('toggle',key,val)
		this.props.toggleActiveStudent(this.props.lessonId, key, val)
	}
	render() {

		return (
			<div>
				<div style={{paddingTop: '10px',display: "flex", justifyContent: "flex-start", margin: '10px', fontWeight: 800, color: '#6bada7'}}>
					Online Users
				</div>
				{this.props.users.map(user => {

						return <UserRow toggle={this.handleToggle}  user={user} />
					}
				)}
			</div>

		);
	}

}
export default SelectActiveUsers;
