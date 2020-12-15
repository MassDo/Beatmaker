class Drumkit {
  constructor() {
    this.pads = document.querySelectorAll(".pad");
    this.playButton = document.querySelector(".play");
    this.kickAudio = document.querySelector(".kick-sound");
    this.snareAudio = document.querySelector(".snare-sound");
    this.hihatAudio = document.querySelector(".hihat-sound");
    this.index = 0;
    this.bpm = 120;
    this.isPlaying = null;
    this.selects = document.querySelectorAll("select");
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
  updateButton() {
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
    console.log(e.target.name, e.target.value);
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
}

const drumKit = new Drumkit();

// EVENT //
// play button
drumKit.playButton.addEventListener("click", () => {
  drumKit.updateButton();
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
    console.log(e);
    drumKit.changeSound(e);
    // faire la méthode changeSound(e)
  });
});
