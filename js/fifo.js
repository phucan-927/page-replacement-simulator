function fifo(pages, capacity) {
    let queue = [];
    let faults = 0;
    let steps = [];
  
    for (let page of pages) {
      if (!queue.includes(page)) {
        if (queue.length >= capacity) queue.shift();
        queue.push(page);
        faults++;
      }
      // Lưu trạng thái sau mỗi bước
      steps.push([...queue]);
    }
  
    return { faults, steps };
  }
  
  function runFIFO() {
    const input = document.getElementById("input").value;
    const frames = parseInt(document.getElementById("frames").value);
    const pages = input.split(",").map(p => parseInt(p.trim()));
  
    const result = fifo(pages, frames);
  
    let html = `<p>Số lỗi trang: <strong>${result.faults}</strong></p>`;
    html += `<h3>Trạng thái từng bước:</h3><ul>`;
    result.steps.forEach((step, i) => {
      html += `<li>Bước ${i + 1}: [${step.join(", ")}]</li>`;
    });
    html += `</ul>`;
  
    document.getElementById("result").innerHTML = html;
  }
  