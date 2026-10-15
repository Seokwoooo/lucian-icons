# Migrating from 1.x to 2.0

2.0 is a breaking release. Drawings, colors and motion were redrawn; the element API changed.

- Removed attributes: `ink`, `paper`. Strokes follow `color` (currentColor). Use `accent` or `--li-accent` for the detail color and `tone="line"` for monochrome.
- New attributes: `tone`, `weight`, `animate`. New methods: `play()`, `next()`.
- Hover and keyboard-focus effects attach automatically to the nearest control. Use `animate="none"` to opt out.
- States now exist only where they mirror real application state. Icons whose 1.x states were only visual poses (pressed, raised, turned) now have no states and play an effect instead. Remove their `state` attributes and `setState` calls.
- `size` range is 8–512 (default 24). `progress` now also applies to upload and battery.
- 1.x packages remain at https://lucianlabs.dev/icons/downloads/lucian-icons-skill-1.2.0.zip and lucian-icons-source-1.2.0.zip.

## State names, all 112 icons from 1.x

| Icon | 1.x states | 2.0 states |
| --- | --- | --- |
| trash | closed, open | closed, open (unchanged) |
| folder | closed, open | closed, open (unchanged) |
| envelope | closed, open | closed, open (unchanged) |
| lock | locked, unlocked | locked, unlocked (unchanged) |
| bell | idle, ringing | idle, unread |
| heart | off, on | off, on (unchanged) |
| bookmark | off, on | off, on (unchanged) |
| download | idle, progress, success, error | idle, progress, success, error (unchanged) |
| search | idle, searching | idle, searching (unchanged) |
| power | off, on | off, on (unchanged) |
| mouse | idle, pressed | none (effect only) |
| cursor | idle, pressed | none (effect only) |
| document | compact, expanded | none (effect only) |
| clipboard | clamped, released | idle, done |
| archive | closed, open | closed, open (unchanged) |
| inbox | resting, raised | empty, received |
| upload | resting, raised | idle, progress, success, error |
| copy | stacked, separated | idle, copied |
| attachment | closed, open | none (effect only) |
| link | loose, taut | linked, broken |
| book | right, left | none (effect only) |
| notebook | closed, open | none (effect only) |
| tag | resting, tilted | none (effect only) |
| filezip | raised, lowered | none (effect only) |
| receipt | attached, separated | none (effect only) |
| scan | top, bottom | none (effect only) |
| printer | resting, extended | none (effect only) |
| database | stacked, expanded | none (effect only) |
| server | seated, extended | none (effect only) |
| cloud | scattered, gathered | idle, syncing, synced |
| save | closed, open | idle, saved |
| box | closed, open | none (effect only) |
| chat | idle, typing | idle, typing (unchanged) |
| messages | stacked, conversation | none (effect only) |
| send | ready, aimed | none (effect only) |
| phone | idle, active | idle, ringing |
| videochat | off, on | on, off |
| microphone | off, on | on, muted |
| speaker | quiet, loud | on, muted |
| megaphone | quiet, announcing | none (effect only) |
| globe | wide, turned | none (effect only) |
| translate | first, second | none (effect only) |
| user | neutral, greeting | none (effect only) |
| users | apart, together | none (effect only) |
| contact | closed, open | none (effect only) |
| handshake | loose, held | none (effect only) |
| badge | folded, unfurled | none (effect only) |
| shield | resting, guarding | protected, alert |
| key | ready, turned | none (effect only) |
| fingerprint | idle, tracing | idle, scanning |
| eye | forward, looking | visible, hidden |
| help | resting, focused | none (effect only) |
| home | closed, open | none (effect only) |
| menu | closed, open | closed, open (unchanged) |
| settings | default, adjusted | none (effect only) |
| sliders | default, adjusted | none (effect only) |
| filter | all, filtered | off, on |
| sort | descending, ascending | desc, asc |
| layout | split, focus | open, collapsed |
| grid | compact, spread | none (effect only) |
| list | idle, selected | none (effect only) |
| expand | compact, expanded | none (effect only) |
| collapse | expanded, compact | none (effect only) |
| refresh | ready, turned | idle, loading |
| undo | current, previous | none (effect only) |
| redo | current, next | none (effect only) |
| edit | resting, writing | none (effect only) |
| brush | lifted, pressed | none (effect only) |
| palette | first, second | none (effect only) |
| crop | full, trimmed | none (effect only) |
| layers | stacked, separated | none (effect only) |
| ruler | start, advanced | none (effect only) |
| play | idle, active | paused, playing |
| pause | idle, paused | none (effect only) |
| stop | idle, stopped | none (effect only) |
| record | idle, active | idle, recording |
| music | still, playing | idle, playing |
| headphones | idle, listening | none (effect only) |
| camera | ready, pressed | none (effect only) |
| image | still, expanded | none (effect only) |
| film | closed, open | none (effect only) |
| monitor | off, on | none (effect only) |
| laptop | open, folded | none (effect only) |
| tablet | portrait, landscape | portrait, landscape (unchanged) |
| smartphone | idle, alerted | idle, alert |
| keyboard | ready, pressed | none (effect only) |
| battery | low, full | level, charging |
| wifi | idle, active | connected, connecting |
| bluetooth | idle, active | none (effect only) |
| plug | unplugged, inserted | none (effect only) |
| bulb | off, on | off, on (unchanged) |
| gamepad | ready, pressed | none (effect only) |
| cart | empty, filled | empty, added |
| bag | resting, packed | none (effect only) |
| wallet | closed, open | none (effect only) |
| card | idle, active | none (effect only) |
| gift | closed, open | closed, open (unchanged) |
| ticket | whole, separated | none (effect only) |
| coin | idle, selected | none (effect only) |
| chart | compact, expanded | none (effect only) |
| calendar | idle, selected | none (effect only) |
| clock | morning, later | none (effect only) |
| stopwatch | idle, active | idle, running |
| flag | resting, waving | none (effect only) |
| pin | idle, selected | none (effect only) |
| compass | resting, aligned | none (effect only) |
| sun | soft, bright | none (effect only) |
| moon | quiet, starry | none (effect only) |
| umbrella | open, folded | open, closed |
| coffee | resting, hot | none (effect only) |
| rocket | idle, ignited | none (effect only) |
| trophy | resting, celebrated | none (effect only) |

100 icons are new in 2.0. Search the catalog for them.
