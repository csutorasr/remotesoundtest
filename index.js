const express = require('express');

const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.use(express.static('static'));
app.use(express.static('node_modules/tone/build'));

http.listen(8080, () => {
    console.log('App is listening on 8080');
});

let server, clients = [];

function sendDataToClients(type, data) {
    clients.forEach((client) => {
        client.socket.emit(type, data);
    });
}
function sendDataToClient(id, type, data) {

}
function sendClients() {
    if (server && server.socket) {
        server.socket.emit('clients', clients.map(x => ({ id: x.id, name: x.name })));
    }
}
function addClientWithId(client) {
    if (clients.filter(x => x.id === client.id).length === 0) {
        clients.push(client);
    }
}
function removeClientWithId(id) {
    clients = clients.filter(x => x.id !== id);
}
function renameClientWithId(id, name) {
    clients = clients.map(client => {
        if (client.id === id) {
            return Object.assign({}, client, { name: name });
        }
        return client;
    });
}

io.on('connection', (socket) => {
    let connection = {
        socket: socket,
        name: 'Server',
        id: socket.id
    };
    console.log('a user connected');
    socket.on('disconnect', () => {
        removeClientWithId(connection.id);
        sendClients();
        console.log('user disconnected');
    });
    socket.on('setName', name => {
        connection.name = name;
        renameClientWithId(connection.id, connection.name);
        console.log('client renamed');
        sendClients();
    });
    socket.on('setType', type => {
        if (type === 'client') {
            addClientWithId(connection);
            sendClients();
        }
        else {
            server = connection;
            console.log('server set');
            sendClients();
        }
    });
    socket.emit('getType', 'client');
});