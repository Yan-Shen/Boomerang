import React from 'react';
import {TimelineMax,TweenMax,Linear} from "gsap";

export default class ReviewIcon extends React.Component {
  componentDidMount(){
    const {cog1,cog2,cog3,graph1,graph2,graph3,graph4} = this
    TweenMax.to(cog1, 4, {rotation:360,  transformOrigin: "50% 50%", ease: Linear.easeNone,repeat:-1})
    TweenMax.to(cog2, 3, {rotation:360,  transformOrigin: "50% 50%", ease: Linear.easeNone,repeat:-1})
    TweenMax.to(cog3, 2, {rotation:-360,  transformOrigin: "50% 50%", ease: Linear.easeNone,repeat:-1})



    let tl = new TimelineMax({repeat:-1});
    tl
    .add("startTest")
    .to(graph1, 1.5, {opacity: 0},0)
    .to(graph1, 1.5, {opacity: 1},1.5)
    .to(graph4, 1.5, {opacity: 0},1)
    .to(graph4, 1.5, {opacity: 1},2.5)
    .to(graph2, 1.5, {opacity: 0},2)
    .to(graph2, 1.5, {opacity: 1},3.5)
    .to(graph3, 1.5, {opacity: 0},3)
    .to(graph3, 1.5, {opacity: 1},4.5)
    .add('endTest')


    }


  render(){

    return(
      <svg style={{width: this.props.width}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 352.92 347.72">

        <title>review</title>
        <g id="Layer_1" >
          <circle  style={{fill:'none',stroke:'#888',strokeMiterlimit:'10',strokeWidth:"18px"}} cx="149.5" cy="149.5" r="140.5"/>
          <path ref={(ref) => {this.cog1 = ref;}}  style={{fill:'#6bada7'}} d="M196.19,253.91a4.83,4.83,0,0,1-1.49-.1c-8.52-3.47-13.2,2.5-17.95,7.63-1.16,1.25-1.2,4-1,6,1.81,15.19,1.72,13.42-12.66,17.26-1.92.51-4,1.41-5.81,1.09a13.32,13.32,0,0,1-5.57-3,6.13,6.13,0,0,1-1.74-3.52c-1.57-8.83-8.44-11-15.72-12.34-1.47-.28-3.43.75-4.85,1.65-14,8.92-10.15,10.23-22.84-2.48-6.13-6.14-6.12-6.5-1.05-13.71a13.24,13.24,0,0,1,1.73-2.44c6.46-5.7,2.12-12.11.55-17.85-.58-2.13-5-3.31-7.78-4.73-8.85-4.55-8.88-4.52-6.25-13.89,4.27-15.2,2.48-14.07,17.36-12.51,7.42.78,14.93-6.61,14.52-13.93-.76-13.63-.76-13.63,12.64-17.2,1.77-.47,3.62-1.61,5.25-1.35a15.73,15.73,0,0,1,6.16,2.85c.95.66,1.47,2.25,1.74,3.51,1.79,8.36,7.84,11.52,15.44,12.67a6.55,6.55,0,0,0,4-1,90.78,90.78,0,0,0,8.7-5.83c3.31-2.53,6.11-1.95,8.8.84,3,3.11,6,6.26,9,9.34,2.64,2.66,3.06,5.38.6,8.39a20.42,20.42,0,0,1-2,2.82c-6.68,5.68-4.89,12.53-2.7,19.39a6.72,6.72,0,0,0,2,2.59,9.31,9.31,0,0,0,2.21,1.12c14.9,7.38,13.3,4.45,9.05,20.68-.08.32-.15.65-.24,1C204.17,254.09,203.78,254.36,196.19,253.91ZM150,249.18a21.69,21.69,0,0,0,21.79-21.31c.18-11.63-9.69-21.8-21.29-21.95a21.81,21.81,0,0,0-22,21.74A21.39,21.39,0,0,0,150,249.18Z" transform="translate(-30.69 -33.29)"/>
          <path ref={(ref) => {this.cog2 = ref;}}  style={{fill:'#6bada7'}} d="M197.06,114.11c8.54.4,11.92-3.14,11.85-11.94,0-2.5,0-6.64,1.32-7.21A46.86,46.86,0,0,1,224,91.57c1-.11,2.65,3,3.54,4.87,1.74,3.59,3.2,6.88,8,7.75,3.06.56,5.22.34,7.72-1.4,7.37-5.13,7.43-5,13.76,1.49a10.53,10.53,0,0,0,1,1.07c4,3.05,4.57,6.45.71,9.92-4.34,3.9-3.88,8.61-1.91,13.08.84,1.9,3.49,3.22,5.57,4.32,6.66,3.53,6.71,3.45,4.75,10.58-.22.8-.45,1.6-.67,2.39-1.84,6.54-2.18,6.75-9.54,6.1-2.84-.25-5.22-.88-8.16,1.59-4.32,3.63-4.84,7.6-3.9,12.31.79,4-.72,6-4.52,6.76-.49.09-1,.28-1.44.39-11.28,2.45-9.28,4-14.31-6.68-1.94-4.12-9.53-6.13-13.37-3.59-8.89,5.88-6.89,6.38-15.36-1.69-3.8-3.62-4.15-6.32-.92-10.52q8.81-11.46-4.78-17.57c-4.42-2-5.73-4.59-3.91-9a22.48,22.48,0,0,0,.69-2.39C189.19,113.74,189.19,113.74,197.06,114.11Zm29.41,34.26a15.25,15.25,0,0,0,15.27-15.11,15.57,15.57,0,0,0-15.13-15.39,15.29,15.29,0,0,0-15.38,15.49A14.94,14.94,0,0,0,226.46,148.37Z" transform="translate(-30.69 -33.29)"/>
          <path ref={(ref) => {this.cog3 = ref;}}  style={{fill:'#888'}} d="M139.95,111.19c.64-2.09.72-5.44,2-6a33.53,33.53,0,0,1,11.41-2.58c1-.06,2.36,2.88,3.2,4.62,3,6.13,7.6,7.74,12.9,3.61,4.15-3.23,6.79-2.42,10,1.21,3,3.41,6,5.9,1.83,10.8-4.55,5.33-3,10.13,3.49,13.21,3.31,1.56,5.86,3.1,4,7.47-1.69,4-.91,9.55-8.25,8.57-7.65-1-11,2.44-10,10,.88,6.46-3.74,6.28-7.56,7.49s-6.51,1.27-8.37-3.23c-3.06-7.42-7.67-8.76-14-4.15-3.48,2.53-5.92,2.23-8.45-1A26.11,26.11,0,0,0,129,158c-2.27-2-2.29-3.91-.55-6.48,5.44-8,4.68-11.2-3.81-15.53-3-1.54-3.69-3.49-2.72-6.45a20,20,0,0,0,.95-3.35c.67-4.77,3.17-6.17,8-5.5C137.7,121.65,140.87,118.3,139.95,111.19Zm27.21,26a12.25,12.25,0,0,0-11.35-12.83,12.2,12.2,0,1,0,11.35,12.83Z" transform="translate(-30.69 -33.29)"/>
        </g>
        <g id="Layer_2" ref={(ref) => {this.looking = ref;}}>
          <circle  style={{fill:'#fff'}} cx="265" cy="245" r="60"/>
          <path   style={{fill:'#ffffff'}} d="M286.48,224.85c32.81-.27,59.8,26.65,60.14,60,.33,32.11-26.68,60-58.4,60.24-33.71.29-61.55-26-61.77-58.25C226.23,252,252.24,225.13,286.48,224.85Zm40.26,58.59q0-4,0-8c0-2.83,0-5.66,0-8.49,0-10.34,1.59-9.27-9.69-9.51-3.89-.09-5.28,1.17-5.22,5.14.19,12.31,0,24.63.05,36.95,0,10.22,0,10.12,10.55,9.77,3.18-.11,4.46-1.13,4.38-4.39C326.64,297.76,326.75,290.6,326.74,283.44Zm-35.54,9c0,2.33-.07,4.67,0,7,.39,10.79-2.25,9.62,10.41,9.83,3.23.05,4.47-1.19,4.4-4.4-.14-6.16-.1-12.33-.06-18.5C306,275,306.05,274.9,294.8,276a5.08,5.08,0,0,0-3.43,3.45C290.93,283.78,291.2,288.14,291.2,292.47Zm-41.57,7a27,27,0,0,1,0,4c-.71,4.71,1.37,6,5.89,5.88,9.8-.24,9.15.8,9.06-9.18,0-2.16.31-4.38-.13-6.45-.28-1.32-1.44-3.17-2.58-3.49C252.85,287.65,249.64,290.18,249.62,299.46ZM278,309.25c7.31.06,7.31.06,7.34-5.87,0-9.29,0-9.29-6.44-9.35-8.42-.07-8.5-.07-8.43,5.69C270.62,310,269.24,309.1,278,309.25Z" transform="translate(-30.69 -33.29)"/>
            <path  style={{fill:'#6bada7'}} d="M349,327.16c10.51,11.47,20.49,22.43,30.55,33.32,4.17,4.51,5.22,9.27,2.79,14.12a11.06,11.06,0,0,1-12.47,6.12,17.46,17.46,0,0,1-7.56-4.36c-10.55-9.91-20.88-20-31.59-30.4-20.7,14.16-43.14,17.84-67,10.63-17.37-5.26-31-16-40.7-31.27-20-31.51-14.07-72.22,14-97,27.39-24.22,68.48-24.8,97.2-1.52C361.51,248.94,372.59,292.29,349,327.16Zm-62.5-102.31c-34.24.28-60.25,27.13-60,62,.21,32.28,28.06,58.54,61.77,58.25,31.72-.27,58.73-28.14,58.4-60.24C346.28,251.5,319.29,224.59,286.48,224.85Z" transform="translate(-30.69 -33.29)"/>
            <rect  ref={(ref) => {this.graph1 = ref;}} style={{fill:'#888'}} x="282" y="230" width="15" height="50"/>
            <rect  ref={(ref) => {this.graph2 = ref;}} style={{fill:'#888'}} x="259" y="245" width="15" height="35"/>
            <rect  ref={(ref) => {this.graph3 = ref;}} style={{fill:'#888'}} x="236" y="225" width="15" height="55"/>
            <rect  ref={(ref) => {this.graph4 = ref;}} style={{fill:'#888'}} x="213" y="255" width="15" height="25"/>
        </g>
      </svg>

    )
  }
}
