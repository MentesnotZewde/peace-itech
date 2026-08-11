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

| Route                       | Who                |
| --------------------------- | ------------------ |
| `GET /api/projects`         | any signed-in user |
| `POST /api/projects`        | any signed-in user |
| `GET /api/projects/:id`     | any signed-in user |
| `PATCH` / `PUT /api/projects/:id` | any signed-in user |
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
