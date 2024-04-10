import { Box, Typography, Paper, Link} from '@mui/material';

export default function About() {
    return (
        <Box sx={{ maxWidth: 'auto', margin: 'auto', padding: 4 }}>
            <Paper sx={{ padding: 2, backgroundColor: '#e0e0e0', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography Typography variant="h2" gutterBottom sx={{ textAlign: 'center' }}>About</Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h4" gutterBottom>Class</Typography>
                    <Typography variant="body1" paragraph>
                        CS 426 Senior Project in Computer Science, Spring 2023, at UNR, CSE Department
                    </Typography>
                    <Typography variant="h5" gutterBottom>Professors</Typography>
                    <Typography variant="body1" paragraph>
                        David Feil-Seifer, Devrin Lee, Sara Davis
                    </Typography>
                    <Typography variant="h5" gutterBottom>Advisor</Typography>
                    <Typography variant="body1" paragraph>
                        Dr. Rui Hu - Assistant Professor in the Department of Computer Science & Engineering at the University of Nevada, Reno
                        Chase Carthen - Research Data Architect
                    </Typography>
                    <Typography variant="h5" gutterBottom>Group Members</Typography>
                    <Typography variant="body1" paragraph>
                        Kristian Konstantinov, Zachary Strazi, Cody Long, Jacob Ayers
                    </Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h4" gutterBottom>Main Goals and Objectives</Typography>
                    <Typography variant="body1" paragraph>
                        UPDATE THIS TEXT
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
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                    <Typography variant="h4" gutterBottom>Project Assignments</Typography>
                    <Typography variant="h5" gutterBottom>CS 425 Assignments</Typography>
                    <Typography variant="body1" paragraph>
                        <Link href="https://docs.google.com/document/d/1W6CCi4A_agyxoqVzdUJNncBaryD-oAeowiCVHtbwH9g/edit?usp=sharing" underline="hover" color="inherit">
                            {'Project Proposal Cs 425'}
                        </Link>
                        <br />
                        <Link href="https://docs.google.com/document/d/1ZcyU_OnE4O3uGQ_w1bZLcNY6LYg9MAKM5D_hJo_TdPo/edit?usp=sharing" underline="hover" color="inherit">
                            {'Part 2 Specification Cs 425'}
                        </Link>
                        <br />
                        <Link href="https://docs.google.com/document/d/1TF67I76xl00qo2x3vptkTtozCFejuSVaib4sFk2UWgE/edit?usp=sharing" underline="hover" color="inherit">
                            {'Part 3 Design Cs 425"'}
                        </Link>
                        <br />
                        <Link href="https://docs.google.com/document/d/11VJXepqo2p-x-trvIDyBMwu5-e-OyQBp9cB_MtJDbRE/edit?usp=sharing" underline="hover" color="inherit">
                            {'Part 4 Prototype Cs 425'}
                        </Link>
                        <br />
                        <Typography variant="h5" gutterBottom></Typography>
                        <Typography variant="h5" gutterBottom>CS 426 Assignments</Typography>
                        <Link href="https://docs.google.com/document/d/1K4gMTEk_Eo6HGyp4cBo4v1dEyxKpGkn65LhU0cxB_BI/edit?usp=sharing" underline="hover" color="inherit">
                            {'Part 1 Revised Project Proposal Cs 426'}
                        </Link>
                        <br />
                        <Link href="https://docs.google.com/document/d/1KJ5oG_SRqBglU2YDUMG3C2nLQ2lrvAz8b2hABUdh9O8/edit?usp=sharing" underline="hover" color="inherit">
                            {'Project Part 2: Revised Specification and Design'}
                        </Link>
                        <br />
                        <Link href="https://docs.google.com/document/d/18ucTqCq3Kz_oeOWO7RPa5KTug_7lAcLYTi-8xzEi8Hk/edit?usp=sharing" underline="hover" color="inherit">
                            {'Project Part 3: Acceptance Criteria and Testing Strategy and Plan'}
                        </Link>
                        <br />
                        <Link href="https://docs.google.com/document/d/1hfUZDyuW_Y0cR3KxJ2C0SOCGZYbtwxaO6NQaqbBujoA/edit?usp=sharing" underline="hover" color="inherit">
                            {'Project Part 4: Project Progress Demo'}
                        </Link>
                    </Typography>
                </Paper>
                <br />
                <Paper sx={{ padding: 2, backgroundColor: '#f5f5f5', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.3)'}}>
                <Typography variant="h4" gutterBottom>Problem Domain Book</Typography>
                    <Typography variant="body1" paragraph>
                        LI, J., Deng, L., Haeb-Umbach, R., & Gong, Y. (2015). Robust Automatic Speech Recognition: A Bridge to Practical Applications (1st ed.). Academic Press.
                    </Typography>
                    <Typography variant="h4" gutterBottom>Related Resources</Typography>
                    <Typography variant="body1" paragraph>
                        Abdullah, H., Rahman, M. S., Garcia, W., Warren, K., Yadav, A. S., Shrimpton, T., & Traynor, P. (2021). Hear “no evil”, see “kenansville”:<br /> Efficient and transferable black-box attacks on speech recognition and Voice Identification Systems. 2021 IEEE Symposium on Security and Privacy (SP). <a href="https://doi.org/10.1109/sp40001.2021.00009">IEEE</a>
                        <br />
                        <br />
                        Carlini N, Wagner D. Audio Adversarial Examples:<br /> Targeted Attacks on Speech-to-Text. IEEE Xplore. <a href="doi:https://doi.org/10.1109/SPW.2018.00009">IEEE</a>
                        <br />
                        <br />
                        Y. Chen, X. Yuan, J. Zhang, Y. Zhao, S. Zhang, K. Chen, and X. Wang, “Devil’s whisper:<br /> A general approach for physical adversarial attacks against commercial black-box speech recognition devices,” in 29th USENIX Security Symposium (USENIX Security 20), 2020.
                    </Typography>
                    <Typography variant="h4" gutterBottom>Related Links</Typography>
                    <Typography variant="body1" paragraph>
                        <Link href="https://github.com/kwarren9413/kenansville_attack/blob/master/README.md" underline="hover" color="inherit">
                            {'KenansVille Attack'}
                        </Link>
                        <br />
                        <Link href="https://github.com/RiskySignal/Devil-Whisper-Attack" underline="hover" color="inherit">
                            {'Devils Whisper'}
                        </Link>
                        <br />
                        <Link href="https://nicholas.carlini.com/" underline="hover" color="inherit">
                            {'Nicholas Carlini'}
                        </Link>
                        <br />
                    </Typography>
                </Paper>
            </Paper>
        </Box>
    );
}