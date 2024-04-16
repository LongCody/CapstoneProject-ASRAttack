const {spawn} = require('child_process');

const rpi_script = spawn('python3', ['Raspberry_PI.py']);

rpi_script.stdout.on('data', (data) => {
    console.log(`${data}`);
});

rpi_script.stderr.on('data', (data) => {
    console.error(`${data}`);
});
