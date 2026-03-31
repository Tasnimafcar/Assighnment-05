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
    };

    allbtn.addEventListener("click", () => setActive(allbtn));
    openbtn.addEventListener("click", () => setActive(openbtn));
    closedbtn.addEventListener("click", () => setActive(closedbtn));
};

// Issus Count 
const issueContainer = document.getElementById("issueContainer");
const issusCount = document.getElementById("issusCount");

if(issueContainer){
    fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    .then((res) => res.json())
    .then((data) => {
        const issus = data.data;
        issusCount.innerText = issus.length;
    });
};