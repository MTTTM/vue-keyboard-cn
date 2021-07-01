<template>
  <div style="padding-top: 40px">
    <ul class="nav">
      <li>
        <a
          href="https://github.com/MTTTM/vue-keyboard-cn/tree/main/src/demo"
          target="_blank"
          >demo sourseCode</a
        >
      </li>
      <template v-for="item in routes">
        <li
          class="nav-item"
          :key="item.path"
          v-if="item.path !== '/' && item.path !== '/home'"
        >
          <router-link class="nav-link" :to="item.path">{{
            item.title
          }}</router-link>
        </li>
      </template>
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