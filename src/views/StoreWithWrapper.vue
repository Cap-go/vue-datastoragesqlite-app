<template>
  <h1>StoreWithWrapper</h1>
  <WrapperTest />
</template>
<script>
import WrapperTest from '@/components/WrapperTest.vue';
export default {
  name: 'StoreWithWrapper',
  components: { WrapperTest }
};
</script>
<style>
h1 {
    text-align: center;
}
</style>