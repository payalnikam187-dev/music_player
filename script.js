const audio = document.getElementById('audio-player');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const currentTimeEl = document.getElementById('current-time');
const durationEl = document.getElementById('duration');
const volumeSlider = document.getElementById('volume-slider');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const albumImage = document.getElementById('album-image');

// SINGLE SONG (matches your file)
const song = {
    title: "My Favorite Song",
    artist: "Payal • Demo Track",
    src: "song1.mp3",           // ← This must match the file name
    cover: "https://picsum.photos/id/1015/400/400"
};

function loadSong() {
    audio.src = song.src;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    albumImage.src = song.cover;
}

function togglePlayPause() {
    if (audio.paused) {
        audio.play().catch(e => {
            console.error(e);
            alert("Cannot play music.\nMake sure song1.mp3 is in the music-player folder!");
        });
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } else {
        audio.pause();
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
    }
}

// Progress bar & time
audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const progress = (audio.currentTime / audio.duration) * 100;
        progressBar.value = progress;

        const curMin = Math.floor(audio.currentTime / 60);
        const curSec = Math.floor(audio.currentTime % 60);
        currentTimeEl.textContent = `\( {curMin}: \){curSec < 10 ? '0' : ''}${curSec}`;

        const durMin = Math.floor(audio.duration / 60);
        const durSec = Math.floor(audio.duration % 60);
        durationEl.textContent = `\( {durMin}: \){durSec < 10 ? '0' : ''}${durSec}`;
    }
});

progressBar.addEventListener('input', () => {
    audio.currentTime = (progressBar.value / 100) * audio.duration;
});

volumeSlider.addEventListener('input', () => {
    audio.volume = volumeSlider.value / 100;
});

playPauseBtn.addEventListener('click', togglePlayPause);

// Spacebar support
document.addEventListener('keydown', e => {
    if (e.key === " ") {
        e.preventDefault();
        togglePlayPause();
    }
});

// Start
loadSong();