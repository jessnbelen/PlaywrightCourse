const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { CLIENT_RENEG_LIMIT } = require('tls');

test.describe('API List', () => {
    const ajv = new Ajv();

    test('1 - GET Store Inventory', async ({ request }) => {
        const response = await request.get('https://petstore.swagger.io/v2/store/inventory');
        //const response = await request.get(process.env.BASEURL, 'api/bla');

        test.step('1 - GET: Check status code', async () => {
            expect(response.status()).toBe(200)
        })

        
        const reponsebody = await response.json()
        console.log('1 - GET: Response', response)
        console.log('1 - GET: Response body', reponsebody)

        test.step('1 - GET: Check schema', async () => {
            const valid = ajv.validate(require('./Schema/getInventory.json'), reponsebody);
            if (!valid) {
                console.log('AJV Validation Errors:', ajv.errorsText());
            }
            expect(valid).toBe(true);
            console.log('reponsebody.pending')
        })

    })

    test('2 - POST Pet', async ({ request }) => {
 
        const response = await request.post('https://petstore.swagger.io/v2/pet',{
         data: {
                 
                     "id": 207,
                     "category": {
                       "id": 0,
                       "name": "string"
                     },
                     "name": "La lucy-fer",
                     "photoUrls": [
                       "string"
                     ],
                     "tags": [
                       {
                         "id": 0,
                         "name": "string"
                       }
                     ],
                     "status": "available"
                   
         }
        })
     
        test.step('2 - POST: Check status code', async () => {
            expect(response.status()).toBe(200)
        })

        test.step('2 - POST: Check schema', async () => {
            const reponsebody = await response.json()
            const valid = ajv.validate(require('./Schema/postPet.json'), reponsebody);
            if (!valid) {
                console.log('AJV Validation Errors:', ajv.errorsText());
            }
            expect(valid).toBe(true);
            console.log('2 - POST: New pet name is:',reponsebody.name, 'ID:', reponsebody.id)
        })
        
     })    

})
