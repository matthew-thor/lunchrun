/* const header = document.getElementsByTagName('header')[0],
  carouselImages = document.querySelectorAll('.carousel-image'),
  aboutSection = document.getElementById('about'); */

let ticking = false;

const resizeActions = () => {
  if (window.innerWidth < 768) {
    console.log('should collapse', window.innerWidth);
  } else {
    console.log('should expand', window.innerWidth);
  }
  /* const scrollPosition = window.scrollY;
  scrollPosition > 65 ?
    header.classList.add('active') :
    header.classList.remove('active');

  const aboutPosition = aboutSection.getBoundingClientRect().top,
  phoneImage = document.getElementById('aboutmockup');
  aboutPosition < 500 ?
    phoneImage.classList.add('active') : phoneImage.classList.remove('active');

  let translatePosition = 'translateY(' + (window.scrollY / 3) + 'px)';
  carouselImages.forEach(image => {
    image.style.transform = translatePosition;
  }); */

  ticking = false;
};

window.addEventListener('resize', () => {
  if (!ticking) {
    window.requestAnimationFrame(resizeActions);
    ticking = true;
  }
});
