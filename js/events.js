// If sa_event is not loaded, load a dummy event handler that will handle events until it actually gets loaded
window.sa_event = window.sa_event || function() {
  var a = [].slice.call(arguments);
  window.sa_event.q ? window.sa_event.q.push(a) : window.sa_event.q=[a]
};

const dntActive = parseInt(navigator.msDoNotTrack || window.doNotTrack || navigator.doNotTrack, 10) === 1;

function onInviteClicked() {
  if (!dntActive) sa_event("invite_clicked");
};

const registerMaps = {
  "invite_btn": onInviteClicked,
};
for (let id in registerMaps) if ((elm = document.getElementById(id)) !== null) elm.addEventListener("click", registerMaps[id]);
