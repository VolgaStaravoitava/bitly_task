import { expect, Locator, Page } from "@playwright/test";
import { AbstractPage } from "./AbstractPage";

export class MonkeyUrlPage extends AbstractPage {
    readonly page: Page

    readonly yourUrlInput: Locator

    readonly createQRCodeButton: Locator
    readonly downloadQRCodeButton: Locator

    readonly acceptCookies: Locator

    constructor(page: Page) {
        super(page)
        this.page = page

        this.yourUrlInput = page.locator('#qrcodeUrl')

        this.createQRCodeButton = page.locator('#button-create-qr-code')
        this.downloadQRCodeButton = page.locator('#button-download-qr-code-png')

        this.acceptCookies = page.locator('#onetrust-accept-btn-handler')
    }

    async open() {
        await this.page.goto(this.baseUrl)
        if (await this.acceptCookies.isVisible()) {
            await this.acceptCookies.click()
        }
    }

    async fillUrl(url: string) {
        await this.yourUrlInput.fill(url)
    }

    async clickCreateQRCode() {
        await this.createQRCodeButton.click()
    }

    async clickDownloadQRCode() {
        await this.downloadQRCodeButton.click()
    }

    async assertText(text: string) {
        const textLabel = this.page.locator(`text=${text}`).first()

        // assume that qr code should be generated up to 60 seconds 
        await expect(textLabel).toBeVisible({ timeout: 60_000 })
    }

}