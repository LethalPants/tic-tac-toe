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

const play = (currentPlayer) => {
	let board = [];
	let availableMoves = [];
	init(board, availableMoves);
	console.log(board, availableMoves);
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
