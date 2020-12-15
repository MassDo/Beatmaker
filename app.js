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
    if (!this.isPlaying) {
      // if not playing we lauch the play
      this.isPlaying = setInterval(() => {
        this.repeat();
      }, interval);
    } else {
      // we stop the interval play and reset to null the play info
      clearInterval(this.isPlaying);
      this.isPlaying = null;
    }
  }
  updateButton() {
    if (!this.isPlaying) {
      this.playButton.innerText = "Play";
    } else {
      this.playButton.innerText = "Stop";
    }
  }
}

// EVENT
const drumKit = new Drumkit();
// play button
drumKit.playButton.addEventListener("click", () => {
  drumKit.start();
  drumKit.updateButton();
});
// pad activation and animation
drumKit.pads.forEach((p) => {
  p.addEventListener("click", drumKit.activatePad);
  p.addEventListener("animationend", drumKit.resetAnimation);
});
