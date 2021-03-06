module.exports = {
    devices: [
        {vendor: 0x0fcf, product: 0x1009},
        {vendor: 0x0fcf, product: 0x1008}
    ],

    remoteDevices: {
        fec: {id: 17, period: 8182},
        'heart rate': {id: 120, period: 8070},
        cadence: {id: 122, period: 8086}
    },

    MessageTxSync: 0xA4,
    DefaultNetworkNumber: 0x00,

    BufferIndexMsgLen: 1,
    BufferIndexMsgId: 2,
    BufferIndexChannelNum: 3,
    BufferIndexMsgData: 4,
    BufferIndexExtMsgBegin: 12,

    // Configuration messages
    MessageChannelUnassign: 0x41,
    MessageChannelAssign: 0x42,
    MessageChannelId: 0x51,
    MessageChannelPeriod: 0x43,
    MessageChannelSearchTimeout: 0x44,
    MessageChannelFrequency: 0x45,
    MessageChannelTxPower: 0x60,
    MessageNetworkKey: 0x46,
    MessageTxPower: 0x47,
    MessageProximitySearch: 0x71,

    // Notification messages
    MessageStartup: 0x6F,

    // Control messages
    MessageSystemReset: 0x4A,
    MessageChannelOpen: 0x4B,
    MessageChannelClose: 0x4C,
    MessageChannelRequest: 0x4D,

    // Data messages
    MessageChannelBroadcastData: 0x4E,
    MessageChannelAcknowledgedData: 0x4F,
    MessageChannelBurstData: 0x50,

    // Channel event messages
    MessageChannelEvent: 0x40,

    // Requested response messages
    MessageChannelStatus: 0x52,
    // MESSAGE CHANNEL ID : 0x51,
    MessageVersion: 0x3E,
    MessageCapabilities: 0x54,
    MessageSerialNumber: 0x61,

    // Message parameters
    ChannelTypeTwowayReceive: 0x00,
    ChannelTypeTwowayTransmit: 0x10,
    ChannelTypeSharedReceive: 0x20,
    ChannelTypeSharedTransmit: 0x30,
    ChannelTypeOnewayReceive: 0x40,
    ChannelTypeOnewayTransmit: 0x50,
    RadioTxPowerMinUS20DB: 0x00,
    RadioTxPowerMinUS10DB: 0x01,
    RadioTxPower0DB: 0x02,
    RadioTxPowerPlus4DB: 0x03,
    ResponseNoError: 0x00,
    EventRxSearchTimeout: 0x01,
    EventRxFail: 0x02,
    EventTx: 0x03,
    EventTransferRxFailed: 0x04,
    EventTransferTxCompleted: 0x05,
    EventTransferTxFailed: 0x06,
    EventChannelClosed: 0x07,
    EventRxFailGoToSearch: 0x08,
    EventChannelCollision: 0x09,
    EventTransferTxStart: 0x0A,
    ChannelInWrongState: 0x15,
    ChannelNotOpened: 0x16,
    ChannelIdNotSet: 0x18,
    CloseAllChannels: 0x19,
    TransferInProgress: 0x1F,
    TransferSequenceNumberError: 0x20,
    TransferInError: 0x21,
    MessageSizeExceedsLimit: 0x27,
    InvalidMessage: 0x28,
    InvalidNetworkNumber: 0x29,
    InvalidListId: 0x30,
    InvalidScanTxChannel: 0x31,
    InvalidParameterProvided: 0x33,
    EventQueueOverflow: 0x35,
    UsbStringWriteFail: 0x70,
    ChannelStateUnassigned: 0x00,
    ChannelStateAssigned: 0x01,
    ChannelStateSearching: 0x02,
    ChannelStateTracking: 0x03,
    CapabilitiesNoReceiveChannels: 0x01,
    CapabilitiesNoTransmitChannels: 0x02,
    CapabilitiesNoReceiveMessages: 0x04,
    CapabilitiesNoTransmitMessages: 0x08,
    CapabilitiesNoAcknowledgedMessages: 0x10,
    CapabilitiesNoBurstMessages: 0x20,
    CapabilitiesNetworkEnabled: 0x02,
    CapabilitiesSerialNumberEnabled: 0x08,
    CapabilitiesPerChannelTxPowerEnabled: 0x10,
    CapabilitiesLowPrioritySearchEnabled: 0x20,
    CapabilitiesScriptEnabled: 0x40,
    CapabilitiesSearchListEnabled: 0x80,
    CapabilitiesLedEnabled: 0x01,
    CapabilitiesExtMessageEnabled: 0x02,
    CapabilitiesScanModeEnabled: 0x04,
    CapabilitiesProxSearchEnabled: 0x10,
    CapabilitiesExtAssignEnabled: 0x20,
    CapabilitiesFsAntfsEnabled: 0x40,
    TimeoutNever: 0xFF,

    // Power Paging Message IDs
    PowerPageStandardPowerOnly: 0x10,
    PowerPageTorqueEffectiveness: 0x13,
    PowerPageManufacturerInfo: 0x50,
    PowerPageProductInfo: 0x51,
    PowerPageBatteryVoltage: 0x52,
    PowerPageCalibrationRequest: 0x01
};