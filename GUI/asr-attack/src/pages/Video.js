import "../styles.css"

export default function Home() {
    return (
      <div className="video">
          <h1>Video</h1>
          <video width="320" height="240" controls>
            <source src="./media/example.mp4" type="video/mp4"/>
            Your browser does not support the video tag.
          </video>
      </div>
    )
}