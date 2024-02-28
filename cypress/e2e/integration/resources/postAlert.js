const QUEUE_NAME = 'alarm-response';
const { publishMessage } = require('./message_sender');
const { alarmObjMessage } = require('./objects_gen');
const { DateTime, Settings } = require('luxon');
const { Client } = require('pg');

const defaultZoneName = 'America/Sao_Paulo';
Settings.defaultZoneName = defaultZoneName;

async function main() {

  const client = new Client({
    host: '10.1.2.131',
    port: 15472,
    user: 'postgres',
    password: 'focuss3cr3t',
    database: 'focus',
  });
  
  client.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conectado ao banco de dados PostgreSQL');
  
    const selectQuery = 'SELECT e.identification FROM equipament e JOIN asset a ON e.asset_id = a.id WHERE a.customer_child_id IN (SELECT id FROM customer WHERE customer_id = 1) AND e.equipment_type_id IN (3, 2, 1, 11) ORDER BY RANDOM() LIMIT 1;';
    client.query(selectQuery, async (queryErr, result) => {
      if (queryErr) {
        console.error('Erro ao executar a consulta:', queryErr);
        client.end();
        return;
      }
  
      if (result.rows.length > 0) {
        const identificationValue = result.rows[0].identification;
        console.log(`Valor da coluna identification: ${identificationValue}`);

        try {
          const date = DateTime.now();
          const currentDate = date.toFormat("yyyy-MM-dd'T'HH:mm:ssZZ");
  
          const alertas = await alarmObjMessage(identificationValue, currentDate, 1, 1, 2);
  
          if (Array.isArray(alertas)) {
            for (const alarm_object of alertas) {
              try {
                publishMessage( {
                  alarms: [
                    {
                      type: 2,
                      dateTime: currentDate,
                      latitude: -6.422131,
                      longitude: -49.954813,
                      speed: 31.0,
                      urlMovie: 'https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grkocmhf7oyf/b/JimiObjects/o/EVENT_862798050671540_00000000_2023_05_23_12_42_32_12.mp4',
                      urlPicture: 'https://objectstorage.sa-saopaulo-1.oraclecloud.com/n/grkocmhf7oyf/b/JimiObjects/o/EVENT_862798050671540_00000000_2023_05_23_12_42_32_12.png',
                    },
                  ],
                  device: {
                    deviceId: identificationValue
                  }
                }, QUEUE_NAME);
                console.log(`\nALERTA PARA O IMEI ${identificationValue} PUBLICADO EM QA`);
              } catch (error) {
                console.error(error);
              }
            }
          } else {
            console.error('Erro ao obter alertas. Verifique se a função alarmObjMessage está retornando um array.');
          }
        } catch (error) {
          console.error(error);
        }
  
        client.end();
      } else {
        console.log('Nenhum resultado encontrado.');
        client.end();
      }
    });
  });
}

main();
