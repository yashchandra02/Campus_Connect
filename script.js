
/* ========================================
   CAMPUSCONNECT — MAIN JAVASCRIPT
======================================== */

/* ---------- CLUB DATA ---------- */

const clubs = [
    {
        id: 1,
        name: "CodeCraft",
        category: "TECHNOLOGY",
        description: "Build projects, explore new technologies, and grow your coding skills together.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 2,
        name: "Creative Canvas",
        category: "ART & DESIGN",
        description: "Explore your creativity through design, illustration, photography, and art.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 3,
        name: "Echo Music Society",
        category: "MUSIC",
        description: "Connect with fellow music lovers, jam together, and perform on campus.",
        image: "images/campus-hero.jpg"
    },
    {
        id: 4,
        name: "Impact Collective",
        category: "SOCIAL IMPACT",
        description: "Make a difference through volunteering, community projects, and campus initiatives.",
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
        description: "Team up with fellow students to build creative solutions to real-world problems.",
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
        description: "Explore visual storytelling, creative thinking, and the fundamentals of design.",
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
        description: "Enjoy an evening of live music, singing, and performances by fellow students.",
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
        description: "Join fellow volunteers for a campus clean-up and sustainability initiative.",
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
        description: "Share ideas, solve coding challenges, and learn from other student developers.",
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
        description: "Discover original student artwork, photography, illustrations, and design projects.",
        image: "images/campus-hero.jpg"
    }
];

/* ---------- HELPER FUNCTIONS ---------- */

function formatEventDate(dateString) {
    const date = new Date(dateString + "T12:00:00");

    return {
        day: date.getDate(),
        month: date.toLocaleDateString("en-US", {
            month: "short"
        }),
        full: date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
        })
    };
}

function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

/* ---------- RENDER CLUB CARDS ---------- */

function renderClubs() {
    const clubGrid = document.getElementById("club-grid");

    if (!clubGrid) return;

    clubGrid.innerHTML = clubs.map((club, index) => `
        <article class="club-card">
            <div class="club-image-wrap">
                <img
                    class="club-image"
                    src="${escapeHTML(club.image)}"
                    alt="${escapeHTML(club.name)}"
                    loading="lazy"
                >
                <span class="club-number">
                    ${String(index + 1).padStart(2, "0")}
                </span>
            </div>

            <div class="club-card-content">
                <span class="club-category">
                    ${escapeHTML(club.category)}
                </span>

                <h3>${escapeHTML(club.name)}</h3>

                <p>${escapeHTML(club.description)}</p>

                <a class="club-card-link" href="#events">
                    Explore events <span aria-hidden="true">↗</span>
                </a>
            </div>
        </article>
    `).join("");

    const clubStat = document.getElementById("club-stat");

    if (clubStat) {
        clubStat.textContent = String(clubs.length).padStart(2, "0");
    }

    const clubFilter = document.getElementById("club-filter");

    if (clubFilter) {
        clubs.forEach(club => {
            const option = document.createElement("option");
            option.value = club.name;
            option.textContent = club.name;
            clubFilter.appendChild(option);
        });
    }
}

/* ---------- RENDER EVENT CARDS ---------- */

function renderEvents(eventList) {
    const eventGrid = document.getElementById("event-grid");
    const eventCount = document.getElementById("event-count");

    if (!eventGrid) return;

    if (eventCount) {
        eventCount.textContent =
            `${eventList.length} ${eventList.length === 1 ? "event" : "events"} found`;
    }

    if (eventList.length === 0) {
        eventGrid.innerHTML = `
            <div class="event-empty">
                <h3>No events found</h3>
                <p>Try another search or clear your filters.</p>
            </div>
        `;
        return;
    }

    eventGrid.innerHTML = eventList.map(event => {
        const date = formatEventDate(event.date);

        return `
            <article class="event-card">
                <div class="event-banner">
                    <img
                        src="${escapeHTML(event.image)}"
                        alt=""
                        loading="lazy"
                    >

                    <span class="event-type">
                        ${escapeHTML(event.category)}
                    </span>

                    <div class="event-date-badge">
                        <strong>${date.day}</strong>
                        <span>${date.month}</span>
                    </div>
                </div>

                <div class="event-details">
                    <h3>${escapeHTML(event.title)}</h3>

                    <p class="event-description">
                        ${escapeHTML(event.description)}
                    </p>

                    <div class="event-meta">
                        <span>◷ ${escapeHTML(event.time)}</span>
                        <span>⌖ ${escapeHTML(event.location)}</span>
                    </div>

                    <a class="event-card-link" href="#about">
                        Organised by ${escapeHTML(event.club)}
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>
            </article>
        `;
    }).join("");
}

/* ---------- SEARCH AND FILTERS ---------- */

function filterEvents() {
    const searchInput = document.getElementById("event-search");
    const clubFilter = document.getElementById("club-filter");
    const dateFilter = document.getElementById("date-filter");

    const searchTerm = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const selectedClub = clubFilter ? clubFilter.value : "";
    const selectedDate = dateFilter ? dateFilter.value : "all";

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const filteredEvents = events.filter(event => {
        const searchableText = [
            event.title,
            event.club,
            event.category,
            event.description,
            event.location
        ].join(" ").toLowerCase();

        const matchesSearch = searchableText.includes(searchTerm);

        const matchesClub =
            !selectedClub || event.club === selectedClub;

        const eventDate = new Date(event.date + "T00:00:00");

        const matchesDate =
            selectedDate !== "upcoming" || eventDate >= today;

        return matchesSearch && matchesClub && matchesDate;
    });

    renderEvents(filteredEvents);
}

function setupEventFilters() {
    const searchInput = document.getElementById("event-search");
    const clubFilter = document.getElementById("club-filter");
    const dateFilter = document.getElementById("date-filter");
    const clearButton = document.getElementById("clear-filters");
    const filterForm = document.getElementById("event-filters");

    if (searchInput) {
        searchInput.addEventListener("input", filterEvents);
    }

    if (clubFilter) {
        clubFilter.addEventListener("change", filterEvents);
    }

    if (dateFilter) {
        dateFilter.addEventListener("change", filterEvents);
    }

    if (clearButton) {
        clearButton.addEventListener("click", () => {
            if (searchInput) searchInput.value = "";
            if (clubFilter) clubFilter.value = "";
            if (dateFilter) dateFilter.value = "all";

            filterEvents();
        });
    }

    if (filterForm) {
        filterForm.addEventListener("submit", event => {
            event.preventDefault();
            filterEvents();
        });

        filterForm.addEventListener("reset", () => {
            setTimeout(filterEvents, 0);
        });
    }
}

/* ---------- MOBILE NAVIGATION ---------- */

function setupMobileNavigation() {
    const menuToggle = document.getElementById("menu-toggle");
    const navLinks = document.getElementById("nav-links");

    if (!menuToggle || !navLinks) return;

    function closeMenu() {
        navLinks.classList.remove("is-open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    menuToggle.addEventListener("click", () => {
        const isOpen = menuToggle.getAttribute("aria-expanded") === "true";

        menuToggle.setAttribute("aria-expanded", String(!isOpen));
        navLinks.classList.toggle("is-open", !isOpen);
    });

    navLinks.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", event => {
        if (
            !navLinks.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            closeMenu();
        }
    });
}

/* ---------- NAVIGATION ACTIVE STATE ---------- */

function setupActiveNavigation() {
    const navLinks = document.querySelectorAll(".nav-link");

    function updateActiveLink() {
        const currentSection = window.location.hash || "#home";

        navLinks.forEach(link => {
            if (link.getAttribute("href") === currentSection) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    window.addEventListener("hashchange", updateActiveLink);
    updateActiveLink();
}

/* ---------- INITIALISE CAMPUSCONNECT ---------- */

document.addEventListener("DOMContentLoaded", () => {
    renderClubs();
    renderEvents(events);
    setupEventFilters();
    setupMobileNavigation();
    setupActiveNavigation();

    const eventStat = document.getElementById("event-stat");

    if (eventStat) {
        eventStat.textContent = String(events.length).padStart(2, "0");
    }
});
