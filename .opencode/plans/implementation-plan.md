# ZingBite Implementation Plan

## Phase 1 — Fix Footer Careers Link

**File:** `zingbite-react/src/components/Footer.jsx:240`
**Change:** `to="/info/careers"` → `to="/careers"`

Replace:
```jsx
<Link to="/info/careers" className="footer-link">
```
With:
```jsx
<Link to="/careers" className="footer-link">
```

---

## Phase 2 — Security Hardening

### 2a. Content Security Policy + Security Headers

**File:** `zingbite/src/main/java/com/app/zingbiteServlets/SecurityHeadersFilter.java`

Add the following headers to `doFilter()`:

| Header | Value |
|--------|-------|
| `Content-Security-Policy` | `default-src 'self'; script-src 'self' 'unsafe-inline' https://unpkg.com https://assets.mixkit.co; style-src 'self' 'unsafe-inline' https://unpkg.com; img-src 'self' https://*.unsplash.com https://*.tile.openstreetmap.org data:; connect-src 'self' ws://* wss://* https://nominatim.openstreetmap.org; font-src 'self' https://fonts.googleapis.com` |
| `X-Content-Type-Options` | `nosniff` |
| `X-Frame-Options` | `DENY` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `geolocation=(self), camera=(), microphone=(), payment=(self)` |

### 2b. Session Cookie Hardening

**File:** `zingbite/src/main/webapp/WEB-INF/web.xml`

Add session-config:
```xml
<session-config>
    <session-timeout>30</session-timeout>
    <cookie-config>
        <http-only>true</http-only>
        <secure>true</secure>
        <same-site>Strict</same-site>
    </cookie-config>
    <tracking-mode>COOKIE</tracking-mode>
</session-config>
```

### 2c. Strip Stack Traces from Error Responses

**Search pattern:** All servlets that do `e.printStackTrace()` + `resp.getWriter().write("{\"error\":\"...\"}")`

Modify each catch block to:
```java
} catch (Exception e) {
    System.err.println("[ServletName] Error: " + e.getMessage());
    resp.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
    JsonObject err = new JsonObject();
    err.addProperty("error", "An internal error occurred.");
    err.addProperty("success", false);
    resp.getWriter().write(err.toString());
}
```

**Files to update:**
- `LoginServlet.java`
- `RegisterServlet.java`
- `CartServlet.java`
- `CreateOrderServlet.java`
- `PaymentVerificationServlet.java`
- `RestaurantAdminServlet.java`
- `DeliveryServlet.java`
- `SuperAdminServlet.java`
- `CareersServlet.java`
- `ProfileServlet.java`
- `ContactServlet.java`

### 2d. Extend Rate Limiting to All POST Endpoints

**File:** `zingbite/src/main/java/com/app/zingbiteServlets/RateLimitFilter.java`

Currently rate-limits by IP. Extend to track per-endpoint + per-user-ID. Add a configurable whitelist for super_admin users.

### 2e. Increase Argon2id Cost Parameters

**File:** `zingbite/src/main/java/com/app/zingbiteutils/PasswordUtils.java`

Current values: TBD (check defaults). Increase to OWASP 2026 recommendations:
- Memory: 64MB (up from 19MB)
- Iterations: 3
- Parallelism: 4
- Salt length: 16 bytes
- Hash length: 32 bytes

---

## Phase 3 — Performance Optimizations

### 3a. Frontend Lazy Loading Audit

**File:** `zingbite-react/src/App.jsx`

Verify all page imports use `React.lazy()`. Currently all pages are lazy-loaded ✅.

Add `preconnect` for external resources in `index.html`:
```html
<link rel="preconnect" href="https://unpkg.com" crossorigin />
<link rel="preconnect" href="https://images.unsplash.com" crossorigin />
<link rel="preconnect" href="https://fonts.googleapis.com" crossorigin />
<link rel="dns-prefetch" href="https://nominatim.openstreetmap.org" />
```

### 3b. Add `loading="lazy"` to Images

**Files to check:** `Home.jsx`, `Menu.jsx`, `Info.jsx`

Add `loading="lazy"` attribute to all `<img>` tags and background image elements.

### 3c. Debounce Search Inputs

**File:** `zingbite-react/src/pages/Home.jsx` and `Menu.jsx`

Add a custom `useDebounce` hook or inline debounce on search input onChange to delay API calls by 300ms.

New file: `zingbite-react/src/hooks/useDebounce.js`
```javascript
import { useState, useEffect } from 'react';

export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}
```

### 3d. React.memo for List Items

**File:** `zingbite-react/src/components/RiderApplicationRow.jsx` — already uses `React.memo` ✅

**Add to:** Admin table rows in `SuperAdminDashboard.jsx` — wrap inline table row renderers in memoized sub-components.

### 3e. Backend N+1 Query Fix

**File:** `zingbite/src/main/java/com/app/zingbiteServlets/SuperAdminServlet.java`

Current pattern:
```java
List<User> usersList = hibernateSession.createQuery("from User order by userID asc", User.class).list();
```

Fix: Use JOIN FETCH for any queries that access related entities in a loop.

For the applications loop that fetches User and Job per row, batch them:
```java
// Instead of per-row hibernateSession.get(), use a single query with join fetch
String hql = "select a, u.riderStatus, j.title from Application a " +
             "left join User u on u.userID = a.userId " +
             "left join Job j on j.id = a.jobId " +
             "order by a.id desc";
```

### 3f. Add Database Indexes

**File:** `zingbite/src/main/java/com/app/zingbiteutils/DatabaseIndexInitializer.java`

Add indexes:
```sql
CREATE INDEX IF NOT EXISTS idx_orders_userId ON orders(userId);
CREATE INDEX IF NOT EXISTS idx_orders_orderStatus ON orders(orderStatus);
CREATE INDEX IF NOT EXISTS idx_applications_jobId ON applications(jobId);
CREATE INDEX IF NOT EXISTS idx_applications_userId ON applications(userId);
CREATE INDEX IF NOT EXISTS idx_restaurant_requests_adminId ON restaurant_requests(adminId);
CREATE INDEX IF NOT EXISTS idx_order_items_orderId ON order_items(orderId);
CREATE INDEX IF NOT EXISTS idx_email_notifications_userId ON email_notifications(userId);
```

### 3g. Batch Analytics Event Inserts

**File:** `zingbite/src/main/java/com/app/zingbiteutils/AnalyticsQueueManager.java`

Replace individual Hibernate `persist()` calls with JDBC batch insert using `PreparedStatement` with `addBatch()` / `executeBatch()` for analytics events.

---

## Phase 4 — AI Recommendations System

### 4a. Upgrade RecommendationEngine.java

**File:** `zingbite/src/main/java/com/app/zingbiteutils/RecommendationEngine.java`

Implement three recommendation strategies:

**Strategy 1 — Collaborative Filtering:**
- Query `orders` + `order_items` tables
- Find users who ordered the same restaurants/items as current user
- Recommend items from those users' orders that current user hasn't tried

**Strategy 2 — Content-Based:**
- From user's order history, extract preferred cuisine types
- Find restaurants with matching cuisine types
- Rank by rating × order count

**Strategy 3 — Trending:**
- For guest users, find most-ordered items in last 7 days
- Rank by order count descending

Return:
```json
{
  "personalized": [{"restaurantId": 1, "name": "...", "cuisine": "...", "score": 0.95}],
  "trending": [{"restaurantId": 5, "name": "...", "orderCount": 42}]
}
```

### 4b. Create RecommendationServlet.java

**New file:** `zingbite/src/main/java/com/app/zingbiteServlets/RecommendationServlet.java`

```java
@WebServlet("/api/recommendations")
public class RecommendationServlet extends HttpServlet {
    protected void doGet(req, resp) {
        // Check if user is logged in
        // If yes: return personalized + trending
        // If no: return trending only
        // Cache results for 5 minutes
    }
}
```

### 4c. Create RecommendedSection.jsx

**New file:** `zingbite-react/src/components/RecommendedSection.jsx`

- Horizontal scrollable carousel of restaurant cards
- Shows "Recommended For You" heading for logged-in users
- Shows "Trending Now" heading for guests
- Each card links to `/menu?restaurantId=X`
- Graceful fallback (hidden if API fails)

### 4d. Integrate into Home.jsx

**File:** `zingbite-react/src/pages/Home.jsx`

Add `<RecommendedSection />` between hero and restaurant grid. Wrap in `<React.Suspense>` for lazy loading.

---

## Verification Steps

### Compilation & Build
```powershell
cd zingbite
./compile.ps1
```

```powershell
cd zingbite-react
npm run build
```

### Test Checklist
1. Careers link in footer → navigates to `/careers`
2. CSP headers → check in browser DevTools → Network tab
3. Rate limiting → submit 6 login attempts rapidly → 429 response
4. Recommendations API → `GET /api/recommendations` returns JSON array
5. Recommended section appears on Home page for logged-in users
6. Lazy images → verify `loading="lazy"` attribute in DOM
7. Debounced search → verify 300ms delay before API call
