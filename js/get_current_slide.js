(function()  { 

	$("#btn-support").click(); 
	$("#btn-support").click();
	var full_reference_id = $("div#lightboxBody>p:nth-of-type(2)").text().slice(0, -1);
	var scoName = $('#scoName').text();
	prompt("Press Ctrl+C to copy to clipboard", full_reference_id + " --- " + scoName); 

})()