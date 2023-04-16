const axios = require("axios");
const niceList = require("../utils/niceList.json");
const MerkleTree = require("../utils/MerkleTree");

const serverUrl = "http://localhost:1225";

async function main() {
  // TODO: how do we prove to the server we're on the nice list?
  // Generate Merkle tree and root from niceList
  const merkleTree = new MerkleTree(niceList);
  const root = merkleTree.getRoot();

  // Select random name and get index within list
  const name = "Homer Nitzsche";
  const index = niceList.findIndex((n) => n === name);
  // Generate proof using name
  const proof = merkleTree.getProof(index);

  try {
    const {
      data: { gift },
    } = await axios.post(`${serverUrl}/gift`, {
      // TODO: add request body parameters here!
      name: name,
      proof: proof,
    });
    console.log({ gift });
  } catch (error) {
    console.error(error);
  }
}

main();
