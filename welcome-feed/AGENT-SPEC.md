# NectarVet -> "Lakeside Arrivals" calendar agent (spec)

Run every 30 min during clinic hours (e.g. 7am-6pm), the same way your lab-results agent runs.

## Which appointments to include (allow-list by NectarVet appointment TYPE; anything else is skipped)
Include only these exact types:
- Exam-Wellness
- Exam-Sick/Injured
- Health Certificate
- Surgery  -> include ONLY if the start/drop-off time is before 10:00 AM

Color is a secondary check, not the rule: exams are usually blue or light blue, surgery red.
If the type is on the list but the color looks unexpected, still include it, but note it in the
run log so we can spot mislabeled appointments. If the type is NOT on the list, skip it even if
the color is blue or red.

Everything else is skipped, including Recheck, tech appointments, euthanasia, hospitalized
patients, dental, boarding, and any new or unrecognized type.

## Safety backstop (required)
Colors can be wrong. Before creating an event, ALSO skip the appointment if its type, reason
or notes contain any of: euth, end of life, quality of life, QOL, put to sleep, PTS, hospice,
or if the type label says Recheck / Tech / Hospitalized / Boarding, whatever its color.
When unsure, skip.

## Task
1. Log in to NectarVet with a dedicated, least-privilege account.
2. Open today's schedule.
3. For each included appointment read ONLY: pet first name and start time.
4. Sync to the Google Calendar "Lakeside Arrivals" (America/Los_Angeles):
   - Event title = pet first name only (e.g. `Bella`). No description, location or guests.
   - Start = appointment time, duration 30 min.
   - Create new, update moved, delete cancelled or no-longer-included ones.
5. Never copy owner names, phone numbers, reasons, or notes.
6. On any failure (login, layout change, calendar error) email the hospital admin and change nothing.

## Rollout
1. Test with fake pets (`TestBella`) in a separate calendar first, including one fake
   euthanasia and one fake recheck appointment: neither may appear.
2. Verify the calendar contains only first names.
3. Then turn on for real.
