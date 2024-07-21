<!-- src/components/ItemDetail.vue -->
<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Navbar from "./Navbar.vue";

const item = ref(null);
const route = useRoute();
const router = useRouter();

const fetchItem = async () => {
  try {
    const response = await axios.get(
      `http://127.0.0.1:8000/api/items/${route.params.id}/`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    item.value = response.data;
  } catch (error) {
    console.error("Error fetching item:", error);
  }
};

const updateItem = async () => {
  try {
    const response = await axios.put(
      `http://127.0.0.1:8000/api/items/${route.params.id}/`,
      item.value,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      },
    );
    item.value = response.data;
    alert("Item updated successfully!");
  } catch (error) {
    console.error("Error updating item:", error);
  }
};

const deleteItem = async () => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/items/${route.params.id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    router.push("/items");
  } catch (error) {
    console.error("Error deleting item:", error);
  }
};

onMounted(fetchItem);
</script>

<template>
  <div>
    <Navbar />

    <div class="container mt-5">
      <div v-if="item" class="card">
        <div class="card-header">
          <h3>Member Detail</h3>
        </div>
        <div class="card-body">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input
              type="text"
              id="name"
              class="form-control"
              v-model="item.name"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <textarea
              id="description"
              class="form-control"
              v-model="item.description"
            ></textarea>
          </div>
          <button @click="updateItem" class="btn btn-outline-primary me-2">
            Update
          </button>
          <button @click="deleteItem" class="btn btn-outline-danger">Delete</button>
          <router-link to="/items" class="btn btn-outline-secondary ms-2"
            >Back to List</router-link
          >
        </div>
      </div>
      <div v-else class="alert alert-warning">
        <p>Loading item...</p>
      </div>
    </div>
  </div>
</template>


