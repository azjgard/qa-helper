
$(function() {
             
    var qa_helper = {};

    qa_helper.view = function() {
        
        var drag_box = $("#draggable");

        this.isVisible;

        this.addToDocument = function(element) {
            $("body").append(this.element);
        };
     
        this.toggle_visibility = function() {
             drag_box.toggle();
        };

        this.removeFromDocument = function(object) {
            drag_box.remove();
        };

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
    window.qa_helper = qa_helper;
    qa_helper.view().addToDocument(qa_helper.view.element);
     
    $( "#draggable" ).draggable();
     
 });