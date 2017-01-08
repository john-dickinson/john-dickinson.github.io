
// sidebar module
var sidebar_module = {

  // dictionary containing each sidebar nav item (target) and its corresponding
  // body section.
  sections: {
    "section-one-target": "section-one",
    "section-two-target": "section-two",
    "section-three-target": "section-three",
    "section-four-target": "section-four",
  },

  // toggle the sidebar, based on its data-visible attribute,
  // whenever the hamburger is clicked
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

  // when a sidebar nav item is clicked, scroll down to its corresponding
  // section as didcated in the sections dictionary above.
  // also, collapse the nav
  navigate: function(item){
    var item_offset = $(item).offset().top;
    sidebar_module.toggleSidebar();
    $('html, body').animate({
      scrollTop: item_offset
    }, 750);
  },

  // add the rule-grow class to a given sidebar nav item on-hover
  // actually just hiding and showing the nav item's sibling hr element
  ruleAnimate: function(item){
    $('.rule').removeClass('rule-grow');
    var rule = item.find('.rule');
    rule.addClass('rule-grow');
  }
}

// box module
var box_module = {
  // set each item to levitate at a random
  // animation duration between 7 and 5 sections
  levitate: function(box){
    var randy = Math.abs(Math.floor(Math.random() * 7) + 5 ).toString() + 's';
    $(box).css('animation-duration', randy);
  },

  // set each item to cascade into the DOM on load, with
  // a delay corresponding to their order
  cascade: function(index, value, offset){
    timeout = (index * 30);
    setTimeout(function(){
      $(value).addClass('rise');
    }, timeout);
  }
}

// section module
var section_module = {

  // sections to render and dummy starting offset top values of zero
  sections: {'.section-two': 0,
  '.section-three': 0,
  '.section-four': 0},

  // For each section and its nested hidden elements, render their contents
  // with a cascading delay if the user scrolls past said element
  renderSection: function(section, hidden){
    var top = $(window).scrollTop();
    var sectionHeight = section_module.sections[section];
    if(top >= sectionHeight){
      $.each(hidden, function(index, value){
        var timeout = index * 100;
        setTimeout(function(){
          $(value).addClass('rise-no-width');
        }, timeout);
      })
    }
  }
}

//
// calls
//
$(function(){

  // for each hidden section, render its contents when users scrolls to it
  $.each(section_module.sections, function(key, value){
    var top = $(key).offset().top;
    section_module.sections[key] = top;
    var hidden_els = $(key).find('.hidden');
    $(window).scroll(function(){
      section_module.renderSection(key);
    });
  });

  // animate each box to levitate at random durations
  $.each($('.box'), function(index, value){
    var offset = 50;
    box_module.levitate(value);
    box_module.cascade(index, value, offset);
  })

  // clicking on sidebar navigation link will scroll the user to the
  // corresponding section
  $.each(sidebar_module.sections, function(key, value){
    var _target = $('.' + key),
    _section = $('.' + value);
    $('.' + key).click(function(){
      sidebar_module.navigate(_section)
    })
  });

  // animated certain elements up on-load
  $('.anim-el').map(function(index, value){
    setTimeout(function(){
      $(value).addClass('rise-no-width');
    }, 400);
  });

  // animate secondary elements on-load with a 2ms delay
  setTimeout(function(){
    $('.anim-el-secondary').addClass('rise-no-width');
  }, 600);

  // show the sidebar module when the burger is clicked
  $('.nav-icon').click(function(){
    sidebar_module.toggleSidebar();
  });

  // animate rule when hovered over
  $('.link-list-item').hover(function(){
    _this = $(this);
    sidebar_module.ruleAnimate(_this);
  })

});
