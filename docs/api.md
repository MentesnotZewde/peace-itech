# User API

MongoDB (Mongoose) + Cloudinary + JWT. All routes run on the Node.js runtime.

## Environment

Add to `.env` (see `.env.example`):

```
MONGODB_URI=mongodb+srv://user:password@cluster/peace-itech
JWT_SECRET=            # openssl rand -base64 32
JWT_EXPIRES_IN=7d
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

## The user model

`src/lib/models/User.js`

| Field            | Type   | Notes                                          |
| ---------------- | ------ | ---------------------------------------------- |
| `fullName`       | string | required                                       |
| `email`          | string | required, unique, lowercased                   |
| `password`       | string | required, min 8, bcrypt-hashed, never returned |
| `role`           | enum   | `Admin` \| `User` — defaults to `User`         |
| `department`     | enum   | Engineering, Infrastructure, Operations, Sales, Support |
| `profession`     | string | e.g. "Frontend Engineer"                       |
| `status`         | enum   | `Active` \| `On Leave` \| `Inactive` — defaults to `Active` |
| `profilePicture` | object | `{ url, publicId }` from Cloudinary            |

`createdAt` / `updatedAt` are added automatically.

## Creating the first Admin

`POST /api/users` requires an Admin token, so seed one from the CLI:

```bash
npm run create-admin -- --email=you@peaceitech.com --password=secret123 --name="Your Name"
```

Re-running with an existing email resets that user's password and role to Admin.

## Auth

Login returns a JWT in the response body. Send it as `Authorization: Bearer <token>`
on every other request.

### `POST /api/auth/login`

```jsonc
// request
{ "email": "you@peaceitech.com", "password": "secret123" }

// 200
{
  "token": "eyJhbGciOi...",
  "user": { "_id": "...", "fullName": "Your Name", "role": "Admin", ... }
}
```

`401` for a wrong email or password (same message either way), `403` if the
account is `Inactive`, `422` for a malformed body.

### `GET /api/auth/me`

Returns the user behind the token. `401` if the token is missing, expired,
tampered with, or the account was deleted or set to `Inactive`.

## Users

| Route                    | Who                       |
| ------------------------ | ------------------------- |
| `GET /api/users`         | any signed-in user        |
| `POST /api/users`        | Admin                     |
| `GET /api/users/:id`     | Admin, or the user themselves |
| `PATCH /api/users/:id`   | Admin, or the user themselves |
| `PUT /api/users/:id`     | alias for `PATCH`         |
| `DELETE /api/users/:id`  | Admin                     |

A non-Admin editing their own record may only change `fullName`, `password`,
and `profilePicture`. Changing `email`, `role`, `status`, `department`, or
`profession` returns `403` — resending those fields unchanged is fine, so edit
forms can post the whole record.

### `GET /api/users`

Query params: `search` (name, email, profession), `role`, `department`,
`status`, `page` (default 1), `limit` (default 20, max 100).

```jsonc
{ "users": [...], "pagination": { "page": 1, "limit": 20, "total": 3, "pages": 1 } }
```

### `POST /api/users`

JSON, or `multipart/form-data` when sending a profile picture. Returns `201`
with the created user.

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Authorization: Bearer $TOKEN" \
  -F fullName="Sarah Kim" \
  -F email="sarah@peaceitech.com" \
  -F password="supersecret" \
  -F role="User" \
  -F department="Engineering" \
  -F profession="Frontend Engineer" \
  -F profilePicture=@./avatar.png
```

### `PATCH /api/users/:id`

Send only the fields that change; anything omitted is left alone. A new
`password` is rehashed on save, and a new `profilePicture` replaces the old
Cloudinary asset (the previous one is destroyed).

Changing **your own** password additionally requires `currentPassword`; a
missing or wrong one returns `422` with `fields.currentPassword`. An Admin
resetting someone else's password doesn't need it. `currentPassword` is only
ever checked, never stored.

```bash
curl -X PATCH http://localhost:3000/api/users/$ID \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"profession":"Senior Frontend Engineer","status":"On Leave"}'
```

### `DELETE /api/users/:id`

Removes the user and their Cloudinary image. Returns `{ "success": true, "id": "..." }`.

## Projects

One collection backs both the delivery table (`/dashboard/projects`) and the
portfolio grid (`/dashboard/projects/portfolio`) — a portfolio card is simply a
project whose `projectstatus` is `Completed`.

| Field                 | Notes                                            |
| --------------------- | ------------------------------------------------ |
| `name` `email` `contact` | Client contact person                         |
| `company`             | Client company                                   |
| `category`            | One of the service categories                    |
| `title` `description` | Portfolio presentation                           |
| `image`               | `{ url, publicId, name, resourceType }` — preview |
| `liveUrl`             | Live site                                        |
| `projectRequirements` | Same asset shape, a PDF stored as Cloudinary `raw` |
| `projectstatus`       | `Not Started` \| `In Progress` \| `Completed`    |
| `progress`            | `"0"` \| `"25"` \| `"50"` \| `"75"` \| `"100"`   |
| `agreedprice` `deliverydate` | Free text                                 |

Every project needs at least a `company` or a `title`; everything else is
optional, because the two forms post different subsets.

Projects are read by everyone signed in and changed only by an Admin.

| Route                       | Who                |
| --------------------------- | ------------------ |
| `GET /api/projects`         | any signed-in user |
| `GET /api/projects/:id`     | any signed-in user |
| `POST /api/projects`        | Admin              |
| `PATCH` / `PUT /api/projects/:id` | Admin        |
| `DELETE /api/projects/:id`  | Admin              |

`GET` accepts `search` (name, company, title, email), `status`, `category`, and
`progress`, newest first.

```bash
curl -X POST http://localhost:3000/api/projects \
  -H "Authorization: Bearer $TOKEN" \
  -F company="Acme Corp" \
  -F name="Samuel Tesfaye" \
  -F projectstatus="In Progress" -F progress="75" \
  -F projectRequirements=@./requirements.pdf \
  -F image=@./preview.png
```

Replacing `image` or `projectRequirements` destroys the asset it supersedes,
and deleting a project removes both of its files.

## Media items

Backs the admin Media Center and the public `/media-center` page.

| Field      | Notes                                                    |
| ---------- | -------------------------------------------------------- |
| `title`    | required                                                  |
| `category` | `News` \| `Events` \| `Insights` \| `Company Updates`     |
| `date`     | publication date as `YYYY-MM-DD` (a plain string, so it never shifts with timezones) |
| `summary`  | teaser text for the card                                  |
| `status`   | `Draft` \| `Published` — defaults to `Draft`              |
| `featured` | boolean; accepts `true`/`"true"` so multipart forms work  |
| `image`    | cover image `{ url, publicId, name, resourceType }`       |

| Route                     | Who                                            |
| ------------------------- | ---------------------------------------------- |
| `GET /api/media`          | **public** — anonymous callers only see `Published` |
| `GET /api/media/:id`      | public for published; a draft returns `404` unless signed in |
| `POST /api/media`         | Admin                                           |
| `PATCH` / `PUT /api/media/:id` | Admin                                      |
| `DELETE /api/media/:id`   | Admin                                           |

`GET` accepts `category` (`All` is ignored), `status` (signed-in only),
`featured=true`, and `search` over title and summary. Results are sorted by
publication date, newest first.

```bash
curl -X POST http://localhost:3000/api/media \
  -H "Authorization: Bearer $TOKEN" \
  -F title="Peace iTech launches automation practice" \
  -F category="News" -F date="2026-05-15" \
  -F status="Published" -F featured=true \
  -F image=@./cover.png
```

Replacing the cover destroys the image it supersedes, and deleting an item
removes its image too.

## Contact form

`POST /api/contact` — **public**. Backs the form on `/contact`.

| Field     | Notes                                              |
| --------- | -------------------------------------------------- |
| `name`    | required, 2–120 chars                               |
| `email`   | required, must parse as an email                    |
| `phone`   | optional, ≤40 chars                                 |
| `office`  | optional, ≤120 chars                                |
| `subject` | required, 3–200 chars                               |
| `message` | required, 10–5000 chars                             |
| `website` | honeypot — must be empty; a filled value is dropped |

Nothing is stored: the submission is emailed and the request ends. A send
failure therefore returns `502` rather than a success screen, because the
message really is lost at that point.

Mail goes straight from this server to an SMTP mailbox you control (see the
`SMTP_*` vars in `.env.example`) — no form service or relay is involved. `From`
is the authenticated SMTP account, since providers reject a `From` they did not
authorise; `Reply-To` is the visitor, so replying reaches them.

Abuse controls are deliberately basic: a hidden honeypot field, and an
in-process limit of 3 submissions per IP per minute. The limiter lives in
module memory, so it resets on redeploy and does not span instances — put a
real limiter at the edge if the form gets targeted.

## Appointments

Backs the public `/book-appointment` page and the admin Appointments list.

| Field             | Notes                                                     |
| ----------------- | --------------------------------------------------------- |
| `name` / `email`  | required                                                   |
| `phone` / `company` | optional contact details                                 |
| `topic`           | one of the service topics in `lib/appointment-slots.js`    |
| `message`         | optional note from the visitor                             |
| `date`            | `YYYY-MM-DD` in the business timezone (a plain string, so it never shifts) |
| `time`            | `HH:mm` slot start, same timezone                          |
| `status`          | `Pending` \| `Confirmed` \| `Completed` \| `Cancelled`     |
| `googleEventId`   | set once the event reaches Google Calendar; absent means un-synced |
| `slotKey`         | `date` + `time` while the booking holds its slot; removed on cancel |

| Route                                    | Who                            |
| ---------------------------------------- | ------------------------------ |
| `GET /api/appointments/availability?date=` | **public** — free slot times only |
| `POST /api/appointments`                 | **public** — the booking form   |
| `GET /api/appointments`                  | signed-in staff                 |
| `GET /api/appointments/:id`              | signed-in staff                 |
| `PATCH /api/appointments/:id`            | signed-in staff — status only   |
| `DELETE /api/appointments/:id`           | Admin                           |

Availability is derived, never stored: `lib/appointment-slots.js` holds the
opening hours, slot length, lunch break, booking window, and minimum notice.
The endpoint returns only free times — who holds the others is never exposed.

Double-booking is prevented by a unique sparse index on `slotKey`, so two
visitors submitting the same slot at once give one of them a `409`. A
cancelled booking drops its `slotKey` and releases the slot.

`GET /api/appointments` accepts `status` (`All` is ignored) plus `from` / `to`
date bounds, sorted soonest first.

```bash
curl -X POST http://localhost:3000/api/appointments \
  -H "Content-Type: application/json" \
  -d '{"name":"Sara T","email":"sara@example.com",
       "topic":"Web & App Development","date":"2026-08-17","time":"09:00"}'
```

### Google Calendar

Bookings are mirrored onto a company calendar with a service-account JWT (see
`GOOGLE_*` in `.env.example`). Calendar failures are logged but never fail a
booking — the record is already saved and the dashboard still shows it, with
the missing `googleEventId` marking it un-synced. Cancelling or deleting a
booking removes its event.

A service account has no mailbox, so Google will not send its own invitations;
the visitor is added as an attendee, and any confirmation email is ours to send.

## Uploads

Images go to the `peace-itech/users` folder, cropped to 512×512 on the face,
`quality: auto` / `format: auto`. JPEG, PNG, WEBP, and GIF up to 5MB are
accepted; anything else returns `400`.

The `CLOUDINARY_API_KEY` must carry the `create` permission (and `read`, for
the usage/admin endpoints). A scoped key without it fails every upload with
`403 Request forbidden due to missing permissions` — check the key's
permissions under Settings → API Keys in the Cloudinary console.

## Status codes

| Code | Meaning                                                        |
| ---- | -------------------------------------------------------------- |
| 400  | invalid id, or a rejected image (wrong type / too large)        |
| 401  | missing, expired, or invalid token; wrong login credentials     |
| 403  | role not allowed, or an inactive account                        |
| 404  | user not found                                                  |
| 409  | duplicate email, deleting yourself, removing/demoting the last Admin |
| 422  | validation failed — `fields` maps each field to its message     |

## Guardrails

- Passwords are bcrypt-hashed (cost 12) and excluded from every response.
- Tokens are re-checked against the database on each request, so a deleted or
  deactivated account stops working immediately.
- The last remaining Admin cannot be deleted or demoted, and Admins cannot
  delete their own account.
