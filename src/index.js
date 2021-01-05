const image = document.querySelector('img')
const title = document.getElementById('title')
const artist = document.getElementById('artist')
const music = document.querySelector('audio')
const progressContainer = document.getElementById('progress-container')
const progress = document.getElementById('progress')
const prevBtn = document.querySelector('#prev')
const playBtn = document.querySelector('#play')
const nextBtn = document.querySelector('#next')

//Music
const songs = [
    {
        name: 'Jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'Jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'Jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (remix)',
        artist: 'Metric/Jasinto Design'
    }
]

//Check if Playing
let isPlaying = false

//Play
const playSong = () => {
    isPlaying = true
    playBtn.classList.replace('fa-play', 'fa-pause')
    playBtn.setAttribute('title', 'Pause')
    music.play()
}

//Pause
const pauseSong = () => {
    isPlaying = false
    playBtn.classList.replace('fa-pause', 'fa-play')
    playBtn.setAttribute('title', 'Play')
    music.pause()
}

//Play or Pause Event Listner
playBtn.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()))

//Update DOM
const loadSong = (song) => {
    title.textContent = song.displayName
    artist.textContent = song.artist
    music.src = `./music/${song.name}.mp3`
    image.src = `./img/${song.name}.jpg`
}

//Current Song
let songIndex = 0

//previous song
const prevSong = () => {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    playSong()
}

//next song
const nextSong = () => {
    songIndex++
    if (songIndex > songs.length - 1) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    playSong()
}

// On Load - Select First Song
loadSong(songs[songIndex])

//Update Progress Bar and Time
const updateProgressBar = (e) => {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement
        //Update progress bar width
        const progressPercent = (currentTime / duration) * 100
        progress.style.width = `${progressPercent}%`
    }
}

//Event Listners
prevBtn.addEventListener('click', prevSong)
nextBtn.addEventListener('click', nextSong)
music.addEventListener('timeupdate', updateProgressBar)