// Saves options to chrome.storage
function save_options() {
  var allowed_external_urls = document.getElementById('allowed_external_urls').value;
  chrome.storage.sync.set({
    allowed_external_urls: allowed_external_urls
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value color = 'red' and likesColor = true.
  chrome.storage.sync.get({
    allowed_external_urls: 'bit.ly'
  }, function(items) {
    console.log(items);
    document.getElementById('allowed_external_urls').value = items.allowed_external_urls;
  });
}

document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);