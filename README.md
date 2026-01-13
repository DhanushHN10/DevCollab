<!-- # DevCollab : AI - Pwered Collaboration Platform for Developers  ( MVP )

**Deployed Link**: https://dhanushhn05-devcolab-webapp.netlify.app/

1. **Project Summary**
    **DevCollab** is an intelligent, full stack web application which is engineered to serve as centralized ecosystem for developers to connect, collab and work on projects. 
    ~ It addresses two critical challenges faced by many in the tech community:
        A. Connecting with people to work on a project (personal or for a hackathon, for example)
        B. Convinience in finding suitable projects based on your skills and interests and joining the team to work.
    ~ DevCollab leverages an AI-powered recommendation engine to intelligently match developers with projects that align with their skills and interests—and vice versa.
    ~ Project Management, RBAC, User Profiles, real-time Auth (jwt and OAuth) are some of it's other features while a few more are to be implemented.
2. **Key Features & Technical Deep Dive**
   2.1 **AI-Powered Recommendation Engine**

    **For Developers**: Personalized project recommendations based on skills, interests, and tech stacks.

    **For Project Owners**: Intelligent suggestions for potential collaborators, ranked by "match score."

    **Implementation**: TF-IDF vectorization + cosine similarity via a Flask microservice, enabling scalable and data-driven recommendations. 

   2.2 **Authentication & User Management**

~ Dual authentication: Traditional signup/login and Google OAuth 2.0.

~ Secure password handling: Argon2 hashing.

~ Session management: JSON Web Tokens (JWT).

~ Rich profiles: Skills, interests, bio, GitHub/LinkedIn links, availability.

2.3 **End-to-End Project & Collaboration Lifecycle**

~ Project creation and discovery: Advanced search and filtering.

~ Collaboration workflow: Owners can invite developers; developers can request to join.

~ Centralized dashboards: Manage projects, collaborations, requests, and invitations from one place.

3. **System Architecture**

DevCollab follows a modular, decoupled architecture:

~ **Frontend**: React (Vite) SPA for user-facing features.

~ **Backend**: Node.js + Express.js API for authentication, business logic, and database access.

~ **AI Service**: Python (Flask) microservice dedicated to ML-powered recommendations.

~ **Database**: MongoDB (with Mongoose ODM) for persistence.

This separation of concerns supports **scalability**, **maintainability**, and  **flexibility** in evolving the platform.

4. **Tech Stack**

~ **Frontend**: React, Tailwind CSS, Vite

~ **Backend**: Node.js, Express.js, MongoDB

~ **AI**: Python, Flask, Scikit-learn, Pandas

~ **Authentication**: Passport.js (Google OAuth 2.0), Argon2, JWT\

4. **Setup, Prerequisites and Installation**
 // To be added

5. **Future Scope and features to be Added**
    // To be added

6. **Challenges faced**    
 // To be added -->

 

 <div align="center">
 
 # 🚀 DevCollab
 
 ### AI-Powered Collaboration Platform for Developers
 
 [![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
 [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
 [![React](https://img.shields.io/badge/React-19-blue.svg)](https://reactjs.org/)
 [![Python](https://img.shields.io/badge/Python-3.8+-yellow.svg)](https://www.python.org/)
 [![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green.svg)](https://www.mongodb.com/)
 
 **[Live Demo](https://dhanushhn05-devcolab-webapp.netlify.app/)** | **[Documentation](#documentation)** | **[Features](#features)** | **[Installation](#installation)**
 
 </div>
 
 ---
 
 ## 📋 Table of Contents
 
 - [Overview](#overview)
 - [Problem Statement](#problem-statement)
 - [Key Features](#key-features)
 - [System Architecture](#system-architecture)
 - [Technology Stack](#technology-stack)
 - [Prerequisites](#prerequisites)
 - [Installation](#installation)
 - [Configuration](#configuration)
 - [Usage](#usage)
 - [API Documentation](#api-documentation)
 - [Project Structure](#project-structure)
 - [AI Recommendation System](#ai-recommendation-system)
 - [Security](#security)
 - [Contributing](#contributing)
 - [Future Roadmap](#future-roadmap)
 - [License](#license)
 - [Contact](#contact)
 
 ---
 
 ## 🎯 Overview
 
 **DevCollab** is an intelligent, full-stack web application engineered to serve as a centralized ecosystem for developers to connect, collaborate, and work on projects together. Built with modern technologies and powered by machine learning, DevCollab transforms how developers find teammates and projects that match their expertise.
 
 ### 🌟 Why DevCollab?
 
 In the rapidly evolving tech landscape, developers face two critical challenges:
 
 1. **Finding the Right Team**: Whether for personal projects, hackathons, or open-source contributions, finding collaborators with complementary skills is time-consuming and often relies on luck or existing networks.
 
 2. **Discovering Relevant Projects**: Identifying projects that align with your skills, interests, and career goals requires extensive searching across multiple platforms.
 
 DevCollab solves these problems through an **AI-powered recommendation engine** that intelligently matches:
 
 - Developers to projects that align with their skills and interests
 - Project owners to potential collaborators with relevant expertise
 
 ---
 
 ## 🔍 Problem Statement
 
 ### Current Challenges in Developer Collaboration
 
 #### For Individual Developers:
 
 - ❌ Difficulty finding projects that match their skill set
 - ❌ Limited visibility of collaboration opportunities
 - ❌ No centralized platform to showcase skills and interests
 - ❌ Manual, time-intensive project discovery process
 
 #### For Project Owners:
 
 - ❌ Hard to find developers with specific technical skills
 - ❌ Inefficient collaboration invitation workflows
 - ❌ Lack of intelligent matching for team composition
 - ❌ No systematic way to evaluate potential collaborators
 
 ### DevCollab's Solution
 
 ✅ **AI-Powered Matching**: Machine learning algorithms match developers with projects based on skills, interests, and tech stacks  
 ✅ **Unified Platform**: Single dashboard for managing projects, collaborations, invites, and requests  
 ✅ **Smart Profiles**: Rich developer profiles with skills, interests, availability, and portfolio links  
 ✅ **Streamlined Workflow**: Intuitive invitation and request management system  
 ✅ **Personalized Recommendations**: Ranked suggestions based on compatibility scores
 
 ---
 
 ## ✨ Key Features
 
 ### 🤖 AI-Powered Recommendation Engine
 
 #### For Developers
 
 - **Personalized Project Recommendations**: Get project suggestions based on your skills, interests, and preferred tech stack
 - **Compatibility Scoring**: See how well you match with each project (0-100% match score)
 - **Smart Filtering**: Filter recommendations by technology, tags, and project type
 
 #### For Project Owners
 
 - **Intelligent Collaborator Suggestions**: Discover developers who match your project requirements
 - **Ranked Recommendations**: Potential collaborators sorted by match score
 - **Skill-Based Search**: Find developers with specific technical expertise
 
 #### Technical Implementation
 
 ```
 Algorithm: TF-IDF Vectorization + Cosine Similarity
 - Converts skills, interests, and tech stacks into numerical vectors
 - Calculates similarity scores between user profiles and projects
 - Returns ranked recommendations with similarity scores
 - Microservice architecture for scalable, independent ML operations
 ```
 
 ### 🔐 Authentication & User Management
 
 - **Dual Authentication System**:
   - Traditional email/password signup and login
   - Google OAuth 2.0 integration for seamless authentication
 - **Security First**:
   - Argon2 password hashing (industry-standard, resistant to GPU attacks)
   - JWT-based session management with secure token generation
   - Protected routes with middleware authentication
 - **Rich User Profiles**:
   - Skills and interests (for AI matching)
   - Bio and availability status
   - Social links (GitHub, LinkedIn, Portfolio)
   - Auto-generated Gravatar avatars
   - Profile completion workflow
 
 ### 💼 Project Management & Collaboration
 
 #### Project Lifecycle
 
 1. **Creation**: Create projects with title, description, tech stack, and tags
 2. **Discovery**: Search and filter projects with advanced criteria
 3. **Invitation System**:
    - Project owners invite developers
    - Developers can request to join projects
 4. **Collaboration Management**:
    - Accept/reject join requests
    - Accept/reject project invitations
    - Cancel pending requests
    - Unsend invitations
 5. **Workspace Access**: Dedicated workspace for each project
 
 #### Collaboration Features
 
 - **Role-Based Access Control (RBAC)**: Owner vs. Collaborator permissions
 - **Collaboration Status Tracking**: Monitor all invitations and requests
 - **Bidirectional Workflow**: Both owners and developers can initiate collaboration
 - **Centralized Dashboards**:
   - My Projects
   - My Collaborations
   - Invites Received
   - Join Requests Sent
 
 ### 🎨 User Experience
 
 - **Modern UI/UX**: Built with Tailwind CSS and shadcn/ui components
 - **Responsive Design**: Optimized for desktop, tablet, and mobile
 - **Interactive Elements**: Smooth animations with Framer Motion
 - **Real-Time Feedback**: Toast notifications for all actions
 - **Intuitive Navigation**: Context-aware navigation and routing
 
 ---
 
 ## 🏗️ System Architecture
 
 DevCollab follows a **modular, microservices-inspired architecture** with clear separation of concerns, enabling scalability, maintainability, and independent deployment.
 
 ### High-Level Architecture Diagram
 
 ```mermaid
 graph TB
     subgraph "Client Layer"
         A[React SPA<br/>Vite + React Router]
     end
 
     subgraph "API Gateway Layer"
         B[Express.js Server<br/>Port 5000]
     end
 
     subgraph "Service Layer"
         C[Auth Service<br/>JWT + OAuth]
         D[Project Service<br/>CRUD + Search]
         E[Recommendation Service<br/>Port 5001]
     end
 
     subgraph "Data Layer"
         F[(MongoDB<br/>Cloud/Local)]
         G[Python Flask API<br/>ML Service]
     end
 
     A -->|HTTP/REST| B
     B --> C
     B --> D
     B -->|HTTP Request| E
     C --> F
     D --> F
     E --> G
     G -->|TF-IDF + Cosine<br/>Similarity| E
     E -->|JSON Response| B
     B -->|JSON Response| A
 
     style A fill:#61dafb,stroke:#333,stroke-width:2px,color:#000
     style B fill:#68a063,stroke:#333,stroke-width:2px,color:#fff
     style E fill:#68a063,stroke:#333,stroke-width:2px,color:#fff
     style F fill:#4db33d,stroke:#333,stroke-width:2px,color:#fff
     style G fill:#ffd43b,stroke:#333,stroke-width:2px,color:#000
 ```
 
 ### Architecture Components
 
 #### 1. **Frontend (Client Layer)**
 
 - **Framework**: React 19 with Vite build tool
 - **Routing**: React Router v7 for SPA navigation
 - **State Management**: Context API for authentication state
 - **HTTP Client**: Axios with interceptors for API calls
 - **UI Library**: Tailwind CSS + shadcn/ui components
 - **Deployment**: Netlify (Static hosting with CDN)
 
 **Why This Stack?**
 
 - ⚡ Vite provides lightning-fast HMR and optimized builds
 - 🎨 Tailwind CSS enables rapid UI development with utility classes
 - 🔄 React Router v7 offers data-driven routing patterns
 - 📦 shadcn/ui provides accessible, customizable components
 
 #### 2. **Backend (API Gateway & Service Layer)**
 
 - **Framework**: Express.js (Node.js)
 - **Database ORM**: Mongoose for MongoDB
 - **Authentication**: Passport.js (Google OAuth) + JWT
 - **Middleware**: Custom authentication and authorization middleware
 - **Validation**: Express-validator for input validation
 - **Security**: Argon2 password hashing, CORS configuration
 
 **API Structure**:
 
 ```
 /api/auth          → Authentication routes
 /api/projects      → Project CRUD and collaboration
 /api/recommendations → AI recommendation endpoints
 ```
 
 **Why This Stack?**
 
 - 🚀 Express.js is lightweight, flexible, and widely adopted
 - 🔒 Passport.js provides robust OAuth integration
 - 📊 Mongoose offers elegant MongoDB object modeling
 - 🛡️ Argon2 is the most secure password hashing algorithm
 
 #### 3. **AI Recommendation Service**
 
 - **Framework**: Flask (Python)
 - **ML Libraries**: Scikit-learn (TF-IDF, Cosine Similarity), Pandas
 - **Deployment**: Independent microservice on port 5001
 - **Communication**: REST API with JSON responses
 
 **Endpoints**:
 
 - `POST /recommend-projects`: Get project recommendations for a user
 - `POST /recommend-users`: Get developer recommendations for a project
 
 **Why This Stack?**
 
 - 🧠 Python is the de facto standard for ML/AI applications
 - 📈 Scikit-learn provides battle-tested ML algorithms
 - 🔬 Flask is lightweight and perfect for microservices
 - 🎯 Separation from main backend enables independent scaling
 
 #### 4. **Database Layer**
 
 - **Database**: MongoDB (NoSQL, Document-Oriented)
 - **ODM**: Mongoose with schema validation
 - **Hosting**: MongoDB Atlas (Cloud) or Local Instance
 
 **Data Models**:
 
 - **User**: Authentication, profile, skills, interests
 - **Project**: Title, description, tech stack, collaborators
 - **Workspace**: Project-specific collaboration space
 - **Invitations & Requests**: Collaboration workflow tracking
 
 **Why MongoDB?**
 
 - 📚 Flexible schema for evolving data requirements
 - 🔗 Natural fit for nested documents (user profiles, project data)
 - 🌐 Excellent scalability and cloud integration
 - ⚡ Fast querying with proper indexing
 
 ### Data Flow Architecture
 
 ```mermaid
 sequenceDiagram
     participant U as User (Browser)
     participant F as Frontend (React)
     participant B as Backend (Express)
     participant D as Database (MongoDB)
     participant AI as AI Service (Flask)
 
     U->>F: Login / Browse Projects
     F->>B: POST /api/auth/login
     B->>D: Query User
     D-->>B: User Data
     B-->>F: JWT Token
     F->>F: Store Token in Context
 
     U->>F: Request Project Recommendations
     F->>B: GET /api/recommendations/projects
     B->>D: Fetch All Projects
     D-->>B: Projects List
     B->>AI: POST /recommend-projects<br/>(user profile + projects)
     AI->>AI: TF-IDF Vectorization<br/>Cosine Similarity
     AI-->>B: Ranked Recommendations<br/>(with scores)
     B-->>F: Filtered & Sorted Projects
     F-->>U: Display Recommendations
 
     U->>F: Invite Developer to Project
     F->>B: POST /api/projects/:id/invite/:userId
     B->>B: Verify: Is user project owner?
     B->>D: Create Invitation Record
     D-->>B: Confirmation
     B-->>F: Success Response
     F-->>U: Toast Notification
 ```
 
 ### Security Architecture
 
 ```mermaid
 graph LR
     A[User Request] --> B{Has JWT Token?}
     B -->|No| C[401 Unauthorized]
     B -->|Yes| D{Token Valid?}
     D -->|No| E[403 Forbidden]
     D -->|Yes| F{Has Permission?}
     F -->|No| G[403 Forbidden]
     F -->|Yes| H[Process Request]
 
     style H fill:#4caf50,stroke:#333,stroke-width:2px,color:#fff
     style C fill:#f44336,stroke:#333,stroke-width:2px,color:#fff
     style E fill:#f44336,stroke:#333,stroke-width:2px,color:#fff
     style G fill:#f44336,stroke:#333,stroke-width:2px,color:#fff
 ```
 
 **Security Layers**:
 
 1. **Authentication Middleware** (`protect.js`): Verifies JWT token
 2. **Authorization Middleware** (`checkProjectMember.js`): Verifies project membership
 3. **CORS Configuration**: Whitelist-based origin validation
 4. **Input Validation**: Express-validator sanitization
 5. **Password Security**: Argon2 hashing with salt
 
 ---
 
 ## 🛠️ Technology Stack
 
 ### Frontend
 
 | Technology    | Version | Purpose                 |
 | ------------- | ------- | ----------------------- |
 | React         | 19.1.0  | UI framework            |
 | Vite          | 7.0.4   | Build tool & dev server |
 | React Router  | 7.7.0   | Client-side routing     |
 | Tailwind CSS  | 4.1.11  | Utility-first styling   |
 | shadcn/ui     | Latest  | Component library       |
 | Framer Motion | 12.23.6 | Animation library       |
 | Axios         | 1.10.0  | HTTP client             |
 | React Select  | 5.10.2  | Advanced select inputs  |
 | JWT Decode    | 4.0.0   | Token parsing           |
 | Lucide React  | 0.525.0 | Icon library            |
 
 ### Backend
 
 | Technology        | Version | Purpose               |
 | ----------------- | ------- | --------------------- |
 | Node.js           | 18+     | Runtime environment   |
 | Express.js        | 5.1.0   | Web framework         |
 | MongoDB           | 8.15.1  | Database              |
 | Mongoose          | 8.15.1  | ODM for MongoDB       |
 | Argon2            | 0.43.0  | Password hashing      |
 | JWT               | 9.0.2   | Token generation      |
 | Passport.js       | 0.7.0   | OAuth middleware      |
 | Express Validator | 7.2.1   | Input validation      |
 | CORS              | 2.8.5   | Cross-origin requests |
 | Dotenv            | 16.5.0  | Environment variables |
 
 ### AI Service
 
 | Technology        | Version | Purpose                |
 | ----------------- | ------- | ---------------------- |
 | Python            | 3.8+    | Programming language   |
 | Flask             | Latest  | Web framework          |
 | Scikit-learn      | Latest  | ML library             |
 | Pandas            | Latest  | Data manipulation      |
 | TF-IDF            | -       | Text vectorization     |
 | Cosine Similarity | -       | Similarity calculation |
 
 ### Development Tools
 
 - **Nodemon**: Auto-restart for backend development
 - **Concurrently**: Run multiple npm scripts
 - **ESLint**: Code linting for JavaScript/React
 - **Git**: Version control
 
 ---
 
 ## 📦 Prerequisites
 
 Before installing DevCollab, ensure you have the following installed:
 
 ### Required Software
 
 1. **Node.js** (v18 or higher)
 
    ```bash
    node --version  # Should be v18.0.0 or higher
    ```
 
    Download from: [https://nodejs.org/](https://nodejs.org/)
 
 2. **Python** (v3.8 or higher)
 
    ```bash
    python --version  # Should be 3.8.0 or higher
    ```
 
    Download from: [https://www.python.org/](https://www.python.org/)
 
 3. **MongoDB**
 
    - **Option A**: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Recommended - Free cloud hosting)
    - **Option B**: [Local MongoDB Installation](https://www.mongodb.com/try/download/community)
 
    ```bash
    mongod --version  # Verify installation
    ```
 
 4. **npm** or **yarn** (comes with Node.js)
 
    ```bash
    npm --version
    ```
 
 5. **Git** (for cloning the repository)
    ```bash
    git --version
    ```
 
 ### Optional Tools
 
 - **Postman** or **Thunder Client**: For API testing
 - **MongoDB Compass**: GUI for MongoDB database management
 - **VS Code**: Recommended IDE with extensions:
   - ESLint
   - Prettier
   - Tailwind CSS IntelliSense
   - Python
 
 ---
 
 ## 🚀 Installation
 
 ### Step 1: Clone the Repository
 
 ```bash
 git clone https://github.com/yourusername/DevCollab.git
 cd DevCollab
 ```
 
 ### Step 2: Install Backend Dependencies
 
 ```bash
 cd Backend
 npm install
 ```
 
 **Dependencies installed**:
 
 - express, mongoose, jsonwebtoken, argon2, passport, cors, dotenv, axios, and more
 
 ### Step 3: Install Frontend Dependencies
 
 ```bash
 cd ../Frontend
 npm install
 ```
 
 **Dependencies installed**:
 
 - react, react-router-dom, axios, tailwindcss, framer-motion, lucide-react, and more
 
 ### Step 4: Install AI Service Dependencies
 
 ```bash
 cd ../ai-recommendation-api
 pip install -r requirements.txt
 ```
 
 **Dependencies installed**:
 
 - Flask, scikit-learn, pandas
 
 **Requirements.txt contents**:
 
 ```txt
 flask
 scikit-learn
 pandas
 ```
 
 ### Step 5: Install Root Dependencies (Optional - for concurrent execution)
 
 ```bash
 cd ..
 npm install
 ```
 
 This installs `concurrently` to run frontend and backend simultaneously.
 
 ---
 
 ## ⚙️ Configuration
 
 ### Backend Configuration
 
 1. **Create Environment File**
 
 Navigate to the `Backend` directory and create a `.env` file:
 
 ```bash
 cd Backend
 touch .env  # On Windows: type nul > .env
 ```
 
 2. **Add Environment Variables**
 
 ```env
 # Server Configuration
 PORT=5000
 NODE_ENV=development
 
 # Database
 MONGO_URI=mongodb://localhost:27017/devcollab
 # OR for MongoDB Atlas:
 # MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/devcollab?retryWrites=true&w=majority
 
 # JWT Secret (Generate a strong random string)
 JWT_SECRET=your_super_secure_jwt_secret_key_here_min_32_chars
 
 # Google OAuth 2.0 (Optional - for Google Sign-In)
 GOOGLE_CLIENT_ID=your_google_client_id_here
 GOOGLE_CLIENT_SECRET=your_google_client_secret_here
 GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
 
 # Frontend URL (for CORS)
 FRONTEND_URI=http://localhost:5173
 
 # AI Recommendation Service
 AI_API_URL=http://localhost:5001
 ```
 
 3. **Get Google OAuth Credentials (Optional)**
 
 If you want to enable Google Sign-In:
 
 - Go to [Google Cloud Console](https://console.cloud.google.com/)
 - Create a new project or select existing
 - Enable Google+ API
 - Create OAuth 2.0 credentials
 - Add authorized redirect URI: `http://localhost:5000/api/auth/google/callback`
 - Copy Client ID and Client Secret to `.env`
 
 ### Frontend Configuration
 
 1. **Create Environment File**
 
 Navigate to the `Frontend` directory and create a `.env` file:
 
 ```bash
 cd ../Frontend
 touch .env  # On Windows: type nul > .env
 ```
 
 2. **Add Environment Variables**
 
 ```env
 # Backend API URL
 VITE_API_BASE_URL=http://localhost:5000/api
 
 # AI Recommendation API URL (Optional - for direct calls)
 VITE_AI_API_URL=http://localhost:5001
 ```
 
 ### AI Service Configuration
 
 The Flask app is configured to run on port 5001 by default. No additional configuration needed unless you want to change the port.
 
 To change the port, edit `ai-recommendation-api/app.py`:
 
 ```python
 if __name__ == '__main__':
     app.run(port=5001, debug=True)  # Change port here
 ```
 
 ### Database Setup
 
 #### Option A: MongoDB Atlas (Cloud - Recommended)
 
 1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
 2. Create a new cluster (Free tier available)
 3. Create a database user with username and password
 4. Whitelist your IP address (or allow from anywhere for development: `0.0.0.0/0`)
 5. Get your connection string and add to `Backend/.env`:
    ```env
    MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/devcollab?retryWrites=true&w=majority
    ```
 
 #### Option B: Local MongoDB
 
 1. Install MongoDB Community Edition
 2. Start MongoDB service:
 
    ```bash
    # On Windows:
    net start MongoDB
 
    # On macOS/Linux:
    sudo systemctl start mongod
    ```
 
 3. Use local connection string in `Backend/.env`:
    ```env
    MONGO_URI=mongodb://localhost:27017/devcollab
    ```
 
 ---
 
 ## 🎮 Usage
 
 ### Running the Application
 
 #### Option 1: Run All Services Concurrently (Recommended)
 
 From the root directory:
 
 ```bash
 npm run dev
 ```
 
 This starts:
 
 - ✅ Backend server on `http://localhost:5000`
 - ✅ Frontend dev server on `http://localhost:5173`
 
 Then, start the AI service separately:
 
 ```bash
 cd ai-recommendation-api
 python app.py
 ```
 
 AI service runs on `http://localhost:5001`
 
 #### Option 2: Run Services Individually
 
 **Terminal 1 - Backend**:
 
 ```bash
 cd Backend
 npm run devv
 ```
 
 **Terminal 2 - Frontend**:
 
 ```bash
 cd Frontend
 npm run dev
 ```
 
 **Terminal 3 - AI Service**:
 
 ```bash
 cd ai-recommendation-api
 python app.py
 ```
 
 ### Accessing the Application
 
 Once all services are running:
 
 1. **Frontend**: Open [http://localhost:5173](http://localhost:5173) in your browser
 2. **Backend API**: [http://localhost:5000](http://localhost:5000)
 3. **AI Service**: [http://localhost:5001](http://localhost:5001)
 
 ### First-Time Setup
 
 1. **Sign Up**: Create a new account on the homepage
 2. **Complete Profile**: Add your skills, interests, bio, and social links
 3. **Explore**: Browse the dashboard to see available features
 
 ### User Journey
 
 #### For Developers Looking for Projects
 
 1. **Login** to your account
 2. Navigate to **Dashboard**
 3. View **Recommended Projects** based on your skills
 4. **Search & Filter** projects by tech stack or tags
 5. Click on a project to see details
 6. **Request to Join** interesting projects
 7. Track your requests in **Join Requests Sent**
 8. Once accepted, access the project **Workspace**
 
 #### For Project Owners Looking for Collaborators
 
 1. **Create a Project** from the dashboard
 2. Add project title, description, tech stack, and tags
 3. View **Recommended Developers** for your project
 4. **Invite Developers** who match your requirements
 5. Manage invitations in **Collaboration Status**
 6. Accept/Reject **Join Requests** from interested developers
 7. Collaborate in the project **Workspace**
 
 ---
 
 ## 📚 API Documentation
 
 ### Base URL
 
 ```
 http://localhost:5000/api
 ```
 
 ### Authentication Endpoints
 
 #### 1. User Signup
 
 ```http
 POST /auth/signup
 Content-Type: application/json
 
 Request Body:
 {
   "name": "John Doe",
   "username": "johndoe",
   "email": "john@example.com",
   "password": "SecurePass123!"
 }
 
 Response (201 Created):
 {
   "message": "Signup successful, User created",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   "user": {
     "_id": "507f1f77bcf86cd799439011",
     "name": "John Doe",
     "username": "johndoe",
     "email": "john@example.com",
     "avatar": "https://gravatar.com/avatar/..."
   }
 }
 ```
 
 #### 2. User Login
 
 ```http
 POST /auth/login
 Content-Type: application/json
 
 Request Body:
 {
   "email": "john@example.com",
   "password": "SecurePass123!"
 }
 
 Response (200 OK):
 {
   "message": "Login successful",
   "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
   "user": {
     "_id": "507f1f77bcf86cd799439011",
     "name": "John Doe",
     "username": "johndoe",
     "email": "john@example.com"
   }
 }
 ```
 
 #### 3. Google OAuth Login
 
 ```http
 GET /auth/google
 ```
 
 Redirects to Google OAuth consent screen.
 
 ```http
 GET /auth/google/callback
 ```
 
 Handles OAuth callback and returns JWT token.
 
 #### 4. Complete Profile
 
 ```http
 PUT /auth/complete-profile
 Authorization: Bearer <JWT_TOKEN>
 Content-Type: application/json
 
 Request Body:
 {
   "bio": "Full-stack developer passionate about AI",
   "skills": ["React", "Node.js", "Python", "MongoDB"],
   "interests": ["Machine Learning", "Web3", "Open Source"],
   "links": {
     "github": "https://github.com/johndoe",
     "linkedin": "https://linkedin.com/in/johndoe",
     "portfolio": "https://johndoe.dev"
   },
   "availability": "Available"
 }
 
 Response (200 OK):
 {
   "message": "Profile updated successfully",
   "user": { ... }
 }
 ```
 
 ### Project Endpoints
 
 #### 5. Create Project
 
 ```http
 POST /projects/create
 Authorization: Bearer <JWT_TOKEN>
 Content-Type: application/json
 
 Request Body:
 {
   "title": "AI-Powered Task Manager",
   "description": "Building a smart task management app with ML recommendations",
   "techStack": ["React", "Node.js", "Python", "TensorFlow"],
   "tags": ["AI", "Productivity", "Web Development"]
 }
 
 Response (201 Created):
 {
   "message": "Project and its Workspace Created",
   "project": {
     "_id": "507f1f77bcf86cd799439012",
     "title": "AI-Powered Task Manager",
     "createdBy": "507f1f77bcf86cd799439011",
     "collaborators": ["507f1f77bcf86cd799439011"],
     ...
   },
   "workspace": { ... }
 }
 ```
 
 #### 6. Get My Projects
 
 ```http
 GET /projects/my-projects
 Authorization: Bearer <JWT_TOKEN>
 
 Response (200 OK):
 {
   "projects": [
     {
       "_id": "507f1f77bcf86cd799439012",
       "title": "AI-Powered Task Manager",
       "description": "...",
       "techStack": ["React", "Node.js"],
       "collaborators": [...]
     }
   ]
 }
 ```
 
 #### 7. Get My Collaborations
 
 ```http
 GET /projects/my-collaborations
 Authorization: Bearer <JWT_TOKEN>
 
 Response (200 OK):
 {
   "collaborations": [...]
 }
 ```
 
 #### 8. Search Projects
 
 ```http
 GET /projects/search-projects?query=AI&techStack=Python,TensorFlow&tags=Machine Learning
 Authorization: Bearer <JWT_TOKEN>
 
 Response (200 OK):
 {
   "projects": [...]
 }
 ```
 
 #### 9. Invite Developer to Project
 
 ```http
 POST /projects/:projectId/invite/:userIdToInvite
 Authorization: Bearer <JWT_TOKEN>
 
 Response (200 OK):
 {
   "message": "Invitation sent successfully"
 }
 ```
 
 #### 10. Accept/Reject Join Request
 
 ```http
 PUT /projects/:projectId/request/accept/:acceptRequestedUserId
 Authorization: Bearer <JWT_TOKEN>
 
 DELETE /projects/:projectId/request/reject/:rejectRequestedUserId
 Authorization: Bearer <JWT_TOKEN>
 ```
 
 ### Recommendation Endpoints
 
 #### 11. Get Project Recommendations
 
 ```http
 GET /recommendations/projects
 Authorization: Bearer <JWT_TOKEN>
 
 Response (200 OK):
 {
   "recommendations": [
     {
       "_id": "507f1f77bcf86cd799439012",
       "title": "AI-Powered Task Manager",
       "similarity": 0.85,
       "techStack": ["React", "Python"],
       ...
     }
   ]
 }
 ```
 
 #### 12. Get Developer Recommendations
 
 ```http
 GET /recommendations/users/:projectId
 Authorization: Bearer <JWT_TOKEN>
 
 Response (200 OK):
 {
   "recommendations": [
     {
       "_id": "507f1f77bcf86cd799439013",
       "name": "Jane Smith",
       "similarity": 0.92,
       "skills": ["Python", "TensorFlow"],
       ...
     }
   ]
 }
 ```
 
 ### Error Responses
 
 All endpoints may return the following error responses:
 
 ```json
 // 400 Bad Request
 {
   "error": "Invalid input data",
   "details": "..."
 }
 
 // 401 Unauthorized
 {
   "message": "No token, authorization denied"
 }
 
 // 403 Forbidden
 {
   "message": "Not authorized to access this resource"
 }
 
 // 404 Not Found
 {
   "message": "Resource not found"
 }
 
 // 500 Internal Server Error
 {
   "message": "Server Error",
   "error": "..."
 }
 ```
 
 ---
 
 ## 📁 Project Structure
 
 ```
 DevCollab/
 ├── Frontend/                    # React frontend application
 │   ├── public/                  # Static assets
 │   ├── src/
 │   │   ├── api/
 │   │   │   └── axios.js         # Axios configuration with interceptors
 │   │   ├── assets/              # Images, fonts, etc.
 │   │   ├── blocks/              # Reusable UI blocks
 │   │   │   ├── Backgrounds/     # Animated backgrounds
 │   │   │   └── Components/      # Complex components
 │   │   ├── components/
 │   │   │   └── ui/              # shadcn/ui components (button, card, etc.)
 │   │   ├── context/
 │   │   │   ├── AuthContext.jsx  # Authentication state management
 │   │   │   └── useAuth.js       # Custom auth hook
 │   │   ├── pages/               # Page components
 │   │   │   ├── Homepage.jsx     # Landing page
 │   │   │   ├── SignupPage.jsx   # User registration
 │   │   │   ├── LoginPage.jsx    # User login
 │   │   │   ├── CompleteProfilePage.jsx  # Profile setup
 │   │   │   ├── Dashboard.jsx    # Main dashboard
 │   │   │   ├── ViewProfile.jsx  # User profile view
 │   │   │   ├── CreateProjectPage.jsx  # Project creation
 │   │   │   ├── ProjectPage/
 │   │   │   │   ├── ProjectPage.jsx  # Project details
 │   │   │   │   └── searchAndInviteDevs.jsx  # Developer search
 │   │   │   └── sharedViews/     # Reusable views
 │   │   ├── router/
 │   │   │   └── routes.jsx       # Route definitions
 │   │   ├── tools/               # Utility components
 │   │   │   ├── MainNavbar.jsx   # Main navigation
 │   │   │   ├── Navbar.jsx       # Secondary navigation
 │   │   │   └── ProtectedRoute.jsx  # Route guards
 │   │   ├── utils/               # Helper functions
 │   │   │   ├── getUserIdFromToken.js  # JWT decoding
 │   │   │   └── logout.js        # Logout utility
 │   │   ├── App.jsx              # Root component
 │   │   ├── main.jsx             # Entry point
 │   │   └── index.css            # Global styles
 │   ├── components.json          # shadcn/ui configuration
 │   ├── package.json             # Frontend dependencies
 │   ├── vite.config.js           # Vite configuration
 │   └── tailwind.config.js       # Tailwind CSS configuration
 │
 ├── Backend/                     # Express.js backend application
 │   ├── config/
 │   │   ├── db.js                # MongoDB connection
 │   │   └── passport.js          # Passport.js OAuth configuration
 │   ├── controllers/
 │   │   ├── authController.js    # Authentication logic
 │   │   ├── projectController.js # Project CRUD operations
 │   │   ├── recommendationController.js  # Recommendation logic
 │   │   └── workspaceController.js  # Workspace management
 │   ├── middleware/
 │   │   ├── protect.js           # JWT authentication middleware
 │   │   └── checkProjectMember.js  # Authorization middleware
 │   ├── models/
 │   │   ├── User.js              # User schema
 │   │   ├── Project.js           # Project schema
 │   │   ├── Workspace.js         # Workspace schema
 │   │   └── Chat_Feature/        # (Future: Real-time chat models)
 │   ├── routes/
 │   │   └── api/
 │   │       ├── authRoutes.js    # Auth endpoints
 │   │       ├── projectRoutes.js # Project endpoints
 │   │       └── recommendationRoutes.js  # Recommendation endpoints
 │   ├── utils/
 │   │   └── authGenerationToken.js  # JWT generation
 │   ├── validators/
 │   │   └── authValidatorCheck.js  # Input validation
 │   ├── server.js                # Express server entry point
 │   ├── package.json             # Backend dependencies
 │   └── .env                     # Environment variables (create this)
 │
 ├── ai-recommendation-api/       # Python Flask AI service
 │   ├── app.py                   # Flask application
 │   ├── requirements.txt         # Python dependencies
 │   └── runtime.txt              # Python version specification
 │
 ├── package.json                 # Root dependencies (concurrently)
 ├── README.md                    # This file
 ├── LICENSE                      # GPL v3 License
 ├── Document.md                  # Additional documentation
 └── ToDo.md                      # Development roadmap
 ```
 
 ### Key Files Explained
 
 #### Frontend
 
 - **`src/api/axios.js`**: Configures Axios with base URL and request/response interceptors for automatic token injection
 - **`src/context/AuthContext.jsx`**: Manages global authentication state (user, token, login/logout functions)
 - **`src/router/routes.jsx`**: Defines all application routes using React Router
 - **`src/pages/Dashboard.jsx`**: Main dashboard with project recommendations and management
 - **`components.json`**: Configuration for shadcn/ui component imports
 
 #### Backend
 
 - **`server.js`**: Express app setup, middleware, and route mounting
 - **`config/db.js`**: MongoDB connection with error handling
 - **`config/passport.js`**: Google OAuth 2.0 strategy configuration
 - **`middleware/protect.js`**: JWT verification middleware for protected routes
 - **`middleware/checkProjectMember.js`**: Verifies user is project owner/collaborator
 - **`controllers/projectController.js`**: Business logic for project operations (678 lines - comprehensive)
 - **`models/User.js`**: User schema with skills, interests, OAuth support
 
 #### AI Service
 
 - **`app.py`**: Flask application with two recommendation endpoints
   - `/recommend-projects`: TF-IDF + Cosine Similarity for project matching
   - `/recommend-users`: TF-IDF + Cosine Similarity for developer matching
 
 ---
 
 ## 🤖 AI Recommendation System
 
 ### How It Works
 
 DevCollab's recommendation engine uses **Natural Language Processing (NLP)** and **Machine Learning** to match developers with projects based on semantic similarity.
 
 ### Algorithm: TF-IDF + Cosine Similarity
 
 #### Step 1: Data Preparation
 
 **For Project Recommendations:**
 
 ```python
 # Combine user skills and interests
 user_text = "React Node.js Python Machine Learning Web Development"
 
 # Combine project tech stack and tags
 project_texts = [
     "React Node.js MongoDB Web Development",
     "Python TensorFlow PyTorch Machine Learning",
     ...
 ]
 ```
 
 **For Developer Recommendations:**
 
 ```python
 # Combine project tech stack and tags
 project_text = "React Node.js MongoDB Web Development"
 
 # Combine developer skills and interests
 developer_texts = [
     "React TypeScript Frontend Web Development",
     "Python Django Backend APIs",
     ...
 ]
 ```
 
 #### Step 2: TF-IDF Vectorization
 
 **TF-IDF** (Term Frequency-Inverse Document Frequency) converts text into numerical vectors:
 
 - **Term Frequency (TF)**: How often a word appears in a document
 - **Inverse Document Frequency (IDF)**: How unique a word is across all documents
 - **TF-IDF Score**: TF × IDF (high for important, unique terms)
 
 ```python
 from sklearn.feature_extraction.text import TfidfVectorizer
 
 vectorizer = TfidfVectorizer(stop_words='english')
 # Converts: "React Node.js Python" → [0.45, 0.67, 0.89, ...]
 ```
 
 #### Step 3: Cosine Similarity Calculation
 
 **Cosine Similarity** measures the angle between two vectors (0 = no similarity, 1 = identical):
 
 ```python
 from sklearn.metrics.pairwise import cosine_similarity
 
 # Calculate similarity between user vector and all project vectors
 similarities = cosine_similarity(user_vector, project_vectors)
 # Result: [0.85, 0.42, 0.91, ...] (one score per project)
 ```
 
 **Visual Representation:**
 
 ```
 User Skills Vector:    [0.5, 0.8, 0.3]  ←→
 Project Vector:        [0.6, 0.7, 0.4]     Angle = 12° → Similarity = 0.92
 
 User Skills Vector:    [0.5, 0.8, 0.3]  ←→
 Different Project:     [0.1, 0.2, 0.9]     Angle = 68° → Similarity = 0.31
 ```
 
 #### Step 4: Ranking and Filtering
 
 ```python
 # Sort projects by similarity score (high to low)
 recommended_projects = projects_df.sort_values(by='similarity', ascending=False)
 
 # Filter: only show projects with similarity >= threshold
 filtered = recommended_projects[recommended_projects['similarity'] >= 0.0]
 
 # Return top 10 recommendations
 return filtered.head(10)
 ```
 
 ### Example Workflow
 
 **User Profile:**
 
 ```json
 {
   "skills": ["React", "Node.js", "MongoDB", "Express"],
   "interests": ["Web Development", "Full Stack", "APIs"]
 }
 ```
 
 **Available Projects:**
 
 ```json
 [
   {
     "title": "E-commerce Platform",
     "techStack": ["React", "Node.js", "MongoDB"],
     "tags": ["Web Development", "Full Stack"]
     // → Similarity: 0.94 (Excellent match!)
   },
   {
     "title": "Machine Learning Model",
     "techStack": ["Python", "TensorFlow", "Pandas"],
     "tags": ["AI", "Data Science"]
     // → Similarity: 0.12 (Poor match)
   }
 ]
 ```
 
 **Recommendation Result:**
 
 ```json
 [
   {
     "_id": "...",
     "title": "E-commerce Platform",
     "similarity": 0.94 // 94% match!
   }
 ]
 ```
 
 ### Why This Approach?
 
 ✅ **Scalable**: Handles thousands of users and projects efficiently  
 ✅ **Accurate**: Semantic understanding of skills and technologies  
 ✅ **Fast**: Pre-computed vectors enable real-time recommendations  
 ✅ **Language-Agnostic**: Works with any text-based data  
 ✅ **Proven**: Industry-standard NLP technique used by Netflix, Spotify, etc.
 
 ### API Endpoints
 
 #### Recommend Projects for User
 
 ```python
 POST http://localhost:5001/recommend-projects
 Content-Type: application/json
 
 {
   "target_user": {
     "skills": ["React", "Node.js"],
     "interests": ["Web Development"]
   },
   "projects": [
     {
       "_id": "123",
       "techStack": ["React", "MongoDB"],
       "tags": ["Web Development"]
     }
   ]
 }
 
 # Response:
 [
   {"_id": "123", "similarity": 0.89}
 ]
 ```
 
 #### Recommend Developers for Project
 
 ```python
 POST http://localhost:5001/recommend-users
 Content-Type: application/json
 
 {
   "target_project": {
     "techStack": ["Python", "Flask"],
     "tags": ["Backend", "APIs"]
   },
   "users": [
     {
       "_id": "456",
       "skills": ["Python", "Django", "Flask"],
       "interests": ["Backend Development"]
     }
   ]
 }
 
 # Response:
 [
   {"_id": "456", "similarity": 0.92}
 ]
 ```
 
 ---
 
 ## 🔒 Security
 
 DevCollab implements multiple layers of security to protect user data and prevent unauthorized access.
 
 ### Authentication Security
 
 #### 1. Password Security
 
 - **Argon2 Hashing**: Industry-leading password hashing algorithm
   - Winner of the Password Hashing Competition (2015)
   - Resistant to GPU/ASIC attacks
   - Configurable memory and CPU cost
   ```javascript
   const hashedPassword = await argon2.hash(password);
   // Result: $argon2id$v=19$m=65536,t=3,p=4$...
   ```
 
 #### 2. JWT Token Management
 
 - **Token Structure**: Header + Payload + Signature
 - **Expiration**: Configurable token lifetime
 - **Secure Storage**: Tokens stored in Context API (memory), not localStorage
 - **Signature Verification**: HMAC-SHA256 with secret key
 
 ```javascript
 // Token generation
 const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
   expiresIn: "7d",
 });
 
 // Token verification (middleware)
 const decoded = jwt.verify(token, process.env.JWT_SECRET);
 ```
 
 #### 3. OAuth 2.0 (Google)
 
 - **No Password Storage**: OAuth users don't have passwords in database
 - **Secure Callback**: Server-side token exchange
 - **Scope Limitation**: Only request necessary permissions (profile, email)
 
 ### Authorization
 
 #### Route Protection
 
 ```javascript
 // Middleware chain for protected routes
 router.post(
   "/projects/:projectId/invite/:userId",
   protect, // 1. Verify JWT token
   checkProjectMembership, // 2. Verify user is project owner
   inviteToProject // 3. Execute controller
 );
 ```
 
 #### Role-Based Access Control (RBAC)
 
 - **Owner**: Full project control (invite, accept/reject, delete)
 - **Collaborator**: View workspace, contribute (future features)
 - **Non-Member**: Can only view public project details
 
 ### Network Security
 
 #### CORS Configuration
 
 ```javascript
 const allowedOrigins = [
   "http://localhost:5173", // Development frontend
   process.env.FRONTEND_URI, // Production frontend
 ];
 
 app.use(
   cors({
     origin: function (origin, callback) {
       if (!origin || allowedOrigins.includes(origin)) {
         callback(null, true);
       } else {
         callback(new Error("Not allowed by CORS"));
       }
     },
   })
 );
 ```
 
 ### Input Validation
 
 #### Express Validator
 
 ```javascript
 // Example: Signup validation
 body("email").isEmail().normalizeEmail(),
   body("password").isLength({ min: 8 }),
   body("username").isAlphanumeric().trim();
 ```
 
 #### Mongoose Schema Validation
 
 ```javascript
 email: {
   type: String,
   required: true,
   unique: true,
   lowercase: true  // Auto-normalize
 }
 ```
 
 ### Best Practices Implemented
 
 ✅ **Environment Variables**: Sensitive data (secrets, API keys) in `.env`  
 ✅ **No Sensitive Logs**: Passwords never logged  
 ✅ **HTTPS Ready**: Works with SSL/TLS in production  
 ✅ **Secure Headers**: Helmet.js ready (recommended for production)  
 ✅ **Rate Limiting Ready**: Can add express-rate-limit for API protection  
 ✅ **SQL Injection Immune**: MongoDB prevents SQL injection by design  
 ✅ **XSS Protection**: React escapes user input by default
 
 ### Security Recommendations for Production
 
 ```bash
 npm install helmet express-rate-limit express-mongo-sanitize
 ```
 
 ```javascript
 // Add to server.js
 import helmet from "helmet";
 import rateLimit from "express-rate-limit";
 import mongoSanitize from "express-mongo-sanitize";
 
 app.use(helmet()); // Security headers
 app.use(mongoSanitize()); // Prevent NoSQL injection
 app.use(
   rateLimit({
     windowMs: 15 * 60 * 1000, // 15 minutes
     max: 100, // Limit each IP to 100 requests per window
   })
 );
 ```
 
 ---
 
 ## 🤝 Contributing
 
 We welcome contributions to DevCollab! Whether it's bug fixes, new features, documentation improvements, or suggestions, your help is appreciated.
 
 ### How to Contribute
 
 #### 1. Fork the Repository
 
 Click the "Fork" button at the top right of the repository page.
 
 #### 2. Clone Your Fork
 
 ```bash
 git clone https://github.com/your-username/DevCollab.git
 cd DevCollab
 ```
 
 #### 3. Create a Feature Branch
 
 ```bash
 git checkout -b feature/amazing-feature
 # Or for bug fixes:
 git checkout -b fix/bug-description
 ```
 
 #### 4. Make Your Changes
 
 - Follow existing code style and conventions
 - Add comments for complex logic
 - Update documentation if needed
 
 #### 5. Test Your Changes
 
 ```bash
 # Run backend tests (when available)
 cd Backend
 npm test
 
 # Run frontend tests (when available)
 cd Frontend
 npm test
 ```
 
 #### 6. Commit Your Changes
 
 ```bash
 git add .
 git commit -m "feat: Add amazing new feature"
 ```
 
 **Commit Message Convention:**
 
 - `feat:` New feature
 - `fix:` Bug fix
 - `docs:` Documentation changes
 - `style:` Code style changes (formatting, etc.)
 - `refactor:` Code refactoring
 - `test:` Adding tests
 - `chore:` Maintenance tasks
 
 #### 7. Push to Your Fork
 
 ```bash
 git push origin feature/amazing-feature
 ```
 
 #### 8. Create a Pull Request
 
 - Go to the original repository
 - Click "New Pull Request"
 - Select your feature branch
 - Describe your changes clearly
 - Reference any related issues
 
 ### Contribution Guidelines
 
 #### Code Style
 
 - **JavaScript/React**: Follow ESLint configuration
 - **Python**: Follow PEP 8 style guide
 - **Indentation**: 2 spaces for JS/JSX, 4 spaces for Python
 - **Naming**: camelCase for JS, snake_case for Python
 
 #### Documentation
 
 - Update README if adding features
 - Add JSDoc comments for complex functions
 - Include examples for new API endpoints
 
 #### Testing
 
 - Write unit tests for new functions
 - Test all user flows manually
 - Ensure no console errors in browser
 
 ### Reporting Bugs
 
 **Before Submitting:**
 
 1. Check if the bug is already reported in Issues
 2. Try to reproduce the bug in a clean environment
 
 **Bug Report Template:**
 
 ```markdown
 **Describe the bug**
 A clear description of what the bug is.
 
 **To Reproduce**
 Steps to reproduce the behavior:
 
 1. Go to '...'
 2. Click on '...'
 3. See error
 
 **Expected behavior**
 What you expected to happen.
 
 **Screenshots**
 If applicable, add screenshots.
 
 **Environment:**
 
 - OS: [e.g., Windows 11]
 - Browser: [e.g., Chrome 120]
 - Node.js Version: [e.g., 18.17.0]
 ```
 
 ### Feature Requests
 
 We love new ideas! Open an issue with the "Feature Request" label.
 
 **Feature Request Template:**
 
 ```markdown
 **Problem Statement**
 What problem does this feature solve?
 
 **Proposed Solution**
 How would this feature work?
 
 **Alternatives Considered**
 Any alternative solutions you've thought about?
 
 **Additional Context**
 Mockups, examples, or references.
 ```
 
 ### Code of Conduct
 
 - Be respectful and inclusive
 - Provide constructive feedback
 - Focus on what is best for the community
 - Show empathy towards other contributors
 
 ---
 
 ## 🚀 Future Roadmap
 
 ### Phase 1: Core Enhancements (Q1 2026)
 
 #### Real-Time Features
 
 - ✅ **WebSocket Integration**: Socket.io for real-time updates
 - ✅ **Live Chat**: Direct messaging between collaborators
 - ✅ **Group Chat**: Project-specific chat rooms
 - ✅ **Notifications**: Real-time alerts for invites, requests, messages
 
 #### Search & Discovery
 
 - ✅ **Advanced Search**: Multi-criteria filtering with sorting
 - ✅ **Trending Projects**: Most active/popular projects
 - ✅ **Developer Leaderboard**: Contribution metrics
 - ✅ **Tag-Based Discovery**: Browse by technology tags
 
 ### Phase 2: Collaboration Tools (Q2 2026)
 
 #### Project Management
 
 - ✅ **Task Management**: Kanban boards for project tasks
 - ✅ **File Sharing**: Upload and share project files
 - ✅ **Code Repository Integration**: Link GitHub/GitLab repos
 - ✅ **Milestone Tracking**: Set and monitor project milestones
 
 #### Communication
 
 - ✅ **Video Calls**: Integrated video conferencing
 - ✅ **Screen Sharing**: Collaborate in real-time
 - ✅ **Code Review Tools**: In-platform code review
 
 ### Phase 3: AI & Analytics (Q3 2026)
 
 #### Enhanced AI Features
 
 - ✅ **Skill Gap Analysis**: Identify missing skills in your profile
 - ✅ **Learning Recommendations**: Suggest courses based on interests
 - ✅ **Team Composition AI**: Recommend optimal team structures
 - ✅ **Project Success Prediction**: ML model to predict project outcomes
 
 #### Analytics Dashboard
 
 - ✅ **User Analytics**: Track your collaboration activity
 - ✅ **Project Analytics**: Monitor project health and progress
 - ✅ **Recommendation Insights**: Why projects were recommended
 
 ### Phase 4: Monetization & Growth (Q4 2026)
 
 #### Premium Features
 
 - ✅ **DevCollab Pro**: Premium membership with advanced features
 - ✅ **Project Promotion**: Boost project visibility
 - ✅ **Advanced Analytics**: Detailed insights and reports
 - ✅ **Priority Support**: Dedicated support channel
 
 #### Community Features
 
 - ✅ **Developer Portfolios**: Showcase your work and projects
 - ✅ **Project Showcases**: Public project galleries
 - ✅ **Achievement Badges**: Gamification for engagement
 - ✅ **Community Forums**: Discussion boards for topics
 
 ### Phase 5: Enterprise (2027)
 
 - ✅ **Team Accounts**: Organization-level accounts
 - ✅ **Private Projects**: Enterprise-only project visibility
 - ✅ **Custom Integrations**: API for third-party integrations
 - ✅ **On-Premise Deployment**: Self-hosted option for enterprises
 
 ### Technical Improvements
 
 #### Performance
 
 - ✅ **Caching Layer**: Redis for faster data retrieval
 - ✅ **CDN Integration**: Global content delivery
 - ✅ **Database Optimization**: Indexing and query optimization
 - ✅ **Load Balancing**: Horizontal scaling for high traffic
 
 #### Testing & Quality
 
 - ✅ **Unit Tests**: Comprehensive test coverage
 - ✅ **Integration Tests**: End-to-end testing
 - ✅ **CI/CD Pipeline**: Automated testing and deployment
 - ✅ **Performance Monitoring**: APM tools (New Relic, DataDog)
 
 #### DevOps
 
 - ✅ **Docker Containers**: Containerized deployment
 - ✅ **Kubernetes**: Orchestration for scalability
 - ✅ **Automated Backups**: Database backup automation
 - ✅ **Monitoring & Logging**: Centralized logging (ELK stack)
 
 ### Community Contributions Welcome!
 
 Want to work on any of these features? Check our [Contributing Guide](#contributing) and open an issue to discuss your implementation plan!
 
 ---
 
 ## 📜 License
 
 This project is licensed under the **GNU General Public License v3.0** (GPL-3.0).
 
 ### What This Means
 
 ✅ **You CAN**:
 
 - Use this software for personal or commercial purposes
 - Modify the source code
 - Distribute the original or modified software
 - Use this software privately
 
 ❌ **You MUST**:
 
 - Disclose the source code when distributing
 - Include the original license and copyright notice
 - State significant changes made to the code
 - Use the same GPL-3.0 license for derivatives
 
 ❌ **You CANNOT**:
 
 - Hold the authors liable for damages
 - Use the authors' names for endorsement without permission
 
 ### Full License
 
 See the [LICENSE](LICENSE) file for the complete GPL-3.0 license text.
 
 ### Third-Party Licenses
 
 This project uses open-source libraries with their own licenses:
 
 - React, Express.js, Flask: MIT License
 - MongoDB: Server Side Public License (SSPL)
 - TailwindCSS: MIT License
 - (See package.json files for complete dependency lists)
 
 ---
 
 ## 📞 Contact
 
 ### Project Information
 
 - **Project Name**: DevCollab
 - **Version**: 1.0.0 (MVP)
 - **Status**: Active Development
 - **Deployed URL**: [https://dhanushhn05-devcolab-webapp.netlify.app/](https://dhanushhn05-devcolab-webapp.netlify.app/)
 
 ### Connect With Us
 
 - **GitHub Repository**: [https://github.com/yourusername/DevCollab](https://github.com/yourusername/DevCollab)
 - **Issue Tracker**: [https://github.com/yourusername/DevCollab/issues](https://github.com/yourusername/DevCollab/issues)
 - **Discussions**: [https://github.com/yourusername/DevCollab/discussions](https://github.com/yourusername/DevCollab/discussions)
 
 ### Project Maintainer
 
 - **Name**: Dhanush H N
 - **Role**: Full-Stack Developer & Project Lead
 - **GitHub**: [@dhanushhn05](https://github.com/dhanushhn05)
 
 ### Support
 
 - **Bug Reports**: Open an Issue
 - **Feature Requests**: Open an Issue
 - **Questions**: Start a Discussion
 
 ---
 
 ## 🙏 Acknowledgments
 
 ### Technologies & Libraries
 
 Special thanks to the creators and maintainers of:
 
 - **React Team** - For the amazing UI library
 - **Vite** - For the blazing-fast build tool
 - **Express.js** - For the minimalist web framework
 - **MongoDB** - For the flexible NoSQL database
 - **Scikit-learn** - For machine learning tools
 - **shadcn/ui** - For beautiful UI components
 - **TailwindCSS** - For utility-first CSS framework
 
 ### Inspiration
 
 DevCollab was inspired by:
 
 - **GitHub** - For developer collaboration features
 - **LinkedIn** - For professional networking concepts
 - **Devpost** - For hackathon collaboration workflows
 - **Stack Overflow** - For developer community engagement
 
 ### Resources
 
 - **MDN Web Docs** - Comprehensive web development documentation
 - **freeCodeCamp** - Educational resources and community
 - **Dev.to Community** - Inspiration and best practices
 
 ---
 
 ## 📈 Project Statistics
 
 - **Lines of Code**: ~10,000+
 - **Components**: 30+ React components
 - **API Endpoints**: 20+ RESTful endpoints
 - **Database Models**: 4 main models (User, Project, Workspace, Invitations)
 - **Dependencies**: 50+ npm packages, 5+ Python packages
 - **Development Time**: 2025-2026
 - **Contributors**: Open to contributions!
 
 ---
 
 <div align="center">
 
 ### ⭐ Star this project if you find it useful!
 
 **Made with ❤️ by developers, for developers**
 
 [Report Bug](https://github.com/yourusername/DevCollab/issues) · [Request Feature](https://github.com/yourusername/DevCollab/issues) · [Contribute](https://github.com/yourusername/DevCollab/pulls)
 
 ---
 
 **© 2026 DevCollab. Licensed under GPL-3.0.**
 
 </div>
 