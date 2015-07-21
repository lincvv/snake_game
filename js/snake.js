function Snake(row, col, course, matrix)
{
	var that = this;
	this.header = {x: row, y: col};
	this.course = course;
	this.matrix = matrix;
	this.notBody = course;
	this.body;
	this.length = 3;
	var MIN = 1;


	this.create = function()
	{	

		that.body = [{ x: that.header.x, y: that.header.y}, {x: that.header.x, y: (col - 1)}, {x: that.header.x, y: (col-2)}];
		
		for (var i = 0; i < that.body.length; i++) {	

		that.matrix.setCellSnake(that.body[i].x, that.body[i].y, true);

		};	
		
	}


	this.fire = function()
	{

		var fire_;
		for (var i = 0; i < that.body.length; i++) {

			fire_ = matrix.cells(that.body[i].x, that.body[i].y);
			$(fire_).addClass("fire").animate({opacity: "0.7"},100)
									 .animate({opacity: "0.5"},100)
									 .animate({opacity: "0.3"},100)
									 .animate({opacity: "1"},100)
									 .animate({opacity: "0.6"},100)
									 .animate({opacity: "1"},100)
									 .animate({opacity: "0.7"},100)
									 .animate({opacity: "0.5"},100)
									 .animate({opacity: "0.3"},100)
									 .animate({opacity: "1"},100)
									 .animate({opacity: "0.6"},100)
									 .animate({opacity: "1"},100);

			
		}

	}
	this.move = function()
	{

		var clear = that.body.pop();
		that.matrix.setCellSnake(clear.x, clear.y, false);
		switch(that.course)
		{
			case 'right':
				that.header.y++;
				break;
			case 'left':
				that.header.y--;
				break;
			case 'top':
				that.header.x--;
				break;
			case 'bottom':
				that.header.x++;
				break;
		}

		//Проверка выхода за границы
		
		if (that.header.y > matrix.cols || that.header.y < MIN || that.header.x > matrix.rows || that.header.x < MIN)
		{
			
			$('#start').trigger("click");
			that.body.push({x: clear.x, y: clear.y});
			that.fire();
			
			setTimeout(game.gameOver, 2000);
			return false; 	
		}

		//Проверка на поедание себя
		if (that.matrix.getCell(that.header.x, that.header.y, "on")) 
			{
				
				$('#start').trigger("click");
				animate.shake();
				
				$("#point").html( game.point );
				setTimeout(game.gameOver, 2000);
				return false; 

			}

			//Проверка на сьедание свежого яйца
		if (that.matrix.getCell(that.header.x, that.header.y, "green")) 
			{
					
				that.body.push({x: clear.x, y: clear.y});
				that.length++;
				game.point++;
			}
		else if (that.matrix.getCell(that.header.x, that.header.y, "black")) //Проверка на сьедание тухлого яйца
			{
				game.point--;
				that.length--;
				
				if (that.length < 3) 
					{
						$('#start').trigger("click");
						$("#point").html( (game.point) );
						game.gameOver();
					}
				else 
					{
						var clear = that.body.pop();
						that.matrix.setCellSnake(clear.x, clear.y, false);
					}	
			}	

			// Установка головы змеи
			that.body.unshift({x: that.header.x, y: that.header.y});	
		 	that.matrix.setCellSnake(that.body[0].x, that.body[0].y, true);
			$("#point_status").html(game.point);

		

	}


	
}