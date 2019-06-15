/****************************************************************************************************************************************** */
/*                                              C O O K I E   F U N C T I O N                                                               */
/****************************************************************************************************************************************** */
function createCookie (name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

/****************************************************************************************************************************************** */
/*                                              V U E J S   C O M P O N E N T                                                               */
/****************************************************************************************************************************************** */

/*------------------------------------------------------------------------*/
//Cards component
Vue.component('component-cards', {
    data () {
        return {
            titles  : null,
            loading : true,
            errored : false,
        }  
    },
    mounted () {
        axios
        .get('https://www.lejeudutitre.com/API/')
        .then(response => (this.titles = response.data))
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
    },
    template: ` <div class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l  uk-child-width-1-5@xl uk-grid-match js-filter" data-uk-grid="masonry:true" >
                    <div v-if="errored"><p>Erreur de chargement</p></div>
                    <div v-else v-if="loading"><div uk-spinner="ratio: 6"></div></div>
                    <div v-else v-for="title in titles" :class="title.sort+'-card'">
                        <div class="uk-card uk-card-small uk-card-default uk-animation-shake">
                            <div class="uk-card-header">
                                <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                                    <div class="uk-width-expand">
                                        <span class="cat-txt">{{title.category}}</span>
                                        <a href="#" :data-uk-tooltip="'pos: left;title:'+title.description+'...;'"  class="uk-icon-link" data-uk-icon="icon:info;ratio: 0.8"></a>
                                    </div>
                                    <span v-if="title.new === '1'" class="uk-badge uk-background-badge"><small>New</small></span>
                                    <div class="uk-width-auto uk-text-right uk-text-muted">
                                        <span :data-uk-icon="'icon:'+title.icon+'; ratio: 0.8'" :data-uk-tooltip="'pos: left;title: Proposé par '+title.author+';'"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-card-body uk-inline-clip uk-transition-toggle" tabindex="0" width='100%'>
                                <p class="uk-text-small uk-text-muted">{{title.label}}</p>
                            </div>
                            <div class="uk-card-footer">
                                <div class="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                                    <component-cards-vote v-bind:title="title"></component-cards-vote>                             
                                    <div class="uk-width-auto uk-text-right">
                                        <a :href="'https://twitter.com/intent/tweet/?url=www.lejeudutitre.com&text='+title.label+'%0A&via=lejeudutitre'" target="_blank" data-uk-tooltip="title: Partager sur Twitter"  rel="nofollow" class="uk-icon-link" data-uk-icon="icon:twitter; ratio: 0.8"></a>
                                        <a :href="'https://www.facebook.com/sharer.php?u=www.lejeudutitre.com&t='+title.label+'%0A'"                     target="_blank" data-uk-tooltip="title: Partager sur Facebook" rel="nofollow" class="uk-icon-link" data-uk-icon="icon:facebook; ratio: 0.8"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
});

/*------------------------------------------------------------------------*/
//Vote component
Vue.component('component-cards-vote', {
    props: ['title'],
    data () {
        (readCookie(this.title.id)) ? cookievote=true : cookievote=false // détecter si le user a déjà voté
        return {
            id          : this.title.id,
            counter     : this.title.vote,
            loading     : true,
            errored     : false,
            voted       : cookievote 
        }  
    },
    methods: {
        vote () {
            if (!this.voted)   {
                this.counter++, 
                this.voted = true,
                createCookie(this.id,this.voted,30),        // enregistrement du vote du user de la page
                axios
                    .get('API/vote.php?id='+this.id)   // enregistrement dans la source de données
                    .then(response => (UIkit.notification({
                        message: 'À voté !',
                        status: 'success',
                        pos: 'bottom-center',
                        timeout: 5000
                    })))
                    .catch(error => {console.log(error)})
                    .finally(() => this.loading = false)
            }
        },
    },
    template: ` <div class="uk-width-expand uk-text-small">
                    <component-cards-countervote v-bind:counter="counter" v-bind:modified="voted"></component-cards-countervote>
                    <a v-if="voted"></a>
                    <a v-else v-on:click.stop="vote()" data-uk-tooltip="title:Vote" class="uk-icon-link" data-uk-icon="icon:heart;ratio: 0.8"></a>
                </div>     
                `
});

/*------------------------------------------------------------------------*/
//Counter vote component
Vue.component('component-cards-countervote', {
    props: ['counter', 'modified'],
    template: ` <span  v-if="modified"      class="uk-badge uk-background-secondary" >{{this.counter}}</span>
                <span  v-else="modified"    class="uk-badge"  >{{this.counter}}</span>`
});

/*------------------------------------------------------------------------*/
//wall of shame
Vue.component('component-wallofshame', {
    data () {
        return {
            authors   : null,
            loading     : true,
            errored     : false,
        }  
    },
    mounted () {
        axios
        .get('https://www.lejeudutitre.com/API/author.php')
        .then(response => (this.authors = response.data))
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
    },
    template: ` <div class="uk-modal-dialog uk-modal-body">
                    <button class="uk-modal-close-default" type="button" uk-close></button>
                    <div class="uk-modal-header"><h2 class="uk-modal-title">The wall of shame</h2> Remercions les contributeurs du site lejeudutitre.com</div>
                    <div v-if="errored"><p>Erreur de chargement</p></div>
                    <div v-else v-if="loading"><div uk-spinner="ratio: 6"></div></div>
                    <div v-else class="uk-modal-body uk-overflow-auto uk-text-muted uk-text-small">
                        <ul class="uk-list uk-list-striped">
                            <li v-for="author in authors">{{author.author}} &nbsp;<i v-if="author.author === 'LeChaps'">Le Créateur</i></li>
                        </ul>
                        <p>On va pas se mentir, pour l'instant c'est un peu limité, mais avouez que vous n'aurez bientôt pas honte de figurer ici ;-)</p>
                    </div>
                    <div class="uk-modal-footer uk-text-right">
                        <a href="http://www.leetchi.com/c/www-lejeudutitre-com" target="_blank"><button class="uk-button uk-button-danger"><span uk-icon="heart"></span>&nbsp;Faire un don</button></a>
                    
                        <button class="uk-button uk-button-primary uk-modal-close" type="button">Fermer</button>
                    </div>
                </div>
                `
});


/**************** C O M P O N E N T   A C T I V A T I O N ****************/
new Vue(
    { el: '#indexVue'}
);

new Vue(
    { el: '#modal-close-default'}
);
