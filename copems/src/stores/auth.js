import { defineStore } from "pinia";
import axios from "axios";
import emailService from "../services/emailService";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
    pendingVerification: null, // Store pending user data
  }),

  actions: {
    // Register new user with email confirmation
    async register(email, password, confirmPassword) {
      try {
        // Validate passwords match
        if (password !== confirmPassword) {
          throw new Error("Passwords do not match");
        }

        // Step 1: Register user in backend (without sending email from backend)
        const response = await axios.post(
          "http://localhost:4003/api/user/register-no-email",
          {
            email,
            password
          }
        );

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        const { verification_token } = response.data.data;

        // Step 2: Send confirmation email from frontend
        const emailResult = await emailService.sendConfirmationEmail(
          email,
          email, // Using email as name since we don't collect names yet
          verification_token
        );

        if (emailResult.success) {
          return { 
            success: true, 
            message: 'User registered successfully. Please check your email to verify your account.',
            emailSent: true
          };
        } else {
          return { 
            success: true, 
            message: 'User registered successfully, but confirmation email could not be sent. Please contact support.',
            emailSent: false,
            emailError: emailResult.error
          };
        }

      } catch (err) {
        console.error("Registration failed:", err);
        throw new Error(err.response?.data?.message || err.message || "Registration failed");
      }
    },

    // Confirm email with token
    async confirmEmail(token) {
      try {
        const response = await axios.post(
          "http://localhost:4003/api/user/verify-email",
          { token }
        );

        if (!response.data.success) {
          throw new Error(response.data.message);
        }

        // Set user data from response
        this.user = response.data.data;
        this.token = response.data.data.token;

        // Persist authentication
        localStorage.setItem("auth_token", this.token);
        localStorage.setItem("auth_user", JSON.stringify(this.user));

        return { success: true, message: response.data.message };

      } catch (err) {
        console.error("Email confirmation failed:", err);
        throw new Error(err.response?.data?.message || err.message || "Email confirmation failed");
      }
    },

    // Clear pending verification data (keeping for compatibility)
    clearPendingVerification() {
      this.pendingVerification = null;
      localStorage.removeItem("pending_verification");
    },

    //  Call your login API
    async login(username, user_password) {
      try {
        const res = await axios.post(
          "http://localhost:4003/api/user/login",
          {
            username,
            user_password,
          }
        );

        // Check if email is verified (if your backend supports this)
        if (res.data.user && res.data.user.email_verified === false) {
          throw new Error("Please verify your email before logging in");
        }

        this.user = res.data.user;
        this.token = res.data.token;

        // Persist for refresh
        localStorage.setItem("auth_token", this.token);
        localStorage.setItem("auth_user", JSON.stringify(this.user));

        return true;
      } catch (err) {
        console.error("Login failed:", err.response?.data, err.message);
        throw (err.response?.data, { message: "Login failed" });
      }
    },

    //  Logout
    logout() {
      this.user = null;
      this.token = null;
      this.pendingVerification = null;
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
      localStorage.removeItem("pending_verification");
    },

    //  Restore session
    checkSession() {
      const token = localStorage.getItem("auth_token");
      const user = localStorage.getItem("auth_user");
      const pendingVerification = localStorage.getItem("pending_verification");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }

      if (pendingVerification) {
        this.pendingVerification = JSON.parse(pendingVerification);
      }
    },
  },
});
