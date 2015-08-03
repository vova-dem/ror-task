$(document).ready(function(){
  $('.custom-carousel-wrapper').each(function(){
    var carouselInner = $(this).find('.custom-carousel-inner');
    var leftBtn = $(this).find('.custom-carousel-btn.btn-left');
    var rightBtn = $(this).find('.custom-carousel-btn.btn-right');
    var containerWidth = 0;

    var items = $(this).find('.custom-carousel-item');
    var bigItems = $(this).find('.custom-carousel-item.big');

    var itemWidth = $(items[1]).width();
    console.log(itemWidth + ' asdsa');

    // calculate width of carosel-inner block

    var itemsWidth = 0;
    for ( var i = 0; i < items.length; i++) {
      if ( $(items[i]).hasClass('big') ) {
        continue;
      }
      itemsWidth += $(items[i]).outerWidth(true);
    }

    var bigItemsWidth = 0;
    for ( var i = 0; i < bigItems.length; i++) {
      if ( $(bigItems[i]).css('display') == 'none' ) {
        continue;
      }
      bigItemsWidth += $(bigItems[i]).outerWidth(true);
    }

    // width for different carousel

    var width = 0;
    if ( $(this).hasClass('new-carousel') ) {
      width = itemsWidth + bigItemsWidth;
    } else {
      width = itemsWidth / 2 + bigItemsWidth;
    }
    $(carouselInner).css('width', width);
    console.log(width);

    // make left carousel button invisible by default

    $( leftBtn ).css({
      'display': 'none',
      'opacity': 0
    });
    
    // right carousel button click handler

    var isAnimated = false; 

    $(rightBtn).on('click', function(event){
      event.preventDefault();
      containerWidth = $(this).closest('.custom-carousel-wrapper').width();
      if ( isAnimated ) {
        return false;
      }
      if ( ( parseInt($(carouselInner ).css('left')) * -1 + containerWidth ) < width ) {
        isAnimated = true;
        $( carouselInner ).animate({
          left: "-=" + containerWidth
        }, 600, function() { //callback
          isAnimated = false;
          if ( ( parseInt($(carouselInner ).css('left')) + containerWidth) <= 0 ) {
            $(leftBtn).css('display', 'inline-block');
            $( leftBtn ).animate({
              opacity: 1
            }, 400);
          }
        });
      }
    });

    // left carousel button click handler

    $(leftBtn).on('click', function(event){
      containerWidth = $(this).closest('.custom-carousel-wrapper').width();
      event.preventDefault();
      if ( isAnimated ) {
        return false;
      }
      if ( ( parseInt($(carouselInner ).css('left')) + containerWidth ) <= 0 ) {
        isAnimated = true;
        $( carouselInner ).animate({
          left: "+=" + containerWidth
        }, 600, function() { //callback
          isAnimated = false;
          if ( ( parseInt($(carouselInner ).css('left')) + containerWidth) > ( containerWidth - 1 ) ) {
            $( leftBtn ).animate({
              opacity: 0
            }, 400, function() {
              $(leftBtn).css('display', 'none');
            });
          }
        });
      } else if ( ( parseInt($(carouselInner ).css('left')) * -1) < containerWidth && parseInt($(carouselInner ).css('left')) != 0 ) {
        isAnimated = true;
        $( carouselInner ).animate({
          left: 0
        }, 600, function() { //callback
          isAnimated = false;
          $( leftBtn ).animate({
             opacity: 0
          }, 400, function() {
            $(leftBtn).css('display', 'none');
          });
        });
      }
    });

  });
});