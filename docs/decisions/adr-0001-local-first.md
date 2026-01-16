# ADR-0001: Local-first baseline

## Status

Accepted

## Context

Koji targets an offline-capable, with synchronization as an optional layer.

## Decision

Use a local-first architecture as the default behavior across the desktop app and core domain.

## Consequences

- Core logic runs offline without network dependencies.
- Data models and sync will be designed for local storage and later merging.
