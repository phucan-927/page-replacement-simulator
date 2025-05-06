function lru(pages, capacity) {
    let cache = [];
    let faults = 0;
    let steps = [];
  
    for (let i = 0; i < pages.length; i++) {
      const page = pages[i];
      if (!cache.includes(page)) {
        if (cache.length >= capacity) {
          cache.shift(); // bỏ trang ít được dùng nhất
        }
        faults++;
      } else {
        // Đưa trang về cuối để thể hiện là mới dùng
        cache.splice(cache.indexOf(page), 1);
      }
      cache.push(page);
      steps.push([...cache]);
    }
  
    return { faults, steps };
  }
  
  function runLRU() {
    const input = document.getElementById("input").value;
    const frames = parseInt(document.getElementById("frames").value);
    const pages = input.split(",").map(p => parseInt(p.trim()));
  
    const result = lru(pages, frames);
  
    let html = `<p>Số lỗi trang: <strong>${result.faults}</strong></p>`;
    html += `<h3>Trạng thái từng bước:</h3><ul>`;
    result.steps.forEach((step, i) => {
      html += `<li>Bước ${i + 1}: [${step.join(", ")}]</li>`;
    });
    html += `</ul>`;
  
    document.getElementById("result").innerHTML = html;
  }
  