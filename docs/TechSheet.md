# Oracle Entity Technical Overview

## Core Architecture
**Pipeline:** ASR → GPT-4 → TTS → Avatar Display
**Target Latency:** <1.5 seconds end-to-end
**Fallback Systems:** Local models, cached responses, graceful degradation

## Display Technology
**Primary:** Pepper's Ghost projection (14ft×9ft foil @ 45°)
**Alternatives:** Transparent OLED, Proto hologram boxes, LED panels
**Requirements:** <50 lux ambient, 10-12K lumen laser projector, 8ft viewer standoff

## Voice Processing
**ASR:** OpenAI Whisper (120ms local processing)
**LLM:** GPT-4o via Groq LPU (250-400ms inference)
**TTS:** ElevenLabs voice cloning (350ms synthesis)
**Audio:** ClearOne BMA-CT beam-forming microphone

## Visual System
**Particle Engine:** TouchDesigner GPU particles
**Avatar Rendering:** Unity/Unreal MetaHuman integration
**State Machine:** IDLE → SUMMON → LIVE_TALK → OUTRO
**Visual Layers:** Environmental particles, persona head, sentiment-reactive effects

## Hardware Requirements
**Computing:** RTX 4090 workstation, 32GB RAM
**Power:** 30-40A dedicated circuits, UPS backup
**Space:** 20-22ft depth, ≥11ft ceiling clearance
**Cooling:** HVAC for projector heat management

## Content Pipeline
**Knowledge Base:** RAG with 120+ verified sources
**Personas:** Character-specific voice models and behaviors
**Updates:** Quarterly content refresh, continuous FAQ expansion
**Quality Control:** Academic partnerships, community oversight

## Network & APIs
**Cloud Services:** OpenAI, ElevenLabs, optional Groq
**Local Processing:** Whisper ASR, fallback LLM
**Monitoring:** Remote diagnostics, health checks
**Redundancy:** Multiple service providers, cached responses

## Deployment Options
**Permanent:** Museum-grade installation with professional AV
**Portable:** Kiosk configuration for touring
**Outdoor:** Weather-resistant with fan array displays
**Scaled:** Multiple simultaneous installations