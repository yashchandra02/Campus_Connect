
/* ========================================
   CAMPUSCONNECT — EVENT DETAILS PAGE
======================================== */

/* ---------- EVENT DATA ---------- */

const events = [
    {
        id: 1,
        title: "Buildathon 2026",
        club: "CodeCraft",
        category: "Workshop",
        date: "2026-10-24",
        time: "10:00 AM",
        location: "Innovation Lab",
        description:
            "Team up with fellow students to build creative solutions to real-world problems.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 2,
        title: "Design Your World",
        club: "Creative Canvas",
        category: "Workshop",
        date: "2026-10-26",
        time: "2:00 PM",
        location: "Design Studio",
        description:
            "Explore visual storytelling, creative thinking, and the fundamentals of design.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 3,
        title: "Campus Open Mic",
        club: "Echo Music Society",
        category: "Performance",
        date: "2026-10-28",
        time: "5:00 PM",
        location: "Main Auditorium",
        description:
            "Enjoy an evening of live music, singing, and performances by fellow students.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 4,
        title: "Green Campus Drive",
        club: "Impact Collective",
        category: "Community",
        date: "2026-10-30",
        time: "9:00 AM",
        location: "College Garden",
        description:
            "Join fellow volunteers for a campus clean-up and sustainability initiative.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 5,
        title: "Coding Night",
        club: "CodeCraft",
        category: "Meetup",
        date: "2026-11-02",
        time: "4:00 PM",
        location: "Computer Lab 2",
        description:
            "Share ideas, solve coding challenges, and learn from other student developers.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 6,
        title: "Creative Showcase",
        club: "Creative Canvas",
        category: "Exhibition",
        date: "2026-11-05",
        time: "12:00 PM",
        location: "Student Centre",
        description:
            "Discover original student artwork, photography, illustrations, and design projects.",
        image: "images/campus-hero.jpg"
    }
];


/* ---------- HELPER FUNCTIONS ---------- */

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}


function formatEventDate(dateString) {
    const date = new Date(dateString + "T12:00:00");

    return date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
}


/* ---------- RENDER EVENT DETAILS ---------- */

function renderEventDetailsPage() {
    const container = document.getElementById("event-details");

    if (!container) return;

    const params = new URLSearchParams(window.location.search);
    const eventId = Number(params.get("id"));

    const selectedEvent = events.find(
        event => event.id === eventId
    );

    if (!selectedEvent) {
        container.innerHTML = `
            <div class="event-details-message">
                <h1>Event not found</h1>
                <p>
                    We couldn't find that event.
                    Please return to the events section and try again.
                </p>
                <a href="index.html#events">Browse all events</a>
            </div>
        `;
        return;
    }

    container.innerHTML = `
        <article class="event-details-card">
            <div class="event-details-banner">
                <img
                    src="${escapeHTML(selectedEvent.image)}"
                    alt="${escapeHTML(selectedEvent.title)}"
                >
            </div>

            <div class="event-details-content">
                <span class="event-details-category">
                    ${escapeHTML(selectedEvent.category)}
                </span>

                <h1>${escapeHTML(selectedEvent.title)}</h1>

                <p class="event-details-description">
                    ${escapeHTML(selectedEvent.description)}
                </p>

                <div class="event-details-meta">
                    <div class="event-meta-item">
                        <strong>Date</strong>
                        <span>
                            ${escapeHTML(formatEventDate(selectedEvent.date))}
                        </span>
                    </div>

                    <div class="event-meta-item">
                        <strong>Time</strong>
                        <span>${escapeHTML(selectedEvent.time)}</span>
                    </div>

                    <div class="event-meta-item">
                        <strong>Location</strong>
                        <span>${escapeHTML(selectedEvent.location)}</span>
                    </div>

                    <div class="event-meta-item">
                        <strong>Organised by</strong>
                        <span>${escapeHTML(selectedEvent.club)}</span>
                    </div>
                </div>

                <div class="event-details-actions">
                    <a
                        class="event-details-button"
                        href="club-details.html?id=${getClubId(selectedEvent.club)}"
                    >
                        View Organising Club
                    </a>

                    <a
                        class="event-details-button secondary"
                        href="index.html#events"
                    >
                        Back to All Events
                    </a>
                </div>

                <p class="event-registration-note">
                    Event registration will be available when the
                    registration feature is connected.
                </p>
            </div>
        </article>
    `;
}


/* ---------- FIND ORGANISING CLUB ---------- */

function getClubId(clubName) {
    const clubIds = {
        "CodeCraft": 1,
        "Creative Canvas": 2,
        "Echo Music Society": 3,
        "Impact Collective": 4
    };

    return clubIds[clubName] || "";
}


/* ---------- INITIALISE PAGE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    renderEventDetailsPage
);
