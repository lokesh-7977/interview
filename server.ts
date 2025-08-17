import { config } from './src/config';
import { db } from './src/lib/prisma';
import app from './src/app'

(async () => {
	try {
		await db.$connect();
		console.log('DATABASE CONNECTED SUCCESSFULLY');

		app.on('error', (error: unknown) => {
			console.error('ERROR :', error);
			throw error;
		});

		app.listen(config.PORT, () => {
			console.log(
				`Server is Listening on http://localhost:${config.PORT}`,
			);
		});
	} catch (error) {
		console.error('ERROR :', error);
		throw error;
	}
})();
