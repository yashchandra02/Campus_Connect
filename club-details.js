const clubs = [
    {
        id: 1,
        name: "CodeCraft",
        category: "TECHNOLOGY",
        description:
            "Build projects, explore new technologies, and grow your coding skills together.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 2,
        name: "Creative Canvas",
        category: "ART & DESIGN",
        description:
            "Explore your creativity through design, illustration, photography, and art.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 3,
        name: "Echo Music Society",
        category: "MUSIC",
        description:
            "Connect with fellow music lovers, jam together, and perform on campus.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 4,
        name: "Impact Collective",
        category: "SOCIAL IMPACT",
        description:
            "Make a difference through volunteering, community projects, and campus initiatives.",
        image: "images/campus-hero.jpg"
    }
];


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
    // Use midday to avoid timezone-related date shifts.
    const date = new Date(dateString + "T12:00:00");

    return date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "short",
        year: "numeric"
    });
}


/* ---------- RENDER CLUB DETAILS ---------- */

function renderClubDetailsPage() {
    const detailsContainer =
        document.getElementById("club-details");

    const clubEventsContainer =
        document.getElementById("club-events");

    // This script should run only on the Club Details page.
    if (!detailsContainer || !clubEventsContainer) {
        return;
    }

    // Read the selected club ID from the URL.
    const params = new URLSearchParams(window.location.search);
    const clubId = Number(params.get("id"));

    const club = clubs.find(item => item.id === clubId);

    // Handle missing or invalid club IDs.
    if (!club) {
        detailsContainer.innerHTML = `
            <div class="club-details-message">
                <h1>Club not found</h1>
                <p>
                    Please return to the clubs section
                    and select a valid club.
                </p>
                <a href="index.html#clubs">
                    Browse all clubs
                </a>
            </div>
        `;

        clubEventsContainer.innerHTML = `
            <p>No club selected.</p>
        `;

        return;
    }

    // Render the selected club.
    detailsContainer.innerHTML = `
        <article class="club-details-card">
            <div class="club-details-banner">
                <img
                    src="${escapeHTML(club.image)}"
                    alt="${escapeHTML(club.name)}"
                >
            </div>

            <div class="club-details-content">
                <span class="club-details-category">
                    ${escapeHTML(club.category)}
                </span>

                <h1>${escapeHTML(club.name)}</h1>

                <p class="club-details-description">
                    ${escapeHTML(club.description)}
                </p>

                <div class="club-details-actions">
                    <a
                        class="club-details-button"
                        href="index.html#events"
                    >
                        Explore All Events
                    </a>

                    <a
                        class="club-details-button secondary"
                        href="index.html#clubs"
                    >
                        Back to Clubs
                    </a>
                </div>
            </div>
        </article>
    `;

    // Show only events belonging to this club.
    const clubEvents = events.filter(
        event => event.club === club.name
    );

    if (clubEvents.length === 0) {
        clubEventsContainer.innerHTML = `
            <div class="club-details-message">
                No events are currently listed for this club.
            </div>
        `;

        return;
    }

    // Render each event as a clickable card.
    clubEventsContainer.innerHTML = clubEvents.map(event => `
        <a
            href="event-details.html?id=${event.id}"
            class="club-detail-event-link"
            aria-label="View details for ${escapeHTML(event.title)}"
        >
            <h3>${escapeHTML(event.title)}</h3>

            <p>${escapeHTML(event.description)}</p>

            <p>
                <strong>Date:</strong>
                ${escapeHTML(formatEventDate(event.date))}
            </p>

            <p>
                <strong>Time:</strong>
                ${escapeHTML(event.time)}
            </p>

            <p>
                <strong>Location:</strong>
                ${escapeHTML(event.location)}
            </p>

            <span class="club-detail-event-cta">
                View Event Details →
            </span>
        </a>
    `).join("");
}


/* ---------- INITIALISE PAGE ---------- */

document.addEventListener(
    "DOMContentLoaded",
    renderClubDetailsPage
);