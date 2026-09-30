# Documentation

Project documentation lives here.

## Cloudinary

The backend uploads administrator-managed images and videos through Cloudinary.

Required backend environment variables:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLOUDINARY_FOLDER=district404
ADMIN_USER_IDS=1
```

The upload endpoint is:

```text
POST /api/admin/media
```

It requires a valid JWT with `role = admin` and a `multipart/form-data` field named `file`.
Until roles are persisted in the database, `ADMIN_USER_IDS` assigns the admin role at login.
Only image and video MIME types are accepted, with a 100 MB request limit for the MVP.
