/*~~~~~~~~~~~~~~~~ SERVER ~~~~~~~~~~~~~~~~*/
const net = require("net");

const server = net.createServer(client => {
  console.log("CLIENT CONNECTED!");
  client.write("ALOHA WELCOME TO SPARTASERVE");
  client.on("data", data => {
    console.log(data.toString());
  });
});

server.listen(6969, () => {
  console.log("Server listening on port 6969");
});

/*~~~~~~~~~~~~~~~~ CLIENT ~~~~~~~~~~~~~~~~*/

const net = require("net");

const client = net.createConnection(6969, "10.0.1.187", () => {
  // for (let i = 0; i < 100000000000; i++) {
  //   client.write("wat");
  // }
  client.write("command + q for good luck");

  client.on("data", data => {
    console.log(data.toString());
  });
  process.stdin.pipe(client);
});
