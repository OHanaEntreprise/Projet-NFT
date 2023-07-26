/*Countdown*/
function updateCountdown(targetDate) {
  const countdownContainer = document.querySelector(".countdown .container");

  function updateTimer() {
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
      // Countdown reached its target date
      clearInterval(interval);
      return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    // Update the countdown elements with the calculated values
    countdownContainer.querySelector(".days").textContent = days;
    countdownContainer.querySelector(".hours").textContent = String(hours).padStart(2, "0");
    countdownContainer.querySelector(".minutes").textContent = String(minutes).padStart(2, "0");
    countdownContainer.querySelector(".seconds").textContent = String(seconds).padStart(2, "0");
  }

  // Update the countdown immediately and start updating it every second
  updateTimer();
  const interval = setInterval(updateTimer, 1000);
}

// Example usage:
const targetDate = new Date("2023-07-26T23:59:59");
updateCountdown(targetDate);


/*Coming-soon swiper*/

var swiper = new Swiper(".items", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

swiper.autoplay.start();

/*Collection swiper */

var collection_swiper = new Swiper(".collection-swiper", {
  // Enable 3D coverflow effect
  effect: 'coverflow',
  loop: true,

  coverflowEffect: {
      perspective: 1000,
      rotate:-25,
      stretch:0,
      depth:150,
      slideshadows:true,
      modifier: 1,
  },

  spaceBetween: 30,

  slidesPerView:3,

  navigation: {
      nextEl: '.nav-next',
      prevEl: '.nav-previous',
  },

  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },

  on: {
    slideChange: function () {
      const index_currentSlide = this.activeIndex;
      const currentSlide = this.slides[index_currentSlide+1];
      
      $(currentSlide).find('.fullscreenButton').css({
        opacity: 1,
        pointerEvents: 'auto'
      });

      $(".collection-swiper .swiper-slide").not(currentSlide).find('.fullscreenButton').css({
        opacity: 0,
        pointerEvents: 'none'
      });

      // Pause the video in the previous slide (if any) and play the video in the current slide
      const videoElements = $(".collection-swiper .item-video");
      
      videoElements.each(function () {
        this.pause();
      });
      const videoElement = $(currentSlide).find('.item-video')[0];
      if (videoElement) {
        videoElement.play();
      }

    },
  },
});

collection_swiper.autoplay.start();

/*Full screen*/
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.item-video');
  const fullscreenButtons = document.querySelectorAll('.fullscreenButton');

  // Fullscreen button click event for each video
  fullscreenButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      const video = videos[index];
      if (video.requestFullscreen) {
        video.requestFullscreen();
      } else if (video.mozRequestFullScreen) { /* Firefox */
        video.mozRequestFullScreen();
      } else if (video.webkitRequestFullscreen) { /* Chrome, Safari, and Opera */
        video.webkitRequestFullscreen();
      } else if (video.msRequestFullscreen) { /* IE/Edge */
        video.msRequestFullscreen();
      }
    });
  });
});


