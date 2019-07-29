'use strict';

(function($) {
    $.fn.slider = function(options) {
        var defaults = {
            iterval: 2000,
            transition: 'slide',
            slideShow: true
        }
        options = $.extend(defaults, options);
        var width = 720;
        var animationSpeed = 1000;
        var currentSlide = 1;

       
    
        var $slider = $(this);
        var $slideContainer = $slider.wrap('<div id="slider"></div>');
        var $slides = $slider.children();
        generateImages();
    
        var interval;

        function fireInterval() {
            if(options.slideShow) {
                interval = setInterval(slideRight, options.interval);
            }
        }

        
    
        function slideRight() {
            if (currentSlide === $slides.length) return;
            currentSlide++;
            $slideContainer.animate({'margin-left': '-='+width}, animationSpeed);
        }

        function slideLeft() {            
            if (currentSlide === 1) return;
            currentSlide--;
            $slideContainer.animate({'margin-left': '+='+width},  animationSpeed);
        }
        function pauseSlider() {
            clearInterval(interval);
            interval = null;
        }

        function generateImages() {
            $slides.each(function(index, item) {
                var li = $(item);
                var dataUrl = li.attr('data-url')
                $('<img src="' + dataUrl + '" width="720" />').appendTo(li);
            })
        }

        fireInterval();
        
        $('.left').on('click', () => {
            pauseSlider();
            slideLeft();
            if(!interval) fireInterval();
        });
        $('.right').on('click', () => {
            pauseSlider();
            slideRight();
            if(!interval) fireInterval();
        });

    }

})(jQuery);
