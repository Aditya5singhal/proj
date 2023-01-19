AFRAME.registerComponent("cursor-listener",{
    init:function(){
        this.handleClickEvent();
        this.handleMouseEnterEvents()
        this.handleMouseLeaveEvents()

       },
       schema:{
           selectedItemId:{type:"string",default:""},
       },
       handleClickEvent:function(){
        this.el.addEventListener("click",evt=>{
            const placeContainer=document.querySelector("#places-container");
            const{state}=placeContainer.getAttribute("tour");
            if(state==="places-list"){
                const id=this.el.getAttribute("id");
                const placesId=[
                    "puri-jagannath",
                    "rameshwaram",
                    "somnath",
                    "badrinath"

                ];
                if(placesId.includes(id)){
                    placeContainer.setAttribute("tour",{
                        state:"view",
                        selectedCard:id
                    })
                }
            }
            if(state==="view"){
                this.handleViewState();
            }
            if(state==="change-view"){
                this.handleViewState();
            }
            
        })
       },
       handleViewState:function(){
        const el=this.el;
        const id=el.getAttribute("id");
        const placeContainer=document.querySelector("#places-container");
        const{selectedItemId}=placeContainer.getAttribute("cursor-listener");
        const sideViewPlacesId=["place-1","place-2","place-3","place-4"];
        if(sideViewPlacesId.includes(id)){
            placeContainer.setAttribute("tour",{
                state:"change-view"
            });
            const el=document.querySelector("#main-container");
            skyEl.setAttribute("material",{
                src:`./assets/thumbnails/${selectedItemId}/${id}.jpeg`,
                color:"white"
            })
        }
       },
       handleMouseEnterEvents:function(){
        this.el.addEventListener("mouseenter",()=>{
            const placeContainer=document.querySelector("#places-container");
            const{state}=placeContainer.getAttribute("tour");
            if(state==="places-list"){
                this.handlePlaceListState();
            }

        })
       },
       handleMouseLeaveEvents:function(){
        this.el.addEventListener("mouseleave",()=>{
            const placeContainer=document.querySelector("#places-container");
            const{state}=placeContainer.getAttribute("tour");
            if(state==="places-list"){
               const{selectedItemId}=this.data;
               if(selectedItemId){
                const el=document.querySelector(`#${selectedItemId}`);
                const id=el.getAttribute("id");
                if(id===selectedItemId){
                    el.setAttribute("material",{
                        color:"blue",
                        opacity:1

                    })
                }
               } 
            }

        })
       },
       handlePlaceListState:function(){
        const id=this.el.getAttribute("id");
        
        const placesId=[
            "puri-jagannath",
            "rameshwaram",
            "somnath",
            "badrinath"
        ];
        if(placesId.includes(id)){
            const placeContainer=document.querySelector("#places-container");
            placeContainer.setAttribute("cursor-listener",{
                selectedItemId:id
            });
           this.el.setAttribute("material",{
                color:"orange",
                opacity:1

            })
        }

       }

})