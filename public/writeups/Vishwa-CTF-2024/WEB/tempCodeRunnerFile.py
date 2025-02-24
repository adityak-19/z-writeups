from cryptography.fernet import Fernet
import base64

# Decryption key (32-byte URL-safe base64-encoded bytes)
key = b'th1s_1s_n0t_t5e_f1a9'
# Convert the key to base64
key = base64.urlsafe_b64encode(key)

# Encrypted text
encrypted_text = b'Gkul0oJKhNZ1E8nxwnMY8Ljn1KNEW9G9l+w243EQt0M4si+fhPQdxoaKkHVTGjmA'

# Initialize Fernet with the key
cipher = Fernet(key)

# Decrypt the text
decrypted_text = cipher.decrypt(encrypted_text)

# Print the decrypted text
print(decrypted_text.decode())
