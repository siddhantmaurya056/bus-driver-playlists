// ========================================
// BUS DRIVER - YOUTUBE MUSIC PLAYER
// ========================================

let player;
let playerReady = false;

// YouTube Playlist ID
const PLAYLIST_ID = "PLfaTdxNMZmGM";

// Elements
const songTitle = document.getElementById("songTitle");
const artist = document.getElementById("artist");
const playButton = document.getElementById("playButton");
const progress = document.getElementById("progress");
const currentTime = document.getElementById("currentTime");
const duration = document.getElementById("duration");


// ========================================
// YOUTUBE PLAYER READY
// ========================================

function onYouTubeIframeAPIReady() {

    player = new YT.Player("youtube-player", {

        height: "1",
        width: "1",

        playerVars: {
            listType: "playlist",
            list: PLAYLIST_ID,
            autoplay: 0,
            controls: 0,
            rel: 0
        },

        events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange
        }
    });
}


// ========================================
// PLAYER READY
// ========================================

function onPlayerReady(event) {

    playerReady = true;

    songTitle.innerText = "Bus Driver Playlist";
    artist.innerText = "YouTube Music";

    currentTime.innerText = "0:00";
    duration.innerText = "0:00";

    console.log("YouTube Player Ready");
}


// ========================================
// PLAY / PAUSE
// ========================================

function togglePlay() {

    if (!playerReady) {
        alert("YouTube player loading...");
        return;
    }

    const state = player.getPlayerState();

    if (state === YT.PlayerState.PLAYING) {

        player.pauseVideo();
        playButton.innerHTML = "▶";

    } else {

        player.playVideo();
        playButton.innerHTML = "⏸";
    }
}


// ========================================
// NEXT SONG
// ========================================

function nextSong() {

    if (!playerReady) return;

    player.nextVideo();
    playButton.innerHTML = "⏸";
}


// ========================================
// PREVIOUS SONG
// ========================================

function previousSong() {

    if (!playerReady) return;

    player.previousVideo();
    playButton.innerHTML = "⏸";
}


// ========================================
// PLAYER STATE CHANGE
// ========================================

function onPlayerStateChange(event) {

    if (event.data === YT.PlayerState.PLAYING) {

        playButton.innerHTML = "⏸";

    }

    else if (
        event.data === YT.PlayerState.PAUSED ||
        event.data === YT.PlayerState.ENDED
    ) {

        playButton.innerHTML = "▶";
    }

    updateSongInfo();
}


// ========================================
// SONG INFORMATION
// ========================================

function updateSongInfo() {

    if (!playerReady) return;

    setTimeout(function () {

        const videoData = player.getVideoData();

        if (videoData && videoData.title) {

            songTitle.innerText = videoData.title;

            artist.innerText =
                videoData.author || "YouTube Music";
        }

    }, 500);
}


// ========================================
// PROGRESS BAR
// ========================================

setInterval(function () {

    if (!playerReady) return;

    const total = player.getDuration();
    const current = player.getCurrentTime();

    if (!total || total <= 0) return;

    const percent = (current / total) * 100;

    progress.value = percent;

    currentTime.innerText = formatTime(current);
    duration.innerText = formatTime(total);

}, 500);


// ========================================
// CLICK PROGRESS BAR
// ========================================

progress.addEventListener("input", function () {

    if (!playerReady) return;

    const total = player.getDuration();

    if (!total) return;

    const newTime = (progress.value / 100) * total;

    player.seekTo(newTime, true);
});


// ========================================
// FORMAT TIME
// ========================================

function formatTime(time) {

    if (isNaN(time)) return "0:00";

    let minutes = Math.floor(time / 60);

    let seconds = Math.floor(time % 60);

    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return minutes + ":" + seconds;
}


// ========================================
// MUTE / UNMUTE
// ========================================

function toggleMute() {

    if (!playerReady) return;

    if (player.isMuted()) {

        player.unMute();

    } else {

        player.mute();
    }
}


// ========================================
// HORN
// ========================================

function playHorn() {

    const horn = document.getElementById("horn");

    horn.currentTime = 0;

    horn.play();
}


// ========================================
// ROUTE POPUP
// ========================================

function showRoute() {

    document.getElementById("routePopup").style.display = "flex";
}


function closeRoute() {

    document.getElementById("routePopup").style.display = "none";
}


// ========================================
// SHARE WEBSITE
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
