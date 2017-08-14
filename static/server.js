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

socket.on('clients', (clients) => {
    console.log(clients);
    clientsDiv.innerHTML = "";
    clients.forEach(client => {
        const button = document.createElement("BUTTON");
        button.innerHTML = client.name;
        button.id = client.id;
        button.addEventListener('click', () => {
            socket.emit('playSoundOnClient', client.id);
        });
        clientsDiv.appendChild(button);
    });
});
