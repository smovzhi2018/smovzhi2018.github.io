$(document).ready(function() {

    var Initialize = {

        scrollToFixed: function() {
            $('.navbar-scroll-to-fixed').scrollToFixed();
        },

        wow: function() {
            var wow = new WOW({
                mobile: false
            });
            wow.init();
        },

        parallax: function() {
            $(window).stellar();
        },

        countdown: function () {
            $('#clock').countdown('2018/09/15 12:20:00', function(event) {
                var $this = $(this).html(event.strftime(''
                    + '<div class="box"><div>%D</div> <span>Дней</span> </div>'
                    + '<div class="box"><div>%H</div> <span>Часов</span> </div>'
                    + '<div class="box"><div>%M</div> <span>Минут</span> </div>'
                    + '<div class="box"><div>%S</div> <span>Секунд</span> </div>'));
            });
        }
    };

    var Togglers = {

        nav: function () {
            $('.nav-button').on('click', function() {
                $('.nav').toggleClass('active');
            });

            $('.nav-overlay, .nav-menu').on('click', function() {
                $('.nav').removeClass('active');
            });
        }
    };

    var $navItem        = $('.nav-item');
    var $navbarItem     = $('.nav-item');

    var Navbar = {

        init: function() {
            $(document).on('scroll', this.onScroll);
        },

        click: function() {
            var context = this;

            $navItem.on('click', function (e) {
                e.preventDefault();
                $(document).off('scroll');

                var $target = $(this.hash);

                $navItem.removeClass('active');
                $('[href="' + $(this).attr('href') + '"]').addClass('active');

                $('html, body').stop().animate({
                    scrollTop: $target.offset().top + 2
                }, 500, 'swing', function () {
                    $(document).on('scroll', context.onScroll);
                });
            });
        },

        onScroll: function() {
            var scrollPos = $(document).scrollTop();

            $navbarItem.each(function () {
                var currLink = $(this);
                var refElement = $(currLink.attr('href'));

                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.innerHeight() > scrollPos) {
                    $navItem.removeClass('active');
                    currLink.addClass('active');
                } else {
                    currLink.removeClass('active');
                }
            });
        }
    };

    var $scrollToTopBtn = $('.scroll-top-button');

    var ScrollToTop = {

        click: function() {
            $scrollToTopBtn.on('click', function() {
                $('html, body').stop().animate({
                    scrollTop: 0
                }, 500);
            });
        },

        documentScroll: function() {
            $(document).on('scroll', function() {
                var scrollTop = $(document).scrollTop();

                if (scrollTop > 250) {
                    $scrollToTopBtn.fadeIn(500);
                } else {
                    $scrollToTopBtn.fadeOut(500);
                }
            });
        }
    };

    Initialize.scrollToFixed();
    Initialize.wow();
    Initialize.parallax();
    Initialize.countdown();

    Togglers.nav();

    Navbar.init();
    Navbar.click();

    ScrollToTop.click();
    ScrollToTop.documentScroll();
});

$(window).on('load', function () {
    $('.loader').fadeOut();
});