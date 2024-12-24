// script.js

const canvas = document.getElementById('voxelCanvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const voxelSize = 20;
const voxels = [];

for (let i = 0; i < width / voxelSize; i++) {
    for (let j = 0; j < height / voxelSize; j++) {
        voxels.push({
            x: i * voxelSize,
            y: j * voxelSize,
            size: voxelSize,
            offset: Math.random() * 100
        });
    }
}

function drawVoxels(mouseX, mouseY) {
    ctx.clearRect(0, 0, width, height);
    for (const voxel of voxels) {
        const dx = mouseX - voxel.x;
        const dy = mouseY - voxel.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const size = voxel.size - (dist / 20) + voxel.offset;

        ctx.fillStyle = `rgba(0, 255, 204, ${1 - dist / 500})`;
        ctx.fillRect(voxel.x, voxel.y, size, size);
    }
}

canvas.addEventListener('mousemove', (event) => {
    drawVoxels(event.clientX, event.clientY);
});

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    drawVoxels(width / 2, height / 2); // Redraw with the new size
});

drawVoxels(width / 2, height / 2); // Initial draw