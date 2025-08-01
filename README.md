# Draw App 🎨

A real-time collaborative drawing application built as a monorepo, leveraging cutting-edge technologies for a seamless and performant user experience. This project allows multiple users to draw together on a shared canvas in real-time. It features user authentication, room management, and persistent chat history.

## 🚀 Key Features

- **Real-time Collaboration:** Multiple users can draw on the same canvas simultaneously with minimal latency.
- **User Authentication:** Secure user signup and sign-in functionality.
- **Room Management:** Users can create and join rooms to collaborate with specific groups.
- **Persistent Chat:** Chat messages are stored in a database, providing a persistent chat history for each room.
- **Redis Integration:** Utilizes Redis for caching and real-time features, enhancing performance and scalability.
- **Monorepo Architecture:** Organized as a monorepo using pnpm and TurboRepo for efficient dependency management and build processes.
- **Database Persistence:** Uses PostgreSQL as the primary database with Prisma as the ORM.
- **Background Job Processing:** Leverages BullMQ for handling background tasks, such as creating chat messages.
- **Data Validation:** Implements Zod schemas for robust data validation across the application.

## 🛠️ Tech Stack

- **Frontend:**
  - JavaScript / TypeScript
- **Backend:**
  - Node.js
  - Express.js (likely, though not explicitly mentioned, for API endpoints)
- **Database:**
  - PostgreSQL
  - Redis (for caching and real-time features)
- **ORM:**
  - Prisma
- **Real-time Communication:**
  - Redis Pub/Sub (likely, though not explicitly mentioned, for real-time drawing)
- **Build System:**
  - TurboRepo
- **Package Manager:**
  - pnpm
- **Background Job Queue:**
  - BullMQ
- **Dockerization:**
  - Docker
  - Docker Compose
- **Schema Validation:**
  - Zod
- **Other:**
  - dotenv (for environment variable management)
  - JWT (JSON Web Tokens) for authentication

## 📦 Getting Started

### Prerequisites

- Node.js (>=18)
- pnpm (9.0.0)
- Docker
- Docker Compose
- PostgreSQL (running locally or accessible via a connection string)
- Redis (running locally or accessible via a connection string)

### Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd draw-app
    ```

2.  **Install dependencies using pnpm:**

    ```bash
    pnpm install
    ```

3.  **Set up environment variables:**

    - Create a `.env` file in the root directory.
    - Add the following environment variables:

    ```
    DATABASE_URL="postgresql://<user>:<password>@<host>:<port>/<database>?schema=public"
    JWT_SECRET="your-secret-key"
    REDIS_HOST=localhost
    REDIS_PORT=6379
    REDIS_PASSWORD=eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81
    ```

    Replace the placeholders with your actual database and Redis credentials.  The Redis password should match the one configured in `docker-compose.yaml`.

4.  **Start the Redis server using Docker Compose:**

    ```bash
    docker-compose up -d
    ```

5.  **Run Prisma migrations:**

    ```bash
    pnpm db:push
    ```

    This command applies the database schema defined in `packages/db/prisma/schema.prisma` to your PostgreSQL database.

6.  **Generate Prisma Client:**

    ```bash
    pnpm generate
    ```

    This command generates the Prisma Client based on your database schema.

### Running Locally

1.  **Start the development server:**

    ```bash
    pnpm dev
    ```

    This command starts the development servers for all applications and packages in the monorepo.

2.  **Access the application:**

    Open your browser and navigate to the appropriate URL (usually `http://localhost:3000` or similar, depending on the specific app configuration).

## 📂 Project Structure

```
draw-app/
├── apps/
│   ├── [frontend-app]/         # Frontend application (e.g., Next.js app)
│   │   ├── ...
├── packages/
│   ├── backend-common/      # Shared backend utilities and logic
│   │   ├── src/
│   │   │   ├── index.ts           # Main entry point for background job processing
│   │   │   ├── utils/
│   │   │   │   ├── roommanager.ts   # Room membership management
│   │   │   │   ├── usermanager.ts   # User data management
│   │   │   │   ├── chat.redismanager.ts # Chat data management (TO BE IMPLEMENTED)
│   │   ├── package.json
│   ├── common/             # Shared types and schemas
│   │   ├── src/
│   │   │   ├── schema/
│   │   │   │   ├── chat.schema.ts   # Chat schema
│   │   │   │   ├── roomschema.ts    # Room schemas
│   │   │   │   ├── userschema.ts    # User schemas
│   │   │   ├── types/
│   │   │   │   ├── roomtype.ts      # Room types
│   │   │   │   ├── chat.types.ts    # Chat types
│   │   ├── package.json
│   ├── db/                 # Database related code
│   │   ├── prisma/
│   │   │   ├── schema.prisma    # Prisma schema definition
│   │   ├── src/
│   │   │   ├── client.ts        # Prisma client initialization
│   │   ├── package.json
├── turbo.json            # TurboRepo configuration
├── pnpm-workspace.yaml   # pnpm workspace configuration
├── package.json          # Root package.json
├── docker-compose.yaml   # Docker Compose configuration
└── README.md
```

## 📸 Screenshots

(Add screenshots of the application here)

## 🤝 Contributing

We welcome contributions to the Draw App project! To contribute:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and commit them with clear, descriptive messages.
4.  Submit a pull request.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 📬 Contact

If you have any questions or suggestions, please feel free to contact us at [your-email@example.com](mailto:your-email@example.com).

## 💖 Thanks

Thank you for checking out the Draw App! We hope you find it useful and enjoyable.

This README is written by [readme.ai](https://readme-generator-phi.vercel.app/).
