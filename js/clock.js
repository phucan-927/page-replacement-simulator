function clock(pages, capacity) {
    let memory = new Array(capacity).fill(null);
    let referenceBits = new Array(capacity).fill(0);
    let pointer = 0;
    let faults = 0;
    let steps = [];
  
    for (let page of pages) {
      let idx = memory.indexOf(page);
  
      if (idx !== -1) {
        referenceBits[idx] = 1; // Đánh dấu đã sử dụng
      } else {
        while (true) {
          if (referenceBits[pointer] === 0) {
            memory[pointer] = page;
            referenceBits[pointer] = 1;
            pointer = (pointer + 1) % capacity;
            faults++;
            break;
          } else {
            referenceBits[pointer] = 0;
            pointer = (pointer + 1) % capacity;
          }
        }
      }
  
      steps.push([...memory]);
    }
  
    return { faults, steps };
  }
  
  function runClock() {
    const input = document.getElementById("input").value;
    const frames = parseInt(document.getElementById("frames").value);
    const pages = input.split(",").map(p => parseInt(p.trim()));
  
    const result = clock(pages, frames);
  
    let html = `<p>Số lỗi trang: <strong>${result.faults}</strong></p>`;
    html += `<h3>Trạng thái từng bước:</h3><ul>`;
    result.steps.forEach((step, i) => {
      html += `<li>Bước ${i + 1}: [${step.join(", ")}]</li>`;
    });
    html += `</ul>`;
  
    document.getElementById("result").innerHTML = html;
  }
  