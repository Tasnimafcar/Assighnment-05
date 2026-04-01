// login page
const signInBtn = document.getElementById("signInBtn")

if (signInBtn) {
    signInBtn.addEventListener("click", SignIn)
};

function SignIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username !== 'admin') {
        alert('Your username is Incorrect');
    } else if (password !== 'admin123') {
        alert('Your password is Incorrect');
    } else {
        alert('sign in successful')
        window.location.href = 'home.html';
    };
};

// home page
// Filter button 
const allbtn = document.getElementById("allbtn");
const openbtn = document.getElementById("openbtn");
const closedbtn = document.getElementById("closedbtn");

if (allbtn) {
    const btns = [allbtn, openbtn, closedbtn];

    function setActive(selectedbtn) {
        btns.forEach(btn => {
            btn.classList.remove("bg-[#4A00FF]", "text-white");
            btn.classList.add("bg-white", "border", "border-gray-300", "text-gray-700")
        });
        selectedbtn.classList.add("bg-[#4A00FF]", "text-white");
        selectedbtn.classList.remove("bg-white", "border", "border-gray-300", "text-gray-700")
    }

    allbtn.addEventListener("click", () => {
        setActive(allbtn);
        renderIssues("all");
    });

    openbtn.addEventListener("click", () => {
        setActive(openbtn);
        renderIssues("open");
    });

    closedbtn.addEventListener("click", () => {
        setActive(closedbtn);
        renderIssues("closed");
    });
}

// Issus Count 
const issueContainer = document.getElementById("issueContainer");
const issusCount = document.getElementById("issusCount");
let allIssues = [];

// Issue Card append
if (issueContainer) {
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
        .then((res) => res.json())
        .then((data) => {
            allIssues = data.data;
            renderIssues("all");
        });
}

function renderIssues(filter, issues = allIssues) {
    issueContainer.innerHTML = "";
    const filtered = filter === "all" ? issues :
        issues.filter(issue => issue.status === filter);

    issusCount.innerText = filtered.length;

    filtered.forEach(issue => {
        const borderColor = issue.status === "open" ? "border-green-500" : "border-purple-500";
        const icon = issue.status === "open" ? "assets/Open-Status.png" : "assets/Closed- Status .png";
        const priorityColor = issue.priority === "high" ? "text-orange-700 bg-orange-200" :
            issue.priority === "medium" ? "text-yellow-700 bg-yellow-200" :
                "text-gray-500 bg-gray-100";

        const card = document.createElement("div")
        card.className = `bg-white shadow-sm border-t-4 ${borderColor} rounded-lg flex flex-col gap-3 p-4 hover:shadow-md transition-shadow cursor-pointer`

        card.innerHTML = ` <!-- Top Icon + priority -->
            <div class="flex justify-between items-center">
                <img src="${icon}" alt="">
                <span class="font-medium text-[12px] rounded-full ${priorityColor} px-3 py-1">${issue.priority.toUpperCase()}</span>
            </div>

            <!-- Tittle -->
            <h3 class="font-bold text-[16px]">${issue.title}</h3>

            <!-- Description -->
            <p class="text-[14px] text-[#64748B]">${issue.description}</p>

            <!-- labels -->
            <div class="flex gap-2 pb-[16px] border-b border-slate-300 flex-wrap">
                ${issue.labels.map(label => `<span class="font-medium text-[12px] rounded-full text-orange-700 bg-orange-200 px-3 py-1">${label.toUpperCase()}</span>`).join("")}
            </div>

            <!-- Footer -->
            <div class="text-gray-400 text-[14px] mt-2 space-y-1">
                <p>${issue.id} by ${issue.author}</p>
                <p>${issue.createdAt.slice(0, 10)}</p>
            </div>`;

        card.onclick = () => openModal(issue);
        issueContainer.appendChild(card);
    });
}

// Search bar 
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.querySelector(".join input");

searchBtn.addEventListener('click', () => {
    const searchText = searchInput.value.trim();

    if (searchText === '') {
        renderIssues("all");
        return;
    }

    searchIssues(searchText);
})

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
})

async function searchIssues(query) {
    const res = await fetch
        (`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${query}`)

    const data = await res.json();

    renderIssues("all", data.data);
}

// Modal
const issueModal = document.getElementById("Issue-details-modal")

function openModal(issue) {
    document.getElementById("modalTitle").innerText = issue.title;
    document.getElementById("modalDescription").innerText = issue.description;
    document.getElementById("modalAssignee").innerText = issue.assignee || "Unassigned";
    document.getElementById("modalAuthor").innerText = issue.author;
    document.getElementById("modalDate").innerText = issue.createdAt.slice(0, 10);

    // status
    const statusEl = document.getElementById("modalStatus")

    const statusBg = issue.status === "open" ? "bg-green-600" : "bg-red-500";

    statusEl.innerText = issue.status === "open" ? "Opened" : "Closed"
    statusEl.className = `font-medium text-[12px] text-white ${statusBg} rounded-full px-2 py-1`

    // priority
    const priorityEl = document.getElementById("modalPriority")

    priorityEl.innerText = issue.priority.toUpperCase();

    const priorityBg = issue.priority === "high" ? "bg-[#EF4444]" :
        issue.priority === "medium" ? "bg-yellow-500" : "bg-gray-400";

    priorityEl.className = `font-medium text-[12px] text-white ${priorityBg} px-2 py-1 rounded-full`

    // labels
    const labelsEl = document.getElementById("modalLabels")

    labelsEl.innerHTML = issue.labels.map(label =>
        `<p class="font-medium text-[12px] text-[#EF4444] bg-[#FECACA] rounded-full px-2 py-1">${label.toUpperCase()}</p>`
    ).join("")

    issueModal.showModal();
}