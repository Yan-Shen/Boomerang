import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './YouTubeSearch/video_list';
import config from '../../../../config'
import SearchBar from './YouTubeSearch/search_bar';
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'
import {connect} from 'react-redux'
import {RaisedButton} from 'material-ui';
import { showYTDispatcher } from '../../../../store/index';
// import { shareYTDispatcher } from '../../../../store/index';
import { bindActionCreators } from 'redux';
import {selectYoutube} from '../youtube/actions'


let API_KEY = config.API_KEY

// Create a new component. This compinent should produce some HTMl
class YouTubeSearch extends Component { // YouTubeSearch
  constructor(props) {
    super(props);

    this.state = {
       videos: [],
       selectedVideo: null
    };
    // this.videoSearch('FullStack Academy')
  }

  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({
        videos: videos,
        // selectedVideo: videos[0]
       });
    });

  }

  render() {
    const { currentSlide, showYTDispatcher } = this.props
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div style={{overflow: "hidden", display: 'flex', flexDirection: 'column', backgroundColor:'white', width:'100%', height:'100%'}}>
        <SearchBar style={{flex: 2}} onSearchTermChange={videoSearch}/>
        {
          !this.state.videos.length ?
          <div style={{display: 'flex', flexDirection: 'column',alignItems: 'center'}}>
            <img style={{margin: '60px', opacity: 0.4, width: "400px"}} src="/search.svg"/>
            <div style={{fontSize: "50px"}}>No videos found</div>
            <div style={{color: "#ccc",fontSize: "30px"}}>Search for videos using the text field above</div>
          </div> :
          <VideoList style={{flex: 1}}
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
        }
       {this.state.selectedVideo &&
         <div style={{display: "flex", justifyContent: 'center'}}>
           <RaisedButton primary={true} style={{height: "50px",margin: "20px",width: "300px"}} label="Select" labelStyle={{marginTop: "10px", fontSize: "25px"}} onClick={() => {selectYoutube(this.props.currentSlide.id, this.state.selectedVideo.id.videoId, true, {data: 2, time: 0})}}/>
         </div>



        }
      </div>
    )
  }
}
// Take this compoment's generated HTML and put it on the page(in the DOM)

// ReactDOM.render(<App />, document.querySelector('.container'));
const mapDispatch = dispatch => {
  return bindActionCreators({showYTDispatcher}, dispatch)
}

export default connect(null, mapDispatch)(YouTubeSearch)
