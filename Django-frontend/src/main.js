import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap";
import Navbar from "./components/Navbar.vue";

// Import the FontAwesome core
import { library } from "@fortawesome/fontawesome-svg-core";

// Import specific icons
import { faUserSecret } from "@fortawesome/free-solid-svg-icons";

// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

// Add icons to the library
library.add(faUserSecret);

const app = createApp(App);

// Register the FontAwesomeIcon component globally
app.component("font-awesome-icon", FontAwesomeIcon);

app.use(router);

app.mount("#app");
