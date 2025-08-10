module.exports = {
  apps: [
    {
      name: "app",
      script: "./www/app.js",
      env_production: {
        NODE_ENV: "production",
      },
    },
    {
      name: "my-app-mathurin",             
      script: "./server.js",      
      instances: 3,               
      exec_mode: "cluster",       
      max_memory_restart: "200M",
      error_file: "./logs/err.log", 
      out_file: "./logs/out.log",   
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      autorestart: true,
      watch: false,
    }
  ],
};
