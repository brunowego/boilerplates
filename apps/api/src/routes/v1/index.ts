import Elysia from 'elysia'

import { approveOrder } from './approve-order'
import { authenticateFromLink } from './authenticate-from-link'
import { cancelOrder } from './cancel-order'
import { createEvaluation } from './create-evaluation'
import { createOrder } from './create-order'
import { deliverOrder } from './deliver-order'
import { dispatchOrder } from './dispatch-order'
import { getDailyReceiptInPeriod } from './get-daily-receipt-in-period'
import { getDayOrdersAmount } from './get-day-orders-amount'
import { getEvaluations } from './get-evaluations'
import { getManagedRestaurant } from './get-managed-restaurant'
import { getMonthCanceledOrdersAmount } from './get-month-canceled-orders-amount'
import { getMonthOrdersAmount } from './get-month-orders-amount'
import { getMonthReceipt } from './get-month-receipt'
import { getOrderDetails } from './get-order-details'
import { getOrders } from './get-orders'
import { getPopularProducts } from './get-popular-products'
import { getProfile } from './get-profile'
import { registerCustomer } from './register-customer'
import { registerRestaurant } from './register-restaurant'
import { sendAuthenticationLink } from './send-authentication-link'
import { signOut } from './sign-out'
import { updateMenu } from './update-menu'
import { updateProfile } from './update-profile'

export const v1Route = new Elysia().group('v1', (app) =>
  app
    .use(signOut)
    .use(getProfile)
    .use(getManagedRestaurant)
    .use(registerRestaurant)
    .use(registerCustomer)
    .use(sendAuthenticationLink)
    .use(authenticateFromLink)
    .use(createOrder)
    .use(approveOrder)
    .use(cancelOrder)
    .use(dispatchOrder)
    .use(deliverOrder)
    .use(getOrders)
    .use(getOrderDetails)
    .use(createEvaluation)
    .use(getEvaluations)
    .use(updateMenu)
    .use(updateProfile)
    .use(getMonthReceipt)
    .use(getMonthOrdersAmount)
    .use(getDayOrdersAmount)
    .use(getMonthCanceledOrdersAmount)
    .use(getDailyReceiptInPeriod)
    .use(getPopularProducts),
)
