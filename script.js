
// ========================================
// BUS DRIVER MUSIC PLAYER
// ========================================

// Songs
const songs = [
    {
        title: "Ek Dil Hai",
        artist: "Bus Driver Radio",
        file: "music/song1.mp3"
    },
    {
        title: "Hum Tumko Nigahon Mein",
        artist: "Bus Driver Radio",
        file: "music/song2.mp3"
    },
    {
        title: "Hamein Tumse Hua Hai Pyaar",
        artist: "Bus Driver Radio",
        file: "music/song3.mp3"
    },
    {
        title: "Tumhe Dekhi Meri Aankhen",
        artist: "Bus Driver Radio",
        file: "music/song4.mp3"
    },
];


// ========================================
// ELEMENTS
// ========================================

const audio = document.getElementById("audio");

const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");

let currentSong = 0;


// ========================================
// LOAD SONG
// ========================================

function loadSong(index) {

    currentSong = index;

    audio.src = songs[index].file;

    songTitle.textContent = songs[index].title;
    artist.textContent = songs[index].artist;

    progress.value = 0;

    currentTime.textContent = "0:00";
    duration.textContent = "0:00";

    audio.load();

    console.log("Loading:", songs[index].file);
}


// ========================================
// FIRST SONG
// ========================================

loadSong(0);


// ========================================
// PLAY / PAUSE
// ========================================

function togglePlay() {

    if (audio.paused) {

        audio.play()
            .then(function () {

                playButton.textContent = "⏸";

            })
            .catch(function (error) {

                console.error("Play Error:", error);

                alert(
                    "Song play nahi ho raha. Pehle song1.mp3 ka path check karo."
                );

            });

    } else {

        audio.pause();

        playButton.textContent = "▶";
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

    audio.play()
        .then(function () {

            playButton.textContent = "⏸";

        })
        .catch(function (error) {

            console.error("Next Song Error:", error);

        });
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

    audio.play()
        .then(function () {

            playButton.textContent = "⏸";

        })
        .catch(function (error) {

            console.error("Previous Song Error:", error);

        });
}


// ========================================
// AUTO NEXT
// ========================================

audio.addEventListener("ended", function () {

    nextSong();

});


// ========================================
// PROGRESS UPDATE
// ========================================

audio.addEventListener("timeupdate", function () {

    if (!audio.duration) return;

    const percent =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percent;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


// ========================================
// AUDIO LOADED
// ========================================

audio.addEventListener("loadedmetadata", function () {

    duration.textContent =
        formatTime(audio.duration);

});


// ========================================
// AUDIO ERROR
// ========================================

audio.addEventListener("error", function () {

    console.error("Audio Error:", audio.error);

    alert(
        "MP3 file load nahi hui. music folder aur file name check karo."
    );

});


// ========================================
// PROGRESS BAR
// ========================================

progress.addEventListener("input", function () {

    if (!audio.duration) return;

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

    const minutes =
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

    horn.play()
        .catch(function (error) {

            console.error("Horn Error:", error);

        });

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

            title: "Bus Driver Playlist",

            text: "Come along for the journey! 🚌",

            url: window.location.href

        });

    } else {

        alert(
            "Share this website using your browser's share option."
        );

    }
}
```
