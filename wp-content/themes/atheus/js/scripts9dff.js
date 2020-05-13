(function($) {
    $(document).ready(function() {
        "use strict";
		
		
        // PAGE HEADER FADE
        var divs = $('.page-header .video-bg');
        $(window).on('scroll', function() {
            var st = $(this).scrollTop();
            divs.css({
                'opacity': (1 - st / 700)
            });
            divs.css({
                'transition-delay': ("0s")
            });
            divs.css({
                'transition': ("0.05s ease-in-out")
            });
        });

        // SPLITTING
        Splitting();

        // HAMBURGER MENU
        $('.hamburger-menu').on('click', function(e) {
            if ($(".menu-navigation").hasClass("active")) {
                $("body").toggleClass("overflow");
                $(".horizontal-menu").toggleClass("active");
                $(".menu-navigation").removeClass("active");
                $(".horizontal-menu").css("transition-delay", "0s");
                $(".menu-navigation .layers").css("transition-delay", "1s");
                $(".navigation-menu .bg-layers span").css("transition-delay", "0.3s");
            } else {
                $("body").toggleClass("overflow");
                $(".menu-navigation").toggleClass("active");
                $(".horizontal-menu").toggleClass("active");
                $(".horizontal-menu").css("transition-delay", "1s");
                $(".menu-navigation .layers").css("transition-delay", "0s");
                $(".navigation-menu.active .inner blockquote").css("transition-delay", "10s");
                $(".navigation-menu .bg-layers span").css("transition-delay", "0s");
            }
            $(this).toggleClass("active");
        });

        // MAGNET EFFECT 
        document.addEventListener("mousemove", function(e) {
            magnetize('.circle', e);
        });

        function magnetize(el, e) {
            var mX = e.pageX,
                mY = e.pageY;
            var items = document.querySelectorAll(el);

            [].forEach.call(items, function(item) {
                var customDist = item.getAttribute('dist') * 20 || 30;
                var centerX = item.offsetLeft + (item.clientWidth / 2);
                var centerY = item.offsetTop + (item.clientHeight / 2);

                var deltaX = Math.floor((centerX - mX)) * -0.45;
                var deltaY = Math.floor((centerY - mY)) * -0.45;

                var distance = calculateDistance(item, mX, mY);

                if (distance < customDist) {
                    TweenMax.to(item, 0.3, {
                        y: deltaY,
                        x: deltaX,
                        scale: 1
                    });
                    item.classList.add('magnet');
                } else {
                    TweenMax.to(item, 0.45, {
                        y: 0,
                        x: 0,
                        scale: 1
                    });
                    item.classList.remove('magnet');
                }
            });
        }

        function calculateDistance(elem, mouseX, mouseY) {
            return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offsetLeft + (elem.clientWidth / 2)), 2) + Math.pow(mouseY - (elem.offsetTop + (elem.clientHeight / 2)), 2)));
        }

		// TEAM SLIDER 
        var swiper = new Swiper('.swiper-container', {
            slidesPerView: 4,
            spaceBetween: 0,
            centeredSlides: true,
            pagination: {
                el: '.swiper-pagination',
                type: 'progressbar',
            },
			breakpoints: {
				640: {
				  slidesPerView: 1,
				  spaceBetween: 0,
				},
				768: {
				  slidesPerView: 2,
				  spaceBetween: 0,
				}}
        });

        // SLIDER
        var swiper = new Swiper('.showcase-slider', {
            speed: 600,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                renderBullet: function(index, className) {
                    return '<span class="' + className + '">.0' + (index + 1) + '</span>';
                },
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
        });

        // DATA BACKGROUND IMAGE
        var pageSection = $(".bg-image");
        pageSection.each(function(indx) {
            if ($(this).attr("data-background")) {
                $(this).css("background-image", "url(" + $(this).data("background") + ")");
            }
        });

        // WAVE SOUND TOGGLE
        if( data.enable_sound_bar == true ) {
            var source = data.audio_source;
            var audio = new Audio(); // use the constructor in JavaScript, just easier that way
            audio.addEventListener("load", function () {
                audio.play();
            }, true);
            audio.src = source;
            audio.autoplay = true;
            audio.loop = true;
            audio.volume = 0.2;

            $('.audio').click();
            var playing = true;
            $('.audio').on('click', function (e) {
                if (playing == false) {
                    audio.play();
                    playing = true;

                } else {
                    audio.pause();
                    playing = false;
                }
            });
        }

        // WAVE SOUND EFFECT
        const svg = document.getElementById('wave')

        if( svg != null ) {
            const lines = svg.querySelectorAll("polyline")
            const width = svg.viewBox.baseVal.width
            var amp = 40
            var freq = 7
            var points = []
            var counter = 0;
            var speed = 3;

            function setPoints() {
                var x, y, step = 0
                points = []

                for (x = 0; x <= width; x++) {
                    x < width / 2 ? step++ : step--
                    y = (step / 100 * amp) * Math.sin((x + counter) / 100 * freq)

                    points.push(x, y)
                }
                return points.join(" ")
            }

            function animateWaves() {
                setPoints()
                lines.forEach(line => line.setAttribute("points", points))
                counter += speed
                requestAnimationFrame(animateWaves)
            }

            animateWaves()
        }

        $('.audio').on('click', function() {
            $(".audio").toggleClass("switch");
            if ($(this).find('svg').data('status') == '1') {
                var i = 7;
                $(this).find('svg').data('status', '0');
                animateLook(i);
            } else {
                var i = 0;
                $(this).find('svg').data('status', '1');
                animateLookStart(i);
            }
        });

        function animateLook(i) {
            setTimeout(function() {
                i--;
                freq = i;
                if (i > 0) {
                    animateLook(i);
                }
            }, 60)
        }

        function animateLookStart(i) {
            setTimeout(function() {
                i++;
                freq = i;

                if (i < 8) {
                    animateLookStart(i);
                }
            }, 60)
        }

        // COUNTER
        $(document).scroll(function() {
            $('.odometer').each(function() {
                var parent_section_postion = $(this).closest('section').position();
                var parent_section_top = parent_section_postion.top;
                if ($(document).scrollTop() > parent_section_top - 300) {
                    if ($(this).data('status') == 'yes') {
                        $(this).html($(this).data('count'));
                        $(this).data('status', 'no')
                    }
                }
            });
        });

		 // PAGE TRANSITION
		$('body a').on('click', function(e) {
			var target = $(this).attr('target');
			var fancybox = $(this).data('fancybox');
			var url = this.getAttribute("href");
			if (target != '_blank' && typeof fancybox == 'undefined' && url.indexOf('#') < 0) {


				e.preventDefault();
				var url = this.getAttribute("href");
				if (url.indexOf('#') != -1) {
					var hash = url.substring(url.indexOf('#'));


					if ($('body ' + hash).length != 0) {
						$('.page-transition').removeClass("active");


					}
				} else {
					$('.page-transition').toggleClass("active");
					setTimeout(function() {
						window.location = url;
					}, 1300);

				}
			}
		});
    });
    // END JQUERY	

    // MASONRY
    function masonry_init() {
        $('.works').masonry({
            itemSelector: '.works li',
			columnWidth: '.works li',
            percentPosition: true
        });
    }

    window.onload = masonry_init;
	
	
	
	/* MAGNET CURSOR*/
    var cerchio = document.querySelectorAll('.magnet-link');

    cerchio.forEach(function (elem) {
      $(document).on('mousemove touch', function (e) {
        magnetize(elem, e);
      });
    })


    function magnetize(el, e) {
      var mX = e.pageX,
        mY = e.pageY;
      const item = $(el);

      const customDist = item.data('dist') * 20 || 80;
      const centerX = item.offset().left + (item.width() / 2);
      const centerY = item.offset().top + (item.height() / 2);

      var deltaX = Math.floor((centerX - mX)) * -0.35;
      var deltaY = Math.floor((centerY - mY)) * -0.35;

      var distance = calculateDistance(item, mX, mY);

      if (distance < customDist) {
        TweenMax.to(item, 0.5, {
          y: deltaY,
          x: deltaX,
          scale: 1
        });
        item.addClass('magnet');
      } else {
        TweenMax.to(item, 0.6, {
          y: 0,
          x: 0,
          scale: 1
        });
        item.removeClass('magnet');
      }
    }

    function calculateDistance(elem, mouseX, mouseY) {
      return Math.floor(Math.sqrt(Math.pow(mouseX - (elem.offset().left + (elem.width() / 2)), 2) + Math.pow(mouseY - (elem.offset().top + (elem.height() / 2)), 2)));
    }

    /*- MOUSE STICKY -*/
    function lerp(a, b, n) {
      return (1 - n) * a + n * b
    }
	
	
	// CUSTOM CURSOR
    class Cursor {
      constructor() {
        this.bind()
        //seleziono la classe del cursore
        this.cursor = document.querySelector('.js-cursor')

        this.mouseCurrent = {
          x: 0,
          y: 0
        }

        this.mouseLast = {
          x: this.mouseCurrent.x,
          y: this.mouseCurrent.y
        }

        this.rAF = undefined
      }

      bind() {
        ['getMousePosition', 'run'].forEach((fn) => this[fn] = this[fn].bind(this))
      }

      getMousePosition(e) {
        this.mouseCurrent = {
          x: e.clientX,
          y: e.clientY
        }
      }

      run() {
        this.mouseLast.x = lerp(this.mouseLast.x, this.mouseCurrent.x, 0.2)
        this.mouseLast.y = lerp(this.mouseLast.y, this.mouseCurrent.y, 0.2)

        this.mouseLast.x = Math.floor(this.mouseLast.x * 100) / 100
        this.mouseLast.y = Math.floor(this.mouseLast.y * 100) / 100

        this.cursor.style.transform = `translate3d(${this.mouseLast.x}px, ${this.mouseLast.y}px, 0)`

        this.rAF = requestAnimationFrame(this.run)
      }

      requestAnimationFrame() {
        this.rAF = requestAnimationFrame(this.run)
      }

      addEvents() {
        window.addEventListener('mousemove', this.getMousePosition, false)
      }

      on() {
        this.addEvents()

        this.requestAnimationFrame()
      }

      init() {
        this.on()
      }
    }

    const cursor = new Cursor()
    cursor.init();
    $('a, .svg, .swiper-button-prev, .swiper-button-next, .swiper-pagination-bullet, .bottombar .audio').hover(function () {
      $('.cursor').toggleClass('light');
    });

	// PRELOADER
    var width = 100,
        perfData = window.performance.timing, // The PerformanceTiming interface represents timing-related performance information for the given page.
        EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart),
        time = parseInt((EstimatedTime / 1000) % 60, 10) * 100;

    var PercentageID = $("#percentage"),
        start = 0,
        end = 100,
        durataion = time;
    animateValue(PercentageID, start, end, durataion);

    function animateValue(id, start, end, duration) {

        var range = end - start,
            current = start,
            increment = end > start ? 1 : -1,
            stepTime = Math.abs(Math.floor(duration / range)),
            obj = $(id);

        var timer = setInterval(function() {
            current += increment;
            $(obj).text(current);
            //obj.innerHTML = current;
            if (current == end) {
                clearInterval(timer);
            }
        }, stepTime);
    }

    setInterval(function() {
        $(".page-loaded").addClass('header-ready');
    }, 3500);

    setInterval(function() {
        $("body").addClass("page-loaded");
    }, time);

	// WOW ANIMATION
    wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });
    wow.init();

    // MENU SCROLL
    const el = document.querySelector(".main-menu");

    if( el != null ) {

        // Variables ~ Widths
        let elWidth = el.offsetWidth;
        let windowWidth = window.innerWidth;

        // Variables ~ Mouse
        let mouseX = 0;
        let prevMouseX = 0;

        // Target: value we want to animate to
        let skewTarget = 0;
        let translateTarget = 0;

        // WithEasing: value we use to animate
        let skewWithEasing = 0;
        let translateWithEasing = 0;

        // EasingFactor: determines how quick the animation/interpolation goes
        let skewEasingFactor = 0.1;
        let translateEasingFactor = 0.05;

        // Events
        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("resize", handleWindowResize);

        // Functions
        function handleMouseMove(e) {
            mouseX = e.pageX;
        }

        function handleWindowResize(e) {
            elWidth = el.offsetWidth;
            windowWidth = window.innerWidth;
        }

        function lerp(start, end, factor) {
            return (1 - factor) * start + factor * end;
        }

        function animateMe() {
            // Get difference between current and previous mouse position
            skewTarget = mouseX - prevMouseX;
            prevMouseX = mouseX;

            // Calc how much we need to translate our el
            translateTarget = (elWidth - windowWidth) / windowWidth * mouseX * -1;

            // Ease between start and target values (skew)
            skewWithEasing = lerp(skewWithEasing, skewTarget, skewEasingFactor);

            // Limit our skew to a range of 75 degrees so it doesn't "over-skew"
            skewWithEasing = Math.min(Math.max(parseInt(skewWithEasing), -25), 25);

            // Ease between start and target values (translate)
            translateWithEasing = lerp(
                translateWithEasing,
                translateTarget,
                translateEasingFactor
            );

            el.style.transform = `
    translateX(${translateWithEasing}px)
    skewX(${skewWithEasing}deg)
  `;

            // RAF
            window.requestAnimationFrame(animateMe);

        }

        window.requestAnimationFrame(animateMe);
    }
})(jQuery);