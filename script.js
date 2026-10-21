
const loginPage = document.getElementById("loginPage");
const dashboardPage = document.getElementById("dashboardPage");
const loginForm = document.getElementById("loginForm");
const loginMessage = document.getElementById("loginMessage");

const eventForm = document.getElementById("eventForm");
const eventFormSection = document.getElementById("eventFormSection");
const eventsList = document.getElementById("eventsList");
const statusMessage = document.getElementById("statusMessage");

let events = [
    {
        id: 1,
        title: "Coding Workshop",
        club: "OSCODE",
        date: "2026-11-05",
        time: "10:00",
        venue: "Computer Lab",
        description: "A beginner-friendly coding workshop.",
        rules: "Bring your laptop.",
        link: ""
    },
    {
        id: 2,
        title: "Technical Hackathon",
        club: "IEEE",
        date: "2026-11-10",
        time: "09:00",
        venue: "Main Auditorium",
        description: "A team-based coding competition.",
        rules: "Register as a team.",
        link: ""
    }
];

let editingId = null;

// DEMO ONLY: this is not secure real authentication.
loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (username === "admin" && password === "admin123") {
        loginPage.classList.add("hidden");
        dashboardPage.classList.remove("hidden");
        loginMessage.textContent = "";
        loginForm.reset();
        renderEvents();
    } else {
        loginMessage.textContent =
            "Invalid demo credentials. Please try again.";
    }
});

document.getElementById("logoutBtn").addEventListener("click", function () {
    dashboardPage.classList.add("hidden");
    eventFormSection.classList.add("hidden");
    loginPage.classList.remove("hidden");
    statusMessage.textContent = "";
    loginForm.reset();
});

document.getElementById("addEventBtn").addEventListener("click", function () {
    resetEventForm();
    eventFormSection.classList.remove("hidden");
    document.getElementById("formTitle").textContent = "Add New Event";
});

document.getElementById("cancelBtn").addEventListener("click", function () {
    resetEventForm();
});

eventForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const eventData = {
        title: document.getElementById("eventTitle").value.trim(),
        club: document.getElementById("eventClub").value,
        date: document.getElementById("eventDate").value,
        time: document.getElementById("eventTime").value,
        venue: document.getElementById("eventVenue").value.trim(),
        description: document.getElementById("eventDescription").value.trim(),
        rules: document.getElementById("eventRules").value.trim(),
        link: document.getElementById("eventLink").value.trim()
    };

    if (editingId === null) {
        const newId = events.length
            ? Math.max(...events.map(event => event.id)) + 1
            : 1;

        events.push({ id: newId, ...eventData });
        showMessage("Event added successfully!");
    } else {
        events = events.map(event =>
            event.id === editingId
                ? { id: editingId, ...eventData }
                : event
        );

        showMessage("Event updated successfully!");
    }

    resetEventForm();
    renderEvents();
});

function renderEvents() {
    eventsList.replaceChildren();

    if (events.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.textContent = "No events available. Add your first event!";
        eventsList.appendChild(emptyMessage);
        return;
    }

    const sortedEvents = [...events].sort((a, b) =>
        a.date.localeCompare(b.date)
    );

    sortedEvents.forEach(event => {
        const card = document.createElement("article");
        card.className = "event-card";

        const title = document.createElement("h4");
        title.textContent = event.title;

        const club = document.createElement("p");
        club.className = "club-name";
        club.textContent = event.club;

        const details = document.createElement("p");
        details.textContent =
            `${event.date} at ${event.time} | ${event.venue}`;

        const description = document.createElement("p");
        description.textContent = event.description;

        const actions = document.createElement("div");
        actions.className = "event-actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.addEventListener("click", () => editEvent(event.id));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", () => deleteEvent(event.id));

        actions.append(editButton, deleteButton);
        card.append(title, club, details, description, actions);
        eventsList.appendChild(card);
    });
}

function editEvent(id) {
    const event = events.find(item => item.id === id);
    if (!event) return;

    editingId = id;

    document.getElementById("eventTitle").value = event.title;
    document.getElementById("eventClub").value = event.club;
    document.getElementById("eventDate").value = event.date;
    document.getElementById("eventTime").value = event.time;
    document.getElementById("eventVenue").value = event.venue;
    document.getElementById("eventDescription").value = event.description;
    document.getElementById("eventRules").value = event.rules;
    document.getElementById("eventLink").value = event.link;

    document.getElementById("formTitle").textContent = "Edit Event";
    document.getElementById("saveBtn").textContent = "Update Event";

    eventFormSection.classList.remove("hidden");
    eventFormSection.scrollIntoView({ behavior: "smooth" });
}

function deleteEvent(id) {
    const confirmed = confirm("Are you sure you want to delete this event?");
    if (!confirmed) return;

    events = events.filter(event => event.id !== id);
    renderEvents();
    showMessage("Event deleted successfully!");
}

function resetEventForm() {
    eventForm.reset();
    editingId = null;
    eventFormSection.classList.add("hidden");
    document.getElementById("formTitle").textContent = "Add New Event";
    document.getElementById("saveBtn").textContent = "Save Event";
}

function showMessage(message) {
    statusMessage.textContent = message;
}

// Display the demo event list when the dashboard opens.
renderEvents();
