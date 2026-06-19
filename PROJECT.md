# Project: ZingBite Food Delivery App Optimization

## Architecture
- **Frontend**: React 19 SPA using React Router v7, Tailwind CSS v4, and Axios. Basename is `/zingbite`. Configured to communicate with the Java backend via HTTP REST APIs, SSE streams, and WebSockets.
- **Backend**: Jakarta Servlet 5.0 application running on Tomcat 10. Uses Hibernate ORM, HikariCP, and MySQL. Real-time features use WebSockets and Server-Sent Events (SSE). BouncyCastle is used for password hashing (Argon2id).
- **Communication Flow**: 
  - Axios (withCredentials: true) to `/zingbite/api/*` with custom CSRF token validations.
  - Server-Sent Events (SSE) to `/zingbite/api/stream` and `/zingbite/api/order/stream`.
  - WebSockets to `/zingbite/api/ws/chat/{type}/{targetId}/{userId}` for real-time messaging.

## Code Layout
- **Frontend Source**: `d:\ZingBite\zingbite-react`
- **Backend Source**: `d:\ZingBite\zingbite`

## Milestones
| # | Name | Scope | Dependencies | Status |
|---|------|-------|-------------|--------|
| 1 | E2E Testing Track | Design test infra and create Tier 1-4 tests; publish `TEST_READY.md`. | none | IN_PROGRESS |
| 2 | Implementation Track | Decomposed into sub-milestones (UI/UX, Security, Bugs, E2E Verification, Adversarial Hardening). | M1 | IN_PROGRESS |

## Interface Contracts
### REST APIs
- `POST /zingbite/api/login`: login user, sets `"loggedInUser"` attribute in session.
- `POST /zingbite/api/logout`: invalidates session.
- `POST /zingbite/api/register`: registers new user.
- `POST /zingbite/api/payment/verify`: verify Razorpay payment signatures.
- `POST /zingbite/api/payment/webhook`: receive Razorpay webhook callbacks.
- `GET /zingbite/api/stream`: global SSE broadcaster.
- `GET /zingbite/api/order/stream`: order-specific tracking SSE stream.

### WebSockets
- WebSocket Endpoint: `ws://<host>:<port>/zingbite/api/ws/chat/{type}/{targetId}/{userId}`
  - Upgrades require active HTTP session.
  - JSON format payloads for chat messages.
