function simulateOPT(pages, frameSize) {
    let memory = [];
    let faults = 0;
  
    for (let i = 0; i < pages.length; i++) {
      let page = pages[i];
      if (memory.includes(page)) continue;
  
      if (memory.length < frameSize) {
        memory.push(page);
      } else {
        let farthest = -1;
        let indexToReplace = -1;
  
        for (let j = 0; j < memory.length; j++) {
          let nextUse = pages.slice(i + 1).indexOf(memory[j]);
          if (nextUse === -1) {
            indexToReplace = j;
            break;
          } else if (nextUse > farthest) {
            farthest = nextUse;
            indexToReplace = j;
          }
        }
  
        memory[indexToReplace] = page;
      }
      faults++;
    }
  
    return faults;
  }  