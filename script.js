<script src="assets/js/script.js"></script>
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("contact-form");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevents page refresh

            let name = document.getElementById("name").value.trim();
            let email = document.getElementById("email").value.trim();
            let message = document.getElementById("message").value.trim();

            if (name === "" || email === "" || message === "") {
                alert("Please fill in all fields!");
            } else if (!validateEmail(email)) {
                alert("Please enter a valid email address!");
            } else {
                alert("Thank you for contacting us, " + name + "! We will get back to you soon.");
                form.reset(); // Clears the form after successful submission
            }
        });
    }

    function validateEmail(email) {
        let re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
});
let scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "⬆";
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

scrollBtn.style.position = "fixed";
scrollBtn.style.bottom = "20px";
scrollBtn.style.right = "20px";
scrollBtn.style.background = "#ff9800";
scrollBtn.style.color = "white";
scrollBtn.style.border = "none";
scrollBtn.style.padding = "10px 15px";
scrollBtn.style.fontSize = "18px";
scrollBtn.style.cursor = "pointer";
scrollBtn.style.display = "none";

window.onscroll = function () {
    if (document.documentElement.scrollTop > 300) {
        scrollBtn.style.display = "block";
    } else {
        scrollBtn.style.display = "none";
    }
};

scrollBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
});
let darkModeBtn = document.createElement("button");
darkModeBtn.innerHTML = "🌙 Dark Mode";
darkModeBtn.id = "darkModeBtn";
document.body.appendChild(darkModeBtn);

darkModeBtn.style.position = "fixed";
darkModeBtn.style.bottom = "60px";
darkModeBtn.style.right = "20px";
darkModeBtn.style.background = "#333";
darkModeBtn.style.color = "white";
darkModeBtn.style.border = "none";
darkModeBtn.style.padding = "10px 15px";
darkModeBtn.style.fontSize = "16px";
darkModeBtn.style.cursor = "pointer";

darkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        darkModeBtn.innerHTML = "☀️ Light Mode";
    } else {
        darkModeBtn.innerHTML = "🌙 Dark Mode";
    }
});

// Dark mode styles
let darkModeStyle = document.createElement("style");
darkModeStyle.innerHTML = `
    .dark-mode {
        background-color: #222;
        color: white;
    }
    .dark-mode .card {
        background-color: #333;
        color: white;
    }
`;
document.head.appendChild(darkModeStyle);
document.querySelectorAll(".card img").forEach(img => {
    img.addEventListener("mouseenter", function () {
        this.style.transform = "scale(1.1)";
        this.style.transition = "0.3s";
    });
    img.addEventListener("mouseleave", function () {
        this.style.transform = "scale(1)";
    });
});
