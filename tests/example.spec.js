const { test, expect } = require('@playwright/test');
const { Home } = require('./pages/home');



test.describe('Automation Final Excercise', () =>{ 

    test('Book Room',async ({page})=>{ 

        await page.goto('https://automationintesting.online/')

        await test.step('Navigate to Book', async () => { 
            const home = new Home(page)
            await home.navigateToBook()            
        })

        await test.step('Fill Data', async () => {
            const home = new Home(page)
            await home.fillDataForBooking()
        })

    })


    test('Contact',async ({page})=>{ 

        await page.goto('https://automationintesting.online/')

        await test.step('Contact', async () => { 
            const home = new Home(page)
            await home.sendMessage()
        })
    })

})
