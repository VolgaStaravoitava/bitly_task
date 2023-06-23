import { test, expect } from '@playwright/test'
import { BitlinkAPI } from '../../api/BitlinkAPI'
import { Bitlink, BitlinkRequest } from '../../models/requests/Bitlink'

test.describe('API. Create and Update Bitlink api test @bitlink @api', () => {

  let bitlinkAPI: BitlinkAPI

  const longUrl = `https://dev.bitly.com`
  const domain = `bit.ly`

  test.beforeAll(async () => {
    bitlinkAPI = new BitlinkAPI()
  })

  test('Verify that user can create and update bitlink successfully', async () => {
    const shortenResponse = await bitlinkAPI.shortenLink(longUrl, domain, '')

    expect(shortenResponse.status()).toBe(200)
    const bitlink =  await shortenResponse.json() as Bitlink
    expect(bitlink.long_url).toStrictEqual(`${longUrl}/`)

    const retrieve1Response = await bitlinkAPI.retrieveBitlink(bitlink.id)

    expect(retrieve1Response.status()).toBe(200)
    let retrievedBitlink =  await retrieve1Response.json() as Bitlink
    expect(bitlink.long_url).toStrictEqual(retrievedBitlink.long_url)


    const updateRequest: BitlinkRequest = {
      title: `Updated_Bitlink_Title_${Date.now()}`
    }
    const updatedResponse =  await bitlinkAPI.updateBitlink(bitlink.id,updateRequest)

    expect(updatedResponse.status()).toBe(200)
    const updatedBitlink = await updatedResponse.json() as Bitlink
    expect(updatedBitlink.long_url).toStrictEqual(`${longUrl}/`)
    expect(updatedBitlink.title).toStrictEqual(updateRequest.title)
  
    const retrieve2Response = await bitlinkAPI.retrieveBitlink(bitlink.id)

    expect(retrieve2Response.status()).toBe(200)
    let retrieved2Bitlink =  await retrieve2Response.json() as Bitlink
    expect(bitlink.long_url).toStrictEqual(retrieved2Bitlink.long_url)
    expect(updatedBitlink).toStrictEqual(retrieved2Bitlink)
  })
})
