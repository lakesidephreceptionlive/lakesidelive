# Welcome card setup

The board is already updated (index.html). It does nothing until you paste a feed URL.

1. In Google Calendar create a calendar named exactly **Lakeside Arrivals** (keep it private).
2. Go to script.google.com -> New project -> paste `Code.gs`.
3. Deploy -> New deployment -> Web app. Execute as: **Me**. Who has access: **Anyone**. Copy the URL.
   (The URL only ever returns first names of pets due within the window.)
4. Open `index.html`, set `const ARRIVALS_URL = "https://script.google.com/macros/s/.../exec";`
5. Upload index.html to GitHub; Netlify redeploys.
6. Test: add an event titled `TestBella` starting now in the calendar; within ~5 min the card shows "Welcome, TestBella!". Delete it afterward.
7. Hand `AGENT-SPEC.md` to the browser agent that fills the calendar.

Behavior: pets due from 15 min before to 30 min after their start time. Nobody due, or feed down = card skipped. Change the window via BEFORE_MIN / AFTER_MIN in Code.gs.
Privacy: first names only, no owner/time/reason. The page is public, so anyone with the URL can see current arrival names.
