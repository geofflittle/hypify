#!/usr/bin/env node

import { authorize, getAccessToken } from "../src/clients/spotify-client"

import http from "http"
import open from "open"

const callbackRegEx = /^\/\?code=(\S+)$/

const getCode = async (): Promise<string> => {
    return new Promise<string>((rsv) => {
        const server = http
            .createServer((req, res) => {
                res.writeHead(200)
                res.end()
                if (!req.url) {
                    console.error({ message: "No url" })
                    return
                }
                const matches = callbackRegEx.exec(req.url)
                if (!matches) {
                    console.error({ message: "No matches" })
                    return
                }
                server.close()
                return rsv(matches[1])
            })
            .listen(8080)
    })
}

export const main = async (): Promise<void> => {
    // TODO: Put in SM
    const clientId = process.env.SPOTIFY_CLIENT_ID
    const clientSecret = process.env.SPOTIFY_CLIENT_SECRET
    const redirectUri = "http://localhost:8080"
    const authorizeRes = await authorize({
        clientId,
        redirectUri,
        scopes: ["playlist-modify-public"]
    })
    await open(authorizeRes.location)
    const code = await getCode()
    console.log({ code })
    const accessTokenRes = await getAccessToken({
        clientId,
        clientSecret,
        code,
        redirectUri
    })
    console.log({ accessTokenRes })
}
;(async () => await main())()
