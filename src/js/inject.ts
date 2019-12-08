chrome.storage.local.get(['enabled', 'token'], (conf) => {
  const token = conf.token || '57e92be7-7894-4117-a103-0e12cb6d0bf9'
  const enabled = conf.enabled || true

  const script = `
  console.log('injected');
  window._repro_injector_state = {state: 'inactive'};
  var notice = function (state) {
    if (state) {
      window._repro_injector_state['state'] = state;
    }
    window._repro_injector_state['uid'] = localStorage.getItem('rpr_uid');
    document.dispatchEvent(new CustomEvent('reproInjectionStete', _repro_injector_state));
  }
  document.addEventListener('reproInjectionSteteRequest', notice);
  if (window['reproio'] && ${enabled}) {
    notice('already');
  } else if (!window['reproio'] && ${enabled}) {
    var s = document.createElement('SCRIPT');
    s.type = 'text/javascript';
    s.async = !0;
    s.onload = function() {
      console.log('loaded');
      reproio('setSnippetVersion', '2.0');
      reproio._rpr.tracker._subscribe({}, console.log);
      reproio('setup', '${token.replace(/[^a-z0-9-]+/g, '')}', {log_level: 'info'});
      notice('injected');
    };
    s.src = "https://cdn.reproio.com/web/v2/repro-sdk.min.js";
    (document.head || document.documentElement).appendChild(s);
  }
  `
  const se = document.createElement('SCRIPT') as HTMLScriptElement
  se.textContent = script;
  (document.head || document.documentElement).appendChild(se)
  se.remove()
})
