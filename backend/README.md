# WEBPAYWALL Backend

This is the Express/Node backend for the Natural Wellness site. The codebase is organized into modular services:

- `src/routes/` — Express route handlers (auth, blog, ebook, payment)
- `src/controllers/` — Business logic for each route
- `src/models/` — Mongoose models for MongoDB
- `src/middleware/` — Authentication, error handling, etc.
- `src/utils/` — Utility functions
- `src/config/` — Configuration (DB, PayPal, etc.)

APIs will be provided for authentication, blog, ebook, and payment (PayPal) features. 