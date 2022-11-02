module.exports = {
  apps: [
    {
      name: 'TEST_CI_0.2',
      script: './App.js',
      watch: false,
      exec_mode: 'cluster',
      autorestart: true,
      max_memory_restart: '1G',
      error_file: './uploads/logs/error.log',
      out_file: './uploads/logs/output.log',
      pid_file: './uploads/logs/pid.pid',
      log_date_format: 'DD-MM-YYYY HH:mm',
      combine_logs: true,
      watch_delay: 1000,
    },
  ],
}
