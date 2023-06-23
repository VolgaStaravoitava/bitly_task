import { test, expect } from '@playwright/test'
import { MonkeyUrlPage } from '../../page-objects/MonkeyUrlPage'

test.describe('UI. Download qr code tests @qr @ui', () => {

    let monkeyUrlPage: MonkeyUrlPage

    const longUrl = `https://dev.bitly.com`

    test.beforeAll(async ({ browser }) => {
        const page = await browser.newPage()

        monkeyUrlPage = new MonkeyUrlPage(page)

        page.wait
    })

    test.beforeEach(async () => {
        await monkeyUrlPage.open()
    })

    test('Verify default state of the page', async () => {
        await expect(monkeyUrlPage.createQRCodeButton).toBeEnabled()
        await expect(monkeyUrlPage.downloadQRCodeButton).toBeDisabled()
    })

    test('Verify that user can create qr code and download file', async () => {
        await monkeyUrlPage.fillUrl(longUrl)
        await monkeyUrlPage.clickCreateQRCode()

        await expect(monkeyUrlPage.createQRCodeButton).toBeDisabled()
        await expect(monkeyUrlPage.downloadQRCodeButton).toBeEnabled()

        await monkeyUrlPage.clickDownloadQRCode()

        await monkeyUrlPage.assertText('Done Generating. Downloading your QR Code.')
    })
})
