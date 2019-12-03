'use strict'

import db from '../clients/db'

export const createAddresses = (data) => db('addresses').insert(data)
