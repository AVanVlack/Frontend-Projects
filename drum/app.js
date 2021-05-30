let sounds = [
    {
      keyPress: "Q",
      name: "Cymbal Crash",
      fileName: "crash_ibwfw8.wav",
      color: "rgb(225, 115, 91)"
    },
    {
      keyPress: "W",
      name: "808 Clap",
      fileName: "clap_uong14.wav",
      color: "rgb(225, 115, 91)"
    },
    {
      keyPress: "E",
      name: "808 High Tom",
      fileName: "top_zevdpr.wav",
      color: "rgb(225, 115, 91)"
    },
    {
      keyPress: "A",
      name: "808 Cow Bell",
      fileName: "cow_qns0ej.wav",
      color: "rgb(241, 177, 120)"
    },
    {
      keyPress: "S",
      name: "808 Bass Kick",
      fileName: "kick_rh27c3.wav",
      color: "rgb(241, 177, 120)"
    },
    {
      keyPress: "D",
      name: "808 Snare",
      fileName: "snare_wqh3be.wav",
      color: "rgb(241, 177, 120)"
    },
    {
      keyPress: "Z",
      name: "808 Percussion",
      fileName: "perc_ngodds.wav",
      color: "rgb(251, 222, 130)"
    },
    {
      keyPress: "X",
      name: "808 Shaker",
      fileName: "shaker_hsvge3.wav",
      color: "rgb(251, 222, 130)"
    },
    {
      keyPress: "C",
      name: "808 Hi-Hat",
      fileName: "hihat_omgzd8.wav",
      color: "rgb(251, 222, 130)"
    }
  ]
  
  let URL = "https://res.cloudinary.com/giffard/video/upload/v1621595168/Drum/"
  
  
  class Drum extends React.Component {
    constructor(){
      super()
      this.playAudio = this.playAudio.bind(this)
    }
    componentDidMount() {
        this.audio = new Audio(URL + this.props.fileName)
        this.audio.setAttribute("class", "clip")
        this.audio.setAttribute("id", this.props.keyPress)
        document.getElementById(this.props.fileName).append(this.audio)
        document.addEventListener('keydown', e => {
          if (e.key == this.props.keyPress || e.key == this.props.keyPress.toLowerCase()) {
            this.playAudio()
          }})
        this.audio.load()
    }
    playAudio() {
      this.audio.currentTime=0;
      this.audio.play()
      this.props.onPress(this.props.label)
    }
    render(){
      return(
        <button 
          className="drum-pad" 
          id={this.props.fileName} 
          onClick={this.playAudio}
          style={{backgroundColor: this.props.color}}>  {this.props.keyPress}
          </button>
       )
    }
  }
  
  class Main extends React.Component {
    constructor(){
      super()
      this.state = {lastSound: "Reactland 808"}
      this.updateDisplay = this.updateDisplay.bind(this)
    }
    updateDisplay(sound){
      this.setState({
        lastSound: sound
      })
    }
    render(){
      let pads = sounds.map(s => <Drum 
                                   fileName={s.fileName} 
                                   keyPress={s.keyPress} 
                                   label={s.name}
                                   color={s.color}
                                   onPress={this.updateDisplay}
                                   />)
      return (
        <div id="case">
                              <div><p id="display">{this.state.lastSound}</p></div>
          <div id="pad-group">{pads}</div>
        </div>
      )
    }
  }
  
  
  
  let app = document.getElementById("drum-machine")
  ReactDOM.render(<Main />, app)