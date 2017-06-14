qa_helper.copyBugToIssue = new function() {

    //get currently highlighted row
    var $selectedRow = $(".grid-row-current");

    //split id into array and save the last index (row number)
    var bug_row_array = $selectedRow.attr("id").split("_");
    var bug_rowId = parseInt(bug_row_array[bug_row_array.length - 1]);

    //open bug
    $selectedRow.dblclick();
    //copy Repro steps
    setTimeout(function(){

      var parentDiv = $('a[rawtitle="Repro Steps"').parents("ul[role='tablist']").parent();
      var bodyClone = parentDiv.find(".richeditor-editarea").find("iframe").contents().find("body[contenteditable]").clone();

      //copy Tags
      var $tags = $('.tfs-tags');
      var $tag_names = $($tags[$tags.length - 1]).children(".tags-items-container").children().children(".tag-item");

      //copy Titles
      var $title = $('input[placeholder="<Enter title here>"]').attr('title');

      //close bug window
      $($('div>div button>span:contains("Close")')[0]).click();
      //find Content QA row
      var $contentQA_correct_row;
      var exit = 0;
      while(exit < 900) {
        bug_rowId -= 1;
        bug_row_array.pop();
        bug_row_array.push(bug_rowId.toString());
        var new_row = bug_row_array.join("_");
        var row_children = $("#"+new_row).children();

        for(var i = 0; i < row_children.length; i++) {
          if($(row_children[i]).attr("Title") === "Content QA") {
            $contentQA_correct_row = $("#"+new_row);
            exit = 900;
          }
        }
        exit++;
      }
      //click Content QA plus button to open "add bug" menu
      $($contentQA_correct_row.children()[0]).children().click();

      setTimeout(function(){
        //click "add issue" in the menu to add issue
        $('ul>li>ul>li>span.text:contains("Issue")').click();
      }, 500);
        


      setTimeout(function(){
        console.log(bodyClone);
        //add tags
        var $input        = '';
        var $addButton    = $('.tag-box.tag-box-selectable');
        var pressEnterKey = $.Event('keydown', { keyCode : 13 });

        $addButton.click();
        $input = $('.tags-input.tag-box.ui-autocomplete-input');

        for (var i = 0; i < $tag_names.length; i++) {
          $input.val($($tag_names[i]).attr("title"));
          $input.trigger(pressEnterKey);
        }

        //add titles
        var newTitle = $('input[placeholder="<Enter title here>"]');
        newTitle.val($title);                                                       //////// DOESN'T RECOGNIZE THE NEW TITLE, YOU HAVE TO MANUALLY ENTER SOMETHING


        //replace the blank Repro steps section with the copy of the bug
        var newParentDiv = $('a[rawtitle="Description"').parents("ul[role='tablist']").parent();
        newParentDiv.find(".richeditor-editarea").find("iframe").contents().find("body[contenteditable]").replaceWith(bodyClone);
      }, 2500);
    }, 2000);


}

    