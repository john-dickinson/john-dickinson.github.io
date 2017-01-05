$(function(){

  //
  // declarations
  //

  // sidebar module
  var sidebar_module = {
    sections: {
      "section-one-target": "section-one",
      "section-two-target": "section-two",
      "section-three-target": "section-three",
      "section-four-target": "section-four",
    },

    toggleSidebar: function(){
      var _sidebar = $('.sidebar-nav'),
      _sidebar_list = $('.sidebar-list');
      _icon = $('.nav-icon-close');
      if(_sidebar.attr('data-visible') === "false"){
        _sidebar.addClass('sidebar-shown').attr('data-visible','true');;
        _sidebar_list.css('opacity','1')
        _icon.addClass('icon-appear');
      } else {
        _sidebar.removeClass('sidebar-shown').attr('data-visible','false');;
        _sidebar_list.css('opacity','0')
        _icon.removeClass('icon-appear');
      }
    },

    navigate: function(item){
      var item_offset = $(item).offset().top;
      sidebar_module.toggleSidebar();
      $('html, body').animate({
        scrollTop: item_offset
      }, 750);
    },

    ruleAnimate: function(item){
      $('.rule').removeClass('rule-grow');
      var rule = item.find('.rule');
      rule.addClass('rule-grow');
    }

  }

  //
  // calls
  //
  
  $.each(sidebar_module.sections, function(k, v){
    var _target = $('.' + k),
    _section = $('.' + v);
    $('.' + k).click(function(){
      sidebar_module.navigate(_section)
    })
  });

  $('.anim-el').map(function(index, val){
    $(val).addClass('animated-el');
  })

  $('.nav-icon').click(function(){
    sidebar_module.toggleSidebar();
  });

  $('.link-list-item').hover(function(){
    _this = $(this);
    sidebar_module.ruleAnimate(_this);
  })

});
