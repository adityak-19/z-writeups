---
title: "H34D3RS "
event: "Vishwa CTF 2024"
category: "WEB"
date: "2024-02-14"
difficulty: "Easy"
image: ""
---
# H34D3RS 
`Difficulty:Easy`

**DESCRIPTION**<br>
Name of the challenge says something.

Author : Samarth Kamble

FLAG FORMAT: `VishwaCTF{}`


![](../../assets/1_vmgfpiPvIn7SRU8JMwrDcg.png)

## Solution:

It was a challenge about Headers

To solve this challenge i followed the instruction provided and proceeded...

![](../../assets/1_Ns3RQD_58wqhHVGj50481w.jpg)
changed the user agent to lorbrowser<br>
`User-agent: lorbrowser`
<br><br>

![](../../assets/1_DMX2-dL59PAQ7GFGtMu3MA.jpg)
changed referer to vishwactf.com<br>
`Referer: https://vishwactf.com/`
<br><br>


![](../../assets/1_cCYadVQC3jzhBAf6a6t6CQ.jpg)
set the date to 20 years from now<br>
`Date: 2044` 
<br><br>


![](../../assets/1_vvILQO5kgC0n8RGyLNMwqQ.jpg)
updated the request from 1 to 10<br>
`upgrade-insecure-requests: 10`
<br><br>


![](../../assets/1_VC6Fota85l5tvFCfGJ3nrw.jpg)
set the downtime to nine times 9<br>
`Downtime: 999999999`
<br><br>

by doing all these i got the flag

### Flag:
`VishwaCTF{s3cret_sit3_http_head3rs_r_c0o1}`


