# Architecture

This document describes the high-level architecture of Koji.

- apps/desktop: Electron main + renderer (Vite + React).
- packages/core: Domain logic (scaling, macros, etc.).
- packages/shared: Shared types/schemas between layers.
