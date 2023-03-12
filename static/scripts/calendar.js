 const calendar = document.querySelector(".calendar");
const date = document.querySelector(".date");
const daysContainer = document.querySelector(".days");
const next = document.querySelector(".next");
const prev = document.querySelector(".prev");
const todayButton = document.querySelector(".today-btn");
const gotoButton = document.querySelector(".go-to-btn");
const dateInput = document.querySelector(".date-input");
const addEventWrapper = document.querySelector(".add-event-wrapper ");
const eventDay = document.querySelector(".event-day");
const eventDate = document.querySelector(".event-date");
const eventsContainer = document.querySelector(".events");
const addEventSubmit = document.querySelector(".add-event-btn");
const addEventBtn = document.querySelector(".add-event");
const addEventContainer = document.querySelector(".add-event-wrapper");
const addEventCloseBtn = document.querySelector(".close");
const addEventTitle = document.querySelector(".event-name");
const addEventFrom = document.querySelector(".event-time-from");
const addEventTo = document.querySelector(".event-time-to");


let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decembar",
];

// const eventsArr = [
//     {
//         day: 25,
//         month: 01,
//         year: 2023,
//         events: [
//             {
//                 title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//                 time: "10:00 AM",
//             },
//             {
//                 title: "Event 2",
//                 time: "11:00 AM",
//             },
//         ],
//     },
//     {
//         day: 27,
//         month: 01,
//         year: 2023,
//         events: [
//             {
//                 title: "Event 1 lorem ipsun dolar sit genfa tersd dsad ",
//                 time: "10:00 AM",
//             },
//             {
//                 title: "Event 2",
//                 time: "11:00 AM",
//             },
//         ],
//     },
// ];

//It will automatically fill array by using js
let eventsArr=[];
getEvents();

//creating a function for adding days

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //update date top of calendar
    date.innerHTML = months[month] + " " + year;

    //adding days on dom
    let days = "";

    //prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date"> ${prevDays - x + 1}</div>`;
    }

    //current month days
    for (let i = 1; i <= lastDate; i++) {

        //checking if event is present on current day
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (
                eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year
            ) {
                event = true;
            }

        });

        //if day is today add class today
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {

            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            //if event found we add event class
            if (event) {
                days += `<div class="day today active event"> ${i}</div>`;
            }
            else {
                days += `<div class="day today active"> ${i}</div>`;
            }
        }
        //add remaining as it is
        else {
            // days += `<div class="day "> ${i}</div>`;
            if (event) {
                days += `<div class="day event"> ${i}</div>`;
            }
            else {
                days += `<div class="day "> ${i}</div>`;
            }
        }
    }

     //next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListener();

}
// initCalendar();

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}
//next month

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}
//eventlistener on prev and next
prev.addEventListener("click", prevMonth);
next.addEventListener("click", nextMonth);

initCalendar();

//go to date and go to today functionality
todayButton.addEventListener("click", function () {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener("input", function (e) {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2) {
        dateInput.value += "/";
    }
    if (dateInput.value.length > 7) {
        //don't allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }
    //if we remove untill slash its not removing
    //if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
    
});

gotoButton.addEventListener("click", gotoDate)
//function to go to entered date
function gotoDate() {
    const dateArray = dateInput.value.split("/");
    if (dateArray.length === 2) {
        if (dateArray[0] > 0 && dateArray[0] < 13 && dateArray[1].length === 4) {
            month = dateArray[0] - 1;
            year = dateArray[1];
            initCalendar();
            return;
        }

    }
    //if invalid date
    alert("invalid date")
}



addEventBtn.addEventListener("click", function () {
    addEventContainer.classList.toggle("active");
});

addEventCloseBtn.addEventListener("click", function () {
    addEventContainer.classList.remove("active");
});
document.addEventListener("click", function (e) {
    if (e.target !== addEventBtn && !addEventContainer.contains(e.target)) {
        addEventWrapper.classList.remove("active");
    }
});

//alow only 80 characters to write
addEventTitle.addEventListener("input", function (e) {
    addEventTitle.value = addEventTitle.value.slice(0, 80);
});

//time format in form and to time
addEventFrom.addEventListener("input", function (e) {
    //accepting numbers between 0 to 9
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, "");
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ":";
    }
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
    //if we remove untill slash its not removing
    //if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (addEventFrom.value.length === 3) {
            addEventFrom.value = addEventFrom.value.slice(0, 2);
        }
    }
});
addEventTo.addEventListener("input", function (e) {
    //accepting numbers between 0 to 9
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, "");
    if (addEventTo.value.length === 2) {
        addEventTo.value += ":";
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
    //if we remove untill slash its not removing
    //if backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (addEventTo.value.length === 3) {
            addEventTo.value = addEventTo.value.slice(0, 2);
        }
    }
});


//function to add event listener
function addListener() {
    const days = document.querySelectorAll(".day");
    days.forEach((day) => {
        day.addEventListener("click", function (e) {
            activeDay = Number(e.target.innerHTML);

            //call sctive day after clicks
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));

            days.forEach((day) => {
                day.classList.remove("active");
            });
            //if clicked prev-date or next-date switch to that month
            if (e.target.classList.contains("prev-date")) {
                prevMonth();
                //add active to clicked day after month is change
                setTimeout(() => {
                    //add active where no prev-date or next-date
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("prev-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains("next-date")) {
                nextMonth();
                //add active to clicked day afte month is changed
                setTimeout(() => {
                    const days = document.querySelectorAll(".day");
                    days.forEach((day) => {
                        if (
                            !day.classList.contains("next-date") &&
                            day.innerHTML === e.target.innerHTML
                        ) {
                            day.classList.add("active");
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add("active");
            }
        });

    });
}

//showing active day events and create at top


function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(" ")[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + " " + months[month] + " " + year;
}

//function to show events of that day
function updateEvents(date) {
    let events = " ";
    eventsArr.forEach((event) => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach((event) => {
                events += `<div class="event">
                <div class="title">
                  <i class="fas fa-circle"></i>
                  <h3 class="event-title">${event.title}</h3>
                </div>
                <div class="event-time">
                  <span class="event-time">${event.time}</span>
                </div>
            </div>`;
            });
        }
    });
    //if nothing found
    if (events === " ") {
        events = `<div class="no-event">
                <h3>No Events</h3>
            </div>`;
    }
    // console.log(events);
    eventsContainer.innerHTML = events;
    //we called a function to save events
    saveEvents();
}

//function to add events
addEventSubmit.addEventListener("click", function () {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    if (eventTitle === "" || eventTimeFrom === "" || eventTimeTo === "") {
        alert("Please fill all the fields");
        return;
    }
    //checking timeformat for 24 hours
    const timeFromArr = eventTimeFrom.split(":");
    const timeToArr = eventTimeTo.split(":");

    if (
        timeFromArr.length !== 2 || timeToArr.length !== 2 || timeFromArr[0] > 23 || timeFromArr[1] > 59 || timeToArr[0] > 23 || timeToArr[1] > 59
    ) {
        alert("Invalid Time Format");
        return;
    }
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: timeFrom + " - " + timeTo,
    };

    let eventAdded = false;
    //checcking if events aray is not empty
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (
                item.day === activeDay && item.month === month + 1 && item.year === year
            ) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    //if events array is empty
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    //remove active from add event form
    addEventContainer.classList.remove("active")
    //clear the fields
    addEventTitle.value = "";
    addEventFrom.value = "";
    addEventTo.value = "";

    updateEvents(activeDay);

    //add eventclass to newly added days
    const activeDayElem = document.querySelector(".day.active");
    if (!activeDayElem.classList.contains("event")) {
        activeDayElem.classList.add("event");
    }
    //send notifications while submitting and clicking on event button
    if (!window.Notification) return;
    
    Notification
    .requestPermission()
    .then(showNotification)

});

function showNotification(Permissions){
    if (Permissions !== 'granted') return;
    let notification = new Notification('Events scheduled⏳',{
        body: "Great! Your event is scheduled successfully you can also set google reminder from clicking on this bar",
        icon: '/static/images/notification_icon.jpeg'
    })

    notification.onclick=()=>{
        window.open("https://calendar.google.com");
    }
}

function convertTime(time) {
    //convert time to 24 hour format
    let timeArr = time.split(":");
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = timeHour + ":" + timeMin + " " + timeFormat;
    return time;
}
//function to remove events when clicked
eventsContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("event")) {
        const eventTitle = e.target.children[0].children[1].innerHTML;
        eventsArr.forEach((event) => {
            if (
                event.day === activeDay &&
                event.month === month + 1 &&
                event.year === year
            ) {
                event.events.forEach((item, index) => {
                    if (item.title === eventTitle) {
                        event.events.splice(index, 1);
                    }
                });

                //if no event remaining on that day remove complete day
                if (event.events.length === 0) {
                    eventsArr.splice(eventsArr.indexOf(event), 1);
                    //remove event class from day
                    const activeDayEl = document.querySelector(".day.active");
                    if (activeDayEl.classList.contains("event")) {
                        activeDayEl.classList.remove("event");
                    }
                }
            }
        });
        updateEvents(activeDay);
    }
});


//storing events in local storage
function saveEvents() {
    localStorage.setItem("events", JSON.stringify(eventsArr));
}

function getEvents() {
    //check if events are already saved in local storage then return event else nothing
    if (localStorage.getItem("events") === null) {
      return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem("events")));
  }
