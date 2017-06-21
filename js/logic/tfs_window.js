qa_helper.openTfsWindow = new function() {

  function main() {
    var tfsURL = "https://prdtfs.uticorp.com/UTI-ALM/IT/BMS/_backlogs?level=Projects&showParents=false&_a=backlog";
    var win    = window.open(tfsURL);

    window.sendTFSMessage = function(trigger, info) {
      win.postMessage({
        trigger : trigger,
        info    : info
      }, tfsURL);
    }

    // close the TFS window if the slide window is closed
    $(window).on("beforeunload", function() {
      win.close();
    });
  }

  return main;
}

// TODO: inside of TFS, add a listener for when the window is closed,
// and communicate when that happens back to the parent

qa_helper.addTfsEvents = new function() {
  
  function main() {
    // listen for messages from the blackboard window
    window.addEventListener('message', function(event) {
      var origin = String(event.origin);

      // verify the message identity
      if (origin === "https://uti.blackboard.com") {
        var data = event.data;

        // data will be structured like this:
        //  data {
        //    trigger : "addBug",
        //    info    : {}
        //    }
        //  }
        //
        //  - trigger is the name of the function to call
        //  - info is the object to pass to that function

        if (data.trigger && data.info) {
          switch(data.trigger) {
            case "addBug":
              qa_helper.addBug(data.info);
              break;
          }
        }

        // error handling
        else if (data.trigger) { throw new Error("Message is lacking .info property!")    }
        else if (data.info)    { throw new Error("Message is lacking .trigger property!") }
      }
    });
  }

  return main;
}


