import "../styles.css"
import media from "./video/example.mp4"

export default function video() {
    return (
      <div className="video">
        <h1>Video</h1>
        <video src={media} width="600" height="300" controls />
      </div>
    )
}
