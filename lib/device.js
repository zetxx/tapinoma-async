var usb = require('usb');
var messages = require('./messages');
var {
    devices,
    remoteDevices,
    ...constants
} = require('./constants');

module.exports = async({
    logger,
    pipeOut = () => {},
    remote: {
        devices: remoteDevs = []
    },
    ...args
}) => {
    logger.info('Init', args);

    const findAdapter = ({vendor, product} = {}) => {
        if (vendor && product) {
            const d = usb.findByIds(vendor, product);
            return d && {link: d, vendor, product};
        } else {
            return devices.reduce((d, devAddress) => {
                if (d) {
                    return d;
                }
                return findAdapter(devAddress);
            }, null);
        }
    }

    const findChannel = (n) => {
        const ch = deviceAdapter.remote.findIndex(({channel}) => n === channel);
        return (ch >= 0) && ch;
    };

    const write = (out) => async(buffer) => {
        return new Promise((resolve, reject) => {
            out.transfer(buffer, (err) => {
                (err && reject(err)) ||
                resolve(buffer);
            });
        });
    }

    const connect = async({
        id: deviceType,
        deviceID = 0,
        transmissionType = 0,
        period,
        channel,
        write: w,
        timeout = 255,
        frequency = 57,
        ...rest
    }) => {
        await w(messages.requestMessage(channel));
        await w(messages.setNetworkKey());
        await w(messages.assignChannel(channel, 'receive'));
        await w(messages.setDevice(channel, deviceID, deviceType, transmissionType));
        await w(messages.searchChannel(channel, timeout));
        await w(messages.setPeriod(channel, period));
        await w(messages.setFrequency(channel, frequency));
        await w(messages.openChannel(channel));
        return {
            ...rest,
            pipeOut: (data) => pipeOut({
                name: rest.name,
                channel,
                deviceType,
                deviceID
            }, data),
            deviceType,
            deviceID,
            transmissionType,
            period,
            channel,
            timeout,
            frequency,
            write: w
        };
    }

    const digestMsg = (data) => {
        const msgObject = {
            len: data.readUInt8(
                constants.BufferIndexMsgLen
            ),
            id: data.readUInt8(
                constants.BufferIndexMsgId
            ),
            channelNumber: data.readUInt8(
                constants.BufferIndexChannelNum
            ),
            data: data.readUInt8(
                constants.BufferIndexMsgData
            )
        };

        const channel = findChannel(msgObject.channelNumber);
        if (channel === false) {
            return;
        }
        const remoteDevice = deviceAdapter.remote[channel];
        logger.trace({
            ...msgObject,
            raw: [...data],
            remoteDevice: remoteDevice.name
        });

        switch (msgObject.id) {
            case constants.MessageChannelBroadcastData:
            case constants.MessageChannelAcknowledgedData:
            case constants.MessageChannelBurstData:
                remoteDevice.write(messages.requestMessage(remoteDevice.channel, constants.MessageChannelId));

                switch (remoteDevice.name) {
                    case 'heart rate':
                        let hrmPayload = data.slice(constants.BufferIndexMsgData + 4);
                        remoteDevice.pipeOut({
                            heartRate: hrmPayload.readUInt8(3)
                        });
                        break;
                    case 'cadance':
                        let cadenceTime = data.readUInt8(constants.BufferIndexMsgData + 4);
                        cadenceTime |= data.readUInt8(constants.BufferIndexMsgData + 5) << 8;

                        let cadenceCount = data.readUInt8(constants.BufferIndexMsgData + 6);
                        cadenceCount |= data.readUInt8(constants.BufferIndexMsgData + 7) << 8;

                        remoteDevice.pipeOut({cadenceTime, cadenceCount});
                        break;
                    case 'fec':
                        var fecPayload = data.slice(constants.BufferIndexMsgData);
                        if (fecPayload.readUInt8(0) === 0x19) {
                            remoteDevice.pipeOut({
                                cadence: fecPayload.readUInt8(2),
                                power: fecPayload.readUInt16LE(5)
                            });
                        }
                        break;
                }
                break;
            case constants.MessageChannelId:
                break;
            default:
                break;
        }
    };
    const open = async() => {
        deviceAdapter.link.open();
        deviceAdapter.ready = false;
        let iface = deviceAdapter.link.interfaces &&
            deviceAdapter.link.interfaces.shift &&
            deviceAdapter.link.interfaces.shift();
        deviceAdapter.iface = iface;

        if (iface.isKernelDriverActive()) {
            iface.detachKernelDriver();
        }

        iface.claim();
        const [inDirection, outDirection] = iface.endpoints;
        let inMsgQueue = [];

        deviceAdapter.write = write(outDirection);

        await deviceAdapter.write(messages.resetSystem());

        deviceAdapter.read = (force) => {
            force && (deviceAdapter.ready = true);
            if (deviceAdapter.ready) {
                inMsgQueue.map(digestMsg);
                inMsgQueue = [];
            }
        };

        inDirection.on('data', (data) => {
            inMsgQueue.push(data);
            deviceAdapter.read();
        });

        inDirection.on('error', logger.trace);
        inDirection.on('end', () => logger.trace('END'));
        inDirection.startPoll();
    }

    const deviceAdapter = findAdapter();
    if (!deviceAdapter) {
        throw new Error('No ANT adapters found');
    }

    await open();

    deviceAdapter.remote = await remoteDevs.reduce(async(
        a,
        name
    ) => {
        const r = await a;
        if (!remoteDevices[name]) {
            logger.warn(`No such remote device: ${name}`);
            return r;
        }
        return Promise.resolve(
            r.concat(
                await connect({
                    name,
                    ...remoteDevices[name],
                    channel: r.length,
                    write: deviceAdapter.write
                })
            )
        );
    }, Promise.resolve([]));
    deviceAdapter.read(true);

    return {};
}