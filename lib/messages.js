var utils = require('./utils');
var constants = require('./constants');

module.exports = {
    resetSystem: () => {
        let payload = [];
        payload.push(0x00);
        return utils.buildMessage(payload, constants.MessageSystemReset);
    },

    requestMessage: (channel = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        // TODO: this is the Message Requested ID (might need to change based on device type, not sure)
        payload.push(constants.MessageCapabilities);
        return utils.buildMessage(payload, constants.MessageChannelRequest);

    },

    setNetworkKey: () => {
        let payload = [];
        payload.push(constants.DefaultNetworkNumber);
        payload.push(0xB9);
        payload.push(0xA5);
        payload.push(0x21);
        payload.push(0xFB);
        payload.push(0xBD);
        payload.push(0x72);
        payload.push(0xC3);
        payload.push(0x45);
        return utils.buildMessage(payload, constants.MessageNetworkKey);
    },

    assignChannel: (channel = 0, type = 'receive') => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel))
        if (type === 'receive') {
            payload.push(constants.ChannelTypeTwowayReceive);
        } else {
            payload.push(constants.ChannelTypeTwowayTransmit);
        }
        payload.push(constants.DefaultNetworkNumber);
        return utils.buildMessage(payload, constants.MessageChannelAssign);
    },


    setDevice: (channel = 0, deviceID = 0, deviceType = 0, transmissionType = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        payload = payload.concat(utils.intToLEHexArray(deviceID, 2));
        payload = payload.concat(utils.intToLEHexArray(deviceType));
        payload = payload.concat(utils.intToLEHexArray(transmissionType));
        return utils.buildMessage(payload, constants.MessageChannelId);
    },

    searchChannel: (channel = 0, timeout = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        payload = payload.concat(utils.intToLEHexArray(timeout));
        return utils.buildMessage(payload, constants.MessageChannelSearchTimeout);
    },

    setPeriod: (channel = 0, period = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        payload = payload.concat(utils.intToLEHexArray(period));
        return utils.buildMessage(payload, constants.MessageChannelPeriod);
    },

    setFrequency: (channel = 0, frequency = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        payload = payload.concat(utils.intToLEHexArray(frequency));
        return utils.buildMessage(payload, constants.MessageChannelFrequency);
    },

    openChannel: (channel = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        return utils.buildMessage(payload, constants.MessageChannelOpen);
    },


    /* Detachment methods */

    closeChannel: (channel = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        return utils.buildMessage(payload, constants.MessageChannelClose);
    },

    unassignChannel: (channel = 0) => {
        let payload = [];
        payload = payload.concat(utils.intToLEHexArray(channel));
        return utils.buildMessage(payload, constants.MessageChannelUnassign);
    }
}