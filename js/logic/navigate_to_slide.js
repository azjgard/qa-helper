// NAVIGATE TO SLIDE
//

//
// navigate
//
// @return - an object with the following properties:
//  select_slide - prompt user for 3 number slideID to jump to
//  next_slide   - load the next slide
//  prev_slide   - load the previous slide
qa_helper.navigate = new function() {

  this.select_slide = function(){
    // lets you choose the slide to go to
    var slide_reference = prompt("Please enter the 3 number sequence of the slide you want to go to (last three numbers)", "1-01-1"); 

    if (slide_reference) {
      loadSlideByReferenceId(slide_reference); 
    }
  };

  // takes you to the next slide
  this.next_slide = function(){
    loadNextSlide();
  };

  // takes you to the previous slide
  this.prev_slide = function(){
    loadPrevSlide();
  };

  return this;
};
