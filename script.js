const SUPABASE_URL = "https://lcwuuyxswtxboxoeyljj.supabase.co";
const SUPABASE_API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxjd3V1eXhzd3R4Ym94b2V5bGpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQxMDYwNDEsImV4cCI6MjA1OTY4MjA0MX0.AzDPH4BURacSsI3nYLmejjEMH4Z2m_ew0ACcLYUwIAU";

const form = document.getElementById('rsvpForm');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const coming = document.querySelector('input[name="coming"]:checked').id === 'yes';

    const formData = {
        guest_full_name: fullName,
        is_comes: coming,
    };

    try {
        const response = await fetch(`${SUPABASE_URL}/rest/v1/rsvp_guests`, {
            method: "POST",
            headers: {
                "apikey": SUPABASE_API_KEY,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) throw new Error("Submission failed");

        form.reset();
    } catch (err) {
        alert("Қате: жіберу сәтсіз аяқталды.");
        console.error(err);
    }
});

window.addEventListener("DOMContentLoaded", () => {
    console.log("DOM Loaded ✅");

    gsap.registerPlugin(ScrollTrigger);

    document.querySelectorAll(".content").forEach((content, i) => {
        console.log("Triggering block", i);

        ScrollTrigger.create({
            trigger: content,
            start: "top center",
            scroller: ".scroll-container", // <== это важно
            onEnter: () => {
                gsap.fromTo(content.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 1, stagger: 0.1 }
                );
            },
            once: true
        });
    });
});

document.getElementById("rsvpForm").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Рахмет! Сіздің жауабыңыз қабылданды 🎉");
});

function handleSubmit(event) {
    event.preventDefault();

    const submitArea = document.getElementById('submitArea');
    submitArea.innerHTML = `<h5 style="margin-top: 32px;">Рахмет! Сіздің жауабыңыз қабылданды 🎉</h5>`;
}

const button = document.getElementById("togglePlayPause");
const icon = button.querySelector("i");
const audio = document.getElementById("audio");

button.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        icon.classList.remove("bi-play");
        icon.classList.add("bi-pause");
    } else {
        audio.pause();
        icon.classList.remove("bi-pause");
        icon.classList.add("bi-play");
    }
});