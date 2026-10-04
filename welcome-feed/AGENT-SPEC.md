# NectarVet -> "Lakeside Arrivals" calendar agent (spec)

Run hourly during clinic hours (e.g. every 30 min, 7am-6pm, Mon-Sat), same way your lab-results agent runs.

## Task
1. Log in to NectarVet with a dedicated, least-privilege account.
2. Open today's appointment schedule.
3. For each appointment whose visit type is on the APPROVED list (below), read ONLY: pet first name and start time.
4. Sync to the Google Calendar "Lakeside Arrivals" (America/Los_Angeles):
   - Event title = pet first name only (e.g. `Bella`). No description, no location, no guests.
   - Start = appointment time, duration 30 min.
   - Create new ones; update moved ones; delete ones cancelled or removed from NectarVet.
   - Never create an event for a pet with no first name or a non-approved visit type.
5. Never copy owner names, phone numbers, reasons for visit, or notes.
6. On any failure (login, layout change, calendar error) email the hospital admin and change nothing.

## Approved visit types (EDIT ME)
Wellness exam, Puppy/Kitten visit, Vaccines, Recheck, Dental.
(Do NOT include: euthanasia/end-of-life, surgery drop-off, sensitive or emergency visits.)

## Rollout
1. Test with fake pets (`TestBella`) in a separate calendar first.
2. Verify the calendar contains only first names.
3. Then turn on for real.
