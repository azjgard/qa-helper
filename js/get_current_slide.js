(function()  { 

	$("#btn-support").click(); 
	$("#btn-support").click();
	var full_reference_id = $("div#lightboxBody>p:nth-of-type(2)").html().slice(0, -1)
	var scoName = $('#scoName').html();
	scoName = scoName.substr(0, scoName.indexOf("<!--"));
	prompt("Press Ctrl+C to copy to clipboard", full_reference_id + " --- " + scoName); 

})()