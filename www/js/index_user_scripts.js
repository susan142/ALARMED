(function()
{
 "use strict";
 /*
   hook up event handlers 
 */
 function register_event_handlers()
 {
    
    MOSTRARPASTILLA.crearEnlaces();
     /* button  #IdLogin */
    $(document).on("click", "#IdLogin", function(evt)
    {
        var Login=$("#IdLogin").val();
        var Password=$("#IdPassword").val();
        
        
        	var param={};
        param.user=Login;
        param.pass=Password;
        
        $.ajax({
            type:"POST",
            url:"http://192.168.56.1:9095/getLogin",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data.status);                
                if(data.status===1){
                    navigator.notification.confirm(
                    'USUARIO LOGEADO',
                        function(){
                         $("#idGoMostrarPastilla").click();
                    //activate_page("#idPageAlumno"); 
                     MOSTRARPASTILLA.cargarPastillas();
                        },         // callback
                        'Mensaje',            // title
                        'Aceptar' 
                   
                    );
                }
                if(data.status===0){
                    
                     navigator.notification.alert(
                        'ACCCESO DENEGADO',  // message
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
    });
    
        /* button  #IdLogin */
    $(document).on("click", "#IdLogin", function(evt)
    {
         activate_page("#IdPageMostrarPastilla"); 
    });
    
        /* button  #IdVerReceta */
    $(document).on("click", "#IdVerReceta", function(evt)
    {
         activate_page("#IdPageReceta"); 
    });
    
        /* button  #IdAgregar */
    $(document).on("click", "#IdAgregar", function(evt)
    {
         activate_page("#IdPageReceta"); 
    });
    
    }
 document.addEventListener("app.Ready", register_event_handlers, false);
})();
