<template>
  <div id="wrapper-container">
    <div id="log">
        <pre>
          <p>{{log}}</p>
        </pre>
    </div>
  </div>
</template>

<script >
import { defineComponent, ref, onMounted } from 'vue';
import { Capacitor } from '@capacitor/core';
import { CapacitorDataStorageSqlite } from 'capacitor-data-storage-sqlite';
import { StorageAPIWrapper } from '../Utils/StorageAPIWrapper';

export default defineComponent({
  name: 'WrapperTest',
  setup() {
    const log = ref("");
    const platform = Capacitor.getPlatform();
    console.log("*** platform " + platform);
    const storageSQLite = CapacitorDataStorageSqlite;
    const wrapper = StorageAPIWrapper(storageSQLite);
    let errMsg = ""; 
    onMounted(async () => {
      const wrapperError = (err) => {
          log.value = log.value.concat(`\n!! ${err} !!\n`); 
          log.value = log.value.concat("\n**** Test Wrapper failed ****\n"); 
      }
      // Running the test
      log.value = log.value.concat("**** Starting Test Wrapper Store ****\n"); 
      try {
        await wrapper.openStore({database:"wrapperStore",table:"wrapperData"});
        console.log("after openStore");
        await wrapper.clear();
        await wrapper.setItem('session','Session Opened');
        const value = await wrapper.getItem('session');
        if( value !== 'Session Opened') wrapperError('setItem/getItem session failed');
        const result = await wrapper.isKey('session');
        if(!result) wrapperError('isKey "session" failed');
        
        log.value = log.value.concat("\n**** Test Wrapper was successful ****\n"); 
      } catch(err) {
        wrapperError (err);     
      }
/*
      wrapper.openStore({database:"wrapperStore",table:"wrapperData"},(res,err) => {
        if(err) {
          wrapperError(err);
        } else {
          log.value = log.value.concat("openStore was successful \n");
          wrapper.clear( (err) => {
            if(err) {
              wrapperError(err);
            } else {

              log.value = log.value.concat("\n**** Test Wrapper was successful ****\n"); 

            }


          });

        }
      });
      */
    });
    return { log, errMsg, wrapper };
  }
});
/*
    log.value = log.value.concat("**** Starting Test Wrapper Store ****\n"); 
    // open store

    wrapper.openStore({database:"wrapperStore",table:"wrapperData"}, (res) => {
      console.log(" in wrapper.openStore res ", res)
      if( !res ) {
        log.value = log.value.concat("openStore failed \n");
        return { log };
      } else {
        console.log(" openStore was successful ", res)
        log.value = log.value.concat("openStore was successful \n");
        wrapper.clear( res => {
          console.log(" in wrapper.clear ", res)
          if( !res ) {
            log.value = log.value.concat("clear failed \n");
            return { log };
          } else {
            log.value = log.value.concat("clear was successful \n");
            wrapper.setItem("session","Session Opened",(res) => {
              console.log(" in wrapper.setItem ", res)
            if( !res ) {
              log.value = log.value.concat("clear failed \n");
              return { log };
            } else {
              wrapper.getItem('session', (value) => {
                console.log(" in wrapper.getItem ", value)
                if(value != "Session Opened") {
                  log.value = log.value.concat("setItem/getItem session failed \n");
                  return { log };
                } else {
                  log.value = log.value
                        .concat("setItem/getItem session was successful \n");
                  wrapper.isKey('session', (res) => {
                    console.log(" in wrapper.isKey ", res)
                    if( !res ) {
                      log.value = log.value.concat("isKey failed \n");
                      return { log };
                    } else {
                      log.value = log.value.concat("isKey was successful \n");
                      log.value = log.value
                        .concat("\n**** Test Wrapper Store was successful ****\n"); 
                      return { log };
                    }

                  });
                }

              });
            }
            });
          }
        });
      }
    });
    return { log };
  }

});
*/
</script>
