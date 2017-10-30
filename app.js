const Note ={
    template:`
    <div class="item">
    <div class="content">
    </div class="header">
    笔记
    </div>
    </div>
    </div>
    `
}

const Notes = {
    components:{
        'note':Note
    },
    template:`
    <div class="ui container notes">
    <h4 class="ui horizontal divider header">
         <i class="paw icon"></i>
         Yanggong Notes App Vue.js
    </h4>  
    <a class="ui right floated basic violet button">
      添加笔记
    </a>
    <div class="ui divided items">
    <note></note>    
    <note></note>    
    <note></note>    
    <note></note>    
    </div>
    </div>
    `
}

const app = new Vue({
    el:'#app',
    components:{
        'notes':Notes
    },
    template:`
    <notes></notes>
    `
})