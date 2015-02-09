define(function() {
  var o = {};
  function sendrequest(a, ar) {
    var sd = {};
    var cb = ar.shift();
    sd.api = a;
    sd.args = ar;
    $.ajax({
      url : "/callapi",
      type : "post",
      contentType : "application/json;charset=utf-8",
      dataType : "json",
      data : JSON.stringify(sd),
      success : function(r) {
        setTimeout(cb.apply(null, r), 0);
      },
      error : function(e) {
        throw e;
      }
    });
  };
  o.getAppList = function() {
    sendrequest("app.getAppList", Array.prototype.slice.call(arguments));
  };
  o.startAppByName = function startAppByName(startAppByNameCb, sAppName, sParams) {
    console.log("Request handler 'startAppByName' was called. sAppName:" + sAppName + " oParamBag:" + sParams);
    try {
      var twin = window.Window.create(sAppName, sAppName, {
        left : 200,
        top : 200,
        height : 500,
        width : 660,
        fadeSpeed : 500,
        animate : true,
        contentDiv : false,
        iframe : true
      });
      twin.appendHtml("/callapp/" + sAppName + "/index.html" + (sParams === null ? "" : ("?" + sParams)));
      setTimeout(startAppByNameCb({
        name : sAppName,
        window : twin
      }), 0);
    } catch(e) {
      console.log("Error happened:" + e.message);
      setTimeout(startAppByNameCb(null), 0);
      return;
    }
  };
  o.startApp = function(startAppCB, appInfo, params) {
    var max = function(a, b) {
      if ( typeof a === 'undefined')
        return b;
      if ( typeof b === 'undefined')
        return a;
      return ((a > b) ? a : b);
    };
    var min = function(a, b) {
      if ( typeof a === 'undefined')
        return b;
      if ( typeof b === 'undefined')
        return a;
      return ((a > b) ? b : a);
    };
    var createWindow = function(appInfo_) {
      // create a window whose attributes based on app info
      var title = appInfo_.window.title || appInfo_.name, height = appInfo_.window.height || 500, width = appInfo_.window.width || 660, left = 200, top = 200, pos = appInfo_.window.position || 'center';
      height = max(height, appInfo_.window.min_height);
      height = min(height, appInfo_.window.max_height);
      width = max(width, appInfo_.window.min_width);
      width = min(width, appInfo_.window.max_width);
      if (pos == 'center') {
        var w = $(document).width(), h = $(document).height();
        left = max((w - width) * 0.5, 0);
        top = max((h - height) * 0.5, 0);
      }
      return window.Window.create(appInfo_.id + '-window', title, {
        left : left,
        top : top,
        height : height,
        width : width,
        fadeSpeed : 300,
        animate : true,
        contentDiv : false,
        iframe : true
      });
    }
    var cb_ = startAppCB ||
    function() {
    }, p_ = params || null;
    try {
      var win = createWindow(appInfo);
      // if this app is genarate from a URL, do something
      if (appInfo.url) {
        win.appendHtml(appInfo.main);
      } else {
        win.appendHtml("/callapp/" + appInfo.id + '/' + appInfo.main + '?id=' + appInfo.id + (p_ === null ? "" : ("&" + p_)));
      }
      cb_(null, win);
    } catch(e) {
      return cb_(e);
    }
  };
  o.sendKeyToApp = function() {
    sendrequest("app.sendKeyToApp", Array.prototype.slice.call(arguments));
  };
  o.registerApp = function() {
    sendrequest("app.registerApp", Array.prototype.slice.call(arguments));
  };
  o.unregisterApp = function() {
    sendrequest("app.unregisterApp", Array.prototype.slice.call(arguments));
  };
  o.getRegisteredApp = function() {
    sendrequest("app.getRegisteredApp", Array.prototype.slice.call(arguments));
  };
  o.getRegisteredAppInfo = function() {
    sendrequest("app.getRegisteredAppInfo", Array.prototype.slice.call(arguments));
  };
  o.getBasePath = function() {
    sendrequest("app.getBasePath", Array.prototype.slice.call(arguments));
  };
  o.addListener = function(addListenerCB, listener, ws) {
    var msg = {
      'Action' : 'on',
      'Event' : 'app'
    };
    ws.send(JSON.stringify(msg));
    addListenerCB(null);
  };
  o.removeListener = function(removeListenerCB, listener, ws) {
    var msg = {
      'Action' : 'off',
      'Event' : 'app'
    };
    ws.send(JSON.stringify(msg))
    removeListenerCB(null);
  };
  o.generateAppByURL = function() {
    sendrequest("app.generateAppByURL", Array.prototype.slice.call(arguments));
  };
  return o;
}); 
