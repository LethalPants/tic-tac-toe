const readline = require('readline');
const fs = require('fs');
const shuffle = require('./utils/shuffle');
const createFileIfNotExists = require('./utils/createFileIfNotExists');

let aiChar, userChar, aiMove, userMove;

// generate board, available moves and the first player.
const init = (board = [], availableMoves = []) => {
	aiChar = Math.round(Math.random());
	console.clear();

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
	//Shuffling the array for random moves
	availableMoves = shuffle(availableMoves);

	return [board, availableMoves];
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

const getCoordinates = () => {
	const rl = readline.createInterface({
		input: process.stdin,
		output: process.stdout,
	});

	return new Promise((resolve) =>
		rl.question('tictactoe> ', (ans) => {
			rl.close();
			resolve(ans);
		}),
	);
};

const makeComputerMove = (board, availableMoves) => {
	let idx = 0,
		x,
		y;
	console.log('The computer will make a move.');
	idx = Math.floor(Math.random(availableMoves.length));
	let move = availableMoves.splice(idx, 1)[0];
	x = move[0];
	y = move[1];
	board[x][y] = aiMove;
};

const makeUserMove = (board, availableMoves, move) => {
	let cords = move.split(' ')[1].trim().split(',');
	x = parseInt(cords[0], 10);
	y = parseInt(cords[1], 10);
	if (x > 2 || y > 2) {
		console.log('Invalid move. Input must be less than 2');
		return false;
	}
	idx = availableMoves.findIndex((a) => a[0] == x && a[1] == y);
	if (idx == -1) {
		console.log('The space is already occupied.');
		return false;
	}
	availableMoves.splice(idx, 1);
	board[x][y] = userMove;
	return true;
};

const printScoreboard = () => {
	const scores = require('./score.json');
	console.table(scores);
};

const processUserMove = (board, availableMoves, move) => {
	let idx = 0,
		x = 0,
		y = 0;
	if (move.includes('move')) {
		return makeUserMove(board, availableMoves, move);
	}

	if (move === 'scoreboard') {
		printScoreboard();
		return false;
	}
	if (move.includes('quit')) {
		console.log('Thank you for playing!');
		process.kill(0);
	}

	console.log('Invalid input.');
	return false;
};

const printBoard = (board) => {
	console.table(board);
};

const play = async (currentPlayer) => {
	let board = [];
	let availableMoves = [];
	[board, availableMoves] = init(board, availableMoves);
	let result = '';
	let next = true;
	while (result === '' && availableMoves.length !== 0) {
		if (currentPlayer === aiChar) {
			makeComputerMove(board, availableMoves);
			currentPlayer = userChar;
		} else if (currentPlayer == userChar) {
			console.log('It is your turn to make a move.');
			const move = await getCoordinates();
			next = processUserMove(board, availableMoves, move.toLowerCase());
			if (next) currentPlayer = aiChar;
		}
		if (next) printBoard(board);
		result = checkWinner(board);
	}

	const scores = require('./score.json');

	if (result === '' && availableMoves.length === 0) {
		console.log('The Game is a Draw.');
	} else if (result === userMove) {
		console.log('You win!');
		scores.user += 1;
	} else if (result === aiMove) {
		console.log('Computer wins :(');
		scores.computer += 1;
	}

	fs.writeFile('./score.json', JSON.stringify(scores), function writeJSON(err) {
		if (err) return console.log(err);
	});
};

const main = async () => {
	try {
		const fileName = './score.json';
		createFileIfNotExists(fileName);
		play(0);
	} catch (error) {
		console.log(error);
		process.kill(0);
	}
};

main();
