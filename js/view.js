// VIEW
//
// - handles all of the view logic for the app
//

qa_helper.view = new function() {

  var $drag_box;

  this.addToDocument = function() {
    $("body").append(this.element);
    $drag_box = $( "#draggable" );
    $drag_box.hide().fadeIn(400, "linear");
  };

  this.removeFromDocument = function() {
    $drag_box.remove();
  };

  this.toggleVisibility = function() {
    $drag_box.fadeToggle(400, "linear");
  };

  this.init = function(template) {
    this.element = template;
    this.addToDocument();

    // give the window access to qa_helper's functions
    window.qa_helper = qa_helper;

    // make the element draggable
    $drag_box.draggable();
  }

  // template for the elements to load to the page
  this.element = '<div class="footer-bar-box" id="draggable">'                   +
                      '<div id="grabbable" class="group"><span></span><button id="hide-qa-helper">X</button></div>'                      +
                      '<div id="footer-bar">'                                    +
                          '<div id="btn-get-course-info" class="footer-button">' +
                              '<p>Course Info.</p>'                              +
                          '</div>'                                               +
                          '<div id="btn-add-bug"class="footer-button">'          +
                              '<p>Add Bug</p>'                                   +
                          '</div>'                                               +
                          '<div class="footer-button">'                          +
                              '<p>Navigate</p>'                                  +
                          '</div>'                                               +
                      '</div>'                                                   +
                  '</div>';

  return this;
}
