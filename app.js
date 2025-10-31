/* ============================================
   TELYRX WORKSHOP APP - JAVASCRIPT
   Navigation, Interactions, & Features
   ============================================ */

// ===== PAGE NAVIGATION =====
function showPage(pageName) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    const targetPage = document.getElementById(`${pageName}-page`);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Update nav buttons
    const navButtons = document.querySelectorAll('.nav-btn');
    navButtons.forEach(btn => btn.classList.remove('active'));
    
    const activeNavBtn = Array.from(navButtons).find(btn => 
        btn.getAttribute('onclick').includes(pageName)
    );
    if (activeNavBtn) {
        activeNavBtn.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// ===== WORKSHOP DETAIL VIEW =====
function showWorkshop(workshopId) {
    // In a real app, this would load workshop data
    // For now, just show the workshop detail page
    const detailPage = document.getElementById('workshop-detail');
    if (detailPage) {
        detailPage.classList.add('active');
    }
}

// ===== COUNTDOWN TIMER =====
function updateCountdown() {
    const workshopDate = new Date('December 3, 2025 10:00:00').getTime();
    const now = new Date().getTime();
    const distance = workshopDate - now;
    
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    
    if (daysEl) daysEl.textContent = days;
    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
}

// Update countdown every minute
setInterval(updateCountdown, 60000);

// ===== PROFILE PHOTO UPLOAD =====
document.addEventListener('DOMContentLoaded', function() {
    const photoUpload = document.getElementById('photo-upload');
    const photoInput = document.getElementById('profile-photo-input');
    const photoPreview = document.getElementById('profile-photo-preview');
    
    if (photoUpload && photoInput) {
        photoUpload.addEventListener('click', function() {
            photoInput.click();
        });
        
        photoInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    if (photoPreview) {
                        photoPreview.src = e.target.result;
                        photoPreview.style.display = 'block';
                        photoUpload.querySelector('.upload-placeholder').style.display = 'none';
                    }
                };
                reader.readAsDataURL(file);
            }
        });
    }
});

// ===== WORD CLOUD FUNCTIONALITY =====
let wordCloudData = [];

function submitWord() {
    const input = document.getElementById('wordcloud-input');
    const word = input.value.trim();
    
    if (word) {
        // Add word to data
        const existing = wordCloudData.find(item => item.text.toLowerCase() === word.toLowerCase());
        if (existing) {
            existing.weight += 1;
        } else {
            wordCloudData.push({ text: word, weight: 1 });
        }
        
        // Clear input
        input.value = '';
        
        // Update word cloud display
        updateWordCloud();
        
        // Show success message
        showNotification('Word added! ✨');
    }
}

function updateWordCloud() {
    const canvas = document.getElementById('wordcloud-canvas');
    if (!canvas) return;
    
    // Clear placeholder
    canvas.innerHTML = '';
    
    // For now, display words as a simple list
    // In production, you'd integrate wordcloud2.js here
    const wordList = document.createElement('div');
    wordList.style.display = 'flex';
    wordList.style.flexWrap = 'wrap';
    wordList.style.gap = '12px';
    wordList.style.justifyContent = 'center';
    wordList.style.alignItems = 'center';
    
    wordCloudData.forEach(item => {
        const wordEl = document.createElement('span');
        wordEl.textContent = item.text;
        wordEl.style.fontSize = `${Math.min(12 + item.weight * 4, 48)}px`;
        wordEl.style.fontWeight = '700';
        wordEl.style.color = getRandomTelyColor();
        wordEl.style.padding = '8px';
        wordList.appendChild(wordEl);
    });
    
    canvas.appendChild(wordList);
}

function getRandomTelyColor() {
    const colors = ['#1F01B9', '#B4E33D', '#3F612D', '#EFBCD5', '#FFC24C', '#DC471C'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.left = '50%';
    notification.style.transform = 'translateX(-50%)';
    notification.style.background = '#B4E33D';
    notification.style.color = '#333';
    notification.style.padding = '16px 24px';
    notification.style.borderRadius = '12px';
    notification.style.fontWeight = '600';
    notification.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)';
    notification.style.zIndex = '9999';
    notification.style.animation = 'slideDown 0.3s ease';
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes slideDown {
        from {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
        to {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
    }
    @keyframes slideUp {
        from {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
        }
        to {
            opacity: 0;
            transform: translateX(-50%) translateY(-20px);
        }
    }
`;
document.head.appendChild(style);

// ===== FORM SUBMISSIONS =====

// Profile Save
document.addEventListener('DOMContentLoaded', function() {
    const saveProfileBtn = document.querySelector('.save-profile-btn');
    if (saveProfileBtn) {
        saveProfileBtn.addEventListener('click', function() {
            // In production, this would save to Firebase
            showNotification('Profile saved! 🎉');
        });
    }
});

// Response Submissions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('submit-response-btn')) {
        const form = e.target.closest('.response-form');
        const textarea = form.querySelector('textarea');
        const text = textarea.value.trim();
        
        if (text) {
            // In production, this would save to Firebase
            showNotification('Response posted! 💬');
            textarea.value = '';
        }
    }
});

// Takeaway Submissions
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('submit-takeaway-btn')) {
        const form = e.target.closest('.takeaway-form');
        const textarea = form.querySelector('textarea');
        const text = textarea.value.trim();
        
        if (text) {
            // In production, this would save to Firebase
            showNotification('Takeaway saved! ⭐');
            textarea.value = '';
        }
    }
});

// ===== INSPO BOARD FUNCTIONS =====
function showUploadModal() {
    showNotification('Upload feature coming soon! 📷');
}

function addStickyNote() {
    const note = prompt('What\'s your idea?');
    if (note && note.trim()) {
        const inspoGrid = document.getElementById('inspo-grid');
        if (inspoGrid) {
            const colors = ['#FFC24C', '#EFBCD5', '#B4E33D'];
            const randomColor = colors[Math.floor(Math.random() * colors.length)];
            
            const stickyNote = document.createElement('div');
            stickyNote.className = 'sticky-note';
            stickyNote.style.background = randomColor;
            stickyNote.innerHTML = `
                <p>${note}</p>
                <span class="note-author">- You</span>
            `;
            
            inspoGrid.insertBefore(stickyNote, inspoGrid.firstChild);
            showNotification('Note added! 📝');
        }
    }
}

// ===== DALLAS GUIDE FILTER =====
function filterGuide(category) {
    // Update active button
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // In production, this would filter the guide cards
    showNotification(`Showing ${category} recommendations 🌟`);
}

// ===== ACTIVITY VOTING =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('activity-vote')) {
        const activityBtns = document.querySelectorAll('.activity-vote');
        activityBtns.forEach(btn => {
            btn.style.borderColor = 'transparent';
            btn.style.background = '#f0f0f0';
        });
        
        e.target.style.borderColor = '#B4E33D';
        e.target.style.background = 'white';
        
        showNotification('Vote recorded! 🎉');
    }
});

// ===== WORKSHOP BOOKING =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('book-btn') || 
        e.target.classList.contains('book-btn-large')) {
        // In production, this would handle actual booking
        showNotification('Workshop booked! Check your email for confirmation. 📧');
    }
});

// ===== PLAYLIST INTEGRATION =====
document.addEventListener('DOMContentLoaded', function() {
    const addSongBtn = document.querySelector('.add-song-btn');
    if (addSongBtn) {
        addSongBtn.addEventListener('click', function() {
            const input = document.getElementById('spotify-link');
            const link = input.value.trim();
            
            if (link) {
                // In production, this would add to Spotify playlist
                showNotification('Song added to playlist! 🎵');
                input.value = '';
            }
        });
    }
});

// ===== TRIVIA FUNCTIONALITY =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('start-trivia-btn')) {
        showNotification('Trivia game coming soon! 🎯');
    }
});

// ===== MEMORIES UPLOAD =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('upload-photo-btn')) {
        showNotification('Photo upload coming soon! 📸');
    }
});

// ===== COFFEE MATCHER =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('match-btn')) {
        showNotification('Match feature coming soon! ☕');
    }
});

// ===== DALLAS GUIDE RECOMMENDATIONS =====
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-recommendation-btn')) {
        const place = prompt('What place do you recommend?');
        if (place && place.trim()) {
            showNotification('Recommendation added! 🌟');
        }
    }
});

// ===== INITIALIZE APP =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('%c🎁 TelyRx Workshop App Loaded', 'color: #1F01B9; font-size: 16px; font-weight: bold;');
    console.log('%cUnwrapping 2026...', 'color: #B4E33D; font-size: 14px;');
    
    // Initialize countdown
    updateCountdown();
    
    // Show home page by default
    showPage('home');
});

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', function(e) {
    // Press 'h' for home
    if (e.key === 'h' && !e.target.matches('input, textarea')) {
        showPage('home');
    }
    // Press 's' for schedule
    if (e.key === 's' && !e.target.matches('input, textarea')) {
        showPage('schedule');
    }
    // Press 'p' for profile
    if (e.key === 'p' && !e.target.matches('input, textarea')) {
        showPage('profile');
    }
});

// ===== EXPORT FUNCTIONS FOR GLOBAL ACCESS =====
window.showPage = showPage;
window.showWorkshop = showWorkshop;
window.submitWord = submitWord;
window.showUploadModal = showUploadModal;
window.addStickyNote = addStickyNote;
window.filterGuide = filterGuide;