const {createApp} = Vue

createApp({
    data(){
        return{
            peliculas: [],
            peliculaMasInformacion: [],
            filmInput: "",
            pagina: 1,
            divInfo: false,
            transparencia: false
        }
    },
    methods: {
        traerApi(){
            axios.get("https://www.omdbapi.com/?s=" + this.filmInput + "&page=" + this.pagina + "&apikey=a6e842a7")
            .then(response => {
                for(i=0; i<response.data.Search.length; i++) 
                    this.peliculas.push(response.data.Search[i])
                });
            
        },
        limpiar(){
            this.peliculas = [],
            this.peliculaMasInformacion = [],
            this.pagina = 1,
            this.filmInput = ""
        },
        traerMasInformacionPelicula(pelicula){
            axios.get("https://www.omdbapi.com/?i=" + pelicula.imdbID + "&apikey=a6e842a7")
            .then(responseDataPlus => {this.peliculaMasInformacion = responseDataPlus.data;
                this.divInfo = true;
                this.transparencia = true;
                this.disableScroll();
            });
        },
        quitarDivInfo(){
            this.divInfo = false;
            this.transparencia = false;
            this.enableScroll();
        },
        eventScroll(){
            if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5) {
                this.pagina += 1;
                this.traerApi();
            }
        },
        disableScroll(){  
            var x = window.scrollX;
            var y = window.scrollY;
            window.onscroll = function(){ window.scrollTo(x, y) };
        },
        enableScroll(){  
            window.onscroll = null;
        }

    },
    computed: {

    },
    mounted(){
        window.addEventListener("scroll", this.eventScroll);
    }
}).mount('#vue')
