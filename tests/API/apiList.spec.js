const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { CLIENT_RENEG_LIMIT } = require('tls');

test.describe('API List', () => {
    const ajv = new Ajv();

    test('2 - GET Store Inventory', async ({ request }) => {
        const response = await request.get('https://petstore.swagger.io/v2/store/inventory');
        //const response = await request.get(process.env.BASEURL, 'api/bla');

        test.step('Check status code', async () => {
            expect(response.status()).toBe(200)
        })

        
        const reponsebody = await response.json()
        console.log(response)
        console.log(reponsebody)

        test.step('Check schema', async () => {
            const valid = ajv.validate(require('./Schema/getInventory.json'), reponsebody);
            if (!valid) {
                console.log('AJV Validation Errors:', ajv.errorsText());
            }
            expect(valid).toBe(true);
            console.log('reponsebody.pending')
        })

    })

})
