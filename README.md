# Swagger API Security (SAST + DAST)

This project includes a production-friendly security setup with:

- SAST (static source analysis) via GitHub CodeQL
- DAST (runtime/API security testing) via OWASP ZAP

## What is included

- `GET /openapi.json` dynamic OpenAPI endpoint in `server.js`
- `openapi:export` script to create `openapi/openapi.json` (static spec)
- ZAP baseline scan script for running app target
- ZAP API scan scripts for:
  - Dynamic OpenAPI URL target
  - Static OpenAPI file target
- Scan policy templates:
  - `zap/rules-baseline.conf`
  - `zap/rules-api.conf`

## Run application

```bash
npm start
```

Swagger UI:

- [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

OpenAPI JSON:

- [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

## Run ZAP scans

### 1) Baseline dynamic scan (passive checks)

Use this in PR pipelines for fast feedback:

```bash
npm run zap:baseline
```

### 2) API scan using dynamic OpenAPI endpoint

Use when app is running and OpenAPI endpoint is reachable:

```bash
npm run zap:api:dynamic
```

### 3) API scan using static OpenAPI file

Use in CI when runtime endpoint is unavailable:

```bash
npm run zap:api:static
```

## Reports generated

Each scan writes reports in project root:

- HTML report (`*.html`)
- XML report (`*.xml`)
- JSON report (`*.json`)

## Production best practices

- Run baseline scan on every PR.
- Run API scan on merge to main and nightly schedule.
- Keep `zap/rules-*.conf` strict; only suppress verified false positives.
- Track report artifacts in CI for audit and triage.
- Add authenticated scan context for protected endpoints.
- Segment scan environments (staging/prod-like) and never run aggressive scans on live production traffic without change control.

## CI pipeline included

GitHub Actions workflows:

- `.github/workflows/sast-security.yml`
  - PR + main + nightly: CodeQL SAST scan for JavaScript
- `.github/workflows/zap-security.yml`
  - PR: `zap-api-static` job using `zaproxy/action-api-scan` against `openapi/openapi.json`
  - Main branch + nightly: `zap-dynamic` job (baseline scan + optional dynamic API scan via `vars.ZAP_API_TARGET`)

### Dynamic target variable

For dynamic API scanning in GitHub Actions, set repository variable:

- `ZAP_API_TARGET` (example: `https://staging.example.com/openapi.json`)
