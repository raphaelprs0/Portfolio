/* --- MUSIC DATA --- */
// Make sure to put your real MP3 files in the assets/audio/ folder
const maPlaylist = [
    {
        titre: "Don't Matter To Me",
        artiste: "Drake",
        image: "assets/images/Drake-cover.jpg",
        fichier: "assets/audio/Don't Matter To Me.mp3" 
    },
    {
        titre: "Is It a Crime",
        artiste: "Sade",
        image: "assets/images/Sade-cover.jpg",
        fichier: "assets/audio/Is It a Crime.mp3"
    },
    {
        titre: "Ridin'",
        artiste: "Booba",
        image: "assets/images/Booba-cover.jpeg",
        fichier: "assets/audio/Ridin'.mp3"
    }
];

/* --- LOGIC FOR MUSIC PAGE --- */
const musicContainer = document.getElementById('music-grid');

if (musicContainer) {
    maPlaylist.forEach(track => {
        musicContainer.innerHTML += `
            <article class="card">
                <img src="${track.image}" alt="Cover" style="width:100%; border-radius:4px; margin-bottom:15px;">
                <h3 style="font-size:1.1rem;">${track.titre}</h3>
                <p style="color:gray; font-size:0.9rem; margin-bottom:15px;">${track.artiste}</p>
                
                <audio controls>
                    <source src="${track.fichier}" type="audio/mpeg">
                    Your browser does not support the audio element.
                </audio>
            </article>
        `;
    });
}