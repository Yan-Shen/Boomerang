import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import VideoList from './YouTubeDisplay/video_list';
import VideoDetail from './YouTubeDisplay/video_detail';
import config from '../../../../config'
import SearchBar from './YouTubeDisplay/search_bar';

let API_KEY = config.API_KEY

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
  
  videoSearch(term) {
    YTSearch({key: API_KEY, term: term}, (videos) => {
      this.setState({ 
        videos: videos,
        // selectedVideo: videos[0]
       });
    });

  }

  render() {
    const videoSearch = _.debounce((term) => { this.videoSearch(term) }, 300);

    return (
      <div style={{display: 'flex', flexDirection: 'column'}}>
        <SearchBar style={{flex: 2}} onSearchTermChange={videoSearch}/>
        {
          !this.state.selectedVideo ? null : 
          <VideoDetail style={{flex: 1}} video={this.state.selectedVideo}/>
        }
        { 
          !this.state.videos.length ? null :
          <VideoList style={{flex: 1}}
            onVideoSelect={selectedVideo => this.setState({selectedVideo})} 
            videos={this.state.videos} />
        }
      </div>
    );
  }
}
// Take this compoment's generated HTML and put it on the page(in the DOM)

// ReactDOM.render(<App />, document.querySelector('.container'));

export default YouTubeDisplay