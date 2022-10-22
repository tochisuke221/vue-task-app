import mutations from '@/store/mutations'

describe('AUTH LOGINミューテーション', () => {
  const state = {}
  const token = '123456789abcd'
  const userId = 1
  mutations.AUTH_LOGIN(state, { token, userId })

  expect(state.auth.token).to.equal(token)
  expect(state.auth.userId).to.equal(userId)
})
