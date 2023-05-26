import React, { useState } from "react";
import "./Main.css";
const { encrypt, decrypt, nonce } = require("solana-encryption");
const Keypair = require("@solana/web3.js").Keypair;



function Main() {
  const [encryptedData, set_encryptedData] = useState("");
  const [decryptedData, set_decryptedData] = useState("");

  //Unused for now
  const [encryptedMessage, setEncryptedMessage] = useState("");

  return (
    <div id="Main">
      <h1>Encryption and Decryption App</h1>

      <div className = "box">
      <input type="text" id="userInput"     placeholder="Enter message to encrypt"/>
      <button
        onClick={() => {
          const inputValue = document.getElementById("userInput").value;
          solanaEncrypt(inputValue);
        }}
      >
        Encrypt
      </button>

      <h2>Encrypted message:</h2>
      <p>{encryptedData}</p>
      <p>{encryptedMessage}</p>

      <h2>Decrypted message:</h2>
      <p>{decryptedData}</p>

      </div>

 
    </div>


  );



  function solanaEncrypt(toEncrypt) {
    const message = toEncrypt;
  
    // Generate two random key pairs
    const keypairA = Keypair.generate();
    const keypairB = Keypair.generate();
  
    // Get the public and private keys from the keypairs
    const publicKey_sender = keypairA.publicKey.toBase58();
    const privateKey_sender = keypairA.secretKey;
    const publicKey_receiver = keypairB.publicKey.toBase58();
    const privateKey_receiver = keypairB.secretKey;
  
    // Generate a nonce
    const newNonce = nonce();
  
    const encrypted = encrypt(
      message,
      newNonce,
      publicKey_receiver,
      privateKey_sender
    );

    const decrypted = decrypt(
        encrypted,
        newNonce,
        publicKey_sender,
        privateKey_receiver
      
      );
  
    console.log(encrypted);
    set_encryptedData(encrypted);
    set_decryptedData(decrypted);
  }


  

}

export default Main;
