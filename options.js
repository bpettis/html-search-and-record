// In-page cache of the user's options
const options = {};


// Initialize the form with the user's option settings
chrome.storage.sync.get('options', (data) => {
  Object.assign(options, data.options);
  
  if (typeof options.alerts == "undefined") {
  	options.alerts = True;
  }
  if (typeof options.color == "undefined") {
  	options.color = "red";
  }
  if (typeof options.mime == "undefined") {
  	options.mime = "video/mp4";
  }
  
  alertOptions.alerts.checked = Boolean(options.alerts);
  alertOptions.color.value = String(options.color);
  videoOptions.mime.value = String(options.mime);
});

// Immediately persist options changes
alertOptions.alerts.addEventListener('change', (event) => {
  options.alerts = event.target.checked;
  chrome.storage.sync.set({options});
});

alertOptions.color.addEventListener('change', (event) => {
  options.color = event.target.value;
  chrome.storage.sync.set({options});
});

videoOptions.mime.addEventListener('change', (event) => {
  options.mime = event.target.value;
  chrome.storage.sync.set({options});
});