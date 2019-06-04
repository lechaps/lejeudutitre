//Cards component
Vue.component('component-cards', {
    data () {
        return {
            "titlelist":  [
                {
                    "title"         : "Si tu te met à coté de la fontaine y'a aucune goutte par terre",
                    "category"      : "ça coule source",
                    "description"   : "Discussion de bureau à la pause café",
                    "sort"          : "top10-card", 
                    "icon"          : "paint-bucket"
                }, 
                {
                    "title"         : "Tape devant c'est pas à nous",
                    "category"      : "Circulation",
                    "description"   : "Quelqu'un qui aide une amie à se garer en créneau",
                    "sort"          : "top10-card", 
                    "icon"          : "cart"
                },
                {
                    "title"         : "Ôtes ta langue, que je pète",
                    "category"      : "Romantisme",
                    "description"   : "Une femme à son compagnon en train de l'embrasser",
                    "sort"          : "top10-card", 
                    "icon"          : "heart"
                },
                {
                    "title"         : "Change de trou ça fume",
                    "category"      : "Bricolage",
                    "description"   : "Quelqu'un qui conseil un ami en plein bricolage",
                    "sort"          : "top10-card", 
                    "icon"          : "lifesaver"
                },
                {
                    "title"         : "Met de la lumière je vois rien.",
                    "category"      : "Bricolage",
                    "description"   : "Un chef de chantier exigeant",
                    "sort"          : "top10-card", 
                    "icon"          : "camera"
                },
                {
                    "title"         : "Finalement je préfère ta mère",
                    "category"      : "On avait dit pas les mamans",
                    "description"   : "Conversation de famille",
                    "sort"          : "top10-card", 
                    "icon"          : "users"
                },
                {
                    "title"         : "J'irai bien au fond mais ton père est déjà passé",
                    "category"      : "ça reste en famille",
                    "description"   : "Quelqu'un se plaignant qu'un père de famille ait déjà pris la place au cinéma",
                    "sort"          : "top10-card", 
                    "icon"          : "users"
                },
                {
                    "title"         : "Tu faisais pas le même bruit la dernière fois",
                    "category"      : "Une bonne mémoire",
                    "description"   : "A propos du mécanisme de son stylo",
                    "sort"          : "top10-card", 
                    "icon"          : "microphone"
                },
                {
                    "title"         : "Oh, t'as encore changé de coupe !",
                    "category"      : "Observateurs",
                    "description"   : "Conversation de collègue, après un passage chez le coiffeur",
                    "sort"          : "top10-card", 
                    "icon"          : "image"
                },
                {
                    "title"         : "T'as bientôt fini où je décommande le prochain ?",
                    "category"      : "Gourmand",
                    "description"   : "Conversation de travail en déplacement professionnel, retardant la commande d'un taxi",
                    "sort"          : "top10-card", 
                    "icon"          : "receiver"
                },
                {
                    "title"         : "J'ai fini ! J'appelle mes potes ?",
                    "category"      : "Le sens du partage",
                    "description"   : "Pendant une partie de playstation",
                    "sort"          : "last10-card", 
                    "icon"          : "users"
                },
                {
                    "title"         : "J'ai ouvert une porte que j'aurai pas dû !",
                    "category"      : "Défense d'entrer",
                    "description"   : "Réflexion à propos d'une porte de réunion ouverte en plein comité de direction",
                    "sort"          : "last10-card", 
                    "icon"          : "git-branch"
                },
                {
                    "title"         : "On peut tremper une fois mille personnes, mais pas mille fois une personne...euh...",
                    "category"      : "Prenez un chewing gum Emile",
                    "description"   : "Lapsus révélateur de bon goût cinématographique",
                    "sort"          : "last10-card", 
                    "icon"          : "video-camera"
                },
            ]
        }
        
    },
    /*mounted () {
        axios
        .get('URL_OF_THE_FUTUR_API')
        .then(response => (
            this.titlelist = response.data.titlelist) 
        )
        .catch(error => {
            console.log(error)
            this.errored = true
        })
        .finally(() => this.loading = false)
    },*/
    template: ` <div class="uk-grid uk-grid-medium uk-child-width-1-2@s uk-child-width-1-3@m uk-child-width-1-4@l  uk-child-width-1-5@xl uk-grid-match js-filter" data-uk-grid="masonry: true">
                    <div v-for="title in titlelist" v-bind:title="title" :class="title.sort">
                        <div class="uk-card uk-card-small uk-card-default">
                            <div class="uk-card-header">
                                <div class="uk-grid uk-grid-small uk-text-small" data-uk-grid>
                                    <div class="uk-width-expand">
                                        <span class="cat-txt">{{title.category}}</span>
                                    </div>
                                    <div class="uk-width-auto uk-text-right uk-text-muted">
                                        <span :data-uk-icon="'icon:'+title.icon+'; ratio: 0.8'"></span>
                                    </div>
                                </div>
                            </div>
                            <div class="uk-card-body uk-inline-clip uk-transition-toggle" tabindex="0" width='100%'>
                                <h6 class="uk-margin-small-bottom uk-margin-remove-adjacent uk-text-bold">{{title.title}}</h6>
                            </div>
                            <div class="uk-card-footer">
                                <div class="uk-grid uk-grid-small uk-grid-divider uk-flex uk-flex-middle" data-uk-grid>
                                    <div class="uk-width-expand uk-text-small">
                                        <span class="uk-badge">0</span>
                                        <a href="#" data-uk-tooltip="title: Vote (bientôt disponible)" class="uk-icon-link" data-uk-icon="icon:heart; ratio: 0.8"></a>
                                        <a href="#" :data-uk-tooltip="'pos: left;title:'+title.description+'...;'" class="uk-icon-link" data-uk-icon="icon:question; ratio: 0.8"></a>
                                    </div>
                                    <div class="uk-width-auto uk-text-right">
                                        <a href="#" data-uk-tooltip="title: Partager sur Twitter (bientôt disponible)" class="uk-icon-link" data-uk-icon="icon:twitter; ratio: 0.8"></a>
                                        <a href="#" data-uk-tooltip="title: Partager sur Facebook (bientôt disponible)" class="uk-icon-link" data-uk-icon="icon:facebook; ratio: 0.8"></a>
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