# 🎯 Peer-to-Peer Mock Interview Platform

## 📌 Objective

The goal of this project is to build a **peer-to-peer mock interview platform** where users can:

- Schedule and conduct **mock interviews** with peers.
- Share **feedback & ratings** to improve skills.
- Track **performance over time** and build confidence for real interviews.
- Provide an ecosystem for **college students, professionals, and mentors** to collaborate and prepare.

This helps job seekers **practice, learn, and improve** in a structured environment.

---

## 🚀 Features

- 🔐 **Authentication & Authorization** (JWT, role-based: User/Admin)
- 👤 **User Profiles** (bio, skills, interests, organizations, colleges)
- 📅 **Interview Scheduling** (interviewer & interviewee with time slots)
- 📹 **Video Call Integration** (via meeting link)
- 📝 **Feedback System** (comments, ratings, email notifications)
- 📊 **Performance Tracking** (history of feedback & ratings)
- 🏆 **Points & Referrals** (gamification system to encourage usage)
- 🏛 **Organization & College Support** (grouping users for collaboration)

---

## 🛠 Tech Stack

- **Frontend**: [Next.js](https://nextjs.org/), [React](https://react.dev/), [TailwindCSS](https://tailwindcss.com/)
- **Backend**: [Node.js](https://nodejs.org/), [Express.js](https://expressjs.com/)
- **Database**: [PostgreSQL](https://www.postgresql.org/) with [Prisma ORM](https://www.prisma.io/)
- **Auth**: JWT, OAuth provider accounts

---

## 🗂 Database Schema (ERD)

```mermaid
erDiagram
    User ||--o{ Interview : "interviewer"
    User ||--o{ Interview : "interviewee"
    User ||--o{ Feedback : "feedbackGiven"
    User ||--o{ Feedback : "feedbackReceived"
    User ||--o{ Account : "has"

    Account }o--|| User : "belongs to"

    Interview ||--o{ Feedback : "has"

    User {
        BigInt id PK
        String fullName
        String email
        String password
        Role role
        String bio
        String[] skills
        String[] interests
    }

    Account {
        BigInt id PK
        BigInt userId FK
        String provider
        String providerId
    }

    Interview {
        BigInt id PK
        BigInt interviewerId FK
        BigInt intervieweeId FK
        DateTime scheduledAt
        Int durationMin
        InterviewStatus status
    }

    Feedback {
        BigInt id PK
        BigInt interviewId FK
        BigInt giverId FK
        BigInt receiverId FK
        String comments
        Int rating
    }
