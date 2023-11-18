const express = require("express");
const bodyParser = require("body-parser");
const crypto = require("crypto");
const fs = require("fs");

const app = express();
app.use(bodyParser.json());

// Store public keys and documents for signature verification (for demonstration purposes).
const registeredDocuments = new Map();

// Function to verify a document's signature
function verifySignature(publicKey, document, signature) {
  // Convert the provided public key to the appropriate format
  const formattedPublicKey = publicKey
    .replace("-----BEGIN PUBLIC KEY-----", "")
    .replace("-----END PUBLIC KEY-----", "")
    .replace(/\n/g, "");

  // Convert the document and signature to buffers
  const documentBuffer = Buffer.from(document, "base64");
  const signatureBuffer = Buffer.from(signature, "base64");

  // Create a public key object
  const verify = crypto.createVerify("RSA-SHA256");
  verify.update(documentBuffer);

  // Verify the signature using the formatted public key
  const isSignatureValid = verify.verify(
    `-----BEGIN PUBLIC KEY-----\n${formattedPublicKey}\n-----END PUBLIC KEY-----`,
    signatureBuffer
  );

  return isSignatureValid;
}

// Endpoint to receive document and signature
app.post("/upload-document", (req, res) => {
  const { document, signature, publicKey } = req.body;

  // Verify the signature using the provided public key
  const isSignatureValid = verifySignature(publicKey, document, signature);

  if (isSignatureValid) {
    // Signature is valid; store the document for reference (in a real system, you'd likely store this in a database)
    registeredDocuments.set(publicKey, document);
    res.status(200).json({ message: "Document uploaded and verified" });
  } else {
    res.status(401).json({ message: "Signature verification failed" });
  }
});

// Endpoint to verify a document with its signature (for demonstration purposes)
app.get("/verify-document/:publicKey", (req, res) => {
  const publicKey = req.params.publicKey;

  if (registeredDocuments.has(publicKey)) {
    const document = registeredDocuments.get(publicKey);
    res.status(200).json({ message: "Document verified", document });
  } else {
    res.status(404).json({ message: "Document not found" });
  }
});

app.listen(3000, () => {
  console.log("API server is running on port 3000");
});
