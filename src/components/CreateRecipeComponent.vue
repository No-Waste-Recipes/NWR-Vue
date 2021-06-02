<template>
    <div>
        <div class="title">
          <h1>Create your recipe</h1>
        </div>
        <hr class="divider"/>
        <div class="content">
          <form @submit.prevent="validateRecipe">
            <md-field class="inputField" :class="{'md-invalid': this.titleError}">
                <label>Title</label>
                <md-input v-model="title"></md-input>
                <span class="md-error" v-if="titleError">Invalid title</span>
            </md-field>
            <div id="preview">
              <label>Image preview</label>
              <div v-if="this.file" :style="{ backgroundImage: `url(${getFileUrl()})` }" />
            </div>
            <md-field class="inputField" :class="{'md-invalid': this.fileError}">
              <label>Header image</label>
              <md-file @change="uploadFile" />
              <span class="md-error" v-if="fileError">File missing</span>
            </md-field>
            <br/>
            <div :class="{'md-invalid': this.ingredientError}">
              <searchbar :homepage="false" :selected-ingredients="ingredient"/>
              <span class="md-error" v-if="ingredientError">No ingredients selected</span>
            </div>
            <br/>
            <div class="editor" :class="{'md-invalid': this.DescriptionError}">
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
                <span class="md-error" v-if="DescriptionError">Invalid description</span>
            </div>
            <md-field class="inputField">
                <label>Tags</label>
                <md-input v-model="Tags"></md-input>
            </md-field>
            <br>
            <md-card-actions>
              <md-button type="submit" class="md-primary">Opslaan</md-button>
            </md-card-actions>
          </form>
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
  title: '';
  titleError: boolean;
  Description: ''
  DescriptionError: boolean
  ingredientError: boolean
  ingredient: []
  Tags: []
  descriptionChanged: boolean
  isediting: false

  file: ''
  fileError: boolean
  data () {
    return {
      title: '',
      titleError: null,
      file: '',
      fileError: null,
      Description: '',
      DescriptionError: null,
      Tags: [],
      ingredient: [],
      ingredientError: null,
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

  public uploadFile (event) {
    this.file = event.target.files[0]
  }

  public getFileUrl () {
    return URL.createObjectURL(this.file)
  }

  public checkData (): void {
    let error = false
    this.titleError = false
    if (this.title === '') {
      this.titleError = true
      error = true
    }
    if (this.file === '') {
      this.fileError = true
      error = true
    }
    if (!this.descriptionChanged) {
      this.DescriptionError = true
      error = true
    }
    if (this.ingredient.length === 0) {
      this.ingredientError = true
      error = true
    }
    if (error) return
    this.save('')
  }

  public save (status: string): void{
    if (status === '') {
      status = 'PRIVATE'
    }

    const formData = new FormData()
    formData.append('photo', this.file)
    formData.append('title', this.title)
    formData.append('description', this.editor.getHTML())
    formData.append('ingredients', JSON.stringify(this.ingredient))
    formData.append('Tags', JSON.stringify(this.Tags))
    formData.append('status', status)

    RecipeService.createRecipe(formData, this.$store.state.token).then(() => this.$router.push('/')).catch(() => console.log('er is iets fout gegaan check backend'))
  }

  validateRecipe () {
    this.checkData()
  }

  saveAndPublish () {
    this.save('TO_BE_APPROVED')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="sass">
    .md-error
      color: #ff1744

    .divider
        width: 75%
        opacity: 20%
    .content
        width: 55%
        margin: auto

        #preview > div
          height: 400px
          background-position: center
          background-size: cover

        .icon
            color: black

        .inputField
          margin: auto auto 5px

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
