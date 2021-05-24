<template>
  <div>
    <child-component @custom="onCustom" />
    <p v-if="emitted">Emitted!</p>
  </div>
</template>

<script>
import ChildComponent from "./ChildComponent";

export default {
  name: "ParentComponent",
  components: { ChildComponent },
  data() {
    return {
      emitted: false,
    };
  },
  methods: {
    onCustom() {
      this.emitted = true;
    },
  },
};
</script>