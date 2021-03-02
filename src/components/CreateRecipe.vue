<template>
    <div>
        <h1>Create your recipe</h1>
        <hr class="divider"/>
        <div class="inputdiv">
            <md-field class="inputField">
                <label>Title</label>
                <md-input v-model="type"></md-input>
            </md-field>
            <searchbar/>
            <br/>
            <div class="editor">
                <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                    <div>
                        <md-button class="md-icon-button" :md-ripple="false" :class="{ 'is-active': isActive.bold() }" @click="commands.bold">
                            <md-icon class="icon">format_bold</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :md-ripple="false" :class="{ 'is-active': isActive.italic() }" @click="commands.italic">
                            <md-icon class="icon">format_italic</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :class="{ 'is-active': isActive.strike() }" @click="commands.strike">
                            <md-icon class="icon">strikethrough_s</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :class="{ 'is-active': isActive.underline() }" @click="commands.underline">
                            <md-icon class="icon">format_underlined</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :class="{ 'is-active': isActive.bullet_list() }" @click="commands.bullet_list">
                            <md-icon class="icon">format_list_bulleted</md-icon>
                        </md-button>
                    </div>
                </editor-menu-bar>
                <editor-content class="editor_content md-elevation-3" :editor="editor" />
            </div>
            <md-field class="inputField">
                <label>Tags</label>
                <md-input v-model="type"></md-input>
            </md-field>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Strike,
  Underline,
  History
} from 'tiptap-extensions'
import searchbar from '@/components/search/searchbar.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

@Component({
  components: {
    EditorMenuBar,
    EditorContent,
    searchbar
  }
})
export default class CreateRecipeComponent extends Vue {
  editor: Editor
  data () {
    return {
      editor: new Editor({
        content: '<p>add desription</p>',
        extensions: [
          new Blockquote(),
          new BulletList(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History()
        ]
      })
    }
  }

  beforeDestroy () {
    this.editor.destroy()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    .divider
        width: 75%
    .inputdiv
        width: 60%
        margin: auto

        .icon
            color: black

        .inputField
            width: 50%
            margin: auto
            margin-bottom: 5px

        .editor
            position: relative
            text-align: left
            text-indent: 8px
            width: 75%
            margin: auto
            display: box
            box-sizing: border-box

            .editor_content
                min-height: 10em
                overflow-wrap: break-word
                word-wrap: break-word
                word-break: break-word
</style>
