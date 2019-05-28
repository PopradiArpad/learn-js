"use strict";
const { promisify } = require("util");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

readline.question[promisify.custom] = question => {
  return new Promise(resolve => {
    readline.question(question, resolve);
  });
};

async function main() {
  const answer = await promisify(readline.question)("What is your name? ");
  readline.close();
  console.log("Hi %s!", answer);
}

main();
