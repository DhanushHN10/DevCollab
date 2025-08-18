# DevCollab : AI - Pwered Collaboration Platform for Developers  ( MVP )

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
 // To be added