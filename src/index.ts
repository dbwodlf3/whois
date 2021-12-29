const godDomains = [
    "com", "net", "ly", "la"
]

import { ChildProcess, spawn } from "child_process";

export function whois(url: string): Promise<string>{
    return new Promise((resolve, reject)=>{
        let io_data = '';

        const child = spawn(`whois ${url}`, {shell: true});
    
        child.stdout.on("data", (data)=>{
            io_data += data;
        })
    
        child.stdout.on("end", ()=>{
            resolve(io_data);
        });
    })
}

export function whoisParser(data: string): WhoisDictionary{
    const result: any = {};
    let parsed_data = '';
    const keywords = [
        "Domain Name",
        "Registry Domain ID",
        "Registrar WHOIS Server",
        "Registrar URL",
        "Updated Date",
        "Last Updated Date",
        "Creation Date",
        "Registrar Registration Expiration Date",
        "Registrar",
        "Registrar IANA ID",
        "Registrar Abuse Contact Email",
        "Registrar Abuse Contact Phone",
        "Reseller",
        "Domain Status",
        "Registry Registrant ID",
        "Registrant Name",
        "Registrant Organization",
        "Registrant Street",
        "Registrant City",
        "Registrant State/Province",
        "Registrant Postal Code",
        "Registrant Country",
        "Registrant Phone",
        "Registrant Phone Ext",
        "Registrant Fax",
        "Registrant Fax Ext",
        "Registrant Email",
        "Registry Admin ID",
        "Admin Name",
        "Admin Organization",
        "Admin Street",
        "Admin City",
        "Admin State/Province",
        "Admin Postal Code",
        "Admin Country",
        "Admin Phone",
        "Admin Phone Ext",
        "Admin Fax",
        "Admin Fax Ext",
        "Admin Email",
        "Registry Tech ID",
        "Tech Name",
        "Tech Organization",
        "Tech Street",
        "Tech City",
        "Tech State/Province",
        "Tech Postal Code",
        "Tech Country",
        "Tech Phone",
        "Tech Phone Ext",
        "Tech Fax",
        "Tech Fax Ext",
        "Tech Email",
        "Name Server",
        "DNSSEC"
    ];

    parsed_data = data.trim();

    for(const keyword of keywords) {
        const regexp = new RegExp(`${keyword}:[^\n]*`, "ig");
        let tokens = parsed_data.match(regexp) || [];
        for(const token of tokens) {
            if(result[keyword])
                result[keyword].push(token.replace(`${keyword}:`, "").replace(/\s/g, ""));
            else {
                result[keyword] = [token.replace(`${keyword}:`, "").replace(/\s/g, "")];
            }
        }
    }

    return result;
}

/** It extract subdomain. it only works on TLDs*/
export function getDomain(url: string){
    let temp: any = url.split("://");
    if(temp.length > 1) {
        temp = temp[1];
    }
    else {
        temp = temp[0];
    }

    temp = temp.split("/");
    temp = temp[0];   
}

export interface WhoisDictionary {
    "Domain Name"?: string[];
    "Registry Domain ID"?: string[];
    "Registrar WHOIS Server"?: string[];
    "Registrar URL"?: string[];
    "Updated Date"?: string[];
    "Last Updated Date"?: string[];
    "Creation Date"?: string[];
    "Registrar Registration Expiration Date"?: string[];
    "Registrar"?: string[];
    "Registrar IANA ID"?: string[];
    "Registrar Abuse Contact Email"?: string[];
    "Registrar Abuse Contact Phone"?: string[];
    "Reseller"?: string[];
    "Domain Status"?: string[];
    "Registry Registrant ID"?: string[];
    "Registrant Name"?: string[];
    "Registrant Organization"?: string[];
    "Registrant Street"?: string[];
    "Registrant City"?: string[];
    "Registrant State/Province"?: string[];
    "Registrant Postal Code"?: string[];
    "Registrant Country"?: string[];
    "Registrant Phone"?: string[];
    "Registrant Phone Ext"?: string[];
    "Registrant Fax"?: string[];
    "Registrant Fax Ext"?: string[];
    "Registrant Email"?: string[];
    "Registry Admin ID"?: string[];
    "Admin Name"?: string[];
    "Admin Organization"?: string[];
    "Admin Street"?: string[];
    "Admin City"?: string[];
    "Admin State/Province"?: string[];
    "Admin Postal Code"?: string[];
    "Admin Country"?: string[];
    "Admin Phone"?: string[];
    "Admin Phone Ext"?: string[];
    "Admin Fax"?: string[];
    "Admin Fax Ext"?: string[];
    "Admin Email"?: string[];
    "Registry Tech ID"?: string[];
    "Tech Name"?: string[];
    "Tech Organization"?: string[];
    "Tech Street"?: string[];
    "Tech City"?: string[];
    "Tech State/Province"?: string[];
    "Tech Postal Code"?: string[];
    "Tech Country"?: string[];
    "Tech Phone"?: string[];
    "Tech Phone Ext"?: string[];
    "Tech Fax"?: string[];
    "Tech Fax Ext"?: string[];
    "Tech Email"?: string[];
    "Name Server"?: string[];
    "DNSSEC"?: string[];
}