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
  
  optionsForm.alerts.checked = Boolean(options.alerts);
  optionsForm.color.value = String(options.color);
});

// Immediately persist options changes
optionsForm.alerts.addEventListener('change', (event) => {
  options.alerts = event.target.checked;
  chrome.storage.sync.set({options});
});

optionsForm.color.addEventListener('change', (event) => {
  options.color = event.target.value;
  chrome.storage.sync.set({options});
});