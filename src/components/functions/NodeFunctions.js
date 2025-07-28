
import {timeStampedLog} from "components/functions/utils.js"


const name = "NodeFunctions"

export function getNumberOfChannels(store, nodeNumber) {
  let numberOfChannels = 0
  // first, try the MDF, if there is one
  try {
    numberOfChannels = store.state.nodeDescriptors[nodeNumber].numberOfChannels
    if (numberOfChannels == undefined){ numberOfChannels = 0 }
  } catch {
    //console.log(name + `: failed to get numberOfChannels`)
  }
  try {
    let maxChannel = 0
    let MDF_ChannelIndexes = Object.keys(store.state.nodeDescriptors[nodeNumber].channelNames)
    MDF_ChannelIndexes.forEach(index => {
      if (parseInt(index) > maxChannel)(maxChannel = parseInt(index))
      //console.log(name + `: index ${index} maxChannel ${maxChannel}`)
    })
    if (maxChannel > numberOfChannels){numberOfChannels = maxChannel}
  } catch (err) {
    //console.log(name + `: failed to get channelNames`)
  }
  // if result still null or zero, then see if we've stored a previous value
  if ((numberOfChannels == null) || (numberOfChannels == 0)){
    try{
      numberOfChannels = store.state.layout.nodeDetails[nodeNumber].numberOfChannels
    } catch {
      //console.log(name + `: failed to get stored numberOfChannels`)
    }
  }
  //timeStampedLog(name + `: numberOfChannels: ${numberOfChannels}`)
  return numberOfChannels
}

