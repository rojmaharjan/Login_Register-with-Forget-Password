## About the Project

This project is a **Login_Registeration** form with attach of dashboard connection built by using **React** for the frontend and **Node.js** for the backend. The application allows users to register, log in, and access a personalized dashboard.

### Key Features:
- **User Registration:** Allows new users to create an account using their email and password.
- **Login System:** Authenticated users can log in and access their secure dashboard.
- **Forgot Password:** Users can reset their password through an email verification process.
- **reCAPTCHA Verification:** Added security during login to prevent bot logins.

### Functionality:
This React component handles user authentication through login and registration forms, ensuring smooth user interaction with proper validation and security checks.

- **Sign-Up / Sign-In Toggle:** The user can easily toggle between the registration and login forms.
- **Form Handling:** Form inputs are managed via state, and input changes are updated accordingly.
- **Submit Action:** Upon submission, the form sends the data to the backend, including reCAPTCHA verification for login. Axios is used to make API requests to the authentication endpoints.
- **Error and Success Handling:** Success and error messages are displayed using toast notifications. If successful, users are redirected to their dashboard after login.

### Technologies Used:
- **Frontend:** React.js
- **Backend:** Node.js, Express
- **Authentication:** JWT (for token-based authentication), bcrypt (for password hashing)
- **Security:** reCAPTCHA for bot protection
- **API Requests:** Axios
- **UI Feedback:** Toast notifications for success and error messages

This project is designed to be simple to set up and integrate with other applications, providing a secure and user-friendly authentication system.
