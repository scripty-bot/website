let c = 0;
function addDots() {
  c++;
  if (c > 3) {
    c = 0;
  }
  document.getElementById('loading_dots').innerHTML = '.'.repeat(c);
}
const dotsId = setInterval(addDots, 500);

function calculateShardId(guildId, shardCount) {
  // the shard ID of a guild is (ID >> 22) % shardCount
  return (guildId >> 22) % shardCount;
}

let shardCountGlobal;

function shardIdButtonClick() {
  // get the guild id from the input field
  const guildId = document.getElementById('guild_id').value;
  // try parsing the guild id as a number, if it fails, show an error and return
  let guildIdNumber;
  try {
    guildIdNumber = parseInt(guildId);
    if (isNaN(guildIdNumber)) {
      throw new Error(null);
    }
  } catch (e) {
    document.getElementById('shard_id_result').innerHTML = 'Invalid guild id';
    return;
  }
  // calculate the shard id
  const shardId = calculateShardId(guildIdNumber, shardCountGlobal);
  // show the shard id
  document.getElementById('shard_id_result').innerHTML = `Guild ${guildIdNumber} is on shard ${shardId}`;
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
      // the bot's offline
      document.getElementById('offline').style.display = null;
    } else {
      // show the error in the on_error div, and hide the loading dots
      document.getElementById('error_message').innerHTML = error;
      document.getElementById('on_error').style.display = null;
    }
    // stop the loading dots
    clearInterval(dotsId);
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
  document.getElementById('shard_count').innerHTML = shardCount;
  document.getElementById('guild_count').innerHTML = guildCount;
  document.getElementById('user_count').innerHTML = userCount;
  document.getElementById('channel_count').innerHTML = channelCount;

  // for every shard, construct a table row with the shard info
  for (let i = 0; i < shardCount; i++) {
    // get shard id
    const shardId = i;
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
    };
    // format shard latency as milliseconds with three decimal places
    const shardLatencyString = `${(shardLatency / 1000000).toFixed(3)}ms`;

    // construct table row
    const row = document.createElement('tr');
    const shardIdCell = document.createElement('td');
    const latencyCell = document.createElement('td');
    const connectionStatusCell = document.createElement('td');
    const guildCountCell = document.createElement('td');
    shardIdCell.innerText = shardId;
    latencyCell.innerText = shardLatencyString;
    connectionStatusCell.innerText = connectionStatusString;
    guildCountCell.innerText = shardGuildCount;
    row.appendChild(shardIdCell);
    row.appendChild(latencyCell);
    row.appendChild(connectionStatusCell);
    row.appendChild(guildCountCell);
    document.getElementById('shard_info').appendChild(row);
  }

  // hide the loading dots
  document.getElementById('loading').style.display = 'none';
  // show the status info
  document.getElementById('content').style.display = null;
  // stop the dots animation
  clearInterval(dotsId);
};
x();
