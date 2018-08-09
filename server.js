// /*~~~~~~~~~~~~~~~~ SERVER ~~~~~~~~~~~~~~~~*/

const net = require("net"); //Loads the library

let clients = []; //Keeps track of the incoming clients joining the server

const server = net.createServer(client => {
  //Function that starts the server

  console.log("CLIENT CONNECTED: ", client.address()); //Simple message displayed on the server displaying incoming clients
  client.write("WELCOME TO THE CHAT!  TYPE /help TO GET STARTED!"); //Welcome message to each connected client.
  client.on("data", data => {
    const msg = data.toString();
    if (msg.includes("/help")) {
      client.write("What can we call you?  Enter /nickname - username");
    } else if (msg.includes("/nickname")) {
      const splitMessage = msg.split(" ");
      client.name = splitMessage[2];
      client.write("Hello " + client.name);
    } else {
      clients.forEach(socket => {
        if (client !== socket) {
          client.write(client.name + " " + msg);
        }
      });
    }
    console.log(data.toString());
    process.stdin.pipe(client);
  });
  client.on("end", data => {
    console.log("CLIENT DISCONNECTED");
  });
  clients.push(client);
});

server.listen(6969, () => {
  console.log("Server listening on port 6969");
});

/*
net = require("net");
var clients = [];
const server = net
  .createServer(function(socket) {
    // Identify this client
    socket.name = socket.remoteAddress + ":" + socket.remotePort;

    // Put this new client in the list
    clients.push(socket);

    // Send a nice welcome message and announce
    socket.write("Welcome " + socket.name + "\n");
    broadcast(socket.name + " joined the chat\n", socket);

    // Handle incoming messages from clients.
    socket.on("data", function(data) {
      broadcast("socket.name" + "> " + data, socket);
    });

    // Remove the client from the list when it leaves
    socket.on("end", function() {
      clients.splice(clients.indexOf(socket), 1);
      broadcast(socket.name + " left the chat.\n");
    });

    // Send a message to all clients
    function broadcast(message, sender) {
      clients.forEach(function(client) {
        // Don't want to send it to sender
        if (client === sender) return;
        client.write(message);
      });
      // Log it to the server output too
      process.stdout.write(message);
    }
  })
  .listen(6969);
  */

/*~~~~~~~~~~~~~~~~~~~ BRODCASTING ~~~~~~~~~~~~~~~~~~~*/

// clients.forEach(socket => {
//   clients.write(msg);
// });

// for (let i = 0; i < clients.length; i++) {
//   clients[i].write(msg);
// }

// clients.push(client);
