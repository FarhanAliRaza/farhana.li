---
title: 'Lahza: Native Linux Screenshot and Screen Recording Studio'
slug: 'lahza'
description: 'A native Linux desktop app built with Rust and GPUI for screenshots, screen recordings, and motion. Capture screens, windows, or areas, annotate and style them, edit recordings on a multitrack timeline, animate still images, and export up to 4K at 60 fps as MP4, WebM, or GIF.'
date: '2026-08-31'
tags: ['Rust', 'GPUI', 'Linux', 'Desktop', 'Video', 'Screen Recording', 'Open Source']
published: true
order: 2
github: 'https://github.com/FarhanAliRaza/Lahza'
---

## TL;DR

Lahza is Urdu for "a brief moment". It is a native Linux studio for capturing a moment on screen and turning it into something worth sharing. Screenshot annotation, native screen recording, timeline editing, and animated presentations live in one desktop application built with Rust and [GPUI](https://www.gpui.rs/), the GPU-accelerated UI framework from the Zed editor.

It ships as a `.deb` for Ubuntu and as a Snap.

## Why I built it

Linux has plenty of screenshot tools and a few recorders, but nothing that covers the whole path from capture to a polished, shareable asset the way CleanShot or Screen Studio do on macOS. I wanted that workflow natively on Linux, fast, and without Electron.

## Features

- **Capture and record.** Screens, windows, or areas. Record with system and microphone audio, pause and resume, and save editable projects with autosave.
- **Design the scene.** Backgrounds, rounded corners, shadows, window frames, watermarks, and 3D perspective, with reusable presets.
- **Annotate.** Arrows, shapes, text, numbered steps, and highlights. Blur sensitive details, crop, and give annotations custom timing on video.
- **Edit recordings.** Trim, split, and change clip speed. Add zooms, pans, 3D motion, and camera overlays. Cursor effects and click-based auto-zooms use input metadata when it is available.
- **Animate still images.** Turn a screenshot into an animated scene with zoom, pan, and 3D presets, timed captions, and cursor walkthroughs.
- **Templates.** Ready-made layouts for product launches, tutorials, social posts, and changelogs.
- **Export.** PNG for stills. MP4, WebM, or GIF for video and animation, up to 4K at 30 or 60 fps with size estimates and progress tracking.

## Technical notes

The entire application, including the rendering pipeline, timeline, and export, is written in Rust. GPUI gives it a retained-mode, GPU-rendered interface that stays responsive while scrubbing 4K footage, and keeps the binary small compared with a web-based shell.
