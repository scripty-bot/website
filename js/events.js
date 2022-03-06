// If sa_event is not loaded, load a dummy event handler that will handle events until it actually gets loaded
window.sa_event = window.sa_event || function() {
  var a = [].slice.call(arguments);
  window.sa_event.q ? window.sa_event.q.push(a) : window.sa_event.q=[a]
};

const dntActive = parseInt(navigator.msDoNotTrack || window.doNotTrack || navigator.doNotTrack, 10) === 1;

function onInviteClicked() {
  if (window.sa_event_loaded && !dntActive) {
    sa_event("invite_clicked");
  }
}

function onDiscordClicked() {
  if (window.sa_event_loaded && !dntActive) {
    sa_event("discord_clicked");
  }
}

function onSponsorClicked(tier) {
  if (window.sa_event_loaded && !dntActive) {
    sa_event("sponsor_tier_clicked_" + tier);
  }
}
