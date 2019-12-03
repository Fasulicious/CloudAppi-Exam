'use strict'

export const validate = (user) => {
  if (typeof user.name !== 'string') return false
  if (typeof user.email !== 'string') return false
  if (typeof user.birthDate !== 'string') return false
  if (typeof user.address !== 'object') return false
  if (typeof user.address.street !== 'string') return false
  if (typeof user.address.state !== 'string') return false
  if (typeof user.address.city !== 'string') return false
  if (typeof user.address.country !== 'string') return false
  if (typeof user.address.zip !== 'string') return false
  return true
}
