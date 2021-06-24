<template>
  <div>
    <ul class="nav">
      <li class="nav-item" v-for="item in routes" :key="item.path">
        <router-link class="nav-link" :to="item.path">{{
          item.title
        }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import routes from "../router/routes.js";
export default {
  data() {
    return {
      routes,
    };
  },
};
</script>