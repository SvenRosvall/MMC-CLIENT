<template>

    <q-dialog v-model='model' persistent>
      <q-card style="min-width: 800px">

        <q-banner inline-actions style="min-height: 0;" class="bg-primary text-white dense no-padding">
          <div class="text-h6" >
            Information about the Events View
          </div>
          <template v-slot:action>
            <q-btn flat color="white" size="md" label="Close" v-close-popup/>
          </template>
        </q-banner>

        <q-card class="q-pa-sm">
          <div class="text_body1  text-weight-bold">
            The Events view is intended to allow management of all the events on the layout
          </div>
          <div class="text_body1  text-weight-bold">
               There are some significant differences to how this view works compared to the 'Bus Events View'
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            The Events view shows events that have been read from nodes, captured from the CAN Bus, or entered manually
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            This list of events is retained for the layout selected, so the known events for a particular layout will be restored at startup
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            For a new layout, use SCAN NODES to read the stored events from all the nodes to fill the list, and anytime a new node is added 
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            There is only one entry for each event, irrespective of how many nodes produce that event
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            The ON/OFF status for each event will be the most recent instance of that event, captured from the CAN Bus, irrespective of which node sent it
          </div>
          <div class="text_body1">
            <div class="text_body1">
            The ON/OFF status is dependant on the event actually being captured from the bus, and if that event has not been sent, or the application has been restarted, the status will be 'unknown'
          </div>

          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
              In this view, for short events, the 'send ON/OFF' feature will use '0' as the Sending Node Number, so not linked to any particular node
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
              An event can be created manually (add event) and will not be associated with any particular node until the 'teach' option is used
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            The toggle option allows viewing of just short events, or all events
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            The list is likely to be very large, as some nodes have large numbers of default events 
          </div>
          <div class="text_body1">
            So it's recommended to use the search option to filter the list, and using group names for events
          </div>
        </q-card>



      </q-card>
    </q-dialog>


</template>


<script setup>


import {inject, onBeforeMount, onMounted, computed, watch, ref} from "vue";

const store = inject('store')
const name = "EventsViewInfoDialog"

const props = defineProps({
  modelValue: { type: Boolean, required: true },
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() { return props.modelValue },
  set(newValue) { emit('update:modelValue', newValue) }
})


onBeforeMount(() => {
})

onMounted(() => {
})


/*/////////////////////////////////////////////////////////////////////////////

Click event handlers

/////////////////////////////////////////////////////////////////////////////*/




</script>

<style scoped>

</style>
