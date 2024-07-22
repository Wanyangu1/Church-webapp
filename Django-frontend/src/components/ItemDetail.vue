<template>
  <div>
    <Navbar />

    <div class="container mt-5">
      <!-- Breadcrumbs -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item"><router-link to="/dashboard">Dashboard</router-link></li>
          <li class="breadcrumb-item"><router-link to="/members">Detail</router-link></li>
          <li class="breadcrumb-item active" aria-current="page">Item Detail</li>
        </ol>
      </nav>

      <!-- Alert Messages -->
      <div v-if="alertMessage" :class="['alert', alertType]" role="alert">
        {{ alertMessage }}
      </div>

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
          <router-link to="/members" class="btn btn-outline-secondary ms-2">Back to List</router-link>
        </div>
      </div>
      <div v-else class="alert alert-warning">
        <p>Loading Details...</p>
      </div>

      <!-- Pagination -->
      <nav aria-label="Page navigation" class="mt-4">
        <ul class="pagination justify-content-center">
          <!-- Previous Button -->
          <li class="page-item" :class="{ disabled: currentPage === 1 }">
            <button class="page-link" @click="handlePageChange(currentPage - 1)" :disabled="currentPage === 1">
              <i class="bi bi-chevron-left"></i> Previous
            </button>
          </li>

          <!-- Page Numbers -->
          <li
            v-if="totalPages <= 5 && totalPages > 0"
            v-for="page in totalPages"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="handlePageChange(page)">
              {{ page }}
            </button>
          </li>

          <li v-if="totalPages > 5 && currentPage > 3" class="page-item disabled">
            <span class="page-link">...</span>
          </li>

          <li
            v-if="totalPages > 5 && currentPage <= 3"
            v-for="page in Math.min(5, totalPages)"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="handlePageChange(page)">
              {{ page }}
            </button>
          </li>

          <li
            v-if="totalPages > 5 && currentPage > 3"
            v-for="page in [currentPage - 1, currentPage, currentPage + 1]"
            :key="page"
            class="page-item"
            :class="{ active: currentPage === page }"
          >
            <button class="page-link" @click="handlePageChange(page)">
              {{ page }}
            </button>
          </li>

          <li v-if="totalPages > 5 && currentPage < totalPages - 2" class="page-item disabled">
            <span class="page-link">...</span>
          </li>

          <li v-if="totalPages > 5 && currentPage < totalPages - 2" class="page-item">
            <button class="page-link" @click="handlePageChange(totalPages)">
              {{ totalPages }}
            </button>
          </li>

          <!-- Next Button -->
          <li class="page-item" :class="{ disabled: currentPage === totalPages }">
            <button class="page-link" @click="handlePageChange(currentPage + 1)" :disabled="currentPage === totalPages">
              Next <i class="bi bi-chevron-right"></i>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import Navbar from "./Navbar.vue";

const item = ref(null);
const alertMessage = ref("");
const alertType = ref(""); // Class for the alert, e.g., 'alert-success', 'alert-danger'
const route = useRoute();
const router = useRouter();
const currentPage = ref(1);
const totalPages = ref(1);

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
    alertMessage.value = "Error fetching item details.";
    alertType.value = "alert-danger";
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
    alertMessage.value = "Details updated successfully!";
    alertType.value = "alert-primary";
  } catch (error) {
    console.error("Error updating details:", error);
    alertMessage.value = "Error updating details.";
    alertType.value = "alert-danger";
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
    alertMessage.value = "Error deleting item.";
    alertType.value = "alert-danger";
  }
};

const handlePageChange = (page) => {
  if (page > 0 && page <= totalPages.value) {
    currentPage.value = page;
    // Fetch items based on the new page
  }
};

onMounted(() => {
  fetchItem();
  // Fetch total pages and current page on mounted
});
</script>

<style scoped>
.card {
  cursor: pointer;
}
.card:hover {
  background-color: #f8f9fa;
}
</style>
