const os = require('os');

let os_details={
    name:os.type(),
    architecture:os.arch(),
    platform:os.platform(),
    version:os.version(),
    release:os.release()
};

console.log(os_details);

console.log(`the server uptime ${os.uptime()} seconds`);