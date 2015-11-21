var settings;
chrome.storage.sync.get({
  allowed_external_urls: ''
}, function(items) {
  settings = items;
  settings.allowed_external_urls = settings.allowed_external_urls.split(/[\s,;]+/);
  console.log(settings);
});

function removeAllExternalLinks(allowed_external_urls) {
  allowed_external_urls = typeof allowed_external_urls !== 'undefined' ? allowed_external_urls : [];

  $('a').filter(function() {
     return this.hostname &&
            this.hostname !== location.hostname &&
            allowed_external_urls.indexOf(this.hostname) == -1;
  }).addClass("findTheRightOneExternal");
  count = $('.findTheRightOneExternal').length;
  $('.findTheRightOneExternal').remove();
  return count;
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    if( request.message === "didClickFindTheRightOneButton" ) {
      count = removeAllExternalLinks(settings.allowed_external_urls);
      console.log(count + " externals links removed");
    }
  }
);

// $.expr[':'].external = function(obj) {
//     return !obj.href.match(/^mailto\:/) && (obj.hostname != location.hostname);
// };
// $('a:external').addClass('external');

// $('a:not([href^="http://your-website.com"]):not([href^="#"]):not([href^="/"])').addClass('external');