#!/usr/bin/env node

const fs = require("fs");
const crypto = require("crypto");

const sourceDirectory = process.argv[2];
const expectedChecksum = process.argv[3];

const failValidation = () => {
  console.log("0");
  process.exit();
};

const passValidation = () => {
  console.log("1");
  process.exit();
};

if (sourceDirectory == null || sourceDirectory.trim().length == 0) {
  failValidation();
}

if (expectedChecksum == null || expectedChecksum.trim().length == 0) {
  failValidation();
}

const generateChecksum = (data, algorithm, encoding) => {
  return crypto
    .createHash(algorithm || "md5")
    .update(data, "utf8")
    .digest(encoding || "hex");
};

fs.readFile(sourceDirectory, (err, data) => {
  if (err) {
    failValidation();
  } else {
    const checksum = generateChecksum(data);
    if (checksum == expectedChecksum) {
      passValidation();
    } else {
      failValidation();
    }
  }
});
