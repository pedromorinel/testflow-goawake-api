const endpoints = require ('../integration/endpoints/endpoints.js');
const payloads = require ('../integration/payloads/payloads.js');
const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJwLm1vcmluZWwiLCJpc3MiOiJnb2F3YWtlLXBvcnRhbCIsImV4cCI6MTcwMzIwMjI2MDQ5OCwidXNlciI6eyJpZCI6MzE1MSwiZnVsbE5hbWUiOiJQZWRybyBNb3JpbmVsIChDZW50cmFsKSJ9fQ.PSYu3GoAjCz2_UBVISH9tjPTl18e03VQi6QfO4mHqT4'

let customerId = null
let customerChildId = null


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

    it('Read contact from customer', () => {
      cy.request({
        method: 'GET',
        url: endpoints.url.baseUrl + endpoints.read.users+customerId,
        headers: {
          'Authorization': `Bearer ${token}`
        }
        }).then ((response) => {
          expect(response.status).to.eq(200);
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
        ...payloads.createVehicle,
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
        cy.log(response.body)
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

    it('Read alerts' , () => {
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
});