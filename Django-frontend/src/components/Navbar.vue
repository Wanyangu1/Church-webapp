<script setup></script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <div class="container-fluid">
    <div class="d-flex flex-row justify-content-center align-items-center w-100">
      <button
        class="btn btn-outline-info me-2 me-lg-3"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasNavbar"
        aria-controls="offcanvasNavbar"
      >
        ⛪
      </button>
      <a class="navbar-brand mx-auto my-2 my-lg-0" href="#">Dove Christian Fellowship⛪</a>
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
    <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
      <ul class="navbar-nav ms-auto">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link link-light">Dashboard</router-link>
        </li>
        <li class="nav-item dropdown">
          <a
            class="nav-link dropdown-toggle link-light"
            href="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Account
          </a>
          <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <router-link to="/register" class="dropdown-item">Register</router-link>
            </li>
            <li>
              <router-link to="/login" class="dropdown-item">Logout</router-link>
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/items" class="nav-link link-light">List</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/items" class="nav-link link-light">Item</router-link>
        </li>
      </ul>
    </div>
  </div>
</nav>


  <div
    class="offcanvas offcanvas-start .offcanvas-sm"
    tabindex="-1"
    id="offcanvasNavbar"
    aria-labelledby="offcanvasNavbarLabel"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasNavbarLabel">&nbsp; D.C.I.F⛪</h5>
      <button
        type="button"
        class="btn-close text-reset"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <div class="offcanvas-body">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/dashboard" class="nav-link">Dashboard</router-link>
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
            Members
          </a>
          <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
            <li>
              <router-link to="/items" class="dropdown-item"
                >Browse</router-link
              >
            </li>
            <li>
              <router-link to="/createuser" class="dropdown-item"
                >Create</router-link
              >
            </li>
          </ul>
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
            Leadership
          </a>
          <ul class="dropdown-menu" aria-labelledby="offcanvasNavbarDropdown">
            <li>
              <router-link to="/items" class="dropdown-item"
                >Browse</router-link
              >
            </li>
            <li>
              <router-link to="/createuser" class="dropdown-item"
                >Create</router-link
              >
            </li>
          </ul>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Logout</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
