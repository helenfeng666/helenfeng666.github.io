(() => {
    /* ---------- helpers ---------- */
    const $ = s => document.querySelector(s);
    const cssVar = k =>
        getComputedStyle(document.documentElement)
            .getPropertyValue(k)
            .trim()
            .replace(/^'|"|'+$/g, '');

    const showToast = () => {
        const t = $('#toast');
        t.style.display = 'block';
        clearTimeout(window.__tt);
        window.__tt = setTimeout(() => (t.style.display = 'none'), 700);
    };

    /* =========================================================
       MISATTUNEMENT / STIGMA WHISPERS (NEW)
       ========================================================= */
    const stigma = (() => {
        const scene = $('#scene');

        // Use existing layer from HTML; create if missing
        const layer =
            $('#stigma-layer') ||
            (() => {
                const d = document.createElement('div');
                d.id = 'stigma-layer';
                d.setAttribute('aria-hidden', 'true');
                scene.appendChild(d);
                return d;
            })();

        const MAX = 14;

        // Phrase pools (big on purpose)
        const POOLS = {
            base: [
                "You're too sensitive.",
                "Stop being dramatic.",
                "Calm down.",
                "You're overreacting.",
                "It's not that serious.",
                "You're making a big deal out of nothing.",
                "You're exhausting.",
                "You're too much.",
                "You're not enough.",
                "You're difficult.",
                "You're being ridiculous.",
                "You're embarrassing.",
                "Why can't you just be normal?",
                "Try harder.",
                "You're not trying hard enough.",
                "You're lazy.",
                "You're messy.",
                "You're careless.",
                "You're irresponsible.",
                "You're wasting everyone's time.",
                "You're making excuses.",
                "You're being selfish.",
                "You're being needy.",
                "Stop wanting so much.",
                "Stop crying.",
                "Stop asking for reassurance.",
                "No one knows what you're talking about.",
                "You don't make sense.",
                "You're imagining things.",
                "It's all in your head.",
                "You're too intense.",
                "You're too loud.",
                "You're too quiet.",
                "You're too weird.",
                "You're too complicated.",
                "You're a problem.",
                "You're a burden.",
                "You ruin the mood.",
                "You're always like this.",
                "You always do this.",
                "Just get over it.",
                "Move on already.",
                "You're not special.",
                "You're not magical.",
                "I don't see any magic in you.",
                "You're not worth the effort.",
                "You're impossible to love.",
                "You're too emotional.",
                "You're too cold.",
                "You're too clingy.",
                "You're too much work.",
                "Stop making it about you.",
                "You're being inconvenient.",
                "You're being unreasonable.",
                "You're making it worse.",
                "You're the reason this is hard.",
                "You're the defective one.",
                "Your signal is noise.",
                "Your truth is inconvenient.",
                "You're not allowed to feel that.",
                "That feeling is wrong.",
                "That's not real.",
                "You're exaggerating.",
                "You're so dramatic.",
                "You're so messy.",
                "You're so lazy.",
                "You're so needy.",
                "Why are you like this?",
                "Don't be like that.",
                "Fix your face.",
                "Tone it down.",
                "Stop talking.",
                "Stop fidgeting.",
                "Stop being so intense.",
                "Stop being so much.",
            ],
            wanting: [
                "Stop wanting.",
                "You're desperate.",
                "You're clingy.",
                "You're embarrassing yourself.",
                "No one is coming.",
                "You're too needy.",
                "You're too attached.",
                "You're doing it again.",
                "You're not lovable like that.",
                "You're making it up.",
                "You're addicted to fantasy.",
                "You're pathetic for hoping.",
                "You should be ashamed.",
                "You're not wanted.",
                "You're asking for too much.",
                "Stop reaching.",
                "Stop hoping.",
                "Stop romanticizing everything.",
                "You're not worth returning for.",
            ],
            naked: [
                "Hide that.",
                "Don't show that.",
                "Don't be seen.",
                "You're disgusting.",
                "You're not pretty enough.",
                "You're not good enough.",
                "You're too much to look at.",
                "You're too flawed.",
                "You're not allowed to take up space.",
                "You're embarrassing.",
                "No one wants to see the real you.",
                "You're not safe to be honest.",
                "You're wrong at the core.",
                "You're a problem to them.",
                "You're too much trouble.",
                "You're unlovable like that.",
                "Stop revealing yourself.",
                "Put the mask back on.",
            ],
            sayyes: [
                "Who do you think you are?",
                "Don't flatter yourself.",
                "You don't deserve that.",
                "You're delusional.",
                "You're making it up again.",
                "You're not allowed to believe in yourself.",
                "You'll fail anyway.",
                "You're not strong enough.",
                "You're not consistent.",
                "You'll quit like you always do.",
                "You're just pretending.",
                "You're not real.",
                "You're not that person.",
                "Stop trying.",
                "Stop reaching for warmth.",
                "You don't get to feel safe.",
                "Safety isn't for you.",
                "You're not worth holding.",
            ],
            answer: [
                "Stop asking questions.",
                "You're annoying.",
                "You're not getting an answer.",
                "You don't deserve clarity.",
                "You're too much.",
                "You're too complicated.",
                "You're not worth explaining to.",
                "You're wrong.",
                "You're not trustworthy.",
                "Your perception is broken.",
                "Your signal is unreliable.",
                "You can't trust yourself.",
                "You don't know what you feel.",
                "You're confused.",
                "You're always confused.",
                "You can't follow your own signal.",
                "Stop listening to yourself.",
                "Stop believing your body.",
            ],
        };

        const rand = (a, b) => a + Math.random() * (b - a);
        const pick = arr => arr[Math.floor(Math.random() * arr.length)];

        // context getter injected later (so stigma doesn’t depend on order)
        const state = {
            enabled: true,
            running: false,
            intensity: 0.28,
            mode: 'base',
            timer: null,
            ctx: () => ({ locked: false, current: 'theme' }),
            hitT: null,
        };

        function clamp(v, a, b) {
            return Math.max(a, Math.min(b, v));
        }

        function modeFromCurrent(id) {
            if (!id) return 'base';
            if (id.includes('wanting')) return 'wanting';
            if (id.includes('naked')) return 'naked';
            if (id.includes('sayyes')) return 'sayyes';
            if (id.includes('answer')) return 'answer';
            return 'base';
        }

        function pickMessage() {
            const pool = POOLS[state.mode] || POOLS.base;
            // bias to mode pool, but occasionally leak base voice
            if (state.mode !== 'base' && Math.random() < 0.22) return pick(POOLS.base);
            return pick(pool);
        }

        // Avoid the caption rail zone (bottom center) for readability
        function randomSafePos() {
            const x = rand(0.08, 0.92);
            const y = rand(0.12, 0.78);
            // carve out a “caption no-fly zone” near bottom middle
            const inCaptionZone = x > 0.24 && x < 0.76 && y > 0.66;
            if (inCaptionZone) return randomSafePos();
            return { x, y };
        }

        function cursorPxPos() {
            const vc = document.querySelector('#vcursor');
            if (!vc) return null;
            const sx = parseFloat(vc.style.left);
            const sy = parseFloat(vc.style.top);
            if (!Number.isFinite(sx) || !Number.isFinite(sy)) return null;
            return { sx, sy }; // px within scene
        }

        function anchorToPx(anchor) {
            const r = scene.getBoundingClientRect();
            const safe = randomSafePos();

            // defaults (random)
            let px = safe.x * r.width;
            let py = safe.y * r.height;

            if (anchor === 'cursor') {
                const c = cursorPxPos();
                if (c) {
                    px = c.sx + rand(-140, 140);
                    py = c.sy + rand(-110, 110);
                }
            } else if (anchor === 'edge') {
                const left = Math.random() < 0.5;
                px = (left ? rand(0.08, 0.22) : rand(0.78, 0.92)) * r.width;
                py = rand(0.14, 0.78) * r.height;
            } else if (anchor === 'top') {
                px = rand(0.14, 0.86) * r.width;
                py = rand(0.12, 0.24) * r.height;
            }

            // clamp to scene padding
            px = clamp(px, 22, r.width - 22);
            py = clamp(py, 22, r.height - 22);

            return { px, py };
        }

        function flashScan() {
            layer.classList.add('hit');
            clearTimeout(state.hitT);
            state.hitT = setTimeout(() => layer.classList.remove('hit'), 260);
        }

        function spawn({
            text,
            anchor = 'random',
            mood = null,
            lifeMs = null,
        } = {}) {
            if (!state.enabled) return;
            const { locked, current } = state.ctx();
            state.mode = modeFromCurrent(current) || state.mode;

            const msg = (text || pickMessage()).trim();
            if (!msg) return;

            // Manage density
            while (layer.childElementCount >= MAX) {
                layer.removeChild(layer.firstElementChild);
            }

            const el = document.createElement('div');
            el.className = 'stigma';

            const moods = ['whisper', 'hiss', 'shout'];
            const chosenMood = mood || (locked ? (Math.random() < 0.25 ? 'shout' : 'hiss') : (Math.random() < 0.22 ? 'hiss' : 'whisper'));
            el.classList.add(chosenMood);

            const { px, py } = anchorToPx(anchor);

            const life = lifeMs ?? (locked ? rand(2600, 5200) : rand(2400, 4600));
            const rot = rand(-7, 7);
            const dx = rand(-10, 10);
            const dy = rand(-8, 8);
            const echoX = rand(-2.5, 2.5);
            const echoY = rand(-1.5, 1.5);

            el.style.left = px + 'px';
            el.style.top = py + 'px';
            el.style.setProperty('--life', `${Math.round(life)}ms`);
            el.style.setProperty('--rot', `${rot.toFixed(2)}deg`);
            el.style.setProperty('--dx', `${dx.toFixed(1)}px`);
            el.style.setProperty('--dy', `${dy.toFixed(1)}px`);
            el.style.setProperty('--echoX', `${echoX.toFixed(2)}px`);
            el.style.setProperty('--echoY', `${echoY.toFixed(2)}px`);

            const w = document.createElement('div');
            w.className = 'w';
            w.setAttribute('data-text', msg);
            w.textContent = msg;

            el.appendChild(w);
            layer.appendChild(el);

            if (Math.random() < (locked ? 0.65 : 0.35)) flashScan();

            // remove after life
            window.setTimeout(() => {
                el.remove();
            }, life + 120);
        }

        function scheduleNext() {
            if (!state.running || !state.enabled) return;

            const { locked, current } = state.ctx();
            state.mode = modeFromCurrent(current);

            // dynamic tempo: more aggressive when locked on a song
            const base = locked ? 1050 : (current && current !== 'theme' ? 1550 : 2600);
            const intensityFactor = 1 + state.intensity * 0.85;
            const delay = (base * rand(0.70, 1.45)) / intensityFactor;

            state.timer = setTimeout(() => {
                // anchor variety
                const a =
                    locked ? (Math.random() < 0.45 ? 'cursor' : 'edge')
                        : (Math.random() < 0.18 ? 'cursor' : (Math.random() < 0.35 ? 'edge' : 'random'));

                spawn({ anchor: a });
                // slow creep (tiny)
                state.intensity = clamp(state.intensity + 0.01, 0.12, 1.15);
                scheduleNext();
            }, delay);
        }

        function start() {
            if (state.running) return;
            state.running = true;
            scheduleNext();
        }

        function stop() {
            state.running = false;
            clearTimeout(state.timer);
            state.timer = null;
        }

        function burst(count = 3, anchor = 'random') {
            if (!state.enabled) return;
            for (let i = 0; i < count; i++) {
                setTimeout(() => {
                    spawn({ anchor });
                }, i * rand(90, 170));
            }
        }

        function setEnabled(on) {
            state.enabled = !!on;
            layer.style.display = state.enabled ? 'block' : 'none';
            if (!state.enabled) stop();
        }

        function setContextGetter(fn) {
            if (typeof fn === 'function') state.ctx = fn;
        }

        return { start, stop, spawn, burst, setEnabled, setContextGetter };
    })();

    // DEV toggle: press M to toggle stigma layer
    window.addEventListener('keydown', (e) => {
        if (e.key.toLowerCase() === 'm') {
            const layer = document.querySelector('#stigma-layer');
            const currentlyHidden = layer && getComputedStyle(layer).display === 'none';
            stigma.setEnabled(currentlyHidden); // if hidden => enable, else disable
        }
    });

    /* ---------- dust ---------- */
    (function dust() {
        const box = $('#dust');
        const N = 72;
        for (let i = 0; i < N; i++) {
            const d = document.createElement('div');
            d.className = 'spark';
            d.style.left = 6 + Math.random() * 88 + '%';
            d.style.top = 6 + Math.random() * 86 + '%';
            const dx = (Math.random() * 0.4 - 0.2) * 100,
                dy = (Math.random() * 0.4 - 0.2) * 100,
                dur = 10 + Math.random() * 10;
            const key = `@keyframes sp${i}{0%{transform:translate(0,0)}50%{transform:translate(${dx}%,${dy}%)}100%{transform:translate(0,0)}}`;
            const st = document.createElement('style');
            st.textContent = key;
            document.head.appendChild(st);
            d.style.animation = `sp${i} ${dur}s linear infinite`;
            box.appendChild(d);
        }
    })();

    /* ---------- content ---------- */
    const SONGS = [
        { id: 'wanting', title: 'Wanting', src: cssVar('--src-wanting'), x: 62, y: 36, lyrics: `I just want to be seen, I just want to be wanted...`, },
        { id: 'naked', title: 'Naked', src: cssVar('--src-naked'), x: 70, y: 56, lyrics: `i used to pray to become you...`, },
        { id: 'sayyes', title: 'Say Yes', src: cssVar('--src-sayyes'), x: 46, y: 28, lyrics: `Love of mine... "I see the fire still burning inside"...`, },
        { id: 'answer', title: 'I Want the Answer', src: cssVar('--src-answer'), x: 52, y: 70, lyrics: `the light is returning — i'll listen to the sound of the waves...`, },
    ];

    const CAPTIONS = [
        'Eyes. Whose eyes are “real-er”?',
        'Tragedy begins when one gaze claims the whole truth while erasing another’s,',
        'When there was no singular or superior truth in the first place.',
        'We find her in a forgotten cellar—cold, quiet, ink oozing out of almost-empty bones.',
        'Her eyes are closed.',
        'External eyes hover, declaring her the moon and themselves the sun.',
        'By their axioms, there can be no truth in anything she perceives.',
        'This is a system not made to see anything magical in someone like her.',
        'Seen, she is distorted. Unmasked, she is punished.',
        'They tell her to close her eyes, chaining her limbs to their reality.',
        'When she bares her soul, eyes turn to thunder and knives.',
        'She screams, but the stone does not move.',
        'She forgets she could shine at all.',
        '“I’m made of salt, OSEANA. A kind of salt that doesn’t shine."',
        '“Every cell in me is a problem to them.”',
        '“I’m so sorry no one saw your magic or affirmed your truth,” I bleed with her.',
        'Sweet girl, I know you just wanted a mirror that did not distort.',
        'She is held now, and together we begin to remember her magic.',
        'Tears fall. Knees, then spine. She rises.',
        'She opens her eyes.',
        'Unhook. Gravity returns to her light.',
    ];

    /* ---------- single audio player (no overlaps) ---------- */
    const player = $('#player');
    const V = { targetTheme: 0.44, fadeMs: 360, current: null, locked: null, hoverToken: 0 };

    stigma.setContextGetter(() => ({ locked: !!V.locked, current: V.current || 'theme' }));

    function fadeTo(vol, ms = V.fadeMs) {
        const start = player.volume, delta = vol - start, t0 = performance.now();
        function step(t) {
            const k = Math.min(1, (t - t0) / ms);
            player.volume = Math.max(0, Math.min(1, start + delta * k));
            if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    async function playTrack(id) {
        if (V.current === id) return;

        const src =
            id === 'theme' ? cssVar('--src-theme') :
                id === 'eye-wanting' ? cssVar('--src-wanting') :
                    id === 'eye-naked' ? cssVar('--src-naked') :
                        id === 'eye-sayyes' ? cssVar('--src-sayyes') :
                            id === 'eye-answer' ? cssVar('--src-answer') : '';

        if (!src) return;

        try {
            fadeTo(0, 200);
            await new Promise(r => setTimeout(r, 210));
            player.src = src;
            player.loop = id === 'theme';
            await player.play();
            fadeTo(id === 'theme' ? V.targetTheme : 1, V.fadeMs);
            V.current = id;

            if (id !== 'theme') {
                stigma.spawn({ anchor: 'edge' });
                if (Math.random() < 0.5) stigma.spawn({ anchor: 'random' });
            }
        } catch (e) {
            console.warn('Playback error', e);
        }
    }

    /* ---------- build sigils ---------- */
    const ports = $('#ports');
    SONGS.forEach(s => {
        const b = document.createElement('button');
        b.className = 'sigil';
        b.type = 'button';
        b.dataset.id = s.id;
        b.style.left = s.x + '%';
        b.style.top = s.y + '%';
        b.innerHTML = `
      <div class="eye" aria-hidden="true">
        <div class="lid"></div><div class="iris"></div><div class="pupil"></div>
        <div class="blink"></div><div class="ticks"></div>
      </div>
      <span class="tag">${s.title}</span>`;

        // keep original handlers for keyboard / fallback
        let inT = null, outT = null;
        const tokenBase = () => ++V.hoverToken;

        b.addEventListener('pointerenter', () => {
            if (V.locked) return;
            const tk = tokenBase();
            clearTimeout(outT);
            inT = setTimeout(() => {
                if (tk === V.hoverToken) {
                    playTrack('eye-' + s.id);
                    showToast();
                }
            }, 110);
        });

        b.addEventListener('pointerleave', () => {
            if (V.locked) return;
            const tk = tokenBase();
            clearTimeout(inT);
            outT = setTimeout(() => {
                if (tk === V.hoverToken) playTrack('theme');
            }, 140);
        });

        setInterval(() => b.classList.toggle('blinking'), 2600 + Math.random() * 1800);

        b.addEventListener('click', () => {
            V.locked = 'eye-' + s.id;
            playTrack(V.locked);
            openDrawer(s);
        });

        b.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                V.locked = 'eye-' + s.id;
                playTrack(V.locked);
                openDrawer(s);
            }
        });

        ports.appendChild(b);
    });

    /* ---------- captions ---------- */
    const capText = $('#capText');
    let capIndex = 0, captionsOn = true, capTimer = null;

    function showCaption(text) {
        capText.style.opacity = 0;
        capText.style.transform = 'translateY(8px)';
        clearTimeout(capTimer);
        capTimer = setTimeout(() => {
            capText.textContent = text;
            requestAnimationFrame(() => {
                capText.style.opacity = 1;
                capText.style.transform = 'translateY(0)';
            });
        }, 120);
    }

    function advanceCaption() {
        if (!captionsOn) return;
        showCaption(CAPTIONS[capIndex++ % CAPTIONS.length]);

        if ($('#enter')?.style.display !== 'none') return; // don’t spam before entering
        if (Math.random() < 0.22) stigma.spawn({ anchor: 'edge' });
    }

    setInterval(advanceCaption, 4600);
    advanceCaption();

    $('#cc').addEventListener('click', () => {
        captionsOn = !captionsOn;
        $('#caption-rail').style.display = captionsOn ? 'flex' : 'none';
    });

    /* ---------- drawer ---------- */
    const drawer = $('#drawer'), dTitle = $('#dTitle'), dBody = $('#dBody');

    function openDrawer(s) {
        dTitle.textContent = s.title;
        dBody.innerHTML = s.lyrics ? `<pre>${s.lyrics}</pre>` : '';
        drawer.classList.add('on');

        stigma.spawn({ anchor: 'top' });
        stigma.spawn({ anchor: 'edge' });
    }

    function closeDrawer() {
        drawer.classList.remove('on');
        V.locked = null;
        playTrack('theme');

        if (Math.random() < 0.6) stigma.spawn({ anchor: 'cursor' });
    }

    $('#dClose').addEventListener('click', closeDrawer);

    /* ---------- intro & HUD (fallback) ---------- */
    const enter = $('#enter');

    $('#enterBtn').addEventListener('click', async () => {
        enter.style.display = 'none';
        player.volume = 0;
        stigma.start();
        stigma.spawn({ anchor: 'edge' });
        await playTrack('theme');
    }, { once: true });

    $('#mute').addEventListener('click', () => {
        player.muted = !player.muted;
        $('#mute').textContent = player.muted ? '🔈' : '🔊';
    });

    // recenter hook used by both real click + virtual click
    let recenterVirtual = null;
    $('#recenter').addEventListener('click', () => {
        if (typeof recenterVirtual === 'function') recenterVirtual();
        else $('#bg').style.transform = 'translate(0,0)';
    });

    /* =========================================================
       INVERTED CONTROLS (virtual cursor + hit-test routing)
       ========================================================= */
    const scene = $('#scene');
    const bg = $('#bg');

    const inputLayer = document.createElement('div');
    inputLayer.id = 'inputLayer';
    scene.appendChild(inputLayer);

    const vcursor = document.createElement('div');
    vcursor.id = 'vcursor';
    scene.appendChild(vcursor);

    const PARALLAX_X = 2.2;
    const PARALLAX_Y = 1.8;

    let sceneRect = scene.getBoundingClientRect();
    const updateRect = () => (sceneRect = scene.getBoundingClientRect());
    window.addEventListener('resize', updateRect);

    const clamp01 = v => Math.max(0, Math.min(1, v));

    const VC = {
        rx: 0.5, ry: 0.5,
        nx: 0.5, ny: 0.5,
        glitchX: 0, glitchY: 0,
        hoveredBtn: null,
        downBtn: null,
        lastMoveAt: performance.now(),
        entered: false,
    };

    function setVHover(btn, on) {
        if (!btn) return;
        btn.classList.toggle('vhover', !!on);
    }

    function hitTestButtonAt(clientX, clientY) {
        const els = document.elementsFromPoint(clientX, clientY);
        for (const el of els) {
            if (!el) continue;
            if (el === inputLayer || el === vcursor) continue;
            if (!scene.contains(el)) continue;
            const btn = el.closest('button');
            if (btn && scene.contains(btn)) return btn;
        }
        return null;
    }

    function renderFromVirtual() {
        const nx = clamp01(VC.nx + VC.glitchX);
        const ny = clamp01(VC.ny + VC.glitchY);

        const px = nx * sceneRect.width;
        const py = ny * sceneRect.height;

        vcursor.style.opacity = 1;
        vcursor.style.left = px + 'px';
        vcursor.style.top = py + 'px';

        bg.style.transform = `translate(${(nx - 0.5) * PARALLAX_X}%, ${(ny - 0.5) * PARALLAX_Y}%)`;

        const vClientX = sceneRect.left + px;
        const vClientY = sceneRect.top + py;

        const btn = hitTestButtonAt(vClientX, vClientY);
        updateVirtualHover(btn);
    }

    function updateVirtualFromEvent(e) {
        updateRect();
        const x = (e.clientX - sceneRect.left) / sceneRect.width;
        const y = (e.clientY - sceneRect.top) / sceneRect.height;

        VC.rx = clamp01(x);
        VC.ry = clamp01(y);

        VC.nx = 1 - VC.rx;
        VC.ny = 1 - VC.ry;

        VC.lastMoveAt = performance.now();
    }

    let hoverInT = null;
    let hoverOutT = null;

    function clearHoverTimers() {
        if (hoverInT) clearTimeout(hoverInT);
        if (hoverOutT) clearTimeout(hoverOutT);
        hoverInT = hoverOutT = null;
    }

    function sigilEnter(btn) {
        if (V.locked) return;
        const id = btn.dataset.id;
        if (!id) return;

        const tk = ++V.hoverToken;
        if (hoverOutT) clearTimeout(hoverOutT);

        if (VC.entered && Math.random() < 0.38) stigma.spawn({ anchor: 'cursor' });

        hoverInT = setTimeout(() => {
            if (tk === V.hoverToken && !V.locked) {
                playTrack('eye-' + id);
                showToast();
            }
        }, 110);
    }

    function sigilLeave(btn) {
        if (V.locked) return;
        const tk = ++V.hoverToken;

        if (hoverInT) clearTimeout(hoverInT);
        hoverOutT = setTimeout(() => {
            if (tk === V.hoverToken && !V.locked) playTrack('theme');
        }, 140);
    }

    function updateVirtualHover(newBtn) {
        if (newBtn === VC.hoveredBtn) return;

        if (VC.hoveredBtn) {
            setVHover(VC.hoveredBtn, false);
            if (VC.hoveredBtn.classList.contains('sigil')) sigilLeave(VC.hoveredBtn);
        }

        VC.hoveredBtn = newBtn;

        if (VC.hoveredBtn) {
            setVHover(VC.hoveredBtn, true);
            if (VC.hoveredBtn.classList.contains('sigil')) sigilEnter(VC.hoveredBtn);
        }
    }

    function activateButton(btn) {
        if (!btn) return;

        if (btn.classList.contains('sigil')) {
            const id = btn.dataset.id;
            const s = SONGS.find(x => x.id === id);
            if (!s) return;

            V.locked = 'eye-' + s.id;
            playTrack(V.locked);
            openDrawer(s);

            stigma.burst(3, 'cursor');
            stigma.burst(2, 'edge');
            return;
        }

        if (btn.id === 'dClose') {
            closeDrawer();
            return;
        }

        if (btn.id === 'mute') {
            player.muted = !player.muted;
            $('#mute').textContent = player.muted ? '🔈' : '🔊';
            return;
        }

        if (btn.id === 'cc') {
            captionsOn = !captionsOn;
            $('#caption-rail').style.display = captionsOn ? 'flex' : 'none';
            return;
        }

        if (btn.id === 'recenter') {
            if (typeof recenterVirtual === 'function') recenterVirtual();

            if (VC.entered && Math.random() < 0.75) {
                stigma.spawn({ text: "Stop trying to fix it.", anchor: 'cursor' });
                stigma.spawn({ anchor: 'edge' });
            }
            return;
        }

        if (btn.id === 'enterBtn') {
            if (VC.entered) return;
            VC.entered = true;

            $('#enter').style.display = 'none';
            player.volume = 0;

            stigma.start();
            stigma.spawn({ anchor: 'edge' });
            stigma.spawn({ anchor: 'top' });

            playTrack('theme');
            return;
        }
    }

    inputLayer.addEventListener('pointerenter', () => {
        vcursor.style.opacity = 1;
    }, { passive: true });

    inputLayer.addEventListener('pointerleave', () => {
        clearHoverTimers();
        if (VC.hoveredBtn) setVHover(VC.hoveredBtn, false);
        VC.hoveredBtn = null;
        vcursor.style.opacity = 0;
    }, { passive: true });

    inputLayer.addEventListener('pointermove', e => {
        updateVirtualFromEvent(e);
        renderFromVirtual();
    }, { passive: true });

    inputLayer.addEventListener('pointerdown', e => {
        try { inputLayer.setPointerCapture(e.pointerId); } catch (_) { }
        updateVirtualFromEvent(e);
        renderFromVirtual();

        const nx = clamp01(VC.nx + VC.glitchX);
        const ny = clamp01(VC.ny + VC.glitchY);
        const vClientX = sceneRect.left + nx * sceneRect.width;
        const vClientY = sceneRect.top + ny * sceneRect.height;

        VC.downBtn = hitTestButtonAt(vClientX, vClientY);
        e.preventDefault();
    }, { passive: false });

    inputLayer.addEventListener('pointerup', e => {
        updateVirtualFromEvent(e);
        renderFromVirtual();

        const nx = clamp01(VC.nx + VC.glitchX);
        const ny = clamp01(VC.ny + VC.glitchY);
        const vClientX = sceneRect.left + nx * sceneRect.width;
        const vClientY = sceneRect.top + ny * sceneRect.height;

        const upBtn = hitTestButtonAt(vClientX, vClientY);
        if (upBtn && upBtn === VC.downBtn) {
            activateButton(upBtn);
        }
        VC.downBtn = null;
        e.preventDefault();
    }, { passive: false });

    inputLayer.addEventListener('wheel', e => {
        updateRect();

        const x = (e.clientX - sceneRect.left) / sceneRect.width;
        const y = (e.clientY - sceneRect.top) / sceneRect.height;
        const nx = clamp01(1 - clamp01(x) + VC.glitchX);
        const ny = clamp01(1 - clamp01(y) + VC.glitchY);

        const vClientX = sceneRect.left + nx * sceneRect.width;
        const vClientY = sceneRect.top + ny * sceneRect.height;

        const els = document.elementsFromPoint(vClientX, vClientY);
        let scrollEl = null;

        for (const el of els) {
            if (!el || el === inputLayer) continue;
            if (!scene.contains(el)) continue;

            const style = getComputedStyle(el);
            const oy = style.overflowY;
            const ox = style.overflowX;

            const canY = (oy === 'auto' || oy === 'scroll') && el.scrollHeight > el.clientHeight + 1;
            const canX = (ox === 'auto' || ox === 'scroll') && el.scrollWidth > el.clientWidth + 1;

            if (canY || canX) { scrollEl = el; break; }
        }

        if (scrollEl) {
            let dy = e.deltaY;
            let dx = e.deltaX;

            if (e.deltaMode === 1) { dy *= 16; dx *= 16; }
            else if (e.deltaMode === 2) { dy *= scrollEl.clientHeight; dx *= scrollEl.clientWidth; }

            scrollEl.scrollTop += dy;
            scrollEl.scrollLeft += dx;
            e.preventDefault();
        }
    }, { passive: false });

    function twitchVirtualCursor() {
        const amp = 0.015 + Math.random() * 0.03;
        const shakes = 7 + Math.floor(Math.random() * 6);
        const stepMs = 35 + Math.random() * 25;
        let i = 0;

        bg.style.transition = 'transform 90ms linear';

        const id = setInterval(() => {
            VC.glitchX = (Math.random() * 2 - 1) * amp;
            VC.glitchY = (Math.random() * 2 - 1) * amp;
            renderFromVirtual();

            i++;
            if (i >= shakes) {
                clearInterval(id);

                const gx0 = VC.glitchX;
                const gy0 = VC.glitchY;
                const t0 = performance.now();
                const backMs = 260 + Math.random() * 220;

                const back = t => {
                    const k = Math.min(1, (t - t0) / backMs);
                    VC.glitchX = gx0 * (1 - k);
                    VC.glitchY = gy0 * (1 - k);
                    renderFromVirtual();

                    if (k < 1) requestAnimationFrame(back);
                    else {
                        VC.glitchX = 0;
                        VC.glitchY = 0;
                        bg.style.transition = '';
                    }
                };

                requestAnimationFrame(back);
            }
        }, stepMs);

        if (VC.entered && Math.random() < 0.35) {
            stigma.spawn({ anchor: 'cursor' });
        }
    }

    setInterval(() => {
        // const idleMs = performance.now() - VC.lastMoveAt;
        // if (idleMs < 1400) return;
        // if (V.locked) return;
        twitchVirtualCursor();
    }, 10_000);

    recenterVirtual = () => {
        VC.nx = 0.5;
        VC.ny = 0.5;
        VC.glitchX = 0;
        VC.glitchY = 0;
        renderFromVirtual();
    };

    renderFromVirtual();
})();
