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
        }
    };

    var Togglers = {

        header: function () {
            $('.toogle-nav').on('click', function() {
                $('.responsive-menu, .navbar').toggleClass('open');
            })
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

    Togglers.header();

    Navbar.init();
    Navbar.click();

    ScrollToTop.click();
    ScrollToTop.documentScroll();
});