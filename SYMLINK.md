# When using yarn link

1. `yarn link` in the root of the package
2. `yarn link @weng-lab/genomebrowser` in the app

inside next.config.ts
```
experimental: {
    turbo: {
        resolveAlias: {
            "@weng-lab/genomebrowser": path.join(__dirname, "../genomebrowser-components/dist/gbc.js").replace(/\\/g, "/")
        }
    }
}
```

inside package.json
```
    "@weng-lab/genomebrowser": "link:../genomebrowser-components"
```