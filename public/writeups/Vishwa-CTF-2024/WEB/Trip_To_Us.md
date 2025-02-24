---
title: "Trip To Us"
event: "Vishwa CTF 2024"
category: "WEB"
date: "2024-02-14"
difficulty: "Easy"
image: ""
---
# Trip To Us
`Difficulty: Easy`

**DESCRIPTION**<br>
IIT kharakpur is organizing a US Industrial Visit. The cost of the registration is $1000. But as always there is an opportunity for intelligent minds. Find the hidden login and Get the flag to get yourself a free US trip ticket.

Author : Samarth Ghante & Kanishk Kumar

FLAG FORMAT: `VishwaCTF{}`

![](../../assets/1_eLeGvfdd9kF0zH4FyvjSQw.png)

## Solution

After clicking on `Click Here` I got this

after inspecting the site i got this msg `change the user agent to IITIAN`

![](../../assets/1_fYxnIDPtH6ITBeqz_vKEnQ.png)

After changing user agent to `IITIAN` I got the login page which was described on the homepage

![](../../assets/1_WFsXuhVkS2ENE8F_GmFxAw.png)

![](../../assets/1_WaVC6GCTDwiOsQGGdvZEaw.png)

after inspecting this i got to know the username as `admin` and for password i used basic sql injection payload `' or '1'='1`

and using this i got the flag

![](../../assets/1_CFhCn8JnW7wi1LetG3M5mQ.png)

### Flag:
`VishwaCTF{y0u_g0t_th3_7r1p_t0_u5}`


