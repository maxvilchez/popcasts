import Link from 'next/link';

export default class extends React.Component {

  static async getInitialProps({ query }) {

    let id = query.id;

    let [reqChannel, reqAudio] = await Promise.all([
      fetch(`https://api.audioboom.com/channels/${id}`),
      fetch(`https://api.audioboom.com/channels/${id}/audio_clips`)
    ])

    let dataChannel = await reqChannel.json();
    let channel = dataChannel.body.channel;

    let dataAudio = await reqAudio.json();
    let audios = dataAudio.body.audio_clips;

    return { channel, audios }

  }

  render() {
    const { channel, audios } = this.props;
    return (
      <div>
        
        <header>Podcasts</header>
        <h1>{channel.title}</h1>

        <h2>Ultimos Podcasts</h2>
        {
          audios.map((audio) => (
            <Link href={`/podcast?id=${audio.id}`} key={audio.id} prefetch>
              <div>{audio.title}</div>
            </Link>
          ))
        }

        <style jsx>{`
          header {
            color: #fff;
            background: #8756ca;
            padding: 15px;
            text-align: center;
          }

        `}</style>

        <style jsx global>{`
          body {
            background: #fff;
            font-family: system-ui;
            margin: 0;
          }
        `}</style>

      </div>
    )
  }
}