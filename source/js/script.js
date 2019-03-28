/**
 * @file
 * Custom JS for NYPR.
 */

(function($) {

  /**
   * General helper function to support toggle functions.
   */
  var toggleClasses = function(element) {
    var $this = element,
        $togglePrefix = $this.data('prefix') || 'this';

    // If the element you need toggled is relative to the toggle, add the
    // .js-this class to the parent element and "this" to the data-toggled attr.
    if ($this.data('toggled') == "this") {
      var $toggled = $this.closest('.js-this');
    }
    else {
      var $toggled = $('.' + $this.data('toggled'));
    }
    if ($this.attr('aria-expanded', 'true')) {
      $this.attr('aria-expanded', 'true')
    }
    else {
      $this.attr('aria-expanded', 'false')
    }
    $this.toggleClass($togglePrefix + '-is-active');
    $toggled.toggleClass($togglePrefix + '-is-active');

    // Remove a class on another element, if needed.
    if ($this.data('remove')) {
      $('.' + $this.data('remove')).removeClass($this.data('remove'));
    }
  };

  // Scroll the side menu back to top.
  function sideMenuScrollTop() {
    setTimeout(function() {
      $('.c-side-menu').scrollTop(0);
    }, 1000);
  }

  // Adjust the height of the side menu depending on the header ad unit size.
  $(window).resize(resizeFrame).resize();
  function resizeFrame() {
    var headerHeight = $('.c-main-header__ad-unit').height();
    $('.c-side-menu').css('height', 'calc(100vh - ' + headerHeight + 'px)');
  }

  /*
   * Toggle Active Classes
   *
   * @description:
   *  toggle specific classes based on data-attr of clicked element
   *
   * @requires:
   *  'js-toggle' class and a data-attr with the element to be
   *  toggled's class name both applied to the clicked element
   *
   * @example usage:
   *  <span class="js-toggle" data-toggled="toggled-class">Toggler</span>
   *  <div class="toggled-class">This element's class will be toggled</div>
   *
   */
  $('.js-toggle').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    toggleClasses($(this));
    sideMenuScrollTop();
  });

  // Toggle parent class
  $('.js-toggle-parent').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    $this.toggleClass('this-is-active');
    $this.parent().toggleClass('this-is-active');
  });

  // Prevent bubbling to the body. Add this class to the element (or element
  // container) that should allow the click event.
  $('.js-stop-prop').on('click', function(e) {
    e.stopPropagation();
  });

  // Remove active classes when the body is clicked/tapped.
  // $('body').on('click', function(e) {
  //   $('.this-is-active').removeClass('this-is-active');
  // });

  // Close side menu when other things are clicked outside the menu.
  $('body, .c-content-overlay, .c-menu-toggle.side-menu-is-active').on('click', function(e){
    $('.side-menu-is-active').removeClass('side-menu-is-active');
    sideMenuScrollTop();
  });

  // Target article content.
  $('.c-article__body').fitVids();

  // Top search entry specific functionality.
  (function() {
    // Focus input on toggle.
    $('.c-search-toggle.js-toggle').on('click', function(e) {
      setTimeout(function() {
        $('.c-search--top .c-search__input').focus();
      }, 500);
    });
    // If input has no value, close the form when submitted.
    $('.c-search--top').on('submit', function(e) {
      var thisInput = $(this).find('.c-search__input');
      if (!thisInput.val()) {
        e.preventDefault();
        $('.top-search-is-active').removeClass('top-search-is-active');
      }
    });
  })();


  /**
   * Simple function to detect if an element has entered the viewport.
   */
  function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();

    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();

    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
  }

  // Pop out the donate tout.
  $(window).on('scroll', function() {
    $('.c-article__footer').each(function() {
      if (isScrolledIntoView($(this))) {
        $(this).find('.c-donate-tout').addClass('is-active');
      }
    });
  });

  /**
   * Lead photo gallery image swap.
   */
  (function() {
    $('.c-lead-gallery__thumbs-thumb').on('click', function(e) {
      e.preventDefault();

      var $this = $(this),
          $thisImg = $this.find('img'),
          $thisTitle = $thisImg.attr('alt'),
          $thisCaption = $thisImg.data('caption'),
          $thisLargeImg = $thisImg.data('image');

      // Swap content
      $('.c-lead__image img').attr('src', $thisLargeImg)
      $('.c-lead-gallery__title').text($thisTitle);
      $('.c-lead-gallery__dek p').text($thisCaption);

    });
  })();

  $('.c-lead-gallery__thumbs-thumb-text').on('click', function(e) {
    $('html, body').animate({ scrollTop: 0 });
  });

})(jQuery);
