
window.onload = init;

function init(){

	var intialValue = 'X';
	var scoreX = 0;
	var scoreO = 0;
	var stepNumber = 0
	var drawScore = 0
	var movePlayer = [];
	var stopOfPlay = false;

	var winIndex = [
			[0, 1, 2], 
			[3, 4, 5], 
			[6, 7, 8], 
			[0, 3, 6], 
			[1, 4, 7], 
			[2, 5, 8], 
			[0, 4, 8], 
			[2, 4, 6]
		];


	var winX = document.getElementById('win-x');
	var winO = document.getElementById('win-o');
	var draw = document.getElementById('draw');
	var informationCourse = document.querySelector('.information-of-movie');
	var buttonReset = document.querySelector('.button-reset');
	var cell = document.querySelectorAll('td');

	informationCourse.innerHTML = 'Ход игрока: X'

	buttonReset.addEventListener('click',buttonResetFunction);

	for(var i = 0; i < cell.length; i++){
		cell[i].addEventListener('click',startGame);

		function startGame(){

			if(stopOfPlay == false){

				var index = this.dataset.index;
				movePlayer[index] = intialValue;
				var nowElem = this;

				stepPlayer(nowElem);
		


				function stepPlayer(elem){

					if(intialValue == 'X'){
						elem.innerHTML = intialValue;
						intialValue = 'O';
						informationCourse.innerHTML = 'Ход игрока: ' + intialValue;
					} else {
						elem.innerHTML = intialValue
						intialValue = 'X';
						informationCourse.innerHTML = 'Ход игрока: ' + intialValue;
					}

					stepNumber ++;

					elem.removeEventListener('click',startGame);

					if(stepNumber >= 9){
						statisticsOutputDraw();
					}

				
					if(checkTheWinnings() == true){
						statisticsOutputWin();
					}
				}
			}

			
		}
	}



	function checkTheWinnings(){

		for(var i = 0; i < winIndex.length; i++){
			var id = winIndex[i];
			var check = movePlayer[id[0]] && movePlayer[id[0]] == movePlayer[id[1]] && movePlayer[id[1]] == movePlayer[id[2]] ;

			if(check){
				return true;
			}
		}


	}

	function statisticsOutputWin(){

		stopOfPlay = true;

		if(intialValue == 'X'){
			intialValue = 'O';
			scoreO ++;
			winO.innerHTML = scoreO;
			informationCourse.innerHTML = 'Победил игрок ' + intialValue;
			stepNumber = 0;

		} else if(intialValue == 'O'){
			intialValue = 'X'
			scoreX ++;
			winX.innerHTML = scoreX;
			informationCourse.innerHTML = 'Победил игрок ' + intialValue;
			stepNumber = 0;
		}
	}

	function statisticsOutputDraw(){
		stopOfPlay = true;
		drawScore ++
		draw.innerHTML = drawScore;
		informationCourse.innerHTML = "Ничья";
		stepNumber = 0;
	}

	function buttonResetFunction(){
		for(var i = 0; i < cell.length; i++){
			cell[i].innerHTML = '';
			cell[i].addEventListener('click',startGame);
		}

		movePlayer = [];
		stopOfPlay = false;
		informationCourse.innerHTML = 'Xод игрока: X';
	}
}
