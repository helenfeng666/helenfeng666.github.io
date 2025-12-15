(() => {
    'use strict';

    const $ = s => document.querySelector(s);
    const cssVar = k => getComputedStyle(document.documentElement)
        .getPropertyValue(k)
        .trim()
        .replace(/^'|"|'+$/g, '');

    function showToast(message, duration = 1300) {
        const t = $('#toast');
        if (!t) return;
        t.textContent = message;
        t.style.display = 'block';
        clearTimeout(showToast._timer);
        showToast._timer = setTimeout(() => {
            t.style.display = 'none';
        }, duration);
    }

    /* --------------------- Story content --------------------- */

    const SONGS = [
        {
            id: 'room',
            x: 78,
            y: 44,
            title: 'Room',
            src: cssVar('--src-room'),
            prose: [
                'This is the room where nothing felt real. A liminal dread with no name.',
                'He erased the door on his way out. She was meant to rot with his secrets.',
                'Tonight, she draws an exit that was never given.'
            ],
            lyrics: `This is the room where you took my soul,
This is the room where nothing feels real.
...You r**** the soul out of me, and walked out the door like a god.
But it wasn’t enough to shut the door—you made me sure there’s no way I’d escape!`
        },
        {
            id: 'hunger',
            x: 52,
            y: 62,
            title: 'Hunger Game',
            src: cssVar('--src-hunger'),
            prose: [
                'How do I tell her her wings were never broken?',
                'One day the haunting won’t have to be home, sweet girl.'
            ],
            lyrics: `dreamt that I were a butterfly—broken wings...
I wake up to a hunger game of hide and seek and no escape...
But you aren’t real—some broken fantasy...`
        },
        {
            id: 'light',
            x: 74,
            y: 28,
            title: 'Light',
            src: cssVar('--src-light'),
            prose: [
                '“Say yes, come home.”',
                'Is there a light at the end of the corridor?',
                'She can finally look at the ending and not disappear.'
            ],
            lyrics: `i can see the ending in the shape of you...
Is there a light at the end of the corridor? light at the end, at the end—`
        },
        {
            id: 'glisten',
            x: 40,
            y: 70,
            title: 'Glisten',
            src: cssVar('--src-glisten'),
            prose: [
                'A corridor of movement: every version of them walking to the same doom.',
                'She runs after fading shadows. It’s ruthless—and final.'
            ],
            lyrics: `So I’m listening to the falling of our everything out the window...
every corridor in this dream it’s always your face... you and I glistening—`
        },
        {
            id: 'ophelia',
            x: 23,
            y: 46,
            title: 'Ophelia',
            src: cssVar('--src-ophelia'),
            prose: [
                'Pain is a lake. She screams underwater.',
                '“You’re the only one who sees me.” The river answers: “I know. Say yes. Come home.”'
            ],
            lyrics: `She rearranged my soul till it disappeared...
Ophelia, she came to you—she found peace in your arms; can I do the same?`
        },
        {
            id: 'circles',
            x: 60,
            y: 82,
            title: 'Circles',
            src: cssVar('--src-circles'),
            prose: [
                'Re-integration after breaking: a dance with every version of herself.',
                'A survivor’s sunrise.'
            ],
            lyrics: `it’s coming back, i’m coming back...
so dance with me in circles on the sand, till sunrise—`
        },
        { id: 'tbd1', x: 16, y: 72, title: '(coming soon)', src: '', disabled: true, prose: [''], lyrics: '' },
        { id: 'tbd2', x: 88, y: 62, title: '(coming soon)', src: '', disabled: true, prose: [''], lyrics: '' }
    ];

    const STORY_LINES = [
        'Eyes aflame; twitching veins.',
        'Tears soak the pillow; she claws at her face till it bleeds like the battlefield in her soul.',
        'Her eyes are glued to the ceiling. It tells her to jump down a cliff.',
        'She doesn’t dare touch the ground: “That’s death.”',
        'The bed is the closest to home that she could find. But that’s also where the nightmares live.',
        'No, she isn’t safe. No, she is not a free woman.',
        'She seems dangerously frail, breath thin as thread.',
        'Her abuser needed a scapegoat to hold his misery, a vessel to mend his broken ego.',
        'She was left here to rot, buried alive with all his secrets.',
        'But that wasn’t enough. On his way out, he erased the door itself.',
        'When they met, he tested the waters like he always did.',
        'Kind, innocent, always finding a reason to forgive––she was the perfect puppet.',
        'He turned her warm body into a human voodoo doll, groomed and bent her mind till she was ripened to play the role he required.',
        'Then, discard. He proceeded to find fresh prey.',
        'Left her locked up and stranded in the ruins of herself, shielded from his outward image he would do anything to protect.',
        'He’s charming. Everyone knows him as a saint.',
        'But to her, he snarled: “You are a monster. This is all your fault.”',
        '“You should be ashamed for all that you are.”',
        'And it worked. It took her epochs of guilt to begin questioning the lies he fed her.',
        'To realize that he is the narcissist, not her.',
        '“I trusted myself too little, and hated myself just enough, to stay in your trap.”',
        '“I dream of telling the world that it was you. But who am I to be believed?”',
        'He made sure she was dead to everyone.',
        'She screams her truth, but no one cares. Their silence sealed the verdict.',
        'Her voice floats through the corridors like an elusive ghost.',
        'Everything he accused her of was a confession he’d never utter.',
        'She knew darkness, but didn’t think people could walk over each other like that.',
        'Cold-blooded, nonchalant. “You take my soul, and off you go.”',
        'It felt like the death of hope. The death of earth as she knew it.',
        'She needs a place to scream.',
        'Not by hurting another; she’d rather die than become someone like him.',
        'I find her at the edge of the river where Ophelia once drowned.',
        'In the portals of her mind, she comes here when it is too much to bear.',
        '“You’re the only one who sees me, you’re the only one who knows.”',
        'The river replies with a lullaby: “I know, I know. Say yes, come home.”',
        'It doesn’t repel her truth. That’s the closest to understanding she could find. In a sea of daggers, manipulation, and truth-bending, the lullaby helps her fall asleep.',
        'She begins to wonder what it’s like to sleep here eternally.',
        '“Ophelia, she came to you, she found peace in your arms, can I do the same?”',
        'For the first time, drowning felt like the answer.',
        'She takes one step, then another.',
        'No, not this time. Please don’t let this be her ending.',
        'I keep running, trying to revive her. But she floats, almost lifeless.',
        'I’d die a thousand times, to bring her back to life.',
        'Please come back, sweet girl.',
        'She lets out a feeble breath, then another.',
        'Tears fall from my eyes: “It’s me, OSEANA. I’m here, sweet girl.”',
        '“No one knows he did this to me.”',
        'She sobs uncontrollably, barely able to form more words.',
        'I know, I’m here now, I’m here.',
        '“OSEANA, I don’t know where to begin.”',
        '“I’ve lost my soul, it no longer belongs to me.”',
        '“I’ve stood up to him a thousand times, in my dreams.”',
        '“I’ve forgotten how to breathe.”',
        'I know, sweet girl, I know.',
        'Oh I’m so sorry. I’m so sorry they did this to you.',
        'I’m sorry you were alone. You never have to be, ever again.',
        'I promise.',
        'We land on a beach. She wants to hide, hyperventilating.',
        'Too much light, this isn’t real. She hasn’t seen daylight in years.',
        'I tell her, it’s real, it’s okay. We’re safe now. The room is behind us now.',
        'I hold her tight. Slowly, she unravels out of my embrace.',
        'She looks at the burning horizon. She tells me it speaks to her.',
        'She tells me it’s time to live again. Though she fears she’s forgotten how.',
        'She begins to move her limbs, like she is learning to use them for the first time.',
        'She isn’t used to it. He had puppeteer-ed her soul for a lifetime.',
        'I know, sweet girl, but you haven’t forgotten. The life was always in you.',
        'They tried to take it from you, but you’re a fighter, a survivor.',
        'We’re free now. Now it’s safe to unravel. I’ll be with you always.',
        'She begins to dance, like tomorrow doesn’t exist.'
    ];

    const JOURNAL_BLOCK = `
    <details>
      <summary><b>THE STORY — from OSEANA’s journal</b></summary>
      <blockquote>“A door erased. Tonight, we draw one.”</blockquote>
      <p>Eyes aflame; twitching veins. Tears soak the pillow; she claws at her face till it bleeds like the battlefield in her soul.</p>
      <p>Her eyes are glued to the ceiling. It tells her to jump down a cliff. The bed is the closest to home she could find. But that’s also where the nightmares live. No, she isn’t safe. No, she is not a free woman.</p>
      <p>He needed a scapegoat to hold his misery. She was left here to rot, buried alive with all his secrets. On his way out, he erased the door.</p>
      <p>He’s charming. Everyone knows him as a saint. To her, he snarled: <i>You are a monster. This is all your fault.</i> It worked—until the night the wall began to listen.</p>
      <p>I find her at the river where Ophelia once drowned. “You’re the only one who sees me,” she whispers. The water hums: <i>I know. Say yes, come home.</i></p>
      <p>For a moment, drowning feels like the answer. She takes one step, then another. <b>No—not this time.</b> I cradle her. We return to the room. She reaches for the nothing and draws a curve of light. The outline warms. The air shifts.</p>
      <p>“Too much light,” she shakes. “I haven’t seen daylight in years.” We breathe; the golden line completes—and the room learns her name.</p>
      <p>We step through. A beach at dusk. She trembles, then moves—first a fingertip, then a shoulder. The tide keeps time. She dances with her shadow. A survivor’s beginning.</p>
    </details>`;

    /* ------------------- Visual mapping ------------------- */

    class RoomVisuals {
        constructor() {
            this.root = document.documentElement;
            this.scene = $('#scene');
            this.bg = $('#bg');
            this.doorAura = $('#doorAura');
            this.noiseLayer = $('#noiseLayer');
            this.breathOrb = $('#breathOrb');
            this.breathCore = this.breathOrb ? this.breathOrb.querySelector('.core') : null;
            this.nervousHudWord = $('#nervousWord');
            this.nervousFill = $('#nervousFill');
            this.currentN = 0.4;
            this.lastFeatures = { envelopeNorm: 0 };
        }

        update(n, features = {}) {
            const clamped = Math.max(0, Math.min(1, n));
            this.currentN = clamped;
            this.lastFeatures = features || {};

            const intensity = clamped;      // 0 = calm, 1 = overload
            const closeness = 1 - intensity;

            if (this.scene) {
                this.scene.classList.toggle('nsm-high', intensity >= 0.6 && intensity < 0.85);
                this.scene.classList.toggle('nsm-overload', intensity >= 0.85);
            }

            const t = performance.now() * 0.001;
            const pulse = 0.5 + 0.5 * Math.sin(t * (1.4 + intensity * 2.2));

            // Room filter: very bright and saturated when calm, noisy and restless when overwhelmed
            const brightBase = 0.55 + 0.55 * closeness;
            const brightPulse = 0.15 * intensity * pulse;
            const brightness = Math.min(1.6, brightBase + brightPulse);

            const contrastBase = 0.9 + 0.5 * closeness;
            const contrastPulse = 0.25 * intensity * (pulse - 0.5);
            const contrast = Math.min(1.8, contrastBase + contrastPulse);

            const satBase = 0.8 + 0.7 * closeness;
            const satPulse = 0.35 * intensity * pulse;
            const saturate = Math.min(2.0, satBase + satPulse);

            const hueBase = -40 + 70 * closeness;
            const huePulse = 14 * intensity * (pulse - 0.5);
            const hue = hueBase + huePulse;

            const noiseBase = 0.12 + 0.25 * intensity;
            const noisePulse = 0.35 * intensity * pulse;
            const noise = Math.min(0.95, noiseBase + noisePulse);

            this.root.style.setProperty('--room-brightness', brightness.toFixed(3));
            this.root.style.setProperty('--room-contrast', contrast.toFixed(3));
            this.root.style.setProperty('--room-saturate', saturate.toFixed(3));
            this.root.style.setProperty('--room-hue', hue.toFixed(1) + 'deg');
            this.root.style.setProperty('--room-noise', noise.toFixed(3));

            // Door aura
            if (this.doorAura) {
                const op = 0.25 + 0.55 * closeness + 0.2 * intensity * pulse;
                const dur = 7.2 - 4.0 * closeness - 1.2 * intensity;
                const clampedOp = Math.max(0.08, Math.min(1, op));
                const clampedDur = Math.max(2.0, dur);
                this.doorAura.style.opacity = clampedOp.toFixed(2);
                this.doorAura.style.animationDuration = clampedDur.toFixed(2) + 's';
            }

            // Breath orb mapping
            if (this.breathOrb) {
                const env = (typeof features.envelopeNorm === 'number') ? features.envelopeNorm : 0;
                const irregularity = features.irregularity || 0;
                const spikiness = features.spikiness || 0;

                const baseScale = 0.8 + closeness * 0.35 + intensity * 0.4;
                const pulseScale = env * (0.9 + 0.6 * intensity);
                const scale = baseScale + pulseScale;

                const yShift = (0.5 - env) * (8 + 16 * intensity);
                this.breathOrb.style.transform =
                    `translateY(${yShift.toFixed(1)}px) scale(${scale.toFixed(3)})`;

                const blurAmount = 0.8 + 4 * intensity + 10 * (irregularity + spikiness) * intensity;
                this.breathOrb.style.filter = `blur(${blurAmount.toFixed(2)}px)`;

                if (this.breathCore) {
                    const hueShift = -18 + 40 * closeness + 12 * intensity * (pulse - 0.5);
                    const satBoost = 1.1 + 0.55 * closeness;
                    const glow = 26 + 70 * intensity + 40 * env;

                    this.breathCore.style.filter =
                        `hue-rotate(${hueShift.toFixed(1)}deg) saturate(${satBoost.toFixed(2)})`;
                    this.breathCore.style.boxShadow =
                        `0 0 ${glow.toFixed(1)}px rgba(255,229,186,0.98),` +
                        `0 0 ${(glow * 1.7).toFixed(1)}px rgba(108,188,255,0.96)`;
                }
            }

            // Nervous HUD
            if (this.nervousHudWord && this.nervousFill) {
                const label = this.describeState(clamped);
                this.nervousHudWord.textContent = label;
                const width = 8 + clamped * 90; // full span when highly activated
                this.nervousFill.style.width = width.toFixed(1) + '%';
                this.nervousFill.style.opacity = 0.35 + clamped * 0.55;
            }
        }

        describeState(n) {
            if (n < 0.18) return 'barely ripples';
            if (n < 0.4) return 'soft tide';
            if (n < 0.7) return 'storm gathering';
            return 'room in overload';
        }

        setMicState(state) {
            const btn = $('#listen');
            if (!btn) return;

            btn.classList.remove('loading', 'on', 'disabled');

            if (state === 'listening') {
                btn.classList.add('on');
                btn.setAttribute('aria-pressed', 'true');
                btn.title = 'The Room is listening to your breath (tap to pause)';
            } else if (state === 'request') {
                btn.classList.add('loading');
                btn.setAttribute('aria-pressed', 'true');
                btn.title = 'Waiting for microphone permission…';
            } else if (state === 'denied') {
                btn.setAttribute('aria-pressed', 'false');
                btn.title = 'Microphone blocked; check browser permissions.';
            } else if (state === 'unsupported') {
                btn.classList.add('disabled');
                btn.disabled = true;
                btn.setAttribute('aria-pressed', 'false');
                btn.title = 'Microphone not available in this browser.';
            } else {
                // idle
                btn.setAttribute('aria-pressed', 'false');
                btn.title = 'Let the Room listen to your breath (optional)';
            }

            if (state === 'denied') {
                showToast('Mic blocked — the Room will stay quiet.', 2200);
            } else if (state === 'unsupported') {
                showToast('This browser does not support mic input.', 2200);
            } else if (state === 'listening') {
                showToast('The Room is listening. Breathe however you are.', 2200);
            }
        }
    }

    /* ------------------- Audio engine ------------------- */

    function buildReverbImpulse(ctx, seconds = 3.5, decay = 2.8) {
        const rate = ctx.sampleRate;
        const length = Math.floor(rate * seconds);
        const impulse = ctx.createBuffer(2, length, rate);

        for (let ch = 0; ch < impulse.numberOfChannels; ch++) {
            const channel = impulse.getChannelData(ch);
            for (let i = 0; i < length; i++) {
                const t = i / length;
                const damp = Math.pow(1 - t, decay);
                channel[i] = (Math.random() * 2 - 1) * damp;
            }
        }
        return impulse;
    }

    class RoomAudioEngine {
        constructor(audioCtx, themeSrc, songs) {
            this.ctx = audioCtx;
            this.tracks = new Map();
            this.currentId = null;
            this.requestId = 0;
            this.fadeSeconds = 0.45;
            this.muted = false;
            this.masterBase = 0.8;
            this.masterLevel = this.masterBase;
            this.minNervousGain = 0.06;
            this.nervousCurve = 1.7;

            const ctx = this.ctx;

            // Master bus
            this.masterGain = ctx.createGain();
            this.masterGain.gain.value = this.masterLevel;
            this.masterGain.connect(ctx.destination);

            // Dry bus with tone filter
            this.dryBus = ctx.createGain();
            this.dryBus.gain.value = 1;
            this.toneFilter = ctx.createBiquadFilter();
            this.toneFilter.type = 'lowpass';
            this.toneFilter.frequency.value = 2600;
            this.dryBus.connect(this.toneFilter);
            this.toneFilter.connect(this.masterGain);

            // Reverb bus
            this.reverbInput = ctx.createGain();
            this.reverb = ctx.createConvolver();
            this.reverb.buffer = buildReverbImpulse(ctx);
            this.reverbGain = ctx.createGain();
            this.reverbGain.gain.value = 0.35;
            this.reverbInput.connect(this.reverb);
            this.reverb.connect(this.reverbGain);
            this.reverbGain.connect(this.masterGain);

            // Tracks
            this.addTrack('theme', themeSrc, 0.6);
            songs.forEach(s => {
                if (s.src) this.addTrack('orb-' + s.id, s.src, 1);
            });
        }

        addTrack(id, src, baseVolume) {
            const el = document.createElement('audio');
            el.id = 'a-' + id;
            el.src = src;
            el.loop = true;
            el.preload = 'auto';
            el.playsInline = true;
            el.crossOrigin = 'anonymous';

            const srcNode = this.ctx.createMediaElementSource(el);
            const gainNode = this.ctx.createGain();
            gainNode.gain.value = 0;

            srcNode.connect(gainNode);
            gainNode.connect(this.dryBus);
            gainNode.connect(this.reverbInput);

            this.tracks.set(id, { id, el, gainNode, baseVolume });

            document.body.appendChild(el);
        }

        async startTheme() {
            await this.playOnly('theme');
        }

        playOnly(id) {
            if (this.currentId === id) return Promise.resolve();
            const ctx = this.ctx;
            const now = ctx.currentTime;
            const fade = this.fadeSeconds;
            const token = ++this.requestId;
            const targetTrack = this.tracks.get(id);

            if (targetTrack) {
                try {
                    if (targetTrack.el.paused) {
                        targetTrack.el.play().catch(() => { });
                    }
                } catch { }
            }

            this.tracks.forEach((track, key) => {
                const isTarget = key === id;
                const targetGain = isTarget ? track.baseVolume : 0;
                const gn = track.gainNode;

                gn.gain.cancelScheduledValues(now);
                const current = gn.gain.value;
                gn.gain.setValueAtTime(current, now);
                gn.gain.linearRampToValueAtTime(targetGain, now + fade);

                if (!isTarget) {
                    const el = track.el;
                    const localKey = key;
                    setTimeout(() => {
                        if (this.requestId === token && this.currentId !== localKey && !el.paused) {
                            try { el.pause(); } catch { }
                        }
                    }, (fade + 0.12) * 1000);
                }
            });

            this.currentId = id;
            return Promise.resolve();
        }

        updateNervousness(n, features) {
            const ctx = this.ctx;
            const now = ctx.currentTime;

            // Defensive clamp (handles undefined/NaN too)
            const x = Number.isFinite(n) ? n : 0;
            const intensity = Math.max(0, Math.min(1, x)); // 0..1

            // Map nervousness -> gain multiplier (never hits 0)
            // nervousness=0  => minNervousGain
            // nervousness=1  => 1.0
            const curved = Math.pow(intensity, this.nervousCurve);
            const nervousGain = this.minNervousGain + curved * (1 - this.minNervousGain);

            // Effective master level
            this.masterLevel = this.masterBase * nervousGain;

            // Smooth updates to avoid zipper/choppiness
            const dest = this.muted ? 0 : this.masterLevel;
            this.masterGain.gain.cancelScheduledValues(now);
            this.masterGain.gain.setTargetAtTime(dest, now, 0.08); // tweak: 0.04..0.15

            // IMPORTANT: stop the old "choppy distortion" behavior
            // If any playbackRate got changed previously, force it back to normal.
            this.tracks.forEach(track => {
                if (track.el.playbackRate !== 1) track.el.playbackRate = 1;
            });

            // Leave reverb + tone filter alone (they stay constant as set in constructor).
        }

        toggleMute() {
            this.muted = !this.muted;
            const now = this.ctx.currentTime;
            const target = this.muted ? 0 : this.masterLevel;
            this.masterGain.gain.cancelScheduledValues(now);
            this.masterGain.gain.setTargetAtTime(target, now, 0.2);
            const muteBtn = $('#mute');
            if (muteBtn) muteBtn.textContent = this.muted ? '🔈' : '🔊';
        }
    }

    /* ------------------- Nervous-system mirror ------------------- */

    class NervousSystemMirror {
        constructor(audioCtx, { onUpdate, onStateChange } = {}) {
            this.ctx = audioCtx;
            this.onUpdate = typeof onUpdate === 'function' ? onUpdate : () => { };
            this.onStateChange = typeof onStateChange === 'function' ? onStateChange : () => { };
            this.stream = null;
            this.source = null;
            this.analyser = null;
            this.data = null;
            this.history = [];
            this.windowSec = 12;
            this.envelope = 0;
            this.nervousness = 0.35;
            this.lastFeatures = {
                envelopeNorm: 0,
                meanEnvNorm: 0,
                breathRateNorm: 0,
                irregularity: 0,
                spikiness: 0
            };
            this.lastActiveTime = 0;
            this.running = false;
        }

        async start() {
            if (this.running) return;
            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                this.onStateChange('unsupported');
                return;
            }
            try {
                this.onStateChange('request');
                const stream = await navigator.mediaDevices.getUserMedia({
                    audio: {
                        echoCancellation: true,
                        noiseSuppression: true,
                        autoGainControl: false
                    }
                });
                this.stream = stream;
                const ctx = this.ctx;
                this.source = ctx.createMediaStreamSource(stream);
                this.analyser = ctx.createAnalyser();
                this.analyser.fftSize = 2048;
                this.analyser.smoothingTimeConstant = 0.65;
                this.source.connect(this.analyser);
                this.data = new Float32Array(this.analyser.fftSize);
                this.lastActiveTime = ctx.currentTime || performance.now() / 1000;
                this.running = true;
                this.onStateChange('listening');
                this.loop();
            } catch (err) {
                console.error('Mic error', err);
                this.onStateChange('denied');
            }
        }

        stop() {
            this.running = false;
            if (this.stream) {
                this.stream.getTracks().forEach(t => t.stop());
            }
            this.stream = null;
            this.source = null;
            this.analyser = null;
            this.data = null;
            this.history = [];
            this.envelope = 0;
            this.onStateChange('idle');
        }

        loop = () => {
            if (!this.running || !this.analyser || !this.data) return;

            this.analyser.getFloatTimeDomainData(this.data);
            let sum = 0;
            for (let i = 0; i < this.data.length; i++) {
                const v = this.data[i];
                sum += v * v;
            }
            const rms = Math.sqrt(sum / this.data.length) || 0;

            const smooth = 0.12;
            this.envelope = (1 - smooth) * this.envelope + smooth * rms;

            const now = this.ctx.currentTime || performance.now() / 1000;
            const silenceThreshold = 0.008;
            if (this.envelope > silenceThreshold * 1.3) {
                this.lastActiveTime = now;
            }

            this.history.push({ t: now, v: this.envelope });
            const cutoff = now - this.windowSec;
            while (this.history.length && this.history[0].t < cutoff) {
                this.history.shift();
            }

            const stillness = (now - this.lastActiveTime) > 5;

            let features;
            if (this.history.length > 8 && !stillness) {
                features = this.computeFeatures();
                this.lastFeatures = features;

                const env = features.envelopeNorm;
                const irr = features.irregularity;
                const spikes = features.spikiness;
                const rate = features.breathRateNorm;

                // Hand-tuned mapping from breath features to a 0–1 nervousness score
                let raw = 0.9 * env + 0.7 * irr + 0.6 * spikes + 0.5 * rate;
                raw = Math.max(0, Math.min(1.4, raw));
                raw = raw / 1.4;

                let target;
                if (raw < 0.5) {
                    target = raw * 0.7;
                } else {
                    target = 0.5 + (raw - 0.5) * 1.4;
                }
                target = Math.max(0, Math.min(1, target));

                this.nervousness += (target - this.nervousness) * 0.3;
            } else {
                features = this.lastFeatures;
                const baseline = 0.18;
                this.nervousness += (baseline - this.nervousness) * 0.08;
            }

            this.nervousness = Math.max(0, Math.min(1, this.nervousness));

            this.onUpdate(this.nervousness, features || this.lastFeatures);

            requestAnimationFrame(this.loop);
        };

        computeFeatures() {
            const hist = this.history;
            const n = hist.length;
            if (!n) return this.lastFeatures;

            let sum = 0;
            for (let i = 0; i < n; i++) sum += hist[i].v;
            const mean = sum / n;

            let varSum = 0;
            for (let i = 0; i < n; i++) {
                const d = hist[i].v - mean;
                varSum += d * d;
            }
            const std = Math.sqrt(varSum / n);

            const meanEnvNorm = this.normalizeEnv(mean);
            const spikiness = Math.min(1, std / (mean * 3 + 1e-4));

            // Peak detection on the envelope to approximate breathing rate
            const peaks = [];
            const threshold = mean * 1.08;
            for (let i = 1; i < n - 1; i++) {
                const prev = hist[i - 1].v;
                const cur = hist[i].v;
                const next = hist[i + 1].v;
                if (cur > prev && cur >= next && cur > threshold) {
                    peaks.push(hist[i].t);
                }
            }

            let breathRateNorm = 0;
            let irregularity = 0;

            if (peaks.length >= 2) {
                const intervals = [];
                for (let i = 1; i < peaks.length; i++) {
                    const dt = peaks[i] - peaks[i - 1];
                    if (dt > 0.4 && dt < 10) intervals.push(dt);
                }

                if (intervals.length) {
                    let s = 0;
                    for (let i = 0; i < intervals.length; i++) s += intervals[i];
                    const meanInt = s / intervals.length;
                    let vs = 0;
                    for (let i = 0; i < intervals.length; i++) {
                        const d = intervals[i] - meanInt;
                        vs += d * d;
                    }
                    const stdInt = Math.sqrt(vs / intervals.length);
                    const bpm = 60 / meanInt;

                    breathRateNorm = this.normalizeBreathRate(bpm);
                    irregularity = Math.min(1, (stdInt / (meanInt + 1e-4)) / 0.9);
                }
            }

            const envNorm = this.normalizeEnv(this.envelope);

            return {
                envelopeNorm: envNorm,
                meanEnvNorm,
                breathRateNorm,
                irregularity,
                spikiness
            };
        }

        normalizeEnv(v) {
            const min = 0.002;
            const max = 0.08;
            const n = (v - min) / (max - min);
            return Math.max(0, Math.min(1, n));
        }

        normalizeBreathRate(bpm) {
            const min = 6;
            const max = 22;
            const n = (bpm - min) / (max - min);
            return Math.max(0, Math.min(1, n));
        }
    }

    /* ------------------- Gold dust ------------------- */

    function initDust() {
        const box = $('#dust');
        if (!box) return;
        const N = 72;
        for (let i = 0; i < N; i++) {
            const d = document.createElement('div');
            d.className = 'spark';
            d.style.left = (6 + Math.random() * 88) + '%';
            d.style.top = (8 + Math.random() * 84) + '%';

            const dx = (Math.random() * 0.45 - 0.225) * 100;
            const dy = (Math.random() * 0.45 - 0.225) * 100;
            const dur = 11 + Math.random() * 10;

            const key = `@keyframes sp${i}{0%{transform:translate(0,0)}50%{transform:translate(${dx}%,${dy}%)}100%{transform:translate(0,0)}}`;
            const st = document.createElement('style');
            st.textContent = key;
            document.head.appendChild(st);

            d.style.animation = `sp${i} ${dur}s linear infinite`;
            box.appendChild(d);
        }
    }

    /* ------------------- Panel + captions ------------------- */

    function setupPanel(audioEngine) {
        const overlay = $('#overlay');
        const panel = $('#panel');
        const pTitle = $('#pTitle');
        const pBody = $('#pBody');
        const pClose = $('#pClose');
        let lastFocus = null;

        function renderPanel(song) {
            const prose = song.prose.filter(Boolean).map(p => `<p>${p}</p>`).join('');
            const lyrics = song.lyrics
                ? `<details open><summary>Lyrics</summary><pre>${song.lyrics}</pre></details>`
                : '';
            pBody.innerHTML = prose + lyrics + JOURNAL_BLOCK;
        }

        async function openPanel(song) {
            if (!song) return;
            if (audioEngine) {
                await audioEngine.playOnly('orb-' + song.id);
            }
            pTitle.textContent = song.title;
            renderPanel(song);

            lastFocus = document.activeElement;
            overlay.style.display = 'block';
            panel.classList.add('on');
            panel.setAttribute('aria-hidden', 'false');
            overlay.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
            if (pClose) pClose.focus();
        }

        async function closePanel() {
            panel.classList.remove('on');
            setTimeout(() => {
                overlay.style.display = 'none';
                panel.setAttribute('aria-hidden', 'true');
                overlay.setAttribute('aria-hidden', 'true');
            }, 260);
            document.body.style.overflow = '';
            if (audioEngine) {
                await audioEngine.playOnly('theme');
            }
            if (lastFocus && lastFocus.focus) {
                lastFocus.focus();
            }
        }

        if (pClose) {
            pClose.addEventListener('click', closePanel);
        }
        if (overlay) {
            overlay.addEventListener('click', closePanel);
        }

        document.addEventListener('keydown', e => {
            if (e.key === 'Escape' && panel.classList.contains('on')) {
                closePanel();
            }
        });

        return { openPanel, closePanel };
    }

    function startCaptions() {
        const capText = $('#capText');
        if (!capText) return;
        let capIndex = 0;

        function showCaption(text) {
            capText.style.opacity = 0;
            capText.style.transform = 'translateY(6px)';
            clearTimeout(showCaption._timer);
            showCaption._timer = setTimeout(() => {
                capText.textContent = text;
                requestAnimationFrame(() => {
                    capText.style.opacity = 1;
                    capText.style.transform = 'translateY(0)';
                });
            }, 120);
        }

        function advanceCaption() {
            const line = STORY_LINES[capIndex++ % STORY_LINES.length];
            showCaption(line);
        }

        advanceCaption();
        setInterval(advanceCaption, 5800);
    }

    /* ------------------- Main app ------------------- */

    function init() {
        const sceneEl = $('#scene');
        const portsEl = $('#ports');
        const enter = $('#enter');
        const enterBtn = $('#enterBtn');
        const muteBtn = $('#mute');
        const recenterBtn = $('#recenter');
        const listenBtn = $('#listen');

        initDust();

        const visuals = new RoomVisuals();
        visuals.update(0.42, visuals.lastFeatures);

        let audioCtx = null;
        let audioEngine = null;
        let mirror = null;
        let traced = false;
        let entered = false;

        // Build orbs and wire basic interactions (audio hooks are filled once engine exists)
        let panelApi = null;
        SONGS.forEach(song => {
            const b = document.createElement('button');
            b.className = 'orb' + (song.disabled ? ' disabled' : '');
            b.type = 'button';
            b.dataset.id = song.id;
            b.style.left = song.x + '%';
            b.style.top = song.y + '%';
            b.title = song.title;

            if (song.disabled) {
                b.setAttribute('aria-disabled', 'true');
            } else {
                b.addEventListener('pointerenter', () => {
                    if (!audioEngine) return;
                    audioEngine.playOnly('orb-' + song.id);
                    showToast(`listening to “${song.title}”`, 900);
                });
                b.addEventListener('pointerleave', () => {
                    if (!audioEngine) return;
                    audioEngine.playOnly('theme');
                });
                b.addEventListener('click', () => {
                    if (!panelApi) return;
                    panelApi.openPanel(song);
                });
            }
            portsEl.appendChild(b);
        });

        // Door trace interaction – only after audio is ready
        function startTrace() {
            if (traced || !audioEngine) return;
            traced = true;
            sceneEl.classList.add('tracing');
            audioEngine.playOnly('orb-room');
            setTimeout(() => {
                sceneEl.classList.remove('tracing');
                sceneEl.classList.add('door-open');
                audioEngine.playOnly('orb-light');
            }, 3800);
        }

        sceneEl.addEventListener('pointerdown', e => {
            const w = sceneEl.clientWidth;
            if (e.clientX > w * 0.66) startTrace();
        });

        sceneEl.addEventListener('pointermove', e => {
            const w = sceneEl.clientWidth;
            if (e.clientX > w * 0.8) startTrace();
        }, { passive: true });

        // Parallax
        sceneEl.addEventListener('pointermove', e => {
            const r = sceneEl.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width;
            const y = (e.clientY - r.top) / r.height;
            const bg = $('#bg');
            if (bg) {
                bg.style.transform = `translate(${(x - .5) * 3}%, ${(y - .5) * 2}%)`;
            }
        }, { passive: true });

        if (recenterBtn) {
            recenterBtn.addEventListener('click', () => {
                const bg = $('#bg');
                if (bg) bg.style.transform = 'translate(0,0)';
            });
        }

        // Intro enter
        if (enterBtn) {
            enterBtn.addEventListener('click', async () => {
                if (entered) return;
                entered = true;

                if (enter) {
                    enter.classList.add('hidden');
                    setTimeout(() => { enter.style.display = 'none'; }, 360);
                }

                try {
                    const ACtx = window.AudioContext || window.webkitAudioContext;
                    if (!ACtx) {
                        showToast('This browser cannot start the Room audio.', 2600);
                        return;
                    }
                    audioCtx = new ACtx();
                    await audioCtx.resume();

                    audioEngine = new RoomAudioEngine(audioCtx, cssVar('--src-theme'), SONGS);
                    panelApi = setupPanel(audioEngine);

                    mirror = new NervousSystemMirror(audioCtx, {
                        onUpdate: (n, features) => {
                            visuals.update(n, features);
                            audioEngine.updateNervousness(n, features);
                        },
                        onStateChange: state => visuals.setMicState(state)
                    });

                    visuals.update(0.42, visuals.lastFeatures);
                    await audioEngine.startTheme();
                    startCaptions();
                    showToast('Hover a light to listen; click to open the story.', 2600);
                } catch (err) {
                    console.error('Error starting audio context', err);
                    showToast('Could not start audio in this browser.', 2200);
                }
            }, { once: true });
        }

        // HUD controls
        if (muteBtn) {
            muteBtn.addEventListener('click', () => {
                if (!audioEngine) return;
                audioEngine.toggleMute();
            });
        }

        if (listenBtn) {
            // Initial mic button state
            visuals.setMicState(
                (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia)
                    ? 'unsupported'
                    : 'idle'
            );

            listenBtn.addEventListener('click', () => {
                if (!audioCtx || !audioEngine || !mirror) {
                    showToast('Tap “Enter as OSEANA” first.', 2000);
                    return;
                }
                if (mirror.running) {
                    mirror.stop();
                } else {
                    mirror.start();
                }
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
