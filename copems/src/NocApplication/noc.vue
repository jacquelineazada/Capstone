<template>
  <v-app>
    <v-app-bar flat color="blue-darken-3" dark height="88" app>
      <v-toolbar-title class="ml-2 font-weight-bold">
        <v-icon left>mdi-office-building-outline</v-icon> Building Permit Portal
      </v-toolbar-title>
      <v-spacer />
    </v-app-bar>

    <v-main class="bg-grey-lighten-4">
      <v-card
        flat
        class="d-flex align-center justify-space-between px-6"
        style="
          background-color: white;
          border-bottom: 1px solid #e0e0e0;
          height: 60px;
        "
      >
        <div class="d-flex align-center">
          <v-icon color="blue-darken-3" class="mr-3" size="32"
            >mdi-office-building-outline</v-icon
          >
          <h2 class="mb-0 font-weight-bold page-title-responsive gradient-text">
            Building Permit Application
          </h2>
        </div>
      </v-card>

      <v-container fluid class="px-4 mx-auto" style="max-width: 1300px">
        <v-stepper
          v-model="currentStep"
          alt-labels
          flat
          class="mb-4 mt-2 stepper-elevated"
        >
          <v-stepper-header>
            <template v-for="(step, index) in steps" :key="index">
              <v-stepper-item
                :title="step.title"
                :value="step.value"
                :complete="currentStep > step.value"
                :color="
                  currentStep >= step.value ? 'blue-darken-1' : 'grey lighten-2'
                "
                class="stepper-item-custom"
              ></v-stepper-item>
              <v-divider
                v-if="index < steps.length - 1"
                :thickness="3"
                :style="{
                  'border-color':
                    currentStep > step.value ? '#1976D2' : '#e0e0e0',
                }"
                class="mx-2"
              ></v-divider>
            </template>
          </v-stepper-header>
        </v-stepper>

        <v-card class="my-2 pa-4 card-shadow">
          <v-card-title class="text-h6 card-title-responsive mb-2"
            >APPLICATION DETAILS (STEP {{ currentStep }})</v-card-title
          >
          <v-divider class="mb-4"></v-divider>
          <v-card-text>
            <v-form
              ref="form"
              @submit.prevent="validateAndProceed"
              :key="currentStep"
            >
              <v-card v-if="currentStep <= 4" class="card-section">
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                  ><v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-domain</v-icon
                  >CONTRACTOR/ENTERPRISE INFORMATION</v-card-title
                >
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12">
                      <v-text-field
                        v-model="formData[currentStep].companyName"
                        label="Company Name"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-office-building"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].pcabLicenseNo"
                        label="PCAB License No."
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-badge-account-outline"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].validity"
                        label="Validity"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-calendar-check"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].tin"
                        label="TIN"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="formData[currentStep].address"
                        label="Address"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="formData[currentStep].telNo"
                        label="Tel. No."
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-phone"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="3">
                      <v-text-field
                        v-model="formData[currentStep].date"
                        label="Date"
                        variant="outlined"
                        density="comfortable"
                        type="date"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-calendar"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" class="mt-4">
                      <v-label class="input-label mb-1"
                        >Authorized Managing Officer</v-label
                      >
                      <div
                        class="pa-2 signature-block d-flex justify-space-between align-end"
                      >
                        <div class="text-center signature-line-container">
                          <div class="signature-line"></div>
                          <div class="text-caption text-medium-emphasis mt-1">
                            (Signature Over Printed Name)
                          </div>
                        </div>
                      </div>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card
                v-else-if="currentStep === 5 || currentStep === 6"
                class="card-section"
              >
                <v-card-title
                  class="text-h6 card-title-responsive section-title"
                >
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-account-circle</v-icon
                  >
                  <span v-if="currentStep === 5">BUILDING OWNER</span>
                  <span v-else>WITH MY CONSENT: LOT OWNER</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-row dense>
                    <v-col cols="12" class="mb-4">
                      <v-label class="input-label mb-1"
                        >Signature Over Printed Name</v-label
                      >
                      <div
                        class="pa-2 signature-block d-flex justify-end align-end"
                      >
                        <div
                          class="text-center signature-line-container"
                          style="max-width: 60%"
                        >
                          <div class="signature-line"></div>
                          <div class="text-caption text-medium-emphasis mt-1">
                            (Signature Over Printed Name)
                          </div>
                        </div>
                        <v-text-field
                          v-model="formData[currentStep].date"
                          label="Date"
                          variant="plain"
                          density="compact"
                          type="date"
                          style="
                            max-width: 150px;
                            flex-grow: 0;
                            margin-left: 20px;
                          "
                          :rules="[rules.required]"
                          hide-details="auto"
                          required
                        ></v-text-field>
                      </div>
                    </v-col>

                    <v-col cols="12">
                      <v-text-field
                        v-model="formData[currentStep].address"
                        label="Address"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-map-marker"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].ctcNo"
                        label="C.T.C. No."
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-numeric"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].dateIssued"
                        label="Date Issued"
                        variant="outlined"
                        density="comfortable"
                        type="date"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-calendar-edit"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="4">
                      <v-text-field
                        v-model="formData[currentStep].placeIssued"
                        label="Place Issued"
                        variant="outlined"
                        density="comfortable"
                        :rules="[rules.required]"
                        prepend-inner-icon="mdi-city"
                        color="blue-darken-3"
                        hide-details="auto"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-card-text>
              </v-card>

              <v-card v-else-if="currentStep === 7" class="card-section">
                <v-card-title class="text-h6 section-title">
                  <v-icon left color="blue-darken-3" class="mr-2"
                    >mdi-check-circle-outline</v-icon
                  >
                  APPLICATION REVIEW
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                  <v-alert
                    type="info"
                    variant="tonal"
                    icon="mdi-information-outline"
                    class="mb-4"
                  >
                    Please review all the information below before printing or
                    final submission.
                  </v-alert>

                  <div
                    v-for="step in steps"
                    :key="step.value"
                    class="mb-6 review-section"
                  >
                    <h3
                      class="text-subtitle-1 font-weight-bold mb-2 section-title-review"
                    >
                      Step {{ step.value }}: {{ step.title }}
                    </h3>
                    <v-divider class="mb-3"></v-divider>

                    <div v-if="step.value <= 4">
                      <p class="review-item">
                        <strong>Company Name:</strong>
                        {{ formData[step.value].companyName || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>PCAB License No.:</strong>
                        {{ formData[step.value].pcabLicenseNo || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>TIN:</strong>
                        {{ formData[step.value].tin || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>Address:</strong>
                        {{ formData[step.value].address || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>Tel. No.:</strong>
                        {{ formData[step.value].telNo || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>Date:</strong>
                        {{ formData[step.value].date || "N/A" }}
                      </p>
                    </div>
                    <div v-else-if="step.value === 5 || step.value === 6">
                      <p class="review-item">
                        <strong>Address:</strong>
                        {{ formData[step.value].address || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>Date Signed:</strong>
                        {{ formData[step.value].date || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>C.T.C. No.:</strong>
                        {{ formData[step.value].ctcNo || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>Date Issued:</strong>
                        {{ formData[step.value].dateIssued || "N/A" }}
                      </p>
                      <p class="review-item">
                        <strong>Place Issued:</strong>
                        {{ formData[step.value].placeIssued || "N/A" }}
                      </p>
                    </div>
                    <div v-else>
                      <p class="text-medium-emphasis">Review Complete.</p>
                    </div>
                  </div>
                </v-card-text>
                <v-card-actions class="pa-4 pt-0">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="green-darken-3"
                    class="btn-rounded"
                    elevation="4"
                    @click="printForm"
                    variant="elevated"
                  >
                    <v-icon left>mdi-printer</v-icon>Print Application
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-form>
          </v-card-text>
        </v-card>

        <div class="d-flex justify-end mt-6 mb-8">
          <v-btn
            color="blue-grey-lighten-4"
            class="mr-2 btn-rounded"
            elevation="2"
            @click="goBack"
            variant="tonal"
            :disabled="currentStep === 7"
          >
            <v-icon left>mdi-arrow-left</v-icon>
            {{ currentStep > 1 ? "Back" : "Previous Page" }}
          </v-btn>

          <v-btn
            color="blue-darken-3"
            class="btn-rounded"
            elevation="2"
            @click="validateAndProceed"
            variant="elevated"
            :disabled="currentStep === 7"
          >
            Next<v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { defineComponent } from "vue";

// Default data structure for Contractor Steps (1-4)
const DEFAULT_CONTRACTOR_DATA = () => ({
  companyName: null,
  pcabLicenseNo: null,
  validity: null,
  tin: null,
  address: null,
  telNo: null,
  managingOfficer: null, // Not used, but kept for data model integrity
  date: new Date().toISOString().substr(0, 10),
});

// Default data structure for Owner Steps (5-6)
const DEFAULT_OWNER_DATA = () => ({
  ownerPrintedName: null, // Not directly bound, implied by signature block
  date: new Date().toISOString().substr(0, 10),
  address: null,
  ctcNo: null,
  dateIssued: null,
  placeIssued: null,
});

export default defineComponent({
  name: "NagaApplicationForm",
  data() {
    return {
      currentStep: 1,
      steps: [
        { title: "GENERAL BUILDING CONTRACTOR", value: 1 },
        { title: "SPECIALTY CONTRACTOR: ELECTRICAL", value: 2 },
        { title: "SPECIALTY CONTRACTOR: MECHANICAL", value: 3 },
        { title: "SPECIALTY CONTRACTOR: PLUMBING", value: 4 },
        { title: "BUILDING OWNER", value: 5 },
        { title: "WITH MY CONSENT: LOT OWNER", value: 6 },
        { title: "REVIEW AND PRINT", value: 7 }, // NEW STEP 7
      ],
      // Data stored by step number
      formData: {
        1: DEFAULT_CONTRACTOR_DATA(), // Data for Step 1
        2: DEFAULT_CONTRACTOR_DATA(), // Data for Step 2
        3: DEFAULT_CONTRACTOR_DATA(), // Data for Step 3
        4: DEFAULT_CONTRACTOR_DATA(), // Data for Step 4
        5: DEFAULT_OWNER_DATA(), // Data for Step 5 (Building Owner)
        6: DEFAULT_OWNER_DATA(), // Data for Step 6 (Lot Owner)
        7: {}, // No data fields for Step 7
      },

      rules: {
        required: (value) => !!value || "This field is required.",
      },
    };
  },
  methods: {
    async validateAndProceed() {
      // Steps 1-6 require validation; Step 7 (Review) just proceeds
      if (this.currentStep <= 6) {
        // Only validate if we are on a step that has required fields (1-6)
        const valid = (await this.$refs.form.validate()).valid;
        if (!valid) return;
      }

      const maxStep = Math.max(...this.steps.map((s) => s.value));

      if (this.currentStep < maxStep) {
        // Move to the next stepper step
        this.currentStep++;
      } else {
        // If at the last step (7 - Review), you might trigger final submission or a confirmation.
        alert("Application review complete. Click 'Print' to finalize.");
      }
    },
    goBack() {
      if (this.currentStep > 1) {
        // Decrement the stepper step
        this.currentStep--;
      } else {
        // If at the first step (1), navigate to the previous route/page
        this.$router.push("/applicant/typeofapplication");
      }
    },
    printForm() {
      // This function would typically print the review content or open a PDF
      alert("Printing form data (Simulated).");
      window.print();
    },
  },
});
</script>

<style scoped>
/* Gradient Title */
.gradient-text {
  background: linear-gradient(90deg, #1976d2 20%, #1565c0 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.stepper-elevated {
  background: white;
  border-radius: 14px;
  box-shadow: 0 2px 6px 0 rgba(25, 118, 210, 0.06);
  padding: 20px 0;
}

.stepper-item-custom .v-stepper-item__step {
  box-shadow: 0 1px 4px 0 rgba(25, 118, 210, 0.13);
  transition: background 0.2s;
}

.card-shadow {
  box-shadow: 0 2px 8px 0 rgba(25, 118, 210, 0.08);
  border-radius: 18px;
  border: 1.5px solid #e3eafc;
}

.card-section {
  background: #f7fafd;
  border-radius: 12px;
  border: 1px solid #e3eafc;
}

.section-title {
  color: #1976d2;
  font-weight: bold;
  font-size: 1.09rem;
  letter-spacing: 0.01em;
}

.section-title-review {
  color: #1565c0;
  margin-top: 15px;
}

.review-item {
  font-size: 0.95rem;
  line-height: 1.6;
  margin-left: 10px;
}

.textfield-50 .v-input__control {
  min-height: 50px;
  border-radius: 8px;
}

.input-label {
  font-size: 0.85rem;
  color: #2a2a2a;
  margin-bottom: 4px;
  font-weight: 500;
}

.btn-rounded {
  border-radius: 30px !important;
  min-width: 110px;
  font-weight: 600;
  letter-spacing: 0.03em;
}

/* Custom Signature Block Styling */
.signature-block {
  border: 1px solid #ccc;
  border-radius: 4px;
  background-color: white;
  min-height: 80px;
}

.signature-line-container {
  flex-grow: 1;
  margin-right: 20px;
  padding-top: 15px;
  align-self: center;
}

.signature-line {
  border-bottom: 1px solid black;
  height: 1px;
  width: 100%;
}

.page-title-responsive {
  font-size: 1.4rem;
  letter-spacing: 0.02em;
}

@media (max-width: 1200px) {
  .page-title-responsive {
    font-size: 1.12rem !important;
  }
}

@media (max-width: 960px) {
  .page-title-responsive {
    font-size: 1rem !important;
  }
}

@media (max-width: 800px) {
  .card-title-responsive {
    font-size: 1.02rem !important;
  }
  .section-title {
    font-size: 0.92rem !important;
  }
}

@media (max-width: 600px) {
  .v-stepper-item .v-stepper-item__title {
    display: none;
  }
  .page-title-responsive {
    font-size: 0.95rem !important;
  }
  .card-title-responsive,
  .section-title {
    font-size: 0.98rem !important;
  }
  .card-shadow,
  .card-section {
    padding: 6px !important;
  }
}

@media (max-width: 480px) {
  .v-card-title {
    font-size: 0.88rem !important;
  }
  .btn-rounded {
    min-width: 90px;
    font-size: 0.9rem;
  }
}
</style>