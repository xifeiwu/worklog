var key = 'deviceinfo.last_updated';
var request = window.navigator.mozSettings.createLock().get(key);

for (var key in request.result) {
  console.log(key + ": " + request.result[key]);
}

request.onsuccess = function() {
  var lastUpdated = request.result[key];
  if (!lastUpdated) {    
    console.log("can not get deviceinfo.last_updated");
    return;
  }
  var f = new navigator.mozL10n.DateTimeFormat();
  var textContent =
    f.localeFormat(new Date(lastUpdated),
      navigator.mozL10n.get('shortDateTimeFormat'));
  console.log("textContent: " + textContent);
};
request.onerror = function() {
  console.log("Error");
}
