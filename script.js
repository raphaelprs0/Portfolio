document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const glider = document.querySelector('.nav-glider');
    const sections = document.querySelectorAll('.tab-content');
    const pillNav = document.querySelector('.pill-nav');

    // === NAVIGATION ===
    function moveGlider(element) {
        if (!element || !glider || !pillNav) return;

        const padding = 8; // Padding du pill-nav
        const width = element.offsetWidth;
        const left = element.offsetLeft;

        glider.style.width = `${width}px`;
        glider.style.transform = `translateX(${left - padding}px)`;
        glider.style.opacity = '1';
    }

    function switchTab(targetId) {
        sections.forEach(section => {
            section.classList.remove('active');
        });

        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    // Initialisation du glider
    setTimeout(() => {
        const activeItem = document.querySelector('.nav-item.active');
        moveGlider(activeItem);
    }, 50);

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');
            moveGlider(item);
            const target = item.getAttribute('data-target');
            switchTab(target);
        });
    });

    window.addEventListener('resize', () => {
        const currentActive = document.querySelector('.nav-item.active');
        moveGlider(currentActive);
    });

    // === MUSIC PLAYER ===
    const musicCards = document.querySelectorAll('.music-card');
    const miniPlayer = document.getElementById('mini-player');
    const miniCover = document.getElementById('mini-cover');
    const miniTitle = document.getElementById('mini-title');
    const miniArtist = document.getElementById('mini-artist');
    const miniPlayBtn = document.getElementById('mini-play');
    const miniPrevBtn = document.getElementById('mini-prev');
    const miniNextBtn = document.getElementById('mini-next');
    const miniCloseBtn = document.getElementById('mini-close');

    let currentTrackIndex = -1;
    let isPlaying = false;
    let allAudios = document.querySelectorAll('.music-card audio');

    // Données des pistes
    const tracks = [
        { title: "Don't Matter To Me", artist: "Drake feat. Michael Jackson", cover: "assets/images/Drake-cover.jpg" },
        { title: "Is It a Crime", artist: "Sade", cover: "assets/images/Sade-cover.jpg" },
        { title: "Ridin'", artist: "Booba", cover: "assets/images/Booba-cover.jpeg" }
    ];

    // Pause tous les audios sauf celui en cours et reset au début
    function pauseAllExcept(exceptIndex) {
        allAudios.forEach((audio, index) => {
            if (index !== exceptIndex) {
                audio.pause();
                audio.currentTime = 0; // Reset au début
                const card = audio.closest('.music-card');
                if (card) {
                    card.classList.remove('playing');
                    const btn = card.querySelector('.play-btn');
                    if (btn) btn.textContent = '▶';
                }
            }
        });
    }

    // Jouer une piste
    function playTrack(index) {
        if (index < 0 || index >= allAudios.length) return;

        pauseAllExcept(index);
        currentTrackIndex = index;
        
        const audio = allAudios[index];
        const card = musicCards[index];
        const track = tracks[index];

        // Mettre à jour le mini player
        miniCover.src = track.cover;
        miniTitle.textContent = track.title;
        miniArtist.textContent = track.artist;
        miniPlayer.classList.remove('hidden');

        // Jouer
        audio.play();
        isPlaying = true;
        card.classList.add('playing');
        card.querySelector('.play-btn').textContent = '⏸';
        miniPlayBtn.textContent = '⏸';
    }

    // Pause la piste en cours
    function pauseCurrentTrack() {
        if (currentTrackIndex < 0) return;
        
        const audio = allAudios[currentTrackIndex];
        const card = musicCards[currentTrackIndex];

        audio.pause();
        isPlaying = false;
        card.classList.remove('playing');
        card.querySelector('.play-btn').textContent = '▶';
        miniPlayBtn.textContent = '▶';
    }

    // Toggle play/pause
    function togglePlay() {
        if (currentTrackIndex < 0) {
            playTrack(0);
            return;
        }

        if (isPlaying) {
            pauseCurrentTrack();
        } else {
            playTrack(currentTrackIndex);
        }
    }

    // Piste suivante
    function nextTrack() {
        const nextIndex = (currentTrackIndex + 1) % allAudios.length;
        playTrack(nextIndex);
    }

    // Piste précédente
    function prevTrack() {
        const prevIndex = currentTrackIndex <= 0 ? allAudios.length - 1 : currentTrackIndex - 1;
        playTrack(prevIndex);
    }

    // Fermer le mini player
    function closeMiniPlayer() {
        pauseCurrentTrack();
        miniPlayer.classList.add('hidden');
        currentTrackIndex = -1;
    }

    // Event listeners pour les cartes de musique
    musicCards.forEach((card, index) => {
        const playBtn = card.querySelector('.play-btn');
        
        playBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (currentTrackIndex === index && isPlaying) {
                pauseCurrentTrack();
            } else {
                playTrack(index);
            }
        });

        card.addEventListener('click', () => {
            if (currentTrackIndex === index && isPlaying) {
                pauseCurrentTrack();
            } else {
                playTrack(index);
            }
        });
    });

    // Event listeners pour le mini player
    miniPlayBtn.addEventListener('click', togglePlay);
    miniNextBtn.addEventListener('click', nextTrack);
    miniPrevBtn.addEventListener('click', prevTrack);
    miniCloseBtn.addEventListener('click', closeMiniPlayer);

    // === SLIDER DE PROGRESSION ===
    const progressSlider = document.getElementById('progress-slider');
    const currentTimeEl = document.getElementById('current-time');
    const durationTimeEl = document.getElementById('duration-time');

    // Formater le temps en mm:ss
    function formatTime(seconds) {
        if (isNaN(seconds)) return '0:00';
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    }

    // Mettre à jour le slider pendant la lecture
    allAudios.forEach((audio) => {
        audio.addEventListener('timeupdate', () => {
            if (audio === allAudios[currentTrackIndex] && !progressSlider.dataset.dragging) {
                const percent = (audio.currentTime / audio.duration) * 100;
                progressSlider.value = percent || 0;
                currentTimeEl.textContent = formatTime(audio.currentTime);
                // Calculer le temps restant
                const remaining = audio.duration - audio.currentTime;
                durationTimeEl.textContent = "-" + formatTime(remaining);
            }
        });

        audio.addEventListener('loadedmetadata', () => {
            if (audio === allAudios[currentTrackIndex]) {
                durationTimeEl.textContent = "-" + formatTime(audio.duration);
            }
        });

        audio.addEventListener('durationchange', () => {
            if (audio === allAudios[currentTrackIndex]) {
                durationTimeEl.textContent = "-" + formatTime(audio.duration);
            }
        });
    });

    // Contrôle du slider par l'utilisateur
    progressSlider.addEventListener('input', () => {
        progressSlider.dataset.dragging = 'true';
    });

    progressSlider.addEventListener('change', () => {
        if (currentTrackIndex >= 0) {
            const audio = allAudios[currentTrackIndex];
            const time = (progressSlider.value / 100) * audio.duration;
            audio.currentTime = time;
        }
        delete progressSlider.dataset.dragging;
    });

    // Quand une piste se termine, passer à la suivante
    allAudios.forEach((audio, index) => {
        audio.addEventListener('ended', () => {
            nextTrack();
        });
    });
});

// Fonction globale pour le bouton du Hero
window.switchTab = function(targetId) {
    const targetLink = document.querySelector(`.nav-item[data-target="${targetId}"]`);
    if(targetLink) {
        targetLink.click();
    }
};
// GESTION DU FORMULAIRE CONTACT (AJOUT)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Empêche le rechargement de la page
        
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Envoi en cours...';
        submitBtn.disabled = true;

        // Récupération des données
        const formData = new FormData(contactForm);
        const data = {
            name: formData.get('name'), // Assure-toi que ton input a name="name" (pas "nom")
            email: formData.get('email'),
            message: formData.get('message')
        };

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                alert('Message envoyé avec succès !');
                contactForm.reset();
            } else {
                alert('Erreur lors de l\'envoi. Réessayez.');
            }
        } catch (error) {
            console.error('Erreur:', error);
            alert('Une erreur est survenue.');
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });
}