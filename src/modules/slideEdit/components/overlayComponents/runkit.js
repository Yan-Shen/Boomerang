import {db} from '../../../../firebase'
const React = require('react')
const Embed = require('react-runkit')



const helloSource = `console.log('Hello, world!')`

class HelloEmbed extends React.Component {



    render() {
        // let selectedUserCode
        // if (selectedUserObj && selectedUserObj['replCode']) {
        //   selectedUserCode = selectedUserObj.replCode
        // } else {
        //   selectedUserCode = ""
        // }
        return <Embed source={ helloSource } minHeight= "500px" id="embed"/>
    }
}

function mapStateToProps(state,props){
    const slides = state.lesson.slides
    return {
      currentUser: state.user,
      currentSlideIndex: state.lesson.currentSlide,
      currentSlide: slides[state.lesson.currentSlide],
      users: state.lesson.users,
      activeUsers: state.lesson.active,
      panel: state.lesson.panel
      // selectedUserId: state.lesson.active[0],
    };
  }

export default HelloEmbed
