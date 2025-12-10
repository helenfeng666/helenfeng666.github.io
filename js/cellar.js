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
        {
            id: 'wanting',
            title: 'Wanting',
            src: cssVar('--src-wanting'),
            x: 62,
            y: 36,
            lyrics: `I just want to be seen, I just want to be wanted...`,
        },
        {
            id: 'naked',
            title: 'Naked',
            src: cssVar('--src-naked'),
            x: 70,
            y: 56,
            lyrics: `i used to pray to become you...`,
        },
        {
            id: 'sayyes',
            title: 'Say Yes',
            src: cssVar('--src-sayyes'),
            x: 46,
            y: 28,
            lyrics: `Love of mine... "I see the fire still burning inside"...`,
        },
        {
            id: 'answer',
            title: 'I Want the Answer',
            src: cssVar('--src-answer'),
            x: 52,
            y: 70,
            lyrics: `the light is returning — i'll listen to the sound of the waves...`,
        },
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
        'She writes with me now:',
        '“You say you lost all hope in me.',
        'But I am full of hope, always dreaming,',
        'Spilling out of every label your system reduces me into.',
        'My truth is not a problem.',
        'It is just another language. And it is mine.".',
    ];

    /* ---------- single audio player (no overlaps) ---------- */
    const player = $('#player');
    const V = {
        targetTheme: 0.44,
        fadeMs: 360,
        current: null,
        locked: null,
        hoverToken: 0,
    };

    function fadeTo(vol, ms = V.fadeMs) {
        const start = player.volume,
            delta = vol - start,
            t0 = performance.now();
        function step(t) {
            const k = Math.min(1, (t - t0) / ms);
            player.volume = Math.max(
                0,
                Math.min(1, start + delta * k),
            );
            if (k < 1) requestAnimationFrame(step);
        }
        requestAnimationFrame(step);
    }

    async function playTrack(id) {
        if (V.current === id) return;
        const src =
            id === 'theme'
                ? cssVar('--src-theme')
                : id === 'eye-wanting'
                    ? cssVar('--src-wanting')
                    : id === 'eye-naked'
                        ? cssVar('--src-naked')
                        : id === 'eye-sayyes'
                            ? cssVar('--src-sayyes')
                            : id === 'eye-answer'
                                ? cssVar('--src-answer')
                                : '';

        if (!src) return;

        try {
            // fast fade out, swap, fade in
            fadeTo(0, 200);
            await new Promise(r => setTimeout(r, 210));
            player.src = src;
            player.loop = id === 'theme'; // loop only theme; songs play through
            await player.play();
            fadeTo(id === 'theme' ? V.targetTheme : 1, V.fadeMs);
            V.current = id;
        } catch (e) {
            // If a browser blocked it (shouldn't after user click), show a tiny hint
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

        // hover preview if not locked
        let inT = null,
            outT = null;
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

        // rhythmic soft blink
        setInterval(
            () => b.classList.toggle('blinking'),
            2600 + Math.random() * 1800,
        );

        // click locks song + opens drawer
        b.addEventListener('click', () => {
            V.locked = 'eye-' + s.id;
            playTrack(V.locked);
            openDrawer(s);
        });

        // keyboard
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
    let capIndex = 0,
        captionsOn = true,
        capTimer = null;
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
    }
    setInterval(advanceCaption, 4600);
    advanceCaption();
    $('#cc').addEventListener('click', () => {
        captionsOn = !captionsOn;
        $('#caption-rail').style.display = captionsOn ? 'flex' : 'none';
    });

    /* ---------- drawer ---------- */
    const drawer = $('#drawer'),
        dTitle = $('#dTitle'),
        dBody = $('#dBody');
    function openDrawer(s) {
        dTitle.textContent = s.title;
        dBody.innerHTML = s.lyrics ? `<pre>${s.lyrics}</pre>` : '';
        drawer.classList.add('on');
    }
    function closeDrawer() {
        drawer.classList.remove('on');
        V.locked = null;
        playTrack('theme');
    }
    $('#dClose').addEventListener('click', closeDrawer);

    /* ---------- intro & HUD ---------- */
    const enter = $('#enter');
    $('#enterBtn').addEventListener(
        'click',
        async () => {
            // User gesture -> safe to autoplay
            enter.style.display = 'none';
            player.volume = 0;
            await playTrack('theme'); // start bed immediately
        },
        { once: true },
    );

    $('#mute').addEventListener('click', () => {
        player.muted = !player.muted;
        $('#mute').textContent = player.muted ? '🔈' : '🔊';
    });

    $('#recenter').addEventListener('click', () => {
        $('#bg').style.transform = 'translate(0,0)';
    });

    /* ---------- parallax ---------- */
    const scene = $('#scene');
    scene.addEventListener(
        'pointermove',
        e => {
            const r = scene.getBoundingClientRect();
            const x = (e.clientX - r.left) / r.width,
                y = (e.clientY - r.top) / r.height;
            $('#bg').style.transform = `translate(${(x - 0.5) * 2.2}%, ${(y - 0.5) * 1.8}%)`;
        },
        { passive: true },
    );
})();
