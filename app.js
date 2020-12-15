class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.muteButtons = document.querySelectorAll("button.mute");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 150;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
    this.tempoSlider = document.querySelector(".tempo-slider");
  }
  activatePad() {
    console.log(this);
    this.classList.toggle("active");
  }
  resetAnimation() {
    this.style.animation = "";
  }
  repeat() {
    // actions for each beat ~ step
    let step = this.index % 8;
    const activeBars = document.querySelectorAll(`.b${step}`);
    // loop animation
    activeBars.forEach((bar) => {
      bar.style.animation = "playTrack 0.3s alternate ease-in-out 2";
      if (bar.classList.contains("active")) {
        // play the sound
        if (bar.classList.contains("kick-pad")) {
          this.kickAudio.currentTime = 0;
          this.kickAudio.play();
        }
        if (bar.classList.contains("snare-pad")) {
          this.snareAudio.currentTime = 0;
          this.snareAudio.play();
        }
        if (bar.classList.contains("hihat-pad")) {
          this.hihatAudio.currentTime = 0;
          this.hihatAudio.play();
        }
      }
    });
    this.index++;
  }
  start() {
    // actions when click on play button
    const interval = 60000 / this.bpm;
    if (this.isPlaying) {
      // we stop the interval play and reset to null the play info
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    } else {
      // if not playing we lauch the play
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    }
  }
  updatePlayButton() {
    if (this.isPlaying) {
      this.playButton.innerText = "Play";
      this.playButton.classList.remove("active");
    } else {
      this.playButton.innerText = "Stop";
      this.playButton.classList.add("active");
    }
  }
  changeSound(e) {
    // récupère la 'value' de l'option de l'e.target
    const soundFamily = e.target.name;
    const soundType = e.target.value;
    switch (soundFamily) {
      case "kick-select":
        this.kickAudio.src = soundType;
        break;

      case "snare-select":
        this.snareAudio.src = soundType;
        break;

      case "hihat-select":
        this.hihatAudio.src = soundType;
        break;
    }
  }
  muteTrack(e) {
    e.target.classList.toggle("active");
    const trackType = e.target.classList[1].split("-")[0];
    if (e.target.classList.contains("active"))
      switch (trackType) {
        case "kick":
          this.kickAudio.volume = 0;
          break;
        case "snare":
          this.snareAudio.volume = 0;
          break;
        case "hihat":
          this.hihatAudio.volume = 0;
          break;
      }
    else {
      switch (trackType) {
        case "kick":
          this.kickAudio.volume = 1;
          break;
        case "snare":
          this.snareAudio.volume = 1;
          break;
        case "hihat":
          this.hihatAudio.volume = 1;
          break;
      }
    }
  }
  changeTempo(e) {
    const tempoText = document.querySelector(".tempo-nr");
    this.bpm = e.target.value;
    tempoText.innerText = this.bpm;
    clearInterval(this.isPlaying);
    this.isPlaying = null;
    const playButton = document.querySelector(".play");
    if (playButton.classList.contains("active")) {
      this.start();
    }
  }
}

const drumKit = new Drumkit();

// EVENT //
// play button
drumKit.playButton.addEventListener("click", () => {
  drumKit.updatePlayButton();
  drumKit.start();
});
// pad activation and animation
drumKit.pads.forEach((p) => {
  p.addEventListener("click", drumKit.activatePad);
  p.addEventListener("animationend", drumKit.resetAnimation);
});
// choose differents sounds
drumKit.selects.forEach((select) => {
  select.addEventListener("change", (e) => {
    drumKit.changeSound(e);
  });
});
// mute button
drumKit.muteButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    drumKit.muteTrack(e);
  });
});
// tempo slider
drumKit.tempoSlider.addEventListener("change", (e) => {
  drumKit.changeTempo(e);
});
