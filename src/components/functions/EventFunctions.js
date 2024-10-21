
import {inject} from "vue";

const name = "EventFunctions"

export function  getEventCount (nodeNumber, store) {
  console.log (name + " getEventList " + nodeNumber)
  var count = Object.keys(getEventslist(nodeNumber, store)).length
  console.log (name + " getEventList - count " + count)
  return count
}


/*
export function getStoredEventIndex (store, nodeNumber, eventIdentifier) {
//  console.log(name +': getStoredEventIndex: ' + nodeNumber, eventIdentifier) 
  var index = undefined
  try {
    for (let key in store.state.nodes[nodeNumber].storedEvents) {
      if (store.state.nodes[nodeNumber].storedEvents[key].eventIdentifier === eventIdentifier){
        index = parseInt(key)
      }
    }
  } catch (err){}
  console.log(name +': getStoredEventIndex: result ' + index) 
  return index
}
*/


const getEventslist = (nodeNumber, store) => {
  var eventsList = []

  // do stored events for this node first.....
  var storedEvents = Object.values(store.state.nodes[nodeNumber].storedEventsNI) 
  storedEvents.forEach(event => {
    var eventNodeNumber = parseInt(event.eventIdentifier.substr(0, 4), 16)
    let output = {}
    output['eventIdentifier'] = event.eventIdentifier
//    output['eventName'] = store.getters.event_name(event.eventIdentifier)
    output['eventIndex'] = event.eventIndex
    output['nodeNumber'] = eventNodeNumber
    output['eventNumber'] = parseInt(event.eventIdentifier.substr(4, 4), 16)
//    output['eventType'] = getEventType(event.eventIndex)
    output['storedEvent'] = true
    eventsList.push(output)
  })

  // now add bus events... but not if already in the list
  var busEvents = Object.values(store.state.busEvents) 
  busEvents.forEach(busEvent => {
    if (busEvent.nodeNumber == nodeNumber){
      // lets see if it's already in the stored events...
      var alreadyInList = false
      storedEvents.forEach(event => {
        if(busEvent.id == event.eventIdentifier){
          alreadyInList = true
        }
      })
      if (alreadyInList == false){
        let output = {}
        output['eventIdentifier'] = busEvent.id
//        output['eventName'] = store.getters.event_name(busEvent.id)
        output['nodeNumber'] = busEvent.nodeNumber
        output['eventNumber'] = busEvent.eventNumber
        output['storedEvent'] = false
        eventsList.push(output)
      }
    }
  })

  // sort rows by eventIdentifier, not eventIndex
  eventsList.sort(function(a, b){return (a.eventIdentifier < b.eventIdentifier)? -1 : 1;});
  console.log(name + JSON.stringify(eventsList))
  return eventsList
}


export function createNewEvent (store, nodeNumber, eventIdentifier) {
  console.log(name + `: createNewEvent: ${nodeNumber} : ${eventIdentifier}`)
  // lets create a shortcut to the node entry for readability
  var nodeEntry = store.state.nodes[nodeNumber]
  // create temporary event entry in storedEventNI table (will be overwritten when module read after teach)
  nodeEntry.storedEventsNI[eventIdentifier] = {
      "eventIdentifier": eventIdentifier,
      "eventIndex": 1,
      "node": nodeNumber,
      "variables": {}
  }
  nodeEntry.storedEventsNI[eventIdentifier].variables[0] = nodeEntry.parameters[5]
  for (var i = 1; i<= nodeEntry.parameters[5]; i++){
    nodeEntry.storedEventsNI[eventIdentifier].variables[i] = 0
  }


}