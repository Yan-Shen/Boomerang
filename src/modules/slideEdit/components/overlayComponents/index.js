import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './YouTubeDisplay/video_list';
import VideoDetail from './YouTubeDisplay/video_detail';
import config from '../../../../config'
import SearchBar from './YouTubeDisplay/search_bar';
import PropTypes from 'prop-types'
import { DropTarget } from 'react-dnd'
import ItemTypes from '../../../../ItemTypes'
import {RaisedButton} from 'material-ui';


let API_KEY = config.API_KEY

const boxTarget = {
	drop() {
		return { name: 'Overlay' }
	},
}

const collect = (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
	canDrop: monitor.canDrop(),
})

// Create a new component. This compinent should produce some HTMl
class YouTubeDisplay extends Component { // YouTubeDisplay
  constructor(props) {
    super(props);

    this.state = {
       videos: [],
       selectedVideo: null
    };
    // this.videoSearch('FullStack Academy')
  }

  static propTypes = {
		connectDropTarget: PropTypes.func.isRequired,
		isOver: PropTypes.bool.isRequired,
		canDrop: PropTypes.bool.isRequired,
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
    const { canDrop, isOver, connectDropTarget, currentSlide} = this.props
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return connectDropTarget(
      <div style={{display: 'flex', flexDirection: 'column', backgroundColor:'red', width:'100%', height:'100%'}}>
        <SearchBar style={{flex: 2}} onSearchTermChange={videoSearch}/>
        {
          !this.state.selectedVideo ? null :
          <VideoDetail video={this.state.selectedVideo}/>
        }
        {
          !this.state.videos.length ? null :
          <VideoList style={{flex: 1}}
            onVideoSelect={selectedVideo => this.setState({selectedVideo})}
            videos={this.state.videos} />
        }
        <RaisedButton label="Select" onClick={() => {console.log(currentSlide.id); 
          console.log(this.state.selectedVideo.id.videoId); 
          this.props.changeYouTube(this.props.currentSlide.id, this.state.selectedVideo.id.videoId)}} />
      </div>
    );
  }
}
// Take this compoment's generated HTML and put it on the page(in the DOM)

// ReactDOM.render(<App />, document.querySelector('.container'));

export default DropTarget(ItemTypes.BOX, boxTarget, collect)(YouTubeDisplay)
