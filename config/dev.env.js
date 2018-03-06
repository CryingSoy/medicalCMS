'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // BASE_API: '"http://localhost:3001/admin"', // Server URL
  BASE_API: '"https://easy-mock.com/mock/5a9cff13d5b2fa7300376a8a/admin"', // Server URL
})
