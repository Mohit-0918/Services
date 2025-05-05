# Email Service

This microservice handles email sending functionality for the microservices architecture. It exposes a REST API to send emails and includes authentication using JWT.

## Features

- Send emails using Gmail via Nodemailer.
- JWT-based authentication for secure email sending.
- Health check endpoint.
- Docker-ready and supports environment-based configuration.
- MongoDB connection for logging or future enhancements.

## Folder Structure

```
/email-service
│
├── /src
│   ├── /controllers      # Request handlers (emailController.js)
│   ├── /models           # (Reserved for future use)
│   ├── /routes           # API route definitions (emailRoutes.js)
│   ├── /services         # Business logic (emailService.js)
│   ├── /utils            # Utility functions (authenticate.js)
│   ├── app.js            # (Not used, main entry is index.js)
│   ├── config.js         # (Reserved for config)
│   └── index.js          # Main application entry point
│
├── /tests                # Unit/integration tests
│
├── Dockerfile            # Docker configuration
├── package.json          # Dependencies and scripts
├── .env                  # Environment variables (not committed)
└── README.md             # This file
```

## Environment Variables

Create a `.env` file in the root with the following variables:

```
MONGO_URI=your_mongodb_connection_string
PORT=3001
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

## Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your `.env` file as described above.

## Running the Service

- Start the service:
  ```bash
  npm start
  ```
- For development with auto-reload:
  ```bash
  npm run dev
  ```

- The service will run on the port specified in `.env` (default: 3001).

## Docker

To build and run with Docker:

```bash
docker build -t email-service .
docker run --env-file .env -p 3001:3001 email-service
```

## API Endpoints

### Health Check

- **GET** `/health`
- **Response:** `{ "status": "OK", "mongoDB": "Connected" | "Disconnected" }`

### Send Email

- **POST** `/api/email/send`
- **Headers:** `Authorization: Bearer <JWT_TOKEN>`
- **Body:**
  ```json
  {
    "to": "recipient@example.com",
    "subject": "Subject",
    "text": "Email body"
  }
  ```
- **Response:**  
  - `200 OK` `{ "message": "Email sent successfully" }`
  - `401 Unauthorized` if token is missing/invalid
  - `500 Internal Server Error` on failure

## Testing

- Run tests:
  ```bash
  npm test
  ```

## Notes

- Ensure your Gmail account allows less secure app access or use an app password if 2FA is enabled.
- MongoDB is required for the service to start, even if not used directly for email sending.

## License

MIT
