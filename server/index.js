const express = require("express");
const verifyProof = require("../utils/verifyProof");

const port = 1225;

const app = express();
app.use(express.json());

// TODO: hardcode a merkle root here representing the whole nice list
// paste the hex string in here, without the 0x prefix
const MERKLE_ROOT =
  "ddd59a2ffccddd60ff47993312821cd57cf30f7f14fb82937ebe2c4dc78375aa";

app.post("/gift", (req, res) => {
  try {
    const gift = "You got a toy robot.";
    // grab the parameters from the front-end here
    const { name, proof } = req.body;

    var isInTheList = false;

    // Verify that the proof leads to the Merkle root of the list, i.e. that name is in list
    isInTheList = verifyProof(proof, name, MERKLE_ROOT);
    console.log(isInTheList);
    if (isInTheList) {
      res.send({ gift: gift });
    } else {
      res.send("You are not on the list :(");
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});
