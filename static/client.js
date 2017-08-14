var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note 
synth.triggerAttackRelease("C5", "8n");

const nameInput = document.getElementById('name');

const socket = io();

setName = function (event) {
    if (event) {
        event.preventDefault();
    }
    socket.emit('setName', nameInput.value);
    return false;
};

socket.on('getType', () => {
    socket.emit('setType', 'client');
    setName();
});