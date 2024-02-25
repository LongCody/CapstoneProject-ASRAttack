import { Box, Typography, Paper} from '@mui/material';
import { Link } from 'react-router-dom';

export default function About() {
    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5' }}>
                <Typography variant="h4" gutterBottom>Main Goals and Objectives</Typography>
                <Typography variant="body1" paragraph>
                    The current goals of this project are to create a Python script to create a Carlini-based attack using the Librispeech Train Clean 100 dataset to perturb audio files using an iterative optimization and cause a misclassification in a command given by a user. The goal will then be to apply this attack to various fine-tuned models like Wav2vec2 variations as well as Whisper and generate inferences to measure the model's accuracy in the form of word error rate and transcriptions. Afterward, the team will crosscheck the attack against Google and Amazon API to make sure that the attack will in fact work on an automatic speech recognition (ASR) device. From there a hardware set up of a Raspberry Pi 4 with a microphone and speaker is set up to listen for trigger phrases, then play adversarial examples to cause a misclassification on the ASR. Lastly, a graphical user interface (GUI) will be made that will have functionality such as showing correct or misclassified translations of audio files and stenographs. What this project is trying to achieve is a successful misclassification of commands by an ASR when it receives a user input command combined with adversarial examples.
                </Typography>
                <Typography variant="h4" gutterBottom>Intended Audience</Typography>
                <Typography variant="body1" paragraph>
                    The intended audience for this project is academia and possibly the creators and developers of a given smart voice device, though the main audience would be academia. This is because the ASR Attack model is a piece of software that when in the hands of a person with malicious intentions, could be used to facilitate and abuse the flaws within smart voice systems and manipulate a user. Though in an academic setting, our project can be extremely valuable for the future development of smart devices, possibly enabling the prevention of manipulation of the flaws within the smart devices software. But just as well this idea can explore why these exploits exist in the first place and prevent new updates of ASR software from falling into the same trap to help protect consumers of these products.
                </Typography>
                <Typography variant="h4" gutterBottom>Main Functionality and Capabilities</Typography>
                <Typography variant="body1" paragraph>
                    For this project, the main functionality is the disruption and abuse of smart voice devices through adversarial examples to see in what ways the ASR can be exploited and cause it to misclassify commands. While we are acting solely on good intentions, this idea could be used for malicious intent. From an academic standpoint, we are creating software to see what the current flaws are with a variety of smart voice devices. Mainly our project will be capable of generating Adversarial Examples that will cause a misclassification of a given command by a user to an ASR device.
                </Typography>
                <Typography variant="h4" gutterBottom>Technologies and Hardware</Typography>
                <Typography variant="body1" paragraph>
                    Virtual Studio Code is the primary platform we have used to run our scripts for our project along with Google Colab where the team runs into the issue of needing more resources, such as disk space. The main language being used for this project is Python otherwise we are using Node.js and Electron for our GUI. The main libraries we are using are Pytorch, Hugging Faces Transformers, Datasets, and Evaluate but realistically there are too many libraries in use to name them all. For our hardware setup, we will be using a Raspberry PI connected to a monitor to display our Gui and store our adversarial examples as well as a speaker and microphone for audio input and output.
                </Typography>
                <Typography variant="h4" gutterBottom>Dependability Properties</Typography>
                <Typography variant="body1" paragraph>
                    When discussing the dependability properties security and safety do not apply since this is a research-based project and not intended for consumer use but rather help to better protect consumers from attacks by understanding adversarial speech. For reliability purposes, we intend to consistently perform our transcriptions promptly as well as generate adversarial examples that cause misclassification of commands. This will be achieved by rigorously testing our adversarial examples against multiple models.
                </Typography>
            </Paper>
        </Box>
    );
}