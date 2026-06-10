# Todo Ramen

A small responsive Next.js todo application with a polished mobile-first interface and AI-powered task suggestions using Puter.js.

## Features

* Add, edit, and delete todos
* Mark todos as completed with irreversible completion state
* Toggle between incomplete todos and completed todos using a "Show Completed Todos" button
* Search todos by text
* Persistent state with localStorage
* Responsive layout for desktop and mobile screens
* Mobile-friendly buttons, todo cards, and textarea input
* 🤖 AI-powered todo suggestions using Puter.js

## AI Features

Todo Ramen integrates Puter.js AI to help users stay productive.

### Smart Todo Suggestions

The AI analyzes your existing todos and suggests relevant new tasks.

Examples:

**Existing Todos**

* Learn Next.js
* Build a portfolio website

**AI Suggestion**

* Deploy your portfolio to Vercel

If you have no todos yet, the AI can generate productive starter tasks to help you get organized.

### Context-Aware Recommendations

Instead of generating random tasks, the AI uses your current todo list as context to create suggestions that match your goals and workflow.

## Technologies

* Next.js 14+ App Router
* React Client Components
* Tailwind CSS
* Puter.js AI
* react-icons
* uuid

## How to Use

1. Run `npm install`
2. Run `npm run dev`
3. Open the app in your browser
4. Add a few todos
5. Click the **Suggest Me** button to get an AI-generated task recommendation

## Notes

* Completed todos cannot be unchecked once marked done.
* The app stores todos in browser local storage so your list persists between page refreshes.
* The layout adapts across screen sizes, with smaller buttons and card layouts on mobile.
* AI suggestions are generated through Puter.js and may vary based on your current todo list.

## Future Improvements

* Multiple AI suggestions at once
* AI task prioritization
* AI-generated daily plans
* Categories and tags
* Cloud sync and user accounts

## License

MIT License
