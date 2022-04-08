import AES from 'crypto-js/aes';
import Crypto from 'crypto-js';

//TODO - UTILIZAR OTRO METODO DE ENCRIPTACION

function encrypt(text: string): string {
	const passwordCypher = AES.encrypt(text, process.env.SALT!);
	return passwordCypher.toString();
}

function decrypt(hash: string): any {
	const decrypted = AES.decrypt(hash, process.env.SALT!).toString(Crypto.enc.Utf8);
	return JSON.parse(decrypted);
}

function compareSync(hash: string, compare: string): boolean {
	const decrypted = decrypt(hash);
	console.log({decrypted});
	if(compare === String(decrypted) ){
		return true;
	}
	return false;
}

export {
	encrypt,
	decrypt,
	compareSync
}