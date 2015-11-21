chrome.browserAction.onClicked.addListener(function(tab) {
  // console.log('did tap button');
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "didClickFindTheRightOneButton"});
  });
});