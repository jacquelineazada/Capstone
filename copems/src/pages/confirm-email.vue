<template>
  <div class="page-wrapper">
    <v-main>
      <v-container class="fill-height pa-8" fluid>
        <v-row align="center" justify="center" class="w-100">
          <v-col cols="12" md="6" class="text-center">
            <v-card class="confirmation-card pa-8 elevation-8">
              <v-card-text>
                <div v-if="loading" class="loading-section">
                  <v-progress-circular
                    indeterminate
                    color="primary"
                    size="64"
                    class="mb-4"
                  ></v-progress-circular>
                  <h3 class="text-h5 mb-2">Confirming your email...</h3>
                  <p class="text-grey-darken-1">Please wait while we verify your email address.</p>
                </div>

                <div v-else-if="success" class="success-section">
                  <v-icon color="success" size="80" class="mb-4">
                    mdi-check-circle
                  </v-icon>
                  <h2 class="text-h4 mb-2 text-success">Email Confirmed!</h2>
                  <p class="text-h6 mb-4 text-grey-darken-1">
                    Your email has been successfully verified.
                  </p>
                  <p class="mb-6 text-grey-darken-1">
                    You can now log in to your account and access all features.
                  </p>
                  <v-btn
                    color="primary"
                    size="large"
                    class="gradient-btn"
                    to="/login"
                  >
                    Go to Login
                  </v-btn>
                </div>

                <div v-else class="error-section">
                  <v-icon color="error" size="80" class="mb-4">
                    mdi-alert-circle
                  </v-icon>
                  <h2 class="text-h4 mb-2 text-error">Verification Failed</h2>
                  <p class="text-h6 mb-4 text-grey-darken-1">
                    {{ errorMessage }}
                  </p>
                  <div class="mt-6">
                    <v-btn
                      color="primary"
                      variant="outlined"
                      class="me-4"
                      to="/register"
                    >
                      Register Again
                    </v-btn>
                    <v-btn
                      color="primary"
                      class="gradient-btn"
                      to="/login"
                    >
                      Try Login
                    </v-btn>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';

export default {
  name: "EmailConfirmationPage",
  data() {
    return {
      loading: true,
      success: false,
      errorMessage: ""
    };
  },
  async mounted() {
    await this.confirmEmail();
  },
  methods: {
    async confirmEmail() {
      try {
        const token = this.$route.query.token;
        
        if (!token) {
          throw new Error("No confirmation token provided. Please check the verification link in your email.");
        }

        const authStore = useAuthStore();
        const result = await authStore.confirmEmail(token);
        
        if (result.success) {
          this.success = true;
          
          // Show success message for 3 seconds, then redirect
          setTimeout(() => {
            this.$router.push('/login');
          }, 3000);
        } else {
          throw new Error(result.message || "Email confirmation failed");
        }
      } catch (error) {
        this.success = false;
        this.errorMessage = error.message || "An error occurred during email confirmation";
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style scoped>
.page-wrapper {
  background: linear-gradient(120deg, #f7f8fa 60%, #e6f0fa 100%);
  min-height: 100vh;
}

.confirmation-card {
  border-radius: 22px !important;
  box-shadow: 0 8px 40px rgba(33, 150, 243, 0.12) !important;
  border: none;
  background: #fff;
  transition: box-shadow 0.18s;
  max-width: 500px;
  margin: 0 auto;
}

.confirmation-card:hover {
  box-shadow: 0 12px 48px rgba(25, 118, 210, 0.17) !important;
}

.loading-section,
.success-section,
.error-section {
  padding: 2rem 0;
}

.gradient-btn {
  background: linear-gradient(90deg, #4a00e0 30%, #1976d2 100%) !important;
  color: #fff !important;
  text-transform: none;
  font-weight: 700;
  font-size: 1.13rem;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(76, 0, 224, 0.09);
  letter-spacing: 0.01em;
  transition: background 0.15s;
}

@media (max-width: 600px) {
  .confirmation-card {
    margin: 1rem;
    padding: 1rem !important;
    border-radius: 12px !important;
  }
  
  .loading-section,
  .success-section,
  .error-section {
    padding: 1rem 0;
  }
}
</style>