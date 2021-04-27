let aiChar, userChar, aiMove, userMove;

const init = (board = [], availableMoves = []) => {
	board = [
		['', '', ''],
		['', '', ''],
		['', '', ''],
	];

	for (let i = 0; i < 3; i++) {
		for (let j = 0; j < 3; j++) {
			availableMoves.push([j, i]);
		}
	}
};

const checkWinner = (board = []) => {
	let winner = '';

	// check row
	for (let i = 0; i < 3; i++) {
		if (
			board[i][0] == board[i][1] &&
			board[i][1] == board[i][2] &&
			board[i][0] != ''
		) {
			winner = board[i][0];
		}
	}

	// check column
	for (let i = 0; i < 3; i++) {
		if (
			board[0][i] == board[1][i] &&
			board[1][i] == board[2][i] &&
			board[0][i] != ''
		) {
			winner = board[0][i];
		}
	}

	// check diagonals
	if (
		board[0][0] == board[1][1] &&
		board[1][1] == board[2][2] &&
		board[0][0] != ''
	) {
		winner = board[0][0];
	}

	if (
		board[0][2] == board[1][1] &&
		board[1][1] == board[2][0] &&
		board[0][2] != ''
	) {
		winner = board[2][0];
	}

	return winner;
};

const play = (currentPlayer) => {
	let board = [];
	let availableMoves = [];
	init(board, availableMoves);
	console.log(board, availableMoves);

	let result = '';
	let idx = 0,
		x,
		y;

	while (result === '' && availableMoves.length !== 0) {
		if (currentPlayer === aiChar) {
			console.log('The computer will make a move.');
			idx = Math.floor(Math.random(availableMoves.length));
			let move = availableMoves.splice(index, 1)[0];
			x = move[0];
			y = move[1];
			board[x][y] = aiMove;
			currentPlayer = userChar;
		}

		result = checkWinner(board);
	}

	if (result === '' && availableMoves.length === 0) {
		console.log('The Game is a Draw.');
	} else if (result === userMove) {
		console.log('You win!');
	} else if (result === aiMove) {
		console.log('Computer wins :(');
	}
};

const main = () => {
	aiChar = Math.round(Math.random());
	const currentPlayer = 0;

	if (aiChar == 0) {
		userChar = 1;
		aiMove = 'X';
		userMove = 'O';
		console.log('Computer will make the first move.');
	} else {
		userChar = 0;
		aiMove = 'O';
		userMove = 'X';
		console.log('User will make the first move.');
	}
	setTimeout(function () {
		console.clear();
	}, 1000);
};

main();
