function calculateShardId(guildId, shardCount) {
  // the shard ID of a guild is (ID >> 22) % shardCount
  return (guildId >> 22) % shardCount;
}

let shardCountGlobal;

function shardIdButtonClick() {
  // get the guild id from the input field
  const guildId = document.getElementById('guild_id').value;
  // try parsing the guild id as a number, if it fails, show an error and return
  let guildIdNumber = parseInt(guildId, 10);
  if (isNaN(guildIdNumber)) {
    document.getElementById('shard_id_result').innerText = 'Invalid guild id';
    return;
  }
  // calculate the shard id
  const shardId = calculateShardId(guildIdNumber, shardCountGlobal);
  // show the shard id
  document.getElementById('shard_id_result').innerText = `Guild ${guildIdNumber} is on shard ${shardId}`;
}
// register the click event listener for the shard id button
document.getElementById('calculate_shard_id').addEventListener('click', shardIdButtonClick);

async function x() {
  // fetch status from API (https://api.scripty.org/bot_stats/advanced)
  // return data: {"guild_count":92,"user_count":34,"channel_count":2382,"shard_count":1,"shard_info":{"0":{"latency":33225998,"connection_status":0,"guild_count":92}}}
  let json;
  try {
    const data = await fetch('https://api.scripty.org/bot_stats/advanced');
    json = await data.json();
  } catch (e) {
    document.getElementById('loading').style.display = 'none';

    // check if the error code is bad gateway (502)
    if (e.code === '502') {
      // the bot is offline
      document.getElementById('offline').style.display = null;
    } else {
      // show the error in the on_error div
      document.getElementById('error_message').innerText = e.toString();
      document.getElementById('on_error').style.display = null;
    }
    return;
  }
  // get shard count
  const shardCount = json.shard_count;
  shardCountGlobal = shardCount;
  // get guild count
  const guildCount = json.guild_count;
  // get user count
  const userCount = json.user_count;
  // get channel count
  const channelCount = json.voice_channel_count;
  // show this data in the status page
  document.getElementById('shard_count').innerText = shardCount.toLocaleString();
  document.getElementById('guild_count').innerText = guildCount.toLocaleString();
  document.getElementById('user_count').innerText = userCount.toLocaleString();
  document.getElementById('channel_count').innerText = channelCount.toLocaleString();

  const shardInfoDiv = document.getElementById('shard_info');

  // for every shard, construct a table row with the shard info
  // recreate the following HTML tree
  /*
          <div class="column is-5-mobile is-4-tablet-only is-3-desktop-only is-2-widescreen">
          <div class="notification is-status" id="shard_0">
            <h3>Shard 0</h3>
            <p class="heading"><i>online</i></p>
            <p class="heading">00.000ms</p>
            <p class="heading">69 servers</p>
          </div>
        </div>
  */
  // replace is-status with is-success if connected, is-danger if disconnected, and is-warning if otherwise
  for (let i = 0; i < shardCount; i++) {
    // get shard latency (in ns)
    const shardLatency = json.shard_info[i].latency;
    // get shard connection status
    const shardConnectionStatus = json.shard_info[i].connection_status;
    // get shard guild count
    const shardGuildCount = json.shard_info[i].guild_count;

    // map connection status to a string
    // 0 => Connected
    // 1 => Connecting
    // 2 => Disconnected
    // 3 => Handshake
    // 4 => Identifying
    // 5 => Resuming
    // 255 => Unknown
    let connectionStatusString;
    switch (shardConnectionStatus) {
      case 0:
        connectionStatusString = 'Connected';
        break;
      case 1:
        connectionStatusString = 'Connecting';
        break;
      case 2:
        connectionStatusString = 'Disconnected';
        break;
      case 3:
        connectionStatusString = 'Handshaking';
        break;
      case 4:
        connectionStatusString = 'Identifying';
        break;
      case 5:
        connectionStatusString = 'Resuming';
        break;
      default:
        connectionStatusString = 'Unknown';
        break;
    }

    // map connection status to class names
    // 0 => is-success
    // 2 => is-danger
    // 1 | <= 3 => is-warning
    let connectionStatusClass;
    switch (shardConnectionStatus) {
      case 0:
        connectionStatusClass = 'is-success';
        break;
      case 2:
        connectionStatusClass = 'is-danger';
        break;
      default:
        connectionStatusClass = 'is-warning';
        break;
    }

    // format shard latency as milliseconds with three decimal places
    const shardLatencyString = `${(shardLatency / 1000000).toFixed(3)}ms`;

    // construct div tree
    const div = document.createElement('div');
    div.className = 'column is-5-mobile is-4-tablet-only is-3-desktop-only is-2-widescreen';
    const notification = document.createElement('div');
    notification.className = `notification ${connectionStatusClass}`;
    notification.id = `shard_${i}`;
    const h3 = document.createElement('h3');
    h3.innerText = `Shard ${i}`;
    const p1 = document.createElement('p');
    p1.className = 'heading';
    const italic = document.createElement('i');
    italic.innerText = connectionStatusString;
    p1.appendChild(italic);
    const p2 = document.createElement('p');
    p2.className = 'heading';
    p2.innerText = shardLatencyString;
    const p3 = document.createElement('p');
    p3.className = 'heading';
    p3.innerText = `${shardGuildCount.toLocaleString()} servers`;

    // construct the actual div
    notification.appendChild(h3);
    notification.appendChild(p1);
    notification.appendChild(p2);
    notification.appendChild(p3);
    div.appendChild(notification);

    // append the div to the shard info div
    shardInfoDiv.appendChild(div);
  }

  // hide the loading part
  document.getElementById('loading').style.display = 'none';
  // show the status info
  document.getElementById('content').style.display = null;
}
x();
