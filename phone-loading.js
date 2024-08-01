document.addEventListener('DOMContentLoaded', function() {
    const staticImage = document.querySelector('.static-image');
    const animatedModel = document.querySelector('.animated-model');
    const phoneElements = document.querySelectorAll('.phone-container > div');
    let loadedImages = 0;
    let totalImages = phoneElements.length;
    let hasError = false;

    function checkAllImagesLoaded() {
        loadedImages++;
        if (loadedImages === totalImages && !hasError) {
        staticImage.style.display = 'none';
        animatedModel.style.display = 'block';
        }
    }

    function handleImageError() {
        hasError = true;
        // Keep static image visible and ensure animated model is hidden
        staticImage.style.display = 'block';
        animatedModel.style.display = 'none';
    }

    phoneElements.forEach(element => {
        const bgImage = window.getComputedStyle(element).getPropertyValue('background-image');
        if (bgImage !== 'none') {
        const img = new Image();
        img.onload = checkAllImagesLoaded;
        img.onerror = handleImageError;
        img.src = bgImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1');
        } else {
        totalImages--;
        checkAllImagesLoaded(); // Check if this was the last image
        }
    });
});