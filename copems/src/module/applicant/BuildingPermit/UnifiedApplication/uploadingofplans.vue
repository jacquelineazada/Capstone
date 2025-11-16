<template>
  <v-app>
    <v-main class="no-scroll">
      <v-container fluid class="pa-0 content-area fill-height">
        <v-row no-gutters class="fill-height">
          <ApplicantNavigation
            :sidebar-step="activeStep"
            :sidebar-steps="sidebarSteps"
            @go-to-step="handleStepChange"
            @logout="handleLogout"
          />

          <v-col cols="12" md="9" class="main-content-bg pa-6">
            <v-container fluid>
              <v-card
                class="main-content-card card-shadow mx-auto"
                max-width="1300"
              >
                <v-row>
                  <v-col
                    v-for="(plan, i) in planUploads"
                    :key="i"
                    cols="12"
                    sm="6"
                    md="4"
                    class="d-flex"
                  >
                    <v-card
                      class="pa-2 rounded-xl plan-upload-card flex-grow-1"
                      elevation="3"
                    >
                      <div class="d-flex align-start ga-2 mb-1">
                        <div
                          class="plan-icon-bg d-flex align-center justify-center mr-3"
                        >
                          <v-icon size="30" color="#0000CC">{{
                            plan.icon
                          }}</v-icon>
                        </div>
                        <div class="text-left">
                          <v-card-title
                            class="pa-0 font-weight-bold text-wrap text-subtitle-1 plan-title"
                          >
                            {{ plan.title }}
                          </v-card-title>
                          <v-card-text
                            class="pa-0 text-caption text-grey-darken-1 text-wrap mt-1"
                          >
                            {{ plan.description }}
                          </v-card-text>
                        </div>
                      </div>
                      <v-divider class="my-divider"></v-divider>
                      <v-card
                        flat
                        class="pa-2 rounded-lg d-flex flex-column align-center plan-dropzone"
                        elevation="0"
                        @click="triggerFileInput(i)"
                        :class="{ 'has-file': uploadedFiles[i] }"
                      >
                        <template v-if="!uploadedFiles[i]">
                          <v-icon size="30" color="#c0c0c0"
                            >mdi-cloud-upload-outline</v-icon
                          >
                          <v-card-text
                            class="pa-1 text-caption font-weight-bold text-wrap text-center"
                            style="margin-bottom: 3px"
                          >
                            Drop files here or click to browse
                          </v-card-text>
                          <v-card-text
                            class="pa-0 text-caption font-weight-regular text-grey-darken-1 text-wrap text-center"
                            style="margin-bottom: 0"
                          >
                            PDF files only • Maximum file size: 50MB
                          </v-card-text>
                        </template>
                        <template v-else>
                          <div class="d-flex align-center justify-center">
                            <v-icon color="green" class="mr-2"
                              >mdi-check-circle-outline</v-icon
                            >
                            <v-card-text
                              class="pa-0 text-caption font-weight-medium text-wrap"
                            >
                              {{ uploadedFiles[i].name }} ({{
                                (uploadedFiles[i].size / 1024 / 1024).toFixed(2)
                              }}
                              MB)
                            </v-card-text>
                          </div>
                        </template>
                        <v-file-input
                          ref="fileInputs"
                          class="file-input-overlay"
                          v-model="uploadedFiles[i]"
                          :accept="['.pdf']"
                          :max-size="50 * 1024 * 1024"
                          hide-details
                          single-line
                          variant="plain"
                          @update:modelValue="handleFileUpload(i, $event)"
                        ></v-file-input>
                      </v-card>
                    </v-card>
                  </v-col>
                </v-row>
                <v-row justify="end" class="mt-2">
                  <v-col cols="auto" class="d-flex align-center ga-2">
                    <v-btn
                      variant="text"
                      color="red-darken-1"
                      class="text-none rounded-pill font-weight-bold"
                      @click="clearAllFiles"
                    >
                    </v-btn>
                    <v-btn
                      color="#0000CC"
                      dark
                      class="rounded-pill text-none font-weight-bold"
                      elevation="2"
                      @click="submitAllPlans"
                    >
                      Submit
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card>
            </v-container>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-dialog
      v-model="showSuccessDialog"
      max-width="450"
      style="min-height: 600px"
    >
      <v-card
        class="pa-6 text-center rounded-xl"
        elevation="10"
        style="min-height: 600px"
      >
        <div class="d-flex justify-center mb-4">
          <v-icon color="green-lighten-1" size="80">
            mdi-check-circle-outline
          </v-icon>
        </div>

        <v-card-title class="text-h5 font-weight-bold text-wrap mb-4">
          Submitted Successfully
        </v-card-title>
        <v-card-text class="text-subtitle-1 text-grey-darken-1 mb-6">
          Your building plans have been submitted for review. You will be
          notified of the next steps.
        </v-card-text>
        <v-card-actions class="justify-center pt-4">
          <v-btn
            color="#0000CC"
            class="text-none rounded-pill px-8"
            @click="closeSuccessDialog"
            to="/applicantlayout/selectancillary"
            elevation="2"
            variant="elevated"
          >
            Continue
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script setup>
import { ref, nextTick } from "vue";
import ApplicantNavigation from "./ApplicantNavigation.vue";

// useRouter is auto-imported by unplugin-auto-import

// Sidebar navigation
const activeStep = ref(1);
const sidebarSteps = ref([
  "Fill up the Unified Application Form",
  "Upload Building Plans & Lot Plans",
  "Download Filled-up Unified Application Form and Required Ancillary Permits ",
]);

// Plan uploads data
const planUploads = ref([
  {
    title: "Architectural Plans",
    description: "Floor plans, elevations, sections, and details",
    icon: "mdi-home-outline",
  },
  {
    title: "Civil/Structural Plans",
    description: "Foundation, framing, and structural details",
    icon: "mdi-domain",
  },
  {
    title: "Mechanical Plan",
    description: "HVAC, ventilation, and mechanical systems",
    icon: "mdi-cog-outline",
  },
  {
    title: "Electrical Plans",
    description: "Wiring, lighting, and electrical systems",
    icon: "mdi-flash-outline",
  },
  {
    title: "Plumbing Plans",
    description: "Water supply, drainage, and plumbing fixtures",
    icon: "mdi-pipe-wrench",
  },
  {
    title: "Other Plans",
    description: "Site plans, landscape, and miscellaneous",
    icon: "mdi-file-document-outline",
  },
]);

// File upload state
const uploadedFiles = ref(new Array(planUploads.value.length).fill(null));
const showSuccessDialog = ref(false);
const fileInputs = ref([]);

// File upload handlers
const handleFileUpload = (index, file) => {
  if (file && file[0]) {
    uploadedFiles.value[index] = file[0];
  } else {
    uploadedFiles.value[index] = null;
  }
};

const clearAllFiles = () => {
  uploadedFiles.value = new Array(planUploads.value.length).fill(null);
};

const submitAllPlans = () => {
  const plansToSubmit = uploadedFiles.value.filter((file) => file !== null);
  console.log("Submitting:", plansToSubmit);
  showSuccessDialog.value = true;
};

const closeSuccessDialog = () => {
  showSuccessDialog.value = false;
  clearAllFiles();
};

const triggerFileInput = (i) => {
  nextTick(() => {
    const fileInputsEl = Array.isArray(fileInputs.value)
      ? fileInputs.value
      : [fileInputs.value];
    if (fileInputsEl[i] && fileInputsEl[i].$el) {
      fileInputsEl[i].$el.querySelector("input[type='file']").click();
    }
  });
};

// Navigation handlers
const handleLogout = () => {
  console.log("User logged out");
  router.push("/login");
};

const handleStepChange = (index) => {
  activeStep.value = index;
  if (index === 0) {
    router.push("/applicant/applicantdetails");
  }
};
</script>

<style scoped>
.no-scroll {
  overflow: hidden !important;
}
.v-main.no-scroll {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: #f6fafd;
}
.content-area {
  flex: 1;
  overflow: hidden;
  display: flex;
}
.content-area .v-row {
  width: 100%;
}
.main-content-bg {
  background: #fafdff;
  overflow-y: auto;
  height: 100%;
  scrollbar-width: none; /* Firefox */
}

.main-content-bg::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Edge */
}

.quick-guide-card {
  min-height: 100%;
  background: #fcfcff;
  border-right: 1px solid #e0e0e0;
}
.quick-guide-step {
  transition: background 0.2s, box-shadow 0.2s;
}
.quick-guide-step:hover {
  background: #e3f0ff !important;
  box-shadow: 0 2px 12px rgba(59, 130, 246, 0.08);
}
.active-step {
  background: #e7efff !important;
  box-shadow: 0 4px 20px rgba(59, 130, 246, 0.12);
}
.quick-guide-avatar {
  transition: background 0.2s;
}
.step-label {
  color: #23407c;
}
.clickable-step {
  cursor: pointer;
}

.gradient-text {
  background: linear-gradient(90deg, #1976d2 10%, #0000cc 90%);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.card-shadow {
  box-shadow: 0 2px 14px 0 rgba(25, 118, 210, 0.11);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}
.main-content-card {
  padding: 12px 6px 6px 6px;
  margin: 16px auto 16px auto;
  border-radius: 18px;
  background: #fafdff;
}
.plan-upload-card {
  min-height: 225px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  box-shadow: 0 4px 14px 0 rgba(0, 0, 20, 0.07);
  border: 1px solid #e3eafc;
  transition: box-shadow 0.18s, border-color 0.18s;
  padding: 10px 8px 8px 8px !important;
}
.plan-upload-card:hover {
  border-color: #0000cc;
  box-shadow: 0 8px 28px 4px rgba(25, 118, 210, 0.11);
}
.plan-icon-bg {
  background: linear-gradient(180deg, #e3eaff 70%, #fff 100%);
  border-radius: 50%;
  width: 34px;
  height: 34px;
  margin-right: 10px;
}
.plan-title {
  color: #00145a;
  font-size: 1rem;
  line-height: 1.1;
}
.text-subtitle-1 {
  font-size: 0.95rem;
}
.v-card-title.pa-0 {
  margin-bottom: 0px;
}
.my-divider {
  margin-top: 6px !important;
  margin-bottom: 6px !important;
}
.plan-dropzone {
  border: 2px dashed #e0e0e0;
  background: #f6fafd;
  min-height: 54px;
  cursor: pointer;
  transition: border-color 0.18s, background 0.18s;
  position: relative;
  justify-content: center;
  padding: 8px 4px !important;
}
.plan-dropzone .v-icon {
  margin-bottom: 2px;
}
.plan-dropzone.has-file {
  border-color: #4caf50;
  background: #f2fff4;
}
.file-input-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
.page-title-responsive {
  font-size: 1.1rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .main-content-card {
    padding: 8px !important;
    margin: 10px 0 10px 0 !important;
  }
  .plan-upload-card {
    padding: 6px 3px 6px 3px !important;
    min-height: 170px;
  }
}
@media (max-width: 960px) {
  .content-area {
    overflow-y: auto;
  }
  .v-main.no-scroll {
    height: auto;
  }
  .quick-guide-card {
    height: auto !important;
    min-height: auto;
  }

  .page-title-responsive {
    font-size: 1rem !important;
  }
}

@media (max-width: 900px) {
  .plan-upload-card {
    min-height: 140px;
    padding: 6px 2px 5px 2px !important;
  }
}
@media (max-width: 600px) {
  .main-content-card {
    padding: 2px !important;
    margin: 2px 0 2px 0 !important;
    border-radius: 10px !important;
  }
  .plan-upload-card {
    min-height: 95px;
    border-radius: 8px;
    padding: 3px 1px !important;
  }
  .plan-icon-bg {
    width: 26px;
    height: 26px;
  }
  .plan-dropzone {
    min-height: 36px;
    padding: 4px 1px !important;
  }

  .step-label {
    font-size: 1rem !important;
  }
  .main-content-bg {
    padding: 12px !important;
  }
}
</style>