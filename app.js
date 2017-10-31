const Editor = {
    props: [
        'entityObject'
    ],
    data() {
        return {
            entity: this.entityObject
        }
    },
    methods: {
        update() {
            this.$emit('update')
        }
    },
    template: `
   <div class="ui form">
   <div class="filed">
     <textarea
     rows = "5"
     placeholder="写点东西。。。"
     v-model="entity.body"
     v-on:input="update">
     
     </textarea>
   </div>
   </div>  
   `
}


const Note = {

    props: [
        'entityObject'
    ],
    data() {
        return {
            entity: this.entityObject,
            open: false
        }
    },
    computed: {
        header() {
            return _.truncate(this.entity.body, { length: 30 })//用lodash截取前30个字
        },
        updated() {
            return moment(this.entity.meta.update).fromNow()
        },
        words(){
            return this.entity.body.trim().length
        }
    },
    components: {
        'editor': Editor
    },
    methods: {
        save() {
            loadCollection('notes').then((collection) => {
                collection.update(this.entity)
                db.saveDatabase()
            })
        }
    },
    template: `
    <div class="item">
    <div class="meta">
    {{updated}}
    </div>
      <div class="content">
        <div class="header" v-on:click='open = !open'>
          {{ header || '新建笔记' }}
      </div>
      
      <div class="extra">
      <editor
      v-bind:entity-object="entity"
      v-if='open'
      v-on:update='save'
      ></editor>  
      {{words}} 字
     </div>
     </div>
    </div>
    `
}

const Notes = {

    data() {
        return {
            entities: []
        }
    },

    created() {
        loadCollection('notes')
            .then(collection => {
                const _entites = collection.chain()
                    .find()
                    .simplesort('$loki', 'isdesc')
                    .data()
                this.entities = _entites
                console.log(this.entities)
            })
    },

    methods: {
        create() {
            loadCollection('notes').then((collection) => {
                const entity = collection.insert({
                    body: ''
                })
                db.saveDatabase()
                this.entities.unshift(entity)
            })
        }
    },


    components: {
        'note': Note
    },

    template: `
    <div class="ui container notes">
    <h4 class="ui horizontal divider header">
         <i class="paw icon"></i>
         Yanggong Notes App Vue.js
    </h4>  
    <a class="ui right floated basic violet button"
    v-on:click='create'
    >
      添加笔记
    </a>
    <div class="ui divided items">
    <note
     v-for="entity in entities"
     v-bind:entityObject = "entity"
     v-bind:key="entity.$loki"
    ></note>    
    </div>
    </div>
    `
}

const app = new Vue({
    el: '#app',
    components: {
        'notes': Notes
    },
    template: `
    <notes></notes>
    `
})