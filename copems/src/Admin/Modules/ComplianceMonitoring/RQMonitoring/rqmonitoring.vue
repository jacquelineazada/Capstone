<template>
  <v-app>
    <v-app-bar flat color="#ffffff" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center py-0 justify-space-between"
        style="max-width: 100%"
      >
        <div class="d-flex align-center">
          <v-img
            src="https://www2.naga.gov.ph/wp-content/uploads/2022/05/Naga_City_Official_Seal-1.png"
            alt="LGU Seal"
            width="85"
            height="75"
            contain
            class="me-4"
          />
          <div>
            <div class="header-subtitle">REPUBLIC OF THE PHILIPPINES</div>
            <div class="header-title">CITY GOVERNMENT OF NAGA</div>
          </div>
        </div>
        <div class="d-flex align-center">
          <v-menu :close-on-content-click="true" location="bottom end">
            <template #activator="{ props }">
              <v-btn variant="text" v-bind="props" class="profile-btn">
                <div class="d-flex align-center">
                  <v-avatar color="#5B21B6" size="38" class="mr-3">
                    <span style="color: white; font-weight: 600">JT</span>
                  </v-avatar>
                  <div class="text-left">
                    <div
                      class="profile-name"
                      style="font-size: 14px; font-weight: 600"
                    >
                      John Timothy Umali
                    </div>
                    <div class="profile-role" style="font-size: 12px">OBO</div>
                  </div>
                  <v-icon class="ml-2" style="color: #6b7280"
                    >mdi-chevron-down</v-icon
                  >
                </div>
              </v-btn>
            </template>
            <v-card min-width="250" class="mt-1">
              <v-list>
                <v-list-item @click="logOut">
                  <v-icon class="mr-2" size="small">mdi-logout</v-icon> Log Out
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-container>
    </v-app-bar>

    <v-main class="main-content">
      <v-snackbar
        v-model="snackbar"
        :timeout="3000"
        :color="snackbarColor"
        elevation="24"
      >
        {{ snackbarText }}
        <template v-slot:actions>
          <v-btn variant="text" @click="snackbar = false">Close</v-btn>
        </template>
      </v-snackbar>

      <div class="page-container">
        <div class="application-header mb-4">
          <div class="d-flex align-center mb-2">
            <v-btn
              icon
              variant="text"
              size="small"
              class="mr-2"
              @click="goBack"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <div>
              <h2 class="header-main-title">Monitoring & Documentation</h2>
              <p class="header-app-number">
                Application No. {{ applicant.applicationNumber }}
              </p>
            </div>
          </div>
        </div>

        <v-card class="elevation-1 tabs-card">
          <v-tabs v-model="activeTab" color="#3b82f6" class="custom-tabs">
            <v-tab value="applicant"
              ><v-icon class="mr-2" size="small">mdi-account-circle</v-icon
              >Applicant Information</v-tab
            >
            <v-tab value="plans"
              ><v-icon class="mr-2" size="small"
                >mdi-file-document-multiple</v-icon
              >Building Plans</v-tab
            >
            <v-tab value="monitoring"
              ><v-icon class="mr-2" size="small">mdi-clock-check-outline</v-icon
              >To Follow Requirements</v-tab
            >
          </v-tabs>

          <v-divider></v-divider>

          <v-window v-model="activeTab">
            <v-window-item value="applicant">
              <div class="tab-content pa-6">
                <div class="details-page-header mb-6">
                  <div class="d-flex align-center mb-2">
                    <div class="header-icon-box">
                      <v-icon size="28" color="white"
                        >mdi-account-details</v-icon
                      >
                    </div>
                    <div class="ml-4">
                      <h2 class="details-main-title">Applicant Information</h2>
                      <p class="details-subtitle">
                        Registered citizen of Naga City, Philippines
                      </p>
                    </div>
                  </div>
                </div>
                <v-card class="details-card elevation-1">
                  <v-card-text class="pa-6">
                    <v-row>
                      <v-col cols="12" md="4"
                        ><div class="detail-label">FULL NAME</div>
                        <div class="detail-value">
                          {{ applicant.name }}
                        </div></v-col
                      >
                      <v-col cols="12" md="4"
                        ><div class="detail-label">CITIZENSHIP</div>
                        <div class="detail-value">
                          {{ applicant.citizenship }}
                        </div></v-col
                      >
                      <v-col cols="12" md="4"
                        ><div class="detail-label">DATE OF BIRTH</div>
                        <div class="detail-value">
                          {{ applicant.dob }}
                        </div></v-col
                      >
                      <v-col cols="12" md="8"
                        ><div class="detail-label">LOCAL ADDRESS</div>
                        <div class="detail-value">
                          {{ applicant.address }}
                        </div></v-col
                      >
                      <v-col cols="12" md="4"
                        ><div class="detail-label">BARANGAY</div>
                        <div class="detail-value">
                          {{ applicant.barangay }}
                        </div></v-col
                      >
                    </v-row>
                  </v-card-text>
                </v-card>
              </div>
            </v-window-item>

            <v-window-item value="plans">
              <div class="tab-content pa-6">
                <v-row>
                  <v-col cols="12" md="5">
                    <h3 class="mb-4 text-subtitle-1 font-weight-bold">
                      Plan Documents
                    </h3>
                    <div class="plans-scroll-container">
                      <v-card
                        v-for="(plan, index) in buildingPlans"
                        :key="index"
                        class="plan-card-item mb-2"
                        :class="{
                          'active-plan': selectedPlan.name === plan.name,
                        }"
                        @click="selectedPlan = plan"
                        variant="outlined"
                      >
                        <div
                          class="d-flex align-center justify-space-between w-100"
                        >
                          <div class="d-flex align-center">
                            <v-icon color="#ef4444" size="24" class="mr-3"
                              >mdi-file-pdf-box</v-icon
                            >
                            <div
                              class="font-weight-bold"
                              style="font-size: 13px"
                            >
                              {{ plan.name }}
                            </div>
                          </div>
                          <v-chip
                            :color="getStatusColor(plan.status)"
                            size="x-small"
                            label
                            >{{ plan.status }}</v-chip
                          >
                        </div>
                      </v-card>
                    </div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-card
                      variant="flat"
                      class="pa-6 history-panel"
                      v-if="selectedPlan"
                    >
                      <div
                        class="d-flex justify-space-between align-start mb-6"
                      >
                        <div>
                          <h3 class="text-h6 font-weight-bold mb-1">
                            {{ selectedPlan.name }}
                          </h3>
                          <p class="text-caption text-grey">
                            Engineer: {{ selectedPlan.assignedEngineer }}
                          </p>
                        </div>
                        <v-btn
                          v-if="
                            selectedPlan.status === 'In Progress' &&
                            selectedPlan.daysPending >= 3
                          "
                          color="error"
                          size="small"
                          @click="notifyEngineer(selectedPlan)"
                          >Notify Engineer</v-btn
                        >
                      </div>
                      <v-timeline side="end" align="start" density="compact">
                        <v-timeline-item
                          v-for="(event, i) in selectedPlan.history"
                          :key="i"
                          :dot-color="getEventColor(event.action)"
                          size="small"
                        >
                          <div class="d-flex flex-column">
                            <div class="text-subtitle-2 font-weight-bold">
                              {{ event.action }}
                            </div>
                            <div class="text-caption text-grey">
                              {{ event.date }}
                            </div>
                            <div
                              v-if="event.remarks"
                              class="text-body-2 mt-2 remarks-box"
                            >
                              "{{ event.remarks }}"
                            </div>
                          </div>
                        </v-timeline-item>
                      </v-timeline>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>

            <v-window-item value="monitoring">
              <div class="tab-content pa-6">
                <v-row>
                  <v-col cols="12" md="5">
                    <h3 class="mb-4 text-subtitle-1 font-weight-bold">
                      Requirement List
                    </h3>
                    <div class="plans-scroll-container">
                      <v-card
                        v-for="(doc, index) in monitoringDocs"
                        :key="index"
                        class="plan-card-item mb-2"
                        :class="{
                          'active-plan': selectedDoc.name === doc.name,
                        }"
                        @click="selectedDoc = doc"
                        variant="outlined"
                      >
                        <div
                          class="d-flex align-center justify-space-between w-100"
                        >
                          <div class="d-flex align-center">
                            <v-icon color="#3b82f6" size="24" class="mr-3"
                              >mdi-file-check</v-icon
                            >
                            <div
                              class="font-weight-bold"
                              style="font-size: 13px"
                            >
                              {{ doc.name }}
                            </div>
                          </div>
                          <v-chip
                            :color="getStatusColor(doc.status)"
                            size="x-small"
                            label
                            >{{ doc.status }}</v-chip
                          >
                        </div>
                      </v-card>
                    </div>
                  </v-col>
                  <v-col cols="12" md="7">
                    <v-card
                      variant="flat"
                      class="pa-6 history-panel"
                      v-if="selectedDoc"
                    >
                      <div
                        class="d-flex justify-space-between align-start mb-6"
                      >
                        <div>
                          <h3 class="text-h6 font-weight-bold mb-1">
                            {{ selectedDoc.name }}
                          </h3>
                          <p class="text-caption text-grey">
                            Submission tracking for LGU requirements
                          </p>
                        </div>
                        <v-btn
                          v-if="selectedDoc.status === 'Pending'"
                          color="orange-darken-3"
                          size="small"
                          @click="notifyApplicant(selectedDoc.name)"
                          >Notify Applicant</v-btn
                        >
                      </div>
                      <v-timeline
                        v-if="selectedDoc.history.length > 0"
                        side="end"
                        align="start"
                        density="compact"
                      >
                        <v-timeline-item
                          v-for="(event, i) in selectedDoc.history"
                          :key="i"
                          :dot-color="getEventColor(event.action)"
                          size="small"
                        >
                          <div class="d-flex flex-column">
                            <div class="text-subtitle-2 font-weight-bold">
                              {{ event.action }}
                            </div>
                            <div class="text-caption text-grey">
                              {{ event.date }}
                            </div>
                          </div>
                        </v-timeline-item>
                      </v-timeline>
                      <div
                        v-else
                        class="d-flex flex-column align-center justify-center py-10 text-grey-lighten-1"
                      >
                        <v-icon size="48">mdi-file-clock-outline</v-icon>
                        <p class="mt-2">Waiting for initial submission</p>
                      </div>
                    </v-card>
                  </v-col>
                </v-row>
              </div>
            </v-window-item>
          </v-window>
        </v-card>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const activeTab = ref("plans");
const snackbar = ref(false);
const snackbarText = ref("");
const snackbarColor = ref("success");

const goBack = () => router.push("/admin/ComplianceMonitoring");

const applicant = ref({
  applicationNumber: "OP-2025-002",
  name: "Juanito D. Dela Cruz",
  citizenship: "Filipino",
  dob: "August 15, 1988",
  address: "123 Magsaysay Ave, Concepcion Pequeña",
  barangay: "Concepcion Pequeña",
});

const buildingPlans = ref([
  {
    name: "Architectural Plans",
    status: "Approved",
    assignedEngineer: "Arch. Reyes",
    daysPending: 0,
    history: [
      {
        action: "Approved",
        date: "Dec 06, 2025",
        remarks: "Final design approved by City Architect.",
      },
      { action: "Evaluated", date: "Dec 04, 2025" },
      { action: "Submitted", date: "Dec 01, 2025" },
    ],
  },
  {
    name: "Civil/Structural Plans",
    status: "Returned",
    assignedEngineer: "Engr. Santos",
    daysPending: 4,
    history: [
      {
        action: "Returned",
        date: "Dec 22, 2025",
        remarks: "Structural calculation for beam B1 is missing.",
      },
      { action: "Evaluated", date: "Dec 20, 2025" },
      { action: "Submitted", date: "Dec 18, 2025" },
    ],
  },
  {
    name: "Electrical Plans",
    status: "Evaluated",
    assignedEngineer: "Engr. Lopez",
    daysPending: 1,
    history: [
      { action: "Evaluated", date: "Dec 23, 2025" },
      { action: "Submitted", date: "Dec 20, 2025" },
    ],
  },
  {
    name: "Structural Analysis",
    status: "In Progress",
    assignedEngineer: "Engr. Santos",
    daysPending: 5,
    history: [{ action: "Submitted", date: "Dec 19, 2025" }],
  },
  {
    name: "Electronics Plans",
    status: "Verified",
    assignedEngineer: "Engr. Gomez",
    daysPending: 0,
    history: [
      { action: "Verified", date: "Dec 21, 2025" },
      { action: "Submitted", date: "Dec 18, 2025" },
    ],
  },
  {
    name: "Sanitary Plans",
    status: "In Progress",
    assignedEngineer: "Engr. Castro",
    daysPending: 1,
    history: [{ action: "Submitted", date: "Dec 23, 2025" }],
  },
  {
    name: "Mechanical Plans",
    status: "Pending",
    assignedEngineer: "Engr. Diaz",
    daysPending: 0,
    history: [],
  },
  {
    name: "Geodetic Plans",
    status: "Pending",
    assignedEngineer: "Engr. Luna",
    daysPending: 0,
    history: [],
  },
  {
    name: "Lot Plan",
    status: "Pending",
    assignedEngineer: "Engr. Luna",
    daysPending: 0,
    history: [],
  },
]);

const monitoringDocs = ref([
  {
    name: "Fire Safety Certificate",
    status: "Approved",
    history: [
      { action: "Approved", date: "Dec 24, 2025" },
      { action: "Received", date: "Dec 22, 2025" },
      { action: "Submitted", date: "Dec 20, 2025" },
    ],
  },
  {
    name: "Zoning Clearance",
    status: "Received",
    history: [
      { action: "Received", date: "Dec 23, 2025" },
      { action: "Submitted", date: "Dec 22, 2025" },
    ],
  },
  { name: "ECC Permit", status: "Pending", history: [] },
]);

const selectedPlan = ref(buildingPlans.value[0]);
const selectedDoc = ref(monitoringDocs.value[0]);

const getStatusColor = (status) => {
  const colors = {
    Approved: "success",
    Received: "info",
    Verified: "info",
    Evaluated: "secondary",
    "In Progress": "warning",
    Returned: "error",
    Pending: "grey",
  };
  return colors[status] || "grey";
};

const getEventColor = (action) => {
  if (action === "Approved" || action === "Verified") return "green";
  if (action === "Received") return "info";
  if (action === "Submitted") return "blue";
  if (action === "Evaluated") return "orange";
  if (action === "Returned") return "red";
  return "grey";
};

const notifyEngineer = (plan) => {
  snackbarText.value = `Alert sent to ${plan.assignedEngineer} for ${plan.name}.`;
  snackbarColor.value = "error";
  snackbar.value = true;
};

const notifyApplicant = (docName) => {
  snackbarText.value = `Notice sent to Applicant: Please submit ${docName}.`;
  snackbarColor.value = "orange-darken-3";
  snackbar.value = true;
};

const logOut = () => console.log("Logout");
</script>

<style scoped>
.main-content {
  background-color: #f5f6fa;
  padding-top: 88px;
}
.page-container {
  max-width: 1460px;
  margin: 16px auto 0;
  padding: 0 12px;
}
.header-icon-box {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.details-main-title {
  font-size: 22px;
  font-weight: 700;
  color: #111827;
  margin: 0;
}
.details-subtitle {
  font-size: 14px;
  color: #6b7280;
  margin-top: 4px;
}
.details-card {
  background: #ffffff;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
}
.detail-label {
  font-size: 11px;
  font-weight: 600;
  color: #9ca3af;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.detail-value {
  font-size: 15px;
  font-weight: 500;
  color: #111827;
}
.plans-scroll-container {
  max-height: 500px;
  overflow-y: auto;
  padding-right: 8px;
}
.plan-card-item {
  padding: 12px 16px;
  cursor: pointer;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: white;
}
.active-plan {
  border-color: #3b82f6 !important;
  background-color: #f0f7ff !important;
}
.history-panel {
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: white;
  min-height: 400px;
}
.remarks-box {
  background: #f9fafb;
  padding: 12px;
  border-radius: 8px;
  border-left: 4px solid #d1d5db;
  font-style: italic;
  color: #4b5563;
}
</style>