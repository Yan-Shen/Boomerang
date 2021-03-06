
const React = require('react')
const Embed = require('react-runkit')


class HelloEmbed extends React.Component {
// constructor(props){
//     super(props)
//     this.state={}
// }

    // componentDidMount(){
    //     this.embed.refs.embed.clientWidth="400px"
    // }

    render() {
        return <Embed source={ this.props.value } minHeight= "500px" id="embed"
        ref={embed=>this.embed=embed}
        onLoad={(node)=>{
            this.node=node
            node.iframe.clientWidth=600
            console.log('node.iframe.clientWidth=====', node.iframe.clientWidth)
        }}
        />
    }
}


export default HelloEmbed
