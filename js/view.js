$(function() {
             
    var qa_helper = {};

    // returns view object
    qa_helper.view = function() {
        
        var $drag_box = $("#draggable");

        this.addToDocument = function() {
            $("body").append(this.element);
        };

        this.removeFromDocument = function() {
            $drag_box.remove(this.element);
        };

        this.toggle_visibility = function() {
             $drag_box.toggle();
        };

        //template for the elements to load to the page
        this.element = `<div class="footer-bar-box" id="draggable">

                            <div id="grabbable">Drag Icon</div>

                            <div id="footer-bar">

                                <div class="footer-button">
                                    <p>Course #</p>
                                </div>

                                <div class="footer-button">
                                    <p>Title & Tag</p>
                                </div>

                                <div class="footer-button">
                                    <p>Navigate</p>
                                </div>

                            </div>

                        </div>`;

        return this;
    }

    //give the window access to qa_helper's functions
    window.qa_helper = qa_helper;

    //add element to the page
    qa_helper.view().addToDocument();
     
    //make the element draggable
    $( "#draggable" ).draggable();
     
 });