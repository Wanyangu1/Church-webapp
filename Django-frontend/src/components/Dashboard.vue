<template>
  <div>
    <Navbar />

    <div class="container mt-4">
      <!-- Breadcrumbs -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Dashboard</li>
        </ol>
      </nav>

      <div class="row mt-4">
        <main class="col-md-9 mx-auto col-lg-10 px-md-4">
          <div v-if="!loggedIn" class="alert alert-warning">
            <p>Please log in to view your dashboard.</p>
            <router-link to="/login" class="btn btn-primary">Login</router-link>
            <router-link to="/register" class="btn btn-secondary">Register</router-link>
          </div>

          <div v-else>
            <div class="row">
              <div class="col-md-4 mb-4" v-for="card in cards" :key="card.title">
                <router-link :to="card.link" class="card h-100 text-decoration-none text-dark">
                  <div class="card-body text-center">
                    <i :class="`bi ${card.icon} mb-3`" style="font-size: 2rem;"></i>
                    <h5 class="card-title">{{ card.title }}</h5>
                    <p class="card-text">{{ card.description }}</p>
                    <p class="card-text"><small class="text-muted">{{ card.info }}</small></p>
                  </div>
                </router-link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Navbar from './Navbar.vue';

const loggedIn = ref(localStorage.getItem('token'));

const cards = ref([
  {
    title: 'Members',
    description: 'Manage church members',
    icon: 'bi-people',
    info: 'View and edit member details',
    link: '/members',
  },
  {
    title: 'Leadership',
    description: 'Manage church leadership',
    icon: 'bi-person-badge',
    info: 'Assign and manage leadership roles',
    link: '/leadership',
  },
  {
    title: 'Profile',
    description: 'View and edit your profile',
    icon: 'bi-person-circle',
    info: 'Update your personal information',
    link: '/profile',
  },
  {
    title: 'Settings',
    description: 'Configure system settings',
    icon: 'bi-gear',
    info: 'Change application settings',
    link: '/settings',
  },
  {
    title: 'Events',
    description: 'View upcoming events',
    icon: 'bi-calendar-event',
    info: 'Create and manage events',
    link: '/events',
  },
  {
    title: 'Finance',
    description: 'Manage church finances',
    icon: 'bi-currency-dollar',
    info: 'Track donations and expenses',
    link: '/finance',
  },
]);
</script>

<style scoped>
.card {
  cursor: pointer;
}
.card:hover {
  background-color: #f8f9fa;
}
.bi {
  font-size: 2rem;
  margin-bottom: 10px;
}
</style>
