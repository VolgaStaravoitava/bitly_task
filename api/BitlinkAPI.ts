import { APIResponse } from "@playwright/test"
import { BitlinkRequest } from "../models/requests/Bitlink"
import { BaseAPI } from "./BaseAPI"

export class BitlinkAPI extends BaseAPI {

    async shortenLink(longUrl: string, domain: string, groupGuid: string): Promise<APIResponse> {
        const payload = {
            long_url: longUrl,
            domain: domain,
            group_guid: groupGuid,
        }

        const context = await super.getBitlyContext()

        const headers = {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${this.accessToken}`
        }

        return await context.post(`/${this.apiVersion}/shorten`, {
            headers,
            data: payload,
        })
    }

    createBitlinkForLongUrl(longUrl: string): Promise<APIResponse> {
        const request: BitlinkRequest = {
            long_url: longUrl
        }

        return this.createBitlink(request)
    }

    async createBitlink(request: BitlinkRequest): Promise<APIResponse> {
        const context = await super.getBitlyContext()

        const headers = {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${this.accessToken}`
        }

        return await context.post(`/v4/bitlinks`, {
            headers,
            data: request,
        })
    }

    async retrieveBitlink(bitlink: string): Promise<APIResponse> {
        const context = await super.getBitlyContext()

        const headers = {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${this.accessToken}`
        }

        return await context.get(`/${this.apiVersion}/bitlinks/${bitlink}`, {
            headers
        })
    }

    async updateBitlink(bitlink: string, request: BitlinkRequest): Promise<APIResponse> {
        const context = await super.getBitlyContext()

        const headers = {
            "Content-Type": `application/json`,
            "Authorization": `Bearer ${this.accessToken}`
        }

        return await context.patch(`/${this.apiVersion}/bitlinks/${bitlink}`, {
            headers,
            data: request,
        })
    }
}