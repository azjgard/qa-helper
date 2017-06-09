(function() {

	var navigate_slides = function(){

		this.select_slide = function(){
			
			var slide_reference = prompt("Please enter the 3 number sequence of the slide you want to go to (last three numbers)", "1-01-1"); 
			loadSlideByReferenceId(slide_reference); 

		};

		//takes you to the next slide
		this.next_slide = function(){
			loadNextSlide();
		};

		//takes you to the previous slide
		this.prev_slide = function(){
			loadPrevSlide();
		};
	}

})();
