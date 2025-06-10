function simulateOPT(pages, frameSize) {
    const memory = [];
    let faults = 0;

    for (let i = 0; i < pages.length; i++) {
        const currentPage = pages[i];

        if (memory.includes(currentPage)) {
            continue; // Page hit
        }

        // Page fault
        faults++;

        if (memory.length < frameSize) {
            memory.push(currentPage);
        } else {
            // Tìm trang có vị trí truy cập tiếp theo xa nhất
            let indexToReplace = -1;
            let farthestIndex = -1;

            for (let j = 0; j < memory.length; j++) {
                const pageInMemory = memory[j];
                const nextUse = pages.slice(i + 1).indexOf(pageInMemory);

                if (nextUse === -1) {
                    indexToReplace = j;
                    break; // Không còn dùng trang này nữa
                }

                if (nextUse > farthestIndex) {
                    farthestIndex = nextUse;
                    indexToReplace = j;
                }
            }

            memory[indexToReplace] = currentPage;
        }
    }

    return faults;
}
