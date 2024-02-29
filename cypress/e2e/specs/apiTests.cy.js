const {
    faker
} = require('@faker-js/faker');
const endpoints = require('../integration/endpoints/endpoints.js');
const payloads = require('../integration/payloads/payloads.js');
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJjeXByZXNzLndvcmsiLCJpc3MiOiJnb2F3YWtlLXBvcnRhbCIsImV4cCI6MTcwOTI1ODA5MTkzNSwidXNlciI6eyJpZCI6NjQwNywiZnVsbE5hbWUiOiJjeXB0ZXN0In19.yhLRSmDmfMOXJzImwBSI7pHm5GVB-n1lZALW8bQ9Uog'
const authHeader = {
    'Authorization': `Bearer ${token}`
};

const variables = {
    customerId: null,
    customerName: null,
    customerCnpj: null,
    customerAddress: null,
    customerIntegration: null,
    customerChildId: null,
    customerChildName: null,
    equipmentId: null,
    vehicleId: null,
    vehicleName: null,
    vehicleIntegration: null,
    vehicleIdentification: null,
    driverId: null,
    driverIdentification: null,
    driverIntegration: null,
    installEquipmentURL: null,
    desintallEquipmentURL: null,
    inativeVehicleURL: null,
    inativeCustomerProfileURL: null,
    alertId: null,
    auditId: null,
    signatureId: null
}

const createRequest = (method, url, body) => {
    return cy.request({
        method,
        url,
        headers: authHeader,
        body
    });
};

describe('GoAwake API', () => {

    it('Create customer profile', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.customerProfile, payloads.createCustomerProfile).then((response) => {
            expect(response.status).to.eq(201);
            variables.customerId = response.body.id
            variables.customerName = response.body.name
            variables.customerCnpj = response.body.cnpj
            variables.customerAddress = response.body.address
            variables.customerIntegration = response.body.integration
            cy.log(JSON.stringify(response.body))
        })
    })

    it('Create customer', () => {
        const createCustomerWithId = {
            ...payloads.createCustomer,
            customerProfileId: variables.customerId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.customer, createCustomerWithId).then((response) => {
            expect(response.status).to.eq(201);
            variables.customerChildId = response.body.id
            variables.customerChildName = response.body.name
            variables.customerIntegration = response.body.integration
            variables.customerCnpj = response.body.cnpj
            variables.customerAddress = response.body.address
            variables.customerName = response.body.name
            variables.customerId = response.body.customerProfileId
        })
    })

    it('Create user', () => {
        const createUserWithId = {
            ...payloads.createUser,
            customerChild: variables.customerChildId,
            customer: variables.customerId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.user, createUserWithId).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Create contact', () => {
        const createContactWithId = {
            ...payloads.createContact,
            customerProfileId: variables.customerId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.contact, [createContactWithId]).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Create risk rating', () => {
        const createRiskRatingWithId = {
            ...payloads.createRiskRating,
            customers_child_id: [variables.customerChildId]
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.riskRating, createRiskRatingWithId).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Create equipment', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.equipment, payloads.createEquipment).then((response) => {
            expect(response.status).to.eq(201);
            variables.equipmentId = response.body.id
        })
    })

    it('Create treatment', () => {
        const createTreatmentWithId = {
            ...payloads.createTreatment,
            customer_id: variables.customerId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.treatment, createTreatmentWithId).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Create vehicle', () => {
        const createVehicleWithId = {
            ...payloads.createVehicle[0],
            customerChildId: variables.customerChildId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.vehicle, [createVehicleWithId]).then((response) => {
            expect(response.status).to.eq(201);
            variables.vehicleId = response.body[0].id
            variables.vehicleName = response.body[0].name
            variables.vehicleIdentification = response.body[0].identification
            variables.vehicleIntegration = response.body[0].integration
        })
    })

    it('Create driver', () => {
        const createDriverWithId = {
            ...payloads.createDriver[0],
            customerChildId: variables.customerChildId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.driver, [createDriverWithId]).then((response) => {
            expect(response.status).to.eq(201);
            variables.driverId = response.body[0].id
            variables.driverIntegration = response.body[0].integration
        })
    })

    it('Create badge', () => {
        const createBadgeWithId = {
            ...payloads.createBadge,
            customerId: variables.customerId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.badge, createBadgeWithId).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Create voice message', () => {
        const createVoiceMessageWithId = {
            ...payloads.createVoiceMessage,
            customerProfileId: variables.customerId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.voiceMessage, createVoiceMessageWithId).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Update driver', () => {
        const editDriver = {
            ...payloads.createDriver,
            id: variables.driverId,
            name: faker.person.firstName(),
            customerId: variables.customerId,
            customerChildId: variables.customerChildId,
            integration: variables.driverIntegration,
            identification: variables.driverIdentification,
            customerChildName: variables.customerChildName,
            active: true,
            hasFaceRecog: false
        }
        createRequest('PUT', endpoints.url.baseUrl + endpoints.update.updateDriver + variables.driverId, editDriver).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.name).to.eq(editDriver.name);
        })
    })

    it('Update install imei', () => {
        variables.installEquipmentURL = endpoints.url.baseUrl + '//v2/equipment/' + variables.equipmentId + '?acao=instalacao'
        const joinImeiOnAsset = {
            ...payloads.joinImeiOnAsset,
            assetId: variables.vehicleId
        }
        createRequest('PUT', variables.installEquipmentURL, joinImeiOnAsset).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Update desinstall Imei', () => {
        variables.desintallEquipmentURL = endpoints.url.baseUrl + '//v2/equipment/' + variables.equipmentId + '?acao=desinstalacao'
        createRequest('PUT', variables.desintallEquipmentURL, payloads.desinstallImei).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Update inative Vehicle', () => {
        variables.inativeVehicleURL = endpoints.url.baseUrl + endpoints.update.inativeVehicle + variables.vehicleId
        const inativeVehicle = {
            ...payloads.inativeVehicle,
            id: variables.vehicleId,
            name: variables.vehicleName,
            customerId: variables.customerId,
            identification: variables.vehicleIdentification,
            customerChildName: variables.customerChildName,
            integration: variables.vehicleIntegration
        }
        createRequest('PUT', variables.inativeVehicleURL, inativeVehicle).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Update inative customer profile', () => {
        variables.inativeCustomerProfileURL = endpoints.url.baseUrl + endpoints.update.inativeCustomerProfile + variables.customerId
        const inativeCustomerProfile = {
            ...payloads.inativeCustomerProfile,
            id: variables.customerId,
            name: variables.customerName,
            cnpj: variables.customerCnpj,
            address: variables.customerAddress,
            integration: variables.customerIntegration
        }
        createRequest('PUT', variables.inativeCustomerProfileURL, inativeCustomerProfile).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Read alerts', () => {
        cy.exec('node ./cypress/e2e/integration/resources/postAlert.js')
        createRequest('POST', endpoints.url.baseUrl + endpoints.read.customers, payloads.customers).then((response) => {
            expect(response.status).to.eq(200);
            variables.alertId = response.body[0].id
        })
    })

    it('Create treat alert', () => {
        const createTreatAlertWithId = {
            ...payloads.treatAlert,
            alarms: payloads.treatAlert.alarms.map(alarm => ({
                ...alarm,
                id: variables.alertId
            }))
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.treatAlert, createTreatAlertWithId).then((response) => {
            expect(response.status).to.eq(201);
            variables.auditId = response.body.id
        })
    })

    it('Create email', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.email + variables.auditId, payloads.sendEmail).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Create signature', () => {
        const createSignatureWithId = {
            ...payloads.signatureAlert,
            auditId: variables.auditId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.signature, createSignatureWithId).then((response) => {
            expect(response.status).to.eq(201);
            variables.signatureId = response.body.id
        })
    })

    it('Delete signature', () => {
        createRequest('DELETE', endpoints.url.baseUrl + endpoints.delete.signature + variables.signatureId).then((response) => {
            expect(response.status).to.eq(204);
        })
    })

    it('Create audit', () => {
        const createAuditWithId = {
            ...payloads.auditAlert,
            auditId: variables.auditId
        }
        createRequest('POST', endpoints.url.baseUrl + endpoints.create.audit, createAuditWithId).then((response) => {
            expect(response.status).to.eq(201);
        })
    })

    it('Read users from customer', () => {
        createRequest('GET', endpoints.url.baseUrl + endpoints.read.users + variables.customerId).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Read last heartbeats', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.read.heartbeat, payloads.readHeartbeats).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('vehicle_id');
        })
    })

    it('Read audited alarms', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.read.auditedAlarms, payloads.customers).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
            expect(response.body[0]).to.have.property('equipmentTypeId');
        })
    })

    it('Read customer profile', () => {
        createRequest('GET', endpoints.url.baseUrl + endpoints.read.customerProfile).then((response) => {
            expect(response.status).to.eq(200);
            expect(JSON.parse(response.body)).to.be.an('array')
        })
    })

    it('Read active customers', () => {
        createRequest('GET', endpoints.url.baseUrl + endpoints.read.customersActive).then((response) => {
            expect(response.status).to.eq(200);
            expect(JSON.parse(response.body)).to.be.an('array').that.is.not.empty;
        })
    })

    it('Read telemetry positions', () => {
        createRequest('POST', endpoints.read.telemetryPositions, payloads.telemetryPositions).then((response) => {
            expect(response.status).to.eq(200);
        })
    })

    it('Read vehicles', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.read.vehiclesOrDrivers, payloads.readVehicles).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
        })
    })

    it('Read drivers', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.read.vehiclesOrDrivers, payloads.readDrivers).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
        })
    })

    it('Read active equipments', () => {
        createRequest('GET', endpoints.url.baseUrl + endpoints.read.activeEquipments).then((response) => {
            expect(response.status).to.eq(200);
            expect(JSON.parse(response.body)).to.be.an('array').that.is.not.empty;
        })
    })

    it('Read last alarm', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.read.lastAlarm, payloads.readLastAlarm).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('inserted_on');
        })
    })

    it('Read last heartbeat by customer', () => {
        createRequest('POST', endpoints.url.baseUrl + endpoints.read.lastHeartbeatByCustomer, payloads.readLastHeartbeatByCustomer).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body[0]).to.have.property('vehicle_id');
        })
    })

    it('Read risk rating', () => {
        createRequest('GET', endpoints.url.baseUrl + endpoints.read.readRiskRating).then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body).to.be.an('array').that.is.not.empty;
        })
    })

    it('Sync vehicles', () => {
        createRequest('GET', endpoints.url.baseUrl + endpoints.read.syncVehicles).then((response) => {
            expect(response.status).to.eq(200);
            expect(JSON.parse(response.body)).to.be.an('array')
        })
    })

    it('Sync drivers', () => {
        createRequest('GET', endpoints.url.baseUrl + endpoints.read.syncDrivers).then((response) => {
            expect(response.status).to.eq(200);
            expect(JSON.parse(response.body)).to.be.an('array')
        })
    })

})