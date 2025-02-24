---
title: "Cyber Pursuit Manhunt"
event: "Vishwa CTF 2024"
category: "OSINT"
date: "2024-02-14"
difficulty: "Hard"
image: ""
---
# Cyber Pursuit Manhunt
`Difficulty: Hard`

**DESCRIPTION**<br>
In response to alarming reports, our cybersecurity team is actively pursuing a hacker known by the alias "h3ck3r_h3_bh41", who poses a serious threat by extorting innocent individuals for monetary gain. Your mission is to track down this hacker and provide us with the crucial information needed to apprehend them.

Retrieve the Hacker's complete full name (first name, middle name, last name), formatted in lowercase and replacing spaces with underscores, along with the associated website domain.

Author : Pranit Govande

FLAG FORMAT: `VishwaCTF{full_name_domain.in}`


## Solution:

here name was given "`h3ck3r_h3_bh41`" i searched in different social media platform and after searching on X(Twitter) i got this

![](../../assets/1_2qoLkt794geB-_dxFKeV8w.png)
*Link: https://twitter.com/h3ck3r_h3_bh41*

After observing the latest post I searched `Cookie the baby chick` on many social media platforms

And Finally I found an account on Instagram with the name “`cookiethebabychick`”

![](../../assets/1__aplXtf1Ir67eZ6Z1V_C9A.png)

I checked the followers, from where I got the account of `simon_j_peter`

In the caption of one of the post, I found the youtube [link](http://bit.ly/3v79BgB)

![](../../assets/1_YXAQemnlvQzU03RRd9tOrw.png)

The name of the Youtube channel was “`husky woof woof`”,there were no any other informations present. So I tried to find husky woof woof named account on social media

![](../../assets/1_r7dLO6YByr0PaCLaYn6Kig.png)


I found the `husky woof woof` on LinkedIn
and from there i got the middle name 
 
 So i got the name that is “`simon_john_peter`”, now i have to find domain name
 
 ![](../../assets/1__OBRD60Z1k6utAkELCTt2Q.png)

 ![](../../assets/c5d72cf1-8700-4901-a73c-33b06489bee8.png)
 
 On searching through one of its post, I found another URL “https://lnkd.in/dPQQxyyr”, which was of an image

 ![](../../assets/0_nQTEF1HzFffC6803.jpg)

 Using [Aperisolve](https://www.aperisolve.com/) i checked the metadata and i found some location

![](../../assets/1_X-CjOl6q4Fw-5g4JRmQsiA.png)

which i checked on [this](https://www.gps-coordinates.net/) and got chandrapur,Maharashtra.

 ![](../../assets/1_iF_7sOldGpqZyzsKK-mTcw.png)

 By seeing picture of Tiger in the image i got hint to search tiger reserve in chandrapur, and after searching i got this

 ![](../../assets/1_srJgPAgzqfS0Lf3cnyQXZw.png)

 And from here I got the domain name from “https://www.`tadobanationalpark.in`”

 Combining name and domain i got the flag

 ### Flag: 
`VishwaCTF{simon_john_peter_tadobanationalpark.in}` 


