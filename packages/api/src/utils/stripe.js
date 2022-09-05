import Stripe from 'stripe'

/**
 * @typedef {import('stripe').Stripe} StripeInterface
 */

/**
 * @typedef {import("./billing-types").BillingService} BillingService
 */

/**
 * @typedef {object} StripeComForBillingService
 * @property {Pick<StripeInterface['paymentMethods'], 'attach'>} paymentMethods
 * @property {Pick<StripeInterface['setupIntents'], 'create'>} setupIntents
 * @property {Pick<StripeInterface['customers'], 'retrieve'>} customers
 */

/**
 * A BillingService that uses stripe.com
 */
export class StripeBillingService {
  /**
   * @param {StripeComForBillingService} stripe
   */
  static create (stripe) {
    return new StripeBillingService(stripe)
  }

  /**
   * @protected
   * @param {StripeComForBillingService} stripe
   */
  constructor (stripe) {
    /** @type {StripeComForBillingService}  */
    this.stripe = stripe
    /**
     * @type {BillingService}
     */
    const instance = this // eslint-disable-line
  }

  async getPaymentMethod (customerId) {
    const response = await this.stripe.customers.retrieve(customerId)
    const customer = { id: response.id }
    return customer
  }

  /**
   * @param {import('./billing-types').StripeCustomerId} customer
   * @param {import('./billing-types').StripePaymentMethodId} method
   * @returns {Promise<void>}
   */
  async savePaymentMethod (customer, method) {
    await this.stripe.setupIntents.create({
    })
  }
}

/**
 * @typedef {import("./billing-types").CustomersService} CustomersService
 */

/**
 * @typedef {import("./billing-types").Customer} Customer
 */

/**
 * @typedef {import('stripe').Stripe['customers']} StripeComCustomers
 */

/**
 * @typedef {object} StripeComCustomersForGetOrCreate
 * @property {StripeComCustomers['create']} create
 */

/**
 * @typedef {object} StripeComForCustomersService
 * @property {StripeComCustomersForGetOrCreate} customers
 */

/**
 * @typedef {import('@web3-storage/db').DBClient} DBClient
 */

/**
 * @typedef {Pick<DBClient, 'getUserCustomer'>} DBClientForStripeCustomersService
 */

/**
 * @typedef {(userId: string) => Promise<null|{ id: string }>} GetUserCustomer
 */

/**
 * @typedef {(userId: string, customerId: string) => Promise<any>} UpsertUserCustomer
 */

/**
 * @typedef {object} UserCustomerService
 * @property {GetUserCustomer} getUserCustomer
 * @property {UpsertUserCustomer} upsertUserCustomer
 */

/**
 * A CustomersService that uses stripe.com for storage
 */
export class StripeCustomersService {
  /**
   * @param {StripeComForCustomersService} stripe
   * @param {UserCustomerService} userCustomerService
   */
  static create (stripe, userCustomerService) {
    return new StripeCustomersService(stripe, userCustomerService)
  }

  /**
   * @param {StripeComForCustomersService} stripe
   * @param {UserCustomerService} userCustomerService
   * @protected
   */
  constructor (stripe, userCustomerService) {
    /** @type {UserCustomerService} */
    this.userCustomerService = userCustomerService
    /** @type {StripeComForCustomersService} */
    this.stripe = stripe
    /**
     * @type {CustomersService}
     */
    const instance = this // eslint-disable-line
  }

  /**
   * @param {{id: string}} user
   * @returns {Promise<Customer>}
   */
  async getOrCreateForUser (user) {
    const existingCustomer = await this.userCustomerService.getUserCustomer(user.id)
    if (existingCustomer) return existingCustomer
    const createdCustomer = await this.stripe.customers.create({
      metadata: {
        'web3.storage/user.id': user.id
      }
    })
    await this.userCustomerService.upsertUserCustomer(user.id, createdCustomer.id)
    return createdCustomer
  }
}

/**
 * @param {string} secretKey
 * @returns {StripeInterface}
 */
export function createStripe (secretKey) {
  return new Stripe(secretKey, {
    apiVersion: '2022-08-01',
    httpClient: Stripe.createFetchHttpClient()
  })
}
