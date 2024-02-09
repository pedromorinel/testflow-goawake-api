const faker = require('faker');
const endpoints = require ('../integration/endpoints/endpoints.js');
const payloads = require ('../integration/payloads/payloads.js');
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwLm1vcmluZWwiLCJpc3MiOiJnb2F3YWtlLXBvcnRhbCIsImV4cCI6MTcwMzIwMjI2MDQ5OCwidXNlciI6eyJpZCI6MzE1MSwiZnVsbE5hbWUiOiJQZWRybyBNb3JpbmVsIChDZW50cmFsKSJ9fQ.PSYu3GoAjCz2_UBVISH9tjPTl18e03VQi6QfO4mHqT4'

let customerId = null
let customerName = null
let customerCnpj = null
let customerAddress = null
let customerIntegration = null
let customerChildId = null
let customerChildName = null
let equipmentId = null
let vehicleId = null
let vehicleName = null
let vehicleIntegration = null
let vehicleIdentification = null
let driverId = null
let driverIdentification = null
let driverIntegration = null


describe('CRUD GoAwake', () => {

    it('Create customer profile', () => {
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.customerProfile,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payloads.createCustomerProfile
      }).then((response) => {
        expect(response.status).to.eq(201);
        customerId = response.body.id
        customerName = response.body.name
        customerCnpj = response.body.cnpj
        customerAddress = response.body.address
        customerIntegration = response.body.integration
      })
    })

    it('Create customer', () => {
      const createCustomerWithId = {
        ...payloads.createCustomer, 
        customerProfileId: customerId
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.customer,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: createCustomerWithId
      }).then((response) => {
        expect(response.status).to.eq(201);
        customerChildId = response.body.id
        customerChildName = response.body.name
      })
    })

    it('Create user', () => {
      const createUserWithId = {
        ...payloads.createUser,
        customerChild: customerChildId,
        customer: customerId
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.user,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: createUserWithId
      }).then((response) => {
        expect(response.status).to.eq(201);
      })
    })

    it('Create contact', () => {

      const createContactWithId = {
        ...payloads.createContact,
        customerProfileId: customerId
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.contact,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: [createContactWithId]
      })
    })

    it('Read users from customer', () => {
      cy.request({
        method: 'GET',
        url: endpoints.url.baseUrl + endpoints.read.users+customerId,
        headers: {
          'Authorization': `Bearer ${token}`
        }
        }).then ((response) => {
          expect(response.status).to.eq(200);
          cy.log(JSON.stringify(response.body))
      })
    })

    it('Create risk rating', () => {
      const createRiskRatingWithId = {
        ...payloads.createRiskRating,
        customers_child_id: [customerChildId]
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.riskRating,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: createRiskRatingWithId
      }).then((response) => {
        expect(response.status).to.eq(201);
      })
    })

    it('Create equipment', () => {
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.equipment,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payloads.createEquipment
      }).then ((response) => {
        expect(response.status).to.eq(201);
        equipmentId = response.body.id
      })
    })

    it('Create treatment', () => {
      const createTreatmentWithId = {
        ...payloads.createTreatment,
        customer_id: customerId
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.treatment,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: createTreatmentWithId
      }).then ((response) => {
        expect(response.status).to.eq(200);
      })
    })

    it('Create vehicle', () => {
      const createVehicleWithId = {
        ...payloads.createVehicle[0],
        customerChildId: customerChildId
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.vehicle,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: [createVehicleWithId]
      }).then ((response) => {
        expect(response.status).to.eq(201);
        vehicleId = response.body[0].id
        vehicleName = response.body[0].name
        vehicleIdentification = response.body[0].identification
        vehicleIntegration = response.body[0].integration
        cy.log(JSON.stringify(createVehicleWithId))
        cy.log(JSON.stringify(response.body))
      })
    })

    it('Create driver', () => {
      const createDriverWithId = {
        ...payloads.createDriver[0],
        customerChildId: customerChildId
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.driver,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: [createDriverWithId]
      }).then ((response) => {
        expect(response.status).to.eq(201);
        driverId = response.body[0].id
        driverIdentification = response.body[0].identification
        driverIntegration = response.body[0].integration
        cy.log(JSON.stringify(response.body))
      })
    })

    it('Send email', () => {
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.email,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payloads.sendEmail
      }).then ((response) => {
        expect(response.status).to.eq(200);
      })
    })

    it('Create badge', () => {
      const createBadgeWithId = {
        ...payloads.createBadge,
        customerId: customerId
      }
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.create.badge,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: createBadgeWithId
      }).then ((response) => {
        expect(response.status).to.eq(201);
      })
    })

    it('Get alerts' , () => {
      cy.request({
        method: 'POST',
        url: endpoints.url.baseUrl + endpoints.read.customers,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payloads.customers
      }).then ((response) => {
        expect(response.status).to.eq(200);
      })
    })

    it('Update Edit Driver', () => {
      const editDriver = {
        ...payloads.createDriver,
        id: driverId,
        name: faker.name.firstName(),
        customerId: customerId,
        customerChildId: customerChildId,
        integration: driverIntegration,
        identification: driverIdentification,
        customerChildName: customerChildName,
        active: true,
        hasFaceRecog: false
      }
      cy.request({
        method: 'PUT',
        url: endpoints.url.baseUrl + endpoints.update.updateDriver + driverId,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: editDriver
      }).then ((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.name).to.eq(editDriver.name)
        cy.log(JSON.stringify(response.body))
      })
    })

    it('Update joinImeiOnAsset', () => {
      const joinImeiOnAsset = {
        ...payloads.joinImeiOnAsset,
        assetId: vehicleId
      }
      cy.request({
        method: 'PUT',
        url: endpoints.url.baseUrl + '//v2/equipment/' + equipmentId +'?acao=instalacao',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: joinImeiOnAsset
      }).then ((response) => {
        expect(response.status).to.eq(201);
      })
    })

    it('Update desinstallImei', () => {
      cy.request({
        method: 'PUT',
        url: endpoints.url.baseUrl + '//v2/equipment/' + equipmentId +'?acao=desinstalacao',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: payloads.desinstallImei
      }).then ((response) => {
        expect(response.status).to.eq(201);
      })
    })

    it('Update inativeVehicle', () => {
      const inativeVehicle = {
        ...payloads.inativeVehicle,
        id : vehicleId,
        name: vehicleName,
        customerId : customerId,
        identification: vehicleIdentification,
        customerChildName: customerChildName,
        integration: vehicleIntegration
      }
      cy.request({
        method: 'PUT',
        url: endpoints.url.baseUrl + '//v2/vehicle/' + vehicleId,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: inativeVehicle
      }).then ((response) => {
        expect(response.status).to.eq(200);
      })
    })

    it('Update inativeCustomerProfile', () => {
      const inativeCustomerProfile = {
        ...payloads.inativeCustomerProfile,
        id : customerId,
        name: customerName,
        cnpj: customerCnpj,
        address: customerAddress,
        integration: customerIntegration
      }
      cy.request({
        method: 'PUT',
        url: endpoints.url.baseUrl + '//v2/customersProfile/' + customerId,
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: inativeCustomerProfile
      }).then ((response) => {
        expect(response.status).to.eq(200);
      })
    })


});