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

`zap-security.yml` runs one local CI job:

- Starts your app in the runner
- Waits for `http://127.0.0.1:3000/openapi.json`
- Runs ZAP API scan in Docker against that local endpoint
- Uploads HTML/XML/JSON reports as workflow artifacts

No live domain or repository variables are required for this setup.
