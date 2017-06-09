// VIEW
//
// - handles all of the view logic for the app
//

qa_helper.view = new function() {

  var $drag_box;

  this.addToDocument = function() {
    $("body").append(this.element);
  };

  this.removeFromDocument = function() {
    $drag_box.remove(this.element);
  };

  this.toggleVisibility = function() {
    $drag_box.toggle();
  };

  this.init = function() {
    this.addToDocument();

    // give the window access to qa_helper's functions
    window.qa_helper = qa_helper;

    // make the element draggable
    $( "#draggable" ).draggable();
  }

  // template for the elements to load to the page
  this.element = '<div class="footer-bar-box" id="draggable">'                   +
                      '<div id="grabbable">Drag Icon</div>'                      +
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
