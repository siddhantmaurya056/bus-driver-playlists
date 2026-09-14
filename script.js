// ========================================
// BUS DRIVER MUSIC PLAYER
// ========================================


// Songs List
const songs = [
    {
        title: "Safar Song 1",
        artist: "Bus Driver Radio",
        file: "music/song1.mp3"
    },

    {
        title: "Safar Song 2",
        artist: "Bus Driver Radio",
        file: "music/song2.mp3"
    },

    {
        title: "Safar Song 3",
        artist: "Bus Driver Radio",
        file: "music/song3.mp3"
    },

    {
        title: "Safar Song 4",
        artist: "Bus Driver Radio",
        file: "music/song4.mp3"
    }
];


// Audio
const audio = document.getElementById("audio");


// Elements
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const playButton = document.getElementById("playButton");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");


// Current song
let currentSong = 0;

currentTime.innerText = "0:00";
duration.innerText = "0:00";

// ========================================
// LOAD SONG
// ========================================

function loadSong(index) {

    currentSong = index;

    audio.src = songs[index].file;

    songTitle.innerText = songs[index].title;

    artist.innerText = songs[index].artist;

    progress.value = 0;

    currentTime.innerText = "0:00";
    duration.innerText = "0:00";

    audio.load();
}


// Load first song
loadSong(0);


// ========================================
// PLAY / PAUSE
// ========================================

function togglePlay() {

    if (audio.paused) {

        audio.play();

        playButton.innerHTML = "⏸";

    } else {

        audio.pause();

        playButton.innerHTML = "▶";

    }

}


// ========================================
// NEXT SONG
// ========================================

function nextSong() {

    currentSong++;

    if (currentSong >= songs.length) {

        currentSong = 0;

    }

    loadSong(currentSong);

    audio.play();

    playButton.innerHTML = "⏸";

}


// ========================================
// PREVIOUS SONG
// ========================================

function previousSong() {

    currentSong--;

    if (currentSong < 0) {

        currentSong = songs.length - 1;

    }

    loadSong(currentSong);

    audio.play();

    playButton.innerHTML = "⏸";

}


// ========================================
// AUTO NEXT
// ========================================

audio.addEventListener("ended", function () {

    nextSong();

});


// ========================================
// UPDATE PROGRESS
// ========================================

audio.addEventListener("timeupdate", function () {

    if (!audio.duration) {
        return;
    }

    const percent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percent;

    currentTime.innerText =
        formatTime(audio.currentTime);

    duration.innerText =
        formatTime(audio.duration);

});


// ========================================
// CLICK PROGRESS BAR
// ========================================

progress.addEventListener("input", function () {

    if (!audio.duration) {
        return;
    }

    audio.currentTime =
        (progress.value / 100) * audio.duration;

});


// ========================================
// FORMAT TIME
// ========================================

function formatTime(time) {

    if (isNaN(time)) {
        return "0:00";
    }

    let minutes =
        Math.floor(time / 60);

    let seconds =
        Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;

}


// ========================================
// MUTE
// ========================================

function toggleMute() {

    audio.muted = !audio.muted;

}


// ========================================
// HORN
// ========================================

function playHorn() {

    const horn =
        document.getElementById("horn");

    horn.currentTime = 0;

    horn.play();

}


// ========================================
// ROUTE POPUP
// ========================================

function showRoute() {

    document.getElementById("routePopup")
        .style.display = "flex";

}


function closeRoute() {

    document.getElementById("routePopup")
        .style.display = "none";

}


// ========================================
// SHARE
// ========================================

function shareWebsite() {

    if (navigator.share) {

        navigator.share({

            title: "Bus Driver",

            text: "Come along for the journey! 🚌",

            url: window.location.href

        });

    } else {

        alert(
            "Share this website using your browser's share option."
        );

    }

}
