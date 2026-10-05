# 💪 FitLog: Workout Library

FitLog is a workout planner with a dark look. It works on any screen size. Browse exercises, build your plan, save lifts for later, and track what you finish.

## Technologies Used

- Next.js with App Router
- React
- JavaScript
- Tailwind CSS
- Lucide React
- Sonner
- Browser localStorage

## Key Features

1. **Workout Library:** Browse 12 exercises. Each one shows the muscle group, equipment, time, calories, and rating.
2. **Workout Details:** Read a short description, key specs, and clear steps for each exercise.
3. **Today's Plan:** Add workouts to your day. You can hold up to five unfinished lifts at a time.
4. **Saved Workouts:** Keep exercises you like in a separate list for later.
5. **Live Summary:** See your exercise count, total minutes, and estimated calories.
6. **Completion Tracking:** Mark a workout as done or remove it.
7. **Sorting:** Sort the library by time, calories, or rating.
8. **Persistent Data:** Your plan, saved lifts, and progress stay put after a reload.
9. **Responsive Layout:** The layout fits phones, tablets, and desktops.
10. **User Feedback:** You get toast alerts, loading states, empty states, and a custom 404 page.

## Run Locally

Install the dependencies:

```bash
npm install
```

Start the dev server:

```bash
npm run dev
```

Then open http://localhost:3000 in your browser.

## Production Build

```bash
npm run build
npm start
```

## API

Main API:
https://api.abcz.workers.dev/api/fitlog

Backup API:
https://api.api-store.workers.dev/api/fitlog

To get one workout, add `/ID` to either URL. For example, use `/1`.

## Data Storage

Your workout picks are saved in your browser with localStorage. They do not sync across devices or browsers. If you clear site data, the lists are gone.

Finished workouts stay in your plan and summary until you remove them. Once you finish one, you free a spot for another unfinished lift.

## Project Links

- Live Website: https://fitlog-zeta-ten.vercel.app/
- GitHub Repository: Coming after the repo is created.
