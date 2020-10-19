export default class extends React.Component {

  static async getInitialProps({ query }) {

    let id = query.id;

    let [reqAudio] = await Promise.all([
      fetch(`https://api.audioboom.com/audio_clips/${id}.mp3`),
    ])

    let dataAudio = await reqAudio.json();
    let audio = dataAudio.body.audio_clip;

    return { audio }

  }

  render() {
    const { audio } = this.props;
    return (
      <div>
        <div>
          <img src={audio.urls.post_image.original} alt={audio.title}/>
        </div>
        <div>
          <h3>{audio.title}</h3>
          <audio controls>
            <source src={audio.urls.high_mp3} type="audio/mpeg" />
            Your browser does not support the audio tag.
          </audio>
        </div>
      </div>
    );
  }

}