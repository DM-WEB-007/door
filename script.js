
document.addEventListener("DOMContentLoaded", function () {

    /* ==========================================
       1. LANGUAGE SWITCHER
    ========================================== */

    let currentLanguage =
        localStorage.getItem("siteLanguage") || "en";

    const languageButtons = [
        document.getElementById("languageBtn"),
        document.getElementById("mobileLanguageBtn")
    ].filter(Boolean);

    function changeLanguage(language) {

        currentLanguage = language;

        document.querySelectorAll("[data-en][data-bn]").forEach(element => {

            const translatedText =
                element.getAttribute("data-" + language);

            if (translatedText !== null) {
                element.textContent = translatedText;
            }

        });

        document.body.classList.toggle(
            "bangla",
            language === "bn"
        );

        document.documentElement.lang = language;

        languageButtons.forEach(button => {

            button.textContent =
                language === "en" ? "বাংলা" : "English";

        });

        localStorage.setItem("siteLanguage", language);
    }

    languageButtons.forEach(button => {

        button.addEventListener("click", function () {

            const newLanguage =
                currentLanguage === "en" ? "bn" : "en";

            changeLanguage(newLanguage);

        });

    });

    // Load saved language
    changeLanguage(currentLanguage);



    /* ==========================================
       2. DARK / LIGHT MODE
       DESKTOP + MOBILE SUPPORT
    ========================================== */

    const themeButtons = [
        document.getElementById("themeBtn"),
        document.getElementById("mobileThemeBtn")
    ].filter(Boolean);

    let currentTheme =
        localStorage.getItem("siteTheme") || "light";

    function updateTheme() {

        // Apply theme to body
        document.body.classList.toggle(
            "dark",
            currentTheme === "dark"
        );

        // Update all theme buttons
        themeButtons.forEach(button => {

            button.innerHTML =
                currentTheme === "dark"
                    ? '<i class="bi bi-sun-fill"></i>'
                    : '<i class="bi bi-moon-stars-fill"></i>';

            button.setAttribute(
                "aria-label",
                currentTheme === "dark"
                    ? "Switch to light mode"
                    : "Switch to dark mode"
            );

            button.setAttribute(
                "title",
                currentTheme === "dark"
                    ? "Light Mode"
                    : "Dark Mode"
            );

        });

        // Save theme
        localStorage.setItem("siteTheme", currentTheme);
    }

    // Desktop + Mobile button click
    themeButtons.forEach(button => {

        button.addEventListener("click", function () {

            currentTheme =
                currentTheme === "dark" ? "light" : "dark";

            updateTheme();

        });

    });

    // Load saved theme
    updateTheme();



    /* ==========================================
       3. CLOSE MOBILE NAVBAR AFTER CLICK
    ========================================== */

    document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {

        link.addEventListener("click", function () {

            const navbar =
                document.getElementById("mainNavbar");

            if (!navbar || typeof bootstrap === "undefined") {
                return;
            }

            const collapse =
                bootstrap.Collapse.getInstance(navbar);

            if (collapse) {
                collapse.hide();
            }

        });

    });



    /* ==========================================
       4. GALLERY FILTER & LOAD MORE
    ========================================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    const galleryFilters =
        document.querySelectorAll(".gallery-filter");

    const loadMoreBtn =
        document.getElementById("galleryLoadMore");

    let activeCategory = "all";
    let visibleCount = 6;

    function updateGallery() {

        if (!galleryItems.length) return;

        let filteredItems = [];

        galleryItems.forEach(item => {

            const match =
                activeCategory === "all" ||
                item.dataset.category === activeCategory;

            if (match) {
                filteredItems.push(item);
            }

            item.classList.add("hide");

        });

        filteredItems.forEach((item, index) => {

            if (index < visibleCount) {
                item.classList.remove("hide");
            }

        });

        if (loadMoreBtn) {

            loadMoreBtn.style.display =
                filteredItems.length > visibleCount
                    ? "inline-block"
                    : "none";

        }

    }

    // Gallery filter buttons
    galleryFilters.forEach(button => {

        button.addEventListener("click", function () {

            galleryFilters.forEach(btn => {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            activeCategory = this.dataset.filter;

            visibleCount = 6;

            updateGallery();

        });

    });

    // Load more button
    if (loadMoreBtn) {

        loadMoreBtn.addEventListener("click", function () {

            visibleCount += 6;

            updateGallery();

        });

    }

    // Initial gallery load
    updateGallery();



    /* ==========================================
       5. EMAILJS CONTACT FORM
    ========================================== */

    const contactForm =
        document.getElementById("contactForm");

    const submitBtn =
        document.getElementById("submitBtn");

    const formStatus =
        document.getElementById("formStatus");

    // Initialize EmailJS
    if (typeof emailjs !== "undefined") {

        emailjs.init({
            publicKey: "KX2ecpy8R2jyTUpKU"
        });

    }

    if (contactForm && submitBtn && formStatus) {

        contactForm.addEventListener("submit", function (event) {

            event.preventDefault();

            // Check EmailJS availability
            if (typeof emailjs === "undefined") {

                formStatus.textContent =
                    currentLanguage === "bn"
                        ? "ইমেইল সার্ভিস পাওয়া যাচ্ছে না।"
                        : "Email service is not available.";

                formStatus.style.color = "red";

                return;

            }

            // Disable submit button
            submitBtn.disabled = true;

            submitBtn.textContent =
                currentLanguage === "bn"
                    ? "পাঠানো হচ্ছে..."
                    : "Sending...";

            formStatus.textContent = "";

            // Send email
            emailjs.sendForm(
                "service_l1jqecf",
                "template_rpewzcn",
                contactForm
            )

            .then(function (response) {

                console.log("SUCCESS:", response);

                formStatus.textContent =
                    currentLanguage === "bn"
                        ? "আপনার বার্তাটি সফলভাবে পাঠানো হয়েছে!"
                        : "Your inquiry has been sent successfully!";

                formStatus.style.color = "green";

                contactForm.reset();

            })

            .catch(function (error) {

                console.error("EMAILJS ERROR:", error);

                formStatus.textContent =
                    currentLanguage === "bn"
                        ? "দুঃখিত! বার্তা পাঠানো যায়নি। আবার চেষ্টা করুন।"
                        : "Sorry! Message could not be sent. Please try again.";

                formStatus.style.color = "red";

            })

            .finally(function () {

                submitBtn.disabled = false;

                submitBtn.textContent =
                    currentLanguage === "bn"
                        ? "জিজ্ঞাসা পাঠান"
                        : "Submit Inquiry";

            });

        });

    }

});
