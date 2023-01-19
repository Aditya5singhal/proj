AFRAME.registerComponent("tour",{
    init:function(){
     this.placeContainer=this.el;
     this.createCards()
    },
    schema:{
        state:{type:"string",default:"places-list"},
        selectedCard:{type:"string",default:"#card1"},
        zoomAspectRatio:{type:"number",default:1}
    },
    tick:function(){
        const {state}=this.el.getAttribute("tour");

        if(state==="view"){
            this.hideEl([this.placeContainer]);
            this.showView();

        }
    },

    hideEl:function(elList){
        elList.map(el=>{
            el.setAttribute("visible",false)
        })
    },

    showView:function(){
        const{selectedCard}=this.data;
        const skyEl=document.querySelector("#main-container");

        skyEl.setAttribute("material",{
            color:"white"
        })
    },

    update:function(){
        window.addEventListener("keydown",e=>{
            if(e.key==="ArrowUp"){
                if(
                    (this.data.zoomAspectRatio<=10 && this.data.state==="view")||
                    (this.data.zoomAspectRatio<=10 && this.data.state==="change-view")
                ){
                    this.data.zoomAspectRatio+=0.002;
                    this.cameraEl.setAttribute("zoom",this.data.zoomAspectRatio);
                }
            }
            if(e.key==="ArrowDown"){
                if(
                    (this.data.zoomAspectRatio>1 && this.data.state==="view")||
                    (this.data.zoomAspectRatio>1 && this.data.state==="change-view")
                ){
                    this.data.zoomAspectRatio-=0.002;
                    this.cameraEl.setAttribute("zoom",this.data.zoomAspectRatio);
                }
            }

        })
    },

    createCards:function(){
        const thumbNailsRef=[
            {
                id:"Jagannath-Puri",
                title:"Jagannath Puri",
                url:"./assets/thumbnails/jagannath_puri.jpeg"
            },
            {
                id:"Badrinath",
                title:"Badrinath",
                url:"./assets/thumbnails/Badrinath.jpg"
            },
            {
                id:"Rameshwaram",
                title:"Rameshwaram",
                url:"./assets/thumbnails/rameshwaram.jpeg"
            },
            {
                id:"Somnath",
                title:"Somnath",
                url:"./assets/thumbnails/somnath.jpeg"
            }

        ]
        previousXPosition= -60;
        for(var item of thumbnailRef){
            const posX=previousXPosition+25;
            const posY=10;
            posZ=-40;
            const position={x:posX, y:posY, z:posZ}
            previousXPosition=posX;


        }
        //border element 
        const borderEl=this.createBorder(position,item.id)

    },

    createBorder:function (position,id){
        const entityEl= document.createElement("a-entity");
        entityEl.setAttribute("id",id);
        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("geometry",{
            primitive:"ring",
            radiusOuter:10,
            radiusInner:9
        })
        entityEl.setAttribute("position",position),
        entityEl.setAttribute("material",{
            color:"black",
            opacity:2
        })
        return entityEl
    },
    createThumbNail:function(item){
        const entityEl=document.createElement("a-entity");
        entityEl.setAttribute("visible",true);
        entityEl.setAttribute("geometry",{
            primitive:"circle",
            radius:9,
        })
        entityEl.setAttribute("material",{
            src:item.url
        });
        return entityEl

    },
    createTitleEl:function(position,item){
        const entityEl=document.createElement("a-entity");
        entityEl.setAttribute("text",{
            font:"exo2bold",
            width:"60",
            color:"orange",
            value:item.title,

        });
        const elPosition=position;
        elPosition.y=-20;
        entityEl.setAttribute("position",elPosition);
        entityEl.setAttribute("visible",true);
        return entityEl;

    }
    
})