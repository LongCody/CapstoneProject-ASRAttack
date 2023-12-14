import "../styles.css"

export default function Home() {
    return (
        //Home page assests
        <div className="home">
            <h1>ASR Attack</h1>
            <p>Technology has advanced vastly over the past 20 years to the point where many devices take advantage of smart voice technology, from phones to physical devices which sit in your home and provide help with different tasks. These devices rely on Automatic Speech Recognition (ASR) to identify key words and phrases which trigger their functionality. In this project the aim is to create Adversarial Examples (AE) which can be injected during an auditory command given to these smart voice devices and cause it to misclassify the given command. This is started by creating a model that would first translate audio files to make sure the correct input is received into the ASR, then noise will be added to the audio files until the ASR has a misclassified command. From here the team would create the AE’s to be used in further real-world attacks on the system. To deliver the attacks, the team plans on using a Raspberry Pi device to listen for the trigger phrase and play the AE. The ASR device will then receive the user input and misclassify the command.</p>
        </div>
    )
}
