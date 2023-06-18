const bcrypt = require("bcrypt");

const string1 = "test";
const string2 = "test";

let hash1, hash2;

bcrypt.hash(string1, 12).then((hash) => {
  hash1 = hash;
});
bcrypt.hash(string2, 12).then((hash) => {
  hash2 = hash;
});

console.log(hash1, hash2);
