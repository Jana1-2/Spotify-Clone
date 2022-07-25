console.log("Welcome to spotify");

//intialise the variables
let songindex = 0;
let audioelement = new Audio('songs/1.mp3');
let myprogressbar = document.getElementById('myprogressbar');
let masterplay = document.getElementById('masterplay');
let gif = document.getElementById('gif');
let mastersongname = document.getElementById('mastersongname');
let songitem=Array.from(document.getElementsByClassName('songitem'));

let songs = [
        {songname: "Pookal Pookum", filepath: "songs/1.mp3", coverpath: "cover/1.jpg"},
        {songname: "Irava Pagala", filepath: "songs/2.mp3", coverpath: "cover/2.jfif"},
        {songname: "Munbe Vaa", filepath: "songs/3.mp3", coverpath: "cover/3.jfif"},
        {songname: "Jay Jay", filepath: "songs/4.mp3", coverpath: "cover/4.png"},
        {songname: "Narumugaiye", filepath: "songs/5.mp3", coverpath: "cover/5.jpg"},
        {songname: "Muzhumathi", filepath: "songs/6.mp3", coverpath: "cover/6.jpg"},
        {songname: "Ennadi Mayavi Nee", filepath: "songs/7.mp3", coverpath: "cover/7.jfif"},
]

//set image and songname for each song item
songitem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src=songs[i].coverpath;
    element.getElementsByClassName("songname")[0].innerText=songs[i].songname;
});


//handle play,pause,click
masterplay.addEventListener('click', ()=>{
    if(audioelement.paused || audioelement.currentTime<=0){
        //play the song
        audioelement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else
    {
        //pause the song
        audioelement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})



//listen to events
audioelement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioelement.currentTime/audioelement.duration)* 100);
    myprogressbar.value = progress;
})  

//change playing when clicked on seekbar
myprogressbar.addEventListener('change', ()=>{
    audioelement.currentTime = myprogressbar.value * audioelement.duration/100;
})

const makeallplays = ()=>{
    Array.from(document.getElementsByClassName('playeachsong')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
        
    })
}

//play each song from list
Array.from(document.getElementsByClassName('playeachsong')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeallplays();
        songindex = parseInt(e.target.id);
        audioelement.src=`songs/${songindex+1}.mp3`;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioelement.currentTime=0;
        audioelement.play();
        gif.style.opacity = 1;
        mastersongname.innerText = songs[songindex].songname;
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})

//play next song
document.getElementById('next').addEventListener('click', (e)=>{
    if(songindex>6)
    {
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioelement.src=`songs/${songindex+1}.mp3`;
    audioelement.currentTime=0;
    audioelement.play();
    mastersongname.innerText = songs[songindex].songname;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})

//play previos song
document.getElementById('previous').addEventListener('click', ()=>{
    if(songindex<1)
    {
        songindex=6;
    }
    else{
        songindex-=1;
    }
    audioelement.src=`songs/${songindex+1}.mp3`;
    audioelement.currentTime=0;
    audioelement.play();
    mastersongname.innerText = songs[songindex].songname;
    masterplay.classList.remove('fa-circle-play');
    masterplay.classList.add('fa-circle-pause');
})