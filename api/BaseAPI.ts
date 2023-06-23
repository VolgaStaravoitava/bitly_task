import { APIRequestContext, request } from '@playwright/test'
import dotenv from 'dotenv'

export class BaseAPI {

    readonly baseUrl: string
    readonly accessToken: string
    readonly apiVersion: string

    constructor() {
        // Read from .env file
        dotenv.config()

        if (process.env.BITLY_HOST === undefined || process.env.BITLY_HOST === null) {
            throw new Error("please setup BITLY_HOST environment variable")
        }

        if (process.env.BITLY_ACCESS_TOKEN === undefined || process.env.BITLY_ACCESS_TOKEN === null) {
            throw new Error("please setup BITLY_ACCESS_TOKEN environment variable")
        } 
        
        if (process.env.API_VERSION === undefined || process.env.API_VERSION === null) {
            throw new Error("please setup API_VERSION environment variable")
        }

        this.baseUrl = process.env.BITLY_HOST
        this.accessToken = process.env.BITLY_ACCESS_TOKEN
        this.apiVersion = process.env.API_VERSION
    }

    async getBitlyContext(): Promise<APIRequestContext> {
        return await request.newContext({
            baseURL: this.baseUrl
        })
    }
}