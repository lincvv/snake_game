
function Game(speed, intBlack, intGreen)
{
	var that = this;
	this.intSnake = speed;
	//this.speed = speed;
	this.point = 0;
	this.intGreen = intGreen;
	this.intBlack = intBlack;
	this.time = 180;
	this.int_Snake = null;
	this.name_record = 1;
	this.point_record = 1;

	this.newGame = function ()
		{
			$('#start').prop("checked", false);
			game.point = 0;
			snake.header.x = 1;
			snake.header.y = 3;
			snake.course = "right";
			snake.notBody = '';
			$("input[name=difficult]:radio").prop('disabled' , false);
			$("#difficult_easy").prop('checked', true);
			$(".difficult").trigger("change");
			$(".cell").removeClass("fire on gr bl");
			snake.create();
			
		}

	this.stop_ = function()
	{
		clearInterval(that.int_Snake);
		clearInterval(intFood);
		clearInterval(intPoison);
	}	


	

	
// Отображает окно Game Over
		var name_record = 1;
		var point_record = 1;

	this.gameOver = function()
	{


    	$( "#dialog" ).dialog({

      show: {
        effect: "blind",
        duration: 500
      },

      hide: {
        effect: "explode",
        duration: 1000
      },

      resizable: false,
      height:300,
      width: 350,
      modal: true,
      buttons: {
        "Сохранить результат": function() {
          	
			
			if (!$('#login').val()) {
				
				return false;
			}
			else{
				var $login = $('#login').val();
			}
			
		 	var data_ = { point: game.point, name: $login, method: "save" }

			$.ajax({
								
	    	    type: "POST",				
	    	    url: "/restful/fortune",
				data: data_,
				dataType: "json", 			
			    success: function(data) {
			    		
			    		
						$('#login').hide();
						$('#login').val('');
						$(".result").text("Выполнено!");
						$("#point").text("");
//						 setTimeout($( this ).dialog( "close" ), 3000);
					},
	    	    error: function (XMLHttpRequest, textStatus, errorThrown) {
						$('#record').append('Все, плохо');
					},
				
				
	    		});


	
        },

        "Выйти": function() {
          $( this ).dialog( "close" );
          game.newGame();
        }
      }

    // });
	
  });

	$(".result").text("Ваш результат: ");
	$("#point").text( game.point );
	var name = $('#name_status').text();
	$('#ui-id-1').text(name);
	$('#login').show();
	}

//Установка слайдера
	this.setSlider = function() {

    $( "#slider-vertical" ).slider({
      orientation: "vertical",
      range: "min",
      min: 0,
      max: 10,
      value: 0,
      slide: function( event, ui ) {
        $( "#amount" ).val( ui.value );
        that.setSpeedSlider(ui.value);
      }
    });
     $( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );
  }


	this.times = function(){
		$('#time_status').text(that.time);
		that.time--;
		if(that.time < 0)
			return false;
			
	}
// установка скорости
	var intSpeed = that.intSnake;
	this.setSpeedSlider = function(speed){
		if(that.int_Snake){
		clearInterval(that.int_Snake);
	}
		
		switch(speed){


			case 0:
				that.imtSnake = intSpeed;
				break;
			case 1:
				that.intSnake = intSpeed - 20;
				break;
			case 2:
				that.intSnake = intSpeed - 40;
				break;
			case 3:
				that.intSnake = intSpeed - 60;
				break;
			case 4:
				that.intSnake = intSpeed - 80;
				break;
			case 5:
				that.intSnake = intSpeed - 100;
				break;
			case 6:
				that.intSnake = intSpeed - 120;
				break;
			case 7:
				that.intSnake = intSpeed - 140;
				break;
			case 8:
				that.intSnake = intSpeed - 160;
				break;
			case 9:
				that.intSnake = intSpeed - 180;
				break;
			case 10:
				that.intSnake = intSpeed - 200;
				break;

		}
		if ($("#start").prop("checked")) 
			{
				that.getSpeed();
			}
	}

	this.getSpeed = function(){
		that.int_Snake = setInterval(snake.move, that.intSnake);
		
	}

	this.gameInt = function(){
		that.getSpeed();
		intFood = setInterval(function(){square.create('black')}, that.intBlack);
		intPoison = setInterval(function(){square.create('green')}, that.intGreen);
	}

	this.gameStart = function(){
		
		var data = {method: "read"};
				$.get("/restful/fortune",data, function(data) {

			    		for (var i = 0; i < data.arg.length; i++) {
			        		
			    		$("#record").prepend('</br><span id="name'+ (that.name_record) +'"></span><span id="point'+ (that.point_record) +'">: </span>');
						$("#name" + that.name_record).append(data.arg[i].name);
						$("#point" + that.point_record).append(data.arg[i].point);
						that.name_record ++;
						that.point_record ++;

						};
						
						
					}, "json" );

				
				$('#slider').show();
				game.setSlider();

				// var name = $("input[name=login]").val();
				//
				//$('#ui-id-1').text(name);
				// $("input[name=login]").val(" ");
				var id = $('#matrix1').children();
				
				$(id).each(function(ind)
				{
					if (ind == 3)return false;
					$(this).css("display", "none");
				});
				
				
				$('#matrix1').css("display", "block")
							 .animate({ opacity:"0.2"  },1000, function(){

							 			$(id).each(function(ind)
											{
											if (ind == 3)return false;
											$(this).css("display", "block");
											
											});
							 		})
							 .animate({opacity: "1"}, 1500);
				
				// $("input[name=login]").css("display", "none");
				// $('#block').animate({opacity: "0.2"}, 1500);
				// $('#block').css("display", "none");		 
				$('#status').animate({opacity: "1"}, 3000);
				$('#record').animate({opacity: "1"}, 3000);
				$('.difficult').animate({opacity: "1"}, 3000);
				$('#check').animate({opacity: "1"},3000);
				
							 
				// $(this).toggleClass('show');	
				// $('.show').animate({opacity: "1"}, 3000);

	}

}