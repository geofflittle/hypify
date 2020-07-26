"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLastWeeksTop50 = exports.getPopularTracks = void 0;
const got_1 = __importDefault(require("got"));
const ts_core_1 = require("ts-core");
exports.getPopularTracks = async ({ mode, page, count }) => {
    const reqUrl = `https://api.hypem.com/v2/popular?${mode ? "&mode=" + mode : ""}${page ? "&page=" + page : ""}${count ? "&count=" + count : ""}`;
    const reqOpts = {
        responseType: "json"
    };
    console.log({
        module: "hypem-client",
        method: "getLastWeeksPopularTracks",
        reqUrl,
        reqOpts
    });
    const res = await got_1.default.get(reqUrl, reqOpts);
    console.log({
        module: "hypem-client",
        method: "getLastWeeksPopularTracks",
        resBody: res.body
    });
    return res.body;
};
exports.getLastWeeksTop50 = async () => {
    return ts_core_1.asyncReduce([1, 2, 3], async (acc, cur) => acc.concat(await exports.getPopularTracks({ mode: "lastweek", page: cur })), []);
};
