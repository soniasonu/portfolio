// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// Close mobile menu when a link is clicked
document.querySelectorAll('.navbar a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navbar.classList.remove('active');
    });
});

// Active nav link highlighting on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.navbar a');

window.addEventListener('scroll', () => {
    let current = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });

    // Header shadow on scroll
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 100);
});

// Contact form - actually sends the message via Web3Forms
const contactForm = document.querySelector('.contact form');
const statusMsg = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = contactForm.querySelector('[name="name"]').value.trim();
        const email = contactForm.querySelector('[name="email"]').value.trim();
        const message = contactForm.querySelector('[name="message"]').value.trim();

        if (!name || !email || !message) {
            alert('Please fill in your name, email, and message.');
            return;
        }

        try {
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: new FormData(contactForm),
                headers: { 'Accept': 'application/json' }
            });

            if (response.ok) {
                statusMsg.textContent = "Thanks for reaching out! I'll get back to you soon.";   // <-- CHANGED
                statusMsg.style.color = "lightgreen";   
                contactForm.reset();
            } else {
                statusMsg.textContent = "Something went wrong. Please try again or email me directly.";  // <-- CHANGED
                statusMsg.style.color = "tomato"; 
            }
        } catch (error) {
            statusMsg.textContent = "Something went wrong. Please try again or email me directly.";  // <-- CHANGED
            statusMsg.style.color = "tomato"; 
        }
    });
}


// Project card flip
document.querySelectorAll('.flip-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        btn.closest('.project-card').classList.toggle('flipped');
    });
});

// Running line of beliefs - duplicate for a seamless loop
const beliefsTrack = document.querySelector('.beliefs-track');
if (beliefsTrack) {
    beliefsTrack.innerHTML += beliefsTrack.innerHTML;
}

// Running line of words - duplicate for a seamless loop
const wordsTrack = document.querySelector('.words-track');
if (wordsTrack) {
    wordsTrack.innerHTML += wordsTrack.innerHTML;
}

let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const current = window.scrollY;
    header.classList.toggle('hide', current > lastScroll && current > 150);
    lastScroll = current;
});


// Mobile project slider (uses the same project cards as desktop)
const mTrack = document.querySelector('.projects-container');
const mCount = document.getElementById('m-count');
const mPrev = document.getElementById('m-prev');
const mNext = document.getElementById('m-next');

if (mTrack && mCount && mPrev && mNext) {
    const mSlides = mTrack.querySelectorAll('.project-card');
    const pad = n => String(n).padStart(2, '0');

    const step = () =>
        (mSlides.length > 1 ? mSlides[1].offsetLeft - mSlides[0].offsetLeft : mTrack.clientWidth) || 1;
    const current = () => Math.round(mTrack.scrollLeft / step());

    const goTo = i => {
        const n = Math.max(0, Math.min(mSlides.length - 1, i));
        mTrack.scrollTo({ left: n * step(), behavior: 'smooth' });
    };

    let lastIndex = 0;
    const update = () => {
        const i = current();
        mCount.textContent = `${pad(i + 1)} / ${pad(mSlides.length)}`;

        // when the slide changes, turn all cards back to the front
        if (i !== lastIndex) {
            mSlides.forEach(card => card.classList.remove('flipped'));
            lastIndex = i;
        }
    };

    mPrev.addEventListener('click', () => goTo(current() - 1));
    mNext.addEventListener('click', () => goTo(current() + 1));
    mTrack.addEventListener('scroll', update);
    update();
}