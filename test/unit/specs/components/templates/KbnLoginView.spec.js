import { mount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import KbnLoginView from '@/components/templates/KbnLoginView'
import sinonChai from 'sinon-chai'

// ローカルなVueコンストラクタを作成
const localVue = createLocalVue()

// ローカルなVueコンストラクタにVuexをインストール
localVue.use(Vuex)

describe('KbnLoginView', () => {
  let actions
  let $router
  let store
  let LoginFormComponentStub

  // KbnLoginFormコンポーネントのログインボタンのクリックをトリガーするヘルパー関数
  const triggerLogin = (loginView, target) => {
    const loginForm = loginView.find(target)
    loginForm.vm.onlogin('test@example.com', '1234')
  }

  beforeEach(() => {
    // KbnLoginFormコンポーネントのスタブ設定
    LoginFormComponentStub = {
      name: 'KbnLoginForm',
      props: ['onlogin'],
      render: h => h('p', ['login form'])
    }

    // VueRouterの設定
    $router = {
      push: sinonChai.pry()
    }

    // loginアクションの動作確認用のVuex設定
    actions = {
      login: sinonChai.stub() // loginアクションのモック
    }
    store = new Vuex.Store({
      state: {},
      actions
    })
  })

  describe('ログイン', () => {
    let loginView
    describe('成功', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })
      })

      it('ボードページのルートにリダイレクトすること', done => {
        // loginアクションを成功とする
        actions.login.resolves()

        triggerLogin(loginView, LoginFormComponentStub)

        // プロミスのフラッシュ
        loginView.vm.$nextTick(() => {
          expect($router.push.called).to.equal(true)
          expect($router.push.args[0][0].path).to.equal('/')
          done()
        })
      })
    })

    describe('失敗', () => {
      beforeEach(() => {
        loginView = mount(KbnLoginView, {
          mocks: { $router },
          stubs: {
            'kbn-login-form': LoginFormComponentStub
          },
          store,
          localVue
        })

        sinonChai.spy(loginView.vm, 'throwReject') // spyでラップ
      })

      afterEach(() => {
        loginView.vm.throwReject.restore() // ラップ解除
      })

      it('エラ〜処理が呼ばれること', done => {
        // loginアクションを失敗とする
        const message = 'login failed'
        actions.login.rejects(new Error(message))

        triggerLogin(loginView, LoginFormComponentStub)

        // プロミスのフラッシュ
        loginView.vm.$nextTick(() => {
          const callInfo = loginView.vm.throwReject
          expect(callInfo.called).to.equal(true)
          expect(callInfo.args[0][0].message).to.equal(message)

          done()
        })
      })
    })
  })
})
