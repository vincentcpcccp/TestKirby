var SECS_START = 30 * 60; // 30 minutes

var secs = 0;
var interval = null;

$(document).ready(function()
{
    $("#bookingForm").on("submit", processBooking);
    $("#temperature").on("input change", feedbackOnTemperature);
    $("#showAllBookings").on("click", showAllBookings);

    initTimer();
})

var feedbackOnTemperature = function(e)
{
    if (e !== null)
    {
        e.preventDefault();
    }

    $("#temperatureOutput").html($("#temperature").val() + "°C");
}

var processBooking = function(e)
{
    e.preventDefault();

    var arrivalDate = $("#arrivalDate").val();
    var departureDate = $("#departureDate").val();

    if (arrivalDate >= departureDate)
    {
        alert("Departure date must come before arrival date.");
        return;
    }

    var adults = $("#adults").val();
    var children = $("#children").val();
    var babyBed = $("#babybed").val();
    var breakfast = $("#breakfast").val();
    var roomType = $("#roomType").val();
    var temperature = $("#temperature").val();

    var booking = {
        arrivalDate: arrivalDate,
        departureDate: departureDate,
        adults: adults,
        children: children,
        babyBed: babyBed,
        breakfast: breakfast,
        roomType: roomType,
        temperature: temperature
    };

    storeBooking(booking);
}


var storeBooking = function(booking)
{
    var bookings = window.localStorage.getItem("bookings");

    if (bookings === null)
    {
        bookings = [];
    }
    else
    {
        bookings = JSON.parse(bookings);
    }

    bookings.push(booking);

    window.localStorage.setItem("bookings", JSON.stringify(bookings));

    alert("Thank you for your booking!");
}


var showAllBookings = function(e)
{
    e.preventDefault();

    stopTimer();

    var h = "<h2>All bookings</h2>";

    var bookings = window.localStorage.getItem("bookings");

    if (bookings === null)
    {
        h += "<p>No bookings found</p>";
    }
    else
    {
        h += "<ul>"
        bookings = JSON.parse(bookings);

        bookings.forEach(function(item, idx)
        {
            h += "<li>";
            h += "Arrival: " + item.arrivalDate + "<br />";
            h += "Departure: " + item.departureDate + "<br />";
            h += "Adults: " + item.adults + "<br />";
            h += "Children: " + item.children + "<br />";
            h += "Baby bed: " + item.babyBed + "<br />";
            h += "Breakfast: " + item.breakfast + "<br />";
            h += "Room type: " + item.roomType + "<br />";
            h += "Temperature: " + item.temperature + "°C<br />";
            h += "</li>";
        });

        h += "</ul>";
    }

    $("#menu").html("");
    $("#main").html(h);
}


var initTimer = function()
{
    secs = SECS_START;
    updateLabel();
    interval = window.setInterval(countDown, 1000);
}


var stopTimer = function()
{
    window.clearInterval(interval);
}

var resetForm = function()
{
    $("#bookingForm")[0].reset();
    feedbackOnTemperature(null);
}

var countDown = function()
{
    secs--;

    if (secs < 0)
    {
        stopTimer();

        alert("Timeout. Please make sure to complete your booking in time...");

        resetForm();
        initTimer();
    }

    updateLabel();
}


var updateLabel = function()
{
    var m = parseInt(secs / 60);
    var s = secs - m * 60;

    var t = m + " mins and " + s + " secs";

    $("#clock").html(t);
}