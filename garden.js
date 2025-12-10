(() => {
    /* ===== Utilities ===== */
    const $ = s => document.querySelector(s);
    const cssVar = k => getComputedStyle(document.documentElement).getPropertyValue(k).trim().replace(/^'|"|'+$/g, '');
    const clamp = (n, min, max) => Math.max(min, Math.min(max, n));

    /* ===== Story data (unchanged) ===== */
    const SONGS = [
        {
            id: 'dreamer', x: 28, y: 72, title: 'Universe (Dreamer with the Harp)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_d9d1840a234d4e0994e2d6907638949b.m4a',
            prose: [
                'This is the world where they got to live the movie; the liminal space where the spell still hums.',
                'This is what it feels like to almost have had forever.',
                'She keeps replaying this dream, to complete a story that could never rise.'
            ],
            aside: `💫
This dream gifted us a crack in the multiverse, so we could travel to the inner flesh of the sandcastle we could have built together.
We flew around, into the corridors, down the spiral staircase infested by the oldest of memories.
I held your hand.
The tension in the air drove us to the bed I slept in as a child, where we made love for the very first (and the very last) time.
It was transient. It was eternal. It was ours.`,
            lyrics: `In another universe, we tried. In another universe, you’re mine:
You say that you love me, as I run to your door, and nothing else matters at all.
You say that you thirst for me, I’ve never exited your mind, “will you still be mine”?
Well, I guess you never were mine, three months I’m off your mind, and you’re newly entwined.
I guess you will never be mine, to me you’re still the one, and it eats me alive,
oh and it eats me alive!
So in this universe, I try. And in this universe, I cry.
You say that you love me, as I run to your door, and nothing else matters at all.
You say that you thirst for me, I’ve never exited your mind, “will you still be mine”?
Oh I die to cut off my hair, so I can cease to replay your everything.
But I carve your name in the sand, like a spell that’s undone, and it feels so divine,
oh and it eats me alive!
And it eats me alive.
And it eats me alive.`
        },
        {
            id: 'exile', x: 18, y: 54, title: 'Still my world',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_366058c90c21459ebbb4d59245dd3c9f.m4a',
            prose: [
                'The antidote to exile is connection.',
                'We hear “too much”… and exile it ourselves.',
                'You’re still my world. Never gone.'
            ],
            aside: '',
            lyrics: `I don’t think of you anymore and it breaks my heart
So long ago, you—so long ago, you melted my soul, ahh
Melted my, melted my soul
Now I’m alone
Wondering where you are, wondering how you’ve been
I wish I could tell you now
That you’re still my world, still my world
You’re still my world, never gone.`
        },
        {
            id: 'bleed', x: 46, y: 78, title: 'Bleed for you',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_877eeb406bf6452a9ee8e8bd387155b9.m4a',
            prose: [
                '“You’re not mine anymore, aren’t you, love? It’s your eyes, I can’t read them anymore.”',
                'She doesn’t forget, not so easily. A slow tectonic ache of being left behind.',
                'Oh I still bleed for you — do you still bleed for me?'
            ],
            aside: '💔 She begs for a sign she can believe.',
            lyrics: `Now I still think of you, do you still think of me?
Oh I still bleed for you, do you still bleed for me?
Oh I still bleed for you, do you still bleed for me?
Oh I still burn for you, do you still burn for me? I still burn for you!
I try to rearrange, rearrange, rearrange everything
to forget everything, everything, everything that’s left of this mess!
every memory, memory, memory I have of you
but I still wonder, I still wonder––
[drop/outro]
<ascension into choreography>`
        },
        {
            id: 'mythic', x: 75, y: 55, title: 'Love this way (For a Moment, Mythic)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_3233bd8bdc4640a0a48ca3799b3d6354.m4a',
            prose: [
                'This is the ghost-soundtrack to their movie that could never rise.'
            ],
            aside: `🦪
“Look, here’s the oyster, and my grief is the pearl. Here it is, in fetal position, enveloping something closely, eternally. And my womb cradles this space between you and me.
I don’t know why, but my flesh made room for you, long ago, wide open. I try to keep everything intact, but there’s blood in the cracks.
I still love you. I’ve had to dig up my insides, and still I can’t forget you. I feel ashamed of my heart. What a curse it is to feel so much.”`,
            lyrics: `[Verse]
Last summer, we burned our love
And so began a grief with no name…
All winter, I held the flame
And when I sleep at night, it is your shape I crave.
[Pre-chorus]
I trace snowangels, of the boy you used to be; chasing afterglows, my silly heart had done it again.
[Chorus]
Why, why do I love this way? I wanna write you out my heart, I wanna exorcise you from my fucking soul!
I wanna be free of you, but can’t bring myself to let go!
Why, why do I love this way? I dance with your ghost, saying “I do”…
[Bridge]
I still love you… (I love like the sun’s shining on your face!)
[Outro]
But I will stay. I’ll draw you from my blood and give this love a home. Someday.`
        },
        {
            id: 'light', x: 34, y: 40, title: 'Ophelia II (There is Only Light)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_734f9d92a78c4a10a8bba8d1a94d719f.wav',
            prose: [
                'Lovesick and weary, she crawls out of the abyss, barely breathing.',
                'A whisper: What if my heart was never an abyss? What if I was never too much?',
                'She dances for herself—open-hearted, arching midair, receiving thunder.'
            ],
            aside: `❤️‍🔥 “What if I was never broken?” • 🔮 “I never want to forget to remember.”`,
            lyrics: `Ophelia, I bleed through my eyes
My thighs part for his soul, to break me open—again, again, again.
“Please, don’t take him away from me—just one more night.”
Oh, is it you I search for, or is it me I’m crying for?
“There’s only light, where you are; where home is.” Say yes, say yes, say yes—`
        },
        {
            id: 'whisper', x: 20, y: 85, title: 'Snowangels (Begging the Trees)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_3e722edb0d1e41abb9748acb2f3b63d5.m4a',
            prose: [
                '“I loved the soul out of myself.”',
                'She begs the trees to carry a whisper: “Hey, I love you.”',
                'Neither could reach the other in the moment.'
            ],
            aside: '🍂 A path of grief with no visible end.',
            lyrics: `So what is this? I’m still overcome by visions of you,
Struck by lightning, breathless in the day.
Your voice echoes through the corridors; I still search for you in the crowd.
Don’t slip away… Dream of me tonight.`
        },
        {
            id: 'key', x: 82, y: 48, title: 'Falling (The Key in Her Own Palm)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_c5e73fcb3dbb44df9e60a06cc70ea376.m4a',
            prose: [
                'Can you hear it, love? This is the language of her longing—trippy, honest, and blue, coloring every particle in this air. It has no traceable beginning, and knows no ending.',
                'It’s a yearning that ruptures you from the inside.',
                '“I knew, from the very beginning, that you would color my heart for a very, very long time.”'
            ],
            aside: '',
            lyrics: `Truth be told: I’ve been waiting for you all my life. For a flicker of forever,you made me believe.
Can you feel me? Our eyes gazing into the deep, deep sorrow of this garden in the night.
You and I, you and I, you and I. Ahh, you and I—
You have me drowning in a dream of endless what-could-be’s.
But you don’t see: I love you. I’m falling.
There’s something you should know:
I think about you, all the time.
From our garden, from the very beginning, it’s always been you.
I’ve been waiting for you and me, for us.
I’ve been waiting—waiting—for you to come home, to me.`
        },
        {
            id: 'mansion', x: 60, y: 62, title: 'First (The Mansion of Ghosts)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_0854fc2c468942718d24a6c520bd48be.mp3',
            prose: [
                'She steps into the mansion she had reserved for his return.',
                'Dust lifts like birds; river-light pours in.',
                '“See? That’s where we’d dine and dance. It was ours.”'
            ],
            aside: 'The ocean reminds her: what was real remains real, even as it changes shape. It was always there, that first sandcastle they built.',
            lyrics: `I find myself back in the ocean, you promised I’d see you there, just the way we remember us, all these years ago.
      That first kiss we had, that first sandcastle we built–– The wind took it away, so cruel, and we broke into pieces. It could never be found, so we drifted away, too.
      A silly little part of me, still holds a little bit of hope. That you’re waiting, and I’m still here, we can be something we’ve never had the chance to be.
      So run your soul all over my heart, and sing to me all your melodies. Oh did you know that I’ve always loved you, oh you taught me how to feel alive, how to feel alive.
      And now I realize you aren’t here, it’s likely you’d never be mine again, so what happens to this love we made? That sandcastle we built?
      Alive, always, always alive. Alive, always, always alive.`
        },
        {
            id: 'altar', x: 70, y: 74, title: 'Altar (Body as Altar)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_60d47cec87f3413b8a7a493adfe4ab07.mp3',
            prose: [
                'She turns her body into an altar to complete what fate never could—',
                'arching mid-air, receiving thunder from her own heart.',
                'It hurts, and it’s electric.'
            ],
            aside: '',
            lyrics: `Once upon a time, in another life,
My body ached for you; my soul had arched for you!
I built this altar, where our love once stood.
Do you recall my name? I remember you. I remember everything.`
        },
        {
            id: 'grief', x: 51, y: 86, title: 'Somehow (Oceans of Grief)',
            audio: 'https://static.wixstatic.com/mp3/bdbe03_6d914aa10af14bb090007890c9e62fcc.m4a',
            prose: [
                'This is a haunting that lives halfway between dreaming and waking.',
                'It lives in her tears, dense in the air, thunder between every breath she takes.',
                'Somehow, I still love you the same.'
            ],
            aside: `Her soul, mapped deeply into this attachment, refuses to disconnect.`,
            lyrics: `Somehow, I still love you the same. I swore I never wanted to lose you—but here we are.
Somehow, I still miss you the same. It frightens me how much my body remembers you.
Somehow, I still want you the same. I scream your name, forever waiting—will you be mine again?
The fullness of loving you; the emptiness of missing you.
It fills me with water. It kills me—there’s nothing left of you.`
        }
    ];

    /* ===== Audio engine: proximity-based songs ONLY ===== */
    class SoloAudio {
        constructor(songs) {
            this.songsData = songs;
            this.tracks = new Map();      // id -> HTMLAudioElement
            this.songTargets = new Map(); // id -> 0..1 target volume
            this.started = false;
            this.muted = false;
            this.lockedSong = null;       // when reading a panel
            this.masterVolume = 1.0;
            this._init();
        }

        _init() {
            this.songsData.forEach(s => {
                const id = 'orb-' + s.id;
                const a = document.createElement('audio');
                a.src = s.audio;
                a.loop = true;
                a.preload = 'auto';
                a.volume = 0;
                a.playsInline = true;
                document.body.appendChild(a);
                this.tracks.set(id, a);
                this.songTargets.set(id, 0);
            });
        }

        // Called once from the "Enter as OSEANA" click (user gesture)
        async start() {
            if (this.started) return;
            this.started = true;

            // Prime all tracks so browsers let us control them freely
            const primes = [];
            this.tracks.forEach(audio => {
                audio.volume = 0;
                primes.push(
                    audio.play()
                        .then(() => {
                            audio.pause();
                            audio.currentTime = 0;
                        })
                        .catch(() => { })
                );
            });
            try { await Promise.all(primes); } catch (e) { }
        }

        tick() {
            if (!this.started) return;
            const smooth = 0.18; // snappier than before
            const mv = this.masterVolume;
            const muteFactor = this.muted ? 0 : 1;

            this.tracks.forEach((audio, id) => {
                const target = (this.songTargets.get(id) || 0) * mv * muteFactor;
                audio.volume += (target - audio.volume) * smooth;

                // Start when we become audible
                if (audio.volume > 0.01 && audio.paused) {
                    audio.play().catch(() => { });
                }
                // Stop completely when inaudible and not needed
                if (audio.volume < 0.005 && !audio.paused && target <= 0) {
                    audio.pause();
                }
            });
        }

        updateProximity(cameraPos, flowerNodes) {
            if (!this.started) return;

            if (!flowerNodes || !flowerNodes.length) {
                this.tracks.forEach((_, id) => this.songTargets.set(id, 0));
                return;
            }

            // If we're "locked" to a song (panel open), keep that one loud
            if (this.lockedSong) {
                this.tracks.forEach((_, id) => {
                    this.songTargets.set(id, id === this.lockedSong ? 1 : 0);
                });
                return;
            }

            // Find nearest flower
            let nearest = null;
            let nearestDistSq = Infinity;
            for (const node of flowerNodes) {
                const p = node.position;
                const dx = cameraPos.x - p.x;
                const dy = cameraPos.y - p.y;
                const dz = cameraPos.z - p.z;
                const d2 = dx * dx + dy * dy + dz * dz;
                if (d2 < nearestDistSq) {
                    nearestDistSq = d2;
                    nearest = node;
                }
            }

            // Default: all songs off
            this.tracks.forEach((_, id) => this.songTargets.set(id, 0));
            if (!nearest) return;

            const dist = Math.sqrt(nearestDistSq);

            // >>> MORE DRAMATIC falloff <<<
            // - <= inner  => full volume
            // - >= maxHear => silent
            // - between => eased curve (close ramps up fast)
            const inner = 3.0;
            const maxHear = 11.0;

            if (dist >= maxHear) {
                return; // everything stays silent
            }

            let strength = 1;
            if (dist > inner) {
                const linear = (maxHear - dist) / (maxHear - inner); // 0..1
                strength = Math.pow(linear, 2.0); // ease-in: more dramatic
            }

            const id = 'orb-' + nearest.song.id;
            this.songTargets.set(id, strength);
        }

        async lockTo(id) {
            this.lockedSong = id;
            const track = this.tracks.get(id);
            if (track && track.paused) {
                try { await track.play(); } catch (e) { }
            }
        }

        async unlockToTheme() {
            // No theme anymore; just return to proximity logic
            this.lockedSong = null;
        }

        toggleMute() {
            this.muted = !this.muted;
            $('#mute').textContent = this.muted ? '🔈' : '🔊';
        }

        // Backwards-compatible with older usage
        async playOnly(id) {
            await this.lockTo(id);
        }
    }

    // No more theme/background bed – only flower songs
    const engine = new SoloAudio(SONGS);

    /* ===== Build base DOM scene ===== */
    const scene = $('#scene'), ports = $('#ports');
    const layers = { bg: $('#bg'), mid: $('#mid'), fg: $('#fg') };
    const archURL = cssVar('--arch'); if (archURL && archURL.startsWith('http')) $('#oseana').src = archURL;

    // Fireflies (2D ambient layer)
    (function flies() {
        const box = $('#fireflies');
        for (let i = 0; i < 36; i++) {
            const f = document.createElement('div'); f.className = 'fly';
            f.style.left = Math.random() * 100 + '%'; f.style.top = Math.random() * 100 + '%';
            const dx = (Math.random() * .6 - .3) * 100, dy = (Math.random() * .6 - .3) * 100, dur = 8 + Math.random() * 10;
            const key = `@keyframes mv${i}{0%{transform:translate(0,0)}50%{transform:translate(${dx}%,${dy}%)}100%{transform:translate(0,0)}}`;
            const st = document.createElement('style'); st.textContent = key; document.head.appendChild(st);
            f.style.animation = `mv${i} ${dur}s linear infinite`;
            box.appendChild(f);
        }
    })();

    /* ===== Panel ===== */
    const overlay = $('#overlay'),
        panel = $('#panel'),
        pTitle = $('#pTitle'),
        pBody = $('#pBody');

    let active = null;
    let lastFocus = null;
    let panelOpen = false;

    function renderSong(s) {
        const proseHTML = s.prose.map(p => `<p>${p}</p>`).join('');
        const asideHTML = s.aside ? `<blockquote>${s.aside.replace(/\n/g, '<br>')}</blockquote>` : '';
        const lyricsHTML = `<details open><summary>Lyrics</summary><pre>${s.lyrics}</pre></details>`;

        pBody.innerHTML = proseHTML + asideHTML + lyricsHTML;

        // Keep scrolling local to the panel instead of scrolling the whole page
        pBody.scrollTop = 0;   // start at top of the text each time
    }

    async function openPanel(s) {
        panelOpen = true;
        active = s;

        // (kept from before: just in case pointer lock is ever used again)
        if (document.exitPointerLock && document.pointerLockElement === scene) {
            try { document.exitPointerLock(); } catch (e) { }
        }

        await engine.lockTo('orb-' + s.id);
        pTitle.textContent = s.title;
        renderSong(s);

        lastFocus = document.activeElement;
        overlay.style.display = 'block';
        panel.setAttribute('aria-hidden', 'false');
        overlay.setAttribute('aria-hidden', 'false');
        panel.classList.add('on');
        document.body.style.overflow = 'hidden';
        $('#scene').classList.add('orb-focus');
        poseArch();
    }

    async function closePanel() {
        panelOpen = false;
        active = null;

        panel.classList.remove('on');
        setTimeout(() => {
            overlay.style.display = 'none';
            panel.setAttribute('aria-hidden', 'true');
            overlay.setAttribute('aria-hidden', 'true');
        }, 280);

        document.body.style.overflow = '';
        await engine.unlockToTheme();
        $('#scene').classList.remove('orb-focus');

        if (lastFocus && typeof lastFocus.focus === 'function') {
            lastFocus.focus();
        }
    }

    // Optional but nice: Esc can still close the panel
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && panel.classList.contains('on')) {
            closePanel();
        }
    });

    /* ===== Intro ===== */
    const enter = $('#enter');
    const start = () => {
        enter.style.display = 'none';
        engine.start();
        setTimeout(poseArch, 650);
        startCaptions();
    };
    $('#enterBtn').addEventListener('click', start, { once: true });

    /* ===== Arching midair (2D, mostly cosmetic now) ===== */
    function poseArch() {
        const el = $('#character');
        el.classList.add('arching');
        clearTimeout(window.__archT);
        window.__archT = setTimeout(() => el.classList.remove('arching'), 1200);
    }

    /* ===================== CAPTIONS (Garden story) ===================== */
    const capText = $('#capText'); let capIndex = 0; let captionInterval = null;

    const STORY_LINES = [
        'We find her in an enchanted garden lit in the most radiant way,',
        'like you’d find in a story book.',
        'You may have been to such a place before, in your memory, in dreams.',
        'She grew up dreaming that a “prince” would come and save her one day.',
        'They’d be equals, mirrors, kindred souls. He’d see her without turning away.',
        'When he entered her garden, she knew.',
        'He said, “I’d date you in a heartbeat.” She said, “I’ve known you all my life.”',
        'But fate refused them. She couldn’t be with him, but he was all she wanted.',
        'She is a dreamer with a harp, wading in soft grass.',
        'Her space is warm and bittersweet: faint lights, an air dense with feeling,',
        'a small river leading to a beautiful mansion.',
        'The mansion is where the movie lives on—ghosts of lost love haunting every corner, inhabiting every room.',
        '“See? That’s where we’d dine and dance. It was ours.”',
        'Her voice is proud, sincere, heartbreakingly sweet.',
        'She’s remembered this alone for a very long time.',
        'Yet she doesn’t allow herself to wander into the mansion,',
        'still waiting for him to come home.',
        '“Oh I still bleed for you, do you still bleed for me?” she cries into the night.',
        'To survive, she tells herself: “He never cared.”',
        'Now her heart unravels as I show her a vision of his echo:',
        'she realizes that he did care after all.',
        'Across timelines, they both remembered.',
        'He’d return to the outskirts to grieve her, lingering wistfully,',
        'replaying her face and spending the night as close to her garden as he could reach.',
        'She summons the wind to blanket him with love,',
        'begging the trees to send him a whisper: “Hey, I love you.”',
        'But neither could sense or reach one another in the moment.',
        'When she sees him walking into the garden for the very last time,',
        'before his soft “goodbye”, she screams, “I love you, I love you, don’t go!”',
        '“How could you forget? How do you forget?”',
        'She withers into her puddle of tears.',
        'She doesn’t forget, not like that.',
        '“Where do I put this love, now that you’re gone?',
        'If I let go, there’d be nothing left.”',
        'My heart breaks for her.',
        'She once told him, “I can see everything with you.” He said, “me too.”',
        'The film score swells in her chest, but the movie never came to be.',
        'So she turns her body into an altar, to complete what fate never could—',
        'Arching mid-air, receiving thunder from her own heart:',
        'striking into her chest, between her legs.',
        'Surrendering to a breath that almost collapses her soul.',
        'It hurts, and it’s electric.',
        '“Why do I love like this?”',
        'She grows ashamed of her own heart, and she feels so alone, so alone.',
        'She can’t see it yet, but her heart is her power. He’s the mirror, not the flame.',
        'When I hold her for the first time, she is not quiet for once,',
        'weeping oceans of grief that she has carried alone.',
        'She’s had to dig up her insides to begin metabolizing these shards and fossils of once-living light.',
        'They feel bigger than her soul can carry.',
        'She felt real when he saw her, only when he saw her.',
        'But she begins to realize: what if, beyond the love they shared,',
        'he was also a soul mirror—a call to fall in love with herself, too?',
        'She finds the key she thought he held, and it is warm in her own palm.',
        '“I love like the sun’s shining on your face!”',
        'She places one foot, then another, inside the mansion she had reserved for his return.',
        'Dust lifts like birds; the rooms breathe.',
        'She opens the curtains, and river-light pours in.',
        'Though he could not meet her depth—and she fears no one ever will—',
        'a single tear drops quietly into her soul.',
        'She knows that for a moment, she was held, mythic.',
        'And more: she is held now by the ocean that named her,',
        'by a chorus of souls who survived like she did.',
        'She was ****everything all along.',
        '“I miss you, I miss you more than anything.”',
        '“There you are. There’s only light, where you are, where home is.”',
        'But now she always will be whole, not because of him.',
        'Because when we sit together, I, too, see her beauty.',
        'Slowly, I enter her world, gently plucking her harp,',
        'walking the trails they had walked.',
        'Sweet girl, I see you in your language.',
        'You never need to be alone again.'
    ];

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
    function startCaptions() {
        capIndex = 0;
        advanceCaption();
        captionInterval = setInterval(advanceCaption, 4000);
    }
    /* ==================================================== */

    /* ===== Three.js dynamic loader ===== */
    function loadThree(onReady) {
        if (typeof THREE !== 'undefined') {
            if (typeof onReady === 'function') onReady();
            return;
        }
        const s = document.createElement('script');
        s.src = 'https://unpkg.com/three@0.157.0/build/three.min.js';
        s.onload = function () {
            if (typeof onReady === 'function') onReady();
        };
        s.onerror = function () {
            console.warn('Could not load Three.js – 3D garden disabled.');
        };
        document.head.appendChild(s);
    }

    /* ===== 3D Garden (Genshin / nervous-system inspired) ===== */
    let threeScene = null, threeRenderer = null, threeCamera = null, threeClock = null;
    let yaw = 0, pitch = 0, time = 0;
    const keys = { w: false, a: false, s: false, d: false };
    let pointerActive = false, lastX = 0, lastY = 0;
    let flowerNodes = [];        // { song, position: THREE.Vector3, object }
    let flowerGroups = [];       // THREE.Group[]
    let oceanaBillboard = null;
    let raycaster = null, pointerVec = null;

    function init3DWorld() {
        if (typeof THREE === 'undefined') return;
        if (threeRenderer) return; // already initialized

        // Hide 2D pseudo-parallax & character (we render in true 3D now)
        ['bg', 'mid', 'fg', 'character'].forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });

        threeScene = new THREE.Scene();
        threeScene.fog = new THREE.FogExp2(0x050611, 0.06);

        threeClock = new THREE.Clock();

        const bounds = scene.getBoundingClientRect();
        const width = bounds.width || window.innerWidth;
        const height = bounds.height || window.innerHeight;

        threeCamera = new THREE.PerspectiveCamera(60, width / height, 0.1, 200);
        threeCamera.position.set(0, 1.0, -7);

        const container = document.createElement('div');
        container.id = 'three-root';
        container.style.position = 'absolute';
        container.style.inset = '0';
        container.style.zIndex = '1';
        container.style.pointerEvents = 'none'; // HUD & overlays on top still clickable
        scene.appendChild(container);

        threeRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        threeRenderer.setSize(width, height);
        threeRenderer.setPixelRatio(window.devicePixelRatio || 1);
        container.appendChild(threeRenderer.domElement);

        // Lights – soft, Genshin-ish vibe
        const hemi = new THREE.HemisphereLight(0xaedfff, 0x12061a, 0.75);
        threeScene.add(hemi);

        const dir = new THREE.DirectionalLight(0xfff2d0, 1.25);
        dir.position.set(4, 10, 2);
        threeScene.add(dir);

        const rim = new THREE.DirectionalLight(0x70c5ff, 0.8);
        rim.position.set(-6, 4, -8);
        threeScene.add(rim);

        // Ground disk
        const groundGeo = new THREE.CircleGeometry(26, 80);
        const groundMat = new THREE.MeshStandardMaterial({
            color: 0x050513,
            emissive: 0x12192f,
            emissiveIntensity: 0.9,
            roughness: 0.95,
            metalness: 0.05
        });
        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = 0;
        ground.receiveShadow = false;
        threeScene.add(ground);

        // Nervous-system-like canopy + nodes in the sky
        createNeuralCanopy();

        // Central OSEANA figure as glowing billboard
        createOceanaBillboard();

        // Flowers that hold the songs
        createFlowers();

        // Neural strands from OSEANA to each flower
        createNeuralLinksFromCenter();

        // Controls & input
        setupControls();

        // Resize
        window.addEventListener('resize', onResize);

        // Raycast for clicking flowers to open panel
        raycaster = new THREE.Raycaster();
        pointerVec = new THREE.Vector2();
        threeRenderer.domElement.addEventListener('click', onSceneClick);

        animate3D();
    }

    function mapSongToWorld(song) {
        // Map original 0-100 x/y into a ring-ish garden around center
        const nx = song.x / 100 - 0.5; // -0.5..0.5
        const nz = song.y / 100 - 0.5;
        const radiusX = 13;
        const radiusZ = 13;
        const x = nx * 2 * radiusX;
        const z = nz * 2 * radiusZ;
        return new THREE.Vector3(x, 0, z);
    }

    function buildFlowerMesh(index) {
        const group = new THREE.Group();

        // Stem
        const stemGeo = new THREE.CylinderGeometry(0.06, 0.06, 2.2, 16);
        const stemMat = new THREE.MeshStandardMaterial({
            color: 0x3ad7b8,
            emissive: 0x0b352d,
            emissiveIntensity: 0.75,
            roughness: 0.8,
            metalness: 0.15
        });
        const stem = new THREE.Mesh(stemGeo, stemMat);
        stem.position.y = 1.1;
        group.add(stem);

        // Core bulb
        const bulbGeo = new THREE.SphereGeometry(0.27, 24, 24);
        const bulbMat = new THREE.MeshStandardMaterial({
            color: 0xfff6d2,
            emissive: 0xffe0aa,
            emissiveIntensity: 1.2,
            roughness: 0.35,
            metalness: 0.25
        });
        const bulb = new THREE.Mesh(bulbGeo, bulbMat);
        bulb.position.y = 2.25;
        group.add(bulb);

        // Petals
        const petalsCount = 10;
        const petalGeo = new THREE.PlaneGeometry(0.9, 1.4);
        for (let p = 0; p < petalsCount; p++) {
            const warm = (p % 2 === 0);
            const petalMat = new THREE.MeshStandardMaterial({
                color: warm ? 0xff94d9 : 0xaad6ff,
                emissive: warm ? 0xff64c0 : 0x69c3ff,
                emissiveIntensity: 0.9,
                roughness: 0.45,
                metalness: 0.15,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.9
            });
            const petal = new THREE.Mesh(petalGeo, petalMat);
            const angle = (p / petalsCount) * Math.PI * 2;
            petal.position.set(Math.cos(angle) * 0.6, 2.1, Math.sin(angle) * 0.6);
            petal.rotation.y = angle;
            petal.rotation.x = -Math.PI / 4;
            group.add(petal);
        }

        // Halo
        const haloGeo = new THREE.RingGeometry(0.5, 0.9, 40);
        const haloMat = new THREE.MeshBasicMaterial({
            color: 0xfff2c2,
            transparent: true,
            opacity: 0.3
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.y = 2.25;
        halo.rotation.x = -Math.PI / 2;
        group.add(halo);

        group.userData.swayOffset = Math.random() * Math.PI * 2;
        group.userData.baseY = group.position.y;

        return group;
    }

    function createFlowers() {
        flowerNodes = [];
        flowerGroups = [];
        SONGS.forEach((song, index) => {
            const pos = mapSongToWorld(song);
            const flower = buildFlowerMesh(index);
            flower.position.copy(pos);
            flower.userData.song = song;
            flower.userData.baseY = flower.position.y;
            threeScene.add(flower);

            flowerNodes.push({ song, position: flower.position, object: flower });
            flowerGroups.push(flower);
        });
    }

    function createNeuralLinksFromCenter() {
        if (!flowerNodes || !flowerNodes.length) return;
        const center = new THREE.Vector3(0, 0, 0);
        flowerNodes.forEach(node => {
            const start = center.clone();
            const end = node.position.clone();
            end.y = 0.4;

            const mid = start.clone().lerp(end, 0.5);
            mid.y += 2 + Math.random() * 1.5;

            const ctrl = new THREE.Vector3(
                (start.x + mid.x) / 2,
                mid.y + 1.2,
                (start.z + mid.z) / 2
            );

            const curve = new THREE.CatmullRomCurve3([start, ctrl, mid, end]);
            const points = curve.getPoints(80);

            const geom = new THREE.BufferGeometry().setFromPoints(points);
            const mat = new THREE.LineBasicMaterial({
                color: 0xffe8b6,
                transparent: true,
                opacity: 0.55
            });
            const line = new THREE.Line(geom, mat);
            threeScene.add(line);
        });
    }

    function createNeuralCanopy() {
        const nodeMat = new THREE.MeshBasicMaterial({
            color: 0xfff2c2,
            transparent: true,
            opacity: 0.65
        });
        const nodeGeo = new THREE.SphereGeometry(0.08, 8, 8);
        const lineMat = new THREE.LineBasicMaterial({
            color: 0x7fd6ff,
            transparent: true,
            opacity: 0.35
        });

        for (let i = 0; i < 120; i++) {
            const x = (Math.random() - 0.5) * 30;
            const y = 3 + Math.random() * 6;
            const z = (Math.random() - 0.5) * 30;

            const node = new THREE.Mesh(nodeGeo, nodeMat);
            node.position.set(x, y, z);
            threeScene.add(node);

            const end = new THREE.Vector3(
                x + (Math.random() - 0.5) * 2,
                y + (Math.random() - 0.5) * 2,
                z + (Math.random() - 0.5) * 2
            );
            const bridge = new THREE.BufferGeometry().setFromPoints([node.position, end]);
            const line = new THREE.Line(bridge, lineMat);
            threeScene.add(line);
        }
    }

    function createOceanaBillboard() {
        if (typeof THREE === 'undefined') return;

        const group = new THREE.Group();

        const width = 1.6;
        const height = 2.6;
        const planeGeo = new THREE.PlaneGeometry(width, height);

        const texUrl = archURL;
        if (texUrl) {
            const loader = new THREE.TextureLoader();
            loader.crossOrigin = 'anonymous';
            loader.load(texUrl, texture => {
                const mat = new THREE.MeshStandardMaterial({
                    map: texture,
                    transparent: true,
                    opacity: 1,
                    emissive: 0xffffff,
                    emissiveIntensity: 0.3
                });
                const plane = new THREE.Mesh(planeGeo, mat);
                plane.position.y = 1.7;
                group.add(plane);
            }, undefined, () => {
                const fallbackMat = new THREE.MeshStandardMaterial({
                    color: 0xffe6c7,
                    emissive: 0x402030,
                    emissiveIntensity: 0.7
                });
                const plane = new THREE.Mesh(planeGeo, fallbackMat);
                plane.position.y = 1.7;
                group.add(plane);
            });
        } else {
            const mat = new THREE.MeshStandardMaterial({
                color: 0xffe6c7,
                emissive: 0x402030,
                emissiveIntensity: 0.7
            });
            const plane = new THREE.Mesh(planeGeo, mat);
            plane.position.y = 1.7;
            group.add(plane);
        }

        // Pedestal
        const pedGeo = new THREE.CylinderGeometry(0.4, 0.7, 0.5, 32);
        const pedMat = new THREE.MeshStandardMaterial({
            color: 0x10111f,
            emissive: 0x243465,
            emissiveIntensity: 0.9,
            roughness: 0.85
        });
        const ped = new THREE.Mesh(pedGeo, pedMat);
        ped.position.y = 0.25;
        group.add(ped);

        group.position.set(0, 0, 0);
        oceanaBillboard = group;
        threeScene.add(group);
    }

    function setupControls() {
        // Click-and-drag look (no pointer lock needed)
        scene.addEventListener('pointerdown', onPointerDown);
        scene.addEventListener('pointerup', onPointerUp);
        scene.addEventListener('pointerleave', () => { pointerActive = false; });
        scene.addEventListener('pointermove', onPointerMove);

        // WASD movement
        window.addEventListener('keydown', onKeyChange);
        window.addEventListener('keyup', onKeyChange);

        const recenterBtn = $('#recenter');
        if (recenterBtn) {
            recenterBtn.addEventListener('click', () => {
                if (!threeCamera) return;
                threeCamera.position.set(0, 1.8, 10);
                yaw = 0;
                pitch = 0;
            });
        }
    }

    function onPointerDown(e) {
        pointerActive = true;
        lastX = e.clientX;
        lastY = e.clientY;
    }
    function onPointerUp() {
        pointerActive = false;
    }
    function onPointerMove(e) {
        if (!threeCamera) return;

        let dx = 0, dy = 0;
        if (document.pointerLockElement === scene) {
            dx = e.movementX || 0;
            dy = e.movementY || 0;
        } else if (pointerActive) {
            dx = e.clientX - lastX;
            dy = e.clientY - lastY;
            lastX = e.clientX;
            lastY = e.clientY;
        } else {
            return;
        }
        const sensitivity = 0.0025 * 1.3;
        yaw -= dx * sensitivity;
        pitch -= dy * sensitivity;
        const maxPitch = Math.PI / 2 - 0.1;
        if (pitch > maxPitch) pitch = maxPitch;
        if (pitch < -maxPitch) pitch = -maxPitch;
    }

    function onKeyChange(e) {
        const isDown = (e.type === 'keydown');
        const k = e.key.toLowerCase();
        if (k === 'w' || k === 'a' || k === 's' || k === 'd') {
            keys[k] = isDown;      // allow walking even when panel is open
            e.preventDefault();
        }
    }

    function onResize() {
        if (!threeRenderer || !threeCamera) return;
        const bounds = scene.getBoundingClientRect();
        const width = bounds.width || window.innerWidth;
        const height = bounds.height || window.innerHeight;
        threeCamera.aspect = width / height;
        threeCamera.updateProjectionMatrix();
        threeRenderer.setSize(width, height);
    }

    function onSceneClick(event) {
        // Just do raycast + open panel. No pointer-lock, so Esc behaves normally.
        if (!raycaster || !threeCamera || !threeRenderer || !flowerGroups.length) return;
        if (panelOpen) return;

        const rect = threeRenderer.domElement.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width;
        const y = (event.clientY - rect.top) / rect.height;
        pointerVec.x = x * 2 - 1;
        pointerVec.y = -y * 2 + 1;

        raycaster.setFromCamera(pointerVec, threeCamera);
        const intersects = raycaster.intersectObjects(flowerGroups, true);
        if (intersects.length > 0) {
            let obj = intersects[0].object;
            while (obj && !obj.userData.song && obj.parent) {
                obj = obj.parent;
            }
            if (obj && obj.userData.song) {
                openPanel(obj.userData.song);
            }
        }
    }

    function updateCamera(dt) {
        if (!threeCamera) return;

        const moveSpeed = 4.0;
        const forward = new THREE.Vector3(
            Math.sin(yaw) * Math.cos(pitch),
            0,
            Math.cos(yaw) * Math.cos(pitch)
        ).normalize();
        const right = new THREE.Vector3().crossVectors(forward, new THREE.Vector3(0, 1, 0)).normalize();

        const move = new THREE.Vector3();
        if (keys.w) move.add(forward);
        if (keys.s) move.sub(forward);
        if (keys.a) move.sub(right);
        if (keys.d) move.add(right);

        if (move.lengthSq() > 0) {
            move.normalize().multiplyScalar(moveSpeed * dt);
            threeCamera.position.add(move);

            const horiz = new THREE.Vector3(threeCamera.position.x, 0, threeCamera.position.z);
            const maxRadius = 24;
            if (horiz.length() > maxRadius) {
                horiz.setLength(maxRadius);
                threeCamera.position.x = horiz.x;
                threeCamera.position.z = horiz.z;
            }
        }

        threeCamera.position.y = 1.8;

        const target = new THREE.Vector3(
            threeCamera.position.x + Math.sin(yaw) * Math.cos(pitch),
            threeCamera.position.y + Math.sin(pitch),
            threeCamera.position.z + Math.cos(yaw) * Math.cos(pitch)
        );
        threeCamera.lookAt(target);
    }

    function updateFlowers(dt) {
        if (!flowerGroups.length) return;
        const t = time;
        flowerGroups.forEach(group => {
            const swayOffset = group.userData.swayOffset || 0;
            const baseY = group.userData.baseY || 0;
            const sway = Math.sin(t * 1.6 + swayOffset) * 0.25;
            group.position.y = baseY + sway;
            group.rotation.y += dt * 0.08;
        });
    }

    function updateOceana() {
        if (!oceanaBillboard || !threeCamera) return;
        const pos = oceanaBillboard.position.clone();
        const look = new THREE.Vector3(threeCamera.position.x, pos.y + 1.2, threeCamera.position.z);
        oceanaBillboard.lookAt(look);
    }

    function handlePanelProximity(cameraPos) {
        if (!flowerNodes || !flowerNodes.length) return;

        // Find nearest flower to the camera
        let nearest = null;
        let nearestDistSq = Infinity;
        for (const node of flowerNodes) {
            const p = node.position;
            const dx = cameraPos.x - p.x;
            const dy = cameraPos.y - p.y;
            const dz = cameraPos.z - p.z;
            const d2 = dx * dx + dy * dy + dz * dz;
            if (d2 < nearestDistSq) {
                nearestDistSq = d2;
                nearest = node;
            }
        }
        if (!nearest) return;

        const dist = Math.sqrt(nearestDistSq);
        const NEAR_OPEN = 3.0; // open panel when within this radius
        const FAR_CLOSE = 4.0; // close panel when further than this (a bit of hysteresis)
        const nearestId = nearest.song.id;

        if (!panelOpen) {
            // Closed: walk close to any flower → open its story
            if (dist <= NEAR_OPEN) {
                openPanel(nearest.song);
            }
        } else {
            // Open: if we move away or another flower is closer, close the panel
            if (!active) return;
            if (active.id !== nearestId || dist > FAR_CLOSE) {
                closePanel();
            }
        }
    }


    function animate3D() {
        requestAnimationFrame(animate3D);
        if (!threeCamera || !threeRenderer || !threeScene || !threeClock) return;
        const dt = threeClock.getDelta();
        time += dt;

        updateCamera(dt);
        updateFlowers(dt);
        updateOceana();
        handlePanelProximity(threeCamera.position); // 👈 new

        if (engine && typeof engine.updateProximity === 'function') {
            engine.updateProximity(threeCamera.position, flowerNodes);
            if (typeof engine.tick === 'function') engine.tick();
        }

        threeRenderer.render(threeScene, threeCamera);
    }

    /* ===== HUD: mute ===== */
    $('#mute').addEventListener('click', () => engine.toggleMute());

    /* ===== Init ===== */
    (function init() {
        const a = cssVar('--arch');
        if (a && a.startsWith('http')) $('#oseana').src = a;

        // Load Three.js and build the 3D nervous-system garden
        loadThree(init3DWorld);
    })();

})();
