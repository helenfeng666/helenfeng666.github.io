(() => {
    const $ = s => document.querySelector(s);
    const cssVar = k => getComputedStyle(document.documentElement).getPropertyValue(k).trim().replace(/^'|"|'+$/g, '');
    const showToast = () => { const t = $('#toast'); t.style.display = 'block'; clearTimeout(window.__toastT); window.__toastT = setTimeout(() => { t.style.display = 'none'; }, 700); };

    /* Gold dust */
    (function dust() {
        const box = $('#dust'); const N = 72;
        for (let i = 0; i < N; i++) {
            const d = document.createElement('div'); d.className = 'spark';
            d.style.left = (6 + Math.random() * 88) + '%'; d.style.top = (8 + Math.random() * 84) + '%';
            const dx = (Math.random() * .45 - .225) * 100, dy = (Math.random() * .45 - .225) * 100, dur = 11 + Math.random() * 10;
            const key = `@keyframes sp${i}{0%{transform:translate(0,0)}50%{transform:translate(${dx}%,${dy}%)}100%{transform:translate(0,0)}}`;
            const st = document.createElement('style'); st.textContent = key; document.head.appendChild(st);
            d.style.animation = `sp${i} ${dur}s linear infinite`; box.appendChild(d);
        }
    })();

    /* Songs & prose */
    const SONGS = [
        {
            id: 'room', x: 78, y: 44, title: 'Room', src: cssVar('--src-room'),
            prose: [
                'This is the room where nothing felt real. A liminal dread with no name.',
                'He erased the door on his way out. She was meant to rot with his secrets.',
                'Tonight, she draws an exit that was never given.'
            ],
            lyrics: `This is the room where you took my soul,\nThis is the room where nothing feels real.\n...You r**** the soul out of me, and walked out the door like a god.\nBut it wasn’t enough to shut the door—you made me sure there’s no way I’d escape!`
        },
        {
            id: 'hunger', x: 52, y: 62, title: 'Hunger Game', src: cssVar('--src-hunger'),
            prose: [
                'How do I tell her her wings were never broken?',
                'One day the haunting won’t have to be home, sweet girl.'
            ],
            lyrics: `dreamt that I were a butterfly—broken wings...\nI wake up to a hunger game of hide and seek and no escape...\nBut you aren’t real—some broken fantasy...`
        },
        {
            id: 'light', x: 74, y: 28, title: 'Light', src: cssVar('--src-light'),
            prose: [
                '“Say yes, come home.”',
                'Is there a light at the end of the corridor?',
                'She can finally look at the ending and not disappear.'
            ],
            lyrics: `i can see the ending in the shape of you...\nIs there a light at the end of the corridor? light at the end, at the end—`
        },
        {
            id: 'glisten', x: 40, y: 70, title: 'Glisten', src: cssVar('--src-glisten'),
            prose: [
                'A corridor of movement: every version of them walking to the same doom.',
                'She runs after fading shadows. It’s ruthless—and final.'
            ],
            lyrics: `So I’m listening to the falling of our everything out the window...\nevery corridor in this dream it’s always your face... you and I glistening—`
        },
        {
            id: 'ophelia', x: 23, y: 46, title: 'Ophelia', src: cssVar('--src-ophelia'),
            prose: [
                'Pain is a lake. She screams underwater.',
                '“You’re the only one who sees me.” The river answers: “I know. Say yes. Come home.”'
            ],
            lyrics: `She rearranged my soul till it disappeared...\nOphelia, she came to you—she found peace in your arms; can I do the same?`
        },
        {
            id: 'circles', x: 60, y: 82, title: 'Circles', src: cssVar('--src-circles'),
            prose: [
                'Re-integration after breaking: a dance with every version of herself.',
                'A survivor’s sunrise.'
            ],
            lyrics: `it’s coming back, i’m coming back...\nso dance with me in circles on the sand, till sunrise—`
        },
        { id: 'tbd1', x: 16, y: 72, title: '(coming soon)', src: '', disabled: true, prose: [''], lyrics: '' },
        { id: 'tbd2', x: 88, y: 62, title: '(coming soon)', src: '', disabled: true, prose: [''], lyrics: '' }
    ];

    /* Story lines for captions */
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

    /* Audio (solo, no overlaps) */
    class SoloAudio {
        constructor(themeSrc, songs) {
            this.tracks = new Map(); this.current = 'theme'; this.req = 0;
            this.fadeOut = 360; this.fadeIn = 440;
            this.add('theme', themeSrc, .55, true);
            songs.forEach(s => s.src && this.add('orb-' + s.id, s.src, 0, true));
        }
        add(id, src, vol, loop) {
            const el = document.createElement('audio');
            el.id = 'a-' + id; el.src = src; el.preload = 'auto'; el.loop = loop; el.playsInline = true; el.volume = vol;
            document.body.appendChild(el); this.tracks.set(id, el);
        }
        _fade(el, to, ms) {
            const from = el.volume, d = to - from, t0 = performance.now();
            return new Promise(res => {
                const step = t => { const k = Math.min(1, (t - t0) / ms); el.volume = from + d * k; if (k < 1) requestAnimationFrame(step); else res(); };
                requestAnimationFrame(step);
            });
        }
        async start() { try { await this.tracks.get('theme').play(); } catch { } }
        async playOnly(id) {
            if (this.current === id) return;
            const token = ++this.req;
            const cur = this.tracks.get(this.current);
            if (cur) { try { await this._fade(cur, 0, this.fadeOut); if (token !== this.req) return; cur.pause(); } catch { } }
            this.tracks.forEach((a, k) => { if (k !== id) { try { a.pause(); a.volume = 0; } catch { } } });
            const next = this.tracks.get(id); if (!next) { this.current = id; return; }
            try {
                next.volume = 0; if (next.paused) await next.play(); if (token !== this.req) return;
                await this._fade(next, (id === 'theme' ? .55 : 1), this.fadeIn);
            } catch { }
            this.current = id;
        }
        toggleMute() { const all = [...this.tracks.values()], m = !all[0].muted; all.forEach(x => x.muted = m); $('#mute').textContent = m ? '🔈' : '🔊'; }
    }
    const engine = new SoloAudio(cssVar('--src-theme'), SONGS);

    /* Orbs */
    const portsEl = $('#ports');
    SONGS.forEach(s => {
        const b = document.createElement('button');
        b.className = 'orb' + (s.disabled ? ' disabled' : ''); b.type = 'button'; b.dataset.id = s.id;
        b.style.left = s.x + '%'; b.style.top = s.y + '%'; b.title = s.title;
        if (!s.disabled) {
            b.addEventListener('pointerenter', () => { engine.playOnly('orb-' + s.id); showToast(); });
            b.addEventListener('pointerleave', () => engine.playOnly('theme'));
            b.addEventListener('click', () => openPanel(s));
        } else {
            b.setAttribute('aria-disabled', 'true');
        }
        portsEl.appendChild(b);
    });

    /* Panel */
    const overlay = $('#overlay'), panel = $('#panel'), pTitle = $('#pTitle'), pBody = $('#pBody'), pClose = $('#pClose');
    let lastFocus = null;
    function renderPanel(s) {
        const prose = s.prose.filter(Boolean).map(p => `<p>${p}</p>`).join('');
        const lyrics = s.lyrics ? `<details open><summary>Lyrics</summary><pre>${s.lyrics}</pre></details>` : '';
        pBody.innerHTML = prose + lyrics + JOURNAL_BLOCK;
    }
    async function openPanel(s) {
        await engine.playOnly('orb-' + s.id);
        pTitle.textContent = s.title;
        renderPanel(s);
        lastFocus = document.activeElement;
        overlay.style.display = 'block';
        panel.setAttribute('aria-hidden', 'false'); overlay.setAttribute('aria-hidden', 'false');
        panel.classList.add('on'); document.body.style.overflow = 'hidden';
        pClose.focus();
    }
    async function closePanel() {
        panel.classList.remove('on');
        setTimeout(() => { overlay.style.display = 'none'; panel.setAttribute('aria-hidden', 'true'); overlay.setAttribute('aria-hidden', 'true'); }, 260);
        document.body.style.overflow = '';
        await engine.playOnly('theme');
        if (lastFocus && lastFocus.focus) lastFocus.focus();
    }
    pClose.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && panel.classList.contains('on')) closePanel(); });

    /* Captions (only one thing at bottom now = no overlap) */
    const capText = $('#capText'); let capIndex = 0; let captionInterval = null;
    function showCaption(text) {
        capText.style.opacity = 0; capText.style.transform = 'translateY(6px)';
        clearTimeout(window.__capT);
        window.__capT = setTimeout(() => {
            capText.textContent = text;
            requestAnimationFrame(() => {
                capText.style.opacity = 1;
                capText.style.transform = 'translateY(0)';
            });
        }, 120);
    }
    function advanceCaption() { showCaption(STORY_LINES[capIndex++ % STORY_LINES.length]); }
    function startCaptions() { capIndex = 0; advanceCaption(); captionInterval = setInterval(advanceCaption, 5200); }

    /* Trace door interaction */
    const sceneEl = $('#scene'); let traced = false;
    function startTrace() {
        if (traced) return; traced = true;
        sceneEl.classList.add('tracing');
        engine.playOnly('orb-room');
        setTimeout(async () => {
            sceneEl.classList.remove('tracing'); sceneEl.classList.add('door-open');
            await engine.playOnly('orb-light');
        }, 3800);
    }
    sceneEl.addEventListener('pointerdown', e => { const w = sceneEl.clientWidth; if (e.clientX > w * 0.66) startTrace(); });
    sceneEl.addEventListener('pointermove', e => { const w = sceneEl.clientWidth; if (e.clientX > w * 0.8) startTrace(); }, { passive: true });

    /* Intro & HUD */
    const enter = $('#enter');
    $('#enterBtn').addEventListener('click', async () => { enter.style.display = 'none'; await engine.start(); startCaptions(); }, { once: true });
    $('#mute').addEventListener('click', () => engine.toggleMute());
    $('#recenter').addEventListener('click', () => { $('#bg').style.transform = 'translate(0,0)'; });

    /* Parallax */
    sceneEl.addEventListener('pointermove', e => {
        const r = sceneEl.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
        $('#bg').style.transform = `translate(${(x - .5) * 3}%, ${(y - .5) * 2}%)`;
    }, { passive: true });

    /* Journal block */
    const JOURNAL_BLOCK = `
    <details>
      <summary><b>THE STORY — from OSEANA’s journal</b></summary>
      <blockquote>“A door erased. Tonight, we draw one.”</blockquote>
      <p>Eyes aflame; twitching veins. Tears soak the pillow; she claws at her face till it bleeds like the battlefield in her soul.</p>
      <p>Her eyes are glued to the ceiling. It tells her to jump down a cliff. The bed is the closest to home she could find. But that’s also where the nightmares live. No, she isn’t safe. No, she is not a free woman.</p>
      <p>He needed a scapegoat to hold his misery. She was left here to rot, buried alive with all his secrets. On his way out, he erased the door.</p>
      <p>He’s charming. Everyone knows him as a saint. To her, he snarled: <i>You are a monster. This is all your fault.</i> It worked—until the night the wall began to listen.</p>
      <p>I find her at the river where Ophelia once drowned. “You’re the only one who sees me,” she whispers. The water hums: <i>I know. Say yes. Come home.</i></p>
      <p>For a moment, drowning feels like the answer. She takes one step, then another. <b>No—not this time.</b> I cradle her. We return to the room. She reaches for the nothing and draws a curve of light. The outline warms. The air shifts.</p>
      <p>“Too much light,” she shakes. “I haven’t seen daylight in years.” We breathe; the golden line completes—and the room learns her name.</p>
      <p>We step through. A beach at dusk. She trembles, then moves—first a fingertip, then a shoulder. The tide keeps time. She dances with her shadow. A survivor’s beginning.</p>
    </details>`;
})();
