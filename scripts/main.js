$(function(){

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

  // box module

  var box_module = {

    levitate: function(box){
      var randy = Math.abs(Math.floor(Math.random() * 7) + 5 ).toString() + 's';
      $(box).css('animation-duration', randy);
    },

    cascade: function(index, value, offset){
      timeout = (index * 30);
      setTimeout(function(){
        $(value).addClass('rise');
      }, timeout);
    }
  }

  //
  // calls
  //

  $.each($('.box'), function(i, v){
    var o = 50;
    box_module.levitate(v);
    box_module.cascade(i, v, o);
  })

  $.each(sidebar_module.sections, function(k, v){
    var _target = $('.' + k),
    _section = $('.' + v);
    $('.' + k).click(function(){
      sidebar_module.navigate(_section)
    })
  });

  $('.anim-el').map(function(index, val){
    setTimeout(function(){
      $(val).addClass('rise-no-width');
    }, 400);
  });

  setTimeout(function(){
    $('.anim-el-secondary').addClass('rise-no-width');
  }, 600);

  $('.nav-icon').click(function(){
    sidebar_module.toggleSidebar();
  });

  $('.link-list-item').hover(function(){
    _this = $(this);
    sidebar_module.ruleAnimate(_this);
  })

});
