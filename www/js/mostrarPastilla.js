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
            DEPU=evt;
            var idReceta=$(evt.target).attr('idPastilla');
            //console.log(idReceta);
            RECETA.cargarReceta(idReceta);
         
        });      
    };
    //////////////////////////////////////////////////////////////////////////////////
    my.cargarPastillas=function(){
       
        $.ajax({
            type:"POST",
            url:"http://192.168.56.104:9095/getMostrarPastillas",
            //data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data[0]);
                $("#idlistpastilla").empty(); //limpiar
                for(var i=0;i<data.length;i++){
                    $("#idlistpastilla").append("<li id="+data[i].id+" value="+data[i].id+"><a href='#idPageDetallePastilla'>"+data[i].id+" "+data[i].NombrePastilla+"</a></li>");                       
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