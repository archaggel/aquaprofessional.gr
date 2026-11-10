
/* =========================================
   1. ΜΕΤΑΒΛΗΤΕΣ ΚΑΙ ΒΟΗΘΗΤΙΚΕΣ ΣΥΝΑΡΤΗΣΕΙΣ
   ========================================= */

// Αποθηκεύουμε τις θέσεις των ενοτήτων.
var skillsTopOffset = 0;
var statsTopOffset = 0;

// Υπολογίζουμε τις θέσεις των sections.
function updateSectionOffsets() {

    if ($(".skillsSection").length) {
        skillsTopOffset = $(".skillsSection").offset().top;
    }

    if ($(".statsSection").length) {
        statsTopOffset = $(".statsSection").offset().top;
    }
}


/* =========================================
   2. ΦΟΡΤΩΣΗ ΣΕΛΙΔΑΣ
   ========================================= */

$(window).on("load", function () {

    // Απόκρυψη του loading animation.
    $(".loader .inner").fadeOut(500, function () {
        $(".loader").fadeOut(750);
    });

    // Αρχικοποίηση Isotope.
    $(".items").isotope({
        filter: '*',
        animationOptions: {
            duration: 1500,
            easing: 'linear',
            queue: false
        }
    });

    // Υπολογισμός θέσεων μετά τη φόρτωση των πόρων.
    updateSectionOffsets();

});


/* =========================================
   3. ΑΡΧΙΚΟΠΟΙΗΣΗ DOM ΚΑΙ PLUGINS
   ========================================= */

$(document).ready(function () {

    // Ενημέρωση θέσεων όταν αλλάζει το μέγεθος της οθόνης.
    $(window).on("resize", updateSectionOffsets);


    /* =====================================
       SUPERSLIDES
       ===================================== */

    $('#slides').superslides({
        animation: 'fade',
        play: 5000,
        pagination: false
    });


    /* =====================================
       TYPED.JS
       ===================================== */

    var typed = new Typed(".typed", {
        strings: [
            "Ανακαίνιση Μπάνιου",
            "Υδραυλικές Εγκαταστάσεις",
            "Εγκατάσταση Ηλιακού Θερμοσίφωνα",
            "Επισκευή Ηλιακού Θερμοσίφωνα",
            "Εγκατάσταση Αντλίας Θερμότητας",
            "Ενδοδαπέδια Θέρμανση",
            "Εντοπισμός Διαρροών",
            "Επισκευή Υδραυλικών Βλαβών",
            "Αντικατάσταση Σωληνώσεων",
            "Εγκατάσταση Ειδών Υγιεινής",
            "Οικονομικές Τιμές"
        ],
        typeSpeed: 60,
        loop: true,
        startDelay: 1000,
        showCursor: false
    });


    /* =====================================
       OWL CAROUSEL
       ===================================== */

    $('.owl-carousel').owlCarousel({
        loop: true,
        items: 4,
        responsive: {
            0: {
                items: 1
            },
            480: {
                items: 2
            },
            768: {
                items: 3
            },
            938: {
                items: 4
            }
        }
    });


    /* =====================================
       ANIMATED CHARTS ΚΑΙ COUNTERS
       ===================================== */

    var countUpFinished = false;
    var chartsStarted = false;

    // Ελέγχει αν οι ενότητες έχουν φτάσει στο ορατό σημείο.
    function checkScrollAnimations() {

        var scrollPosition = $(window).scrollTop();
        var windowHeight = $(window).height();

        // Ενεργοποίηση κυκλικών γραφημάτων.
        if (
            !chartsStarted &&
            $(".skillsSection").length &&
            scrollPosition > skillsTopOffset - windowHeight + 200
        ) {

            $('.chart').easyPieChart({
                easing: 'easeInOut',
                barColor: '#fff',
                trackColor: false,
                scaleColor: false,
                lineWidth: 4,
                size: 152,

                onStep: function (from, to, percent) {
                    $(this.el)
                        .find('.percent')
                        .text(Math.round(percent));
                }
            });

            chartsStarted = true;
        }


        // Ενεργοποίηση αριθμητικών counters.
        if (
            !countUpFinished &&
            $(".statsSection").length &&
            scrollPosition > statsTopOffset - windowHeight + 200
        ) {

            $(".counter").each(function () {

                var element = $(this);
                var endVal = parseInt(element.text(), 10);

                if (!isNaN(endVal)) {
                    element.countup(endVal);
                }

            });

            countUpFinished = true;
        }
    }

    // Έλεγχος κατά την κύλιση.
    $(window).on("scroll", checkScrollAnimations);

    // Αρχικός έλεγχος μετά τη φόρτωση της σελίδας.
    $(window).on("load", checkScrollAnimations);

    // Νέος έλεγχος μετά την αλλαγή μεγέθους οθόνης.
    $(window).on("resize", checkScrollAnimations);


    /* =====================================
       FANCYBOX
       ===================================== */

    $("[data-fancybox]").fancybox();


    /* =====================================
       PORTFOLIO FILTERS - ISOTOPE
       ===================================== */

    $("#filters a").click(function (e) {

        e.preventDefault();

        $("#filters .current").removeClass("current");
        $(this).addClass("current");

        var selector = $(this).attr("data-filter");

        $(".items").isotope({
            filter: selector,
            animationOptions: {
                duration: 1500,
                easing: 'linear',
                queue: false
            }
        });

    });


    /* =====================================
       SMOOTH SCROLLING
       ===================================== */

    $("#navigation li a").click(function (e) {

        var targetElement = $(this).attr("href");

        // Ελέγχουμε αν ο σύνδεσμος οδηγεί σε εσωτερική ενότητα.
        if (targetElement && targetElement.startsWith("#")) {

            var target = $(targetElement);

            if (target.length) {

                e.preventDefault();

                var targetPosition = target.offset().top;

                $("html, body").animate({
                    scrollTop: targetPosition - 50
                }, "slow");
            }
        }

        // Κλείσιμο mobile menu μετά την επιλογή.
        if ($(window).width() < 992) {

            if ($(".navbar-collapse").hasClass("show")) {
                $(".navbar-collapse").collapse("hide");
            }
        }

    });


    /* =====================================
       STICKY NAVIGATION
       ===================================== */

    const nav = $("#navigation");
    var navTop = nav.length ? nav.offset().top : 0;

    // Υπολογισμός θέσης του navigation.
    function updateNavPosition() {

        if (nav.length && !nav.hasClass("fixedNav")) {
            navTop = nav.offset().top;
        }
    }

    // Έλεγχος για σταθερό μενού.
    function stickyNavigation() {

        if (!nav.length) return;

        var body = $("body");

        if ($(window).scrollTop() >= navTop) {

            body.css("padding-top", nav.outerHeight() + "px");
            body.addClass("fixedNav");

        } else {

            body.css("padding-top", 0);
            body.removeClass("fixedNav");

        }
    }

    // Ενεργοποίηση sticky navigation.
    $(window).on("scroll", stickyNavigation);

    // Ενημέρωση θέσης όταν αλλάζει η οθόνη.
    $(window).on("resize", function () {

        updateNavPosition();
        stickyNavigation();

    });


    /* =====================================
       VIDEO AUTOPLAY ON SCROLL
       ===================================== */

    const videos = document.querySelectorAll('.scroll-video');

    // Έλεγχος υποστήριξης IntersectionObserver.
    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    const video = entry.target;

                    if (entry.isIntersecting) {

                        var playPromise = video.play();

                        // Διαχείριση πιθανής αποτυχίας autoplay.
                        if (playPromise !== undefined) {
                            playPromise.catch(function (error) {
                                console.log("Video autoplay:", error);
                            });
                        }

                    } else {

                        video.pause();

                    }

                });

            },
            {
                threshold: 0.5
            }
        );

        videos.forEach(function (video) {
            observer.observe(video);
        });

    }

});
