import React from 'react';

class FullscreenButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFullscreen: false
    };
    this.toggleFullscreen = this.toggleFullscreen.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  toggleFullscreen() {
    const element = document.documentElement;
    this.props.fullScreen(!this.state.isFullscreen)
    if (!this.state.isFullscreen) {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.mozRequestFullScreen) { /* Firefox */
        element.mozRequestFullScreen();
      } else if (element.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
        element.webkitRequestFullscreen();
      } else if (element.msRequestFullscreen) { /* IE/Edge */
        element.msRequestFullscreen();
      }
      document.addEventListener('keydown', this.handleKeyPress);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {
          console.log('Unable to exit fullscreen.');
        });
      } else if (document.mozCancelFullScreen) { /* Firefox */
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) { /* Chrome, Safari and Opera */
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) { /* IE/Edge */
        document.msExitFullscreen();
      }
      document.removeEventListener('keydown', this.handleKeyPress);
    }
    this.setState(prevState => ({ isFullscreen: !prevState.isFullscreen }));
  }

  handleKeyPress(event) {
    // Prevent default behavior of Escape key and F11 key
    if (event.key === 'Escape' || event.key === 'F11') {
      // alert()
      // console.log(this.isFullscreen)
      event.preventDefault();
      this.props.fullScreen(!this.state.isFullscreen)
      // return false;
      
    }
  }

  render() {
    return (
      <div>
        {/* <h1>hi</h1> */}
        <button onClick={this.toggleFullscreen} className='bg-white px-2 p-1 rounded-md'>
          {this.state.isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
        </button>
      </div>
    );
  }
}

export default FullscreenButton;
