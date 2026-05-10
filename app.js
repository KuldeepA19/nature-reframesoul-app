// Global State
const state = {
    currentScreen: 'home',
    mood: 'neutral',
    plants: JSON.parse(localStorage.getItem('myGarden')) || [],
};

// 1. Navigation Logic
function changeScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(screenId).classList.add('active');
    state.currentScreen = screenId;
}

// 2. Mood Logic
function setMood(m) {
    state.mood = m;
    document.body.style.backgroundColor = 
        m === 'angry' ? '#fff5f0' : 
        m === 'lonely' ? '#f0f7ff' : '#f0f4f0';
}

// 3. The Reframe Logic (The "Growth" Mechanic)
function handleReframe() {
    const input = document.getElementById('vent-input');
    if(!input.value.trim()) return alert("Write your thought to release it.");

    // Create a new plant
    const plantEmojis = ['🌱', '🌿', '🍀', '🌸', '🌼'];
    const randomPlant = plantEmojis[Math.floor(Math.random() * plantEmojis.length)];
    
    state.plants.push(randomPlant);
    localStorage.setItem('myGarden', JSON.stringify(state.plants));

    updateGardenUI();
    input.value = '';
    
    // Trigger success vibration (mobile only)
    if(navigator.vibrate) navigator.vibrate(50);
}

// 4. Render UI
function updateGardenUI() {
    const container = document.getElementById('garden-view');
    container.innerHTML = state.plants.map(p => `<span>${p}</span>`).join('');
}

// Initialize
window.onload = () => {
    updateGardenUI();
    document.getElementById('sync-text').innerText = "Vibe synchronized.";
};
