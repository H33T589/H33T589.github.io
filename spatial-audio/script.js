// ============================================
// SPATIAL AUDIO ENGINE
// ============================================

// Audio Context
let audioContext;
let masterGain;

// Sound Sources
const sources = [];
const sourceConfigs = [
    { frequency: 440, color: '#3b82f6', position: { x: -200, y: 0, z: 0 } },
    { frequency: 554, color: '#60a5fa', position: { x: -100, y: 100, z: 0 } },
    { frequency: 659, color: '#22d3ee', position: { x: 100, y: -100, z: 0 } },
    { frequency: 880, color: '#1d4ed8', position: { x: 200, y: 0, z: 0 } }
];

// Canvas & Visualization
const canvas = document.getElementById('audioCanvas');
const ctx = canvas.getContext('2d');
let canvasWidth, canvasHeight;

// Audio Parameters
let audioParams = {
    masterVolume: 0.5,
    rolloffFactor: 2,
    referenceDistance: 5,
    maxDistance: 50
};

// Drag State
let isDragging = false;
let dragSource = null;
let dragOffset = { x: 0, y: 0 };

// ============================================
// INITIALIZATION
// ============================================

function init() {
    // Setup canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Setup event listeners
    setupEventListeners();

    // Initialize sound sources (but don't play)
    initSoundSources();

    // Start animation loop
    animate();
}

function resizeCanvas() {
    const container = canvas.parentElement;
    canvasWidth = container.clientWidth;
    canvasHeight = container.clientHeight;
    canvas.width = canvasWidth * window.devicePixelRatio;
    canvas.height = canvasHeight * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
}

function setupEventListeners() {
    // Canvas events
    canvas.addEventListener('mousedown', handleCanvasMouseDown);
    canvas.addEventListener('mousemove', handleCanvasMouseMove);
    canvas.addEventListener('mouseup', handleCanvasMouseUp);
    canvas.addEventListener('mouseleave', handleCanvasMouseUp);

    // Touch events
    canvas.addEventListener('touchstart', handleTouchStart, { passive: false });
    canvas.addEventListener('touchmove', handleTouchMove, { passive: false });
    canvas.addEventListener('touchend', handleTouchEnd);

    // Control events
    document.getElementById('masterVolume').addEventListener('input', (e) => {
        audioParams.masterVolume = e.target.value / 100;
        e.target.nextElementSibling.textContent = e.target.value + '%';
        updateMasterVolume();
    });

    document.getElementById('rolloffFactor').addEventListener('input', (e) => {
        audioParams.rolloffFactor = e.target.value / 10;
        e.target.nextElementSibling.textContent = e.target.value;
        updateAudioParams();
    });

    document.getElementById('referenceDistance').addEventListener('input', (e) => {
        audioParams.referenceDistance = e.target.value / 10;
        e.target.nextElementSibling.textContent = e.target.value;
        updateAudioParams();
    });

    document.getElementById('maxDistance').addEventListener('input', (e) => {
        audioParams.maxDistance = e.target.value;
        e.target.nextElementSibling.textContent = e.target.value;
        updateAudioParams();
    });

    // Play/Stop buttons
    document.querySelectorAll('.btn-toggle').forEach((btn, index) => {
        btn.addEventListener('click', () => toggleSource(index));
    });

    document.getElementById('playAll').addEventListener('click', playAllSources);
    document.getElementById('stopAll').addEventListener('click', stopAllSources);
}

// ============================================
// AUDIO SETUP
// ============================================

function initAudioContext() {
    if (!audioContext) {
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        masterGain = audioContext.createGain();
        masterGain.connect(audioContext.destination);
        masterGain.gain.value = audioParams.masterVolume;
    }
}

function initSoundSources() {
    sourceConfigs.forEach((config, index) => {
        sources.push({
            ...config,
            oscillator: null,
            gain: null,
            panner: null,
            isPlaying: false
        });
    });
}

function toggleSource(index) {
    initAudioContext();

    const source = sources[index];
    const btn = document.querySelector(`.btn-toggle[data-source="${index}"]`);
    const card = document.querySelector(`.sound-source[data-color="${source.color}"]`);

    if (source.isPlaying) {
        stopSource(index);
        btn.textContent = '▶ Play';
        btn.classList.remove('playing');
        card.classList.remove('active');
    } else {
        playSource(index);
        btn.textContent = '⏹ Stop';
        btn.classList.add('playing');
        card.classList.add('active');
    }
}

function playSource(index) {
    const source = sources[index];
    
    // Create oscillator
    source.oscillator = audioContext.createOscillator();
    source.oscillator.type = 'sine';
    source.oscillator.frequency.value = source.frequency;

    // Create gain node
    source.gain = audioContext.createGain();
    source.gain.gain.value = 0.5;

    // Create panner node for 3D positioning
    source.panner = audioContext.createPanner();
    source.panner.panningModel = 'HRTF';
    source.panner.distanceModel = 'linear';
    source.panner.refDistance = audioParams.referenceDistance;
    source.panner.maxDistance = audioParams.maxDistance;
    source.panner.rolloffFactor = audioParams.rolloffFactor;
    source.panner.coneInnerAngle = 360;
    source.panner.coneOuterAngle = 360;
    source.panner.coneOuterGain = 1;

    // Set initial position
    const worldPos = canvasToWorld(source.position.x, source.position.y);
    source.panner.positionX.value = worldPos.x;
    source.panner.positionY.value = worldPos.y;
    source.panner.positionZ.value = worldPos.z;

    // Connect nodes
    source.oscillator.connect(source.gain);
    source.gain.connect(source.panner);
    source.panner.connect(masterGain);

    // Start oscillator
    source.oscillator.start();
    source.isPlaying = true;
}

function stopSource(index) {
    const source = sources[index];
    
    if (source.oscillator) {
        source.oscillator.stop();
        source.oscillator.disconnect();
        source.oscillator = null;
    }
    
    if (source.gain) {
        source.gain.disconnect();
        source.gain = null;
    }
    
    if (source.panner) {
        source.panner.disconnect();
        source.panner = null;
    }

    source.isPlaying = false;
}

function playAllSources() {
    sources.forEach((_, index) => {
        if (!sources[index].isPlaying) {
            toggleSource(index);
        }
    });
}

function stopAllSources() {
    sources.forEach((_, index) => {
        if (sources[index].isPlaying) {
            toggleSource(index);
        }
    });
}

function updateMasterVolume() {
    if (masterGain) {
        masterGain.gain.value = audioParams.masterVolume;
    }
}

function updateAudioParams() {
    sources.forEach(source => {
        if (source.panner) {
            source.panner.refDistance = audioParams.referenceDistance;
            source.panner.maxDistance = audioParams.maxDistance;
            source.panner.rolloffFactor = audioParams.rolloffFactor;
        }
    });
}

// ============================================
// CANVAS INTERACTION
// ============================================

function canvasToWorld(canvasX, canvasY) {
    // Convert canvas coordinates to world coordinates
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const scale = 0.1;

    return {
        x: (canvasX - centerX) * scale,
        y: 0, // We're in 2D, so Y is always 0
        z: (canvasY - centerY) * scale
    };
}

function worldToCanvas(worldX, worldZ) {
    // Convert world coordinates to canvas coordinates
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;
    const scale = 10;

    return {
        x: centerX + worldX * scale,
        y: centerY + worldZ * scale
    };
}

function handleCanvasMouseDown(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Check if clicking on existing source
    for (let i = 0; i < sources.length; i++) {
        const pos = worldToCanvas(sources[i].position.x, sources[i].position.z);
        const distance = Math.sqrt(Math.pow(x - pos.x, 2) + Math.pow(y - pos.y, 2));

        if (distance < 20) {
            isDragging = true;
            dragSource = i;
            dragOffset = {
                x: x - pos.x,
                y: y - pos.y
            };
            return;
        }
    }

    // If not clicking on source, add new source at click position
    const worldPos = canvasToWorld(x, y);
    sources.push({
        frequency: 330 + Math.random() * 660,
        color: getRandomColor(),
        position: { x: worldPos.x, y: 0, z: worldPos.z },
        oscillator: null,
        gain: null,
        panner: null,
        isPlaying: false
    });
}

function handleCanvasMouseMove(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (isDragging && dragSource !== null) {
        // Update source position
        const worldPos = canvasToWorld(x - dragOffset.x, y - dragOffset.y);
        sources[dragSource].position.x = worldPos.x;
        sources[dragSource].position.z = worldPos.z;

        // Update panner position if playing
        if (sources[dragSource].panner) {
            sources[dragSource].panner.positionX.value = worldPos.x;
            sources[dragSource].panner.positionY.value = worldPos.y;
            sources[dragSource].panner.positionZ.value = worldPos.z;
        }
    }
}

function handleCanvasMouseUp() {
    isDragging = false;
    dragSource = null;
}

function handleTouchStart(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    handleCanvasMouseDown(mouseEvent);
}

function handleTouchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    handleCanvasMouseMove(mouseEvent);
}

function handleTouchEnd(e) {
    e.preventDefault();
    handleCanvasMouseUp();
}

function getRandomColor() {
    const colors = ['#3b82f6', '#60a5fa', '#22d3ee', '#1d4ed8', '#2563eb', '#0891b2'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// ============================================
// VISUALIZATION
// ============================================

function animate() {
    draw();
    requestAnimationFrame(animate);
}

function draw() {
    // Clear canvas
    ctx.fillStyle = 'rgba(10, 10, 10, 0.3)';
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Draw grid
    drawGrid();

    // Draw listener
    drawListener();

    // Draw sources
    sources.forEach((source, index) => {
        drawSource(source, index);
    });
}

function drawGrid() {
    ctx.strokeStyle = 'rgba(59, 130, 246, 0.1)';
    ctx.lineWidth = 1;

    const gridSize = 50;
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Vertical lines
    for (let x = centerX % gridSize; x < canvasWidth; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }

    // Horizontal lines
    for (let y = centerY % gridSize; y < canvasHeight; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }
}

function drawListener() {
    const centerX = canvasWidth / 2;
    const centerY = canvasHeight / 2;

    // Outer glow
    const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 50);
    gradient.addColorStop(0, 'rgba(59, 130, 246, 0.3)');
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
    ctx.fill();

    // Inner circle
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, Math.PI * 2);
    ctx.fill();

    // Text
    ctx.fillStyle = '#ffffff';
    ctx.font = '12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('You', centerX, centerY + 4);
}

function drawSource(source, index) {
    const pos = worldToCanvas(source.position.x, source.position.z);

    // Sound waves if playing
    if (source.isPlaying) {
        const time = Date.now() / 1000;
        ctx.strokeStyle = source.color;
        ctx.lineWidth = 2;

        for (let i = 0; i < 3; i++) {
            const radius = (time * 100 + i * 50) % 150;
            const alpha = 1 - (radius / 150);
            ctx.globalAlpha = alpha;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, radius, 0, Math.PI * 2);
            ctx.stroke();
        }
        ctx.globalAlpha = 1;
    }

    // Outer glow
    const glowGradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 30);
    glowGradient.addColorStop(0, source.color + '80');
    glowGradient.addColorStop(1, source.color + '00');

    ctx.fillStyle = glowGradient;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 30, 0, Math.PI * 2);
    ctx.fill();

    // Main circle
    ctx.fillStyle = source.color;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, 12, 0, Math.PI * 2);
    ctx.fill();

    // Border
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Frequency label
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 12px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(Math.round(source.frequency) + 'Hz', pos.x, pos.y + 28);
}

// ============================================
// START
// ============================================

document.addEventListener('DOMContentLoaded', init);