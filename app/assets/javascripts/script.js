$(document).ready(function(){
  $('.custom-carousel-wrapper').each(function(){
    var carouselInner = $(this).find('.custom-carousel-inner');
    var leftBtn = $(this).find('.custom-carousel-btn.btn-left');
    var rightBtn = $(this).find('.custom-carousel-btn.btn-right');
    var containerWidth = $(this).width();

    var items = $(this).find('.custom-carousel-item');
    var bigItems = $(this).find('.custom-carousel-item.big');

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

    var width = itemsWidth / 2 + bigItemsWidth;
    $(carouselInner).css('width', width);
    console.log(width);

    // make left carousel button invisible by default

    $( leftBtn ).css({
      'display': 'none',
      'opacity': 0
    });
    
    // right carousel button click handler

    $(rightBtn).on('click', function(event){
      event.preventDefault();
      if ( ( parseInt($(carouselInner ).css('left')) * -1 + containerWidth ) < width ) {
        $( carouselInner ).animate({
          left: "-=" + containerWidth
        }, 600, function() {
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
      event.preventDefault();
      if ( ( parseInt($(carouselInner ).css('left')) + containerWidth ) <= 0 ) {
        $( carouselInner ).animate({
          left: "+=" + containerWidth
        }, 600, function() {
          if ( ( parseInt($(carouselInner ).css('left')) + containerWidth) > 0 ) {
            $( leftBtn ).animate({
              opacity: 0
            }, 400, function() {
              $(leftBtn).css('display', 'none');
            });
          }
        });
      } 
    });

  });
});