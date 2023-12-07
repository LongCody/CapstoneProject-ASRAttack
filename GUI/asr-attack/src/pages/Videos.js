import "../styles.css"
import video1 from "./videos/video1.mp4"
import video2 from "./videos/video2.mp4"
import video3 from "./videos/video3.mp4"
import video4 from "./videos/video4.mp4"

export default function videos() {
    return (
      <div className="video">
        <h1>Video 1</h1>
        <video src={video1} width="600" height="300" controls />
        <h1>Video 2</h1>
        <video src={video2} width="600" height="300" controls />
        <h1>Video 3</h1>
        <video src={video3} width="600" height="300" controls />
        <h1>Video 4</h1>
        <video src={video4} width="600" height="300" controls />
      </div>
    )
}