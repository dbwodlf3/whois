This is just wrapping whois cli tools.
Don't use this lib to something requiring high performance(so many call this...)

================================================================================

Requirements
This lib is just wrapping whois cli tools. it means you have to have whois tool.

Windows
```console
# install via administrator permission.
choco install whois
```

Linux
Install whois via yum, brew, apt-get or something...

================================================================================

Usage
```ts
import {whois, whoisParser} from "whois";

whois("www.naver.com").then((text)=>{
	const whois_data = whoisParser(text);
	console.log(whois_data);
})
```