//
// Òî÷êà âõîäà.
//
window.onload = function()
{
	m1 = new Matrix('matrix1', 20, 20);
	m1.create();
	
	snake = new Snake(1, 3, 'right', m1);
	snake.create();
	
	square = new Square(m1);
	
	game = new Game(300, 8000, 5000);
	animate = new Animate(m1);


	$('#resetLocalStorage').on('click', function(){

		$.post("/restful/fortune",{method: "reset"}, function(data) {
			

			}, "json")

	})


	$('#login').hide();
	
	$('#login').on('keypress',function(e){

		e = e || event;

		if(e.keyCode == 13 && $('#login').val() != '')
		{
			
			
			var $login = $("#login").val();
		 	var data_ = { point: game.point, name: $login, method: "save" }

			$.ajax({
								
	    	    type: "POST",				
	    	    url: "/restful/fortune",
				data: data_,
				dataType: "json", 			
			    success: function(data) {
						
						
						$(".result").text("Выполнено!");
						$("#point").text("");
						$('#name_status').html($login);
						$('#login').hide();
						$('#login').val('')
					},
	    	    error: function (XMLHttpRequest, textStatus, errorThrown) {
						$('#record').append('Все, плохо');
					},
				
		})

	}

	// return false;

	})
	$('#slider').hide();

	//Делаем не активной кнопку Новая игра
	$('.btn').prop("disabled", true);
	//После ввода имени делаем активной кнопку Новая игра
	$("input[name=login]").on("change", function(){
		$('.btn').prop("disabled", false);
	})

	//Выбор сложности
	$(".difficult").on("change", function(){
		if ($("#difficult_normal").prop("checked")) {
			game.intSnake= 200;
			game.intGreen = 4500;
			game.intBlack = 5000;
		}
		else if($("#difficult_hard").prop("checked")){
			game.intSnake = 150;
			game.intGreen = 4000;
			game.intBlack = 3000;
		}
		else{
			game.intSnake = 300;
			game.intGreen = 5000;
			game.intBlack = 8000;	
		}

	})

	game.gameStart();
	//Обработчик события клик по кнопке Новая игра 
	/*$('.btn').click(function()

	{	
		
		if ($(this).hasClass('show')) 

			{ 


				$('#slider').hide();

				$('#difficult_status').text(" ");

				game.newGame();
				
				game.stop_();
				
				$(this).html("Новая Игра");

				$('#matrix1').animate({ opacity: "0"}, 3000).css("display", "none");			
				$('#block').animate({opacity: "1"}, 2500).css("display", "block");

					$("input[name=login]").css("display", "block");
					$('#check').css("opacity", "0");
					$('#status').css("opacity", "0");
					$('#record').css("opacity", "0");
					$('.difficult').css("opacity", "0");	 
					$(this).toggleClass('show');		 
			}
		else
			{

				var data = {method: "read"};
				$.get("/restful/fortune",data, function(data) {
			    		for (var i = 0; i < data.arg.length; i++) {
			        		
			    		$("#record").append('<span id="name'+ (name_record) +'"></span><span id="point'+ (point_record) +'">: </span></br>');
						$("#name" + name_record).append(data.arg[i].name);
						$("#point" + point_record).append(data.arg[i].point);
						name_record ++;
						point_record ++;

						};
						// game.newGame();
						
					}, "json" );

				
				$('#slider').show();
				game.setSlider();

				var name = $("input[name=login]").val();
				$('#name_status').html(name);
				//$('#ui-id-1').text(name);
				$("input[name=login]").val(" ");
				var id = $('#matrix1').children();
				
				$(id).each(function(ind)
				{
					if (ind == 3)return false;
					$(this).css("display", "none");
				});
				
				$(this).html("Выход из Игры");
				$('#matrix1').css("display", "block")
							 .animate({ opacity:"0.2"  },1000, function(){

							 			$(id).each(function(ind)
											{
											if (ind == 3)return false;
											$(this).css("display", "block");
											
											});
							 		})
							 .animate({opacity: "1"}, 1500);
				
				$("input[name=login]").css("display", "none");
				$('#block').animate({opacity: "0.2"}, 1500);
				$('#block').css("display", "none");		 
				$('#status').animate({opacity: "1"}, 3000);
				$('#record').animate({opacity: "1"}, 3000);
				$('.difficult').animate({opacity: "1"}, 3000);
				$('#check').animate({opacity: "1"},3000);
				
							 
				$(this).toggleClass('show');	
				$('.show').animate({opacity: "1"}, 3000);		
			};
		
		
		
		return false;
	})*/

	$('#search').bind(" change paste keyup ", function(){

		var $searchName = $(this).val();

		$("#block-search").children().remove();

		if (!$searchName) {return false};

		var data = {method: "search", searchUser: $searchName};
		

		$.get("/restful/fortune",data, function(data) {

			$('#block-search').append('<ul class="resultSearch"></ul>');

			for (var i = 0; i < data.user.length; i++) {
				// alert(data.user[i].name);
				$('.resultSearch').append("<li>" + data.user[i].name + "</li>")
			};
			
			var $li = $('.resultSearch').find('li');

			$li.hover(function(){
				$(this).css('backgroundColor', 'black').css('cursor', 'pointer');
			}, function(){
				$(this).css('backgroundColor', '');
			})
			$li.on('click', function(){
				
			})
		}, "json")
	})

	   //Обработчик события клик по кнопке старт
	$('#start').click(function()
		{
			
			intTime = setInterval(game.times, 1000);
			var level = $('input:radio:checked + label').text(); 
			$('#difficult_status').text(level);
			$("input[name=difficult]:radio").prop('disabled', true);

			//Проверка кнопки - старт или пауза
			if ($("#start").prop("checked")) 
			{

			
			game.gameInt();
			$(this).html("Pause");
			
			}
			else
			{
				
				game.stop_();
				$(this).html("Start");
			}

		})

	
	document.onkeydown = function (e)
								{

									e = e || event;

									var LEFT = 37;
									var RIGHT = 39;
									var TOP = 38;
									var BOTTOM = 40;

									if ((e.keyCode >= 37) && (e.keyCode <= 40) ) 
									{
											
										switch(e.keyCode)
										{
											case LEFT:
													if (snake.notBody == 'right') 
														snake.course = 'right';
													else
														snake.course = 'left';
												break;
											case TOP:
													if (snake.notBody == 'bottom') 
														snake.course = 'bottom';
													else
														snake.course = 'top';
												break;
											case RIGHT:
													if (snake.notBody == 'left') 
														snake.course = 'left';
													else
														snake.course = 'right';
												break;
											case BOTTOM:
													if (snake.notBody == 'top') 
														snake.course = 'top';
													else
														snake.course = 'bottom';
												break;
										}
										 snake.notBody  = snake.course;
									}
								}

}		


function rand  (min, max){

  return Math.floor(Math.random() * (max - min + 1)) + min;
}