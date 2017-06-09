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
var qa_helper = {};

// timeout for 500 seconds to wait for everything else to initialize
setTimeout(function() {

  console.log('The QA Helper has been loaded!');

  // initialize the view components
  qa_helper.view.init();

	$("#btn-get-course-info").on("click", qa_helper.getCurrentSlide);
	$("#btn-add-bug").on("click", qa_helper.addBug);


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
    if      (ev.keyCode === 17) { ctrlPressed  = true; }
    else if (ev.keyCode === 16) { shiftPressed = true; }

    if (ctrlPressed && shiftPressed) {
      if      (ev.keyCode === hotkey_addBug)          { qa_helper.addBug();              }
      else if (ev.keyCode === hotkey_nextSlide)       { qa_helper.navigate.next_slide(); }
      else if (ev.keyCode === hotkey_prevSlide)       { qa_helper.navigate.prev_slide(); }
      else if (ev.keyCode === hotkey_getCurrentSlide) { qa_helper.getCurrentSlide();     }
    }
  }

  function handleKeyUp(ev) {
    if      (ev.keyCode === 17) { ctrlPressed  = false; }
    else if (ev.keyCode === 16) { shiftPressed = false; }
  }

}, 500);
