import { WebDriver, By, Builder, Capabilities, until, WebElement } from "selenium-webdriver";
export class SpecPage {
    driver: WebDriver;
    url: string = 'https://www.google.com';
    searchBox: By = By.name('q')
    searchBtn: By = By.id('#tsuid_1')
    results: By = By.id('rso')
    constructor(driver: WebDriver) {
        this.driver = driver
    }


    async navigate() {
        await this.driver.get(this.url)
        await this.driver.wait(until.elementLocated(this.searchBox))
        await this.driver.wait(until.elementIsVisible(await this.driver.findElement(this.searchBox)))
    }
    async sendKeys(elementBy: By, keys) {
        await this.driver.wait(until.elementLocated(elementBy));
        return this.driver.findElement(elementBy).sendKeys(keys);
    }
    async getElement(elementBy: By): Promise<WebElement>{
        await this.driver.wait(until.elementLocated(elementBy))
        let element = await this.driver.findElement(elementBy)
        await this.driver.wait(until.elementIsVisible(element))
        return element
    }
    async setInput(elementBy: By, keys: any): Promise<void> {
        let input = await this.getElement(elementBy)
        await input.clear()
        return input.sendKeys(keys) 
    }
    async doSearch(searchTerm: string) {
        return this.setInput(this.searchBox, `${searchTerm}\n`)
    }
    async getText(elementBy: By) {
        await this.driver.wait(until.elementLocated(elementBy))
        return this.driver.findElement(elementBy).getText()
    }
    async getResults() {
        return this.getText(this.results)
    }
    
  
}