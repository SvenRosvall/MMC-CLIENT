<template>

    <q-dialog v-model='model' persistent>
      <q-card style="min-width: 350px">
        <q-card-section>
          <div class="text-h6">Event Variables are still loading</div>
          <div class="text-h6">Please wait</div>
        </q-card-section>
        <q-card-section class="text-h6" align="center">
          <q-spinner-orbit color="primary" size="2em"/>
        </q-card-section>
        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Close" v-close-popup/>
        </q-card-actions>
      </q-card>
    </q-dialog>

</template>


<script setup>

import {inject, onBeforeMount, onMounted, computed, watch, ref} from "vue";
import {sleep} from "components/functions/utils.js"
import {secondsNow} from "components/functions/utils.js"
import {refreshEventIndexes} from "components/functions/EventFunctions.js"


const store = inject('store')
const name = "EventVariablesLoadingDialog"
const variableCount = ref(0)
const cbusTrafficTime = ref(0)

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  nodeNumber: {
    type: Number,
    default: 0
  }
})

const emit = defineEmits(['update:modelValue', 'EventVariablesLoadingDialog'])

const model = computed({
      get() { return props.modelValue },
      set(newValue) { emit('update:modelValue', newValue) }
    })

// model changes when Dialog opened & closed
watch(model, async () => {
  //console.log(name + `: WATCH model ` + model.value)
  if (model.value == true){
    //console.log(name + `: WATCH model ` + model.value)
    await ReadAllEventVariables(props.nodeNumber)
  }
})


//
// This assumes the event indexes have already been refreshed
//
const ReadAllEventVariables = async (nodeNumber) => {
  console.log(name + ": ReadAllEventVariables: " + nodeNumber)
  let startTime = Date.now()

  try{
    // don't use forEach, as couldn't get it to work with async/await
    var storedEventsNI = store.state.nodes[props.nodeNumber].storedEventsNI
    for(const eventIdentifier in storedEventsNI){
      console.log(name + ": ReadAllEventVariables: event " + eventIdentifier)
      store.methods.request_event_variables_by_identifier(nodeNumber, eventIdentifier)
      await sleep(100)
    }

  } catch (err) {
    console.log(name + ": ReadAllEventVariables: " + err)
  }

  await sleep(2000)

  while ((Date.now() - store.state.cbusTrafficTimeStamp) < 2000) {
    await sleep(100)
  }

  await sleep(2000)       // allow some time for the responses to catch up

  // signal it's complete
  emit('EventVariablesLoadingDialog', 'finished normally')
  console.log(name + ": ReadAllEventVariables: finished")

}


onBeforeMount(() => {
})

onMounted(() => {
})

</script>

<style scoped>

</style>
