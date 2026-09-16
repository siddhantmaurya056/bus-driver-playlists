// ========================================
// BUS DRIVER PLAYLIST
// ========================================


// ========================================
// SONGS LIST
// ========================================

const songs = [
    {
        title: "Ek dil hai",
        artist: "Bus Driver Radio",
        file: "music/song1.mp3"
    },
    {
        title: "Hum Tumko Nigaho Mein Iss Tarah Chupa Lenge",
        artist: "Bus Driver Radio",
        file: "music/song2.mp3"
    },
    {
        title: "Hamein tumse hua hai pyaar",
        artist: "Bus Driver Radio",
        file: "music/song3.mp3"
    },
    {
        title: "Tumhe Dekhi Meri Ankhen",
        artist: "Bus Driver Radio",
        file: "music/song4.mp3"
    },
    {
        title: "Bahut Jatate ho chah humse",
        artist: "Bus Driver Radio",
        file: "music/song5.mp3"
    },
    {
        title: "Dil laga liya maine tumse pyaar karke",
        artist: "Bus Driver Radio",
        file: "music/song6.mp3"
    },
    {
        title: "Barsaat ke mausam mein",
        artist: "Bus Driver Radio",
        file: "music/song7.mp3"
    },
    {
        title: "Chunnari chunnari",
        artist: "Bus Driver Radio",
        file: "music/song8.mp3"
    },
    {
        title: "Ye dua hai meri raab se",
        artist: "Bus Driver Radio",
        file: "music/song9.mp3"
    },
    {
        title: "Aaye ho meri zindagi mein tum bahaar banke",
        artist: "Bus Driver Radio",
        file: "music/song10.mp3"
    }
];


// ========================================
// GET HTML ELEMENTS
// ========================================

const audio = document.getElementById("audio");

const songTitle = document.getElementById("songTitle");

const artist = document.getElementById("artist");

const playButton = document.getElementById("playButton");

const progress = document.getElementById("progress");

const currentTime = document.getElementById("currentTime");

const duration = document.getElementById("duration");

const songList = document.getElementById("songList");


// ========================================
// CURRENT SONG
// ========================================

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

    updateActiveSong();

}


// ========================================
// DISPLAY SONG LIST
// ========================================

function displaySongs() {

    songList.innerHTML = "";

    songs.forEach(function(song, index) {

        const songItem = document.createElement("button");

        songItem.type = "button";

        songItem.className = "song-item";

        songItem.textContent =
            "🎵 " + (index + 1) + ". " + song.title;


        songItem.addEventListener("click", function() {

            loadSong(index);

            audio.play()
                .then(function() {

                    playButton.textContent = "⏸";

                })
                .catch(function(error) {

                    console.log("Audio play error:", error);

                });

        });


        songList.appendChild(songItem);

    });

}


// ========================================
// ACTIVE SONG
// ========================================

function updateActiveSong() {

    const allSongs =
        document.querySelectorAll(".song-item");

    allSongs.forEach(function(item, index) {

        if (index === currentSong) {

            item.classList.add("active");

        } else {

            item.classList.remove("active");

        }

    });

}


// ========================================
// PLAY / PAUSE
// ========================================

function togglePlay() {

    if (audio.paused) {

        audio.play()
            .then(function() {

                playButton.textContent = "⏸";

            })
            .catch(function(error) {

                console.log("Play error:", error);

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
        .then(function() {

            playButton.textContent = "⏸";

        })
        .catch(function(error) {

            console.log("Next song error:", error);

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
        .then(function() {

            playButton.textContent = "⏸";

        })
        .catch(function(error) {

            console.log("Previous song error:", error);

        });

}


// ========================================
// AUTO NEXT SONG
// ========================================

audio.addEventListener("ended", function() {

    nextSong();

});


// ========================================
// AUDIO PLAY EVENT
// ========================================

audio.addEventListener("play", function() {

    playButton.textContent = "⏸";

});


// ========================================
// AUDIO PAUSE EVENT
// ========================================

audio.addEventListener("pause", function() {

    playButton.textContent = "▶";

});


// ========================================
// AUDIO ERROR
// ========================================

audio.addEventListener("error", function() {

    console.log("Unable to load:",
        songs[currentSong].file);

});


// ========================================
// UPDATE PROGRESS
// ========================================

audio.addEventListener("timeupdate", function() {

    if (!audio.duration) {

        return;

    }

    const percentage =
        (audio.currentTime / audio.duration) * 100;

    progress.value = percentage;

    currentTime.textContent =
        formatTime(audio.currentTime);

    duration.textContent =
        formatTime(audio.duration);

});


// ========================================
// PROGRESS BAR CLICK
// ========================================

progress.addEventListener("input", function() {

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
        .catch(function(error) {

            console.log("Horn error:", error);

        });

}


// ========================================
// ROUTE POPUP
// ========================================

function showRoute() {

    document
        .getElementById("routePopup")
        .style.display = "flex";

}


function closeRoute() {

    document
        .getElementById("routePopup")
        .style.display = "none";

}


// ========================================
// SHARE WEBSITE
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


// ========================================
// INITIALIZE PLAYER
// ========================================

loadSong(0);

displaySongs();
