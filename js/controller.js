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

	// $("#btn-get-course-info").on("click", function(){
	// 	  alert('get course info')
	// });

	// $("#btn-add-bug").on("click", function(){
	// 	  alert('get course info')
	// });

}, 500);
