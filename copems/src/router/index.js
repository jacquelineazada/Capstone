import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    // Route for Main Pages
    {
      path: "/",
      component: () => import("@/layout/MainLayout.vue"),
      children: [
        // Main Pages for All Users
        {
          path: "",
          name: "home",
          component: () => import("@/pages/home.vue"),
        },
        {
          path: "login",
          name: "login",
          component: () => import("@/pages/login .vue"),
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/layout/AdminLayout.vue"),
      children: [
        {
          path: "AdminLogin",
          name: "AdminLogin",
          component: () => import("@/pages/AdminLogin.vue"),
        },

        // Building Permit Admin

        // Locational Clearance Admin

        // Compliance Monitoring Admin
        {
          path: "ComplianceMonitoring",
          name: "ComplianceMonitoring",
          component: () =>
            import(
              "@/Admin/Modules/ComplianceMonitoring/Compliance/compliance.vue"
            ), // Or any other component for the root
        },

        {
          path: "rqmonitoring",
          name: "rqmonitoring",
          component: () =>
            import(
              "@/Admin/Modules/ComplianceMonitoring/RQMonitoring/rqmonitoring.vue"
            ), // Or any other component for the root
        },

        {
          path: "opmonitoring",
          name: "opmonitoring",
          component: () =>
            import(
              "@/Admin/Modules/ComplianceMonitoring/OPMonitoring/opmonitoring.vue"
            ), // Or any other component for the root
        },

        // Occupancy Permit Admin
      ],
    },

    {
      path: "/applicant",
      component: () => import("@/layout/ApplicantLayout.vue"),
      children: [
        // Main Pages for Applicant
        {
          path: "permits",
          name: "permits",
          component: () => import("@/pages/permits.vue"),
        },
        {
          path: "services",
          name: "services",
          component: () => import("@/pages/services.vue"),
        },
        {
          path: "noc",
          name: "noc",
          component: () => import("@/Applicant/NocApplication/noc.vue"), // Or any other component for the root
        },
        // Building Permit Applicant

        // Locational Clearance Applicant

        // Occupancy Permit Applicant

        //
      ],
    },
  ],
});
export default router;
