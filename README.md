
![SocialVista logIn](https://github.com/bharathan01/SocialVista/blob/main/frontend/public/images/Screenshot%202024-10-03%20011456.png)![SocialVista Homepage](https://github.com/bharathan01/SocialVista/blob/main/frontend/public/images/Screenshot%202024-10-03%20011431.png)


SOCIALVISTA - A SOCIAL MEDIA PLATFORM
--------------------------------------

Welcome to SocialVista, a feature-rich social media platform where users can interact, share content, and engage with others. This platform allows users to post, like, comment, follow/unfollow users, and engage in real-time chat. Additional features include live news updates, Google authentication, real-time notifications, and responsive design.

FEATURES
--------

1. User Authentication:
   - Secure login/signup using JWT for session management.
   - Google login using Firebase Authentication.

2. Post Management:
   - Create, update, and delete posts.
   - Like and comment on posts.
   - Share and save posts.

3. Follow/Unfollow Users:
   - Follow users to see their posts on your feed.
   - Unfollow users to stop seeing their posts.

4. Live Chat:
   - Real-time one-to-one chat using WebSocket (Socket.IO).

5. Notifications:
   - Real-time notifications for activities like likes, comments, and follows.

6. Feeds Page:
   - View posts from users you follow on the home feed.

7. News Feed:
   - Get live daily news directly within the app.

8. Media Management:
   - Store and manage images and videos with Cloudinary.

9. Responsive Design:
   - The platform is fully responsive and optimized for all devices, including desktops, tablets, and mobile phones.

10. User Suggestions:
   - Get personalized user suggestions based on followers, interactions, and preferences.

TECHNOLOGY STACK
----------------

- Frontend: React.js (MERN Stack), Tailwind CSS, DaisyUI
- Backend: Node.js, Express.js
- Database: MongoDB
- Real-time Communication: WebSocket (Socket.IO)
- Authentication: JWT and Google Authentication (Firebase)
- Media Storage: Cloudinary
- Notifications: Real-time notifications for user activity

PROJECT ARCHITECTURE
--------------------

This project follows the MVC (Model-View-Controller) architecture:
- **Model**: Defines data structure (e.g., users, posts, comments).
- **View**: React components rendering the user interface.
- **Controller**: Handles the application logic and user interactions.

SETUP AND INSTALLATION
----------------------

Prerequisites:
- Node.js v14.x or higher
- MongoDB (local or MongoDB Atlas)
- Cloudinary account for image/video storage
- Firebase for Google Authentication
- Socket.IO for live chat functionality

Installation Steps:
1. Clone the repository:
   `git clone https://github.com/your-username/socialvista.git`

2. Install backend dependencies:
   `cd server`
   `npm install`

3. Set up environment variables:
   Create a `.env` file in the `server` directory 
4. Start the backend server:
`npm start`

5. Install frontend dependencies:
`cd ../client`
`npm install`

6. Start the frontend application:
`npm start`
