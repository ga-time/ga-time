let timeOfTheDay = 'AM';
let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', handleSubmit);
let easternEl = document.getElementById('eastern');
let pacificEl = document.getElementById('pacific');

function handleSubmit() {
  let asIfutcTime = document.getElementById('time-input').valueAsDate;
  let pacificTime = new Date(asIfutcTime.getUTCFullYear(),
                            asIfutcTime.getUTCMonth(),
                            asIfutcTime.getUTCDate(),
                            asIfutcTime.getUTCHours(),
                            asIfutcTime.getUTCMinutes()
  );

  let pacificTimeStr = pacificTime.toLocaleTimeString('en-US', { timeZone: 'America/Los_Angeles' })
  let easternTimeStr = pacificTime.toLocaleTimeString('en-US', { timeZone: 'America/New_York' })
  easternEl.textContent = easternTimeStr;
  pacificEl.textContent = pacificTimeStr;

}

// function updateTime() {
  // setInterval(() => {
  //   let easternTime = moment.tz("US/Eastern");
  //   let pacificTime = easternTime.clone().tz("US/Pacific");
  //   easternEl.textContent = easternTime.format('hh:mm A');
  //   pacificEl.textContent = pacificTime.format('hh:mm A');
  // }, 1000)
// }

// updateTime();

