const drumHolder = document.getElementById('drum-holder');

const keys = [
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/openhat.wav',
    keyCode: 65,
    label: 'Clap',
    letter: 'A',
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/clap.wav',
    keyCode: 83,
    letter: 'S',
    label: 'Hi Hat'
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/hihat.wav',
    keyCode: 68,
    letter: 'D',
    label: 'Kick',
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/kick.wav',
    keyCode: 70,
    letter: 'F',
    label: 'Open Hat',
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/boom.wav',
    keyCode: 71,
    letter: 'G',
    label: 'Boom',
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/ride.wav',
    keyCode: 72,
    letter: 'H',
    label: 'Ride',
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/snare.wav',
    keyCode: 74,
    letter: 'J',
    label: 'Snare',
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/tom.wav',
    keyCode: 75,
    letter: 'K',
    label: 'Tom',
  },
  {
    src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/67723/tink.wav',
    keyCode: 76,
    letter: 'L',
    label: 'Tink',
  },
]

function constructDrumKit(callback) {
  const htmlKeys = [];
  const htmlSounds = [];

  keys.forEach((key) => {
    htmlKeys.push(keyTemplate(key));
    htmlSounds.push(soundTemplate(key));
  });

  drumHolder.innerHTML = `
    <div class="keys">${htmlKeys.join('')}</div>
    ${htmlSounds.join('')}
  `

  callback(true);
}

document.addEventListener("DOMContentLoaded", () => {
  constructDrumKit(() => { 
    document.addEventListener('keydown', (event) => {
      if (!isKeyCodeExist(event.keyCode)) return;

      const audio = document.querySelector(`audio[data-key="${event.keyCode}"]`)
      const pad = document.querySelector(`.key[data-key="${event.keyCode}"]`)
  
      if (!audio) return;

      audio.currentTime = 0;
      audio.play();
      pad.classList.add('playing');

      audio.addEventListener("ended", function(){
        pad.classList.remove('playing');
      })
    });
  });
});


const keyTemplate = ({ keyCode, letter, label }) => {
  return `<div data-key="${keyCode}" class="key">
    <span class="letter">${letter}</span>
    <span class="sound">${label}</span>
  </div>`
}

const soundTemplate = ({ keyCode, src }) => {
  return `<audio src="${src}" data-key="${keyCode}"></audio>`
}

const isKeyCodeExist = (keyCode) => {
  const keyCodesMap = keys.map((kc) => kc.keyCode);
  return keyCodesMap.includes(keyCode);
}
