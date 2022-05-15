let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-track");
let next_btn = document.querySelector(".next-track");
let prev_btn = document.querySelector(".prev-track");

let seek_slider = document.querySelector(".seek_slider");
let volume_slider = document.querySelector(".volume_slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

// Create new audio element
let curr_track = document.createElement('audio');

// Define the tracks that have to be played
let track_list = [
  {
    name: "Запомню твои глаза навсегда",
    artist: "Ислам Итляшев",
    image: "umid.img/umid1.jpg",
    path: "umid.music/umid.mp3",
  },
  {
    name: "На нервах",
    artist: "Ислам Итляшев",
    image: "umid.img/umid2.jpg",
    path: "umid.music/umid2.mp3"
  },
  {
    name: "Yalın - Yeniden",
    artist: "umid.img/umid3.jpg",
    image: "umid.img/umid3.jpg",
    path: "umid.music/umid3.mp3",
  },
  {
    name: "Титры",
    artist: "JONY",
    image: "umid.img/umid4.jpg",
    path: "umid.music/umid5.mp3",
  },


  {
    name: "Ko'zmunchog'im ",
    artist: "Doston Ergashev",
    image: "umid.img/umid5.jpg",
    path: "umid.music/umid6.mp3",
  },


  {
    name: "Дом",
    artist: "",
    image: "umid.img/umid6.jpg",
    path: "umid.music/umid7.mp3",
  },


  {
    name: " Мама я устал 💔",
    artist: "umid.img/umid7",
    image: "umid.img/umid7.jpg",
    path: "umid.music/umid8.mp3",
  },


  {
    name: "Аллея 🌹",
    artist: "JONY",
    image: "umid.img/umid8.jpg",
    path: "umid.music/umid9.mp3",
  },


  {
    name: "Поболел и прошло",
    artist: "",
    image: "umid.img/umid9.jpg",
    path: "umid.music/umid10.mp3",
  },


  {
    name: "На фоне",
    artist: "JANAGA",
    image: "umid.img/umid10.jpg",
    path: "umid.music/umid11.mp3",
 
 },

 {
  name: "Она вернётся",
  artist: "MBAND",
  image: "umid.img/umid11.jpg",
  path: "umid.music/umid4.mp3",
},


{
  name: "Я люблю тебя давно ",
  artist: "Rauf & Faik",
  image: "umid.img/umid12.jpg",
  path: "umid.music/umid12.mp3",
},

{
  name: "Ты и я",
  artist: "Xcho 🤍",
  image: "umid.img/umid13.jpg",
  path: "umid.music/umid13.mp3",
},

{
  name: "Патрон",
  artist: "Miyagi",
  image: "umid.img/umid14.jpg",
  path: "umid.music/umid14.mp3",
},

{
  name: "Another Love",
  artist: "Tom Odell ",
  image: "umid.img/umid15.jpg",
  path: "umid.music/umid15.mp3",
},

{
  name: "Камин",
  artist: "Emin Feat. Jony",
  image: "umid.img/umid16.jpg",
  path: "umid.music/umid16.mp3",
},


{
  name: "Ай бала",
  artist: "JANAGA ",
  image: "umid.img/umid17.jpg",
  path: "umid.music/umid17.mp3",
},


{
  name: "Glass Animals ",
  artist: "",
  image: "umid.img/umid18.jpg",
  path: "umid.music/umid18.mp3",
},


{
  name: "Эскизы",
  artist: "Xcho",
  image: "umid.img/umid19.jpg",
  path: "umid.music/umid19.mp3",
},


{
  name: "Аллея ",
  artist: "JONY",
  image: "umid.img/umid20.jpg",
  path: "umid.music/umid20.mp3",
},


{
  name: "КЕЧИРИНГ_МЕН_НОДОННИ",
  artist: "",
  image: "umid.img/umid21.jpg",
  path: "umid.music/umid21.mp3",
},

];




function random_bg_color() {

  // Get a number between 64 to 256 (for getting lighter colors)
  let red = Math.floor(Math.random() * 256) + 64;
  let green = Math.floor(Math.random() * 256) + 64;
  let blue = Math.floor(Math.random() * 256) + 64;

  // Construct a color withe the given values
  let bgColor = "rgb(" + red + "," + green + "," + blue + ")";

  // Set the background to that color
  document.body.style.background = bgColor;
}

function loadTrack(track_index) {
  clearInterval(updateTimer);
  resetValues();
  curr_track.src = track_list[track_index].path;
  curr_track.load();

  track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
  track_name.textContent = track_list[track_index].name;
  track_artist.textContent = track_list[track_index].artist;
  now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;

  updateTimer = setInterval(seekUpdate, 1000);
  curr_track.addEventListener("ended", nextTrack);
  random_bg_color();
}

function resetValues() {
  curr_time.textContent = "00:00";
  total_duration.textContent = "00:00";
  seek_slider.value = 0;
}

// Load the first track in the tracklist
loadTrack(track_index);

function playpauseTrack() {
  if (!isPlaying) playTrack();
  else pauseTrack();
}

function playTrack() {
  curr_track.play();
  isPlaying = true;
  playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}

function pauseTrack() {
  curr_track.pause();
  isPlaying = false;
  playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
}

function nextTrack() {
  if (track_index < track_list.length - 1)
    track_index += 1;
  else track_index = 0;
  loadTrack(track_index);
  playTrack();
}

function prevTrack() {
  if (track_index > 0)
    track_index -= 1;
  else track_index = track_list.length;
  loadTrack(track_index);
  playTrack();
}

function seekTo() {
  let seekto = curr_track.duration * (seek_slider.value / 100);
  curr_track.currentTime = seekto;
}

function setVolume() {
  curr_track.volume = volume_slider.value / 100;
}

function seekUpdate() {
  let seekPosition = 0;

  if (!isNaN(curr_track.duration)) {
    seekPosition = curr_track.currentTime * (100 / curr_track.duration);

    seek_slider.value = seekPosition;

    let currentMinutes = Math.floor(curr_track.currentTime / 60);
    let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
    let durationMinutes = Math.floor(curr_track.duration / 60);
    let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

    if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
    if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
    if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

    curr_time.textContent = currentMinutes + ":" + currentSeconds;
    total_duration.textContent = durationMinutes + ":" + durationSeconds;
  }
}


