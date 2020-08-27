var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note 
synth.triggerAttackRelease("C4", "8n");

const clientsDiv = document.getElementById('clients');

const socket = io();

socket.on('connection', (socket) => {
    console.log(socket);
});

socket.on('getType', () => {
    socket.emit('setType', 'server');
});

let clients = [];

var selectedClientIds = [];

function refreshClients() {
    clientsDiv.innerHTML = "";
    clients.forEach(client => {
        const button = document.createElement("BUTTON");
        button.innerHTML = client.name;
        button.style.backgroundColor = (selectedClientIds.indexOf(client.id) === -1) ? 'red' : 'green';
        button.id = client.id;
        button.addEventListener('click', () => {
            if (selectedClientIds.indexOf(client.id) === -1) {
                selectedClientIds.push(client.id);
            }
            else {
                selectedClientIds = selectedClientIds.filter(x => x != client.id);
            }
            refreshClients();
        });
        clientsDiv.appendChild(button);
    });
}

function sendSound() {
    socket.emit('playSoundOnClients', selectedClientIds);
}

socket.on('clients', x => {
    clients = x;
    refreshClients();
});
