// Topic to send events.
let commandsTopic = '/devices/' + Cfg.get('device.id') + '/commands';
// Topic to receive config.
let configTopic = '/devices/' + Cfg.get('device.id') + '/config';
// Topic to send state data.
let stateTopic = '/devices/' + Cfg.get('device.id') + '/state';

/**
 * Subscribe to a MQTT topic and receive config data from IoT Core.
 * FIXME: I think it´s probably improve this function
 * @configTopic (str): mqtt topic to subscribe.
 * @param {string } topic Mqtt topic.
 * @param {string} msg config message from the cloud.
 * @see https://github.com/mongoose-os-libs/mqtt/blob/master/mjs_fs/api_mqtt.js
 */
let connectMqtt = function () {
  print('Connecting to Mqtt topic: ', configTopic);
  MQTT.sub(configTopic, function (conn, topic, msg) {
    getConfigFromCloud(msg);
    board.timer.timerState = Cfg.get('board.timer.timerState');
    if (!board.timer.timerState) {
      Cfg.set({board: {timer: {onIsNext: true}}});
      applyBoardConfig();
      setOnePixel(1, purple);
    }
    applyTimerConfig();
  });
};
