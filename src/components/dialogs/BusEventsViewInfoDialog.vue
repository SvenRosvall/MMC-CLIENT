<template>

    <q-dialog v-model='model' persistent>
      <q-card style="min-width: 800px">

        <q-banner inline-actions style="min-height: 0;" class="bg-primary text-white dense no-padding">
          <div class="text-h6">
            Information about the Bus Events View
          </div>
          <template v-slot:action>
            <q-btn flat color="white" size="md" label="Close" v-close-popup/>
          </template>
        </q-banner>

        <q-card class="q-pa-sm">
          <div class="text_body1 text-weight-bold">
            The Bus Events view is intended to show the event activity on the CAN Bus from the start of the application
          </div>
          <div class="text_body1 text-weight-bold">
               There are some significant differences to how this view works compared to the 'Events View'
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
              Events read from node will not appear in this view until they have been sent by a node & captured from the CAN Bus
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
              For some nodes, default events can't be read from the node (as some do not treat them as 'stored events')
          </div>
          <div class="text_body1">
              But these default events will appear in this view once they've been sent
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
              This view takes account of the source node, so if the same event has been sent by two different nodes,
               there will be two entries for that event
          </div>
          <div class="text_body1">
               This is intended to make it easy to see which nodes are sending which events
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
              In this view, the 'send ON/OFF' feature will use the Source Node Number of the row selected, thus replicating the event from that specific node 
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
            The ON/OFF status for each event will be the most recent instance of that event, captured from the CAN Bus, from that particular sending node
          </div>
        </q-card>

        <q-card class="q-pa-sm">
          <div class="text_body1">
              The Bus Events view will be empty at startup, and can also be cleared, to only show events from that point onwards
          </div>
        </q-card>

      </q-card>
    </q-dialog>


</template>


<script setup>


import {inject, onBeforeMount, onMounted, computed, watch, ref} from "vue";

const store = inject('store')
const name = "BusEventsViewInfoDialog"

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
