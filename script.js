function toggleMobileMenu() {
	const mobileMenu = document.querySelector('.mobile-menu');
	mobileMenu.classList.toggle('active');
	const hamburger = document.querySelector('.hamburger-menu');
	hamburger.innerHTML = mobileMenu.classList.contains('active') ? '&times;' : '&#9776;';
}

function scrollToSection(sectionId) {
	const section = document.querySelector(sectionId);
	if (section) {
		const offsetTop = section.offsetTop - 50;
		window.scrollTo({
			top: offsetTop,
			behavior: 'smooth'
		});
		const mobileMenu = document.querySelector('.mobile-menu');
		if (mobileMenu.classList.contains('active')) {
			toggleMobileMenu();
		}
	}
}

function openModal(imageSrc) {
	const modal = document.getElementById('imageModal');
	const modalImage = modal.querySelector('.modal-image');
	modalImage.src = imageSrc;
	modal.classList.add('active');
	document.body.style.overflow = 'hidden';
}

function closeModal() {
	const modal = document.getElementById('imageModal');
	modal.classList.remove('active');
	document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', function() {
	// Form submission handler
	const form = document.getElementById('contactForm');
	if (form) {
		form.addEventListener('submit', async function(e) {
			e.preventDefault();

			const username = form.querySelector('input[name="username"]').value;
			const phone = form.querySelector('input[name="phone"]').value;

			if (!username || !phone) {
				alert('Please fill in all fields');
				return;
			}

			try {
				const response = await fetch('send.php', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						username: username,
						phone: phone
					})
				});

				const result = await response.json();

				if (result.success) {
					alert('Thank you! We will contact you soon.');
					form.reset();
				} else {
					alert('Error sending message. Please try again.');
				}
			} catch (error) {
				console.error('Error:', error);
				alert('Error sending message. Please try again.');
			}
		});
	}

	// Menu links handlers
	const menuLinks = document.querySelectorAll('.menu a, .mobile-menu a');
	menuLinks.forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const href = link.getAttribute('href');
			switch(href) {
				case '#about':
					scrollToSection('.descriptionBlock');
					break;
				case '#results':
					scrollToSection('.customerResultsBlock');
					break;
				case '#services':
					scrollToSection('.servicesBlock');
					break;
				case '#join':
					scrollToSection('.questionsBlock');
					break;
			}
		});
	});

	// Slider setup
	const slides = document.querySelectorAll('.splide__slide');
	slides.forEach(slide => {
		const imagePath = slide.dataset.image;
		slide.style.backgroundImage = `url(${imagePath})`;
	});

	const splide = new Splide('.splide', {
		type: 'loop',
		drag: 'free',
		focus: 'center',
		perPage: 7,
		arrows: false,
		pagination: false,
		gap: '1rem',
		autoScroll: {
			speed: 0.2,
			pauseOnHover: true,
			pauseOnFocus: true,
			rewind: false,
			autoStart: true
		},
		breakpoints: {
			1600: {
				perPage: 6,
				gap: '0.7rem',
			},
			1400: {
				perPage: 5,
				gap: '0.7rem',
			},
			1200: {
				perPage: 4,
				gap: '0.7rem',
			},
			991: {
				perPage: 3,
				gap: '0.7rem',
			},
			768: {
				perPage: 3,
				gap: '0.7rem',
			},
			480: {
				perPage: 1,
				gap: '0.5rem',
			},
		},
	});

	splide.mount({ AutoScroll: window.splide.Extensions.AutoScroll });

	// Image click handlers
	const sliderContainer = document.querySelector('.splide__list');
	sliderContainer.addEventListener('click', function(e) {
		const slide = e.target.closest('.splide__slide');
		if (slide) {
			openModal(slide.dataset.image);
		}
	});

	const serviceImagesBlocks = document.querySelectorAll('.service-images-block');
	serviceImagesBlocks.forEach(block => {
		block.addEventListener('click', function(e) {
			const wrapper = e.target.closest('.image-wrapper');
			if (wrapper) {
				const img = wrapper.querySelector('img');
				if (img) {
					openModal(img.src);
				}
			}
		});
	});

	// Modal handlers
	const modal = document.getElementById('imageModal');
	modal.addEventListener('click', function(e) {
		if (e.target.classList.contains('modal')) {
			closeModal();
		}
	});

	document.addEventListener('keydown', function(e) {
		if (e.key === 'Escape') {
			closeModal();
		}
	});
});