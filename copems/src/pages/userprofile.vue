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

    <v-main class="bg-grey-lighten-4">
      <div class="pa-4 d-flex align-center">
        <v-btn
          icon="mdi-arrow-left"
          variant="text"
          color="#0000CC"
          size="extra-small"
          @click="goBack"
        ></v-btn>
        <span class="text-body-2 font-weight-bold ml-2" style="color: #0000cc"
          >Back</span
        >
      </div>

      <v-container fluid class="max-width-600 pb-8 centered-content">
        <v-card class="elevation-2 rounded-xl mb-6 overflow-hidden">
          <v-tabs
            v-model="tab"
            align-with-content
            color="blue-darken-2"
            class="tabs-enhanced"
          >
            <v-tab value="profile" class="tab-item">
              <v-icon size="20" class="mr-2">mdi-information-outline</v-icon>
              Profile
            </v-tab>
            <v-tab value="account" class="tab-item">
              <v-icon size="20" class="mr-2">mdi-cog-outline</v-icon>
              Account
            </v-tab>
            <v-tab value="security" class="tab-item">
              <v-icon size="20" class="mr-2">mdi-shield-outline</v-icon>
              Security
            </v-tab>
          </v-tabs>
        </v-card>

        <v-window v-model="tab" class="transition-smooth">
          <v-window-item value="profile">
            <v-card class="elevation-2 rounded-xl overflow-hidden">
              <v-card-title class="bg-blue-lighten-5 py-4 px-6">
                <div class="d-flex align-center">
                  <v-icon size="28" class="mr-3" color="blue-darken-2">
                    mdi-account-box-outline
                  </v-icon>
                  <div>
                    <h2 class="text-h5 mb-1">Profile Information</h2>
                    <p class="text-subtitle-2 text-grey-darken-1">
                      Update your personal details
                    </p>
                  </div>
                </div>
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text class="pa-5">
                <div
                  class="profile-photo-section mb-5 pa-4 rounded-xl bg-grey-lighten-5"
                >
                  <div class="d-flex align-center justify-space-between">
                    <div class="d-flex align-center">
                      <v-avatar size="90" class="mr-4 elevation-3">
                        <v-img
                          :src="profile.photoUrl"
                          alt="Profile Photo"
                        ></v-img>
                      </v-avatar>
                      <div>
                        <p class="text-h6 font-weight-bold mb-1">
                          {{ profile.firstName }} {{ profile.lastName }}
                        </p>
                        <p class="text-subtitle-2 text-grey-darken-1 mb-2">
                          {{ profile.role }}
                        </p>
                        <p class="text-caption text-grey">
                          JPG, PNG. Max size 5MB
                        </p>
                        <p
                          v-if="profile.photoFile"
                          class="text-caption text-success mt-1"
                        >
                          Selected file: {{ profile.photoFile.name }}
                        </p>
                      </div>
                    </div>
                    <div class="d-flex gap-2">
                      <input
                        type="file"
                        ref="photoUpload"
                        style="display: none"
                        accept="image/jpeg, image/png"
                        @change="handleFileUpload"
                      />
                      <v-btn
                        color="blue-darken-2"
                        variant="elevated"
                        size="small"
                        class="text-none"
                        @click="$refs.photoUpload.click()"
                      >
                        <v-icon size="18" class="mr-1">mdi-cloud-upload</v-icon>
                        Upload New
                      </v-btn>
                      <v-btn
                        color="red-darken-1"
                        variant="text"
                        size="small"
                        class="text-none"
                        @click="removePhoto"
                      >
                        <v-icon size="18">mdi-delete-outline</v-icon>
                      </v-btn>
                    </div>
                  </div>
                </div>

                <v-form>
                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="profile.firstName"
                        label="First Name"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-account"
                        required
                        class="compact-field mb-2"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="profile.lastName"
                        label="Last Name"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-account"
                        required
                        class="compact-field mb-2"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="profile.middleName"
                        label="Middle Name"
                        placeholder="Optional"
                        variant="outlined"
                        density="compact"
                        prepend-inner-icon="mdi-account"
                        class="compact-field mb-2"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        v-model="profile.username"
                        label="Username"
                        prepend-inner-icon="mdi-at"
                        variant="outlined"
                        density="compact"
                        required
                        class="compact-field mb-2"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12">
                      <v-text-field
                        v-model="profile.role"
                        label="Role"
                        variant="outlined"
                        density="compact"
                        readonly
                        persistent-placeholder
                        prepend-inner-icon="mdi-briefcase"
                        class="compact-field mb-2"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="account">
            <v-card class="elevation-2 rounded-xl overflow-hidden">
              <v-card-title class="bg-blue-lighten-5 py-4 px-6">
                <div class="d-flex align-center">
                  <v-icon size="28" class="mr-3" color="blue-darken-2">
                    mdi-cog-outline
                  </v-icon>
                  <div>
                    <h2 class="text-h5 mb-1">Account Settings</h2>
                    <p class="text-subtitle-2 text-grey-darken-1">
                      Manage your account details and preferences
                    </p>
                  </div>
                </div>
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text class="pa-5">
                <v-form>
                  <v-text-field
                    v-model="account.email"
                    label="Email Address"
                    variant="outlined"
                    density="compact"
                    class="mb-2 compact-field"
                    prepend-inner-icon="mdi-email-outline"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="account.phone"
                    label="Phone Number"
                    variant="outlined"
                    density="compact"
                    class="mb-2 compact-field"
                    prepend-inner-icon="mdi-phone-outline"
                  ></v-text-field>

                  <v-row dense>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="account.language"
                        label="Language"
                        :items="['English', 'Spanish', 'French', 'German']"
                        variant="outlined"
                        density="compact"
                        class="compact-field mb-2"
                        prepend-inner-icon="mdi-translate"
                      ></v-select>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-select
                        v-model="account.timezone"
                        label="Timezone"
                        :items="[
                          'Pacific Time (PT)',
                          'Eastern Time (ET)',
                          'Central Time (CT)',
                          'Mountain Time (MT)',
                        ]"
                        variant="outlined"
                        density="compact"
                        class="compact-field mb-2"
                        prepend-inner-icon="mdi-clock-outline"
                      ></v-select>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
            </v-card>
          </v-window-item>

          <v-window-item value="security">
            <v-card class="elevation-2 rounded-xl overflow-hidden">
              <v-card-title class="bg-blue-lighten-5 py-4 px-6">
                <div class="d-flex align-center">
                  <v-icon size="28" class="mr-3" color="blue-darken-2">
                    mdi-shield-outline
                  </v-icon>
                  <div>
                    <h2 class="text-h5 mb-1">Change Password</h2>
                    <p class="text-subtitle-2 text-grey-darken-1">
                      Update your password to keep your account secure
                    </p>
                  </div>
                </div>
              </v-card-title>

              <v-divider></v-divider>

              <v-card-text class="pa-5">
                <div
                  class="security-info mb-4 pa-4 rounded-lg bg-orange-lighten-5 border-orange"
                >
                  <div class="d-flex">
                    <v-icon color="orange-darken-2" class="mr-3"
                      >mdi-information</v-icon
                    >
                    <div>
                      <p class="text-body-2 font-weight-bold mb-1">
                        Password Requirements
                      </p>
                      <p class="text-caption text-grey-darken-1">
                        Use at least 8 characters with a mix of uppercase,
                        lowercase, numbers and symbols
                      </p>
                    </div>
                  </div>
                </div>

                <v-form>
                  <v-text-field
                    v-model="security.currentPassword"
                    label="Current Password"
                    variant="outlined"
                    density="compact"
                    type="password"
                    class="mb-2 compact-field"
                    prepend-inner-icon="mdi-lock-outline"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="security.newPassword"
                    label="New Password"
                    variant="outlined"
                    density="compact"
                    type="password"
                    class="mb-2 compact-field"
                    prepend-inner-icon="mdi-lock-outline"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="security.confirmPassword"
                    label="Confirm New Password"
                    variant="outlined"
                    density="compact"
                    type="password"
                    class="mb-4 compact-field"
                    prepend-inner-icon="mdi-lock-check-outline"
                    required
                  ></v-text-field>

                  <v-btn
                    color="blue-darken-2"
                    variant="elevated"
                    size="large"
                    class="text-none font-weight-bold"
                    @click="updatePassword"
                  >
                    <v-icon size="20" class="mr-2">mdi-check</v-icon>
                    Update Password
                  </v-btn>
                </v-form>
              </v-card-text>
            </v-card>
          </v-window-item>
        </v-window>

        <div class="d-flex justify-end gap-3 mt-6">
          <v-btn
            v-if="tab === 'profile' || tab === 'account'"
            variant="outlined"
            color="grey-darken-2"
            size="large"
            class="text-none font-weight-bold"
          >
            Cancel
          </v-btn>
          <v-btn
            v-if="tab === 'profile' || tab === 'account'"
            color="blue-darken-2"
            variant="elevated"
            size="large"
            class="text-none font-weight-bold"
            @click="saveChanges"
          >
            <v-icon size="20" class="mr-2">mdi-check-circle</v-icon>
            Save Changes
          </v-btn>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { useRouter } from "vue-router";

export default {
  setup() {
    // In a real application, useRouter() sets up the router context
    const router = useRouter();
    return { router };
  },
  data() {
    return {
      tab: "profile",

      profile: {
        firstName: "Julian",
        lastName: "Davis",
        middleName: "",
        username: "jessicadavis",
        role: "Senior Product Designer",
        photoUrl:
          "https://media.craiyon.com/2025-07-08/LUWscSwKRRK7zxXWCotUyA.webp",
        photoFile: null,
      },

      account: {
        email: "jessica.davis@email.com",
        phone: "+1 (555) 123-4567",
        language: "English",
        timezone: "Pacific Time (PT)",
      },

      security: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    goBack() {
      // THIS IS THE COMPLETED FUNCTION: Now correctly calls Vue Router to navigate back
      console.log("Navigating back using $router.back()");
      this.$router.back();
    },
    handleFileUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.profile.photoFile = file;
        this.profile.photoUrl = URL.createObjectURL(file);
      }
    },
    removePhoto() {
      this.profile.photoFile = null;
      this.profile.photoUrl =
        "https://cdn.vuetifyjs.com/images/parallax/material.jpg";
      console.log("Profile photo removed (set to default placeholder).");
    },
    saveChanges() {
      console.log(`Saving changes for ${this.tab} tab...`);
    },
    updatePassword() {
      console.log("Attempting to update password...");
      if (this.security.newPassword !== this.security.confirmPassword) {
        alert("New Password and Confirm Password do not match!");
      } else {
        alert("Password update process started.");
      }
    },
  },
};
</script>

<style>
/* Custom class to enforce 600px width and center the content */
.max-width-600 {
  max-width: 1200px !important;
}

/* This class centers the content within the available space */
.centered-content {
  margin-left: auto;
  margin-right: auto;
  max-width: 600px;
}

/* 1. Aggressively reduce the internal height of all fields */
.compact-field .v-input__control {
  min-height: 40px !important;
}

/* 2. Target the main field element to reduce padding */
.compact-field .v-field--density-compact {
  /* Reduce top/bottom padding to make the field smaller */
  --v-field-padding-top: 8px;
  --v-field-padding-bottom: 8px;
}

/* 3. Reduce vertical padding of columns for tight row spacing */
.v-row.dense > .v-col,
.v-row > .v-col {
  padding-top: 4px !important;
  padding-bottom: 4px !important;
}
</style>