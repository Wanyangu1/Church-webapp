<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const username = ref('Account'); // Default value

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const response = await axios.get('http://127.0.0.1:8000/api/user/profile/', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      username.value = response.data.username;
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
  }
});

function logout() {
  localStorage.removeItem('token');
  username.value = 'Account'; // Reset username
  window.location.href = '/login'; // Redirect to login page
}
</script>

<template>
<nav class="navbar navbar-expand-lg  navbar-light bg-light">
    <div class="container-fluid">
      <div class="d-flex flex-row justify-content-between align-items-center w-100">
        <!-- Offcanvas Toggle Button -->
        <button
          class="btn btn-outline-secondary me-2 border-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
        >
          <i class="bi bi-list"></i>
        </button>
        <a class="navbar-brand mx-auto my-2 my-lg-0 font-weight-bold" href="#">DOVE CHRISTIAN FOUNDATION</a>
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
      </div>
      <!-- Collapsible Content -->
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul class="navbar-nav ms-auto">
          <!-- User Dropdown -->
          <li class="nav-item dropdown">
            <a
              class="nav-link dropdown-toggle link-light"
              href="#"
              id="navbarDropdown"
              role="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="bi bi-person-circle btn btn-outline-secondary border-2">{{ username }}</i>
            </a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <router-link to="/profile" class="dropdown-item">Profile</router-link>
              </li>
              <li>
                <router-link to="/login" class="dropdown-item" @click="logout">Logout</router-link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div
    class="offcanvas offcanvas-start"
    tabindex="-1"
    id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasNavbarLabel">D.C.I.F ⛪</h5>
      <button
        type="button"
        class="btn-close close-button"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <!-- Separator Line -->
    <hr class="my-2" />
    <div class="offcanvas-body">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">
            <i class="bi bi-speedometer2"></i> Dashboard
          </router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="offcanvasNavbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-people"></i> Members
          </a>
          <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
            <li>
              <router-link to="/members" class="dropdown-item">
                <i class="bi bi-eye"></i> Browse
              </router-link>
            </li>
            <li>
              <router-link to="/createuser" class="dropdown-item">
                <i class="bi bi-person-plus"></i> Create
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle"
            href="#"
            id="offcanvasNavbarDropdownLeadership"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <i class="bi bi-person-badge"></i> Leadership
          </a>
          <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdownLeadership">
            <li>
              <router-link to="/items" class="dropdown-item">
                <i class="bi bi-eye"></i> Browse
              </router-link>
            </li>
            <li>
              <router-link to="/createuser" class="dropdown-item">
                <i class="bi bi-person-plus"></i> Create
              </router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/finance" class="nav-link">
            <i class="bi bi-wallet2"></i> Finance
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/events" class="nav-link">
            <i class="bi bi-calendar"></i> Events
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/settings" class="nav-link">
            <i class="bi bi-gear"></i> Settings
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <i class="bi bi-person"></i> Profile
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <i class="bi bi-box-arrow-right"></i> Logout
          </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.offcanvas {
  max-width: 250px;
}
.navbar-brand {
  font-size: 1.2rem;
}
.close-button {
  border: 2px solid #ced4da;
  border-radius: 30%;
}
.offcanvas-header {
  position: relative;
}
</style>