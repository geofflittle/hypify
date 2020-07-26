"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveAndUpdateCurrentPlaylist = void 0;
const hypem_client_1 = require("../clients/hypem-client");
const spotify_client_1 = require("../clients/spotify-client");
const ts_core_1 = require("ts-core");
const monthToSeason = {
    1: "Winter",
    2: "Winter",
    3: "Spring",
    4: "Spring",
    5: "Spring",
    6: "Summer",
    7: "Summer",
    8: "Summer",
    9: "Fall",
    10: "Fall",
    11: "Fall",
    12: "Winter"
};
exports.saveAndUpdateCurrentPlaylist = async ({ accessToken, userId }) => {
    const srcPlaylist = await spotify_client_1.getOrCreatePlaylist({
        accessToken,
        userId,
        playlistName: "Current"
    });
    const dstPlaylist = await spotify_client_1.getOrCreatePlaylist({
        accessToken,
        userId,
        playlistName: getDestinationPlaylistName()
    });
    await copyAndClearTracks(accessToken, srcPlaylist, dstPlaylist);
    const top50 = await hypem_client_1.getLastWeeksTop50();
    const top50TrackUris = await ts_core_1.asyncReduce(top50, async (acc, cur) => {
        const trackUri = await searchAndGetTrackUri(accessToken, cur.artist, cur.title);
        return acc.concat(trackUri ? [trackUri] : []);
    }, []);
    await spotify_client_1.addItemsToPlaylist({
        accessToken,
        playlistId: srcPlaylist.id,
        trackUris: top50TrackUris
    });
};
const getDestinationPlaylistName = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1);
    const season = monthToSeason[month];
    return `${year} ${season}`;
};
const copyAndClearTracks = async (accessToken, srcPlaylist, dstPlaylist) => {
    const getPlaylistItemsRes = await spotify_client_1.getPlaylistItems({
        accessToken,
        playlistId: srcPlaylist.id
    });
    if (getPlaylistItemsRes.items.length <= 0) {
        return;
    }
    const trackUris = getPlaylistItemsRes.items.map((item) => item.track.uri);
    await spotify_client_1.addItemsToPlaylist({
        accessToken,
        playlistId: dstPlaylist.id,
        trackUris: trackUris
    });
    await spotify_client_1.removeItemsFromPlaylist({
        accessToken,
        playlistId: srcPlaylist.id,
        trackUris
    });
};
const searchAndGetTrackUri = async (accessToken, artist, title) => {
    const searchRes = await spotify_client_1.searchForTrack({
        accessToken,
        artist,
        title
    });
    if (searchRes.tracks.items.length <= 0) {
        return undefined;
    }
    return searchRes.tracks.items[0].uri;
};
