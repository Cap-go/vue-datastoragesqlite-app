<template>
  <h1>Home</h1>
  <button @click="$router.push('/storedefault')">StoreDefault</button>
  <button @click="$router.push('/storeonedbonetable')">StoreOneDBOneTable</button>
  <button @click="$router.push('/storeonedbtwotables')">StoreOneDBTwoTables</button>
  <button @click="$router.push('/storewrapper')">StoreWithWrapper</button>
</template>
<script>
  export default {
    name: 'HomePage',
  }
</script>
<style>
h1 {
    text-align: center;
}
button {
  font-size: 20px;
  margin-top: 1em;
  margin-left: 2em;
}
</style>