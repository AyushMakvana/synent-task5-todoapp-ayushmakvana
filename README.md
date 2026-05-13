# To-Do List Web App

A clean and responsive task management app built with Next.js, Tailwind CSS, and shadcn/ui.

Users can add tasks, mark them as completed, delete them, and keep their tasks saved after refresh using `localStorage`.

## Features

- Add new tasks
- Mark tasks as completed
- Delete tasks
- Persist tasks with `localStorage`
- Responsive UI for desktop and mobile
- Built with reusable UI components

## Tech Stack

- Next.js 16
- React 19
- Tailwind CSS 4
- shadcn/ui
- Lucide React icons

## Local Storage

Tasks are stored in the browser under the key:

```bash
next-todo-list-tasks
```

You can inspect it in the browser DevTools:

1. Open the app in the browser
2. Press `F12`
3. Go to `Application`
4. Open `Local Storage`
5. Select `http://localhost:3000`

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open:

```bash
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Project Structure

```bash
app/
  layout.js
  page.js
  globals.css
components/
  ui/
    button.jsx
    input.jsx
lib/
  utils.js
```

## Build for Production

```bash
npm run build
npm run start
```

## Future Improvements

- Edit existing tasks
- Filter by all, active, and completed
- Clear all completed tasks
- Add due dates or categories

## License

This project is open source and available under the MIT License.
