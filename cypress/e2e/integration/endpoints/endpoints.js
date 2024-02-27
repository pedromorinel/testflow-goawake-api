const endpoints = {
    create: {
        customerProfile: '/v2/customersProfile/',
        customer: '/customers',
        user: '/users/',
        contact: '//contacts/',
        riskRating: '/risk-rating',
        equipment: '//v2/equipment/',
        treatment: '/treatment',
        vehicle: '/v2/vehicle/',
        driver: '//v2/driver/',
        email: '/audit/send-audit-alarm-notification-by-email/25729653',
        badge: '///v2/badge'
    },
    read: {
        users: '/users/customer-profile/',
        customers: '/alarmsByDateInterval/customers',
        heartbeat: '/v2/heartbeat/last',
        lastHeartbeatByCustomer: '/v2/heartbeat/last-heartbeat/customerChild',
        auditedAlarms: '/alarmsAuditByDateInterval/customers',
        customerProfile: '/v2/customersProfile/?active=true',
        customersActive: '/customers/customerProfile/1?activeCustomers=false',
        syncVehicles: '/assets/1/synchronizeVehiclesByCustomerChildId',
        syncDrivers: '/assets/1/synchronizeDriversByCustomerChildId',
        telemetryPositions: 'https://api-qa.goawakecloud.com.br/telemetry/positions/realtime',
        vehiclesOrDrivers: '/assets/vehiclesOrDriversByManyCustomerChilds',
        activeEquipments: '/v2/equipment/?isMaster=true&customersChild=121,124,130,145,343,4507,5397,5452,5956,6085,6086,6087,6088,6089,6090,7121,7269,7484',
        lastAlarm: '/lastAlarm',
        readRiskRating: '/risk-rating/customers-child/121'
    },
    update: {
        joinImeiOnAsset: '//v2/equipment/{{id_equipment}}?acao=instalacao',
        desinstallImei: '//v2/equipment/{{id_equipment}}?acao=desinstalacao',
        inativeVehicle: '//v2/vehicle/', // add assetId
        inativeCustomerProfile: '//v2/customersProfile/', // add customerProfileID
        updateDriver: '//v2/driver/' // add assetId
    },
    url: {
        baseUrl: 'https://api-qa.goawakecloud.com.br/api'
    }
}



module.exports = endpoints