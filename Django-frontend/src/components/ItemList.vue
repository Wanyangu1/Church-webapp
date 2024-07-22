<script setup>
import { ref, onMounted, computed } from "vue";  
import axios from "axios";
import Navbar from "./Navbar.vue";

const items = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
const searchQuery = ref("");

// Fetch items from the API
const fetchItems = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/items/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      params: {
        page: currentPage.value,
      },
    });
    items.value = response.data.results;
    totalPages.value = response.data.total_pages;
  } catch (error) {
    console.error(error);
  }
};

// Delete an item
const deleteItem = async (id) => {
  try {
    await axios.delete(`http://127.0.0.1:8000/api/items/${id}/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    items.value = items.value.filter((item) => item.id !== id);
  } catch (error) {
    console.error(error);
  }
};

// Handle page change
const handlePageChange = (page) => {
  currentPage.value = page;
  fetchItems();
};

// Filter items based on the search query
const filteredItems = computed(() => {
  const query = searchQuery.value.toLowerCase();
  return items.value.filter(item => item.name.toLowerCase().includes(query));
});

// Fetch items on component mount
onMounted(fetchItems);
</script>

<template>
  <div>
    <Navbar />
    <div class="container mt-3">
      <!-- Breadcrumbs -->
      <nav aria-label="breadcrumb">
        <ol class="breadcrumb">
          <li class="breadcrumb-item">
            <router-link to="/dashboard">Dashboard</router-link>
          </li>
          <li class="breadcrumb-item active" aria-current="page">Members</li>
        </ol>
      </nav>
      <div class="d-flex justify-content-between align-items-center mb-3">
        <!-- Search Bar -->
        <input
          v-model="searchQuery"
          class="form-control w-50 border-2"
          type="text"
          placeholder="🔍Search by name..."
        />
        <router-link to="/createuser" class="btn btn-outline-secondary border-1">Create New Member</router-link>
      </div>
      <div class="col-lg-12 mt-2">
        <div class="card mb-2">
          <div class="card-header">
            <h2 class="mb-4 text-center">Church Members</h2>
          </div>
          <div v-if="filteredItems.length > 0" class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in filteredItems" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>
                  <td>
                    <router-link :to="'/items/' + item.id" class="btn btn-outline-info btn-sm me-2 rounded-pill">
                      <i class="bi bi-pencil"></i> Edit
                    </router-link>
                    <button @click="deleteItem(item.id)" class="btn btn-danger btn-sm rounded-pill">
                      <i class="bi bi-trash"></i> Delete
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="alert alert-warning text-center" role="alert">
            No items found.
          </div>
          <!-- Pagination Controls -->
          <nav aria-label="Page navigation">
            <ul class="pagination">
              <li class="page-item" :class="{ disabled: currentPage === 1 }">
                <a class="page-link" @click="handlePageChange(currentPage - 1)" href="#">Previous</a>
              </li>
              <li
                v-for="page in totalPages"
                :key="page"
                class="page-item"
                :class="{ active: currentPage === page }"
              >
                <a class="page-link" @click="handlePageChange(page)" href="#">{{ page }}</a>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages }">
                <a class="page-link" @click="handlePageChange(currentPage + 1)" href="#">Next</a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

