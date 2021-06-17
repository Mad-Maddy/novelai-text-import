/*--- waitForKeyElements():  A utility function, for Greasemonkey scripts,
    that detects and handles AJAXed content. Forked for use without JQuery.
    Usage example:
        waitForKeyElements (
            "div.comments"
            , commentCallbackFunction
        );
        //--- Page-specific function to do what we want when the node is found.
        function commentCallbackFunction (element) {
            element.text ("This comment changed by waitForKeyElements().");
        }
    IMPORTANT: Without JQuery, this fork does not look into the content of
    iframes.
*/
function waitForKeyElements(
  selectorTxt: string /* Required: The selector string that
                      specifies the desired element(s).
                  */,
  actionFunction: (
    element: HTMLElement
  ) => boolean /* Required: The code to run when elements are
                      found. It is passed a jNode to the matched
                      element.
                  */,
  waitOnce: boolean = true /* Optional: If false, will continue to scan for
                      new elements even after the first match is
                      found.
                  */,
  runOnce: boolean = true
) {
  var targetNodes, btargetsFound
  targetNodes = document.querySelectorAll(selectorTxt)

  if (targetNodes && targetNodes.length > 0) {
    btargetsFound = true
    /*--- Found target node(s).  Go through each and act if they
          are new.
      */
    for (let element of targetNodes) {
      var alreadyFound =
        element.dataset.found == 'alreadyFound' ? 'alreadyFound' : false

      if (!alreadyFound) {
        //--- Call the payload function.
        var cancelFound = actionFunction(element)
        if (runOnce) {
          break
        }
        if (cancelFound) btargetsFound = false
        else element.dataset.found = 'alreadyFound'
      }
    }
  } else {
    btargetsFound = false
  }

  //--- Get the timer-control variable for this selector.
  // @ts-ignore
  var controlObj = waitForKeyElements.controlObj || {}
  var controlKey = selectorTxt.replace(/[^\w]/g, '_')
  var timeControl = controlObj[controlKey]

  //--- Now set or clear the timer as appropriate.
  if (btargetsFound && waitOnce && timeControl) {
    //--- The only condition where we need to clear the timer.
    clearInterval(timeControl)
    delete controlObj[controlKey]
  } else {
    //--- Set a timer, if needed.
    if (!timeControl) {
      timeControl = setInterval(function () {
        waitForKeyElements(selectorTxt, actionFunction, waitOnce, runOnce)
      }, 300)
      controlObj[controlKey] = timeControl
    }
  }
  // @ts-ignore
  waitForKeyElements.controlObj = controlObj
}

export { waitForKeyElements }
