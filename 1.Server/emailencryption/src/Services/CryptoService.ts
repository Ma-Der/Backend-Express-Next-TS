import * as openpgp from 'openpgp';
import { passphrase } from '../Config/envVariables';
import * as fs from 'fs';
import path from 'path';

export class CryptoService {

    private async readKey(publicKeyArmored: string) {
        const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
        return publicKey;
    }

    private async decryptKey(privateKeyArmored: string) {
        const privateKey = openpgp.decryptKey({
            privateKey: await openpgp.readPrivateKey({ armoredKey: privateKeyArmored } ),
            passphrase
        });
        return privateKey;
    }

    private async generateKeys(email: string) {
        return openpgp.generateKey({
            userIDs: [{name: 'some', email: email}],
            curve: "ed25519",
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
        const { publicKey, privateKey } = await this.generateKeys(email);

        fs.writeFileSync(path.join(path.resolve(), 'src', '.pk'), privateKey);

        const publicKeyA = await this.readKey(publicKey);

        const encryptedText = await this.encryptText(publicKeyA, dataToEncrypt);

        return encryptedText;
    }

    public async decryptEmail(dataToDecrypt: string, key: string) {
            const message = await openpgp.readMessage({ armoredMessage: dataToDecrypt });
            const privateKey = await this.decryptKey(key);

            const decrypted = await openpgp.decrypt({
                message,
                decryptionKeys: privateKey
            });

            return decrypted.data;
    }
}