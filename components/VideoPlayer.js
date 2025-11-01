
import ReactPlayer from 'react-player'

export function VideoPlayer() {
    return (
        <div>
            <ReactPlayer src='/romania video.mp4' style={{ width: '100%', height: 'auto', aspectRatio: '16/9' }} width={"800px"} loop={true} playing={true} />
        </div>
    )
}
