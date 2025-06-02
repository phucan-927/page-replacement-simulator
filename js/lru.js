function runLru() {
  const input = document.getElementById('input').value.split(',').map(x => parseInt(x.trim()));
  const framesCount = parseInt(document.getElementById('frames').value);
  const frames = [];
  const history = [];
  let resultHTML = '';

  input.forEach((page, index) => {
    let frameIndex = frames.indexOf(page);

    if (frameIndex === -1) {
      // Page fault
      if (frames.length < framesCount) {
        frames.push(page);
      } else {
        // Tìm trang ít sử dụng gần đây nhất (LRU)
        let lruPage = null;
        let lruPos = Infinity;  // dùng Infinity để tìm min

        frames.forEach(f => {
          // tìm vị trí lần truy cập gần nhất của f trong history
          // nếu không tìm thấy thì gán -1 (đánh dấu chưa được dùng)
          let lastUsedIndex = -1;
          for (let i = history.length - 1; i >= 0; i--) {
            if (history[i] === f) {
              lastUsedIndex = i;
              break;
            }
          }

          // nếu trang chưa được dùng bao giờ (lastUsedIndex = -1), ưu tiên thay thế luôn
          if (lastUsedIndex === -1) {
            lruPage = f;
            lruPos = -1;
            return;
          }

          // tìm trang có vị trí truy cập gần đây nhất nhỏ nhất (tức ít được dùng gần đây nhất)
          if (lastUsedIndex < lruPos) {
            lruPos = lastUsedIndex;
            lruPage = f;
          }
        });

        let lruIndex = frames.indexOf(lruPage);
        frames[lruIndex] = page;
      }
    }

    history.push(page);
    if (history.length > 100) history.shift();

    resultHTML += `<p>Bước ${index + 1}: Trang ${page} → [${frames.join(', ')}]</p>`;
  });

  document.getElementById('result').innerHTML = resultHTML;
}
