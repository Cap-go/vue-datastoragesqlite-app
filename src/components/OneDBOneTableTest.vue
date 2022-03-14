<template>
  <div id="onedb-onetable-container">
    <div id="log">
        <pre>
          <p>{{log}}</p>
        </pre>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref, onMounted } from 'vue';
import { useStorageSQLite } from 'vue-data-storage-sqlite-hook/dist';

export default defineComponent({
  name: 'OneDBOneTableTest',
  setup() {
    const log = ref("");
    const { openStore, getItem, setItem, getAllKeys,
            clear} = useStorageSQLite();
    let errMsg = ""; 
    const oneDBOneTableTest = async () => {
      try {
        log.value = log.value.concat("**** Starting Test One DB One Table Store ****\n"); 
        // open store
        await openStore({database:"myStore",table:"saveData"});
        log.value = log.value.concat("openStore was successful \n");
        // clear the store 
        await clear();
        log.value = log.value.concat("clear was successful \n");
        // store a string 
        await setItem("app","App Opened");
        const app = await getItem('app');
        if(app != "App Opened") {
          errMsg = "setItem/getItem app failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem app was successful \n");
        }
        // store a JSON Object in the default store
        const data = {'age':40,'name':'jeep','email':'jeep@example.com'};
        await setItem("user",JSON.stringify(data));
        const testUser = await getItem("user");
        if( testUser != JSON.stringify(data) ) {
          errMsg = "setItem/getItem user failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem user was successful \n");
        }
        // Get All Keys
        const keys = await getAllKeys();
        if(keys.length != 2) {
          errMsg = "getAllKeys failed \n";
          return false;
        } else {
          for(let i = 0; i< keys.length;i++) {
            log.value = log.value.concat(' key[' + i + "] = " + keys[i] + "\n");
          }
          log.value = log.value.concat("getAllKeys was successful \n");
        }
        return true;
      } catch(err) {
        errMsg = `${err}`;
        return false;
      }
    };
    onMounted(async () => {
        // Running the test
        const retOneDBOneTableTest = await oneDBOneTableTest();
        console.log(`retOneDBOneTableTest ${retOneDBOneTableTest}`);
        if(!retOneDBOneTableTest) {
          log.value = log.value.concat(`\n!! ${errMsg} !!\n`); 
          log.value = log.value.concat("\n**** Test One DB One Table Store failed ****\n"); 
        } else {
          log.value = log.value.concat("\n**** Test One DB One Table Store was successful ****\n"); 
        }
    });
    return { log, errMsg };
  }

});
</script>
