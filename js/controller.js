// CONTROLLER
//
// - this file should contain the only javascript that actually
// runs when the bookmark is clicked, contained within an IIFE
// 

// -----------
//
// qa_helper
//
// descr - all global functions and variables will be
// added as properties of this object
// reference -
//
// -----------
//
// qa_helper.view :
// - init               - initializes the view by adding all of the UI elements to the document.
// - addToDocument      - manually adds the UI elements to the document.
// - removeFromDocument - manually removes the UI elements from the document.
// - toggleVisibility   - toggles visibility on the UI elements
//
// -----------
//
// qa_helper.navigate :
//
//  select_slide - prompt user for 3 number slideID to jump to
//  next_slide   - load the next slide
//  prev_slide   - load the previous slide
//
// -----------
//

//if bar has not yet been loaded on the page, add it
if(!qa_helper){

  
  var qa_helper = {};
  

  //
  //Create templates for different web pages
  //
  var template;
  if(typeof loadNextSlide !== 'undefined') {
    //Blackboard courseware
    template = '<div class="footer-bar-box slide" id="draggable">'                                                                 +
                      '<div id="grabbable" class="group"><h2>UTI QA Helper</h2><button id="hide-qa-helper">X</button></div>' +
                      '<div id="footer-bar">'                                                                                +
                          '<div class="footer-button" id="qa-prev-slide"'                                                    +
                              '<p>Previous Slide</p>'                                                                        +
                              '<small>hotkey: , (comma)</small>'                                                                        +
                          '</div>'                                                                                           +
                          '<div id="btn-get-course-info" class="footer-button">'                                             +
                              '<p>Course Info</p>'                                                                          +
                              '<small>hotkey: Ctrl+Shift+S</small>'                                                                        +
                          '</div>'                                                                                           +
                          '<div class="footer-button" id="qa-next-slide">'                                                   +
                              '<p>Next Slide</p>'                                                                            +
                              '<small>hotkey: . (period)</small>'                                                                        +
                          '</div>'                                                                                           +
                      '</div>'                                                                                               +
                  '</div>';;
  
  } else if($('span.tag-container>span.tag-box.tag-box-selectable')){
    //Visual Studio Team Foundation Server 2015
    template = '<div class="footer-bar-box" id="draggable">'                                                                 +
                      '<div id="grabbable" class="group"><h2>UTI QA Helper</h2><button id="hide-qa-helper">X</button></div>' +
                      '<div id="footer-bar">'                                                                                +
                          '<div id="btn-add-bug"class="footer-button">'                                                      +
                              '<p>Add Bug</p>'                                                                               +
                              '<small>hotkey: Ctrl+Shift+A</small>'                                                                        +
                          '</div>'                                                                                           +
                      '</div>'                                                                                               +
                  '</div>';;

  }

  // timeout for 500 seconds to wait for everything else to initialize
  setTimeout(function() {

    console.log('The QA Helper has been loaded!');

    // initialize the view components
    qa_helper.view.init(template);

  	$("#btn-get-course-info").on("click", qa_helper.getCurrentSlide);
  	$("#btn-add-bug").on("click", qa_helper.addBug);
    $("#hide-qa-helper").on("click", qa_helper.view.toggleVisibility);
    $("#qa-prev-slide").on("click", qa_helper.navigate.prev_slide);
    $("#qa-next-slide").on("click", qa_helper.navigate.next_slide);


    // TODO: make the hotkeys and the UI smart by only displaying the
    // functions that are relevant for the current page (whether TFS
    // or Blackboard)

    var hotkey_addBug          = 65;  // A
    var hotkey_nextSlide       = 190; // .
    var hotkey_prevSlide       = 188; // ,
    var hotkey_getCurrentSlide = 83;  // s

    var ctrlPressed  = false,
        shiftPressed = false,
        listening    = false;

    $(window).keydown(handleKeydown);
    $(window).keyup(handleKeyUp);

    function handleKeydown(ev) {
      if      (ev.which === 17) { ctrlPressed  = true; }
      else if (ev.which === 16) { shiftPressed = true; }

      if (ctrlPressed && shiftPressed) {
        if      (ev.which === hotkey_addBug)          { qa_helper.addBug();              }
        else if (ev.which === hotkey_nextSlide)       { qa_helper.navigate.next_slide(); }
        else if (ev.which === hotkey_prevSlide)       { qa_helper.navigate.prev_slide(); }
        else if (ev.which === hotkey_getCurrentSlide) { qa_helper.getCurrentSlide();     }
      }
    }

    function handleKeyUp(ev) {
      if      (ev.which === 17) { ctrlPressed  = false; }
      else if (ev.which === 16) { shiftPressed = false; }
    }

  }, 500);

//if bar has been loaded on the page, toggle the visibility
} else {
  $("#hide-qa-helper").click();
}
