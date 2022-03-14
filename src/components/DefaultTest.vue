<template>
  <div id="default-container">
    <div id="log">
        <pre>
          <p>{{log}}</p>
        </pre>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref , onMounted} from 'vue';
import { useStorageSQLite } from 'vue-data-storage-sqlite-hook/dist';

export default defineComponent({
  name: 'DefaultTest',
  setup() {
    const log = ref("");
    const { openStore, getItem, setItem, getAllKeys, getAllValues,
            getAllKeysValues, isKey, removeItem,
            clear} = useStorageSQLite();
    let errMsg = ""; 
    const defaultTest = async () => {
      log.value = log.value.concat("**** Starting Test Default Store ****\n");
      try { 
        // open store
        await openStore({});
        log.value = log.value.concat("openStore was successful \n");
        // clear the store 
        await clear();
        log.value = log.value.concat("clear was successful \n");
        // store a string 
        await setItem("session","Session Opened");
        const session = await getItem('session');
        if(session != "Session Opened") {
          errMsg = "setItem/getItem session failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem session was successful \n");
        }
        // store a JSON Object in the default store
        const data = {'a':20,'b':'Hello World','c':{'c1':40,'c2':'cool'}};
        await setItem("testJson",JSON.stringify(data));
        const testJson = await getItem("testJson");
        if( testJson != JSON.stringify(data) ) {
          errMsg = "setItem/getItem testJson failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem testJson was successful \n");
        }
        // store a number in the default store
        const data1 = 243.567;
        await setItem("testNumber",data1.toString());
        // read number from the store
        const testNumber = await getItem("testNumber");
        if( testNumber != data1 ) {
          errMsg = "setItem/getItem testNumber failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem testNumber was successful \n");
        }
        // isKey tests
        const iskey = await isKey('testNumber');
        if( !iskey ) {
          errMsg = "isKey testNumber failed \n";
          return false;
        } else {
          log.value = log.value.concat("isKey testNumber was successful \n");
        }
        const iskey1 = await isKey('foo');
        if( iskey1 ) {
          errMsg = "isKey foo failed \n";
          return false;
        } else {
          log.value = log.value.concat("isKey foo was successful \n");
        }
        // Get All Keys
        const keys = await getAllKeys();
        if(keys.length != 3) {
          errMsg = "getAllKeys failed \n";
          return false;
        } else {
          for(let i = 0; i< keys.length;i++) {
            log.value = log.value.concat(' key[' + i + "] = " + keys[i] + "\n");
          }
          log.value = log.value.concat("getAllKeys was successful \n");
        }
        // Get All Values
        const values = await getAllValues();
        if(values.length != 3) {
          errMsg = "getAllValues failed \n";
          return false;
        } else {
          for(let i = 0; i< values.length;i++) {
            log.value = log.value.concat(' key[' + i + "] = " + values[i] + "\n");
          }
          log.value = log.value.concat("getAllValues was successful \n");
        }
        // Get All KeysValues
        const keysvalues = await getAllKeysValues();
        if(keysvalues.length != 3) {
          errMsg = "getAllKeysValues failed \n";
          return false;
        } else {
          log.value = log.value.concat("getAllKeysValues was successful \n");
        }
        // Remove a key 
        await removeItem('testJson')
        log.value = log.value.concat("removeItem was successful \n");
        // Get All Keys
        const keys1 = await getAllKeys();
        if(keys1.length != 2) {
          errMsg = "getAllKeys after removeItem failed \n";
          return false;
        } else {
          for(let i = 0; i< keys1.length;i++) {
            log.value = log.value.concat(' key[' + i + "] = " + keys1[i] + "\n");
          }
          log.value = log.value.concat("getAllKeys after removeItem was successful \n");
        }
        return true;
      } catch(err) {
        if (Object.keys(err).includes('message')) {
          errMsg = `${err.message}`;
        } else {
          errMsg = `${err}`;
        }

        return false;
      }
    };
    onMounted(async () => {
        // Running the test
        const retDefaultTest = await defaultTest();
        console.log(`retDefaultTest ${retDefaultTest}`);
        if(!retDefaultTest) {
          log.value = log.value.concat(`\n!! ${errMsg} !!\n`); 
          log.value = log.value.concat("\n**** Test Default Store failed ****\n"); 
        } else {
          log.value = log.value.concat("\n**** Test Default Store was successful ****\n"); 
        }
    });
    return { log, errMsg };
  }

});
</script>
