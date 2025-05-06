function optimal(pages, capacity) {
    let memory = [];
    let faults = 0;
    let steps = [];
  
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (!memory.includes(page)) {
        if (memory.length >= capacity) {
          // Tìm trang sẽ được dùng xa nhất
          let farthest = -1;
          let idxToReplace = -1;
          for (let j = 0; j < memory.length; j++) {
            const nextUse = pages.slice(i + 1).indexOf(memory[j]);
            if (nextUse === -1) {
              idxToReplace = j;
              break;
            } else if (nextUse > farthest) {
              farthest = nextUse;
              idxToReplace = j;
            }
          }
          memory[idxToReplace] = page;
        } else {
          memory.push(page);
        }
        faults++;
      }
      steps.push([...memory]);
    }
  
    return { faults, steps };
  }
  
  function runOptimal() {
    const input = document.getElementById("input").value;
    const frames = parseInt(document.getElementById("frames").value);
    const pages = input.split(",").map(p => parseInt(p.trim()));
  
    const result = optimal(pages, frames);
  
    let html = `<p>Số lỗi trang: <strong>${result.faults}</strong></p>`;
    html += `<h3>Trạng thái từng bước:</h3><ul>`;
    result.steps.forEach((step, i) => {
      html += `<li>Bước ${i + 1}: [${step.join(", ")}]</li>`;
    });
    html += `</ul>`;
  
    document.getElementById("result").innerHTML = html;
  }
  