// PM2 process config for PriceAIAly (Next.js 16, next start)
// Usage on server: pm2 start deploy/ecosystem.config.js && pm2 save
module.exports = {
  apps: [
    {
      name: "priceaialy",
      // Use the project-local next binary that package.json scripts reference.
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/var/www/PriceAIAly",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "768M",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
      // .env file is loaded by Next at runtime; PM2 just needs cwd correct.
      out_file: "/var/log/priceaialy/out.log",
      error_file: "/var/log/priceaialy/error.log",
      merge_logs: true,
      time: true,
    },
  ],
};
