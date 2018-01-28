// This file serves as the entrypoint to all configuration loaded by the
// application. All defaults are assumed here, validation should also be
// completed here.

if (process.env.NODE_ENV !== 'test') require('dotenv').config()

// ==============================================================================
//  CONFIG INITIALIZATION
// ==============================================================================

const CONFIG = {
  MONGO_URL: process.env.DEMOCRACYOS_MONGO_URL,
  PORT: process.env.PORT || '3000',
  DEFAULT_LANG: process.env.DEMOCRACYOS_DEFAULT_LANG || 'en'
}

// ==============================================================================
//  CONFIG VALIDATION
// ==============================================================================

if (process.env.NODE_ENV === 'test' && !CONFIG.MONGO_URL) {
  CONFIG.MONGO_URL = 'mongodb://localhost/DemocracyOS-test'
}

module.exports = CONFIG
