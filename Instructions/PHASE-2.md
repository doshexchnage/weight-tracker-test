# Phase 2

## Back-End (NodeJS + Express)

> Phase 2 Objectives:
- Develop additional API endpoints with ExpressJS.
- Enhance the frontend to interact with these endpoints.

### Backend Enhancements (ExpressJS)

**New Endpoints:**
1. **GET `/weights`**: Return a list of weights.
2. **POST `/weights`**: Add a new weight to the database or in-memory storage.
3. **PUT `/weights/:id`**: Update an existing weight entry.
4. **DELETE `/weights/:id`**: Remove a weight entry.

### Front-End Modifications
 
**Pages:**
- **Main Page (`main.tsx`)**
  - Now fetch weights from the `/weights` endpoint when the component mounts.
  - Update weights list in real-time or on refresh after adding, updating, or deleting.
**Components:**
- **Add Weight Component (`add_weight.tsx`)**
  - Post new weight to `/weights` endpoint on submission.

- **Edit Weight Component (`edit_weight.tsx`)**
  - Fetch the weight to edit via `/weights/:id`.
  - Update weight using PUT request to `/weights/:id`.

- **Delete Confirmation Dialog**
  - Confirm deletion before sending a DELETE request to `/weights/:id`.

### Additional Notes:
- If using a database, consider using MongoDB with a Docker container for local testing.
- Implement error handling for API calls.
- Enhance UI to reflect state changes from API interactions (loading spinners, error messages).

## Submission Instructions:
- Continue working on the same repository from Phase 1.
- Implement these new features and endpoints.
- Push your changes for review.
