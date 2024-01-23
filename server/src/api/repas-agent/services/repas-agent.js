'use strict';

/**
 * repas-agent service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::repas-agent.repas-agent');
