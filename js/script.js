// Όταν φορτώσουν και οι εικόνες/πόροι, κρύβουμε το loading screen και αρχικοποιούμε το πλέγμα.
$(window).on("load", function () {
	// Πρώτα σβήνει το εσωτερικό animation και έπειτα ολόκληρο το overlay.
	$(".loader .inner").fadeOut(500, function () {
		$(".loader").fadeOut(750);

	});

	// Isotope: διατάσσει τις φωτογραφίες και εφαρμόζει φίλτρα με animation.
	$(".items").isotope({
		filter: '*',
		animationOptions: {
			duration: 1500,
			easing: 'linear',
			queue: false
		}
	});

})





// Όταν έχει δημιουργηθεί το DOM, αρχικοποιούμε τα widgets και τα συμβάντα.
$(document).ready(function () {

	// Superslides: εναλλαγή αρχικών φωτογραφιών με fade κάθε 5 δευτερόλεπτα.
	$('#slides').superslides({
		animation: 'fade',
		play: 5000,
		pagination: false
	});

	// Typed.js: γράφει διαδοχικά τις ονομασίες των υπηρεσιών.
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

	// Owl Carousel: responsive προβολή 1–4 υπηρεσιών ανάλογα με το πλάτος.
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


	// Αποθηκεύει τη θέση της ενότητας υπηρεσιών για το scroll trigger.
	var skillsTopOffset = $(".skillsSection").offset().top;
	// Αποθηκεύει τη θέση των τεσσάρων στατιστικών.
	var statsTopOffset = $(".statsSection").offset().top;
	// Φρουρός ώστε το animation των counters να εκτελείται μόνο μία φορά.
	var countUpFinished = false;
	var chartsStarted = false;


	// Σε κάθε scroll ελέγχει αν οι ενότητες έχουν μπει στο ορατό μέρος.
	$(window).scroll(function () {

		if (!chartsStarted && window.pageYOffset > skillsTopOffset - $(window).height() + 200) {

			// easyPieChart: ζωγραφίζει κύκλους προόδου όταν εμφανιστεί η ενότητα.
			$('.chart').easyPieChart({
				easing: 'easeInOut',
				barColor: '#fff',
				trackColor: false,
				scaleColor: false,
				lineWidth: 4,
				size: 152,
				onStep: function (from, to, percent) {
					$(this.el).find('.percent').text(Math.round(percent));
				}
			});
			
			chartsStarted = true;

		}

		// Ενεργοποιεί τους αριθμητικούς counters μία φορά μόλις φανούν στην οθόνη.
		if (!countUpFinished && window.pageYOffset > statsTopOffset - $(window).height() + 200) {
			$(".counter").each(function () {
				var element = $(this);
				// Μετατρέπει το αρχικό κείμενο του h2 σε ακέραιο για το countup.
				var endVal = parseInt(element.text());

				element.countup(endVal);

			})
			countUpFinished = true;
		}

	});


	// Fancybox: ανοίγει τις μεγάλες φωτογραφίες σε lightbox.
	$("[data-fancybox]").fancybox();


	// Click σε φίλτρο portfolio: αλλάζει ενεργή επιλογή και φιλτράρει τα έργα.
	$("#filters a").click(function () {
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

		return false;
	});



	// Ομαλή κύλιση στη σχετική ενότητα του μενού.
	$("#navigation li a").click(function (e) {
		e.preventDefault();

		var targetElement = $(this).attr("href");
		var targetPosition = $(targetElement).offset().top;
		$("html, body").animate({ scrollTop: targetPosition - 50 }, "slow");

	});




	// Αποθηκεύει τη γραμμή πλοήγησης για το sticky menu.
	const nav = $("#navigation");
	const navTop = nav.offset().top;

	// Συνδέει τη stickyNavigation με το scroll της σελίδας.
	$(window).on("scroll", stickyNavigation);

	// Προσθέτει fixedNav μετά τη θέση του μενού, διατηρώντας χώρο στο body.
	function stickyNavigation() {

		var body = $("body");

		if ($(window).scrollTop() >= navTop) {
			body.css("padding-top", nav.outerHeight() + "px");
			body.addClass("fixedNav");
		}
		else {
			body.css("padding-top", 0);
			body.removeClass("fixedNav");
		}


	}
	// Βίντεο της ενότητας Εργασίες: play/pause ανάλογα με την ορατότητά του.
	// === Scroll-based video autoplay ===
	const videos = document.querySelectorAll('.scroll-video');

	// IntersectionObserver: παρακολουθεί αν ένα στοιχείο βρίσκεται στο viewport.
	const observer = new IntersectionObserver((entries) => {
		entries.forEach(entry => {
			const video = entry.target;

			if (entry.isIntersecting) {
				video.play();
			} else {
				video.pause();
			}
		});
	}, {
		// Σημαίνει ότι πρέπει να φαίνεται τουλάχιστον το 50% του βίντεο.
		threshold: 0.5 // Adjust if needed
	});

	videos.forEach(video => {
		observer.observe(video);
	});

});
