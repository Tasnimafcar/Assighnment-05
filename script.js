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


