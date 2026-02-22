// Function to format time for display
function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Placeholder talk data
const rawTalks = [
    {
        title: "Introduction to AI in Web Development",
        speakers: ["Alice Wonderland"],
        category: ["AI", "Web Development", "Frontend"],
        duration: 60, // minutes
        description: "Explore how artificial intelligence is changing the landscape of web development, from intelligent user interfaces to automated code generation."
    },
    {
        title: "Advanced JavaScript Patterns",
        speakers: ["Bob The Builder", "Charlie Chaplin"],
        category: ["JavaScript", "Programming"],
        duration: 60,
        description: "Dive deep into modern JavaScript design patterns that can help you write more maintainable and scalable codebases."
    },
    {
        title: "Cloud Native Architectures with Kubernetes",
        speakers: ["Diana Prince"],
        category: ["Cloud", "DevOps"],
        duration: 60,
        description: "Learn about building and deploying applications using Kubernetes, focusing on best practices for cloud-native development."
    },
    {
        title: "Data Science for Developers",
        speakers: ["Eve Adams"],
        category: ["Data Science", "Machine Learning"],
        duration: 60,
        description: "A practical guide for developers looking to integrate data science techniques and machine learning models into their applications."
    },
    {
        title: "Securing Your Web Applications",
        speakers: ["Frankenstein Monster"],
        category: ["Security", "Web Development"],
        duration: 60,
        description: "Understand common security vulnerabilities in web applications and discover strategies and tools to protect your users and data."
    },
    {
        title: "The Future of Frontend Frameworks",
        speakers: ["Grace Hopper"],
        category: ["Frontend", "Web Development"],
        duration: 60,
        description: "An overview of emerging trends and next-generation frameworks that are shaping the future of frontend development."
    }
];

// Function to generate the schedule
function generateSchedule(talks) {
    const eventStartTime = new Date();
    eventStartTime.setHours(10, 0, 0, 0); // Start at 10:00 AM

    const schedule = [];
    let currentTime = eventStartTime;
    let talkIndex = 0;

    while (talkIndex < talks.length) {
        // Add talk
        const talk = talks[talkIndex];
        const talkEndTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);
        schedule.push({
            type: "talk",
            ...talk,
            startTime: new Date(currentTime),
            endTime: talkEndTime
        });
        currentTime = talkEndTime;

        // Add transition if not the last talk
        if (talkIndex < talks.length - 1) {
            const transitionEndTime = new Date(currentTime.getTime() + 10 * 60 * 1000); // 10 min transition
            schedule.push({
                type: "break",
                title: "Transition",
                startTime: new Date(currentTime),
                endTime: transitionEndTime
            });
            currentTime = transitionEndTime;
        }

        // Check for lunch break
        // Assuming lunch will be after 2nd talk
        if (talkIndex === 1) { // After the second talk
            const lunchStartTime = new Date(currentTime);
            const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000); // 1 hour lunch
            schedule.push({
                type: "break",
                title: "Lunch Break",
                startTime: lunchStartTime,
                endTime: lunchEndTime
            });
            currentTime = lunchEndTime;
        }
        talkIndex++;
    }
    return schedule;
}

const fullSchedule = generateSchedule(rawTalks);


function renderSchedule(scheduleToRender) {
    const scheduleList = document.getElementById('schedule-list');
    scheduleList.innerHTML = ''; // Clear previous schedule

    scheduleToRender.forEach(item => {
        let card = '';
        if (item.type === 'talk') {
            card = `
                <div class="talk-card">
                    <span class="time">${formatTime(item.startTime)} - ${formatTime(item.endTime)}</span>
                    <h2>${item.title}</h2>
                    <p class="speakers">Speaker(s): ${item.speakers.join(', ')}</p>
                    <p class="categories">
                        ${item.category.map(cat => `<span>${cat}</span>`).join('')}
                    </p>
                    <p class="description">${item.description}</p>
                </div>
            `;
        } else if (item.type === 'break') {
            card = `
                <div class="break-card">
                    <span class="time">${formatTime(item.startTime)} - ${formatTime(item.endTime)}</span>
                    <h2>${item.title}</h2>
                </div>
            `;
        }
        scheduleList.innerHTML += card;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSchedule(fullSchedule);

    const searchInput = document.getElementById('category-search');
    searchInput.addEventListener('input', (event) => {
        const searchTerm = event.target.value.toLowerCase().trim();

        if (searchTerm === '') {
            renderSchedule(fullSchedule); // Show full schedule if search is empty
            return;
        }

        const filteredSchedule = fullSchedule.filter(item => {
            if (item.type === 'talk') {
                return item.category.some(cat => cat.toLowerCase().includes(searchTerm));
            }
            return false; // Don't filter breaks
        });
        renderSchedule(filteredSchedule);
    });
});