module.exports = {
  apps: [
    {
      name: "student-manager-backend",
      script: "server.js",
      instances: 1,
      autorestart: true,
      watch: false,
      max_memory_restart: "300M",
      env_file: ".env",
      env: {
        NODE_ENV: "production",
        PORT: 5000,
      },
    },
  ],
};
