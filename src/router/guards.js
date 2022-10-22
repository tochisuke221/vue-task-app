import store from '../store'

export const authorizeToken = (to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // マッチしたルートにおいてメタフィールドにrequiresAuthが付与されている場合、
    // ログインした際に付与される認証トークンがあるかをチェック
    // 本来ならAPI経由で認証トークンをバックエンド側に送って検証すべきだが有無のみで判断する
    if (!store.state.auth || !store.state.auth.token) {
      next({
        path: '/login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
}
