//GA Timezone options
let timeZones = {
  'Pacific Time': ['en-US', 'America/Los_Angeles'],
  'Eastern Time': ['en-US', 'America/New_York'],
  'Central Time': ['en-US', 'America/Chicago'],
  'Mountain Standard Time': ['en-US', 'America/Phoenix'],
  'Mountain Daylight Time': ['en-US', 'America/Denver'],
  'British Time': ['en-US', 'UTC'],
  'Central European': ['en-US', 'Europe/Paris'],
  'Singapore Standard Time': ['en-US', 'Asia/Singapore'],
  'Australian Eastern Time': ['en-US', 'Australia/Melbourne']
};

//Set default laptop time
let timeInput = document.getElementById('time-input');
let date = new Date();
let currentDate = date.toISOString().slice(0, 10);
let hours = date.getHours();
if (hours < 10) {
  hours = '0' + hours;
};

let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = '0' + minutes;
}

let currentTime = hours + ':' + minutes;

// document.getElementById('currentDate').value = currentDate;
document.getElementById('time-input').value = currentTime;

function fromLocalDateToUtcDate(date, ianatz) {
  // suppose the date is 12:00 UTC
  var invdate = new Date(date.toLocaleString('en-US', {
    timeZone: ianatz
  }));

  // then invdate will be 07:00 in Toronto
  // and the diff is 5 hours
  var diff = date.getTime() - invdate.getTime();

  // so 12:00 in Toronto is 17:00 UTC
  return new Date(date.getTime() + diff);
};


function handleSubmit() {
  //Get value FROM zome
  let optionFromValue = document.getElementById('fromTimezones').value;
  let localeFrom = timeZones[optionFromValue][0];
  let timeZomeFrom = timeZones[optionFromValue][1];

  //Convert value if it was in UTC
  let asIfutcTime = document.getElementById('time-input').valueAsDate;
  //Get right date
  let today = new Date();

  //Get full UTC time
  let utcTime = fromLocalDateToUtcDate(new Date(today.getUTCFullYear(),
                                today.getUTCMonth(),
                                today.getUTCDate(),
                                asIfutcTime.getUTCHours(),
                                asIfutcTime.getUTCMinutes(), 
  ), timeZomeFrom);

  //Get FROM time from UTC as a string
  let fromTimeStr = utcTime.toLocaleTimeString(localeFrom, { timeZone: timeZomeFrom });
  
  //Get value TO zone
  let optionToValue = document.getElementById('toTimezones').value;
  let localeTo = timeZones[optionToValue][0];
  let timeZomeTo = timeZones[optionToValue][1];
  //Get TO time from UTC as string
  let toTimeStr = utcTime.toLocaleTimeString(localeTo, { timeZone: timeZomeTo })

  //Set FROM and TO to HTML page
  let fromEl = document.getElementById('from');
  fromEl.textContent = fromTimeStr;
  let toEl = document.getElementById('to');
  toEl.textContent = toTimeStr;

  //Set lables with time zones
  document.getElementById('from-label').textContent = optionFromValue;
  document.getElementById('to-label').textContent = optionToValue;
}

let submitBtn = document.getElementById('submit');
submitBtn.addEventListener('click', handleSubmit);

//Add evenListener on 'Enter'
timeInput.addEventListener('keypress', function (e) {
  if (e.key === 'Enter') {
    handleSubmit();
  }
});