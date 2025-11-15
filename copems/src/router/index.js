import path from "path";
import { createRouter, createWebHistory } from "vue-router/auto";

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),

  routes: [
    // Route for Main Pages
    {
      path: "/",
      component: () => import("@/layouts/MainLayout.vue"),
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
          component: () => import("@/pages/login.vue"),
        },
        {
          path: "register",
          name: "register",
          component: () => import("@/pages/register.vue"),
        },
        {
          path: "confirm-email",
          name: "confirm-email",
          component: () => import("@/pages/confirm-email.vue"),
        },
        {
          path: "opinquiry",
          name: "opinquiry",
          component: () => import("@/pages/opinquiry.vue"),
        },
        {
          path: "bpinquiry",
          name: "bpinquiry", 
          component: () => import("@/pages/opinquiry.vue"), // Using same component for now
        },
      ],
    },
    {
      path: "/admin",
      component: () => import("@/layouts/AdminLayout.vue"),
      children: [
        // Occupancy Permit Admin
        {
          path: "architecturalDB",
          name: "architecturalDB",
          component: () =>
            import(
              "@/module/admin/OccupancyPermit/Inspector/architecturalDB.vue"
            ),
        },
        {
          path: "reportevaluation",
          name: "reportevaluation",
          component: () =>
            import(
              "@/module/admin/OccupancyPermit/Inspector/reportevaluation.vue"
            ),
        },
        {
          path: "OccupancyApplications",
          name: "OccupancyApplications",
          component: () =>
            import(
              "@/module/admin/OccupancyPermit/TechStaff/OccupancyApplications.vue"
            ),
        },
        {
          path: "OPverified",
          name: "OPverified",
          component: () =>
            import("@/module/admin/OccupancyPermit/TechStaff/OPverified.vue"),
        },
        {
          path: "checklistforOP",
          name: "checklistforOP",
          component: () =>
            import(
              "@/module/admin/OccupancyPermit/administrative/checklistforOP.vue"
            ),
        },
        {
          path: "adminDB",
          name: "adminDB",
          component: () =>
            import("@/module/admin/OccupancyPermit/administrative/adminDB.vue"),
        },
        {
          path: "verifiedchecklist",
          name: "verifiedchecklist",
          component: () =>
            import(
              "@/module/admin/OccupancyPermit/administrative/verifiedchecklist.vue"
            ),
        },
        {
          path: "OPchecklist",
          name: "OPchecklist",
          component: () =>
            import("@/module/admin/OccupancyPermit/TechStaff/OPchecklist.vue"),
        },
        {
          path: "chiefDB",
          name: "chiefDB",
          component: () =>
            import("@/module/admin/OccupancyPermit/ChiefInspector/chiefDB.vue"),
        },
        {
          path: "ReportViewing",
          name: "ReportViewing",
          component: () =>
            import(
              "@/module/admin/OccupancyPermit/ChiefInspector/ReportViewing.vue"
            ),
        },
      ],
    },

    {
      path: "/applicant",
      component: () => import("@/layouts/ApplicantLayout.vue"),
      children: [
        // Occupancy Permit Applicant
        {
          path: "OPapply",
          name: "OPapply",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyApplication/OPapply.vue"
            ),
        },
        {
          path: "OPtype",
          name: "OPtype",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyApplication/OPtype.vue"
            ),
        },
        {
          path: "OPowner",
          name: "OPowner",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyApplication/OPowner.vue"
            ),
        },
        {
          path: "OPlocation",
          name: "OPlocation",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyApplication/OPlocation.vue"
            ),
        },
        {
          path: "OPsignatories",
          name: "OPsignatories",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyApplication/OPsignatories.vue"
            ),
        },
        {
          path: "FormsSection",
          name: "FormsSection",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyApplication/FormsSection.vue"
            ),
        },
        {
          path: "submission",
          name: "submission",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/MonitoringofApplication/submission.vue"
            ),
        },
        {
          path: "Unified",
          name: "Unified",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyPermits/Unified.vue"
            ),
        },
        {
          path: "Completion",
          name: "Completion",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyPermits/Completion.vue"
            ),
        },
        {
          path: "Electrical",
          name: "Electrical",
          component: () =>
            import(
              "@/module/applicant/OccupancyPermit/OccupancyPermits/Electrical.vue"
            ),
        },
      ],
    },
  ],
});
export default router;
