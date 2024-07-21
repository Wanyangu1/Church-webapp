<!-- src/components/CreateItem.vue -->
<script setup>
import { ref } from 'vue';
import axios from 'axios';
import Navbar from "./Navbar.vue";

const name = ref('');
const description = ref('');

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
      },
    );
    // Emit the new item to the parent component
    emit('itemCreated', response.data);
    // Reset the form fields
    name.value = '';
    description.value = '';
    alert("Member added succesfully!");
  } catch (error) {
    console.error(error);
  }
};
</script>


<template>
    <div>
        <Navbar />

    <div class="card mb-4">
      <div class="card-header p-3 text-primary-emphasis bg-primary-subtle border border-primary-subtle">
        <h3>Add New Item</h3>
      </div>
      <div class="card-body">
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
</template>
  
  