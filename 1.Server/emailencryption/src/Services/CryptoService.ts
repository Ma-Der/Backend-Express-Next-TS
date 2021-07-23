import * as openpgp from 'openpgp';
import { passphrase } from '../Config/envVariables';


export class CryptoService {

    private async readKey(publicKeyArmored: string) {
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
        return publicKey;
    }

    private async decryptKey(privateKeyArmored: string, passphrase: string) {
        const privateKey = await openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored }),
            passphrase
        });
        return privateKey;
    }

    private async generateKeys(email: string, passphrase: string) {
        return openpgp.generateKey({
            userIDs: [{name: 'some', email: email}],
            passphrase: passphrase
        });
    }

    private async encryptText(publicKey: openpgp.Key, text: string) {
        return await openpgp.encrypt({
            message: await openpgp.createMessage({ text }),
            encryptionKeys: publicKey
        });
    }

    public async encryptEmail(email: string, dataToEncrypt: string) {
        const { publicKey, privateKey } = await this.generateKeys(email, dataToEncrypt);

        const publicKeyA = await this.readKey(publicKey);
        const privateKeyA = await this.decryptKey(privateKey, passphrase as string)

        const encryptedText = await this.encryptText(publicKeyA, dataToEncrypt);

        return encryptedText;
    }

    public async decryptEmail(email: string, dataToDecrypt: string) {
        try {
            const { publicKey, privateKey } = await this.generateKeys(email, dataToDecrypt);
            const message = await openpgp.readMessage({ armoredMessage: dataToDecrypt });
            const privateKeyA = await this.decryptKey(privateKey, passphrase as string);
            const { data: decrypted } = await openpgp.decrypt({
                message,
                decryptionKeys: privateKeyA
            });
    
            return decrypted;
        }
        catch(err) {
            throw Error('Something went wrong with decryption !');
        }
    }
}