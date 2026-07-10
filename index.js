const lazyImages = document.querySelectorAll('.lazy-image');
const loadAllBtn = document.getElementById('load-all-btn');

function loadImage(image) {
    const src = image.getAttribute('data-src');
    if (!src) return;

    image.src = src;

    image.addEventListener('load', () => {
        image.classList.add('loaded');
        image.parentElement.classList.add('is-loaded');
        image.removeAttribute('data-src');
    });
}

const observerOptions = {
    root: null,
    rootMargin: '0px 0px 50px 0px',
    threshold: 0.01
};

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const image = entry.target;
            loadImage(image);
            observer.unobserve(image);
        }
    });
}, observerOptions);

lazyImages.forEach(image => imageObserver.observe(image));

loadAllBtn.addEventListener('click', () => {
    lazyImages.forEach(image => {
        if (image.hasAttribute('data-src')) {
            loadImage(image);
            imageObserver.unobserve(image);
        }
    });
    loadAllBtn.style.display = 'none';
});
