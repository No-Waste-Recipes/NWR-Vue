<template>
    <div>
        <div class="title">
          <h1>Create your recipe</h1>
        </div>
        <hr class="divider"/>
        <div class="content">
            <md-field class="inputField">
                <label>Title</label>
                <md-input v-model="title"></md-input>
            </md-field>
            <br/>
            <searchbar :homepage="false" :selected-ingredients="ingredient"/>
            <br/>
            <div class="editor">
                <editor-menu-bar :editor="editor" v-slot="{ commands }">
                    <div class="menubar md-elevation-1">
                        <md-button class="md-icon-button" :md-ripple="false" @click="commands.bold">
                            <md-icon class="icon">format_bold</md-icon>
                        </md-button>

                        <md-button class="md-icon-button md-elevation-1" :md-ripple="false" @click="commands.italic">
                            <md-icon class="icon">format_italic</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :md-ripple="false" @click="commands.strike">
                            <md-icon class="icon">strikethrough_s</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :md-ripple="false" @click="commands.underline">
                            <md-icon class="icon">format_underlined</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :md-ripple="false" @click="commands.bullet_list">
                            <md-icon class="icon">format_list_bulleted</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :md-ripple="false" @click="commands.ordered_list">
                            <md-icon class="icon">format_list_numbered</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :md-ripple="false" @click="commands.paragraph">
                            <md-icon class="icon">format_clear</md-icon>
                        </md-button>

                        <md-button class="md-icon-button" :md-ripple="false" @click="commands.heading({ level: 2 })">
                            <md-icon class="icon">format_size</md-icon>
                        </md-button>

                    </div>
                </editor-menu-bar>
                <editor-content class="editor_content md-elevation-3" :editor="editor" v-model="Description" />
            </div>
            <!-- TODO maak andere searchbar voor tags -->
            <md-field class="inputField">
                <label>Tags</label>
                <md-input v-model="Tags"></md-input>
            </md-field>
            <br>
            <md-button class="button md-elevation-3" v-on:click="saveAndPublish">Publish</md-button>
            <md-button class="button md-elevation-3" v-on:click="Save">Save for later</md-button>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Heading,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Italic,
  Strike,
  Underline
} from 'tiptap-extensions'
import searchbar from '@/components/search/searchbar.vue'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
import RecipeService from '@/services//RecipeService'

@Component({
  components: {
    EditorMenuBar,
    EditorContent,
    searchbar
  }
})
export default class CreateRecipeComponent extends Vue {
  editor: Editor
  title: ''
  Description: ''
  ingredient: []
  Tags: []
  descriptionChanged: boolean
  data () {
    return {
      ingredient: [],
      descriptionChanged: false,
      editor: new Editor({
        content: '<p>add description</p>',
        onUpdate: () => { this.descriptionChanged = true },
        extensions: [
          new BulletList(),
          new Heading({ levels: [2] }),
          new ListItem(),
          new OrderedList(),
          new Bold(),
          new Italic(),
          new Strike(),
          new Underline()
        ]
      })
    }
  }

  public checkData (data): boolean {
    console.log('checking data...')
    if (data.title === '' || data.title === 'Title') {
      alert('vul je title in')
      return false
    }
    if (data.Tags === '') {
      alert('vul je tags in in')
      return false
    }
    return this.descriptionChanged
  }

  public save (status: string): void{
    if (status === '') {
      status = 'PRIVATE'
    }

    const recipe = {
      title: this.title,
      description: this.editor.getHTML(),
      ingredients: this.ingredient,
      Tags: this.Tags,
      userId: 1,
      status: status
    }
    if (this.checkData(recipe)) {
      RecipeService.createRecipe(recipe).then(() => console.log('data send')).catch(() => console.log('er is iets fout gegaan check backend'))
    }
  }

  saveAndPublish () {
    this.save('TO_BE_APPROVED')
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
        opacity: 20%
    .content
        width: 55%
        margin: auto

        .icon
            color: black

        .inputField
            margin: auto
            margin-bottom: 5px

            .is-active
                background-color:#000000 50%
                border: 1px solid black

        .button
            background-color: #45C760
            opacity: 90%

        .editor
            position: relative
            text-align: left
            text-indent: 8px
            margin: auto
            padding: 5px
            display: box
            box-sizing: border-box
            .menubar
                padding: 4px

            .editor_content
                background-color: white
                min-height: 200px
</style>
