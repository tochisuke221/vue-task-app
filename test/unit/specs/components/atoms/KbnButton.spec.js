// BDD: ビヘイビア駆動開発(振舞い)
import { mount } from '@vue/test-utils'
import KbnButton from '@/components/atoms/KbnButton'

describe('KbnButton', () => {
  describe('プロパティ', () => {
    describe('type', () => {
      // クラス名等のチェック
      describe('デフォルト', () => {
        it('kbn-buttonクラスを持つbutton要素を構成されること', () => {
          const button = mount(KbnButton)
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button')
        })
      })
      describe('button', () => {
        it('kbn-buttonクラスを持つbutton要素を構成されること', () => {
          const button = mount(KbnButton, {
            propsData: { type: 'button' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button')
        })
      })
      describe('text', () => {
        it('kbn-buttonクラスを持つbutton要素を構成されること', () => {
          const button = mount(KbnButton, {
            propsData: { type: 'text' }
          })
          expect(button.is('button')).to.equal(true)
          expect(button.classes()).to.include('kbn-button-text')
        })
      })
    })

    // 活性化の有無のテスト
    describe('disabled', () => {
      describe('デフォルト', () => {
        it('disabled属性が付与されてないこと', () => {
          const button = mount(KbnButton)
          expect(button.attributes().disabled).to.be.an('undefined')
        })
      })
      describe('true', () => {
        it('disabled属性が付与されていること', () => {
          const button = mount(KbnButton, {
            propsData: { disabled: true }
          })
          expect(button.attributes().disabled).to.equal('disabled')
        })
      })
      describe('false', () => {
        it('disabled属性が付与されてないこと', () => {
          const button = mount(KbnButton, {
            disabled: false
          })
          expect(button.attributes().disabled).to.be.an('undefined')
        })
      })
    })

    // イベントのチェック
    describe('イベント', () => {
      describe('click', () => {
        it('イベント登録されていること', () => {
          const button = mount(KbnButton)
          button.trigger('click')
          expect(button.emitted().click.length).to.equal(1)
        })
      })
    })

    describe('スロット', () => {
      describe('コンテンツが挿入サテている場合', () => {
        it('挿入されていること', () => {
          const button = mount(KbnButton, {
            slots: { default: '<p>hello</p>' }
          })
          expect(button.text()).to.equal('hello')
        })
        it('挿入されていないこと', () => {
          const button = mount(KbnButton)
          expect(button.text()).to.equal('')
        })
      })
    })
  })
})
