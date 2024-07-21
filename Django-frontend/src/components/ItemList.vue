<!-- src/components/ItemList.vue -->
<template>
  <div>
    <Navbar />

    <div class="container mt-5">
      <div class="col-lg-12">
        <div class="card mb-2">
          <div class="card-header">
            <h2 class="mb-4 text-center">Item List</h2>
          </div>
          <div v-if="items.length > 0" class="table-responsive">
            <table class="table table-striped table-hover">
              <thead class="thead-dark">
                <tr>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.id">
                  <td>{{ item.name }}</td>
                  <td>{{ item.description }}</td>
                  <td>
                    <router-link
                      :to="'/items/' + item.id"
                      class="btn btn-info btn-sm"
                      >View</router-link
                    >
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="alert alert-warning text-center" role="alert">
            No items found.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Navbar from "./Navbar.vue";

const items = ref([]);

const fetchItems = async () => {
  try {
    const response = await axios.get("http://127.0.0.1:8000/api/items/", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    items.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(fetchItems);
</script>
