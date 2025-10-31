// TelyRx Workshop App JavaScript

// Navigation System
function navigateTo(pageName) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Remove active state from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected page
    const targetPage = document.getElementById(pageName);
    if (targetPage) {
        targetPage.classList.add('active');
    }
    
    // Add active state to corresponding nav button
    const targetBtn = document.querySelector(`[data-page="${pageName}"]`);
    if (targetBtn) {
        targetBtn.classList.add('active');
    }
    
    // Scroll to top
    window.scrollTo(0, 0);
}

// Initialize navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add click listeners to nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pageName = btn.getAttribute('data-page');
            navigateTo(pageName);
        });
    });
    
    // Countdown Timer
    initCountdown();
    
    // Photo Upload Preview
    initPhotoUpload();
});

// Countdown Timer
function initCountdown() {
    const targetDate = new Date('December 3, 2025 10:00:00').getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById('days').textContent = String(days).padStart(2, '0');
        document.getElementById('hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
    }
    
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Photo Upload Preview
function initPhotoUpload() {
    const photoInput = document.getElementById('photoUpload');
    const photoPreview = document.getElementById('photoPreview');
    
    if (photoInput && photoPreview) {
        photoInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    photoPreview.innerHTML = `<img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 50%;">`;
                };
                reader.readAsDataURL(file);
            }
        });
    }
}

// Workshop Booking
function bookWorkshop(button) {
    const wasBooked = button.textContent === 'Booked! ✓';
    
    if (wasBooked) {
        button.textContent = 'Book Now';
        button.classList.remove('booked');
        
        // Update spot count (increase available spots)
        const card = button.closest('.workshop-card');
        const badge = card.querySelector('.spots-badge');
        const [current, total] = badge.textContent.split('/').map(n => parseInt(n));
        badge.textContent = `${current - 1}/${total} spots`;
    } else {
        button.textContent = 'Booked! ✓';
        button.classList.add('booked');
        
        // Update spot count (decrease available spots)
        const card = button.closest('.workshop-card');
        const badge = card.querySelector('.spots-badge');
        const [current, total] = badge.textContent.split('/').map(n => parseInt(n));
        badge.textContent = `${current + 1}/${total} spots`;
        
        // Vibration feedback (if supported)
        if (navigator.vibrate) {
            navigator.vibrate(50);
        }
    }
}

// Make navigateTo available globally
window.navigateTo = navigateTo;