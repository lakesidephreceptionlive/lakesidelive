/**
 * Lakeside Arrivals feed  (Google Apps Script web app)
 *
 * Reads the Google Calendar named "Lakeside Arrivals" and returns
 *   { "names": ["Bella","Max"] }
 * for pets whose appointment is due now: from 15 minutes BEFORE the
 * start to 30 minutes AFTER it. Only the first word of the event title
 * is returned. No owner names, reasons, or times ever leave this script.
 */
var CALENDAR_NAME = "Lakeside Arrivals";
var BEFORE_MIN = 15;
var AFTER_MIN = 30;
var MAX_NAMES = 8;

/** Pure function (unit-testable): events = [{title, start(Date), end(Date)}] */
function selectNames(events, now, beforeMin, afterMin, maxNames) {
  var lo = now.getTime() - afterMin * 60000;   // started up to 30 min ago
  var hi = now.getTime() + beforeMin * 60000;  // starts within 15 min
  var seen = {}, out = [];
  events.sort(function (a, b) { return a.start - b.start; });
  for (var i = 0; i < events.length; i++) {
    var e = events[i], t = e.start.getTime();
    if (t < lo || t > hi) continue;
    var first = String(e.title || "").trim().split(/\s+/)[0] || "";
    first = first.replace(/[^A-Za-z'’\-]/g, "").slice(0, 20);
    if (!first || seen[first.toLowerCase()]) continue;
    seen[first.toLowerCase()] = true;
    out.push(first);
    if (out.length >= maxNames) break;
  }
  return out;
}

function doGet() {
  var names = [];
  try {
    var cals = CalendarApp.getCalendarsByName(CALENDAR_NAME);
    if (cals.length) {
      var now = new Date();
      var from = new Date(now.getTime() - AFTER_MIN * 60000);
      var to = new Date(now.getTime() + BEFORE_MIN * 60000);
      var evs = cals[0].getEvents(from, to).map(function (ev) {
        return { title: ev.getTitle(), start: ev.getStartTime(), end: ev.getEndTime() };
      });
      names = selectNames(evs, now, BEFORE_MIN, AFTER_MIN, MAX_NAMES);
    }
  } catch (err) { names = []; }
  return ContentService.createTextOutput(JSON.stringify({ names: names }))
    .setMimeType(ContentService.MimeType.JSON);
}
