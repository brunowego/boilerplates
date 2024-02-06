import { describe, it, expect } from 'bun:test'

import { hashPassword, comparePassword } from '@/lib/bcrypt'

describe('lib', () => {
  describe('bcrypt', () => {
    const password = 'password'

    it('should return hashed password based on callback which should match', async () => {
      const { hash, salt } = await hashPassword(password)
      const actual = await comparePassword(password, salt, hash)

      expect(actual).toBeTrue()
    })

    it('should fail with invalid password', async () => {
      const { hash, salt } = await hashPassword(password)
      const actual = await comparePassword('admi', salt, hash)

      expect(actual).toBeFalse()
    })
  })
})
