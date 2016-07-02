$(document).on('ready page:load', function() {

  // Borrowed code for smooth scroll from site:
  // http://www.learningjquery.com/2007/10/improved-animated-scrolling-script-for-same-page-links

  function filterPath(string) {
  return string
    .replace(/^\//,'')
    .replace(/(index|default).[a-zA-Z]{3,4}$/,'')
    .replace(/\/$/,'');
  }
  var locationPath = filterPath(location.pathname);
  var scrollElem = scrollableElement('html', 'body');

  $('a[href*=\\#]').each(function() {
    var thisPath = filterPath(this.pathname) || locationPath;
    if (  locationPath == thisPath
    && (location.hostname == this.hostname || !this.hostname)
    && this.hash.replace(/#/,'') ) {
      var $target = $(this.hash), target = this.hash;
      if (target) {
        var targetOffset = $target.offset().top;
        $(this).click(function(event) {
          event.preventDefault();
          $(scrollElem).animate({scrollTop: targetOffset}, 400, function() {
            location.hash = target;
          });
        });
      }
    }
  });

  // use the first element that is "scrollable"
  function scrollableElement(els) {
    for (var i = 0, argLength = arguments.length; i <argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop()> 0) {
        return el;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop()> 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return el;
        }
      }
    }
    return [];
  };

  // Back to top functionality from http://html-tuts.com/back-to-top-button-jquery/

  var amountScrolled = 300;

  $(window).scroll(function() {

  	if ($(window).scrollTop() > amountScrolled) {
  		$('a.back-to-top').fadeIn('slow');
      $('nav').addClass('nav-show');
  	} else {
  		$('a.back-to-top').fadeOut('slow');
      $('nav').removeClass('nav-show');
  	};
  });

  //Hamburger icon and sidebar functionality
  // Hamburger
  $('#nav-toggle').on('click', function(e) {
    e.preventDefault();

    $(this).add('.sidebar').toggleClass('is-open');
  });

  //Initialize slack table for schedule
  $('#table').stacktable();

});
