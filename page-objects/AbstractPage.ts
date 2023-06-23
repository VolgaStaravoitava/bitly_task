import { Page } from "@playwright/test";
import dotenv from 'dotenv'

export class AbstractPage {
    readonly page: Page
    readonly baseUrl: string

    constructor(page: Page) {
        dotenv.config()

        this.page = page

        if (process.env.MONKEY_URL === undefined || process.env.MONKEY_URL === null) {
            throw new Error("please setup MONKEY_URL environment variable")
        }

        this.baseUrl = process.env.MONKEY_URL
    }
}