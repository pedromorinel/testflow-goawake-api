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
        customers: '/alarmsByDateInterval/customers'
    },
    update: {
        joinImeiOnAsset: '//v2/equipment/{{id_equipment}}?acao=instalacao',
        desinstallImei: '//v2/equipment/{{id_equipment}}?acao=desinstalacao',
        inativeVehicle: '//v2/vehicle/{{id_vehicle}}',
        inativeCustomerProfile: '//v2/customersProfile/{{id_customer}}'
    },
    url: {
        baseUrl: 'https://api-qa.goawakecloud.com.br/api'
    }
}



module.exports = endpoints