import React, { useEffect } from 'react';
import Plyr from 'plyr';
import 'plyr/dist/plyr.css';

/*
function Video(props) {
  let player = null

  useEffect(() => {
    if (!player) {
      player = new Plyr(`#${props.id}`);
    }

    return () => {
      player.destroy();
    }
  });

  return (<video {...props}>{props.children}</video>);
}*/

class Video extends React.Component {
  constructor(props) {
    super(props);
    this.player = null;
  }

  componentDidMount() {
    this.player = new Plyr(`#${this.props.id}`);
  }

  componentWillUnmount() {
    this.player.destroy();
  }

  render() {
    return <video {...this.props}>{this.props.children}</video>
  }
}

export default Video;
