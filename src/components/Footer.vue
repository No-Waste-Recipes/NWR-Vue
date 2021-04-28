<template>
    <div class="Footer">
        <div class="md-layout">
            <div class="md-layout-item">
                <md-list>
                    <md-list-item v-for="link in links" :key="link.text" :to="link.route">
                       {{link.text}}
                    </md-list-item>
                </md-list>
            </div>
            <div class="seperatorLine"/>
            <div class="md-layout-item left">
                <p>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pharetra nunc.
                         Proin nec dui consectetur, tempor erat in, viverra leo. Cras vel malesuada ex. Duis quis luctus urna.
                         Phasellus pretium ex ut neque cursus, ac posuere urna aliquam. Fusce eu risus orci. Nullam tincidunt vestibulum fringilla.
                    </span>
                    <br>
                    <span>
                        This is not legal advice.
                    </span>
                </p>
            </div>
            <div class="seperatorLine"/>
            <div class="md-layout-item left"><p>
                    <span>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis pharetra nunc.
                         Proin nec dui consectetur, tempor erat in, viverra leo. Cras vel malesuada ex. Duis quis luctus urna.
                         Phasellus pretium ex ut neque cursus, ac posuere urna aliquam. Fusce eu risus orci. Nullam tincidunt vestibulum fringilla.
                    </span>
                    <br>
                    <span>
                        You cant sue us we are not real
                    </span>
                </p>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { MdList } from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(MdList)
@Component
export default class FooterComponent extends Vue {
  data () {
    return {
      links: [
        { text: 'about us', route: '/about' },
        { text: 'F.A.Q.', route: '/faq' },
        { text: 'login', route: '/login' },
        { text: 'createrecipe', route: '/recipe/create' },
        { text: 'register', route: '/register' }
      ]
    }
  }
}
</script>

<style lang="sass" scoped>
    .Footer
        width: 100%
        background: #F6F4F5

        .md-layout
            width: 70%
            margin: auto

            .md-layout-item
                background: #F6F4F5
                text-align: center

                ul
                list-style: none

                .left
                text-align: left
                margin: 15px

                .md-list
                    background-color: #F6F4F5

                    .md-list-item
                        text-align: center
                        display: block
                        vertical-align: top

            .seperatorLine
                width: 3px
                border-left: 3px solid #75BD84

</style>
