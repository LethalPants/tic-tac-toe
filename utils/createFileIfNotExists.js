const fs = require('fs');

const createFileIfNotExists = (fileName) => {
	fs.stat(fileName, function (err, stats) {
		if (err && err.message.includes('no such file or directory')) {
			const scores = JSON.stringify({ computer: 0, user: 0 });
			fs.writeFile(fileName, scores, function (err) {
				if (err) throw err;
			});
		}
	});
};

module.exports = createFileIfNotExists;
