/* ==========================================================================
   KRISHISANJIVANI - SPEECH & VOICE RECOGNITION HELPER
   ========================================================================== */

class SpeechHelper {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.isSupported = true;
    } else {
      this.isSupported = false;
    }
  }

  startListening(inputElementId, onSuccessCallback) {
    if (!this.isSupported) {
      alert("Voice input is supported on modern browsers (Chrome, Edge, Safari). Please type your search.");
      return;
    }

    const lang = localStorage.getItem('krishi_lang') || 'en';
    if (lang === 'hi') {
      this.recognition.lang = 'hi-IN';
    } else if (lang === 'mr') {
      this.recognition.lang = 'mr-IN';
    } else {
      this.recognition.lang = 'en-IN';
    }

    const micBtns = document.querySelectorAll('.voice-trigger-btn, .mic-btn-inside');
    micBtns.forEach(btn => btn.classList.add('listening'));

    this.recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      const targetInput = document.getElementById(inputElementId);
      if (targetInput) {
        targetInput.value = transcript;
        targetInput.dispatchEvent(new Event('input', { bubbles: true }));
      }
      if (onSuccessCallback) onSuccessCallback(transcript);
      this.showToast(`🎤 Voice input: "${transcript}"`);
    };

    this.recognition.onerror = (err) => {
      console.warn("Speech recognition error:", err);
      micBtns.forEach(btn => btn.classList.remove('listening'));
    };

    this.recognition.onend = () => {
      micBtns.forEach(btn => btn.classList.remove('listening'));
    };

    try {
      this.recognition.start();
    } catch (e) {
      console.log("Speech recognition already running or restarted.");
    }
  }

  showToast(message) {
    const container = document.getElementById('toast-container') || this.createToastContainer();
    const toast = document.createElement('div');
    toast.className = 'toast-item';
    toast.innerHTML = `<span class="toast-icon">🎙️</span><span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 4000);
  }

  createToastContainer() {
    const div = document.createElement('div');
    div.id = 'toast-container';
    div.className = 'toast-container';
    document.body.appendChild(div);
    return div;
  }
}

window.speechHelper = new SpeechHelper();
