<script setup>
import { ref, defineEmits } from 'vue';
import axios from 'axios';
import Navbar from "./Navbar.vue";

const name = ref('');
const description = ref('');
const alertMessage = ref('');
const alertType = ref('');
const emit = defineEmits();

const createItem = async () => {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/items/',
      {
        name: name.value,
        description: description.value,
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );
    // Emit the new item to the parent component
    emit('itemCreated', response.data);
    // Reset the form fields
    name.value = '';
    description.value = '';
    alertMessage.value = "Member added successfully!";
    alertType.value = "alert-primary"; // Changed to "alert-success" for success messages
  } catch (error) {
    console.error(error);
    alertMessage.value = "Failed creating member!";
    alertType.value = "alert-danger"; // Changed to "alert-danger" for error messages
  }
};
</script>

<template>
  <div>
    <Navbar />
  
    <div class="container mt-4">
      <!-- Breadcrumbs -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/">Home</router-link></li>
          <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Create Item</li>
        </ol>
      </nav>
  
      <div class="card mb-4">
        <div class="card-header p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle">
          <h3>Add New Item</h3>
        </div>
        <div class="card-body">
          <!-- Alert Message -->
          <div v-if="alertMessage" :class="['alert', alertType]">
            {{ alertMessage }}
          </div>
          <form @submit.prevent="createItem">
            <div class="mb-3">
              <label for="name" class="form-label">Name:</label>
              <input type="text" class="form-control" id="name" v-model="name" required />
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description:</label>
              <textarea class="form-control" id="description" v-model="description" required></textarea>
            </div>
            <button type="submit" class="btn btn-outline-primary">Add Item</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add any custom styles here if needed */
</style>
