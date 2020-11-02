const pkg = require('./package.json');
var device = require('./lib/device');

module.exports = ({
    pipeOut = () => {},
    log: {
        level = 'trace'
    } = {},
    remote: {
        devices = []
    }
} = {}) => {
    const pino = require('pino');
    const logger = pino({
        level,
        name: pkg.name,
        prettyPrint: true
    });
    try {
        const dev = device({
            logger,
            pipeOut,
            remote: {devices}
        });
        return dev;
    } catch (e) {
        logger.error(e);
    }
};