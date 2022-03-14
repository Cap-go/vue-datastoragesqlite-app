<template>
  <div id="onedb-twotables-container">
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
  name: 'OneDBTwoTablesTest',
  setup() {
    const log = ref("");
    const { openStore, getItem, setItem, getAllKeys, getAllKeysValues,
            setTable, clear} = useStorageSQLite();
    let errMsg = ""; 

    const setFirstTable = async () => {
      log.value = log.value.concat("-> Starting Set First Table \n");
      try {
        // open store
        await openStore({database:"myStore",table:"saveData"});
          log.value = log.value.concat("openStore was successful \n");
        // clear the store 
        await clear();
        log.value = log.value.concat("clear 'saveData' was successful \n");
        // store a string 
        await setItem("app","App Opened");
        const app = await getItem('app');
        if(app != "App Opened") {
          errMsg = "setItem/getItem app failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem app was successful \n");
        }
        // store a JSON Object in the store
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

    const setSecondTable = async () => {
      log.value = log.value.concat("-> Starting Set Second Table \n");
      try {
        await setTable("otherData");
        log.value = log.value.concat("setTable 'otherData' was successful \n");
        await clear();
        log.value = log.value.concat("clear 'otherData' was successful \n");
        // store a string 
        await setItem("key1", "Hello World!");
        const key1 = await getItem('key1');
        if(key1 != "Hello World!") {
          errMsg = "setItem/getItem key1 failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem key1 was successful \n");
        }
        // store a JSON Object in the store
        const data = {'a':60,'pi':'3.141516','b':'cool'};
        await setItem("key2",JSON.stringify(data));
        const key2 = await getItem("key2");
        if( key2 != JSON.stringify(data) ) {
          errMsg = "setItem/getItem key2 failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem key2 was successful \n");
        }
        // Get All Keys
        const keys = await getAllKeys();
        if(keys.length != 2) {
          errMsg = "getAllKeys failed \n";
          return false;
        } else {
          for(let i = 0; i< keys.length;i++) {
            log.value = log.value.concat(" key[" + i + "] = " + keys[i] + "\n");
          }
          log.value = log.value.concat("getAllKeys was successful \n");
        }
        return true;
      } catch(err) {
        errMsg = `${err}`;
        return false;
      }
    };
    const updateFirstTable = async () => {
      log.value = log.value.concat("-> Starting Update First Table \n");
      try {
        await setTable("saveData");
        log.value = log.value.concat("setTable 'saveData' was successful \n");
        // store a JSON Object in the store
        const data = {'color':"#ff235a",'opacity':0.75};
        await setItem("state",JSON.stringify(data));
        const state = await getItem("state");
        if( state != JSON.stringify(data) ) {
          errMsg = "setItem/getItem state failed \n";
          return false;
        } else {
          log.value = log.value.concat("setItem/getItem state was successful \n");
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
        return true;
      } catch(err) {
        errMsg = `${err}`;
        return false;
      }
    };
    const getKeysValuesFromSecondTable = async () => {
      log.value = log.value.concat("-> Starting Get Keys Values from Second Table \n");
      try {
        await setTable("otherData");
        log.value = log.value.concat("setTable 'otherData' was successful \n");
        // Get All Keys/Values
        const keysvalues = await getAllKeysValues();
        if(keysvalues.length != 2) {
          errMsg = "getAllKeysValues failed \n";
          return false;
        } else {
          for(let i = 0; i< keysvalues.length;i++) {
            log.value = log.value.concat(" key[" + i + "] = " + keysvalues[i].key +
                ' value[' + i + "] = " + keysvalues[i].value  + "\n");
          }
          log.value = log.value.concat("getAllKeysValues was successful \n");
        }
        return true;
      } catch(err) {
        errMsg = `${err}`;
        return false;
      }
    };   

    const oneDBTwoTablesTest = async () => {
        log.value = log.value.concat("**** Starting Test One DB Two Tables Store ****\n");
        // Set first table 
        const retFirst =  await setFirstTable();
        if(!retFirst) {
            log.value = log.value.concat("\n**** Test One DB Two Table Store first table failed ****\n"); 
            log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
            return false;
        } else {
            // Set second table
            const retSecond =  await setSecondTable();
            if(!retSecond) {
                log.value = log.value.concat("\n**** Test One DB Two Table Store second table failed ****\n"); 
                log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
                return false;
            } else {
                // update first table
                const retFirst = await updateFirstTable();
                if(!retFirst) {
                    log.value = log.value.concat("\n**** Test One DB Two Table Store update first table failed ****\n"); 
                    log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
                    return false;
                } else {
                    const retSecond = await getKeysValuesFromSecondTable();
                    if(!retSecond) {
                        log.value = log.value.concat("\n**** Test One DB Two Table Store get values from second table failed ****\n"); 
                        log.value = log.value.concat("\n**** Test One DB Two Tables Store failed ****\n"); 
                        return false;
                    } else {
                        return true;
                    }
                }
            }
        }
    }
    onMounted(async () => {
        // Running the test
        const retOneDBTwoTablesTest = await oneDBTwoTablesTest();
        console.log(`retOneDBTwoTablesTest ${retOneDBTwoTablesTest}`);
        if(!retOneDBTwoTablesTest) {
          log.value = log.value.concat(`\n!! ${errMsg} !!\n`); 
          log.value = log.value.concat("\n**** Test One DB Two TableS Store failed ****\n"); 
        } else {
          log.value = log.value.concat("\n**** Test One DB Two Table Store was successful ****\n"); 
        }
    });
    return { log, errMsg };
  }

});
</script>
