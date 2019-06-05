//Cards component
Vue.component('component-cards', {
    data () {
        return {
            titlelist   :  null,
            loading     : true,
            error       : false,
        }  
    },
    mounted () {
        axios
        .get('https://lejeudutitre-c09ba.firebaseio.com/titlelist.json')
        .then(response => (
            this.titlelist = response.data,
            console.log( response.data))
            
        )
        .catch(error => {
            console.log(error)
            this.error = true
        })
        .finally(() => this.loading = false)
    },
    template: ` <div class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l  uk-child-width-1-5@xl uk-grid-match js-filter" data-uk-grid="masonry:true" >
                    <div v-if="error"><p>Erreur de chargement</p></div>
                    <div v-else v-if="loading"><div uk-spinner="ratio: 6"></div></div>
                    <div v-else v-for="title in titlelist" v-bind:title="title" :class="title.sort">
                        <div class="uk-card uk-card-small uk-card-default uk-animation-shake">
                            <div class="uk-card-header">
                                <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                                    <div class="uk-width-expand">
                                        <span class="cat-txt">{{title.category}}</span>
                                    </div>
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
                                    <div class="uk-width-expand uk-text-small">
                                        <span class="uk-badge">{{title.vote}}</span>
                                        <a href="#" data-uk-tooltip="title: Vote (bientôt disponible)" class="uk-icon-link" data-uk-icon="icon:heart; ratio: 0.8"></a>
                                        <a href="#" :data-uk-tooltip="'pos: left;title:'+title.description+'...;'" class="uk-icon-link" data-uk-icon="icon:question; ratio: 0.8"></a>
                                    </div>                                  
                                    <div class="uk-width-auto uk-text-right">
                                        <a :href="'https://twitter.com/intent/tweet/?url=www.lejeudutitre.com&text='+title.title+'%0A&via=lejeudutitre'" target="_blank" data-uk-tooltip="title: Partager sur Twitter"  rel="nofollow" class="uk-icon-link" data-uk-icon="icon:twitter; ratio: 0.8"></a>
                                        <a :href="'https://www.facebook.com/sharer.php?u=www.lejeudutitre.com&t='+title.title+'%0A'"                     target="_blank" data-uk-tooltip="title: Partager sur Facebook" rel="nofollow" class="uk-icon-link" data-uk-icon="icon:facebook; ratio: 0.8"></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                `
});

/**************** C O M P O N E N T   A C T I V A T I O N ****************/
new Vue(
    { el: '#indexVue'}
);