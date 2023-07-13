export default{
    data(){
        return{
            breadList:[]
        }
    },
    created(){
        this.getBreadCrumb()
    },
    watch:{
        $route(){
            this.getBreadCrumb()
        }
    },
    methods:{
        getBreadCrumb(){
            this.breadList = this.$route.meta.bread||[]
        }
    }

}