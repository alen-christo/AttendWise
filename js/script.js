const defaultSubjects = [
    {
        name: "Data Mining",
        present: 32,
        absent: 3,
        todayStatus: "present"
    },
    {
        name: "DBMS",
        present: 28,
        absent: 7,
        todayStatus: "present"
    },
    {
        name: "Software Engineering",
        present: 35,
        absent: 2,
        todayStatus: "present"
    }
];

const savedSubjects = localStorage.getItem("subjects");

const subjects = savedSubjects
    ? JSON.parse(savedSubjects)
    : defaultSubjects;

const subjectGrid = document.getElementById("subjectGrid");

function renderSubjects() {

    subjectGrid.innerHTML = "";

    subjects.forEach(subject => {

    let currentPresent = subject.present;
    let currentAbsent = subject.absent;

        if (subject.todayStatus === "present") {
        currentPresent++;
    }

        if (subject.todayStatus === "absent") {
        currentAbsent++;
    }

const percentage = Math.round(
    (currentPresent / (currentPresent + currentAbsent)) * 100
);

    const card = `
        <div class="subject-card">

            <div class="subject-header">
                <h3>📘 ${subject.name}</h3>
                <span class="badge safe-badge">Safe</span>
            </div>

            <h1>${percentage}%</h1>

            <div class="progress-bar">
                <div class="progress-fill" style="width:${percentage}%"></div>
            </div>

            <div class="subject-info">
                <span>Present: ${currentPresent}</span>
                <span>Absent: ${currentAbsent}</span>
            </div>

            <div class="status-section">

                <p class="status-title">Today's Status</p>

                <div class="status-buttons">

                    <button class="status-btn present-btn ${subject.todayStatus === 'present' ? 'selected' : ''}"
                        onclick="setStatus('${subject.name}', 'present')">
                        ✓ Present
                    </button>

                    <button class="status-btn absent-btn ${subject.todayStatus === 'absent' ? 'selected' : ''}"
                        onclick="setStatus('${subject.name}', 'absent')">
                        ✕ Absent
                    </button>

                    <button class="status-btn noclass-btn ${subject.todayStatus === 'noclass' ? 'selected' : ''}"
                        onclick="setStatus('${subject.name}', 'noclass')">
                            — No Class
                    </button>

                </div>

            </div>

            <div class="subject-footer">
                <p>Need to attend: <strong>0</strong></p>
                <p>Can miss: <strong>5</strong></p>
            </div>

        </div>
    `;

    subjectGrid.innerHTML += card;

});
}
renderSubjects();

function setStatus(subjectName, status) {

    const subject = subjects.find(
        subject => subject.name === subjectName
    );

    if (!subject) {
        return;
    }

    subject.todayStatus = status;

    localStorage.setItem(
        "subjects",
        JSON.stringify(subjects)
    );

    console.log(subject.name, "→", subject.todayStatus);

    renderSubjects();
}