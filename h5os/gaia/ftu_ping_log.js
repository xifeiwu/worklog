const FTU_PING_URL = 'ftu.pingURL';	
	first, get value of key FTU_PING_URL from IndexedDB through function asyncStorage.getItem(), else, get key through navigator.mozTelephony.dial('*#06#', 0);
	work flow:
	ftu_ping.js
	initSettings.getDeviceID->
	shared/telemetry/telemetry.js
	TelemetryRequest.getDeviceID

const FTU_PING_ACTIVATION = 'ftu.pingActivation';
const FTU_PING_ENABLED = 'ftu.pingEnabled';
const FTU_PING_NETWORK_FAIL_COUNT = 'ftu.pingNetworkFailCount';
	work flow:
	ftu_ping.js
	initSettings.getAsyncItems->getAsyncStorageItems
	value of item[FTU_PING_NETWORK_FAIL_COUNT] will be add at function maybeThrowNetworkFailure

// Settings to observe value changes for while the ping has not been sent
const OBSERVE_SETTINGS = ['deviceinfo.os',
                        'deviceinfo.software',
                        'deviceinfo.product_model',
                        'deviceinfo.firmware_revision',
                        'deviceinfo.hardware',
                        'deviceinfo.last_updated',
                        'deviceinfo.platform_version',
                        'deviceinfo.platform_build_id',
                        'findmydevice.enabled'];
const URL_SETTINGS = ['deviceinfo.platform_build_id',
                    'deviceinfo.platform_version',
                    'app.update.channel'];
const FTU_PING_URL = 'ftu.pingURL';
const FTU_PING_TIMEOUT = 'ftu.pingTimeout';
const FTU_PING_TRY_INTERVAL = 'ftu.pingTryInterval';
  const DEFAULT_MAX_NETWORK_FAILS = 24;
  get value by key word through self.getSettings function. all key words in array OBSERVE_SETTINGS and URL_SETTINGS are bind to callback function onSettingChanged through self._settingObserver, and if the keyword changed its related _pingData value will be change in the callback function.
  workflow
  initSettings.getSettings->self.getSettings


self._pingData.screenHeight = window.screen.height;
self._pingData.screenWidth = window.screen.width;
self._pingData.devicePixelRatio = window.devicePixelRatio;
this._pingData.pingTime = Date.now();
this._pingData.locale = window.navigator.language;

this._pingData.preinstalled



