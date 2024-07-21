<!-- src/components/Sidebar.vue -->
<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 bg-light"
    style="width: 280px"
  >
    <router-link
      to="/"
      class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none"
    >
      <span class="fs-4">Dashboard</span>
    </router-link>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <router-link to="/items" class="nav-link link-dark"
          >Item List</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/register" class="nav-link link-dark"
          >Register</router-link
        >
      </li>
      <li class="nav-item">
        <router-link to="/login" class="nav-link link-dark">Login</router-link>
      </li>
    </ul>
  </div>
</template>

<script setup></script>
