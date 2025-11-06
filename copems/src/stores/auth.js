import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    token: null,
  }),

  actions: {
    //  Call your login API
    async login(username, user_password) {
      try {
        const res = await axios.post(
          "http://192.168.1.32:4000/api/user/login",
          {
            username,
            user_password,
          }
        );

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
      localStorage.removeItem("auth_token");
      localStorage.removeItem("auth_user");
    },

    //  Restore session
    checkSession() {
      const token = localStorage.getItem("auth_token");
      const user = localStorage.getItem("auth_user");

      if (token && user) {
        this.token = token;
        this.user = JSON.parse(user);
      }
    },
  },
});
