---
title: "Save The City"
event: "Vishwa CTF 2024"
category: "WEB"
date: "2024-02-14"
difficulty: "Easy"
image: ""
---
# Save The City
`Difficulty: Easy`

**DESCRIPTION**<br>
The RAW Has Got An Input That ISIS Has Planted a Bomb Somewhere In The Pune! Fortunetly, RAW Has Infiltratrated The Internet Activity of One Suspect And They Found This Link. You Have To Find The Location ASAP!

Aurthor : Samarth Ghante & Harshali Patil

FLAG FORMAT: `VishwaCTF{}`

## Solution:

Starting with netcat i got this `SSH-2.0-libssh_0.8.1`

After searching on google i found `CVE libSSH authentication bypass exploit` and got [this]() script


After running this script with portnumber and ip i got this<br>
`python3 {filename} -p {port} {ip}`

![](../../assets/1_oxuufcOhBHAzGhqZye5CVw.jpg)

then after listing the files we got `location.txt`

![](../../assets/1_sBod-imGH4Nvt8dNA08h6g.jpg)

seeing location.txt we get the location

![](../../assets/1_O-W8-OqhrLfVSGh-DBloaQ.jpg)

location: `elrow-club-pune`

### Flag:
`VishwaCTF{elrow-club-pune}`
