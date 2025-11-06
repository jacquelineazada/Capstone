<template>
  <v-app>
    <v-app-bar flat color="#0000CC" dark height="88" app class="elevation-4">
      <v-container
        fluid
        class="d-flex align-center justify-space-between py-0"
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
            <div
              style="
                font-size: 12px;
                font-weight: 400;
                color: white;
                line-height: 1.2;
              "
            >
              REPUBLIC OF THE PHILIPPINES
            </div>
            <div
              style="
                font-size: 15px;
                font-weight: 700;
                color: white;
                line-height: 1.2;
              "
            >
              CITY GOVERNMENT OF NAGA
            </div>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-main class="bg-grey-lighten-3">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6 py-3"
        style="background-color: white; border-bottom: 1px solid lightgrey"
      >
        <div class="d-flex align-center">
          <v-icon color="blue" class="mr-3" size="24"
            >mdi-office-building</v-icon
          >
          <h2 class="mb-0 text-h6 font-weight-bold">
            Building Permit Application
          </h2>
        </div>

        <div class="d-flex align-center">
          <v-menu location="bottom end">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" text class="profile-btn pa-2 rounded-lg">
                <v-avatar size="36" class="mx-2">
                  <v-img
                    alt="Architect"
                    :src="mockEvaluatorProfile.avatar"
                  ></v-img>
                </v-avatar>
                <div class="d-flex flex-column text-left">
                  <span
                    class="text-body-2 font-weight-bold"
                    style="color: #555; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </span>
                  <span
                    class="text-caption font-weight-medium"
                    style="color: #888; white-space: nowrap"
                  >
                    {{ mockEvaluatorProfile.title }}
                  </span>
                </div>
              </v-btn>
            </template>

            <v-card min-width="230" class="rounded-lg elevation-2">
              <v-list dense class="py-0">
                <v-list-item class="pa-3">
                  <template v-slot:prepend>
                    <v-avatar size="40">
                      <v-img
                        :src="mockEvaluatorProfile.avatar"
                        alt="User Avatar"
                      ></v-img>
                    </v-avatar>
                  </template>
                  <v-list-item-title
                    class="font-weight-bold"
                    style="line-height: 1.2rem"
                  >
                    {{ mockEvaluatorProfile.name }}
                  </v-list-item-title>
                  <v-list-item-subtitle style="line-height: 1rem">
                    {{ mockEvaluatorProfile.title }}
                  </v-list-item-subtitle>
                </v-list-item>

                <v-list-item link to="/profile" class="mt-1">
                  <template v-slot:prepend>
                    <v-icon>mdi-account-outline</v-icon>
                  </template>
                  <v-list-item-title>Profile</v-list-item-title>
                </v-list-item>

                <v-list-item link @click="logout">
                  <template v-slot:prepend>
                    <v-icon>mdi-logout</v-icon>
                  </template>
                  <v-list-item-title>Logout</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-card>
          </v-menu>
        </div>
      </v-card>

      <div class="d-flex flex-grow-1 pa-6">
        <v-main class="bg-grey-lighten-3 pa-8">
          <v-card
            class="mx-auto rounded-2xl elevation-6"
            max-width="1800"
            style="border: 2px solid #e3e6ea"
          >
            <v-card-title
              class="d-flex align-center justify-space-between py-6 px-8 bg-gradient"
              style="border-radius: 1rem 1rem 0 0"
            >
              <div class="d-flex align-center">
                <v-icon
                  color="blue-darken-2"
                  size="40"
                  class="me-3 elevation-1"
                  style="background: #e3f2fd; border-radius: 50%"
                  >mdi-city-variant-outline</v-icon
                >
                <div class="text-h6 font-weight-bold text-blue-darken-2">
                  {{ currentPageTitle }}
                </div>
                <v-chip
                  size="small"
                  class="ml-4 font-weight-bold px-4"
                  color="blue"
                  variant="elevated"
                >
                  {{ evaluatorRole }}
                </v-chip>
              </div>
            </v-card-title>
            <v-divider></v-divider>

            <v-card-text class="pt-6 px-8">
              <v-row>
                <v-col cols="12" md="8">
                  <div
                    class="pa-2 rounded-lg border"
                    style="background-color: #f5f5f5"
                  >
                    <div
                      class="d-flex align-center justify-center rounded-lg"
                      style="
                        height: 80vh;
                        min-height: 600px;
                        background: repeating-linear-gradient(
                          135deg,
                          #e0e0e0,
                          #e0e0e0 40px,
                          #f5f5f5 40px,
                          #f5f5f5 80px
                        );
                      "
                    >
                      <div
                        class="text-h5 font-weight-bold text-black opacity-70"
                      >
                        {{ evaluatorRole }} Plan Placeholder
                      </div>
                    </div>
                  </div>
                  <div class="text-caption text-center pt-3 text-grey-darken-1">
                    Plan View – <span class="font-italic">Zoom</span> and
                    <span class="font-italic">annotation</span> tools would be
                    implemented here.
                  </div>
                </v-col>

                <v-col cols="12" md="4">
                  <v-form @submit.prevent="submitEvaluation">
                    <v-sheet class="rounded-lg pa-5 bg-white elevation-2 mb-6">
                      <div class="mb-5">
                        <div
                          class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                        >
                          {{ currentChecklistTitle }}
                        </div>
                        <v-divider class="mb-4"></v-divider>
                        <div
                          v-for="(req, index) in currentChecklist"
                          :key="index"
                        >
                          <v-checkbox
                            v-model="evaluationData.requirements"
                            :label="req.label"
                            :value="req.value"
                            density="compact"
                            hide-details
                            class="flex-grow-1"
                            color="blue"
                          ></v-checkbox>

                          <v-textarea
                            v-if="
                              !evaluationData.requirements.includes(req.value)
                            "
                            v-model="
                              evaluationData.commentsByRequirement[req.value]
                            "
                            placeholder="Reason for non-compliance..."
                            variant="outlined"
                            rows="1"
                            auto-grow
                            class="mt-1 mb-3"
                            hide-details
                            density="compact"
                          ></v-textarea>
                        </div>
                      </div>

                      <div class="mb-5">
                        <div
                          class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                        >
                          General Comments/Feedback
                        </div>
                        <v-textarea
                          v-model="evaluationData.comments"
                          placeholder="General summary or additional feedback..."
                          variant="outlined"
                          rows="3"
                          hide-details
                          auto-grow
                        ></v-textarea>
                      </div>

                      <div class="mb-5">
                        <div
                          class="text-h6 font-weight-bold mb-3 text-blue-darken-2"
                        >
                          Assessment Status
                        </div>
                        <v-radio-group
                          v-model="computedStatus"
                          hide-details
                          color="blue"
                          class="mt-1"
                          readonly
                          inline
                        >
                          <v-radio
                            label="Approved"
                            value="Approved"
                            class="font-weight-bold"
                          ></v-radio>
                          <v-radio
                            label="For Revision"
                            value="For Revision"
                            class="font-weight-bold"
                          ></v-radio>
                        </v-radio-group>
                      </div>
                    </v-sheet>

                    <v-card
                      variant="flat"
                      color="white"
                      class="pa-4 mb-5 elevation-2 rounded-lg"
                    >
                      <div
                        class="text-h6 font-weight-bold mb-2 text-blue-darken-2"
                      >
                        Fee Summary
                      </div>
                      <div class="d-flex flex-column" style="gap: 8px">
                        <div class="d-flex justify-space-between">
                          <div class="text-caption text-grey-darken-2">
                            Plan Review Fee (per sqm)
                          </div>
                          <div class="text-caption font-weight-medium">
                            ₱500.00
                          </div>
                        </div>
                        <div class="d-flex justify-space-between">
                          <div class="text-caption text-grey-darken-2">
                            Processing Fee
                          </div>
                          <div class="text-caption font-weight-medium">
                            ₱500.00
                          </div>
                        </div>
                        <v-divider class="my-2"></v-divider>
                        <div
                          class="d-flex justify-space-between font-weight-bold text-blue-darken-2"
                        >
                          <div class="text-body-1">Total Amount Due</div>
                          <div class="text-body-1">₱1,000.00</div>
                        </div>
                      </div>
                    </v-card>

                    <v-btn
                      type="submit"
                      color="blue"
                      variant="elevated"
                      block
                      size="x-large"
                      class="mt-4 text-none font-weight-bold rounded-lg"
                      style="font-size: 1.2rem"
                      elevation="4"
                      >Submit Evaluation</v-btn
                    >
                  </v-form>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-main>
      </div>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

const evaluatorRole = ref("Architectural");

const mockEvaluatorProfile = ref({
  name: "Zoe Lumanta ",
  title: "Architect",
  avatar: "https://cdn.vuetifyjs.com/images/john.jpg",
});

const applicationsToEvaluate = ref([
  {
    name: "John D. Smith",
    initials: "JDS",
    applicationId: "BP-2024-00101",
    message: "New residential building permit application submitted.",
    time: "2 hours ago",
    status: "Pending",
  },
  {
    name: "Maria T. Dela Cruz",
    initials: "MDC",
    applicationId: "BP-2024-00088",
    message: "Resubmitted architectural plan for review.",
    time: "1 day ago",
    status: "Revision",
  },
]);

const selectedApplicant = ref({
  id: "BP-2024-00101",
  applicantName: "John D. Smith",
  projectName: "Residential House Expansion",
  documents: {
    architecturalPlan: {
      name: "Architectural Plan (A-01)",
      planType: "Architectural",
      description: "Floor Plans, Elevations, and Sections",
      url: "/path/to/plan/a-01.pdf",
    },
  },
});

const unreadNotificationsCount = computed(
  () => applicationsToEvaluate.value.length
);

const getAvatarColor = (initials) => {
  const colors = ["deep-orange", "blue-grey", "teal", "indigo"];
  const sum = initials
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return colors[sum % colors.length];
};

const getStatusColor = (status) => {
  switch (status) {
    case "Pending":
      return "orange-darken-1";
    case "Revision":
      return "red-darken-1";
    case "Approved":
      return "green-darken-1";
    default:
      return "grey";
  }
};

const closeNotifications = () => {
  console.log("Notifications closed or marked as read.");
};

const logout = () => {
  console.log("User logging out...");
  router.push("/login");
};

const checklistData = {
  Architectural: [
    {
      label: "Standard Form (Type A0, A1, A2, A3) for Bldg Plans",
      value: "arch_std_form",
    },
    {
      label: "Lot Plan (Orientation, Bearing, Distance, Roads, Area)",
      value: "arch_lot_plan",
    },
    {
      label: "Site Development Plan (Scale, Tech Desc, Setbacks)",
      value: "arch_site_dev_plan",
    },
    {
      label: "Restrictions: Abutments and Firewalls",
      value: "arch_restrictions",
    },
    {
      label: "Vicinity Map/Location Plan (2km radius)",
      value: "arch_vicinity_map",
    },
    {
      label: "Perspective (Eye level or Bird's Eye View)",
      value: "arch_perspective",
    },
    {
      label: "Column Gridlines & Dimensions (All plans)",
      value: "arch_gridlines",
    },
    {
      label: "Floor Plans (min 1:100m, labels, dimensions)",
      value: "arch_floor_plans",
    },
    {
      label: "Min. 4 Elevations and 2 Sections (showing heights)",
      value: "arch_elevations_sections",
    },
    {
      label: "Stairs/Access Details (Comply with PD 1096, BP 344)",
      value: "arch_stairs",
    },
    {
      label: "Toilet and Bath Details (plans, sections, finishes)",
      value: "arch_toilet_details",
    },
    {
      label: "Kitchen Details (plans, sections, finishes)",
      value: "arch_kitchen_details",
    },
    {
      label: "Doors and Windows Schedule & Details",
      value: "arch_doors_windows",
    },
    {
      label: "Roof Plan / Roof Deck Plan (Passable/Non-passable)",
      value: "arch_roof_plan",
    },
    {
      label: "Other Architectural Details (as needed)",
      value: "arch_other_details",
    },
  ],
  Electrical: [
    {
      label: "General Notes/Guidlines and Specifications",
      value: "elec_gen_notes",
    },
    { label: "Electrical Plans/Legend", value: "elec_plans_legend" },
    {
      label: "Lighting and Power Layout (indicate switches)",
      value: "elec_layout",
    },
    { label: "Schedule of Loads and Computation", value: "elec_loads" },
    {
      label: "Riser Diagram / Single Line Diagram",
      value: "elec_riser_diagram",
    },
    {
      label: "Panel Board Details / Circuit Breaker Diagram",
      value: "elec_panel_board",
    },
    { label: "Design Analysis", value: "elec_design_analysis" },
    { label: "Short Circuit Calculations", value: "elec_short_circuit" },
    { label: "Voltage Drop Calculations", value: "elec_voltage_drop" },
    { label: "Vicinity Map", value: "elec_vicinity_map" },
  ],
  Structural: [
    {
      label: "Construction Notes/Guidlines and Specifications",
      value: "struct_gen_notes",
    },
    { label: "Foundation Plan/s", value: "struct_foundation_plan" },
    { label: "Floor Framing Plan/s", value: "struct_floor_framing" },
    { label: "Roof/Roof Deck Framing Plan/s", value: "struct_roof_framing" },
    { label: "Schedule of Slabs / Slab Details", value: "struct_slab_sched" },
    { label: "Schedule of Beams / Beams Details", value: "struct_beam_sched" },
    {
      label: "Schedule of Columns / Columns Details",
      value: "struct_column_sched",
    },
    {
      label: "Schedule of Footings / Footing Details",
      value: "struct_footing_sched",
    },
    {
      label: "Schedule of Trusses / Truss Details",
      value: "struct_truss_sched",
    },
    { label: "Other Details as deemed needed", value: "struct_other_details" },
  ],
  Plumbing: [
    {
      label: "General Notes/Guidlines and Specifications",
      value: "plumb_gen_notes",
    },
    {
      label: "Potable Water Supply Layout / Hot and Cold Line",
      value: "plumb_water_layout",
    },
    { label: "Sewer/Soil pipe Line Layout", value: "plumb_sewer_layout" },
    { label: "Storm Drainage Layout", value: "plumb_storm_drainage" },
    { label: "Isometric Drawing", value: "plumb_isometric" },
    {
      label: "Septic Tank/Vault Details (must be slab flooring)",
      value: "plumb_septic_tank",
    },
    {
      label: "Area Drain / Catch Basin Details",
      value: "plumb_catch_basin",
    },
    {
      label: "Toilet Fixtures mounting and connection Details",
      value: "plumb_toilet_fixtures",
    },
    {
      label: "Kitchen Fixtures mounting and connection Details",
      value: "plumb_kitchen_fixtures",
    },
    { label: "Hangers and Support Details, Legends", value: "plumb_hangers" },
    { label: "Vicinity Map", value: "plumb_vicinity_map" },
  ],
  Mechanical: [
    {
      label: "General Notes/Guidlines and Specifications",
      value: "mech_gen_notes",
    },
    { label: "Mechanical Plans/Legend", value: "mech_plans_legend" },
    { label: "A/C Layout / HVAC / AFSS / Elevators", value: "mech_layout" },
    { label: "Schedule of Machines/Equipment", value: "mech_sched" },
    { label: "Typical Connection/Support Details", value: "mech_support" },
    { label: "Blow-up Details / Single Line Diagram", value: "mech_blowup" },
    { label: "Vicinity Map", value: "mech_vicinity_map" },
  ],
  Electronics: [
    {
      label: "General Notes/Guidlines and Specifications",
      value: "elex_gen_notes",
    },
    { label: "Electronics Plans/Legend", value: "elex_legend" },
    {
      label: "Data & Voice, Tel, PABX, FDAS, CCTV, CATV",
      value: "elex_layout",
    },
    { label: "Schedule of Equipment", value: "elex_sched" },
    { label: "Typical Connection/Support Details", value: "elex_support" },
    { label: "Blow-up Details / Single Line Diagram", value: "elex_blowup" },
    { label: "Vicinity Map", value: "elex_vicinity_map" },
  ],
};

const planTitles = {
  Architectural: "Architectural Plan",
  Structural: "Structural Plan",
  Electrical: "Electrical Plan",
  Plumbing: "Plumbing/Sanitary Plan",
  Mechanical: "Mechanical Plan",
  Electronics: "Electronics Plan",
};

const checklistTitles = {
  Architectural: "Architectural Requirements Checklist",
  Structural: "Structural Requirements Checklist",
  Electrical: "Electrical Requirements Checklist",
  Plumbing: "Plumbing/Sanatariquirements Checklist",
  Mechanical: "Mechanical Requirements Checklist",
  Electronics: "Electronics Requirements Checklist",
};

const currentChecklist = computed(() => {
  return checklistData[evaluatorRole.value] || [];
});

const currentPageTitle = computed(() => {
  return `Document Evaluation: ${planTitles[evaluatorRole.value] || "Plan"}`;
});

const currentChecklistTitle = computed(() => {
  return checklistTitles[evaluatorRole.value] || "Requirements Checklist";
});

const evaluationData = ref({
  requirements: [],
  comments: "",
  commentsByRequirement: {},
  status: "",
});

const resetEvaluationForm = () => {
  evaluationData.value = {
    requirements: [],
    comments: "",
    commentsByRequirement: {},
    status: "",
  };
};

watch(
  () => evaluationData.value.commentsByRequirement,
  (newComments) => {
    for (const itemValue in newComments) {
      const comment = newComments[itemValue];
      if (comment && comment.trim() !== "") {
        const index = evaluationData.value.requirements.indexOf(itemValue);
        if (index > -1) {
          evaluationData.value.requirements.splice(index, 1);
        }
      }
    }
  },
  { deep: true }
);
watch(
  () => [...evaluationData.value.requirements],
  (newCheckedItems, oldCheckedItems) => {
    const justChecked = newCheckedItems.filter(
      (item) => !oldCheckedItems.includes(item)
    );

    for (const itemValue of justChecked) {
      if (evaluationData.value.commentsByRequirement[itemValue] !== undefined) {
        delete evaluationData.value.commentsByRequirement[itemValue];
      }
    }
  }
);

const computedStatus = computed(() => {
  if (currentChecklist.value.length === 0) {
    return "";
  }

  const allItemsChecked = currentChecklist.value.every((req) =>
    evaluationData.value.requirements.includes(req.value)
  );

  if (allItemsChecked) {
    return "Approved";
  } else {
    return "For Revision";
  }
});

const submitEvaluation = () => {
  evaluationData.value.status = computedStatus.value;

  if (!evaluationData.value.status) {
    alert("Cannot submit, status is not determined.");
    return;
  }

  console.log(
    `Evaluation Submitted for ${evaluatorRole.value} plan (App ID: ${selectedApplicant.value.id}):`,
    evaluationData.value
  );
  alert(
    `Evaluation for ${evalC.value} plan submitted as: ${evaluationData.value.status}`
  );

  resetEvaluationForm();
};
</script>

<style scoped>
.profile-btn {
  background-color: transparent !important;
  box-shadow: none !important;
  padding: 0 !important;
  min-width: unset !important;
  transition: background-color 0.2s ease;
}

.profile-btn:hover {
  background-color: rgba(0, 0, 0, 0.05) !important;
}

.bg-gradient {
  background: linear-gradient(90deg, #e3f2fd 0%, #f5faff 100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 600;
  font-size: 16px;
}
</style>