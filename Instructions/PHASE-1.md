# Phase 1

## Front-End (React)

### Tech Stack
- ReactJS
- TailwindCSS
- TypeScript (JavaScript is also fine, but TypeScript is preferred)

### Application Requirements

**Pages:**
1. **Login Page (`login.tsx`)**
   - Features:
     - Two inputs: Email and Password
     - A login button
     - Hardcode a valid email and password for testing (e.g., `test@example.com` / `password123`).

2. **Main Page (`main.tsx`)**
   - Features:
     - Display three predefined weights in a list format.
     - The list should be managed through React state. 
     - An "Add Weight" button to toggle visibility of an AddWeight component.

**Components:**
- **Add Weight Component (`add_weight.tsx`)**
  - Contains an input field for weight entry and a submit/save button.
  - Upon submission, the new weight should update the list in Main Page.

### Backend (ExpressJS)
- **Login Endpoint (`/login`)**
  - A very basic Express server that accepts POST requests to `/login`.
  - Should check if the provided email and password match hardcoded values.
  - No need for actual authentication; if credentials match, just return a success message.

### Additional Notes:
- Use in-memory state management for the frontend.
- Implement basic routing with React Router for navigation.

## Submission Instructions:
- Follow the same process as described for cloning, modifying, and pushing changes to your forked repository.
