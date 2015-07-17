var MOSTRARPASTILLA = (function () {
    var my = {};
    ////////////
    
    my.crearEnlaces=function(){
        //Enlaces Page Alumno
     $("body").append('<a id="idGoMostrarPastilla" href="#IdPageMostrarPastilla"  class="style-31"></a>');  
     
         /* listitem  #listaPrueba */
     $(document).on("click", "#IdListaPastilla", function(evt)
        {
            /* your code goes here */ 
            //$.ui.popup('Hi there');
            //$(evt.target).attr('id');
            //console.log(evt);
            DEPU=evt;
            var idReceta=$(evt.target).attr('idPastilla');
            RECETA.cargarReceta(idReceta);
         
        });      
    };//////////////////////////////////////////////////////////////////////////////////
    my.cargarPastillas=function(){
       
        var param={};
        param.user="susan";
        $.ajax({
            type:"POST",
            url:"http://192.168.56.1:9095/getMostrarPastillas",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                
                if(data.status===1){
                    $("#IdListaPastilla").empty();
                    for(var i=0;i<data.data.length;i++){
                    
                        $("#IdListaPastilla").append("<li ><a href='#IdPageReceta' idPastilla="+data.data[i].id+">"+data.data[i].NombrePastilla+"</a></li>");
                        
                    }
                }
                if(data.status===0){
                    
                     navigator.notification.alert(
                        'ERROR AL CAPTURAR LISTA',  // message
                        function(){},         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                    
                }
              
            },
            error:function(data){
            
                console.log("ERROR:"+data);
            }
        });
    
    };//////////////////////////////////////////////////////////////////////////////////
    
    //////////
    return my;
}());