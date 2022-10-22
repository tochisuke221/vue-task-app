import { mount } from '@vue/test-utils'
import KbnLoginForm from '@/components/molecules/KbnLoginForm'

// =============================================================
// MEMO
// validation: v-modelで紐づけられるバリデーション
// valid: フォームの入力値が有効化どうか
// disableLoginAction: ログインボタンによるログインが可能かどうかのフラグ
// onlogin: クリックされたときに呼ばれるコールバック
// =============================================================
describe('KbnLoginForm', () => {
  describe('プロパティ', () => {
    describe('validation', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })

      describe('email', () => {
        describe('required', () => {
          describe('何も入力されない', () => {
            it('validation.email.requiredがinvalidであること', () => {
              loginForm.setData({email: ''})
              expect(loginForm.vm.validation.email.required).to.equal(false)
            })
          })
          describe('入力あり', () => {
            it('validation.email.requiredがinvalidであること', () => {
              loginForm.setData({email: 'test@example.com'})
              expect(loginForm.vm.validation.email.required).to.equal(true)
            })
          })
        })
        describe('format', () => {
          describe('何も入力されない', () => {
            it('フォーマットがemailでない場合', () => {
              loginForm.setData({email: 'test.test'})
              expect(loginForm.vm.validation.email.format).to.equal(false)
            })
          })
          describe('入力あり', () => {
            it('フォーマットがemailである場合', () => {
              loginForm.setData({email: 'test@example.com'})
              expect(loginForm.vm.validation.email.format).to.equal(true)
            })
          })
        })
      })

      describe('password', () => {
        describe('required', () => {
          describe('何も入力されない', () => {
            it('validation.password.requiredがinvalidであること', () => {
              loginForm.setData({password: ''})
              expect(loginForm.vm.validation.password.required).to.equal(false)
            })
          })
          describe('入力あり', () => {
            it('validation.password.requiredがvalidであること', () => {
              loginForm.setData({password: 'password'})
              expect(loginForm.vm.validation.password.required).to.equal(true)
            })
          })
        })
      })
    })
    describe('valid', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })
      describe('バリデーション項目全てOK', () => {
        it('validになること', () => {
          loginForm.setData({
            email: 'test@example.com',
            password: '12345'
          })
          expect(loginForm.vm.valid).to.equal(true)
        })
      })
      describe('バリデーションでNG項目がある場合', () => {
        it('invalidになること', () => {
          loginForm.setData({
            email: 'test@example.com',
            password: ''
          })
          expect(loginForm.vm.valid).to.equal(false)
        })
        it('invalidになること', () => {
          loginForm.setData({
            email: '',
            password: '12345'
          })
          expect(loginForm.vm.valid).to.equal(false)
        })
      })
    })

    describe('disableLogAction', () => {
      let loginForm
      beforeEach(done => {
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: () => {} }
        })
        loginForm.vm.$nextTick(done)
      })
      describe('バリデーションでNG項目がある場合', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'test@example.com',
            password: ''
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })
      describe('バリデーション項目全てOKかつログイン処理中でない', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'test@example.com',
            password: '12345'
          })
          expect(loginForm.vm.disableLoginAction).to.equal(false)
        })
      })
      describe('バリデーション項目全てOKかつログイン処理中', () => {
        it('ログイン処理は無効', () => {
          loginForm.setData({
            email: 'test@example.com',
            password: '12345',
            progress: true
          })
          expect(loginForm.vm.disableLoginAction).to.equal(true)
        })
      })
    })

    describe('onlogin', () => {
      let loginForm
      let onloginStub
      beforeEach(done => {
        onloginStub = sinon.stub()
        loginForm = mount(KbnLoginForm, {
          propsData: { onlogin: onloginStub }
        })
        loginForm.setData({
          email: 'test@example.com',
          password: '12345'
        })
        loginForm.vm.$nextTick(done)
      })

      describe('resolve', () => {
        it('resolveされること', done => {
          onloginStub.resolves()

          // クリックイベント
          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false) // まだresolveされない
          expect(loginForm.vm.error).to.equal('') // エラーメッセージは初期化
          expect(loginForm.vm.disableLoginAction).to.equal(true) // ログインアクションは不可

          // 状態の反映
          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true) // resolveされた
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => {
              expect(loginForm.vm.error).to.equal('') // エラーメッセージは初期状態
              expect(loginForm.vm.disableLoginAction).to.equal(false) // ログインアクションは可能

              done()
            })
          })
        })
      })

      describe('reject', () => {
        it('rejectされること', done => {
          onloginStub.rejects(new Error('login error!'))

          // クリックイベント
          loginForm.find('button').trigger('click')
          expect(onloginStub.called).to.equal(false) // まだrejectされない
          expect(loginForm.vm.error).to.equal('') // エラーメッセージは初期化
          expect(loginForm.vm.disableLoginAction).to.equal(true) // ログインアクションは不可

          // 状態の反映
          loginForm.vm.$nextTick(() => {
            expect(onloginStub.called).to.equal(true) // rejectされた
            const authInfo = onloginStub.args[0][0]
            expect(authInfo.email).to.equal(loginForm.vm.email)
            expect(authInfo.password).to.equal(loginForm.vm.password)
            loginForm.vm.$nextTick(() => {
              expect(loginForm.vm.error).to.equal('login error!') // エラーメッセージが設定される
              expect(loginForm.vm.disableLoginAction).to.equal(false) // ログインアクションは可能

              done()
            })
          })
        })
      })
    })
  })
})
