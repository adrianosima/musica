import { songs } from "./data.js"

let correntMusic = 0

const music = document.querySelector('#audio')

const seekBar = document.querySelector('.sneek-bar')

const songName = document.querySelector('.music-name')

const artistName = document.querySelector('.artist-name')

const disk = document.querySelector('.disk')

const currentTime = document.querySelector('.current-time')

const musicDuration = document.querySelector('.song-duration')

const playBtn = document.querySelector('.play-btn')

const forwarBtn = document.querySelector('.forward-btn')

const backwardbtn = document.querySelector('.backward-btn')

playBtn.addEventListener('click', () => {
    if (playBtn.className.includes('pause')){
        music.play()
    }else {
        music.pause()
    }
    playBtn.classList.toggle('pause')
    disk.classList.toggle('play')
})

//setup Music

const setMusic = (i) => {
    seekBar.value = 0
    let song = songs[i]
    correntMusic = i
    music.src = song.path

    songName.innerHTML = song.name
    artistName.innerHTML = song.artist
    disk.style.backgroundImage = `url('${song.cover}')`

    currentTime.innerHTML = '00:00'
    setTimeout(() => {
        seekBar.max = music.duration
        musicDuration.innerHTML = formatTime(music.duration)
    }, 3000)
}

setMusic(0)

const formatTime = (time) => {
    let min = Math.floor(time / 60)
    let sec = Math.floor(time % 60)

    if (min < 10) {
        min = `0${min}`
    }
    if (sec < 10) {
        sec = `0${sec}`
    }
    return `${min}:${sec}`

}

setInterval(() => {
    seekBar.value = music.currentTime
    currentTime.innerHTML = formatTime(music.currentTime)
}, 500)

seekBar.addEventListener('change', () => {
    music.currentTime = seekBar.value
})


forwarBtn.addEventListener('click', () => {
    if(currentMusic >= songs.length -1){
        currentMusic =0 
    }else {
        currentMusic++
    }
    setMusic(correntMusic)
    playBtn.click()
})

backwardbtn.addEventListener('click', () => {
    if(correntMusic <= 0){
        correntMusic = songs.length -1

    }else {
        correntMusic--
    }
    setMusic(correntMusic)
    playBtn.click()
})