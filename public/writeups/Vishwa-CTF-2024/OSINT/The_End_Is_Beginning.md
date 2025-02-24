---
title: "The end is beginning"
event: "Vishwa CTF 2024"
category: "OSINT"
date: "2024-02-14"
difficulty: "Easy"
image: ""
---
# The end is beginning
`Difficulty: Easy`


**DESCRIPTION**<br>
Me and my friends just finished our final semester of B.Tech, so we decided to have a trip somewhere, but due to some reason, many of them were not available for the trip, but we were all ok as less is more. As the trip was about to end, one of my friends said we should try scuba diving here. I was scared of that, but my friends said, If you don't risk anything, you risk everything. Seriously, why do we have to risk our lives for half an hour? It's impossible for me, I said. But they motivated me all night, and then it was time for the dive. I screamed, Impossible is not a word in my vocabulary, and dived in. After all this, when I came back to my room, I realised I was low on money, so I called and asked my father for some help by singing something like this:

I’d be gone to my dad<br>
And ask for some cash<br>
I ran ......

All the Hustle towards the trip was worth it, as we enjoyed it a lot and made some awesome memories throughout the trip.

Flag format: VishwaCTF{My Name according to story_Amount I got in figures}

Author : Abhinav

FLAG FORMAT: `VishwaCTF{}`

## Solution:

In this challenge, After reading the description, I got some clue from the following

```
I’d be gone to my dad
And ask for some cash
I ran ……
```

I searched about this song, and found out it was the starting lines of the song “`BT ho gayi`” sung by paradox. We can get one more clue from description mentioning “All the `Hustle…`”,As paradox sung this song in the popular reality show `HUSTLE 2.0`

I checked the lyrics

```
I’d be gone to my dad
And ask for some cash
I ran out outta my money
I ran out of my stack
Hazaar te bharni goj
Hazaar mein aana stack
Hazaar mein full moj
Hazaae mein puri aish
Hello papa 5k kar do UPI
```
He was asking for Rs.5,000 from his dad.That means the amount he got is 5000. And we know the name according to the story is `Paradox`.

### Flag:
`VishwaCTF{Paradox_5000}`