import React from "react";
import socketIOClient from "socket.io-client";
// import ReactDOM from 'react-dom';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faMusic, faClock, faQuestionCircle, faSkull } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import moment from 'moment';
import audioPlayer from './audioPlayer';
import { streamlabs } from './tokens'

let baseUrl;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code
  baseUrl = 'http://localhost:3000';
} else {
  // production code
  baseUrl = 'http://localhost:9050';
}

class Carosel extends React.Component {
  constructor(props){
    console.log('struct');
    super(props);
    this.state = { animationState: "fadeIn", alertAnimationState: "non" };
    this.values = [];
    this.alerts = [];
    this.alertInterval = 0;
    this.boxIterator = 0;

    this.getActivePony = () => {
      if (!this.values[this.boxIterator]) return;

      return this.values[this.boxIterator]();
    };

    this.getActiveAlert = () => { return; };

    this.handleAlert = (alertText) => {
      this.alerts.push(alertText);
      if (this.alertInterval !== 0) {
        return;
      }

      this.setState({ dropState: "dropOut", alertAnimationState: "slideIn", followText: this.alerts.shift() });
      audioPlayer();
      this.alertInterval = setInterval(() => {
        if (this.alerts.length) {
          let nextAlert = this.alerts.shift();
          this.setState({alertAnimationState: "slideOut"});
          setTimeout(() => {
            this.setState({alertAnimationState: "slideIn", followText: nextAlert});
            audioPlayer();
          }, 1000)
        } else {
          this.setState({alertAnimationState: "slideOut", dropState: "dropIn", });
          clearInterval(this.alertInterval);
          this.alertInterval = 0;
        }
      }, 1000 * 10)

    }
  }

  componentDidMount() {
    console.log("mounted");
    this.fadeInterval = setInterval(() => {

      this.setState({ animationState: "fadeOut" });
      setTimeout(()=> {
        this.boxIterator++;

        if (this.boxIterator > this.values.length-1) {
          this.boxIterator = 0;
        }
        this.setState({ animationState: "fadeIn" });
      }, 1000);


    }, 10 * 1000); 

    const socket = socketIOClient(baseUrl);
    socket.on("DATAUPDATE", oData => {
      if (!oData.length) {
        return;
      }
      //setResponse(data);
      let data = JSON.parse(oData)
      console.log(data)

      this.values = [];
      this.boxIterator = 0;

      this.values.push(() => <Pony textValue={data.twitter} icon={faTwitter} />);
      this.values.push(() => <Pony textValue={data.nowPlaying} icon={faGamepad} />);
      this.values.push(() => <Pony textValue={data.info} icon={faQuestionCircle} />);

      if (data.showMusic) {
        this.values.push(() => <MusicPony currentSong={this.state.currentSong}/>);
      }
      if (data.showClock) {
          this.values.push(() => <ClockPony/>);
      }
    });

    socket.on("NEWSONG", data => {
      //setResponse(data);
      if (this.state.currentSong !== data) this.setState({ currentSong: data });

      console.log(data)
    });

    const socketToken = streamlabs;
    const streamlabsSocket = socketIOClient(`https://sockets.streamlabs.com?token=${socketToken}`, {transports: ['websocket']});
    
    //Perform Action on event
    streamlabsSocket.on('event', (eventData) => {
      if (!eventData.for && eventData.type === 'donation') {
        //code to handle donation events
        console.log(eventData.message);
      }
      if (eventData.for === 'twitch_account') {
        switch(eventData.type) {
          case 'follow':
            //code to handle follow events
            console.log(eventData.message);
            this.handleAlert(`${eventData.message[0].name} has just followed!`);
            break;
          case 'subscription':
            //code to handle subscription events
            console.log(eventData.message);
            break;
          case 'host':
            this.handleAlert(`${eventData.message[0].name} has hosted with ${eventData.message[0].viewers} viewers!`);
            //code to handle subscription events
            console.log(eventData.message);
            break;
          case 'raid':
            //code to handle subscription events
            this.handleAlert(`${eventData.message[0].name} has raided with ${eventData.message[0].raiders} viewers!`);
            console.log(eventData.message);
            break;
          default:
            //default case
            console.log(eventData.message);
        }
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.fadeInterval);
  }

  render() {
    return (
      <div>
        <div className={"ponyWrapper " + this.state.dropState}><div className={"pony " + this.state.animationState}>{this.getActivePony()}</div></div>
        <div className={"alart " + this.state.alertAnimationState}><Pony textValue={this.state.followText} icon={faSkull} /></div>
      </div>
    );
  }
}

class Pony extends React.Component {
    render() {
      return (<span>{this.props.textValue} <FontAwesomeIcon icon={this.props.icon}  transform="shrink-3" /></span>)
    }
}

class ClockPony extends Pony {
  constructor(props){
    super(props);

    this.formatString = "MMM Do h:mm A [EST]";

    this.state = {
      curTime:  moment().format(this.formatString || '')
    }

  }

  componentDidMount() {
    this.clockInterval = setInterval(() => {
      this.setState({
        curTime: moment().format(this.formatString || '')
      })
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.clockInterval);
  }

  render(){
    return (
        <span className="clock">{this.state.curTime} <FontAwesomeIcon icon={faClock} transform="shrink-3" /></span>
    );
  }
}

class MusicPony extends Pony {
  render(){
    return (
        <span>{this.props.currentSong} <FontAwesomeIcon icon={faMusic} transform="shrink-3" /></span>
    );
  }
}

// ========================================
// 
/*
ReactDOM.render(
  <Carosel />,
  document.getElementById('root')
);
*/
export default Carosel;
