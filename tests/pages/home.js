const { test,expect} = require('@playwright/test');
const exp = require('constants');

exports.Home = class Home{
    
    // Constructor
    constructor(page){ 
        this.page = page;
        this.headerText = page.getByText('Welcome to Restful Booker Platform')
        this.btnBook = page.getByRole('button',{name:'Book this room'}).first()
    }

    // Metodo para realizar navegar a la pagina de reserva de habitación
    async navigateToBook(){
        await expect(this.headerText).toBeVisible()
        await this.btnBook.click()    
    }

    // Metodo para reservar la habitación
    async fillDataForBooking(){
        
        await this.page.getByRole("textbox" , {name: "Firstname"}).fill("Juan")
        await this.page.getByRole("textbox" , {name: "Lastname"}).fill("Perez")
        await this.page.locator('input[name="email"]').fill("juan@mailbooking.com")
        await this.page.locator('input[name="phone"]').fill("01234567890")
        await this.page.getByRole('button', { name: 'Book', exact: true }).click({force:true})
        await expect(this.page.locator('.alert')).toBeVisible()
  
    }

    // Metodo para completar el formulario de contacto
    async sendMessage(){
        await expect(this.headerText).toBeVisible()
        await this.page.getByRole("textbox" , {name: "Name"}).fill("Jess")
        await this.page.locator('#email').fill("jess@gmail.com")
        await this.page.getByRole("textbox" , {name: "Phone"}).fill("01234567890")
        await this.page.getByRole("textbox" , {name: "Subject"}).fill("Consulta")
        await this.page.getByRole("textbox" , {name: "Description"}).fill("Hola. Quisiera saber el valor de la habitación. Saludos")
        await this.page.getByRole('button',{name:'Submit'}).click()
        await expect(this.page.getByText('Thanks for getting in touch Jess!')).toBeVisible()

    }


}

