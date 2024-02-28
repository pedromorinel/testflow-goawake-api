const amqp = require('amqplib');
const { differenceInMinutes, addMinutes } = require('date-fns');
const _ = require('lodash');
const { DateTime } = require('luxon');

const hbObject = {
  imei: 'x',
  dateTime: 'x',
};

const alarmObject = {
  alarms: [
    {
      type: 2,
      dateTime: 'x',
      latitude: -6.422131,
      longitude: -49.954813,
      speed: 31.0,
      urlMovie:
        'https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grkocmhf7oyf/b/JimiObjects/o/EVENT_862798050671540_00000000_2023_05_23_12_42_32_12.mp4',
      urlPicture:
        'https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grkocmhf7oyf/b/JimiObjects/o/EVENT_862798050671540_00000000_2023_05_23_12_42_32_12.png',
    },
  ],
  device: {
    deviceId: 'x',
  },
};

function hb_obj_message(imei, initialDate, hbAmount) {
  const times = Array.from({ length: hbAmount }, (_, index) =>
    addMinutes(initialDate, index * 5)
  );
  const objList = times.map((datetime) => {
    const a = datetime.toISOString();
    const hbCopy = _.cloneDeep(hbObject);
    hbCopy.dateTime = a;
    hbCopy.imei = imei;
    return hbCopy;
  });
  return objList;
}

function alarmObjMessage(imei, initialDate, alarmAmount, freq, typeAlarm) {
  if (alarmAmount > 1) {
    const times = Array.from({ length: alarmAmount }, (_, index) =>
      addMinutes(initialDate, index * freq)
    );
    const objList = times.map((datetime) => {
      const a = datetime.toISOString();
      const clonedAlarmObject = _.cloneDeep(alarmObject);
      clonedAlarmObject.alarms[0].dateTime = a;
      clonedAlarmObject.alarms[0].type = parseInt(typeAlarm, 10);
      clonedAlarmObject.device.deviceId = imei;
      return clonedAlarmObject;
    });
    return objList;
  } else {
    const clonedAlarmObject = _.cloneDeep(alarmObject);
    clonedAlarmObject.alarms[0].dateTime = initialDate;
    clonedAlarmObject.alarms[0].type = parseInt(typeAlarm, 10);
    clonedAlarmObject.device.deviceId = imei;
    return [clonedAlarmObject];
  }
}

module.exports = {
  hb_obj_message,
  alarmObjMessage,
};
