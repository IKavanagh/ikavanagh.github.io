(function($) {

	var	$body = $('body');

    var $brand = $('#brand');
    $brand.on('click', smoothScroll);

	// Menu.
    var $menu = $('#menu');

    $menu._locked = false;

    $menu._lock = function() {

        if ($menu._locked) return false;

        $menu._locked = true;

        window.setTimeout(function() {
            $menu._locked = false;
        }, 350);

        return true;
    };

    $menu._show = function() {

        if ($menu._lock()) {
            $body.addClass('is-menu-visible');
        }

    };

    $menu._hide = function() {

        if ($menu._lock()) {
            $body.removeClass('is-menu-visible');
        }

    };

    $menu._toggle = function() {

        if ($menu._lock()) {
            $body.toggleClass('is-menu-visible');
        }

    };

    $menu
        .on('click', function(event) {

            event.stopPropagation();

            // Hide.
            $menu._hide();
        })
        .find('.inner')
            .on('click', '.close', function(event) {
                event.preventDefault();
                event.stopPropagation();
                event.stopImmediatePropagation();

                // Hide.
                $menu._hide();
            })
            .on('click', function(event) {
                event.stopPropagation();
            })
            .on('click', 'a', smoothScroll);

    $body
        .on('click', 'a[href="#menu"]', function(event) {
            event.preventDefault();
            event.stopPropagation();

            $menu._toggle();
        })
        .on('keydown', function(event) {
            // Hide on escape.
            if (event.keyCode == 27) {
                $menu._hide();
            }
        });

    function smoothScroll(event) {
        // Hide.
        $menu._hide();

        // Smooth scrolling using jQuery easing
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            this.blur(); // Remove focus from <a>
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                const anchors = ['top', 'about'];
                $('html, body').animate({
                    scrollTop: (target.offset().top - (anchors.some(el => this.hash.includes(el)) ? 56 : 0))
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    }

    $('body').scrollspy({
        target: '#nav'
    });

})(jQuery);
