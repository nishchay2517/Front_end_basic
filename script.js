console.log("welcome to spotify");

let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let masterSongName = document.getElementById("masterSongName");

let songs = [
    {songName : "song1" , filePath : "songs/1.mp3" , coverPath : "covers/1.jpg"},
    {songName : "song2" , filePath : "songs/2.mp3" , coverPath : "covers/2.jpg"},
    {songName : "song3" , filePath : "songs/3.mp3" , coverPath : "covers/3.jpg"},
    {songName : "song4" , filePath : "songs/4.mp3" , coverPath : "covers/4.jpg"},
    {songName : "song5" , filePath : "songs/5.mp3" , coverPath : "covers/5.jpg"},
    {songName : "song6" , filePath : "songs/6.mp3" , coverPath : "covers/6.jpg"},
    {songName : "song7" , filePath : "songs/7.mp3" , coverPath : "covers/7.jpg"},
    {songName : "song8" , filePath : "songs/8.mp3" , coverPath : "covers/7.jpg"},
    {songName : "song9" , filePath : "songs/9.mp3" , coverPath : "covers/8.jpg"}
]

// audioElement.play();
songItem.forEach((element , i)=>{
    // console.log(element , i);
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})

masterPlay.addEventListener("click" , ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove("fa-circle-pause");
        masterPlay.classList.add("fa-circle-play");
        gif.style.opacity=0;
    }
})
audioElement.addEventListener('timeupdate' ,()=>{
    
    let progress = parseInt(audioElement.currentTime/audioElement.duration * 100);
    myProgressBar.value = progress;
} )

myProgressBar.addEventListener("change" , ()=>{
    audioElement.currentTime = myProgressBar.value *audioElement.duration / 100 ;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.add( "fa-circle-play" );
        element.classList.remove("fa-circle-pause");
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
    element.addEventListener('click' , (e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        masterPlay.classList.remove("fa-circle-play");
        masterPlay.classList.add("fa-circle-pause");
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime =0;
        audioElement.src=`songs/${songIndex+1}.mp3`;
        audioElement.play();
    })
})


document.getElementById("forward").addEventListener('click' , ()=>{
    if(songIndex >= 9){
        songIndex = 0;
    }
    else{
        songIndex+=1;
    }
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.play();
})
document.getElementById("previous").addEventListener('click' , ()=>{
    if(songIndex <=0){
        songIndex = 9;
    }
    else{
        songIndex-=1;
    }
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime =0;
    audioElement.src=`songs/${songIndex+1}.mp3`;
    audioElement.play();
})