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
import { shareYTDispatcher } from '../../../../store/index';
import { bindActionCreators } from 'redux';


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
    const { currentSlide } = this.props
    const { showYTDispatcher, shareYTDispatcher } = this.props
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div style={{display: 'flex', flexDirection: 'column', backgroundColor:'white', width:'100%', height:'100%'}}>
        <SearchBar style={{flex: 2}} onSearchTermChange={videoSearch}/>
        {
          !this.state.videos.length ? null :
          <VideoList style={{flex: 1}}
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
        }
        <RaisedButton label="Select" onClick={() => { 
          if (this.state.selectedVideo) {
            this.props.changeYouTube(this.props.currentSlide.id, this.state.selectedVideo.id.videoId)
            showYTDispatcher(this.props.currentSlide.id)
            // shareYTDispatcher(this.props.currentSlide.id, this.state.selectedVideo.id.videoId)
          }
          }} />
        <RaisedButton label="Remove Video" onClick={() => { 
          this.props.changeYouTube(this.props.currentSlide.id, '')
          }} />
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
