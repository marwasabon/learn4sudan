# 🌍 Learn 4 Sudan – E-Learning Provider

> A dynamic web platform for the **Learn 4 Sudan** non-profit organization.  
> It empowers the organization to manage members, share educational updates, and offer verified scholarship opportunities and online courses to Sudanese youth.

> Live demo [_here_](https://www.learn4sudan.org)  
 
---

## 🧭 Table of Contents

* [General Info](#general-information)
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Screenshots](#screenshots)
* [Setup](#setup)
* [Usage](#usage)
* [Project Status](#project-status)
* [Room for Improvement](#room-for-improvement)
* [Acknowledgements](#acknowledgements)
* [Contact](#contact)

---

## General Information

**Learn 4 Sudan**  "Learn for Sudan" is a non-profit organization aimed at supporting youth in the field of learning and development. The organization seeks to provide the necessary means and resources to build a generation capable of driving the country toward progress and prosperity.

The main goal is to make education accessible for everyone in Sudan by allowing users to:

* Apply for scholarships and online courses.
* Join the Learn for Sudan community and receive learning invitations.
* Access posts, updates, and resources managed by the organization’s team.

**Why this project matters:**
Sudan has a growing community of young learners eager to build their skills but limited access to structured online platforms. This project provides a digital bridge — allowing the Learn for Sudan staff to manage members, share updates, and support thousands of students securely.

---

## Technologies Used

* **Frontend:** React  +  CSS
* **Backend:** Express.js (Node.js)
* **Database:** MongoDB (Mongoose)
* **File Handling:** TBD

---

## Features

* single-page website for Learn 4 Sudan incorporating all major components (Homepage + About + Programs + Scholarship Application)
*  Responsive and accessible design for all devices.
*  Secure **user registration and login** (with Google Sign-In).
*  allows users to apply for courser scholarshop and online courses
*  sends automatic Coursera  invitation link for approved applicantion.
*  Dynamic post creation (news, opportunities, and updates).
 
---

## Screenshots

> <img width="1440" height="3357" alt="About" src="https://github.com/user-attachments/assets/7ae3f094-71ca-4530-ac93-765260e5820e" />
<img width="1440" height="1727" alt="Contact" src="https://github.com/user-attachments/assets/93882b60-6649-4eab-94dd-3d466b7c1d09" />
<img width="1440" height="3503" alt="Blog" src="https://github.com/user-attachments/assets/b09e4585-52ba-4837-9be3-00a07aaa4839" />
<img width="1440" height="2899" alt="Landing" src="https://github.com/user-attachments/assets/4cb81a80-f3f1-4b81-aea2-906d35895722" />
<img width="1440" height="900" alt="Success" src="https://github.com/user-attachments/assets/83e229a1-da07-4d5c-9574-c479d3a9348b" />


Example page layout:

* Homepage showcasing mission, goals, and latest updates.
* Scholarship application form with ID upload.
* Admin dashboard for managing users and posts.

---

##  Setup

### Requirements

Make sure you have installed:

* Node.js (v18 or higher)
* MongoDB
* npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/learn4sudan/learn4sudan-app.git

# Navigate to project folder
cd learn4sudan-app

# Install dependencies for backend and frontend
cd backend && npm install
cd ../frontend && npm install
```

### Running the project

```bash
# Run backend
cd backend
npm start

# Run frontend (in another terminal)
cd frontend
npm start
```

Then open **[http://localhost:3000](http://localhost:3000)** in your browser.

---

## Usage

* **Users:**
  Visit the site, sign up (or sign in with Google), and fill out the scholarship form.
  Upload your national ID for verification — the system automatically validates your details.

* **Admin/Staff:**
  Log in to access the dashboard where you can:

  * Approve or reject scholarship applications.
  * Post news or updates.
  * Manage registered members.


---

##  Project Status

**Project is:**  *In Progress*

---

## Room for Improvement

**Areas to enhance:**

* ID upload and **OCR-based verification** and also for non-English IDs.
* Add multi-language support (Arabic + English).
* Implement analytics for tracking learning progress.
* Admin dashboard to **manage members, posts, and scholarships**.

**To Do:**

* [ ] Email notifications for approved applicants
* [ ] Role-based access (Admin / Reviewer / Student)
* [ ] Integration with Coursera’s partner API

---

## Acknowledgements

* Inspired by the mission of **Learn 4 Sudan** and its incredible volunteers.
---

## Contact

Created by **@MarwaSabon** for **Learn for Sudan** 🌍
Feel free to reach out for collaboration or feedback!

📧 **[contact@learn4sudan.org](mailto:contact@learn4sudan.org)**
🔗 [Facebook: Learn4Sudan](https://www.facebook.com/Learn4Sudan)

---


