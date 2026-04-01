# Swagger API Security (SAST + DAST)

This project uses:

- SAST with CodeQL (`.github/workflows/sast-security.yml`)
- DAST with OWASP ZAP API Scan (`.github/workflows/zap-security.yml`)

## Local app

```bash
npm start
```

- Swagger UI: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- OpenAPI JSON: [http://localhost:3000/openapi.json](http://localhost:3000/openapi.json)

## DAST workflow behavior

`zap-security.yml` has two jobs:

- `api-static`: exports `openapi/openapi.json` and scans it with `zaproxy/action-api-scan`
- `api-dynamic`: scans a live OpenAPI URL directly

## Required repository variables

Set these in GitHub repository variables:

- `ZAP_API_SERVER_URL`  
  Base API URL inserted into exported OpenAPI `servers` for static scan.  
  Example: `https://staging.example.com`
- `ZAP_API_TARGET`  
  OpenAPI URL for dynamic scan.  
  Example: `https://staging.example.com/openapi.json`

## Why localhost errors happened

If the OpenAPI `servers` value is `http://localhost:3000`, ZAP runs inside a container and cannot reach your runner's localhost app by default.  
Using `ZAP_API_SERVER_URL` fixes this by pointing scans to a reachable staging URL.
