var synth = new Tone.Synth().toMaster();

//play a middle 'C' for the duration of an 8th note 
synth.triggerAttackRelease("C5", "8n");