import fs from "fs";
import path from "path";
import chai from "chai";
import { whois, whoisParser } from "index";

const domains = JSON.parse(
    fs.readFileSync(path.resolve(path.join(__dirname,"url-list.json")), "utf-8")
)["domains"];

describe("Function", ()=>{
    it("whois test", async ()=>{
        for(const domain of domains) {
            const result = whoisParser(await whois(domain));
        }
    }).timeout(10000);
})