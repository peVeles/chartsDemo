function addChartBlock(id) {
    const block = document.createElement('div'); block.id = `chart_${id}`;
    document.getElementById("charts").insertBefore(block, document.getElementById("add-chart-block"));
}