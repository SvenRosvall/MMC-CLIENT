<template>

    <q-dialog v-model='model' persistent>
      <q-card style="min-width: 450px">

        <q-banner inline-actions style="min-height: 0;" class="bg-primary text-white dense no-padding">
          <div class="text-h6">
            Advanced functions for node {{ store.getters.node_name(nodeNumber) }}
          </div>
          <template v-slot:action>
            <q-btn flat color="white" size="md" label="Close" v-close-popup/>
          </template>
        </q-banner>
        <q-card-actions align="left">
          <q-btn dense class="q-mx-xs q-my-none" color="light-blue-2" text-color="black" size="md" label="Delete node"
          @click="clickDeleteNode()"/>
        </q-card-actions>

        <q-card-actions align="left">
          <q-btn dense class="q-mx-xs q-my-none" color="light-blue-2" text-color="black" size="md" label="CAN ID Enumeration"
          @click="clickCanIdEnumeration()"/>
        </q-card-actions>

        <q-card-actions align="left">
          <q-btn dense class="q-mx-xs q-my-none" color="light-blue-2" text-color="black" size="md" label="Set CANID"
          @click="clickSetCAN_ID()"/>
        </q-card-actions>

        <q-card-actions align="left">
          <q-btn dense class="q-mx-xs q-my-none" color="light-blue-2" text-color="black" size="md" label="reset Node"
          @click="clickResetNode()"/>
        </q-card-actions>

        <q-card-actions align="left">
          <q-btn v-if="(store.state.develop)" dense class="q-mx-xs q-my-none" color="light-blue-2" text-color="black" size="md" label="program Node"
          @click="clickProgramNode()"/>
        </q-card-actions>

      </q-card>
    </q-dialog>

    <deleteNodeDialog v-model='showDeleteNodeDialog'
      :nodeNumber = nodeNumber
    />

    <programNodeDialog v-model='showProgramNodeDialog'
      :nodeNumber = nodeNumber
    />

    <setCanIdDialog v-model='showSetCanIdDialog'
      :nodeNumber = nodeNumber
    />



</template>


<script setup>


import {inject, onBeforeMount, onMounted, computed, watch, ref} from "vue";
import deleteNodeDialog from "components/dialogs/DeleteNodeDialog"
import programNodeDialog from "components/dialogs/programNodeDialog"
import setCanIdDialog from "components/dialogs/setCanIdDialog"

const store = inject('store')
const name = "AdvancedNodeDialog"
const showDeleteNodeDialog = ref(false)
const showProgramNodeDialog = ref(false)
const showSetCanIdDialog = ref(false)

const props = defineProps({
  modelValue: { type: Boolean, required: true },
  nodeNumber: {type: Number }
})

const emit = defineEmits(['update:modelValue'])

const model = computed({
  get() { return props.modelValue },
  set(newValue) { emit('update:modelValue', newValue) }
})

/*/////////////////////////////////////////////////////////////////////////////

Click event handlers

/////////////////////////////////////////////////////////////////////////////*/


const clickCanIdEnumeration = () => {
  console.log(name + `: clickCanIdEnumeration ` + props.nodeNumber)
  store.methods.node_can_id_enum(props.nodeNumber)
}

const clickDeleteNode = () => {
  console.log(name + `: clickDeleteNode ` + props.nodeNumber)
  showDeleteNodeDialog.value = true
}

const clickProgramNode = () => {
  console.log(name + `: clickProgramNode ` + props.nodeNumber)
  showProgramNodeDialog.value = true
}

const clickResetNode = () => {
  console.log(name + `: clickResetNode ` + props.nodeNumber)
  store.methods.reset_node(props.nodeNumber)
}

const clickSetCAN_ID = () => {
  console.log(name + `: clickSetCAN_ID ` + props.nodeNumber)
  showSetCanIdDialog.value = true
}



onBeforeMount(() => {
})

onMounted(() => {
})




</script>

<style scoped>

</style>
