<template>
  <div class="page-wrapper">
    <v-main>
      <v-container class="fill-height pa-8" fluid>
        <v-row align="center" justify="center" class="w-100">
          <v-col cols="12" md="7" class="pa-6">
            <div class="info-section">
              <h2 class="info-title">Why Choose Online Application</h2>
              <v-row class="mt-8">
                <v-col cols="12" sm="4" class="text-center">
                  <div class="icon-wrapper blue-bg">
                    <v-icon color="#3D5AFE" size="36">mdi-clock-outline</v-icon>
                  </div>
                  <h3 class="feature-title">Time-Saving</h3>
                  <p class="feature-description">
                    Save valuable time by processing your permits online. No
                    more waiting in long queues – complete everything from the
                    comfort of your home or office.
                  </p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <div class="icon-wrapper green-bg">
                    <v-icon color="#00C853" size="36">mdi-web</v-icon>
                  </div>
                  <h3 class="feature-title">24/7 Access</h3>
                  <p class="feature-description">
                    Access our services around the clock, every day of the year.
                    Submit applications and track progress at any time that
                    suits your schedule.
                  </p>
                </v-col>
                <v-col cols="12" sm="4" class="text-center">
                  <div class="icon-wrapper purple-bg">
                    <v-icon color="#6200EA" size="36">mdi-bell-outline</v-icon>
                  </div>
                  <h3 class="feature-title">Real-time Updates</h3>
                  <p class="feature-description">
                    Stay informed with instant notifications about your
                    application status. Receive timely updates and never miss
                    important information.
                  </p>
                </v-col>
              </v-row>
            </div>
          </v-col>

          <v-col cols="12" md="4" class="pa-6">
            <v-card class="login-card pa-5" color="white">
              <v-card-title
                class="text-center text-h5 font-weight-bold pb-2 text-grey-darken-4"
              >
                Welcome Back!
              </v-card-title>
              <v-card-subtitle class="text-center mb-6">
                Login to your account
              </v-card-subtitle>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Email Address"
                    density="compact"
                    variant="outlined"
                    class="mb-4"
                  ></v-text-field>

                  <v-text-field
                    label="Password"
                    density="compact"
                    variant="outlined"
                    type="password"
                    append-inner-icon="mdi-eye-off"
                  ></v-text-field>

                  <div
                    class="d-flex justify-space-between align-center mt-1 mb-4"
                  >
                    <v-checkbox-btn
                      label="Remember me"
                      class="ma-0 pa-0"
                    ></v-checkbox-btn>
                    <a
                      href="#"
                      class="text-primary text-caption font-weight-medium"
                      >Forgot password?</a
                    >
                  </div>

                  <v-btn
                    block
                    color="#4A00E0"
                    size="large"
                    class="login-btn"
                    to="/applicant/services"
                  >
                    Login
                  </v-btn>

                  <div class="text-center mt-6">
                    <span class="text-grey-darken-1"
                      >Don't have an account?</span
                    >
                    <a href="#" class="text-primary font-weight-bold ms-1"
                      >Sign up</a
                    >
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "HomePage",
};
</script>

<style scoped>
.page-wrapper {
  background-color: #f7f8fa;
  min-height: 100vh;
}

.nav-links .v-btn {
  text-transform: none !important;
  font-weight: 500;
  font-size: 17px;
}

.info-section {
  padding: 2rem;
  background-color: #ffffff;
  border-radius: 20px;
}

.info-title {
  color: #4a148c;
  font-weight: 700;
  font-size: 1.5rem;
  text-align: center;
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px auto;
}

.icon-wrapper.blue-bg {
  background-color: #e8f0fe;
}
.icon-wrapper.green-bg {
  background-color: #e6f9f0;
}
.icon-wrapper.purple-bg {
  background-color: #f3e8ff;
}

.feature-title {
  font-size: 1.1rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 10px;
}

.feature-description {
  font-size: 0.9rem;
  color: #7f8c8d;
  line-height: 1.6;
  padding: 0 10px;
}
.login-card {
  border-radius: 16px !important;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08) !important;
  border: none;
}

.v-text-field {
  font-size: 0.95rem;
}

.v-checkbox-btn .v-label {
  font-size: 0.9rem;
  color: #555;
}

a {
  text-decoration: none;
}

.login-btn {
  color: white;
  text-transform: none;
  font-weight: 600;
  font-size: 1rem;
  border-radius: 8px;
}
</style>
