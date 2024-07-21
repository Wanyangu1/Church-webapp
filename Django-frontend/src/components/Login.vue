<!-- src/components/Login.vue -->
<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <a class="navbar-brand mb-0 h1 me-5" href="#">ACW Website✨</a>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/login" class="nav-link">
              <button class="btn btn-primary me-1">Login</button>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link">
              <button class="btn btn-outline-primary me-5">Sign Up</button>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-7 col-lg-5">
        <div class="card">
          <div class="card-header text-center">
            <h2>Login</h2>
          </div>
          <div class="card-body">
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="username" class="form-label">Username:</label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
                  v-model="username"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">Password:</label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  v-model="password"
                  required
                />
              </div>
              <button type="submit" class="btn btn-primary d-block mx-auto w-75">Login</button>
            </form>
            <div class="mt-3 text-center">
              <p>
                Don't have an account?
                <router-link to="/register">Sign up</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/auth/token/",
          {
            username: this.username,
            password: this.password,
          },
        );
        localStorage.setItem("token", response.data.access);
        this.$router.push("/dashboard");
      } catch (error) {
        console.error("Error during login:", error);
      }
    },
  },
};
</script>
