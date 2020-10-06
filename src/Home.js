import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGamepad, faMusic } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

class Home extends React.Component {
  constructor(props){
    super(props);
    this.state = { animationState: "fadeIn" };

    this.values = [
      {text:'@ s k u l l i o n a i r e', icon: faTwitter},
      {text:'Fate/Grand Order: Battle For New York Challenge Quests', icon: faGamepad},
      {text:'No Music', icon: faMusic}
    ]

    this.boxIterator = 0;
  }

  componentDidMount() {}


  componentWillUnmount() {

  }

  render() {
  return (
      <div>This is just page 2</div>
    );
  }
}

// ========================================

export default Home;
