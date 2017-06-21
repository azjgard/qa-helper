javascript:(function(){if(!qa_helper){var qa_helper={};(function(){function isDefined(object){try{return typeof object!==\"string\"?typeof object!==\"undefined\":typeof eval(object)!==\"undefined\"}catch(e){return false}}function selectAll(query){return document.querySelectorAll(query)}var isSlidePage=isDefined(\"loadNextSlide\");var isTfsPageQuery='a[title=\"Team Foundation Server 2015\"]';var isTfsPage=selectAll(isTfsPageQuery).length>0;var template;if(isSlidePage){template='<div class=\"footer-bar-box slide\" id=\"draggable\">'+'<div id=\"grabbable\" class=\"group\"><h2>UTI QA Helper</h2><button id=\"hide-qa-helper\">X</button></div>'+'<div id=\"footer-bar\">'+'<div class=\"footer-button\" id=\"qa-prev-slide\">'+\"<p>Previous Slide</p>\"+\"<small>hotkey: , (comma)</small>\"+\"</div>\"+'<div class=\"footer-button\" id=\"qa-add-bug\">'+\"<p>Add Bug</p>\"+\"<small>hotkey: Ctrl+Shift+s</small>\"+\"</div>\"+'<div class=\"footer-button\" id=\"qa-next-slide\">'+\"<p>Next Slide</p>\"+\"<small>hotkey: . (period)</small>\"+\"</div>\"+\"</div>\"+\"</div>\"}else if(isTfsPage){template='<div class=\"footer-bar-box\" id=\"draggable\">'+'<div id=\"grabbable\" class=\"group\"><h2>UTI QA Helper</h2><button id=\"hide-qa-helper\">X</button></div>'+'<div id=\"footer-bar\">'+\"<span>Make sure to open the Course and User Story folders of your web!</span>\"+\"</div>\"+\"</div>\"}setTimeout(function(){if(!(isSlidePage||isTfsPage)){qa_helper.navigateToBlackboard();return}qa_helper.view.init(template);if(isSlidePage){qa_helper.openTfsWindow()}if(isTfsPage){qa_helper.addTfsEvents()}$(\"#btn-get-course-info\").on(\"click\",qa_helper.getCurrentSlide);$(\"#btn-add-bug\").on(\"click\",qa_helper.addBug);$(\"#hide-qa-helper\").on(\"click\",qa_helper.view.toggleVisibility);$(\"#qa-prev-slide\").on(\"click\",qa_helper.navigate.prev_slide);$(\"#qa-next-slide\").on(\"click\",qa_helper.navigate.next_slide);$(\"#qa-open-tfs\").on(\"click\",qa_helper.openTfsWindow);$(\"#qa-add-bug\").on(\"click\",sendMessageAddBug);function sendMessageAddBug(){var slideInfo=qa_helper.getCurrentSlide();window.sendTFSMessage(\"addBug\",slideInfo)}var hotkey_addBug=65;var hotkey_nextSlide=190;var hotkey_prevSlide=188;var hotkey_getCurrentSlide=83;var ctrlPressed=false,shiftPressed=false,listening=false;$(window).keydown(handleKeydown);$(window).keyup(handleKeyUp);function handleKeydown(ev){if(ev.which===17){ctrlPressed=true}else if(ev.which===16){shiftPressed=true}if(ctrlPressed&&shiftPressed){if(ev.which===hotkey_addBug){sendMessageAddBug()}else if(ev.which===hotkey_getCurrentSlide){qa_helper.getCurrentSlide()}}if(ev.which===hotkey_nextSlide){qa_helper.navigate.next_slide()}if(ev.which===hotkey_prevSlide){qa_helper.navigate.prev_slide()}}function handleKeyUp(ev){if(ev.which===17){ctrlPressed=false}else if(ev.which===16){shiftPressed=false}}},500)})()}else{$(\"#hide-qa-helper\").click()}(function(){var css=\"#footer-bar{display:flex;justify-content:space-around}#grabbable{height:32px;line-height:32px;text-align:center;cursor:move;padding:0;background-color:#008bd3}#grabbable h2{display:inline;font-family:Helvetica;color:#fff;padding:10px}#draggable{z-index:9999}#hide-qa-helper{display:block;float:right;height:100%;color:#008bd3;-webkit-transition:all 1s;-moz-transition:all 1s;transition:all 1s}#hide-qa-helper:hover{background-color:#FFF;color:#008bd3}.footer-bar-box{position:absolute}.footer-bar-box.slide{left:330px;top:625px}.footer-bar-box:not(.slide){left:23px;top:300px}.footer-button{border:1px solid #008bd3;padding:10px !important;text-align:center;cursor:pointer;padding:10px;background-color:#FFF;flex-grow:1}.footer-button small{color:#aaa;font-size:10px;display:block}.footer-button p{display:inline-block;border-bottom:1px solid transparent;margin:0;padding:0;-webkit-transition:all .4s;-moz-transition:all .4s;transition:all .4s}.footer-button:hover p{border-bottom:1px solid #008bd3}#footer-bar{clear:both}\";var style=document.createElement(\"style\");style.innerHTML=css;document.head.appendChild(style)})();qa_helper.view=new function(){var $drag_box;this.addToDocument=function(){$(\"body\").append(this.element);$drag_box=$(\"#draggable\");$drag_box.hide().fadeIn(400,\"linear\")};this.removeFromDocument=function(){$drag_box.remove()};this.toggleVisibility=function(){$drag_box.fadeToggle(400,\"linear\")};this.init=function(template){this.element=template;this.addToDocument();window.qa_helper=qa_helper;$drag_box.draggable({handle:\"#grabbable\"})};this.element='<div class=\"footer-bar-box\" id=\"draggable\">'+'<div id=\"grabbable\" class=\"group\"><span></span><button id=\"hide-qa-helper\">X</button></div>'+'<div id=\"footer-bar\">'+'<div id=\"btn-get-course-info\" class=\"footer-button\">'+\"<p>Course Info.</p>\"+\"</div>\"+'<div id=\"btn-add-bug\"class=\"footer-button\">'+\"<p>Add Bug</p>\"+\"</div>\"+'<div class=\"footer-button\">'+\"<p>Navigate</p>\"+\"</div>\"+\"</div>\"+\"</div>\";return this};qa_helper.addBug=new function(){function promptCourseInformation(){var courseInfo=prompt(\"Hit Ctrl+V to paste course information here.\");if(courseInfo){courseInfo=parseCourseInformation(courseInfo)}return courseInfo}function parseCourseInformation(text){var courseInfo={slideInfo:\"\",sectionTitle:\"\"};var splitText=text.split(\"---\");courseInfo.slideInfo=splitText[0].trim();courseInfo.sectionTitle=splitText[1].trim();return courseInfo}function parseComponents(slideID){var components={webNumber:\"\",courseName:\"\",courseNumber:\"\",programCode:\"\",programVersion:\"\"};var splitString=\"\";components.programCode=slideID.match(/^\\w{2}/i);splitString+=components.programCode;components.programVersion=slideID.split(splitString)[1].match(/^\\d{2}/i);splitString+=components.programVersion+\"-\";components.courseNumber=slideID.split(splitString)[1].match(/^\\d{3}/i);splitString+=components.courseNumber+\"-Web\";components.webNumber=slideID.split(splitString)[1].match(/^\\d{2,}/i);components=verifyComponents(components);return components}function verifyComponents(components){var return_value=components;for(var i=0;i<components.length;i++){if(!components[i]){return_value=null}}return return_value}function addTag(tag){setTimeout(function(){var $input=\"\";var $addButton=$(\".tag-box.tag-box-selectable\");var pressEnterKey=$.Event(\"keydown\",{keyCode:13});$addButton.click();$input=$(\".tags-input.tag-box.ui-autocomplete-input\");$input.val(tag);$input.trigger(pressEnterKey)},1500)}function addTitle(title){setTimeout(function(){var $titleInput=$('.dialog input[aria-label=\"Title\"]');$titleInput.val(title+\" - \");$titleInput.focus()},1500)}function stdize(str){return str.replace(/,/g,\"\")}var addBug=function(parsedSlideInfo){var courseInfo=parseCourseInformation(parsedSlideInfo);if(courseInfo){var tagOne,tagTwo;var slideID=courseInfo.slideInfo;var sectionTitle=courseInfo.sectionTitle;var components=parseComponents(slideID)}if(!components){alert(\"That data was invalid!\")}else{tagOne=components.programCode+components.programVersion+\"-\"+components.courseNumber;tagTwo=\"Web\"+components.webNumber+\"-\"+sectionTitle;var $content_qas=$('div[title=\"Content QA\"]');var $correct_content_qa;$.each($content_qas,function(index,$current){var $siblings=$($current).siblings();var $tagParent=$($siblings).filter(function(index){return $(this).children(\".tfs-tags\").length>0});var $tagInnerParent=$tagParent.find(\".tags-items-container > ul\");var $tagInnerChildren=$($tagInnerParent).children(\".tag-item\");var tags=[];$.each($tagInnerChildren,function(index,$currentTag){var tag=$($currentTag).attr(\"title\").trim();if(tag.match(/;\\sweb/i)){var tagsPlural=tag.split(/;\\sweb/i);for(var i=0;i<tagsPlural.length;i++){if(i>0&&tagsPlural[i].match(/^\\d{2,}-/)){tagsPlural[i]=\"Web\"+tagsPlural[i]}tags.push(tagsPlural[i])}}else{tags.push(tag)}});var courseTags=[],webTags=[];var pat1=/^\\w{2}\\d{2}-\\d{2,}$/;var pat2=/^web\\d{1,2}/i;$.each(tags,function(index,tag){if(tag.match(pat1)){courseTags.push(tag)}else if(tag.match(pat2)){webTags.push(tag)}});var courseTagMatch=false,webTagMatch=false;var standardized_tagOne=stdize(tagOne);var standardized_tagTwo=stdize(tagTwo);for(var i=0;i<courseTags.length;i++){var standardized_courseTag=stdize(courseTags[i]);if(standardized_courseTag===standardized_tagOne){courseTagMatch=true}}var slideWebNumber=standardized_tagTwo.match(/web\\d{1,}/i)[0];slideWebNumber=slideWebNumber.match(/\\d{1,}/)[0];for(var i=0;i<webTags.length;i++){var tfsWebNumber=webTags[i].match(/web\\d{1,}/i)[0];tfsWebNumber=tfsWebNumber.match(/\\d{1,}/)[0];if(slideWebNumber===tfsWebNumber){webTagMatch=true;tagTwo=webTags[i]}}if(courseTagMatch&&webTagMatch){$correct_content_qa=$current}});if(typeof $correct_content_qa===\"undefined\"){alert(\"Something went wrong. Are the Course and User Stories open?\")}else{$($correct_content_qa).siblings().children(\".action\").click();setTimeout(cb,200);function cb(){$(\".sub-menu\").find('li[title=\"Bug\"]').click();setTimeout(function(){addTag(stdize(tagOne));addTag(stdize(tagTwo));addTitle(slideID)},200)}}}};return addBug};qa_helper.getCurrentSlide=new function(){var getID=function(){var $btn_support=$(\"#btn-support\");$btn_support.click();$btn_support.click();var full_reference_id=$(\"div#lightboxBody>p:nth-of-type(2)\").text().slice(0,-1);var scoName=$(\"#scoName\").text();return full_reference_id+\" --- \"+scoName};return getID};qa_helper.loginToBlackboard=new function(){function getField(name){var input,question;question=\"There is presently no QA \"+name+\" on record.\"+\" What is your blackboard \"+name+\"?\";while(!input){input=prompt(question)}return input}function setLocalFields(username,password){localStorage.setItem(\"blackboardUsername\",username);localStorage.setItem(\"blackboardPassword\",password)}function submitLoginForm(user,password){document.getElementById(\"user_id\").value=user;document.getElementById(\"password\").value=password;document.getElementById(\"entry-login\").click()}function main(){var user,password;user=localStorage.getItem(\"blackboardUsername\");password=localStorage.getItem(\"blackboardPassword\");if(!user){user=getField(\"username\")}if(!password){password=getField(\"password\")}if(user&&password){setLocalFields(user,password);submitLoginForm(user,password)}}return main};qa_helper.navigateToBlackboard=new function(){function loadPage(address){window.location.href=address}function main(){var local=window.location.href;var utiBase=\"uti.blackboard.com\";var loginBase=utiBase+\"/webapps/login\";var portalBase=utiBase+\"/webapps/portal/execute\";var loginPage=\"https://uti.blackboard.com/webapps/login?action=relogin\";var coursesPage=\"https://uti.blackboard.com/webapps/blackboard/content/listContent\"+\".jsp?course_id=_3607_1&content_id=_164396_1&mode=reset\";if(!local.includes(utiBase)){loadPage(loginPage)}else if(local.includes(loginBase)){qa_helper.loginToBlackboard()}else if(local.includes(portalBase)){loadPage(coursesPage)}}return main};qa_helper.navigate=new function(){this.select_slide=function(){var slide_reference=prompt(\"Please enter the 3 number sequence of the slide you want to go to (last three numbers)\",\"1-01-1\");if(slide_reference){loadSlideByReferenceId(slide_reference)}};this.next_slide=function(){loadNextSlide()};this.prev_slide=function(){loadPrevSlide()};return this};qa_helper.openTfsWindow=new function(){function main(){var tfsURL=\"https://prdtfs.uticorp.com/UTI-ALM/IT/BMS/_backlogs?level=Projects&showParents=false&_a=backlog\";var win=window.open(tfsURL);window.sendTFSMessage=function(trigger,info){win.postMessage({trigger:trigger,info:info},tfsURL)};$(window).on(\"beforeunload\",function(){win.close()})}return main};qa_helper.addTfsEvents=new function(){function main(){window.addEventListener(\"message\",function(event){var origin=String(event.origin);if(origin===\"https://uti.blackboard.com\"){var data=event.data;if(data.trigger&&data.info){switch(data.trigger){case\"addBug\":qa_helper.addBug(data.info);break}}else if(data.trigger){throw new Error(\"Message is lacking .info property!\")}else if(data.info){throw new Error(\"Message is lacking .trigger property!\")}}})}return main};})()
