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
    $(document).on("click", "#idbtnlogin", function(evt)
    {
        var user=$("#iduser").val();
        var password=$("#idpassword").val();
        
        var param={};
        param.user=user;
        param.pass=password;
        
        $.ajax({
            type:"POST",
            url:"http://192.168.56.104:9095/getLogin",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                //console.log(data.status);                
                
                if(data.status===1){
                    $("#idGoMostrarPastilla").click();
                    MOSTRARPASTILLA.cargarPastillas();
                }
                if(data.status===0){
                    
                     navigator.notification.alert(
                        data.message.message,  // message
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
    /*
    $(document).on("click", "#IdAgregar", function(evt)
    {
         activate_page("#IdPageReceta"); 
    });
    */
    
    /* listitem  #idlistpastilla */
    $(document).on("click", "#idlistpastilla", function(evt)
    {
        //activate_page("#idPageDetallePastilla");
        //var id=$("#1").val();
        //alert(id);
        //alert($(this).attr('id'));
        //alert(this.id);
        //var param={};
        //param.user=id;
        //console.log(id);
        /*
        $.ajax({
            type:"POST",
            url:"http://192.168.84.1:9095/getMostrarReceta",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                //console.log(data.status);                
                
                if(data.status===1){
                    $("#idGoMostrarPastilla").click();
                    MOSTRARPASTILLA.cargarPastillas();
                }
                if(data.status===0){
                    
                     navigator.notification.alert(
                        data.message,  // message
                        function(){},         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                    
                }
                
            },
            error:function(data){
            
                console.log("ERROR:"+data);
            }
        }); */
    });
    
        /* button  #idbtnguardar */
    $(document).on("click", "#idbtnguardar", function(evt)
    {
        var nombrePastilla=$("#idnombrepastilla").val();
        var numPastilla=$("#idnumpastilla").val();
        var tiempoIntervalo=$("#idtiempointervalo").val();
        var fechaHora=$("#idfechahora").val();
        var nota=$("#idnota").val();

        var param={};
            param.nombre=nombrePastilla;
            param.cantidad=numPastilla;
            param.tiempo=tiempoIntervalo;
            param.fecha=fechaHora;
            param.nota=nota;

        $.ajax({
            type:"POST",
            url:"http://192.168.56.104:9095/setPastilla",
            data:"data="+JSON.stringify(param),
            //dataType : 'json',
            dataType : 'text',
            success:function(data){
                var data=JSON.parse(data);
                console.log(data);                
                
                if(data.status===1){
                    //$("#idGoMostrarPastilla").click();
                    //MOSTRARPASTILLA.cargarPastillas();
                    navigator.notification.alert(
                        data.message,  // message
                        function(){},         // callback
                        'Mensaje',            // title
                        'Aceptar'                  // buttonName
                    );
                }
                if(data.status===0){
                     navigator.notification.alert(
                        data.message,  // message
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
    
    }
document.addEventListener("app.Ready", register_event_handlers, false);
})();
