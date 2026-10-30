  let currentLanguage = 'en';

    const languageBtn = document.getElementById('languageBtn');

    languageBtn.addEventListener('click', function () {

        currentLanguage = currentLanguage === 'en' ? 'bn' : 'en';

        document.querySelectorAll('[data-en]').forEach(element => {

            element.textContent = element.getAttribute('data-' + currentLanguage);

        });

        document.body.classList.toggle('bangla', currentLanguage === 'bn');

        document.documentElement.lang = currentLanguage;

        languageBtn.textContent = currentLanguage === 'en'
            ? 'বাংলা'
            : 'English';

    });


    // DARK / LIGHT MODE

    const themeBtn = document.getElementById('themeBtn');

    themeBtn.addEventListener('click', function () {

        document.body.classList.toggle('dark');

        const isDark = document.body.classList.contains('dark');

        themeBtn.innerHTML = isDark
            ? '<i class="bi bi-sun-fill"></i>'
            : '<i class="bi bi-moon-stars-fill"></i>';

    });


    // CLOSE MOBILE NAVBAR AFTER CLICK

    document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {

        link.addEventListener('click', function () {

            const navbar = document.getElementById('mainNavbar');

            const collapse = bootstrap.Collapse.getInstance(navbar);

            if (collapse) {
                collapse.hide();
            }

        });

    });





/* ===== GALLERY FILTER & LOAD MORE ===== */

const galleryItems = document.querySelectorAll('.gallery-item');
const galleryFilters = document.querySelectorAll('.gallery-filter');
const loadMoreBtn = document.getElementById('galleryLoadMore');

let activeCategory = 'all';
let visibleCount = 6;

function updateGallery() {

    let filteredItems = [];

    galleryItems.forEach(item => {
        const match = activeCategory === 'all' ||
            item.dataset.category === activeCategory;

        if (match) {
            filteredItems.push(item);
        }

        item.classList.add('hide');
    });

    filteredItems.forEach((item, index) => {
        if (index < visibleCount) {
            item.classList.remove('hide');
        }
    });

    loadMoreBtn.style.display =
        filteredItems.length > visibleCount ? 'inline-block' : 'none';
}

galleryFilters.forEach(button => {

    button.addEventListener('click', function () {

        galleryFilters.forEach(btn => btn.classList.remove('active'));

        this.classList.add('active');

        activeCategory = this.dataset.filter;
        visibleCount = 6;

        updateGallery();
    });

});

loadMoreBtn.addEventListener('click', function () {
    visibleCount += 6;
    updateGallery();
});

updateGallery();





// Initialize EmailJS
emailjs.init({
    publicKey: "KX2ecpy8R2jyTUpKU"
});

const contactForm = document.getElementById("contactForm");
const submitBtn = document.getElementById("submitBtn");
const formStatus = document.getElementById("formStatus");

contactForm.addEventListener("submit", function(event) {

    event.preventDefault();

    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";
    formStatus.textContent = "";

    emailjs.sendForm(
        "service_l1jqecf",
        "template_rpewzcn",
        contactForm
    )
    .then(function(response) {

        console.log("SUCCESS:", response);

        formStatus.textContent =
            "Your inquiry has been sent successfully!";

        formStatus.style.color = "green";

        contactForm.reset();

    })
    .catch(function(error) {

        console.error("EMAILJS ERROR:", error);

        formStatus.textContent =
            "Error: " + (error.text || error.message || "Unknown error");

        formStatus.style.color = "red";

    })
    .finally(function() {

        submitBtn.disabled = false;
        submitBtn.textContent = "Submit Inquiry";

    });

});