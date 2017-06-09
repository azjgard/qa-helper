(function()  { 

  var $btn_support = $("#btn-support");

  //click the question mark button on navigation menu to change the slideID
  //click again to close the popup modal
	$btn_support.click(); 
	$btn_support.click();

  //grab slide information
	var full_reference_id = $("div#lightboxBody>p:nth-of-type(2)").text().slice(0, -1);
	var scoName = $('#scoName').text();

  //have user copy slide info
	prompt("Press Ctrl+C to copy to clipboard", full_reference_id + " --- " + scoName); 

})()